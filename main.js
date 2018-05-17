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
		let option = document.createElement("option");
        option.value = contry.code;
        option.innerHTML = contry.name;

        // append to select country element
        document.getElementById("selectCountry").appendChild(option);
	});
}