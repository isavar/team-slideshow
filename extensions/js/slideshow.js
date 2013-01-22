var Slideshow = function($node) {

	var $items = $node.find(".js_slide > li"),
		active = "active",
		last = $items.length - 1,
		activeIndex = 0,
		delay = 10000,
		interval;

	var show = function(idx) {
		$items.eq(activeIndex).removeClass(active);
		activeIndex = idx;
		$items.eq(activeIndex).addClass(active);
	};

	$node.on("click", ".js_slidepager > li", function(e) {
		/*
			Es gibt nur zwei LIs im pager, daher ist $(this).index() entweder 
			0 oder 1 und kann für die Unterscheidung von vor und zurück 
			als bool verwendet werden.
		*/
		var idx = $(this).index() ? activeIndex + 1 : activeIndex - 1;
		show(idx < 0 ? last : (idx > last ? 0 : idx));
	});



	/*
		Beginne automatisches Durchsliden, 
		sofern nicht mit den Bühnen interagiert wird
	*/
	var timer = function() {
		interval = setInterval(function() {
			var idx = activeIndex + 1;
			show(idx > last ? 0 : idx);
		}, delay);
	};

	timer();
	$node.on("mouseenter mouseleave", function(e) {
		clearInterval(interval);
		if (e.type == "mouseleave") {
			timer();
		}
	});

};

$(document).ready(function(e) {
	$(".js_slideshow").each(function() {
		new Slideshow($(this));
	});
});

