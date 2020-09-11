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

//default route to start page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {
    console.log(req.body);

    // fs.read db.json to a variable `originalJsonFileArray`
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log("fs readFile err: ", err);
        }

        let originalJsonFileArray = null;
        let dataStr = data.toString();
        console.log("fs readFile data: ", data);
        console.log("fs readFile data: ", data.toString());

        // if data string is NOT empty
        if (dataStr !== "") {
            //JSON.parse file contents into an array
            originalJsonFileArray = JSON.parse(dataStr);
        }

        let newNote = req.body;
        //push the new note to the array
        originalJsonFileArray.push(newNote);

        //save the array back to db.json
        fs.writeFile("db/db.json", JSON.stringify(originalJsonFileArray), function (err) {
            if (err) {
                return
            }
            console.log("Yay");

            //The function's Promises will run
            res.send("Success");
        });
    });
});

app.delete("/delete/note/:id", function (req, res) {
    let id = req.params.id;

    // fs.read db.json to a variable `originalJsonFileArray`
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log("fs readFile err: ", err);
        }

        let originalJsonFileArray = null;
        let dataStr = data.toString();
        console.log("fs readFile data: ", data);
        console.log("fs readFile data: ", data.toString());

        // if data string is NOT empty
        if (dataStr !== "") {
            //JSON.parse file contents into an array
            originalJsonFileArray = JSON.parse(dataStr);
        }

        //search for matching record in the originalJsonFileArray
        let index = originalJsonFileArray.findIndex(obj => obj.id === id);
        //remove match from originalJsonFileArray
        originalJsonFileArray.splice(index, 1);

        //save the array back to db.json
        fs.writeFile("db/db.json", JSON.stringify(originalJsonFileArray), function (err) {
            if (err) {
                return
            }
            console.log("Yay");

            //The function's Promises will run
            res.send("Success");
        });
    });
});

// allows the server to keep running
app.listen(PORT, function () {
    console.log(`At listening on ${PORT}...`)
})