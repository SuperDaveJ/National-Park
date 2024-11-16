/* course script */
var blnLastPage = false;
var branchPageCompleted=false;
var enableNext = true;
var enableBack = true;
var hasAudio = false;
var autoPlay = false;
var hasSwitchableImg = false;
var controlAudio=false;
var branchPage=false;

/*if(branchArr == undefined){


}
*/
/**************** Course Comment Tool ****************/
var vpPath = "http://prod.c2ti.com/CommentTool/";	//path to Virtual Pilot site

function addComment() {
	comWin = window.open(vpPath + "addComment.asp?uID=NA&cID=NPS&mID="+getModule()+"&lID=0&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + "reviewComments.asp?uID=NA&cID=NPS&mID="+getModule()+"&lID=0&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}
/**************** End of Comment Tool ****************/

function exitConfirm(){
	if (confirm("Do you wish to exit the module?")==true) {
		exitCourse(true);
	}
}

function goNext() {
	if (enableNext) {
		gotoPage("f", nextURL);
	}
	return false;
}

function goBack() {
	if (enableBack) {
		gotoPage("b", backURL);
	}
	return false;
}

function goMenu() {
	toMenu();
	return false;
}

function show508version( pgURL ) {
	closing = false;
	window.location.href = pgURL;
}

function showVisited(imgId, imgExt) {
	
	imgPath = "images/" + imgId + "_2." + imgExt;
	$("#"+imgId).attr("src", imgPath);
	
}
function showVisited1(imgId, imgExt) {
	
	if ( $(window).width() <= 480 ) {	
	
		imgPath = "images/" + imgId + "_2_mob." + imgExt;
		
	}else{
		imgPath = "images/" + imgId + "_2." + imgExt;
	}
	
	$("#"+imgId).attr("src", imgPath);
	//alert("here:::"+$("#"+imgId).attr("src"))
	}
function showVisited2(imgId, imgExt, IDno) {
	imgPath = "images/" + imgId + "_2_mob." + imgExt;
		
	
	$(".switchable_"+IDno).attr("src", imgPath);
	}
function showVisited3(imgId, imgExt, IDno) {
	imgPath = "images/" + imgId + "_2." + imgExt;
	$(".switchable_"+IDno).attr("src", imgPath);
}
function showVisitedIcon(imgId, imgExt) {
	imgPath = "../sysimages/" + imgId + "_2." + imgExt;
	$("#"+imgId).attr("src", imgPath);
	
}

function submitTextInput( txtEntryId ) {
	uText = $("textarea").val();
	if ( inLMS ) {
	  //User input is limited to 255 characters by LMS system.
	  doLMSSetValue("cmi.interactions.0.id", txtEntryId);
	  doLMSSetValue("cmi.interactions.0.type", "fill-in");
	  doLMSSetValue("cmi.interactions.0.student_response", uText);
	}
}

/*********************** Open Popup Functions **********************************/
function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar, resize ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,location=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable="+resize+",status=no,scrollbars="+scrollbar+",top="+positionTop+",left="+positionLeft+"");
	newWin.focus();
	//if (window.focus) newWin.focus();
	return newWin;
}

function openNewWindow( strURL ) {
   openWinCentered(strURL, "External", 1000, 800, "yes", "yes");
}

function openHelp() {
	openWinCentered("../references/Help.html", "Help", 800, 600, "yes", "yes" );
}

function openGlossary() {
	openWinCentered("../references/Glossary.html", "Glossary", 800, 600, "yes", "yes" );
}

function openResources() {
	openWinCentered( "../references/resources.html", "Resources", 800, 600, "yes", "yes" );
	return false;
}

function show_cc() {
	filename = getPage() + "_cc.html";
    if ($(window).width() > 768) {
		openWinCentered( filename, "AudioTranscript", 500, 400, "yes", "yes" );
	} else {
		openWinCentered( filename, "AudioTranscript", 320, 450, "yes", "yes" );
	}	
}

function show_cc_popup(val) {
	filename = getPage() +val+ "_cc.html";
    if ($(window).width() > 768) {
		openWinCentered( filename, "AudioTranscript", 500, 400, "yes", "yes" );
	} else {
		openWinCentered( filename, "AudioTranscript", 320, 450, "yes", "yes" );
	}
}

function showPopup(iTerm) {
    filename = getPage() + "_pop.html?popId=" + iTerm;
    if ($(window).width() > 768) {
        openWinCentered(filename, "popupText", 500, 400, "yes", "yes");
    } else {
        openWinCentered(filename, "popupText", 320, 450, "yes", "yes");
    }
}
function showPopup_1(iTerm) {
    filename = getPage() + "_pop.html?popId=" + iTerm;
    if ($(window).width() > 768) {
        openWinCentered(filename, "popupText", 768, 400, "yes", "yes");
    } else {
        openWinCentered(filename, "popupText", 320, 450, "yes", "yes");
    }
}
function showPopupText(iTerm) {
	$(".span_3_of_6_overlay").show();
	$( "#close" ).click(function() {
	$(".span_3_of_6_overlay").hide();
});
    
}
function showPopupText1(iTerm,audioNum) {
   $( ".overlay").css("display","block")
	$( '#small-dialog_'+iTerm).css("display","block")
	$( "#close_"+iTerm ).click(function() {
		// $("#jquery_jplayer").jPlayer("stop");
		var currName=$(this).attr("id");
		var currID=currName.split("_")[1]
		$( ".overlay").css("display","none")
		$( '#small-dialog_'+currID).css("display","none")
	});
    
}

