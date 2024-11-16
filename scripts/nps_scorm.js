//This is a Course SCO for PCORI course hosted in Moodle
var reviewMode = false;	//change the style in content.css to hide comment links
var nModules = 1;
var bookmark = "";
var moduleStatus = "00";
var courseStatus = "";
var strPagesViewed = "";
var inLMS = true;	//Remember to change this to true for delivery

function gotoPage(direction, pgURL) {
	closing = false;
	if (direction == "f") {
		if (blnLastPage) { 
		updateSuspendData();
			toMenu(); 
		} else if ( (isPageViewed(getPage()) != true) && (getPage().indexOf("menu") == -1) ) {
			strPagesViewed = strPagesViewed + "," + getPage();
			updateSuspendData(); 
		}
	} else if (blnLastPage) {
		strPagesViewed = strPagesViewed + "," + getPage();
		updateSuspendData();
		updateModuleStatus('1');
	}
	window.location.href = pgURL;
}

function toMenu() {
	closing = false;
	if (blnLastPage) {
		updateModuleStatus('1'); 
	} 
	window.location.href = "../coursemenu.html";
}

function getPage() {
	//return current page file name without file extension.
	var strTemp = location.href;
	var iPos1 = strTemp.lastIndexOf("/") + 1;
	var iPos2 = strTemp.lastIndexOf(".");
	return strTemp.substring(iPos1, iPos2);
}

function getModule() {
	//Returns an integer as module ID
	arrTemp = new Array();
	arrTemp = location.href.split("/");
	var strTemp = arrTemp[arrTemp.length-2];
	if ( strTemp.indexOf("module")>=0 ) {
		return parseInt(strTemp.substring(6) );
	} else {
		return 0;
	}
}

function updateModuleStatus(mStatus) {
	getSuspendData();
	var iMod = getModule();
	if ( iMod > 0 ) {
		moduleStatus = moduleStatus.substr(0,iMod-1) + mStatus + moduleStatus.substr(iMod);
	}
	updateSuspendData();
	if ( mStatus == 1 ) {
		if ( checkCourseStatus() ) { 
			doLMSSetValue("cmi.core.lesson_status", "completed"); 
		}
		cleanSuspendData();
	}
}

function getModuleStatus(iMod) {	//returns an integer 0, 1, or 2.
	//iMod is from 1 to nModules for this course
	var intTemp;
	intTemp = parseInt(moduleStatus.substr(iMod-1,1));
	if ( (intTemp < 0) || (intTemp > 1) ) return 0;
	else return intTemp;
}

function checkCourseStatus() {
  if (inLMS == true) {
	courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
	if (courseStatus == "completed") {return true;}
	getSuspendData();
	for (i=1; i<=nModules; ++i) {
		if (getModuleStatus(i) < 1) {
			courseStatus = "incomplete";
			return false;
		}
	}
	courseStatus = "completed";
	return true;
  }
}

function initializePage() {
	closing = true;
	if (inLMS == true) { getSuspendData(); }
}

function initializeCourse() {
  if (inLMS == true) {
  	loadPage();	
	if (typeof(startDate) == "undefined") { startDate = new Date().getTime(); }
	setCookie("startTime", startDate);
	
	var entryStatus = doLMSGetValue( "cmi.core.entry" );
	if (entryStatus == "ab-initio") {
		//first time in the course
		doLMSSetValue( "cmi.suspend_data", moduleStatus + "~" + strPagesViewed );
		doLMSSetValue("cmi.core.lesson_location", "");
		doLMSSetValue( "cmi.core.lesson_status", "incomplete" ); 
		doLMSCommit();
	} else {
		//reentry
		courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
		bookmark = doLMSGetValue("cmi.core.lesson_location");
		getSuspendData();
		if (courseStatus == "completed") {
			moduleStatus = "22";
		}
		if ( (bookmark == "301") || (bookmark == undefined) ) bookmark = "";
	}
  }
}

