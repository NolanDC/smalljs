var mouseX, mouseY;
var mousePos = new Vector(0,0);

$(function() {
	$(document).mousemove(function(e){
		setMouse(e);
	});
});

function setMouse(e){
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	mousePos.set(mouseX, mouseY);
}


function Vector(x, y) {

	this.copy = function() {
		return new Vector(this.x, this.y);
	}
	
	this.set = function(tx, ty) {
		if(tx instanceof Vector) {
			this.x = tx.x;
			this.y = tx.y;
		} else {
			this.x = parseFloat(tx);
			this.y = parseFloat(ty);
		}
	}
	
	this.moveTowards = function(vec, speed) {
		var dist = distance(this, vec);
		var angle = Math.atan2(vec.y - this.y, vec.x - this.x);
		
		if(dist > speed) {
			this.x += speed * Math.cos(angle);
			this.y += speed * Math.sin(angle);
		} else {
			this.set(vec);
		}
	}
	
	this.ease = function(vector, speed) {
		this.x += (vector.x - this.x)/5;
		this.y += (vector.y - this.y)/5;
	}
	
	//Bounds a vector in between 
	this.bound = function(vec1, vec2, radius) {
		if(radius === undefined) {
			radius = 0;
		}
		if(this.x - radius < vec1.x) {
			this.x = vec1.x+radius;
		}
		if(this.x + radius > vec2.x) {
			this.x = vec2.x-radius;
		}
		if(this.y - radius < vec1.y) {
			this.y = vec1.y+radius;
		}
		if(this.y + radius > vec2.y) {
			this.y = vec2.y-radius;
		}
	}
	
	this.outBounds = function(vec1, vec2, radius) {
		if(radius === undefined) {
			radius = 0;
		}
		if(this.x + radius < vec1.x) {
			return true;
		}
		if(this.x - radius > vec2.x) {
			return true;
		}
		if(this.y + radius < vec1.y) {
			return true;
		}
		if(this.y - radius > vec2.y) {
			return true;
		}
	}
	
	this.add = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}
	
	this.magnitude = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	this.angle = function() {
		return Math.atan2(0 - this.y, 0 - this.x);
	}
	
	this.set(x, y);
	
}

function MovePoint(x, y) {
	if(x instanceof Vector) {
		this.pos = x.copy();
	} else {
		this.pos = new Vector(x,y);
	}
	
	this.maxDist = 50;
	this.returnForce = 3;
	
	this.origin = this.pos.copy();
	this.target = this.pos.copy();
	this.force = new Vector(0,0);
	
	this.update = function() {
		var dist = distance(player.pos, this.origin)
		if(dist < 50) {
			//var newDist = (dist/100) * 40;
			//var angle = Math.atan2(mousePos.y - this.origin.y, mousePos.x - this.origin.x);
			//this.target.set(this.origin.x + newDist * Math.cos(angle), this.origin.y + newDist * Math.sin(angle));
			//var n = new Vector(this.origin.x + Math.cos(angle)*(.2*dist), this.origin.y + Math.sin(angle)*(.2*dist));
			this.target.moveTowards(player.pos, 5);
		}else {
			this.target.moveTowards(this.origin, 1);
			//this.target.set(this.origin);
		}
		
		for(var i = 0; i < bullets.length; i++) {
			if(distance(bullets[i].pos, this.origin) < 50) {
				//this.target.moveTowards(bullets[i].pos, 5);
			} else {
				//this.target.moveTowards(this.origin, 1);
			}
		}
		
		this.pos.moveTowards(this.target, 5);
		
	}
	
	this.exertForce = function(vec, force) {
		var angle = Math.atan2(vec.y - this.y, vec.x - this.x);
		this.force.add(force * Math.cos(angle), force * Math.sin(angle));
	}
	
}


function Line(point1, point2) {
	this.start = point1;
	this.end = point2;
	
	this.draw = function() {
		drawLine(this.start.pos, this.end.pos);
	}
}

function distance(vec1, vec2) {
	return Math.sqrt(((vec1.x - vec2.x) * (vec1.x - vec2.x)) + ((vec1.y - vec2.y) * (vec1.y - vec2.y)));
}



//Also takes vectors
function drawLine(x1, y1, x2, y2) {
	if(x1 instanceof Vector && y1 instanceof Vector) {
		var vec1 = x1;
		var vec2 = y1;
		x1 = vec1.x;
		y1 = vec1.y;
		x2 = vec2.x;
		y2 = vec2.y;
	}
	ctx.beginPath();
	ctx.moveTo(parseInt(x1), parseInt(y1)); 
	ctx.lineTo(parseInt(x2), parseInt(y2));
	ctx.stroke();
}

function drawRay(pos, angle, length) {
	drawLine(pos.x, pos.y, pos.x + Math.cos(angle) * length, pos.y + Math.sin(angle) * length);
}


function Timer(millis) {
	this.millis = millis;
	this.old = 0;
	
	this.reset = function() {
		this.old = this.current();
	}
	
	this.done = function() {
		if(this.old + this.millis < this.current()) {
			return true;
		}
		
		return false;
	}
	
	this.current = function() {
		return new Date().getTime();
	}
}