function showTabText(iTerm) {
	for(var i=1;i<=4;i++){
	$(".tab_box_main_"+i).css("display","none")
	}
	$(".tab_box_main_"+iTerm).css("display","block")
}
function showTabText1(iTerm,audioNum) {
	for(var i=1;i<=3;i++){
	$(".tab_box_main_"+i).css("display","none")
	}
	$(".tab_box_main_"+iTerm).css("display","block")
	var aFile= getPage() + audioNum;
	audioFile=aFile;
	playAudio(audioFile);
}
/******************* End of Open Popup Functions *************************/

/*********************** Audio Functions *********************************/
function playAudio(audioFile) {
	$("#jquery_jplayer").jPlayer("setMedia", {
		mp3: "audios/" + audioFile + ".mp3",
		oga: "audios/" + audioFile + ".ogg"
	}).jPlayer("play");
	
}

function replayAudio() {
    $("#jquery_jplayer").jPlayer("stop");
    $("#jquery_jplayer").jPlayer("play");
}

/********************** Question Feedback *************************/
function showFeedback(fdbkText) {
	var popWin;
	if (triesUser === triesLimit) {
		$("#next").removeClass("unavailable");
		$("#next").attr({tabindex: "", href: "javascript:goNext();"});
		$("#imgNext").css("visibility", "visible");
		enableNext = true;
		$("#done").hide();
	}

	//feedback title. this added when making modifications
	if (arguments.length == 2) {
		strTitle = "Assessment Question Feedback";
	} else {
		strTitle = "Learning Check Feedback";
	}
    if ( $(window).width() > 768) {
		popWin = openWinCentered("", "Feedback", 500, 400, "yes", "yes" );
	} else {
		popWin = openWinCentered("", "Feedback", 320, 450, "yes", "yes" );
	}
	
	style = "../styles/nps_pop.css";
	
	popWin.focus();
	if (popWin != null) {
		var strTemp = "";	
		strTemp	+= "<!DOCTYPE html><html><title>" + strTitle + "</title>";
		strTemp	+= "<link rel='stylesheet' type='text/css' href='" + style + "' />";
		strTemp	+= "<meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1'>";
		strTemp	+= "</head> <body><div id='contentArea'>";
		strTemp	+= "<h1 class='popTitle'>" + strTitle + "</h1>";
		strTemp	+= "<div id='popText'>";
		strTemp	+= fdbkText;
		strTemp	+= "</div></div>";
		strTemp	+= "<div id='close'><a href='javascript:self.close();'><img src='../sysimages/close_0.png' onmouseover='this.src=\"../sysimages/close_2.png\"' onmouseout='this.src=\"../sysimages/close_0.png\"' border='0' title='Close' alt='Close' /></a></div>";
		strTemp	+="</body></html>";
	
		popWin.document.write(strTemp);
		popWin.document.close();
	}
}
/********************** End of Question Feedback *************************/

/***** code used to fix old version of IE's image problem, need imgSizer.js *****/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

if ( inLMS == true ) {
	window.onunload = callExitCourse;
	//window.onbeforeunload = callExitCourse;
	initializePage();
}

$(document).ready(function () {
    addLoadEvent(function () {
        imgSizer.collate();
    });

    $("#next").on("click", goNext);
    $("#back").on("click", goBack);
    $("#courseMenu_H").on("click", goMenu);
    $("#resources_H").on("click", openResources);
    $("#glossary_H").on("click", openGlossary);
	$("#help_H").on("click", openHelp);
    $("#exit_H").on("click", exitConfirm);

    $("p.prompt").html(promptText);
    $("p.pgNum").html(pgNumText);
    if (!enableNext) $("#next").addClass("unavailable");
    if (!enableBack) $("#back").addClass("unavailable");
	    $("a").each(function () {
        if ($(this).hasClass("unavailable")) {
            $(this).attr({ tabindex: "-1", href: "javascript: return false;" });
            if ($(this).attr("id") == "next") {
                $("#imgNext").css("visibility", "hidden");
            }
            if ($(this).attr("id") == "back") {
                $("#imgBack").css("visibility", "hidden");
            }
        }
    });

    $("img").attr("title", function () { return this.alt; });
    $("img.selectable").on("click", function () {
        $(this).removeClass("selectable").addClass("selected");
    });

	/* Switchable Image */
	if ( hasSwitchableImg ) {
		$(window).resize(setImg);
		setImg();
	}
  // audioPlay();

    audioPlay();

});
function audioPlay(){
	 /* Audio function */
	
    if ( hasAudio ) {
	
        if (jQuery.browser.mobile) {
            autoPlay = false;
        } else{
			  autoPlay = true;
		 }
        if (autoPlay) {
            $("#jquery_jplayer").jPlayer({
					
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "audios/" + audioFile + ".mp3",
                        oga: "audios/" + audioFile + ".ogg"
                    }).jPlayer("play");
                },
                swfPath: "../scripts",
                supplied: "mp3, oga",
                cssSelectorAncestor: "#jp_container",
                wmode: "window"
            });
        } else {
            $("#jquery_jplayer").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "audios/" + audioFile + ".mp3",
                        oga: "audios/" + audioFile + ".ogg"
                    });
                },
                errorAlerts: true,
                swfPath: "../scripts",
                supplied: "mp3, oga",
                cssSelectorAncestor: "#jp_container",
                wmode: "window"
            });
        }
		
    }
}
function stopAudio(){
	//alert("here")
	$("#jquery_jplayer").jPlayer("stop");
}
function plyAudio(){
	//alert("here")
	$("#jquery_jplayer").jPlayer("play");
}