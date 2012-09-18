

function Snake(x, y) {
	this.array = new Array();
	this.array.push(new Pos(x,y));
	//this.array.push(new Pos(x+1, y));
	//this.array.push(new Pos(x+1, y+1));
	this.toAdd = 0;
	this.direction = "down";
	this.speed = 5;
	this.score = 0;
	this.moveQueue = new Array();
	
	//Holds new positions given a direction
	this.dirPos = {"right": new Pos(1,0), "left": new Pos(-1,0), "down": new Pos(0, 1), "up": new Pos(0, -1)};
	
	this.render = function() {
		ctx.fillStyle="rgb(50,50,150)";
		this.array.forEach(function(pos){
			if(board.in(pos.x, pos.y)) {
				ctx.fillRect(board.rx(pos.x)+1, board.ry(pos.y)+1, tileSize-2, tileSize-2);				
			}
		});
	}
	
	this.move = function() {
		if(this.moveQueue.length > 0){
			this.direction = this.moveQueue.shift();
		}
		var x = this.head().x;
		var y = this.head().y;
		
		switch(this.direction) {
			case "up":
				y--;
				break;
			case "down":
				y++;
				break;
			case "left":
				x--;
				break;
			case "right":
				x++;
				break;
		}
		
		if(!board.in(x,y) || snake.contains(x,y)) {
			gameOver();
		}else {
			
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
	
	this.legalMove = function(dir) {
		var x = this.head().x + this.posChange(dir).x;
		var y = this.head().y + this.posChange(dir).y;
		
		if(this.array.length > 1 && (new Pos(x,y).equals(this.array[this.array.length-2]))) {
			$('html').css('background-color', '555');
			return false;
		}
		return true;
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