var Letter = require('./letter.js');

function Word(wrd) {
  this.word = wrd;
  this.letters = [];
  this.wordFound = false;

  this.getLetters = function () {
      for (var i = 0; i < this.word.length; i++) {
          var newLetter = new Letter(this.word[i]);
          this.letter.push(newLetter);
      }
  };

  this.checkWord = function () {
    if (this.letters.every(function (lttr) {
        return lttr.appear === true;
    })) {
        this.wordFound = true;
        return true;
    }
  };

  this.letterCheck = function (guessedLetter) {
    
  }

}
