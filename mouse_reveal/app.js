var mainImage, imageData, newImageData, canvas, context;
var mouse = {x: 0, y: 0};
var arrays;
var arrayIndex = 0;
var cache;

$(function() {
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
		render()
		$('#main-inner').css('width', this.width + 'px')
		$('#main-inner').css('margin', '0 auto')
		$('#main-inner').css('margin-top', (window.innerHeight-this.width)/2 + 'px') 
	}

	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX;// - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
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

function render() {
	arrayIndex++
	renderOrCache(arrays, cache, loop(arrayIndex, arrays.length-1));
	setTimeout(render, 1000/15);
}

function loop(index, length) {
	factor = Math.ceil(index/length)%2 == 0 ? 1 : -1
	if(factor == 1 && index % length == 0) return length;
	return ((index % length * factor) + length) % length
}

function renderOrCache(arrays, cache, index) {
	if(cache[index] !== undefined) {
		context.putImageData(cache[index], 0, 0);
	} else {
		cache[index] = pixelArrayToImageData(arrays[index], canvas.width, canvas.height);
		context.putImageData(cache[index], 0, 0);
	}
}

//Renders all rectangles in the given array, spread over a target of size [width][height]
function pixelArrayToImageData(array, width, height) {
	var w = array.length
		, h = array[0].length
		, tile_w = width / w
		, tile_h = height / h
		, newImageData = context.createImageData(width, height)

	for(x = 0; x < w; x++) {
		for(y = 0; y < h; y++) {
			setPixelRange(newImageData, x * tile_w, y* tile_h, tile_w, tile_h, array[x][y])
		}
	}

	return newImageData 
}

function createImageFromURL(url) {
	var img = new Image()
	img.src = url
	return img
}



/*
For each power of 2 (represented by n) from log(width of image) to 0 , createColorMaps
 	will create an array of width & height 2^n
Each element in the array represents the average color of the four pixels in the previous array
 	that would be covered by the current array element were its size double and placed on top

 Example using integers instead of colors: 
 [2, 10]
 [4, 8]
 => 
 [6]
*/
function createColorMaps(imageData) {
	var powers = logTwo(imageData.width);
	console.log('Number of powers', powers);
	arraySet = new Array(powers);
	for(i = powers; i >= 0; i--) {
		var size = Math.pow(2, i);
		console.log(size);
		arraySet[i] = new Array(size);
		for(x = 0; x < size; x++) {
			arraySet[i][x] = new Array(size);
			for(y = 0; y < size; y++) {
				if(i == powers) {
					//Grab the first array from the actual image
					arraySet[i][x][y] = getPixelAt(imageData, x, y)
				}else{
					var p1 = arraySet[i+1][x*2][y*2]
					  , p2 = arraySet[i+1][x*2+1][y*2]
					  , p3 = arraySet[i+1][x*2][y*2+1]
					  , p4 = arraySet[i+1][x*2+1][y*2+1]
					  , a1 = averageColors(p1, p2)
					  , a2 = averageColors(p3, p4)
					arraySet[i][x][y] = averageColors(a1, a2)
				}
			}
		}
	}
	totalColor = arraySet[0][0][0]
	return arraySet
}

/*
function processImage(width, height) {
	imageData = context.getImageData(0, 0, width, height);
	newImageData = context.createImageData(width/2, height/2);
	
	var data = imageData.data;		
	
	for(x = 0; x < width; x+=2) {
		for(y = 0; y < height; y+=2) {
			var p1 = getPixelAt(imageData, x, y);
			var p2 = getPixelAt(imageData, x+1, y);
			var p3 = getPixelAt(imageData, x, y+1);
			var p4 = getPixelAt(imageData, x+1, y+1);
			var a1 = averageColors(p1,p2);
			var a2 = averageColors(p3,p4);
			var final = averageColors(a1, a2);
			//console.log(final);
			var _x = x/2;
			var _y = y/2;
			setPixelRange(newImageData, _x, _y, 2, 2, final);					
		}
	}
	
	//console.log(newImageData);
	//newImageData.data = subData;
	console.log('done');
	//context.putImageData(newImageData,0,0);
	drawImageWithRects(newImageData, 512);
	return newImageData;
}
*/

function drawImageWithRects(image, size) {
	var data = image.data;
	var scale = size/image.width;
	for(x = 0; x < image.width; x++) {
		for(y = 0; y < image.height; y++) {
			c = getPixelAt(image, x, y);
			context.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+255 +")";
			context.fillRect( x*scale, y*scale, scale, scale );
		}
	}
}


function getPixelAt(image, x, y) {
	var index = ((y*image.width)+x) * 4;
	var imageData = image.data;
	return [imageData[index], imageData[index+1], imageData[index+2]];
}

function setPixelRange(image, x, y, w, h, color) {
	for(i = 0; i < w; i++) {
		for(k = 0; k < h; k++) {
			setPixelAt(image, x+i, y+k, color);
		}
	}
}

function setPixelAt(image, x, y, color) {
	var index = ((y*image.width)+x) * 4;
	var imageData = image.data;
	imageData[index] = color[0];
	imageData[index+1] = color[1];
	imageData[index+2] = color[2];	
	imageData[index+3] = 255;
	return imageData;
}

function averageColors(color1, color2) {
	return [
		average(color1[0], color2[0]), 
		average(color1[1], color2[1]), 
		average(color1[2], color2[2])
	];
}

function average(num1, num2) {
	return (num1+num2)/2.0;
}

function logTwo(num) {
	return Math.log(num) / Math.log(2);
}

function rgbString(r, g, b) {
	return 'rgba(' + [parseInt(r),parseInt(g),parseInt(b),255].join(',') + ')';
}

function constrain(min, max, value) {
	return Math.max(min, Math.min(max, value));
}