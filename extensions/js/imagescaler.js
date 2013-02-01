var Imagescaler = function($node) {
	var visualratio = 1024 / 681, //Originalmaße der verwendeten Bilder
		selector 	= "img.scaleimg",
		round 		= function(i){ return (parseInt( i*10000, 10 ) / 10000); },
		styleDoc 	= (document.getElementById("js_scale_styles").sheet || document.styleSheets["js_scale_styles"]),
		$slots 		= $node.find("li"),
		slotwidth, slotheight, slotratio, rulesStr, width, height;

	var resizeImg = function() {
		slotwidth = $slots.first().width();
		slotheight = $slots.first().height();
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
		var imgURL = $elm.css('background-image').match(/url\("(.*)"\)/)[1];
		var $imgElement = $("<img class='scaleimg'/>").attr('src', imgURL);
		$elm.append($imgElement).css('background-image','none');
	};


	$slots.each(function(idx, elm) {
		replaceBackgroundImage($(elm));
	});
	resizeImg();
	
	$(window).bind("resize", resizeImg);

};


$(document).ready(function(e) {
	if (Modernizr.backgroundsize) { 
		return; // JS wird nur benötigt, wenn der Browser kein background-size kann
	}

	$(".js_scale").each(function() {
		new Imagescaler($(this));
	});
});
