// basic server 
const express = require("express")
const app = express()
const port = 3000

// body parser
const body_parser = require("body-parser")
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

// cors middleware
const cors = require("cors")
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

// mongodb database 
const mdb = require("mongoose")

mongoose_connect().catch((err) => { console.log(err) });

// connecting to mongo database
async function mongoose_connect() {
    await mdb.connect('mongodb+srv://kkarundu8:aBKCgW168jnWz4WJ@cluster0.m2gfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Database Connected!')
}

// the schema
const AccountSchema = new mdb.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    tasks: [{
        title: String,
        time: Date,
        frequency: Number
    }]
})

// the model 
const Account = mdb.model('accounts', AccountSchema)

const bcrypt = require("bcryptjs")

// express listeners
app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

app.post("signup", async ( req, res ) => {
    const first_name = req.body.fname
    const last_name = req.body.lname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.pword

    const account_found = await Account.findOne({ email: email })
    if (account_found) {
        res.json({ success: false, message: "User already exists" })
    }
    else {
        const hash_password = await bcrypt.hash(password, 15)

        const new_user = new Account ({
            username: username,
            name: first_name + " " + last_name,
            email: email,
            password: hash_password,
            tasks: []
        })

        new_user.save()

        res.json({ success: true, message: "User has been created" })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Go to http://localhost:${port}`)
})