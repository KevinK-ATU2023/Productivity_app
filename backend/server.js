// basic server 
const express = require("express")
const app = express()
const port = 3000

// encryption 
const bcrypt = require('bcryptjs')

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
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        unique: true
    },
    last_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tasks: [{
        title: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        }
    }]
})

// the model 
const Account = mdb.model('accounts', AccountSchema)

// express listeners
app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

app.post("/signup", async ( req, res ) => {
    const first_name = req.body.fname
    const last_name = req.body.lname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.pword
    // res.send(`Name: ${first_name} ${last_name}\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`)

    const account_found = await Account.findOne({ email: email })
    if (account_found) {
        res.status(400).json({
             success: false, 
             message: "User already exists" 
        })
    }
    else {
        const hash_password = await bcrypt.hash(password, 10)
        const new_user = new Account ({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hash_password,
            tasks: []
        })
        new_user.save()

        res.status(200).json({ 
            success: true, 
            message: "User has been created",
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email
        })
    }
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Go to http://localhost:${port}`)
})