const express = require("express")
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")
const path = require('path')
const fs = require("fs")


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Requesting from HMTL files

// Routing on localhost server for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

// Routing on localhost server notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// Routing on localhost server for JSON 
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
});

app.post("/api/notes", function (req, res) {
    console.log(req.body)
    fs.writeFile("db/db.json", JSON.stringify(req.body), function (err) {
        if (err) {
            return
        }

        console.log("Yay")
    })
});


// need to add an ID in order to get text to display

app.listen(PORT, function () {
    console.log(`At listening on ${PORT}...`)
})