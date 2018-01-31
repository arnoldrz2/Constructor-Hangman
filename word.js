var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
  this.word = wrd;
  //collection of letter objects
  this.letters = [];
  this.wordFound = false;

  this.getLetters = function () {
      //populate the collection above with new Letter objects
      for (var i = 0; i < that.word.length; i++) {
          var newLetter = new Letter(that.word[i]);
          this.letter.push(newLetter);
      }
  };

  this.wordCheck = function () {
    if (this.letters.every(function (lttr) {
        return lttr.appear === true;
    })) {
        this.wordFound = true;
        return true;
    }
  };

  this.letterCheck = function (guessedLetter) {
    var whatToReturn = 0;
    this.letters.forEach(function(lttr) {
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });
    return display;
  };
}

module.exports = Word;
