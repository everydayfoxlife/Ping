
// Todo:
// - add boundaries for animations
// - replace sprites
// - refactor JS

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new PIXI.WebGLRenderer(1000, 600);
var interactive = true;

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var scene = new PIXI.Container(interactive);

var actorManager = new ActorManager();

// load the texture we need
PIXI.loader.add('stage', 'assets/background.png');
PIXI.loader.add('actorIdle', 'assets/actor_idle.png');
PIXI.loader.add('actorPullup', 'assets/actor_pullup.png');
PIXI.loader.add('actorJumprope', 'assets/actor_jumprope.png');
PIXI.loader.add('actorWeightlift', 'assets/actor_weightlift.png');
PIXI.loader.add('pullupBar', 'assets/pullup_bar.png');
PIXI.loader.add('jumprope', 'assets/jumprope.png');
PIXI.loader.add('weightlift', 'assets/weightlift.png');
PIXI.loader.add('dumbbell', 'assets/dumbbell.png');
PIXI.loader.add('alert', 'assets/alert.png');

PIXI.loader.load(function (loader, resources) {
	stage = new PIXI.Sprite(resources.stage.texture);
	alert = new PIXI.Sprite(resources.alert.texture);

	pullupBar = new PIXI.Sprite(resources.pullupBar.texture);
	pullupBar.x = 400;
	pullupBar.y = 350;

	jumprope = new PIXI.Sprite(resources.jumprope.texture);
	jumprope.x = 100;
	jumprope.y = 350;

	weightlift = new PIXI.Sprite(resources.weightlift.texture);
	weightlift.x = 700;
	weightlift.y = 350;

	dumbbell = new PIXI.Sprite(resources.dumbbell.texture);
	dumbbell.x = -30;
	dumbbell.y = 0;

	// Add the stage to the scene we are building.
	scene.addChild(stage);
	scene.addChild(pullupBar);
	scene.addChild(jumprope);
	scene.addChild(weightlift);
	weightlift.addChild(dumbbell);

	actor = new Actor(scene, resources.actorIdle.texture);

	actorManager.actor = actor;
	actor.pullupBar = pullupBar;
	actor.jumprope = jumprope;
	actor.weightlift = weightlift;
	actor.dumbbell = dumbbell;
	actor.alert = alert;

	update();

});

var keyRightPressed = false;
var keyLeftPressed = false;
var keyUpPressed = false;
var keyDownPressed = false;

window.addEventListener("keydown", function (e) {
	// console.log(e.keyCode);
	if (e.keyCode === 39) {
		keyRightPressed = true;
	}

	if (e.keyCode === 37) {
		keyLeftPressed = true;
	}

	if (e.keyCode === 38) {
		keyUpPressed = true;
	}

	if (e.keyCode === 40) {
		keyDownPressed = true;
	}


});

window.addEventListener("keyup", function (e) {
	if (e.keyCode === 39) {
		keyRightPressed = false;
	}

	if (e.keyCode === 37) {
		keyLeftPressed = false;
	}

	if (e.keyCode === 38) {
		keyUpPressed = false;
	}

	if (e.keyCode === 40) {
		keyDownPressed = false;
	}

});

// Update will be called once every frame
function update() {

	if (keyLeftPressed) {
		actor.moveLeft();
	} else if (keyRightPressed) {
		actor.moveRight();
	} else if (keyUpPressed) {
		actor.engage();
	} else if (keyDownPressed) {
		actor.disengage();
	}

	actor.update();

	// this is the main render call that makes pixi draw your container and its children.
	renderer.render(scene);

	// start the timer for the next animation loop
	requestAnimationFrame(update);

}

