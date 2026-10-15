/*
Purpose: 

Set up the path for the root /
Set up the middleware for JSON and URLencoding
Set up the path for the NotesRoutes 

*/

const express = require("express")
const mongoose = require("mongoose")
const notesRoutes = require("./routes/notesRoutes")

const PORT = process.env.PORT || 8081
const DB_URL = "mongodb+srv://101581979_db_user:VBPyVrHB9D8sdB0c@week06cluster.kfnct7n.mongodb.net/"

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ encoded: true}))

// Set up the route to the root / path
app.get("/", (request, response) => {
    response.send("<h1> Welcome to the root path of the server")
})

// Set up our route to route set up in the routes/NoteRoutes.js file
app.use("/api", notesRoutes)

// Set ip the connection to the MongoDB using our connection string
//and mongoose framework
mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connected to the MongoDB Atlas server")
    app.listen(PORT, () => {
        console.log(`Server listening at port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
    console.log("Could not connect to the MongoDB server")
    process.exit(1)
})