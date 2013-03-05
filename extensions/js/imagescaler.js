/*
 * Dieses Script wird hier nur benötigt, wenn der Browser kein background-size kennt (IE7+8)
 * 
 * Sucht in bestimmten Elementen nach background-images und setzt diese stattdessen als echte
 * IMG-Elemente ein.
 * Berechnet Höhe und Breite der Bilder so, dass es immer das Elternelement ausfüllt - d. h. es 
 * wird ggf. in beide Richtungen etwas vom Bild "abgeschnitten". Dies simuliert also die
 * CSS-Eigenschaft background-size="cover".
 * 
 */

var Imagescaler = function($node) {
	var visualratio = 1024 / 681, //Originalmaße der verwendeten Bilder
		selector 	= "img.scaleimg",
		round 		= function(i){ return (parseInt( i*10000, 10 ) / 10000); },
		styleDoc 	= (document.getElementById("js_scale_styles").sheet || document.styleSheets["js_scale_styles"]),
		$slots 		= $node.find("li"),
		$first		= $slots.first(),
		slotwidth, slotheight, slotratio, rulesStr, width, height;

	var resizeImg = function() {
		slotwidth = $first.width();
		slotheight = $first.height();
		slotratio = slotwidth / slotheight;
		
		if (slotratio < visualratio) {
			width = slotheight * visualratio;
			height = width / visualratio;
		} else {
			height = slotwidth / visualratio;
			width = height * visualratio;
		}

		rulesStr = ["width:", round(width), "px !important;",
					"height:", round(height), "px !important;",
					"margin: 0 0 0 ", round( (width - slotwidth) / -2), "px;\n"].join("");

		if (styleDoc.insertRule) {
			styleDoc.cssRules.length && styleDoc.deleteRule(0);
			styleDoc.insertRule(selector + "{" + rulesStr + "}", 0);
		} else {
			styleDoc.cssRules && styleDoc.cssRules.length && styleDoc.removeRule();
			styleDoc.addRule(selector, rulesStr);
		}

		$node.addClass("resized");
	};
	
	var replaceBackgroundImage = function($elm) {
		var imgURL = $elm.attr("data-style").match(/.*url\('(.*)'\).*/)[1];
		var $imgElement = $("<img class='scaleimg'/>").attr('src', imgURL);
		$elm.append($imgElement).removeAttr("data-style");
	};


	$slots.each(function(idx, elm) {
		replaceBackgroundImage($(elm));
	});
	resizeImg();
	
	$(window).bind("resize", resizeImg);

};


$(document).ready(function(e) {

	// Direkt abbrechen, wenn der Browser background-size kann
	if (Modernizr.backgroundsize) { 
		return; 
	}
	$(".js_scale").each(function() {
		Imagescaler($(this));
	});
});
