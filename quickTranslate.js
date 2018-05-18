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
			// run html validation
			checkHTML(child);
		});

		let scripts = frame.querySelectorAll("script");
		scripts.forEach(script => {
			//script.src = script.src + "s";
			//console.log(script)
		});

		console.log(elements);
		translate();
	});
}

// initalize translator
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

// update and go to next text
function translateOk() {

	// remove event if no more text to translate
	console.log(elementCounter);
	console.log(elements.length);
	if (elementCounter != elements.length) {
		elementCounter++;
		translator(elements[elementCounter - 1].innerHTML);
		document.getElementById("eleCount").innerHTML = "Element " + elementCounter + " of " + elements.length;
		if (elementCounter === elements.length) {
			//this.setAttribute("disabled", false);
			this.removeEventListener("click", translateOk);
			this.addEventListener("click", downloadFile);
			this.innerHTML = "<i class='fa fa-arrow-right mr-1' aria-hidden='true'></i> Download File!";
		}
	}

	// init previous
	if (elementCounter > 1) {
		document.getElementById("back").addEventListener("click", previous);
		document.getElementById("back").removeAttribute("disabled", true);
	}

	else {
		document.getElementById("back").removeEventListener("click", previous);
		document.getElementById("back").setAttribute("disabled", false);
	}
}

// go to previous text
function previous() {
	document.getElementById("nextElement").innerHTML = "<i class='fa fa-arrow-right mr-1' aria-hidden='true'></i> Looks good!";
	document.getElementById("back").addEventListener("click", previous);
	document.getElementById("back").removeAttribute("disabled", true);
	elementCounter--;
	if (elementCounter < 2) {
		document.getElementById("back").removeEventListener("click", previous);
		document.getElementById("back").setAttribute("disabled", false);
	}

	else {
		document.getElementById("nextElement").removeAttribute("disabled", true);
		document.getElementById("nextElement").addEventListener("click", translateOk);
	}

	translator(elements[elementCounter - 1].innerHTML);
	document.getElementById("eleCount").innerHTML = "Element " + elementCounter + " of " + elements.length;
}

// translate selected text
function translator(text) {
	// get the data from translator.js
	$.get("https://translate.yandex.net/api/v1.5/tr.json/translate?"
		+ "key=trnsl.1.1.20180518T012329Z.b73950d2865d8de5.dda04c58ef76240ad5589baf431e12f8f1f5a0bd"
		+ "&lang=" + to + "&text=" + text, {}, function(data) {
			textField.value = data.text;
			console.log(data);

			// update element
			elements.forEach(child => {
				if (child.classList.contains("translatedElement" + (elementCounter - 1))) {
					child.innerHTML = data.text;
					console.log(child.innerHTML);
					console.log(child.outerHTML);
				}
			});
			//document.getElementsByClassName("translatedElement" + elementCounter)[0].innerHTML = data.text;
	});
}

// check if text is of HTML
function checkHTML(child) {
	let test = /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(child.innerHTML);
	if (test === false && child.innerHTML != "" && child.innerHTML != " ") {
		// push to array if ok
		elements.push(child);
		// set class for referance
		child.classList.add("translatedElement" + elements.indexOf(child));
	}
}

// download translated file
function downloadFile() {
	//console.log(123);
	//console.log(frame);
	//document.getElementById("fileData").value = frame.outerHTML;
	//console.log(document.getElementById("fileData").value);
	//document.getElementById("downloadFile").submit();

	var request = new XMLHttpRequest();
	request.onreadystatechange= function () {
	    if (request.readyState==4) {
	    	console.log(request);
	        //handle response
	    }
	}
	request.open("POST", "/translator/download", true);
	request.setRequestHeader("X-XSS-Protection", 0);
	request.send(frame.outerHTML);
}