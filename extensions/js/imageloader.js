/*
 * Sorgt für das Nachladen von Background-Images:
 * Statt im style-Attribut wird das background-image zunächst in data-style notiert.
 * Das Script setzt dann den Wert von data-style als style-Attribut ein.
 * 
 * <li class="js_imgload" data-style="background-image:url('images/panorama3.jpg')">
 */

var Imageloader = function($node) {
	var data = $node.data(),
		style = $node.attr("style");

	var replaceStyle = function() {
		$node.attr("style", [style, data.style].join(";"));
		$node.removeAttr("data-style").removeData("style");
	};

	data.style && replaceStyle();
};


$(document).ready(function(e) {
	// abbrechen, wenn kein background-size unterstützt wird, dafür übernimmt imagescaler.js (<IE9)
	if (!Modernizr.backgroundsize) { 
		return;
	}
	$(".js_imgload").each(function() {
		Imageloader($(this));
	});
});

