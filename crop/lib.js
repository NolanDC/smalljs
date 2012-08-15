
function createImageFromURL(url) {
	var img = new Image();
	img.src = url;
	return img;
}

//Crops the canvas (as determined by id), to the rectangle defined by x, y, w, h
function cropCanvasToImage(id, x, y, w, h) {
	var tmp_canvas = document.createElement('canvas')
		, tmp_context = tmp_canvas.getContext('2d')
		, from_canvas = document.getElementById(id)
		, from_context = from_canvas.getContext('2d');

	tmp_canvas.width = w;
	tmp_canvas.height = h;

	tmp_context.putImageData( from_context.getImageData(x, y, w, h) , 0, 0);
	return tmp_canvas.toDataURL('image/png');
}

//Returns true if px,py are inside the rectangle defined by x,y,w,h
function inRect(px, py, x, y, w, h) {
	return (px >= x && px <= x+w && py >= y && py <= y+h);
}

//Constrains value to the range min...max
function constrain(min, max, value) {
	return Math.max(min, Math.min(max, value));
}

//Returns the highest power of two below the given number
function powerBelow(num) {
	var power = Math.floor(logTwo(num));
	return Math.pow(2,power);
}

//Returns base-2 log of num
function logTwo(num) {
	return Math.log(num) / Math.log(2);
}