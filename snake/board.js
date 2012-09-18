


function Board(width, height) {
	this.width = width;
	this.height = height;

	//Returns the tile at the given coordinates
	this.at = function(x,y) {
		return this.array[x][y];
	}
	
	//True if the given indexes are in the board
	this.in = function(x,y) {
		if(x >= 0 && x < this.width) {
			if(y >= 0 && y < this.height) {
				return true;
			}
		}
		return false;
	}
	
	this.render = function() {
		var rx, ry, tile, opacity, offx=0, offy=0;
		this.array.forEach(function(x, idx){
			x.forEach(function(y, idy){

				tile = board.at(idx, idy);
				opacity = 1; offx=0; offy=0;
				
				ctx.fillStyle="rgba(0,0,0,1)";
				if(tile.open == true){
					ctx.fillStyle="rgba(230,230,230," + opacity + ")";
				}

				//alert(tile.rx + " : " + tile.ry);

				ctx.fillRect(tile.rx+offx, tile.ry+offy, tileSize, tileSize);

			});
		});		
	}
	
	this.setup = function(level) {
		b = new Array(this.height);
		for(h=0; h<this.width; h++){
			b[h] = new Array(this.width);
			for(w=0; w<this.height; w++){
				var open = true;
				b[h][w] = new Tile(h, w, open);
			}
		}

		this.array = b;
				
		switch(level) {
			
		}
	}
	
	this.rx = function(x) { return x*tileSize + offset};
	this.ry = function(y) { return y*tileSize + offset};
	this.bx = function(rx) { return parseInt(rx/tileSize) };
 	this.by = function(ry) { return parseInt(ry/tileSize) };
}


function Tile(x, y, open) {
	this.x = x;
	this.y = y;
	this.open = open;
	this.rx = board.rx(x);
	this.ry = board.ry(y);
	this.width = tileSize;
	this.height = tileSize;
	this.ripple = 0;
	this.mouseOver = function() {
		if(mouseX >= this.rx && mouseX < this.rx+this.width){
			if(mouseY >= this.ry && mouseY < this.ry+this.height){
				return true;
			}
		}
		return false;
	}
}