/*
Use Express route to serve the page
app.use()
*/

const express = require("express")
const fs = require("fs")
const dataFormat = require("dateformat")

var books = require("./Books.js")     // This will allow us to access
// all of the exports from Book.js
var computers = require("./Computers.js")

const app = express()
const router = express.Router()

// Helper function --------------------------------
let writeData = (data) => {
    data += "\n"
    fs.appendFile("server_log.txt", data, function (error){
        if(error){
            throw error
        }
        console.log("Log Saved!")
    })
}

// Callback for the server
let logger = (request, response, next) => {
    const todays = dataFormat(Date(), "dddd, mmmm ds, yyyy, h:mm:ss TT")
    let data = `[${todays} ${request.originalUrl} ]`
    writeData(data)
    next()
}
// ---------------------------------------------------
app.use(logger)

let bookLogger = (request, response, next) => {
    console.log("Books logger called")
    next()
}

app.use("/books", bookLogger, books)
app.use("/books/computers", computers)

app.listen(8080)
console.log("Web server is listening at port: " + 8080)
