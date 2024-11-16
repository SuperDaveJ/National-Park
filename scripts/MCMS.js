/* jQuery based Multiple Choice Question with distractor specific feedback
 * C2 XZ - Sept 2012
 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A","B","C","D");

var fdbkIncorrect0  = "<p>You have not made any selections.  Please try again.</p>"
var judgeInteraction = function() {
	var strTemp;
	userAns=[];
	for(var i=0;i<nItems;i++){
		
			//alert($("#qForm input[id='"+letters[i]+"_'+j+'']:checked"))
			if ($("#"+letters[i]).attr('checked'))  {
            	userAns.push(i)
         	 }
		
	}
	if (userAns == "" || userAns == undefined) {
		strTemp = fdbkIncorrect0;
	} else {
	var corrCnt=calCorrAns();
	
	triesUser += 1;
		
		if (triesUser == triesLimit)
		 {
			if (corrCnt == nItems)
			{
			 	 triesUser = triesLimit;
			 	 strTemp = fdbkCorrect;
		 		
			} else {
				strTemp = fdbkFinalIncorrect;
				showAns()
			}
			disableQ();
		 }
		else {
			if (corrCnt == nItems) {
				triesUser = triesLimit;
				strTemp = fdbkCorrect;
				disableQ();
			} else {
				strTemp = fdbkIncorrect1[0];
			}
		}
	}
	showFeedback(strTemp);
}
function calCorrAns(){
	var corrCnt=0;
	for(var i=0;i<nItems;i++){
		if(userAns[i]==ansCorrect[i]){
			corrCnt++;
		}
	}
	return corrCnt;
}
function showAns(){
	resetQ();
	for(var i=0;i<ansCorrect.length;i++){
		$("#"+letters[ansCorrect[i]]).attr('checked',true)
	}
	
}
function resetQ(){
	for(var i=0;i<nItems;i++){
		$("#"+letters[i]).attr('checked',false)
	}
}
function disableQ() {
	$("input:checkbox").attr("disabled", "disabled");
    $("input[name='mc']").css("cursor", "default");
}/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("#qForm").append("<table id='qTable' width='" + widthTable + "%' cellspacing='0' cellpadding='5' border:0></table>");
  for (var i=0; i<nItems; i++) {
	  myTr = "<tr style='border:0'><td class='rdck'><input name='mc' id='" + letters[i] + "' type='checkbox' /></td>";
	  myTr += "<td class='letter'>" + letters[i] + ".</td>";
	  myTr += "<td class='disTxt'><label for='" + letters[i] + "'>" + distracters[i] + "</label></td></tr>";
	  $("#qTable").append(myTr);
  }
  //$("#qTable").append("<tr><td colspan='3'>&nbsp;</td></tr>");
  var myBtn = "<tr style='border:0'><td colspan='3' align='center'>";
  myBtn += "<a href='javascript:judgeInteraction()'><img id='done' name='done' src='../sysimages/done_0.png' onmouseover='this.src=\"../sysimages/done_2.png\"' onmouseout='this.src=\"../sysimages/done_0.png\"' border='0' alt='Done' /></a>";
  myBtn += "</td></tr>";
  $("#qTable").append(myBtn);
  
  $("input[name='mc']").css("cursor", "pointer");
});