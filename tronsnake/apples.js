

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
		if(this.array.length < this.number) {
			this.array.push(new Pos(x,y));
		}
	};
	
	this.contains = function(x, y) {
		var p = new Pos(x,y);
		var c = false;
		this.array.forEach(function(apple){
			if(apple.equals(p)){
				c = true;
			}
		}); 
		return c;
	};
	
	this.remove = function(x,y) {
		var p = new Pos(x,y);
		this.array.forEach(function(apple, index, array){
			if(apple.equals(p)) {
				array.splice(index, 1);
			}
		});
	};
	
	this.addRandom = function() {
		var x = randInt(0, board.width-1);
		var y = randInt(0, board.height-1);
		var pos = new Pos(x,y);
		var sc = true;
		while(sc || this.contains(x,y)) {
			sc = false;
			snakes.forEach(function(snake){
				if(snake.contains(x,y)){
					sc = true;
				}
			});
			x = randInt(0, board.width-1);
			y = randInt(0, board.height-1);		
		}
		this.add(x,y);			
	}
	
	for(n = 0; n < this.number; n++){
		this.addRandom();
	}
	
}
