var vectors;
var lines = [];
var player;

var OPTIONS = {
	DIM: 21, 
	TILE_SIZE: 30,
	WIDTH: 600,
	HEIGHT: 600
}

OPTIONS.UPPER_LEFT = new Vector(0,0);
OPTIONS.LOWER_RIGHT = new Vector(OPTIONS.WIDTH, OPTIONS.HEIGHT);


$(function() {
	
	canvas = document.getElementById('field');
	ctx = canvas.getContext('2d');
	canvas.width = OPTIONS.WIDTH;
	canvas.height = OPTIONS.HEIGHT;
	
	setup();
	
	setInterval(update, 30);
});

function setup() {
	vectors = new Array(OPTIONS.DIM);

	
	for(x = 0; x < OPTIONS.DIM; x++) {
		vectors[x] = new Array(OPTIONS.DIM);
		
		for(y = 0; y < OPTIONS.DIM; y++) {
			vectors[x][y] = new MovePoint( new Vector(x * OPTIONS.TILE_SIZE, y * OPTIONS.TILE_SIZE) );
		}
	}
	
	doubleEach(vectors, function(item, index1, index2) {
		if(index1 < OPTIONS.DIM - 1) {
			lines.push( new Line(item, vectors[index1+1][index2]) );
		}
		if(index2 < OPTIONS.DIM - 1) {
			lines.push( new Line(item, vectors[index1][index2+1]) );
		}
	});
	
	player = new Player(new Vector(0,0));
	player.addWeapon(new BasicWeapon(player));
}


function update() {
	
	doubleEach(vectors, function(vector, index1, index2) {
		vector.update();
	});

	player.update();
	
	bullets = $.grep(bullets, function(item) {
		item.update();
		return !item.dead();
	});
	
	draw();
	
}


function draw() {
	ctx.fillStyle="rgb(230,230,230)";
	ctx.fillStyle="rgb(255,255,255)";
	ctx.fillRect(0,0, OPTIONS.WIDTH, OPTIONS.HEIGHT);
	
	ctx.strokeStyle="rgb(210,210,210)";
	$.each(lines, function(index, line) {
		line.draw();
	});
	
	player.draw();
	
	$.each(bullets, function(index, item) {
		item.draw();
	});
	
}

function doubleEach(array, cb) {
	$.each(array, function(index, item) {
		$.each(item, function(index2, item2) {
			cb(item2, index, index2);
		});
	});
}