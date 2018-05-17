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

		// get every file and create select option
        files.forEach(file => {
        	let option = document.createElement("option");
        	option.value = file;
        	option.innerHTML = file;

        	// append to select element
        	document.getElementById("selectFile").appendChild(option);
        });
   });

	data.forEach(contry => {

		let option = document.createElement("option");
        option.value = contry.code;
        option.innerHTML = contry.name;

        // append to select element
        document.getElementById("selectCountry").appendChild(option);
		console.log(contry);
	});
}