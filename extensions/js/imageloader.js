var Imageloader = function($node) {

	var data = $node.data();

	var replaceStyle = function() {
		$node.attr("style", [style, data.style].join(";"));
		$node.removeAttr("data-style").removeData("style");
	};


	data.style && replaceStyle();
};

$(document).ready(function(e) {

	// Wenn kein background-size unterstützt wird, übernimmt imagescaler.js
	if (!Modernizr.backgroundsize) { 
		return;
	}
	$(".js_imgload").each(function() {
		Imageloader($(this));
	});
});

