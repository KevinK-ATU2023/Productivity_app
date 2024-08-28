var signed_in_id = ""

// guest task array
var guest_tasks = [];

// Task class
class Task {
    constructor( title, time, frequency ) {
        this.title = title;
        this.time = time;
        this.frequency = frequency;
    }
}

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

// account schema
const AccountSchema = new mdb.Schema({
    username: {
        type: String,
        required: true,
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
            unique: true
        },
        time: {
            type: String,
            required: true
        },
        frequency: {
            type: String,
            required: true
        }
    }]
})

// accoount model 
const Account = mdb.model('accounts', AccountSchema)

// express listeners

app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

// post request for when a user tries to sign up
app.post("/signup", async ( req, res ) => {
    const first_name = req.body.fname
    const last_name = req.body.lname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.pword
    // res.send(`Name: ${first_name} ${last_name}\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`)

    const account = await Account.findOne({ email: email })
    if (account) {
        res.status(401).json({
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

        signed_in_id = account._id
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

// post request for when a user tries to sign in 
app.post("/signin", async ( req, res ) => {
    const email = req.body.email
    const password = req.body.pword
    let is_password_valid = false

    const account = await Account.findOne({ email: email })

    if (!account) {
        res.status(401).json({
            success: false,
            message: "Account couldn't be found"
        })
        return
    }
    else {
        is_password_valid = await bcrypt.compare(password, account.password)
    }
    
    if (is_password_valid) {
        signed_in_id = account._id
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            fname: account.first_name,
            lname: account.last_name,
            username: account.username,
            email: account.email
        })
    }
})

// put request for when a user adds a task to their account 
app.put("/add_task", async ( req, res ) => {
    const task_title = req.body.title
    const task_time = req.body.time
    const task_frequency = req.body.frequency

    if (signed_in_id.length != 0) {
        const add_task = await Account.findByIdAndUpdate(signed_in_id, {$push: {tasks: {title: task_title, time: task_time, frequency: task_frequency} } })

        if (add_task) {
            res.status(200).json({
                success: true,
                message: "Added task successfully" 
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong" 
            })
        }
    }
    else {
        var new_guest_task = new Task(task_title, task_time, task_frequency)
        guest_tasks.push(new_guest_task);
        // console.log(`\nNew Task values:\nTitle: ${new_guest_task.title}\nTime: ${new_guest_task.time}\nFrequency: ${new_guest_task.frequency}\n`)

        console.log(`Current Guest Task List:`)
        guest_tasks.forEach((element) => {
            console.log(`Title: ${element.title}, Time: ${element.time}, Frequency: ${element.frequency}`)
        })

        res.status(200).json({
            success: true,
            message: "Added task successfully to Guest"
        })
    }
})

// put request for when a user removes a task from their account 
app.put("/remove_task", async ( req, res ) => {
    const task_title = req.body.title
    let guest_task_found = false

    if (signed_in_id.length != 0) {
        const remove_task = await Account.findByIdAndUpdate(signed_in_id, {$pull: {tasks: { title: task_title } } })

        if (remove_task) {
            res.status(200).json({
                success: true,
                message: "Task successfully removed"
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }
    
    else {
        guest_tasks.forEach((value) => {
            if (value.title === task_title) {
                guest_task_found = true
                guest_tasks.splice(guest_tasks.indexOf(value), 1)
            }
        })

        if (guest_task_found) {
            console.log(`Current Guest Task List:`)
            guest_tasks.forEach((element) => {
                console.log(`Title: ${element.title}, Time: ${element.time}, Frequency: ${element.frequency}`)
            })

            res.status(200).json({
                success: true,
                message: "Task removed successfully from Guest"
            })
        } 
        else {
            res.status(400).json({
                success: false,
                message: "Task Not Found"
            })
        }
        guest_task_found = false
    }
})

// put request for when a user wants to edit a task
app.put("/edit_task", async ( req, res ) => {
    const task_title = req.body.title
    const task_time = req.body.time
    const task_frequency = req.body.frequency
    
    let guest_task_found = false

    if (signed_in_id.length != 0) {
        const edit_task = await Account.findByIdAndUpdate(signed_in_id, {$set: { tasks: {title: task_title, time: task_time, frequency: task_frequency}} })

        if (edit_task) {
            res.status(200).json({
                success: true,
                message: "Task successfully Edited"
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }
    
    else {
        guest_tasks.forEach((value) => {
            if (value.title === task_title) {
                guest_task_found = true
                
                console.log(`\nTask Previous values:\nTitle: ${value.title}\nTime: ${value.time}\nFrequency: ${value.frequency}\n`)

                value.title = task_title
                value.time = task_time
                value.frequency = task_frequency

                console.log(`\nTask new values:\nTitle: ${value.title}\nTime: ${value.time}\nFrequency: ${value.frequency}\n`)
                return
            }
        })

        if (guest_task_found) {
            res.status(200).json({
                success: true,
                message: "Task removed successfully from Guest"
            })
        } 
        else {
            res.status(400).json({
                success: false,
                message: "Task Not Found"
            })
        }
        guest_task_found = false
    }
})

app.listen(port, () => {
    console.log(`\nListening on port ${port}`)
    console.log(`Go to http://localhost:${port}`)
})