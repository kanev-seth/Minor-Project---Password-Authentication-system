const express = require("express");
const bodyParser = require('body-parser');

const app = express(); //we call the entire package express and save it inside of another constant called “app”

var userIsAuth = false;

app.use(bodyParser.urlencoded({extended: false }));

function passwordCheck(req, res, next)
{
    const pass = req.body["password"];
    if(pass === "kanuseth")
    {
        userIsAuth = true;
    }
    next();
};

app.use(passwordCheck);

//this backend code lives inside of some server.
app.get("/", function(req, res)
{
    // console.log(req);
    res.sendFile(__dirname + "/index.html");
    //console.log(__dirname); //getting the exact location of the directory where this backend code is located(in which port, which server, etc).
});

app.post("/check", function(req, res)
{
    if(userIsAuth)
    {
        res.sendFile(__dirname + "/personal.html");
    }
    else
    {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/logout", function(req, res)
{
    userIsAuth = false;
    res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res)
{
    // console.log(req);
    res.send("About kanu seth : hehehehe");
});

//creating a web server - 3000.
app.listen(3000, function()
{
    console.log("Server has started on port 3000.");
});

//your backend code needs to continuously run.