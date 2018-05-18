window.onload = start;

var elements = [];
var from;
var to;
function start() {
	// init select
    $(document).ready(function() {
	    $('.mdb-select').material_select();
	});

    // get the data from translator.js
	$.get("/translator/fileData", {}, function(data){

		// set from and to languages
		from = data.from;
		to = data.to;
		console.log(to);

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
function translate() {

	// run yandex translator
	textField = document.getElementById("translateText");
	textField.value = elements[0].textContent;
	removeWhiteSpace();
	textField.value = removeWhiteSpace();
	translator(textField.value);

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

function translator(text) {
	// get the data from translator.js
	$.get("https://translate.yandex.net/api/v1.5/tr.json/translate?"
		+ "key=trnsl.1.1.20180518T012329Z.b73950d2865d8de5.dda04c58ef76240ad5589baf431e12f8f1f5a0bd"
		+ "&lang=" + to + "&text=" + text, {}, function(data) {
			textField.value = data.text;
			console.log(data);
	});
}