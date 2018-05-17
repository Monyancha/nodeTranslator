window.onload = start;

function start() {
	// init select
    $(document).ready(function() {
	    $('.mdb-select').material_select();
	});

    // get the data from translator.js
	$.get("/dashboard/translator/files", {}, function(data){

		// parse JSON
		let files = JSON.parse(data);

		// get every file and create select options
        files.forEach(file => {
        	let option = document.createElement("option");
        	option.value = file;
        	option.innerHTML = file;

        	// append to select file element
        	document.getElementById("selectFile").appendChild(option);
        });
   });

	// get data from JSON file and create options
	data.forEach(contry => {

		// from
		let optionFrom = document.createElement("option");
        optionFrom.value = contry.code;
        optionFrom.innerHTML = contry.name;

        // set NO as pre-selected
        if (optionFrom.value === "NO") {
        	optionFrom.setAttribute("selected", true);
        }

   		// to
        let optionTo = document.createElement("option");
        optionTo.value = contry.code;
        optionTo.innerHTML = contry.name;

        // set US as pre-selected
        if (optionTo.value === "US") {
        	optionTo.setAttribute("selected", true);
        }

        // append to select country elements
        document.getElementById("selectCountryFrom").appendChild(optionFrom);
        document.getElementById("selectCountryTo").appendChild(optionTo);
	});

	// init modes
	let btns = document.getElementsByClassName("translatorBtn");
	btns[0].addEventListener("click", quick);
	btns[1].addEventListener("click", stepByStep);
}

// send POST to /quick
function quick() {
	getValues();
	document.querySelectorAll("form")[0].setAttribute("action", "/translator/quick");
	document.querySelectorAll("form")[0].submit();
}

// send POST to /stepByStep
function stepByStep() {
	getValues();
	document.querySelectorAll("form")[0].setAttribute("action", "/translator/stepByStep");
	document.querySelectorAll("form")[0].submit();
}

// get values
function getValues() {
	// set values
	let selects = document.querySelectorAll("select");
	let inputs = document.querySelectorAll("form")[0].querySelectorAll("input");
	for (let i = 0; i < selects.length; i++) {
		inputs[i].value = selects[i].value.toLowerCase();
	}
}