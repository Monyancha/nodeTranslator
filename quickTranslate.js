window.onload = start;

var elements = [];
function start() {
	// init select
    $(document).ready(function() {
	    $('.mdb-select').material_select();
	});

    // get the data from translator.js
	$.get("/translator/fileData", {}, function(data){

		// set data to iframe and hide
		document.getElementById("iframe").style.display = "none";
		document.getElementById("iframe").contentDocument.write(data.html);
		console.log(document.getElementById("iframe"));

		// remove all scripts and styles and store for later
		let frame = document.getElementById("iframe").contentDocument.childNodes[1];

		let text = frame.querySelectorAll("body");
		let count = 0;
		text.forEach(child => {
			elements.push(child);
		});

		console.log(elements);
		translate();
	});
}

var textField;
var eleCounter;
var currentEle = 0;
function translate() {
	textField = document.getElementById("translateText");
	textField.value = elements[currentEle].textContent;
	removeWhiteSpace();
	textField.value = removeWhiteSpace();

	// init ok translate event
	document.getElementById("nextElement").addEventListener("click", translateOk);
}

function translateOk() {


}

function removeWhiteSpace() {
	let s = textField.value;
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}