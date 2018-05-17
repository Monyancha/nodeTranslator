// modules
const http = require('http');
const request = require('request');
const path = require('path')
const dir = 'views';
const fs = require('fs');

// array to hold files matching criteria
var allFiles = [];

// function to async the forEach
function asyncFunction (file, cb) {
  setTimeout(() => {
  	// check if extension is correct
	if (path.extname(file) === ".handlebars" || path.extname(file) === ".html") {
		allFiles.push(file);
	}
    cb();
  }, 100);
}

// send the array as JSON format in GET request located in main file
function sendFiles() {
	return JSON.stringify(allFiles);
}

// main module w/ functios used in main file
module.exports = {
	// get files
	getFiles: function () {
		// read directory
		fs.readdir(dir, (err, files) => {

			// run function to push files to array
			let requests = files.reduce((promiseChain, file) => {
			    return promiseChain.then(() => new Promise((resolve) => {
			      asyncFunction(file, resolve);
			    }));
			}, Promise.resolve());

			// run function when done
			requests.then(() => sendFiles());
		});
	},

	// return the array containing all files generated fron loop
	sendFiles: function () {
		return sendFiles();
	},

	// route for translator
	translateRoute: function () {
		return "/dashboard/translator";
	}
};