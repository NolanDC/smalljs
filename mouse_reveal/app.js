var mainImage, imageData, newImageData, canvas, context;

$(function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.width = 512;
	canvas.height = 512;
	mainImage = createImageFromURL('./monalisa.jpg');
	mainImage.onload = function() {
		context.drawImage(mainImage, 0, 0);
		smaller = processImage(512,512);
		context.putImageData(smaller, 0, 0);
		smaller = processImage(256,256);
		context.putImageData(smaller, 0, 0);
		smaller = processImage(128,128);		
	}

});

function createImageFromURL(url) {
	var img = new Image();
	img.src = url;
	return img;
}


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

function drawImageWithRects(image, size) {
	var data = image.data;
	var scale = size/image.width;
	console.log(scale);
	console.log(image.width, image.height);
	for(x = 0; x < image.width; x++) {
		for(y = 0; y < image.height; y++) {
			//if(random() < 0.1) console.log('ok');
			c = getPixelAt(image, x, y);
			context.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+255 +")";
			context.fillRect( x*scale, y*scale, scale, scale );
		}
	}
}


function getPixelAt(image, x, y) {
	var index = ((y*image.width)+x) * 4
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

/*
for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i  ] = 255 - pix[i  ]; // red
    pix[i+1] = 255 - pix[i+1]; // green
    pix[i+2] = 255 - pix[i+2]; // blue
    // i+3 is alpha (the fourth element)
}
*/
