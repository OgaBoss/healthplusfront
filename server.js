var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var rootPath = path.normalize(__dirname + "/");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + "/app"));
app.use(express.static(rootPath + "/public"));

app.get("*", function(req, res) {res.sendFile(rootPath + '/app/index.html')});


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


app.listen(port, function(err) {
	console.log('Our app is running on http://localhost:' + port);
});