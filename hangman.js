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
    var that = this;
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
      var that = this;
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
          for(var i = 0; i<that.guessedLetters[i]){
            if(letterReturned === that.guessedLetter[i]){
              guessedAlready = true;
            }
          }
          if(guessedAlready === false){
            that.guessedLetter.push(letterReturned);

            var found = that.currentWord.letterCheck(letterReturned);

            if(found === 0){
              console.log("Wrong!");
              that.guessesRemaining--;
              that.display++;
              console.log("Guesses remain: " + that.guessesRemaining);
              console.log(that.display); //check this later

              console.log("\n***************");
              console.log(that.currentWord.wordRender());
              console.log("\n***************");

              console.log("Letters guessed: " + that.guessedLetters);
            }else{
              console.log("Woohoo! You guessed correctly!");

                if(that.currentWord.wordCheck() === true){
                  console.log(that.currentWord.wordRender());
                  console.log("Congrats! You won!");
                } else {
                  console.log("Guesses remianing: " + that.guessesRemaining);
                  console.log(that.currentWord.wordRender());
                  console.log("\n***************");
                  console.log("Letters guessed: " + that.guessedLetters);
                }
            }
            if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
              that.userPrompts();
            }else if(that.guessesRemaining === 0){
              console.log("Game over!");
              console.log("The word you were guessing was: " + that.currentWord.word);
            }
          } else {
              console.log("You've guessed that letter already. Try again.");
              that.userPrompts();
          }
      });
    }
}
hangman.startGame();
