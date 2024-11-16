/* jQuery based Multiple Answer Question - C2 XZ - Nov. 2013 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

var fdbkIncorrect0  = "<p>You have not made any selections.  Please try again.</p>"
 
var judgeInteraction = function() {
	var strTemp;
	
	ansUser = $("input:checkbox").map( function() {
		return (this[checked="checked"]) ? this.id : "";
	}).get().join("");
	
	if (ansUser == "") {
		strTemp = fdbkIncorrect0;
	} else {
		triesUser += 1;
		if (ansUser == strCorrectAns) {
			triesUser = triesLimit;
			strTemp = fdbkCorrect;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var i=0; i<nItems; i++) {
					$("input:checkbox[id='" + letters[i] + "']").attr("checked", false);
				}
				for (var i=0; i<strCorrectAns.length; i++) {
					$("input:checkbox[id='" + strCorrectAns.charAt(i) + "']").attr("checked", true);
				}
				strTemp = fdbkFinalIncorrect;
				disableQ();
			} else {
				strTemp = fdbkIncorrect1;
			}
		}
	}
	showFeedback(strTemp);
}

function disableQ() {
	$("input:checkbox").attr("disabled", "disabled");
    $("input[name='ma']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("#qForm").append("<table id='qTable' width='" + widthTable + "%' cellspacing='0' cellpadding='8' border=0></table>");
  for (var i=0; i<nItems; i++) {
	  myTr = "<tr><td class='rdck'><input name='ma' id='" + letters[i] + "' type='checkbox' /></td>";
	  myTr += "<td class='letter'>" + letters[i] + ".</td>";
	  myTr += "<td class='disTxt'><label for='" + letters[i] + "'>" + distracters[i] + "</label></td></tr>";
	  $("#qTable").append(myTr);
  }
  $("#qTable").append("<tr><td colspan='3'>&nbsp;</td></tr>");
  myBtn = "<tr><td colspan='3' align='center'>";
  myBtn += "<a href='javascript:judgeInteraction()'><img id='done' name='done' src='../sysimages/done_0.png' onmouseover=\"this.src='../sysimages/done_2.png'\" onmouseout=\"this.src='../sysimages/done_0.png'\" border='0' alt='Submit' /></a>";
  myBtn += "</td></tr>";
  $("#qTable").append(myBtn);
  
  $("input[name='ma']").css("cursor", "pointer");
});