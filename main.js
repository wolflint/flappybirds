//Create our 'main' state that will contain the game
var mainStage = {
  preload: function() {
    //This function will be executed at the beginning
    //That's where we load the images and sound
  },

  create: function() {
      //This function is called after the preload function
      //Here we setup the game, display sprites, etc...
  },

    update: function() {
        //This function is called 60 times per second
        //It contains the games logic
    },
};

//Initialise Phaser, and create a 400px x 490px game
var game = new Phaser.Game(400, 490);

//Add the 'mainState' and call it 'main''
game.state.add('main', mainState);

//Start the state to actually start the game
game.state.start('main');
