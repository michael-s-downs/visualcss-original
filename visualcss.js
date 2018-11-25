
var colorhex = "#FF0000";
var color = "#FF0000";
var colorObj = w3color(color);

function mouseOverColor(hex) {
    document.getElementById("divpreview").style.visibility = "visible";
    document.getElementById("divpreview").style.backgroundColor = hex;
    document.body.style.cursor = "pointer";
}
function mouseOutMap() {
    if (hh == 0) {
        document.getElementById("divpreview").style.visibility = "hidden";
    } else {
      hh = 0;
    }
    document.getElementById("divpreview").style.backgroundColor = colorObj.toHexString();
    document.body.style.cursor = "";
}
var hh = 0;
function clickColor(hex, seltop, selleft, html5) {
    seltop-=5;
    var c, cObj, colormap, areas, i, areacolor, cc;
    if (html5 && html5 == 5)  {
        c = document.getElementById("html5colorpicker").value;
    } else {
        if (hex == 0)  {
            c = document.getElementById("entercolor").value;
        } else {
            c = hex;
        }
    }
    cObj = w3color(c);
    colorhex = cObj.toHexString();
    if (cObj.valid) {
        clearWrongInput();
    } else {
        wrongInput();
        return;
    }
   
    if ((!seltop || seltop == -1) && (!selleft || selleft == -1)) {
        colormap = document.getElementById("colormap");
        areas = colormap.getElementsByTagName("AREA");
        for (i = 0; i < areas.length; i++) {
            areacolor = areas[i].getAttribute("onmouseover").replace('mouseOverColor("', '');
            areacolor = areacolor.replace('")', '');
            if (areacolor.toLowerCase() == colorhex) {
                cc = areas[i].getAttribute("onclick").replace(')', '').split(",");
                seltop = Number(cc[1]);
                selleft = Number(cc[2]);
            }
        }
    }
    if ((seltop+205)>-1 && selleft>-1) {
        console.log("seltop is " + seltop);
        console.log("selleft is "+ selleft);
        document.getElementById("selectedhexagon").style.top=seltop + "px";
        document.getElementById("selectedhexagon").style.left=selleft + "px";
        document.getElementById("selectedhexagon").style.visibility="visible";
  } else {
        document.getElementById("divpreview").style.backgroundColor = cObj.toHexString();
        document.getElementById("selectedhexagon").style.visibility = "hidden";
  }
	colorElements(cObj);
    document.getElementById("html5colorpicker").value = cObj.toHexString();  
}

function colorElements(cObj) {

	//needed to interpolate the colors dynamically with a "touch of grey" when the background changes.
	var cObj2 = w3color("#f1f1f1");

	//page background
	if(document.getElementById("pageBackground-cb").checked) {
	var bodyTag = document.getElementsByTagName("BODY");
	//yes we KNOW we will definitely have 1 and only 1 BODY, but this sets a repeatable pattern.
	for (var i = 0; i < bodyTag.length; i++) {
		bodyTag[i].style.backgroundColor = cObj.toHexString();
	}
	
	//lets interpolate the touch-of-grey into the other panel colors 
	//(toppanel, colorpanel, picklistpanel, fontpanel & bottompanel) based on new background...
	var topBg = document.getElementById("toppanel");
	topBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);
	var  colorpanelBg = document.getElementById("colorpanel");
	 colorpanelBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);	
	var sidebarBg = document.getElementById("picklistpanel");
	sidebarBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);
	var fontpanelBg = document.getElementById("fontpanel");
	fontpanelBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);
	var helppanelBg = document.getElementById("helppanel");
	//helppanelBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);	
	helppanelBg.style.backgroundColor = cObj.toHexString();
	var bottomBg = document.getElementById("bottompanel");
	bottomBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);		
	var themeBg = document.getElementById("themepanel");
	themeBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);
	var downloadBg = document.getElementById("downloadpanel");
	downloadBg.style.backgroundColor = interpolateColor(cObj,cObj2,0.5);        
		//update the pallete table information
		document.getElementById("colornamDIVpageBackground").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVpageBackground").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVpageBackground").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVpageBackground").innerHTML = cObj.toHslString(); 		
	}	

	//header text-color 
	if(document.getElementById("h4-cb").checked) {
		var headerArray = document.querySelectorAll("H1,H2,H3,H4,H5");
		for (i=0;i<headerArray.length;++i){
			headerArray[i].style.color = cObj.toHexString();
		}
		//update the pallete table information
		document.getElementById("colornamDIVh3").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVh3").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVh3").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVh3").innerHTML = cObj.toHslString(); 		
	}

	//paragraph and ul text-color
	if(document.getElementById("p-cb").checked) {
		//var pArray  = document.querySelectorAll("P,UL");
        var pArray = $("P,UL,LI").not(".noColor").not(".font-select").not(".fs-results");
		for (i=0;i<pArray.length;++i){
            pArray[i].style.color = cObj.toHexString();
		}
		//update the pallete table information
		document.getElementById("colornamDIVp").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVp").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVp").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVp").innerHTML = cObj.toHslString(); 		
	}

	//table caption text-color
	if(document.getElementById("caption-cb").checked) {
		var cArray = document.getElementsByTagName("CAPTION");
		for (i=0;i<cArray.length;++i){
			cArray[i].style.color = cObj.toHexString();
		}
		//update the pallete table information
		document.getElementById("colornamDIVcaption").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVcaption").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVcaption").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVcaption").innerHTML = cObj.toHslString();		
	}

	//table header text-color 
	if(document.getElementById("thText-cb").checked) {
		var thtdArray = document.querySelectorAll("TH, TD");
		for (i=0;i<thtdArray.length;++i){
			thtdArray[i].style.color = cObj.toHexString();
		}		
		//update the pallete table information
		document.getElementById("colornamDIVthText").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVthText").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVthText").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVthText").innerHTML = cObj.toHslString();		
	}
 
