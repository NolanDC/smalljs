var mainImage, imageData, newImageData, canvas, context;
var mouse = {x: 0, y: 0};
var arrays;
var arrayIndex = 0;
var cache;

//Represents, at each pixel, the index of the displayed pixel within the calculated arrays
var displayLevel;
var currentBlock;

$(function() {
	var $main = $('#main').hide();
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	mainImage = createImageFromURL('./monalisa.jpg');

	mainImage.onload = function() {
		canvas.width = this.width;
		canvas.height = this.height;
		context.drawImage(mainImage, 0, 0)

		var imageData = context.getImageData(0,0, canvas.width, canvas.height)
		arrays = createColorMaps(imageData)
		cache = new Array(arrays.length)

		displayLevel = Array2D(this.width, this.height, 0)
		currentBlock = {x: 0, y: 0, w: 0, h: 0}

		renderOrCache(arrays, cache, 0)

		$('#main-inner').css('width', this.width + 'px')
		$('#main-inner').css('margin', '0 auto')
		$('#main-inner').css('margin-top', (window.innerHeight-this.width)/2 + 'px')
		$main.fadeIn()
	}

	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		mouseReveal();
	})

	Mousetrap.bind('up', function(e) {
		e.preventDefault();
		arrayIndex = constrain(0, window.arrays.length-1, arrayIndex+1);
		renderOrCache(arrays, cache, arrayIndex);
	})

	Mousetrap.bind('down', function(e) {
		e.preventDefault();
		arrayIndex = constrain(0, window.arrays.length-1, arrayIndex-1);
		renderOrCache(arrays, cache, arrayIndex);
	})

});