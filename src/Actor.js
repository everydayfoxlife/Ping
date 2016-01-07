CEILING = 300;

function Actor(scene, texture){
	this.actor = new PIXI.Sprite(texture);

	scene.addChild(this.actor);

	actorScale = 0.25;
	this.actor.scale.x = actorScale;
	this.actor.scale.y = actorScale;

	this.defaultX = 10;
	this.defaultY = 400;

	this.x = this.defaultX;
	this.y = this.defaultY;

	this.canEngage = false;
	this.isEngaged = false;
	this.removedWeight = false;

	this.pullupBar = null;
	this.jumprope = null;
	this.weightlift = null;
	this.dumbbell = null;

	this.alert = null;

}

Actor.prototype.alertMe = function (){

	this.actor.addChild(this.alert);
	this.alert.position.x = -50;
	this.alert.position.y = -50;
};

Actor.prototype.jumpRope = function (){
	this.actor.isEngaged = true;
	this.actor.removeChild(this.alert);

	var actorJumprope = PIXI.Texture.fromImage('assets/actor_jumprope.png');
	this.actor.setTexture(actorJumprope);

	var animateJump = new TINA.Sequence()
	.add(
		new TINA.NestedTween(this, ['y'])
		.to({y: this.y - 10}, 100)
		.to({y: this.defaultY}, 100));

	animateJump.start();
	
};

Actor.prototype.pullup = function (){
	this.actor.isEngaged = true;
	this.actor.removeChild(this.alert);

	var actorPullup = PIXI.Texture.fromImage('assets/actor_pullup.png');
	this.actor.setTexture(actorPullup);

	var animatePullup = new TINA.Sequence()
	.add(
		new TINA.NestedTween(this, ['y'])
		.to({y: this.y - 10}, 100)
		.to({y: this.y + 10}, 100)
		);

	if (this.y < this.pullupBar.y){
		animatePullup.start();
		return;
	} else {
	this.y -= 10;
	}

};

Actor.prototype.liftWeights = function (){
	this.actor.isEngaged = true;
	this.actor.removeChild(this.alert);

	var actorWeightlift = PIXI.Texture.fromImage('assets/actor_weightlift.png');
	this.actor.setTexture(actorWeightlift);

	if (!this.removedWeight){
		this.removeWeight();
	} else {
		this.weightReps();
	}

};

Actor.prototype.removeWeight = function (){
	this.removedWeight = true;

	var holdWeight = this.dumbbell.y + 30;
	
	var animateRemoveWeight = new TINA.Sequence()
	.add(
		new TINA.NestedTween(this.dumbbell, ['y'])
		.to({y: holdWeight}, 500)
		);

	animateRemoveWeight.start();
};

Actor.prototype.weightReps = function (){

	var animateWeightRep = new TINA.Sequence()
	.add(
		new TINA.NestedTween(this.dumbbell, ['y'])
		.to({y: this.dumbbell.y - 10}, 100)
		.to({y: this.dumbbell.y + 10}, 100)
		);

		animateWeightRep.start();
};

Actor.prototype.resetWeight = function (){
	this.removedWeight = false;

	var animateResetWeight = new TINA.Sequence()
	.add(
		new TINA.NestedTween(this.dumbbell, ['y'])
		.to({y: 0}, 100)
		);

		animateResetWeight.start();
};

Actor.prototype.moveRight = function (){
	
	if (this.actor.isEngaged) {
		return;
	}

	this.x += 10;

	this.update();
};

Actor.prototype.moveLeft = function (){

	if (this.actor.isEngaged || this.x < 0){
		return;
	}

	this.x -= 10;

	this.update();
};

Actor.prototype.engage = function (){
	

	if (this.actor.position.x > this.pullupBar.x &&
		this.actor.position.x < this.pullupBar.x + this.pullupBar.width &&
		this.actor.canEngage) {

		this.pullup();
	}

	else if (this.actor.position.x > this.jumprope.x &&
		this.actor.position.x < this.jumprope.x + this.jumprope.width &&
		this.actor.canEngage){

		this.jumpRope();
	}

	else if (this.actor.position.x > this.weightlift.x &&
		this.actor.position.x < this.weightlift.x + this.weightlift.width &&
		this.actor.canEngage){

		this.liftWeights();
	}
};

Actor.prototype.disengage = function (){

	var actorIdle = PIXI.Texture.fromImage('assets/actor_idle.png');
	this.actor.isEngaged = false;
	this.y = this.defaultY;

	this.actor.setTexture(actorIdle);

	this.resetWeight();

};

Actor.prototype.update = function () {

	if (this.actor.position.x > this.pullupBar.x && this.actor.position.x < this.pullupBar.x + this.pullupBar.width ||
		this.actor.position.x > this.jumprope.x && this.actor.position.x < this.jumprope.x + this.jumprope.width ||
		this.actor.position.x > this.weightlift.x && this.actor.position.x < this.weightlift.x + this.weightlift.width){
		this.actor.canEngage = true;
	} else {
		this.actor.canEngage = false;
	}

	if (this.actor.canEngage && !this.actor.isEngaged) {
		this.alertMe();
	} else {
		this.actor.removeChild(this.alert);
	}

	this.actor.position.x = this.x;
	this.actor.position.y = this.y;

	this.actor.sprite = this.texture;
};