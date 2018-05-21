// main modules
require('dotenv').config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const path = require('path')
const dir = 'views';
const fs = require('fs');
const mkdirp = require('mkdirp');

// translator
const translator = require("./public/js/translator/translator.js");
translator.getFiles();

// server setup
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3500;

// handlebars
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(`${__dirname}/public`));

app.get(translator.translateRoute(), (req, res) => {
	res.render("translator");
});

app.get(translator.translateRoute() + "/files", (req, res) => {
	res.json(translator.sendFiles());
});

var fileData;
var file;
var to;
app.post("/translator/stepByStep", (req, res) => {
	// data
	file = req.body.file;
	to = req.body.to;

	fs.readFile(dir + "/" + file, 'utf8', function(err, data) {
		if (err) {
		   	return console.log(err);
		}

		let htmlString = {html: data, to: req.body.to, file: req.body.file};
		fileData = htmlString;
	});

	res.render("quick");
}); 

app.get("/translator/fileData", (req, res) => {
	res.json(fileData);
});

// get request and create file
app.post("/translator/download", (req, res) => {
	
	var POST = {};
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();

            // create file and append to folder
            const dir = makeDir("views/translated");
            fs.writeFile(dir + "/" + file.split(".")[0] + to + "." + file.split(".")[1], data, function (err) {
			  if (err) throw err;
			 	console.log('Saved!');
			});
        })
    }
});

// create directory
function makeDir(dirPath) {
	try {
		fs.mkdirSync(dirPath)
	} catch (err) {
		if (err.code !== 'EEXIST') throw err 
	}
	return dirPath;
}

// render available translated files
app.get("/:leg", function(req, res, next) {
	res.render("translated/" + req.params.leg);
});

// 	404
app.get('*', function(req, res){
  res.send('what???', 404);
});

// start server
server.listen(port, () => {
	console.log(`Server started on ${port}`);
});