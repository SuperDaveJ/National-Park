/* jQuery based Multiple Choice Question with distractor specific feedback
 * C2 XZ - Sept 2012
 */
var triesUser = 0;
var triesLimit = 2;
var totalchoices = 2;
var letters = new Array("1", "2", "3", "4", "5", "6", "7", "8");
var userAns=new Array();
var fdbkIncorrect0  = "<p>You have not made any selections.  Please try again.</p>"

var judgeInteraction = function() {
	var strTemp;
	userAns=[];
	for(var i=0;i<nItems;i++){
		for(var j=1;j<=totalchoices;j++)
		{
			//alert($("#qForm input[id='"+letters[i]+"_'+j+'']:checked"))
			if ($("#"+letters[i]+"_"+j).attr('checked'))  {
            	userAns.push(j)
         	 }
		}
	}
	var corrCnt=calCorrAns();
	
	if (userAns.length ==0) {
		strTemp = fdbkIncorrect0;
	} else {
	triesUser += 1;
	if (triesUser == triesLimit)
		 {
			
			if (corrCnt == nItems)
			{
			 	 triesUser = triesLimit;
			 	 strTemp = fdbkCorrect;
		 		
			} else {
				strTemp = fdbkIncorrect1[1];
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
	for(var i=0;i<nItems;i++){
		$("#"+letters[i]+"_"+ansCorrect[i]).attr('checked',true)
	}
	
}
function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    $("input[name='mc']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("#qForm").append("<table id='qTable' width='" + widthTable + "%' cellspacing='0' cellpadding='5' border=0></table>");
   myTr = "<tr><td class='letter_1'></td>";
  myTr += "<td class='disTxt_1 disTextHead'><label for=''>Statement</label></td>";
   myTr += "<td class='rdck_1 disTextHead'>PCORI</td>";
   myTr += "<td class='rdck_1 disTextHead'>Research Partners</td></tr>";
  for (var i=0; i<nItems; i++) {
	 
	if(i==0){
		  myTr += "<tr><td class='letter_1'>" + letters[i] + ".</td>";
	 }else{
		  myTr = "<tr><td class='letter_1'>" + letters[i] + ".</td>";
	 }
	  myTr += "<td class='disTxt_1'><label for='" + letters[i] + "'>" + distracters[i] + "</label></td>";
	  myTr += "<td class='rdck_1'><input name='" + letters[i] + "' id='" + letters[i] + "_1' type='radio' value='1' /></td>";
	  myTr += "<td class='rdck_1'><input name='" + letters[i] + "' id='" + letters[i] + "_2' type='radio' value='2'/></td></tr>";
	  $("#qTable").append(myTr);
  }
  //$("#qTable").append("<tr><td colspan='3'>&nbsp;</td></tr>");
  var myBtn = "<tr style='border:0'><td colspan='4' align='center' >";
  myBtn += "<a href='javascript:judgeInteraction()'><img id='done' name='done' src='../sysimages/done_0.png' onmouseover='this.src=\"../sysimages/done_2.png\"' onmouseout='this.src=\"../sysimages/done_0.png\"' border='0' alt='Done' /></a>";
  myBtn += "</td></tr>";
  $("#qTable").append(myBtn);
  
  $("input[name='mc']").css("cursor", "pointer");
});

