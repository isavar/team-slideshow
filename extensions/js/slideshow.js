	var Slideshow = function($node) {

		var $items = $node.find("li"),
				$pager = $node.next(".js_pager"),
				active = "active",
				activeClass = ".active",
				click  = "click",
				currentIdx = 0,
				last = $items.length-1,
				activeIndex = $items.filter(activeClass).index(),
				delay = 10000;

		var show = function(idx) {
				$items.eq(activeIndex).removeClass(active);
				activeIndex = idx;
				$items.eq(activeIndex).addClass(active);
		};

		var timer = function() {
				timeout = setTimeout(function() {
						var idx = activeIndex + 1;
						show(idx > last ? 0 : idx);
						timer();
				}, delay);
		};
		timer();

		$node.on("mouseenter mouseleave", function(e) {
				clearTimeout(timeout);
				if (e.type == "mouseleave") {
						timer();
				}
		});

		$pager.on(click, ".js_slideprev, .js_slidenext", function(e) {
				var idx = $(this).index() ? activeIndex + 1 : activeIndex - 1;
				show(idx < 0 ? last : (idx > last ? 0 : idx));
		});
	};

	$(document).ready(function(e) {
		$(".js_slide").each(function() {
			new Slideshow($(this));
		});
	});




/** Modernizr Tests ************************************************/

// developer.mozilla.org/en/CSS/pointer-events
// github.com/ausi/Feature-detection-technique-for-pointer-events
Modernizr.addTest('pointerevents', function(){
	var element = document.createElement('div'),
			documentElement = document.documentElement,
			getComputedStyle = window.getComputedStyle,
			supports;
	if(!('pointerEvents' in element.style)){
			return false;
	}
	element.style.pointerEvents = 'auto';
	element.style.pointerEvents = 'x';
	documentElement.appendChild(element);
	supports = getComputedStyle &&
			getComputedStyle(element, '').pointerEvents === 'auto';
	documentElement.removeChild(element);
	return !!supports;
});
