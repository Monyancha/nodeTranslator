window.onload = start;

function start() {
	// init select
    $(document).ready(function() {
	    $('.mdb-select').material_select();
	});

	$.get("/dashboard/translator/files", {}, function(data){
        console.log(data)
   });
}