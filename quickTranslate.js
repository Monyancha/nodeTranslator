window.onload = start;

function start() {
	// init select
    $(document).ready(function() {
	    $('.mdb-select').material_select();
	});

    // get the data from translator.js
	$.get("/translator/fileData", {}, function(data){

		// set data to iframe and hide
		document.getElementById("iframe").style.display = "none";
		document.getElementById("iframe").innerHTML = data.html;

		// get every line from JSON and convert to HTML elements
		let split = data.html.split("<");
		split.forEach(line => {
			console.log("<" + line);
		})
	});
}