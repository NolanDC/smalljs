

function Snake(x, y, color, up, right, down, left, dir, name) {
	this.array = new Array();
	this.array.push(new Pos(x,y));
	//this.array.push(new Pos(x+1, y));
	//this.array.push(new Pos(x+1, y+1));
	this.toAdd = 0;
	this.direction = dir;
	this.speed = 5;
	this.score = 0;
	this.moveQueue = new Array();
	this.color = color;
	this.up = up;
	this.down = down;
	this.left = left;
	this.right = right;
	this.name = name;
	//Holds new positions given a direction
	this.dirPos = {"right": new Pos(1,0), "left": new Pos(-1,0), "down": new Pos(0, 1), "up": new Pos(0, -1)};
	
	this.render = function() {
		ctx.fillStyle=this.color;
		this.array.forEach(function(pos){
			if(board.in(pos.x, pos.y)) {
				ctx.fillRect(board.rx(pos.x)+1, board.ry(pos.y)+1, tileSize-2, tileSize-2);				
			}
		});
	}
	
	this.move = function() {
		var former = this.direction;
		if(this.moveQueue.length > 0){
			this.direction = this.moveQueue.shift();
		}
		
		var x = this.head().x + this.posChange(this.direction).x;
		var y = this.head().y + this.posChange(this.direction).y;
		if(this.headsCollide(x,y)) {
			gameOver();
		}else if(!board.in(x,y)){
			gameOver(this);
		}else if(this.inSnakes(x,y)){
			gameOver(this);
		}else{
			
			if(apples.contains(x,y)) {
				this.toAdd += 5;
				apples.remove(x,y);
				apples.addRandom();
				this.score+=10;
				$('#meta').html("Score: " + this.score);
			}
			
			this.array.push(new Pos(x, y));
			if(this.toAdd <= 0){
				this.array.shift();
			}else {
				this.toAdd--;
			}
		}	
	}
	
	this.headsCollide = function(x,y) {
		var s = this;
		var c = false;
		var pos = new Pos(x,y);
		snakes.forEach(function(snake) {
			if(s != snake) {
				if(snake.head().equals(pos)){
					c = true;
				}
			}
		});
		return c;
	}
	
	this.inSnakes = function(x, y) {
		var s = this;
		var c = false;
		snakes.forEach(function(snake) {
			if(snake.contains(x,y)){
				c = true;
			}
		});
		return c;
	}
	
	
	this.keyBoard = function(e) {
		if(e.keyCode) {
			keyCode = e.keyCode;
		}
		
		switch(keyCode) {
			case this.left:
				if (this.legalMove("left")) this.moveQueue.push("left");
				break;
			case this.up:
				if (this.legalMove("up")) this.moveQueue.push("up");
				break;
			case this.right:
				if (this.legalMove("right")) this.moveQueue.push("right");
				break;
			case this.down:
				if (this.legalMove("down")) this.moveQueue.push("down");
				break;
		}
		
		if($.inArray(keyCode, [this.left, this.right, this.up, this.down])){
			//e.preventDefault();
		}
	}
	
	this.legalMove = function(dir) {
		var x = this.head().x + this.posChange(dir).x;
		var y = this.head().y + this.posChange(dir).y;
		
		if(this.moveQueue.length > 0 && this.moveQueue[this.moveQueue.length-1] == dir) {
			return false;
		}
		
		if(this.moveQueue.length > 0){
		 	if(this.moveQueue[this.moveQueue.length-1] == opposite(dir)){
				return false;
			}
		}else{
			if(this.direction == opposite(dir)){
				return false;
			}
		}
		/*
		if(this.array.length > 1 && (new Pos(x,y).equals(this.array[this.array.length-2]))) {
			//$('#meta').html('illegal');
			$('html').css('background-color', '555');
			return false;
		}
		*/
		return true;
	}
	
	this.dirFromKey = function(keyCode) {
		switch(keyCode) {
			case this.left:
				return "left";
			case this.right:
				return "right";
			case this.up:
				return "up";
			case this.down:
				return "down";
		}
	}
	
	this.posChange = function(dir) {
		return this.dirPos[dir];
	}
	
	this.head = function() {
		return this.array[this.array.length - 1];
	}
	
	this.contains = function(x,y) {
		var p = new Pos(x,y);
		var c = false;
		this.array.forEach(function(pos){
			if(pos.equals(p)) c = true;
		});
		return c;
	}
}

function Pos(x, y) {
	this.x = x;
	this.y = y;
	this.equals = function(pos) {
		return (this.x == pos.x && this.y == pos.y);
	}
}