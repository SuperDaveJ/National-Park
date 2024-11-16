/* jQuery based Multiple Choice Question with distractor specific feedback
 * C2 XZ - Sept 2012
 */
var triesUser = 0;
var triesLimit = 2;

var corrAnswer=["Reference Manual 36","Housing Management Plan (HMP)","Internet Quarters Management Information System  (iQMIS)","OMB Circular A-45","Director's Order 36"];

var fdbkIncorrect0  = "<p>Please select all answers before selecting the Submit button.</p>"

var judgeInteraction = function() {
	var strTemp;
	if(document.qForm["box_0"].value==""||document.qForm["box_1"].value==""||document.qForm["box_2"].value==""||document.qForm["box_3"].value==""||document.qForm["box_4"].value==""||document.qForm["box_0"].value==undefined||document.qForm["box_1"].value==undefined||document.qForm["box_2"].value==undefined||document.qForm["box_3"].value==undefined||document.qForm["box_4"].value==undefined){
		strTemp = fdbkIncorrect0;
	
	}else{
		var corrcnt=0;
		triesUser += 1;
		for (var i=0; i<nItems; i++) {
		
		if(document.qForm["box_"+i].value==corrAnswer[i]){
		corrcnt++;
		
		}else if(corrcnt>=3 && corrcnt!=nItems){
		strTemp = fdbkpartialIncorrect;
		}else if(corrcnt==nItems){
		strTemp = fdbkCorrect;
		disableQ();
		}else{
		strTemp = fdbkIncorrect;
		}
		if(triesUser==triesLimit){
		strTemp = fdbkFinalIncorrect;
		document.qForm["box_"+i].value=corrAnswer[i];
		disableQ();
		}if(corrcnt==nItems){
		strTemp = fdbkCorrect;
		disableQ();
		}
		
	}
	}
	showFeedback(strTemp);
}

function disableQ() {
	for(var i=0;i<nItems;i++){
		$("#box_"+i).prop("disabled", true);
		$("#done").css('display', 'none');
	}
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("#qForm").append("<table id='qTable' width='" + widthTable + "%' cellspacing='0' cellpadding='5' border=0></table>");
	for(var i=0;i<nItems;i++){
	   myTr = "<tr><td class='dropdown'><select tabindex='7' id=box_" + i + ">";
	   myTr += "<option value=''><p align='center'>select</option></p>";
	   for (var j=0; j<optionValue.length; j++) {
	   var optionValue_str=optionValue[j]	 
		myTr += "<option value='" + optionValue_str + "'>" + optionValue_str + "</option>";
		}
		myTr +="</td></select>";
		myTr += "<td class='dropdownTxt'><label for=box_'" + i + "'>" + distracters[i] + "</label></td></tr>";
	  $("#qTable").append(myTr);
  }
  //$("#qTable").append("<tr><td colspan='3'>&nbsp;</td></tr>");
  var myBtn = "<tr><td colspan='3' align='center'>";
  myBtn += "<a href='javascript:judgeInteraction()'><img id='done' name='done' src='../sysimages/done_0.png' onmouseover='this.src=\"../sysimages/done_2.png\"' onmouseout='this.src=\"../sysimages/done_0.png\"' border='0'  title='Submit' alt='Submit' tabindex='8' /></a>";
  myBtn += "</td></tr>";
  $("#qTable").append(myBtn);
  
 });