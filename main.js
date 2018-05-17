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
}