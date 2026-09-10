/*
 Purpose
 We'll use Node to create a Server and then listen on that server for any 
incoming request. Then return a response.

 */

var http = require("http")

http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/html"
    })
    response.end("The server is now running successfully and listening")
}).listen(8088)

//Optiinal Homewrok: try another Port Number