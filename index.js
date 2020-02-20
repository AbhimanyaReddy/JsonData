const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var Firebase = require("firebase");
var morgan = require("morgan");
var bodyParser = require("body-parser"); 
var methodOverride = require("method-override");
var multer = require("multer");
var fs = require("fs");
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
var config = {
  apiKey: "AIzaSyCcz-IVNrPlKBCIfkjCy-R4IgmMQut8qoQ",
  authDomain: "temperature-and-humidity-e8dfd.firebaseapp.com",
  databaseURL: "https://temperature-and-humidity-e8dfd.firebaseio.com",
  projectId: "temperature-and-humidity-e8dfd",
  storageBucket: "temperature-and-humidity-e8dfd.appspot.com"
};
Firebase.initializeApp(config);

var database = Firebase.database().ref().child("sensor/dht");

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

//app.get("/", function(req, res) {
//  res.sendfile("./index.html");
//});

// get users
app.get("/", function(req, res) {
  database.on("value", snapshot => {
    var deb = snapshot.val();
    var keys = Object.keys(deb);
    var vary = keys.length;
    var k = keys[vary - 1];
    var humidity = deb[k].humidity;
    var temp = deb[k].temp;
    var datetime = deb[k].Datetime;
    res.json({"Datetime":datetime,"Humidity":humidity,"Temperature":temp});
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
