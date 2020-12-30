$(document).ready(function(){
	if ($('#rewardButton')[0]) {
	    $("#rewardButton").on("click", function() {
	       $('#QR').slideToggle(); 
	    });
	}
});
