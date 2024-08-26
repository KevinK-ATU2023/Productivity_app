const port = 3000

const express = require("express")
const app = express()

app.get("/", ( req, res ) => {
    res.send("Hello from server!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Go to http://localhost:${port}\n`)
})