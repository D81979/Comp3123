/*
Purpuse:
- Server multiple patths from an express server using routes
- serve a static html file
- Exract GET params (compare with GET query)
*/

const express = require("express")
const app = express()

const SERVER_PORT = process.env.PORT || 3000

//  ---------------------- SET UP MIDDLEWARE FOR EXPRESS ----------------------
// Serve static files
// The URL of the web page can be access through localhost:3000/static
app.use("/static", express.static("public"))

// Serve JSON
app.use(express.json())

// Read URL params or queries
// Extended : true property in JSON object passed as arg to urlencoded
// Let us use qs library
app.use(express.urlencoded({ extended: true }))

// ----------------------------------------------------------------------------

app.get("/", (request, response) => {
    response.send("<h1> Welcome to the root of the server - using GET method</h1>")

})

app.get("/hello", (request, response) => {
    response.status(200).send("<h1>Welcome to the /hello path on the server </h1>")
})

app.get("/college", (request, response) => {
    const college = {
        name: "George Brown Polytecnic",
        location: "Toronto",
        estanlished: 1967
    }
    response.json(college)
})

app.get("/students", (request, response) => {
    // Validate that the GET url is correct
    if(!request.query.name || !request.query.age){
        return response.status(400).json({
            error: "Missing query parameter"
        })
    }
    console.log(request.query)
    const name = request.query.name
    const age = request.query.age

    response.json({
        student_name:  name,
        student_age: age
    })
})

app.get("/students/:name/:age", (request, response) => {
    console.log(request.params)

    // if name is null / age is null -> Error
    if (!request.params.name || !request.params.age){
        return response.status(400).json({error: "You must pass in name and age"})
    }

    const name = request.params.name
    const age  = request.params.age

    response.json({
        sttudent_name: name,
        student_age: age
    })
})

// ----------- Tru using POST, PUT, DELETE methods
app.post("/students", (request, response) => {
    const student = request.body
    console.log(student)

    const{ name, age } = student        // Destucturing
    
    if(!student.name || !student.age){      // Verification of POST body data
        return response.status(400).json({ Error: "Missing either name or age in body" })
    }

    response.json({
        student_name: name,
        student_age: age
    })
})

// ----------

app.listen(SERVER_PORT, () => {
    console.log("Server is running on http://localhost" + SERVER_PORT)
})
