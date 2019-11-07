/*
npm init
node install express body-parser 

add options in request()
get input of QUANTITY

*/
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    //console.log(req.body.crypto);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount

    var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL = baseURL + crypto + fiat;
    
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }

    request(options, finalURL, function (error, response, body) {
        //console.log(body);
        // use parse to turn into js object
        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);
        
        //var currentDate = data.display_timestamp;
        var currentDate = data.time;
        res.write("<p>The current date is  " + currentDate + "</p>");
        res.write("<h1>"+ amount + crypto + " is worth : "  + price + fiat + "</h1>" );
        res.send();
    });
});


app.listen(3000, function () {
    console.log("server is running on port 3000");
});