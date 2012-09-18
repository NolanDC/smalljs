/**
Some details

All board items should have various positions
bx and by represent the coordinates inside of the board
rx and ry represent the coordinates on-screen

**/

var board;
var tileSize = 10;
var canvas, ctx;
var offset = tileSize;
var state = "play";

//DOM ready
$(function() {
	
	$(document).keydown(function(e){
		handleKeyBoard(e);
	});
	
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	

	
	reset();
	
	setInterval(update, 60);
});


function reset() {
	board = new Board(60, 40);
	board.setup(1);

	canvas.width = tileSize*(board.width+2);
	canvas.height = tileSize*(board.height+2);

	snake = new Snake(16, 0);

	apples = new Apples(3);
	state = "play";
	$('#meta').html(0);
}

function gameOver() {
	$('#meta').html('GAME OVER (Score: ' + snake.score + ') - PRESS SPACE TO REPLAY');
	state = "dead";
}


function handleKeyBoard(e){
	if(e.keyCode) {
		keyCode = e.keyCode;
	}

	switch(keyCode) {
		case 37:
			if (snake.direction != "right" && snake.legalMove("left")) snake.moveQueue.push("left");
			break;
		case 38:
			if (snake.direction != "down" && snake.legalMove("up")) snake.moveQueue.push("up");
			break;
		case 39:
			if (snake.direction != "left" && snake.legalMove("right")) snake.moveQueue.push("right");
			break;
		case 40:
			if (snake.direction != "up" && snake.legalMove("down")) snake.moveQueue.push("down");
			break;
		case 32:
			if(state != "play"){
				reset();
			}
	}

	if(keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40){
		e.preventDefault();
	}

}


function update() {
	if(state == "play") {
		snake.move();		
	}

	render();
}

function render() {
	//Clear the canvas
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	
	board.render();
	snake.render();
	apples.render();

}


//inclusive for low + high
function rand(low, high) {
	return Math.random() * (high+1-low) + low;
}


function randInt(low, high) {
	return parseInt(rand(low, high));
}





