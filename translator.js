// modules
const path = require('path')
const dir = 'views';
const fs = require('fs');

// main module w/ functios used in main file
module.exports = {
	// get files
	getFiles: function () {
		// read directory
		fs.readdir(dir, (err, files) => {
			// check all files
			files.forEach(file => {
				// check if extension is correct
				if (path.extname(file) === ".handlebars" || path.extname(file) === "html") {
				  	console.log(file);
				}
			});
		});
	}
};