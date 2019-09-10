/*jshint esversion: 6 */

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// *** Declare Phrase class *** - Step 2
// *** Create constructor method *** - Step 3

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // Display phrase on game board - Step 6

  addPhraseToDisplay() {

    //Split phrase into single characters & run forEach loop on each carachter
    this.phrase.split('').forEach(eachChar => {

      //Create li on each loop and add each character as textContent
      let li = document.createElement('li');
      li.textContent = `${eachChar}`;

      //Add 'space' class to spaces
      if (eachChar === ' ') {
        li.className = `space`;

        //Add 'hide letter' class to letters
      } else {
        li.className = `hide letter ${eachChar}`;
      }

      //append each li to phrase div
      document.querySelector('#phrase ul').appendChild(li);
    });
  }

  // Check Letter Function
  /*
  * Checks if passed letter is in phrase
  * @param (string) letter - letter to check
  */

  //checks to see if the letter selected by the player matches a letter in the phrase
  checkLetter(keyPress) {
    if (this.phrase.includes(keyPress)) {
      return true;
    } else {
      return false;
    }
  }

  // Show Matched Letter Function
  /*
  * Displays passed letter on screen after a match is found
  * @param (string) letter - letter to display
  */

  //Reveals the letter(s) on the board that matches the player's selection
  //To reveal the matching letter(s),
  //select all of the letter DOM elements that have a CSS class name that
  //matches the selected letter and replace each selected element's
  //`hide` CSS class with the `show` CSS class

  showMatchedLetter(keyPress) {
    let phraseLetter = document.querySelectorAll('.letter');
    for (let i = 0; i < phraseLetter.length; i++) {
      if (keyPress === phraseLetter[i].textContent) {
        phraseLetter[i].className = 'show';
      }
    }
  }
}
