//Require necessary npm packages
var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var List = require('./list.js');

require('events').EventEmiiter.prototype._maxListeners =100;

var hangman = {
  wordBank: List.newWord.wordList,
  guessesRemaining: 10,
  //Empty Array. This will hold letters that have been guessed already.
  guessedLetters: [],
  display: 0,
  currentWord: null,

  startGame: function() {
    if(this.guessedLetter.length > 0){
      this.guessedLetters = [];
    }
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else {
        console.log("Okay. No one should be forced to do things they don't want to do. See ya!");
      }
    })};

    newGame: function() {
      if(this.guessesRemaining === 10) {
        console.log("Get ready!");
        console.log("Goooooooooooooooo");

        var randNum = Math.floor(Math.random()*this.wordBank.length);
        this.currentWord = new Word(this.wordBank[randNum]);
        this.currentWord.getLetters(); //initiats get letters function
        console.log(this.currentWord.wordRender());
        this.userPrompts();
      } else {
        this.resetGuessesRemaining();
        this.newGame();
      }
    },
    resetGuessesRemaining: function() {
      this.guessesRemaining = 10;
    },
    userPrompts: function() {
      inquirer.prompt([{
        name: "chosenLtr",
        type: "input",
        message: "Choose a letter, dood:",
        validate: function(value) {
          if(isLetter(value)){
            return true;
          } else {
            return false;
          }
        }
      }]).then(function(ltr) {
        var letterReturned = (ltr.chosenLtr);
        var guessedAlready = false;
          for(var i = 0; i<this.guessedLetters[i]){
            if(letterReturned === this.guessedLetter[i]){
              guessedAlready =true;
            }
          }
          if(guessedAlready === false){
            this.guessedLetter.push(letterReturned);

            var found = that.currentWord.letterCheck(letterReturned);

            if(found === 0){
              console.log("Wrong!");
              this.guessesRemaining--;
              this.display++;
              console.log("Guesses remain: " + this.guessesRemaining);
              console.log(this.display); //check this later

              console.log("\n***************");
              console.log(this.currentWord.wordRender());
              console.log("\n***************");

              console.log("Letters guessed: " + this.guessedLetters);
            }else{
              console.log("Woohoo! You guessed correctly!");

                if(this.currentWord.wordCheck() === true){
                  console.log(this.currentWord.wordRender());
                  console.log("Congrats! You won!");
                } else {
                  console.log("Guesses remianing: " + this.guessesRemaining);
                  console.log(this.currentWord.wordRender());
                  console.log("\n***************");
                  console.log("Letters guessed: " + this.guessedLetters);
                }
            }
            if(this.guessesRemaining > 0 && this.currentWord.wordFound === false) {
              this.userPrompts();
            }else if(this.guessesRemaining === 0){
              console.log("Game over!");
              console.log("The word you were guessing was: " + this.currentWord.word);
            }
          } else {
              console.log("You've guessed that letter already. Try again.");
              this.userPrompts();
          }
      });
    }
}
hangman.startGame();
