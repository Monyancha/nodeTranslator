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

   		// to
        let optionTo = document.createElement("option");
        optionTo.value = contry.code;
        optionTo.innerHTML = contry.name;

        // set RU as pre-selected
        if (optionTo.value === "RU") {
        	optionTo.setAttribute("selected", true);
        }

        // append to select country elements
        document.getElementById("selectCountryTo").appendChild(optionTo);
	});

	// init modes
	let btns = document.getElementsByClassName("translatorBtn");
	btns[0].addEventListener("click", stepByStep);
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