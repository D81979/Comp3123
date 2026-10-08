/*
Setting up all the route for the /books path

*/

const express = require("express")
const router = express.Router()

router.route("/")
    .get((request, response) => {
        response.send("GET method was used - GET a random book")
    })

module.exports = router