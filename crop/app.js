var mainImage, imageData, newImageData, canvas, context;
var mouse = {x: 0, y: 0}
		, renderTime = 1000/50
		, cropInfo = {x: 0, y: 0, dragging: false};

var OPTIONS = {
	max_width: 1024,
	max_height: 1024
}

$(function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	mainImage = createImageFromURL('./sistine.png');

	mainImage.onload = function() {
		canvas.width = mainImage.width;
		canvas.height = mainImage.height;

		var dim = powerBelow(Math.min(mainImage.width, mainImage.height));
		cropInfo.width = dim;
		cropInfo.height = dim;
		$('#main-inner').width(canvas.width);
	}

	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX; // + parseInt($('#main-inner').css('margin-left');// - this.offsetLeft;
		mouse.y = e.pageY;
	});

	$('#canvas').on('mousedown', function() {
		if(!inRect(mouse.x, mouse.y, cropInfo.x, cropInfo.y, cropInfo.width, cropInfo.height))
			return;
		cropInfo.dragging = true;
		cropInfo.dragx = cropInfo.x - mouse.x;
		cropInfo.dragy = cropInfo.y - mouse.y;
	});

	$('#canvas').on('mouseup', function() {
		cropInfo.dragging = false;
	});

	$('body').on('mouseup', function() {
		cropInfo.dragging = false;
	});

	setTimeout(function() {
		render({showCrop:true});
	}, renderTime);

	Mousetrap.bind('enter', function() {
		crop();
	});

});

function render(options) {
	options = typeof options !== 'undefined' ? options : {};

	if(cropInfo.dragging == true)
		updateCropPosition();

	context.drawImage(mainImage,0,0);

	if('showCrop' in options && options.showCrop == true) {
		drawCropSquare();	
	}
	setTimeout(function() {
		render({showCrop:true});
	}, renderTime);
}

function drawCropSquare() {
	context.fillStyle = "rgba(255,255,255,0.3)";
	context.strokeStyle = "rgba(255,255,255,0.8)";
	context.fillRect(cropInfo.x+1, cropInfo.y+1, cropInfo.width-2, cropInfo.height-2);
	context.lineWidth=1;
	context.strokeRect(cropInfo.x, cropInfo.y, cropInfo.width, cropInfo.height);	
}

//Updates the crop square to be relative to the mouse position
function updateCropPosition() {
	cropInfo.x = constrain(0, mainImage.width-cropInfo.width, mouse.x+cropInfo.dragx);
	cropInfo.y = constrain(0, mainImage.height-cropInfo.height, mouse.y+cropInfo.dragy);
}

//crops the image
function crop() {
	//var //imageData = canvasSection(cropInfo.x, cropInfo.y, cropInfo.width, cropInfo.height)
	render();
	var	image = cropCanvasToImage('canvas', cropInfo.x, cropInfo.y, cropInfo.width, cropInfo.height)
	  , img = new Image();
	img.src = image;
	$('body').append(img);
}