function exitCourse(ExitBtnClicked) {
  if (inLMS == true) {
	if (blnLastPage) { updateModuleStatus('1'); }
	startDate = getCookie("startTime");
	if (typeof(startDate) == "undefined") { startDate = 0; }
	getSuspendData();
	if (ExitBtnClicked) { closing = false; }
	if ( !exitPageStatus ) {
		if ( (courseStatus == "completed") || checkCourseStatus() ) {
			doLMSSetValue( "cmi.core.lesson_status", "completed" );
			doLMSSetValue( "cmi.core.score.raw", "100" );	//Ken asked for it
		} else {
			doLMSSetValue( "cmi.core.lesson_status", "incomplete" );	//incomplete
		}
		updateSuspendData();		//keep suspend data even the course is completed
		saveBookmark();			//relative path;
		doLMSCommit();
		setTimeout("unloadPage()", 500);
	}
  }
  
  if (parent.window) {
	parent.window.close();
  } else {
	window.close();
  }
}
function callExitCourse() {
	//used for event handler
	if (closing) {
		exitCourse(false);
	}
}

function saveBookmark() {
  if ( inLMS == true ) {
	var strBookmark = "";

	if ( !blnLastPage && ( getPage().indexOf("menu") < 0) ) {
		strBookmark = "module"+ getModule() + "/" + getPage() + ".html";
	}
	doLMSSetValue( "cmi.core.lesson_location", strBookmark);
  }
}

function isPageViewed(pageFile) {
	if ( inLMS != true ) {
		return false;
	} else {
	  var intTemp = pageFile.indexOf(".htm")
	  if (intTemp != -1) pageFile = pageFile.substring(0,intTemp)
	  var iMod = getModule();
	  if ( getModuleStatus(iMod) == 1 ) { return true; }
	  if (typeof(strPagesViewed) == "undefined") { return false; }
	  if (strPagesViewed.indexOf(pageFile) >= 0) { return true; }
	  else { return false; }
	}
}

function getSuspendData() {
  /***** SuspendData = moduleStatus ~ strPagesViewed *****/
	if ( inLMS ) {
		strTemp = doLMSGetValue("cmi.suspend_data");
		if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
			arrTemp = new Array();
			arrTemp = strTemp.split("~");
			moduleStatus = arrTemp[0];
			strPagesViewed = arrTemp[1];
		}
	}
	if ( (moduleStatus == "") || (moduleStatus == undefined) ) {
		moduleStatus = "00";
	}
}

function updateSuspendData() {
  if ( inLMS ) {
	doLMSSetValue("cmi.suspend_data", moduleStatus + "~" + strPagesViewed);
  }
}

function cleanSuspendData() {
	var strTemp = strPagesViewed.toLowerCase();
	arrTemp = strTemp.split(",");
	for (var i=1; i<=nModules; i++) {
		if (getModuleStatus(i) == 1) {
			for (var k=0; k<arrTemp.length; k++) {
				if ( (arrTemp[k].substr(0,3)=="adp0") && (parseInt(arrTemp[k].substr(3,1))==i) ) arrTemp[k] = ""
			}
		}
	}
	strTemp = arrTemp.join();
	var re = /,{2,}/g;	//2 or more commas
	strTemp = strTemp.replace(re, ",");
	if (strTemp.substr(0,1) == ",") strTemp = strTemp.substr(1);
	//after cleaned
	strPagesViewed = strTemp;
	updateSuspendData();
}

/******************** Cookie functions ********************/
function setCookie(name, value, expire){
	//add a path to make a cookie available cross file folders
	document.cookie = name + "=" + escape(value) + ((expire == null)?"":("; expires =" + expire.toGMTString())) + "; path=/"
}

function getCookie(Name) {
	var Mysearch = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(Mysearch);
		if (offset != -1){
			offset += Mysearch.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
}

function deleteCookie (name) { 
	var exp = new Date();  
	exp.setTime (exp.getTime() - 10);  
	var cookieValue = getCookie (name);  
	document.cookie = name + "=" + cookieValue + "; expires=" + exp.toGMTString();
}