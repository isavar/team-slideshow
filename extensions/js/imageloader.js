var Imageloader = function($node) {

	var data = $node.data();

	// var replaceWithImg = function() {
	// 	var $imgElement = $("<img />");
	// 	$.each($node.prop("attributes"), function() {
	// 		$imgElement.attr(this.name, this.value);
	// 	});
	// 	$node.replaceWith($node = $imgElement);
	// };

	var replaceStyle = function() {
		$node.attr("style", data.style);
		$node.removeAttr("data-style");
	};

	// var replaceSrc = function() {
	// 	if(!$node.is("img")) {
	// 		replaceWithImg();
	// 	}
	// 	$node.attr("src", data.src);
	// 	$node.removeAttr("data-src");
	// };


	data.style && replaceStyle();
	// data.src && replaceSrc();
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