//table header background color
	if(document.getElementById("thBackground-cb").checked) {
		var thArray = document.getElementsByTagName("TH");
		for (i=0;i<thArray.length;++i){
			thArray[i].style.backgroundColor  = cObj.toHexString();
		}		
		//update the pallete table information
		document.getElementById("colornamDIVthBg").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVthBg").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVthBg").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVthBg").innerHTML = cObj.toHslString();		
	}

//odd row background color
	if(document.getElementById("trOddBackground-cb").checked) {
		var trArray = document.getElementsByTagName("TR");
		for (i=0;i<trArray.length;++i){
			trArray[i].style.setProperty('--odd-row-color', cObj.toHexString());
		}		
		//update the pallete table information
		document.getElementById("colornamDIVtrOdd").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVtrOdd").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVtrOdd").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVtrOdd").innerHTML = cObj.toHslString();	
	}
//even row background color
	if(document.getElementById("trEvenBackground-cb").checked) {
		var trArray = document.getElementsByTagName("TR");
		for (i=0;i<trArray.length;++i){
			trArray[i].style.setProperty('--even-row-color', cObj.toHexString());
		}		
		//update the pallete table information
		document.getElementById("colornamDIVtrEven").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVtrEven").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVtrEven").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVtrEven").innerHTML = cObj.toHslString();	
	}

//row hower background color 
	if(document.getElementById("trHoverBackground-cb").checked) {
		var trArray = document.getElementsByTagName("TR");
		for (i=0;i<trArray.length;++i){
			trArray[i].style.setProperty('--hover-color', cObj.toHexString());
		}		
		//update the pallete table information
		document.getElementById("colornamDIVtrHover").innerHTML = (cObj.toName() || "Not Named");
		document.getElementById("colorhexDIVtrHover").innerHTML = cObj.toHexString();
		document.getElementById("colorrgbDIVtrHover").innerHTML = cObj.toRgbString();
		document.getElementById("colorhslDIVtrHover").innerHTML = cObj.toHslString();
	}
	//always replace the input box
	document.getElementById("entercolor").value = (cObj.toName() || cObj.toHexString());
}

function wrongInput() {
    document.getElementById("entercolorDIV").className = "has-error";
    document.getElementById("entercolorDIVlabel").innerHTML = "wrong input";
	document.getElementById("entercolorDIVlabel").style.color = "#FF0000";
}
function clearWrongInput() {
    document.getElementById("entercolorDIV").className = "";
    document.getElementById("entercolorDIVlabel").innerHTML = "hex or color-name";
	document.getElementById("entercolorDIVlabel").style.color = "#000000";
}

function submitOnEnter(e) {
    keyboardKey = e.which || e.keyCode;
    if (keyboardKey == 13) {
        clickColor(0,-1,-1);
    }
}

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
	var resultObj = w3color("#000000");	//doesn't matter what color we initialize.
    resultObj.red = Math.round(color1.red + factor*(color2.red - color1.red));
    resultObj.green = Math.round(color1.green + factor*(color2.green - color1.green));
	resultObj.blue = Math.round(color1.blue + factor*(color2.blue - color1.blue));
    return resultObj.toHexString();
};

//creates a link that ouputs a downloadable file, calls it, and removes it
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
   
