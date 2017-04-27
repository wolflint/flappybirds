//Create our 'main' state that will contain the game
var mainStage = {
  preload: function() {
    //This function will be executed at the beginning
    //That's where we load the images and sound

    //Load the bird sprite
    game.load.image('bird', 'assets/bird.png');
  },

  create: function() {
      //This function is called after the preload function
      //Here we setup the game, display sprites, etc...

      //Change the background colour o the game to ble - for now!
      game.stage.backgroundColor = '#71c5cf';

      //Set the physics for the game
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //Display the bird as the position of x=100 and y=245
      this.bird = game.add.sprite(100, 245, 'bird');

      //Add physics to the bird
      //Needed for: movement, gravity, collisions, etc...
      game.physics.arcade.enable(this.bird);

      //Add gravity to the bird to ake it fall
      this.bird.body.gravity.y = 1000;

      //Call 'jump' function when the space bar is pressed
      var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceBar.onDown.add(this.jump, this);
  },

    update: function() {
        //This function is called 60 times per second
        //It contains the games logic

        //Call the 'restartGame' function
        if (this.bird.y <0 || this.bird.y > 490)
        this.restartGame();
    },
    jump: function() {
      //Add a vertical velocity to the bird
      this.bird.body.velocity.y = -350;
    },

    //Retart the game
    restartGame: function() {
      //Start the 'main' state which restarts game
      game.state.start('main');
    },
};

//Initialise Phaser, and create a 400px x 490px game
var game = new Phaser.Game(400, 490);

//Add the 'mainState' and call it 'main''
game.state.add('main', mainState);

//Start the state to actually start the game
game.state.start('main');
