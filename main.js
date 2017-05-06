//TEST

//Create our 'main' state that will contain the game
var mainState = {

  preload: function() {
    //This function will be executed at the beginning
    //That's where we load the images and sound

    //Load the bird sprite and sound
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    game.load.audio('jump', 'assets/jump.wav');

    //Center the game canvas
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();

  },

  create: function() {
    //This function is called after the preload function
    //Here we setup the game, display sprites, etc...

    //Change the background colour o the game to ble - for now!
    game.stage.backgroundColor = '#0b1852';

    //Set the physics for the game
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Display the bird as the position of x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    //Move the rotation anchor point
    this.bird.anchor.setTo(-0.2, 0.5);

    //Add physics to the bird
    //Needed for: movement, gravity, collisions, etc...
    game.physics.arcade.enable(this.bird);

    //Add gravity to the bird to ake it fall
    this.bird.body.gravity.y = 1000;

    //Call 'jump' function when the space bar is pressed
    var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.jump, this);

    // Create an empty group
    this.pipes = game.add.group();

    //Timer for addRowOfPipes() function
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    //Jump sound
    this.jumpSound = game.add.audio('jump');



    //Score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", {
      font: "30px Mono",
      fill: "#ffffff"
    });
  },

  addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
      if (i != hole && i != hole + 1)
        this.addOnePipe(400, i * 60 + 10);
    //Increase score
    this.score += 1;
    this.labelScore.text = this.score;
  },

  update: function() {
    //This function is called 60 times per second
    //It contains the games logic

    //Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();

    //Collision
    game.physics.arcade.overlap(
      this.bird, this.pipes, this.hitPipe, null, this);

    //Tilt down when falling
    if (this.bird.angle < 20)
      this.bird.angle += 1;
  },

  jump: function() {
    //Bird can't jump if dead
    if (this.bird.alive === false)
      return;
    // Make the bird jump
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;

    //Create an animation on the bird
    var animation = game.add.tween(this.bird);

    //Change the angle by -20 in 100 milliseconds
    animation.to({
      angle: -20
    }, 100);

    //Pay jump sound
    this.jumpSound.play();

    //Start the animation
    animation.start();
  },

  hitPipe: function() {
    //If bird has hit a pipe do nothing
    //Bird is already falling of the screen
    if (this.bird.alive === false)
      return;

    //set alive property to false
    this.bird.alive = false;

    //stop new pipes spawning
    game.time.events.remove(this.timer);

    //Stop movement of all current pipes
    this.pipes.forEach(function(p) {
      p.body.velocity.x = 0;
    }, this);
  },

  restartGame: function() {
    // Restart the game
    // Start the 'main' state, which restarts the game
    game.state.start('main');

  },
};

//Initialise Phaser, and create a 400px x 490px game
var game = new Phaser.Game(400, 490);

//Add the 'mainState' and call it 'main''
game.state.add('main', mainState);

//Start the state to actually start the game
game.state.start('main');
