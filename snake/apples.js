

function Apples(number) {
	this.array = new Array();
	this.number = number;

	this.render = function() {
		ctx.fillStyle="rgb(200,50,50)";
		this.array.forEach(function(apple) {
			ctx.fillRect(board.rx(apple.x), board.ry(apple.y), tileSize, tileSize);
		});
	}
	
	this.add = function(x, y) {
		if(this.array.length < this.number) 
			this.array.push(new Pos(x,y));
	};
	
	this.contains = function(x, y) {
		var p = new Pos(x,y);
		for(i = 0; i < this.array.length; i++) {
			if(this.array[i].equals(p)) 
				return true;
		}
		return false;
	};
	
	this.remove = function(x,y) {
		var p = new Pos(x,y);
		for(var i = 0; i < this.array.length; i++) {
			if(this.array[i].equals(p)) 
				this.array.splice(i, 1);
		}
	};
	
	this.addRandom = function() {
		var x = randInt(0, board.width-1);
		var y = randInt(0, board.height-1);
		while(snake.contains(x,y) || this.contains(x,y)) {
			x = randInt(0, board.width-1);
			y = randInt(0, board.height-1);		
		}
		this.add(x,y);			
	}
	
	for(n = 0; n < this.number; n++){
		this.addRandom();
	}
	
}
