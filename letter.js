var Letter = function (ltr) {
  this.letter = ltr;
  this.appear = false;

  this.letterRender = function() {
    if (this.letter == ' ') { // if this is a blank space
        this.appear = true; //mark the space true
        return '  '; // and return a space to the word
    } if (this.appear === false) { // if the letter hasn't been guessed
        return ' _ '; // return letters placeholder
    } else { // if the letter has appeared (guessed)
        return this.letter; //show the letter
    }
  };
};

module.exports = Letter;