//builds (concatenates) the CSS Stylesheet string, piece by piece   
function buildStylesheet() {
    //set up vars for concatanation...
    var importBase = "@import url('https://fonts.googleapis.com/css?family="
    var allImports = "";
    var cssString = ""; 	
    
	//BODY (only need page background color)
    var bodyBgColor = document.getElementById("colorhexDIVpageBackground").innerHTML;
    var bodyString = "body {\n\t" 
    +"background-color:"+bodyBgColor+";\n"
    +"}\n";
    
    //HEADER
    var headerFont = document.getElementById("fontDIVh3").innerHTML;
    var headerColor = document.getElementById("colorhexDIVh3").innerHTML;
    var spacelessHeaderFont = spaceToPlus(headerFont);
    var headerString = "h1, h2, h3, h4, h5 {\n\t" 
    +"color:"+headerColor+";\n\t"
    +"font-family:'"+headerFont+"';\n"
    +"}\n";
    if (allImports.indexOf(spacelessHeaderFont) == -1){
        allImports += "\n"+ importBase + spacelessHeaderFont + "');";
    }    
    
    //PARAGRAPH (color and font)
	var paraFont = document.getElementById("fontDIVp").innerHTML;
    var paraColor = document.getElementById("colorhexDIVp").innerHTML;
    var spacelessParaFont = spaceToPlus(paraFont);
    var paraString = "p, ul {\n\t" 
    +"color:"+paraColor+";\n\t"
    +"font-family:'"+paraFont+"';\n"
    +"}\n";    
    if (allImports.indexOf(spacelessParaFont) == -1){
        allImports += "\n"+ importBase + spacelessParaFont + "');";
    } 
    
    //TABLE (Yikes!  This is actually how we have to account for styling Caption via CSS!)
	var captionFont = document.getElementById("fontDIVcaption").innerHTML;
    var captionColor = document.getElementById("colorhexDIVcaption").innerHTML;
    var spacelessCaptionFont = spaceToPlus(paraFont);
    var captionString = "table {\n\t" 
    +"color:"+captionColor+";\n\t"
    +"font-family:'"+captionFont+"';\n\t"
    +"border-collapse: collapse;\n"
    +"}\n";    
    if (allImports.indexOf(spacelessCaptionFont) == -1){
        allImports += "\n"+ importBase + spacelessCaptionFont + "');";
    } 
 
    //TD,TH shared items (hardcoded)
    var tdThString = "td, th {\n\t" 
    +"border: 1px solid #ddd;\n"
    +"}\n";    
  
    //TR,TH shared items (text color, font)
    var thFont = document.getElementById("fontDIVthText").innerHTML;
    var spacelessThFont = spaceToPlus(thFont);
    var thTextColor = document.getElementById("colorhexDIVthText").innerHTML;
    var thTextString = "th, tr {\n\t"
    +"color:"+thTextColor+";\n\t"
    +"font-family:'"+thFont+"';\n"
    +"}\n";    
    if (allImports.indexOf(spacelessThFont) == -1){
        allImports += "\n"+ importBase + spacelessThFont + "');";
    } 
    
    //TH BACKGROUND
    var thBgColor = document.getElementById("colorhexDIVthBg").innerHTML;
    var thString = "th {\n\t"
    +"text-align: center;\n\t"
    +"background-color:"+thBgColor+";\n" 
    +"}\n";    
    
    //ALL TABLE STRIPINGS (EVEN, ODD, HOVER)
    var evenColor = document.getElementById("colorhexDIVtrEven").innerHTML;
    var oddColor = document.getElementById("colorhexDIVtrOdd").innerHTML;
    var hoverColor = document.getElementById("colorhexDIVtrHover").innerHTML;
    var evenString = "table tr:nth-child(even){background-color:"+evenColor+";}\n"; 
    var oddString = "table tr:nth-child(odd){background-color:"+oddColor+";}\n";
    var hoverString = "table tr:hover {background-color:"+hoverColor+";}\n";
    var stripingString = evenString+oddString+hoverString;  
    
    allImports = allImports + "\n";
	cssString =
        allImports +
        bodyString +
        headerString +
        paraString +
        captionString + //actually a table selector
        tdThString +
        thTextString +
        thString +
        stripingString;
    console.log(cssString);
	return cssString;
}

//click event initiating CSS download.
function downloadStylesheetTest() {
	download("YourVisualCssTheme.css", buildStylesheet());
}

function changeElementsFont(font) {
    console.log("entered changeElementsFont with "+font);
    
    //check Header Tags checkbox -- h4-cb
    if(document.getElementById("h4-cb").checked) {
        $("h1, h2, h3, h4, h5, h6").css('font-family',font);
        $("#fontDIVh3").html(font);
    }
    //check Ps & ULs checkbox p-cb
    if(document.getElementById("p-cb").checked) {
        $('ul,p').css('font-family',font);
        $("#fontDIVp").html(font);
    } 
    
    //check Caption Text checkbox caption-cb
    if(document.getElementById("caption-cb").checked) {
        $('caption').css('font-family',font);
        $("#fontDIVcaption").html(font);
    }    
    //check TH & TR Text checkbox -- thText-cb
    if(document.getElementById("thText-cb").checked) {
        $('th,tr').css('font-family',font);
        $("#fontDIVthText").html(font);
    } 
}

//helper function to find if an input (needle) is in an approved whitelist (haystack)
function arrayContains(needle, arrhaystack){
    return (arrhaystack.indexOf(needle) > -1);
}
//helper function to escape friendly spaces with URL-ready +'s when calling Google Font API
function spaceToPlus(myStr) {
    return myStr.replace(/\ /g, '+');
}
    





