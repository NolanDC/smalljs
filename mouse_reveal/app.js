
function mouseReveal() {
	var level = displayLevel[mouse.x][mouse.y]

	if(inRect(mouse.x, mouse.y, currentBlock.x, currentBlock.y, currentBlock.w, currentBlock.h)) return
	if(level >= arrays.length-1) return

	var show_level = level+1
	var tile_size = mainImage.width / arrays[level].length
	var mtx = Math.floor(mouse.x / (tile_size/2))
	var mty = Math.floor(mouse.y / (tile_size/2))
	var lx = Math.floor(mouse.x / (tile_size))
		, ly = Math.floor(mouse.y / (tile_size))
		, tx = lx*2
		, ty = ly*2

	//Set the new display level
	for(var px = lx*tile_size; px < (lx+1)*tile_size; px++) {
		for(var py = ly*tile_size; py < (ly+1)*tile_size; py++) {
			displayLevel[px][py] = show_level
		}
	}

	//Draw the four squares to cover the square in question
	var half_tile = tile_size/2
	var c = arrays[show_level][tx][ty]
	context.fillStyle = rgbString(c[0], c[1], c[2])
	context.fillRect(lx*tile_size, ly*tile_size, half_tile, half_tile)

	c = arrays[show_level][tx+1][ty]
	context.fillStyle = rgbString(c[0], c[1], c[2])
	context.fillRect(lx*tile_size+half_tile, ly*tile_size, half_tile, half_tile)

	c = arrays[show_level][tx][ty+1]
	context.fillStyle = rgbString(c[0], c[1], c[2])
	context.fillRect(lx*tile_size, ly*tile_size+half_tile, half_tile, half_tile)	

	c = arrays[show_level][tx+1][ty+1]
	context.fillStyle = rgbString(c[0], c[1], c[2])
	context.fillRect(lx*tile_size+half_tile, ly*tile_size+half_tile, half_tile, half_tile)	

	//Set the new current block
	currentBlock = {x: mtx*half_tile, y: mty*half_tile, w: half_tile, h: half_tile}

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
	arraySet = new Array(powers);
	for(i = powers; i >= 0; i--) {
		var size = Math.pow(2, i);
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
	]
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

function inRect(px, py, x, y, w, h) {
	return (px >= x && px <= x+w && py >= y && py <= y+h);
}

function Array2D(width, height, value) {
	var a = new Array(width);
	for(var x = 0; x < width; x++) {
		a[x] = new Array(height)
		if( value !== undefined) {
			for(var y = 0; y < height; y++) {
				a[x][y] = value;
			}	
		}
	}
	return a
}