
function Player(position) {
	this.pos = position;
	this.size = 20;
	this.angle = 0;
	this.force = 5;
	this.weapons = new Array();
	
	this.update = function() {
		var dist = distance(mousePos, this.pos);
		if(dist > (this.size/2)) {
			this.pos.ease(mousePos, 100);
		}
		
		this.pos.bound(OPTIONS.UPPER_LEFT, OPTIONS.LOWER_RIGHT, this.size/2);		
		this.angle = this.getAngle();
		
		$.each(this.weapons, function(index, item) {
			item.update();
		});
	}
	
	this.draw = function() {
		ctx.strokeStyle = "rgb(0,0,0)";
		//ctx.fillRect(this.pos.x - (this.size/2), this.pos.y - (this.size/2), this.size, this.size);
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.size/2, 0, Math.PI*2, true);		
		ctx.closePath();
		ctx.stroke();
		
		ctx.fillStyle="rgb(0,0,0)";
		ctx.beginPath();
		//ctx.arc(this.pos.x, this.pos.y, this.size/2, this.angle, this.angle+.1, true);
		ctx.closePath();
		ctx.fill();
		drawRay(this.pos, this.angle, this.size/2);
		
	}
	
	this.getAngle = function() {
	  return Math.atan2(mousePos.y - this.pos.y, mousePos.x - this.pos.x);
	}
	
	this.addWeapon = function(weapon) {
		this.weapons.push(weapon);
	}
}