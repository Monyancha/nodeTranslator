window.onload = start;

var elements = [];
var from;
var to;
var frame;
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
		frame = document.getElementById("iframe").contentDocument.childNodes[1];

		// get all nodes
		let text = frame.querySelectorAll("*");
		let count = 0;
		text.forEach(child => {
			count++;
			// set class for referance
			child.classList.add("translatedElement" + count);

			// run html validation
			checkHTML(child);
		});

		console.log(elements);
		translate();
	});
}

// set up the translator
var textField;
var elementCounter = 1;
function translate() {

	// run yandex translator
	document.getElementById("eleCount").innerHTML = "Element " + elementCounter + " of " + elements.length;
	textField = document.getElementById("translateText");
	translator(elements[elementCounter - 1].innerHTML);

	// init ok translate event
	document.getElementById("nextElement").addEventListener("click", translateOk);
}

// update 
function translateOk() {

	// remove event if no more text to translate
	if (elementCounter === elements.length) {
		this.removeEventListener("click", translateOk);
	}

	else {
		elementCounter++;
		translator(elements[elementCounter - 1].innerHTML);
		document.getElementById("eleCount").innerHTML = "Element " + elementCounter + " of " + elements.length;
	}
}

// translate selected text
function translator(text) {
	// get the data from translator.js
	$.get("https://translate.yandex.net/api/v1.5/tr.json/translate?"
		+ "key=trnsl.1.1.20180518T012329Z.b73950d2865d8de5.dda04c58ef76240ad5589baf431e12f8f1f5a0bd"
		+ "&lang=" + to + "&text=" + text, {}, function(data) {
			textField.value = data.text;
			console.log(data);
	});
}

// check if text is of HTML
function checkHTML(child) {
	let test = /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(child.innerHTML);
	if (test === false && child.innerHTML != "" && child.innerHTML != " ") {
		// push to array if ok
		elements.push(child);
	}
}