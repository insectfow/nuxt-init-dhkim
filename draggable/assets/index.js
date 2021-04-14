// IE8 polyfill
HTMLDocument.prototype.getElementsByClassName = 
Element.prototype.getElementsByClassName =
function getElementsByClassName (className) {
	for (var res = [], els = this.getElementsByTagName('*'), n = els.length; n--;) {
		if (els[n].className.indexOf(className) > -1) {
			res.push(els[n]);
		}
	}
	return res;
}

new Draggable(document.querySelectorAll('item'))
.on('drag:start', () => console.log('drag:start'))
.on('drag:move',  () => console.log('drag:move'))
.on('drag:stop',  () => console.log('drag:stop'));

// prevent selection because it's annoying when dragging
document.onselectstart = function(){ return false; };
document.body.setAttribute('unselectable', 'on', 0);

// find our elements
var elements = document.getElementsByClassName('item'),
	labelsX = document.getElementsByClassName('coords-x'),
	labelsY = document.getElementsByClassName('coords-y');

// options for each drag instance
var options = {
	setCursor: true
};

// loop over the 3 balls...
for (var n = elements.length; n--;) {

	// ... augment our default options with individual `onDrag` handlers
	var opts = jQuery.extend(options, {
		onDrag: onDragFactory(n)
	});

	// ... and initialize drag for each
	window.d = new Draggable(elements[n], opts);

}

// bind `n` to its value at iteration time
function onDragFactory (n) {

	return function (element, x, y) {
		labelsX[n].innerHTML = x;
		labelsY[n].innerHTML = y;
	}

}