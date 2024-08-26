const port = 3000

// basic server 
const express = require("express")
const app = express()

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

async function mongoose_connect() {
    await mdb.connect('mongodb+srv://kkarundu8:aBKCgW168jnWz4WJ@cluster0.m2gfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

const AccountSchema = new mdb.Schema({
    email: String,
    password: String,
    tasks: [Task]
})

const AccountModel = mdb.model('accounts', AccountSchema)

// Task class 
class Task {
    constructor( title, time, frequency ) {
        this.title = title
        this.time = time
        this.frequency = frequency
    }
}

// express listeners

app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Go to http://localhost:${port}\n`)
})