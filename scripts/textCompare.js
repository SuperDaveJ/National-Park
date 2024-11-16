// JavaScript Document for comparing user inpupt with sample answer
function compareText() {
	uText = $("textarea").val();
	uText = $.trim(uText);
	if ( uText == "" || uText == "Type your answer in this area." ) {
		alert("\nYou need to answer the question to continue.")
		return;
	} else {
		$("#userImg").css("display", "none");
		$("#sampleAnsHolder").css("height", "auto");
	}
	$("textarea").attr("readonly", "readonly").css("color", "#666");
	$("#done").hide();
	$("#inst").hide();
}
