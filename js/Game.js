/*jshint esversion: 6 */

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// *** Declare Phrase class *** - Step 2
// *** Create constructor method *** - Step 3

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase('The Sea'),
      new Phrase('You Shall Not Pass'),
      new Phrase('Live Long and Prosper'),
      new Phrase('No Lucke I Am Your Father'),
      new Phrase('I Love You'),
    ];
    this.activePhrase = null;
  }

  getRandomPhrase() {
    const randomNum = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNum];
  }

  // Begins the game by calling the getRandomPhrase function and displaying it to the user

  startGame() {
    document.getElementById('overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  // Handle Interaction Function

  /*
    When a user clicks on one of the onscreen keyboard buttons:
  - The clicked letter is captured
  - The clicked letter is checked against the phrase for a match
  - If there's a match, the letter is displayed on screen instead of the placeholder
  - If there's no match, the game removes a life from the scoreboard
  - The game checks if the player has won the game by revealing all of the letters in the phrase or
  - If the game is lost because the player is out of lives
  - If the game is won or lost, a message is displayed on screen
  */

  handleInteraction(keyPress) {
    keyPress.disabled = true; //Turns the pressed button off

    let keyPressTextContent = keyPress.textContent;

    //Calls checkLetter function

    if (game.activePhrase.checkLetter(keyPressTextContent)) {

      //If the letter is in the phrase then call showMatchedLetter function
      game.activePhrase.showMatchedLetter(keyPressTextContent);
      keyPress.className = 'chosen'; //Changes css style to chosen color

      if (this.checkForWin()) {

        //Checks if the game is won
        this.gameOver(true);
      }

    }else {

      //If the letter is not in the phrase then change css style to wrong color and remove life
      keyPress.className = 'wrong';
      this.removeLife();
    }
  }

  // Check For Win Function

  /*
  * Checks for winning move
  * @return {boolean} True if game has won, false if game wasn't won
  */

  //This method checks to see if the player has revealed all of the letters in the active phrase
  checkForWin() {
    const phraseLettersHidden = document.getElementsByClassName('hide').length;

    //If the number of hidden letters is zero then the game has been won
    if (phraseLettersHidden === 0) {
      return true;
    } else {
      return false;
    }
  }

  // Remove Life Function
  /*
  * Increases the value of the missed property
  * Removes a life from the scoreboard
  * Checks if player has remaining lives and ends game if player is out
  */

  // This method removes a life from the scoreboard,
  //by replacing one of the `liveHeart.png` images with
  //a `lostHeart.png` image - found in the images folder
  //and increments the `missed` property
  //If the player has five missed guesses (i.e. out of lives)
  //Then the game is calling the `gameOver()` method

  removeLife() {
    this.missed += 1;
    const hearts = document.querySelectorAll('img');
    for (let i = 0; i < hearts.length; i++) {
      if (this.missed === 1) {
        hearts[0].src = 'images/lostHeart.png';
      } else if (this.missed === 2) {
        hearts[1].src = 'images/lostHeart.png';
      } else if (this.missed === 3) {
        hearts[2].src = 'images/lostHeart.png';
      } else if (this.missed === 4) {
        hearts[3].src = 'images/lostHeart.png';
      } else if (this.missed === 5) {
        hearts[4].src = 'images/lostHeart.png';
        this.gameOver(false);
      }
    }
  }

  // Game Over Function
  /************************************/
  /**
  * Displays game over message
  */

  //This method displays the original start screen overlay,
  //and depending on the outcome of the game - updates the overlay `h1` element
  //with a friendly win or loss message
  //and replaces the overlay's `start` CSS class with either the `win` or `lose` CSS class

  gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    const header = document.getElementById('game-over-message');
    overlay.style.display = '';
    if (gameWon === true) {
      overlay.className = 'win';
      header.textContent = 'You won the game';
    } else {
      overlay.className = 'lose';
      header.textContent = 'You lost the game';
    }

    this.resetGame();
  }

  // Reset Game Function
  // Resetting the gameboard between games.
  // After a game is completed, the gameboard needs to be reset so that
  // clicking the "Start Game" button will successfully load a new game.

  resetGame() {
    //Clears the previous phrase
    document.querySelector('#phrase ul').innerHTML = '';

    //Resets the keyboard buttons
    const keyboard = document.querySelectorAll('button');
    keyboard.forEach(button => {
      button.disabled = false;
      button.className = 'key';
    });

    //Resets heart lives
    this.missed = 0;
    const hearts = document.querySelectorAll('img');
    hearts.forEach(image => image.src = 'images/liveHeart.png');
  }
}
