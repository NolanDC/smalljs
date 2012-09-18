/**
Some details

All board items should have various positions
bx and by represent the coordinates inside of the board
rx and ry represent the coordinates on-screen

**/

var board;
var tileSize = 8;
var canvas, ctx;
var offset = tileSize;
var state = "play";
var lastKey;
//DOM ready
$(function() {
	
	$(document).keydown(function(e){
		handleKeyBoard(e);
	});
	
	$(document).keypress(function(e){
		//handleKeyBoard(e);
	});
	
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	

	
	reset();
	
	setInterval(update, 60);
});


function reset() {
	board = new Board(64, 40);
	board.setup(1);

	canvas.width = tileSize*(board.width+2);
	canvas.height = tileSize*(board.height+2);
	snakes = new Array();
	//up right down left
	snakes.push(new Snake(16, 0, "rgb(50,150,50)", 38, 39, 40, 37, "down", "GREEN"));
	snakes.push(new Snake(16, 39, "rgb(50,50,150)", 87, 68, 83, 65, "up", "BLUE"));
	
	apples = new Apples(10);
	state = "play";
	$('#meta').html(0);
}

function gameOver(loser) {
	if(typeof(loser) == "undefined"){
		$('html').css('background-color', 'rgb(255,255,255)');
		$('#meta').html('THERE WAS NO WINNER. SPACE TO REPLAY');
		state = "dead";		
	}else{
		snakes.forEach(function(snake){
			if(snake != loser){
				$('#meta').html('GAME OVER, THE WINNER IS ' + snake.name + '. SPACE TO REPLAY');
				$('html').css('background-color', snake.color);
			}
		});
		state = "dead";
	}
	//$('#meta').html('GAME OVER (Score: ' + snake.score + ') - PRESS SPACE TO REPLAY');
	//$('#meta').html('Game Over, Space to replay');

}


function handleKeyBoard(e){
	if(e.keyCode) {
		keyCode = e.keyCode;
	}
	
	if(keyCode != lastKey){
		if(state == "play") {
			console.log(snakes[0].dirFromKey(e.keyCode));			
		}	
		snakes.forEach(function(snake){
			snake.keyBoard(e);
		});			
	}



	switch(keyCode) {
		case 32:
			if(state != "play"){
				reset();
			}
	}

	if(keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40){
	}
	
	lastKey = keyCode;

}


function update() {
	if(state == "play") {
		snakes.forEach(function(snake) {
			snake.move();
		});
	}

	render();
}

function render() {
	//Clear the canvas
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	
	board.render();
	snakes.forEach(function(snake) {
		snake.render();
	});
	
	apples.render();

}


function opposite(dir) {
	switch(dir) {
		case "left": return "right";
		case "right": return "left";
		case "up": return "down";
		case "down": return "up";
	}
}

//inclusive for low + high
function rand(low, high) {
	return Math.random() * (high+1-low) + low;
}


function randInt(low, high) {
	return parseInt(rand(low, high));
}







