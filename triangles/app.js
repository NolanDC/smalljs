var canvas, context, dots;
var mouse = {x: 0, y: 0};
var OPTIONS = {
	dot_spacing: 30,
	jiggle: 5
}

var COLORS = [
	'#DF6A6A',
	'#6A7DDF',
	'#6ADF8B',
	'#DFDA6A'
]

$(function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d')
	canvas.width = window.innerWidth + 100
	//TODO: figure out why we have to subtract five to fit
	canvas.height = window.innerHeight + 100

	var horizontal_dots = parseInt(canvas.width / OPTIONS.dot_spacing + 1)
		, vertical_dots = parseInt(canvas.height / OPTIONS.dot_spacing + 1)

	dots = new Array(horizontal_dots);
	for(x = 0; x < horizontal_dots; x++) {

		dots[x] = new Array(vertical_dots);
		for(y = 0; y < vertical_dots; y++) {
			dots[x][y] = {x: x*OPTIONS.dot_spacing + randInt(-OPTIONS.jiggle, OPTIONS.jiggle), y: y*OPTIONS.dot_spacing + randInt(-OPTIONS.jiggle, OPTIONS.jiggle)};
		}
	}


	for(x = 0; x < horizontal_dots; x++) {
		for(y = 0; y < vertical_dots; y++) {
			if(x == horizontal_dots - 1 || y == vertical_dots - 1) continue;
			var topleft = dots[x][y]
				,	topright = dots[x+1][y]
				, bottomleft = dots[x][y+1]
				, bottomright = dots[x+1][y+1]

			context.moveTo(topleft.x, topleft.y)
			context.strokeStyle = rgbString(0,0,0) + ';'
			var color = COLORS[randInt(0,COLORS.length-1)]
			var color = ['#ccc', '#222'][randInt(0,1)]
			var val = 255/randInt(1,10);
			//color = rgbString(val, val, val);
			context.fillStyle = color
			context.strokeStyle = color
			context.lineWidth = 2;

			context.beginPath()
				context.lineTo(topright.x, topright.y)
				context.lineTo(bottomright.x, bottomright.y)
				context.lineTo(topleft.x, topleft.y)
				context.fill();
				context.stroke();
			context.closePath()

			context.beginPath()
				context.lineTo(bottomright.x, bottomright.y)
				context.lineTo(bottomleft.x, bottomleft.y)
				context.lineTo(topleft.x, topleft.y)
				context.fill();
				context.stroke();
			context.closePath()

			context.fillRect(topleft.x, topleft.y, 2, 2);

		}
	}


	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX;// - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	});


});

function rgbString(r, g, b) {
	return 'rgba(' + [parseInt(r),parseInt(g),parseInt(b),255].join(',') + ')';
}

function rand(low, high) {
	return Math.random() * (high+1-low) + low;
}

function randInt(low, high) {
	return parseInt(rand(low, high));
}
