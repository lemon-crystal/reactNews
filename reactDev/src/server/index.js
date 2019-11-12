var express = require("express");
var router = require("./router.js");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/", router);
// app.use(express.static('public'));


app.listen(3000, function() {
	console.log(3000);
})