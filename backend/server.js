const port = 3000

// basic server 
const express = require("express")
const app = express()

// database 
const mdb = require("mongoose")

mongoose_connect().catch((err) => { console.log(err) });

async function mongoose_connect() {
    await mdb.connect('mongodb+srv://kkarundu8:aBKCgW168jnWz4WJ@cluster0.m2gfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Go to http://localhost:${port}\n`)
})