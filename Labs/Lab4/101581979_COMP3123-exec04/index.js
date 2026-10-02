const express = require("express");
const path = require("path");

const app = express();

// Read JSON from the request body.
app.use(express.json());

// Serve files from the public folder.
app.use(express.static(path.join(__dirname, "public")));

// Return a plain-text greeting.
app.get("/hello", (req, res) => {
    res.type("text/plain").send("Hello Express JS");
});

// Read names from query parameters.
app.get("/user", (req, res) => {
    const firstname = req.query.firstname || "Pritesh";
    const lastname = req.query.lastname || "Patel";

    res.json({ firstname, lastname });
});

// Read names from path parameters.
app.post("/user/:firstname/:lastname", (req, res) => {
    const { firstname, lastname } = req.params;

    res.json({ firstname, lastname });
});

// Return the array sent in the request body.
app.post("/users", (req, res) => {
    const users = Array.isArray(req.body) ? req.body : [];

    res.json(users);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});