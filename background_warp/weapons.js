var bullets = new Array();

function BasicBullet(position, angle, speed, damage) {
	if(speed === undefined) {
		speed = 10;
	}
	
	if(damage === undefined) {
		damage = 1;
	}
	
	this.pos = position.copy();
	this.angle = angle;
	this.speed = speed;
	this.radius = 2;
	this.damage = damage;
	this.force = 1;
	
	this.update = function() {
		this.pos.x += Math.cos(this.angle)*this.speed;
		this.pos.y += Math.sin(this.angle)*this.speed;
	}
	
	this.setOwner = function(owner) {
		this.owner = owner;
	}
	
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
	
	this.dead = function() {
		return this.pos.outBounds(OPTIONS.UPPER_LEFT, OPTIONS.LOWER_RIGHT, 0);
	}
}

function BasicWeapon(owner, firetime) {
	if(firetime === undefined) {
		firetime = 100;
	}
	this.owner = owner;
	this.timer = new Timer(firetime);
	
	this.fire = function() {
		var bullet = new BasicBullet(this.owner.pos, this.owner.getAngle());
		bullet.setOwner(this.owner);
		bullets.push(bullet);
	}
	
	this.update = function() {
		if(this.timer.done()) {
			this.fire();
			this.timer.reset();
		}
	}
}