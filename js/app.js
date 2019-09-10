/*jshint esversion: 6 */

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Start a New Game
// Click event listener on 'Start Game' button
let game;
document.getElementById('btn__reset').addEventListener('click', function () {
  game = new Game();
  game.startGame();
});

// Click event listener to catch onscreen keyboard buttons
document.getElementById('qwerty').addEventListener('click', (keyPress) => {

  //Only listens for button clicks
  if (keyPress.target.tagName === 'BUTTON') {

    //Starts Handle Interaction Function
    game.handleInteraction(keyPress.target);
  }
});
