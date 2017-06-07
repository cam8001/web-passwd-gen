/**
* Generate a random integer between two numbers.
* @param {int} The lowest value to return (default 0).
* @param {int} The highest value to return (default Number.MAX_SAFE_INTEGER).
*/
Math.randomRange = function(min, max) {
  if (min === undefined) {
    start = 0;
  }
  if (max === undefined) {
    max = Number.MAX_SAFE_INTEGER;
  }
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Generate secure passwords.
* @param {function} Function to call after password is generated.
*/
function PasswordGenerator(callback) {

    /**
    * Set this.password.
    * @param {string} Password to save.
    */
    this.setPassword = function(password) {
      this.password = password;
    }

  // If no callback is defined, just set the password on the object.
  if (typeof callback === 'undefined') {
    //this.callback = function(value) {console.log('Default callback: ' + value)}
    callback = this.setPassword;
  }
  this.callback = callback;


  // Define an empty array in the global scope so we can assign it later.
  if (typeof window.word_list === 'undefined') {
    window.word_list = [];
  }

  /**
  * Return a random word from the word_list.
  * @param {array} List of words.
  */
  this.randomWord = function(word_list) {
    return word_list[Math.randomRange(0, word_list.length)];
  }

  /**
  * Generate a password.
  */
  this.generatePassword = function(word_list) {
    return this.randomWord(word_list) + Math.randomRange(1,99) + '-' + this.randomWord(word_list) + Math.randomRange(1,99);
  }

  /**
  * Return this.password.
  */
  this.getPassword = function() {
    return this.password;
  }

  // Generate a list of all the available words files.
  // Our build script should have generated 20 files with the naming format
  // words-ab, words-ac, etc.
  let n = 'a'.charCodeAt();
  const words_files = Array.from(new Array(20), (x, i) => 'words-a' + String.fromCharCode(n++) + '.json');
  const word_file_index = Math.randomRange(0,19);
  const file_to_include = words_files[word_file_index];

  // Load a words file by including it as a script.
  // When the words file is loaded, window.words_list will be assigned.
  // Then, we can generate a password and pass it to our callback.
  if (window.word_list.length === 0) {
    let script = document.createElement('script');
    script.src = '/words/' + file_to_include;
    script.type = 'text/javascript';
    var self = this;
    script.onload = function() {
      self.callback(self.generatePassword(word_list));
    }
    document.head.appendChild(script);
  }
  // If the words file is already loaded, just generate another password.
  else {
    this.callback(this.generatePassword(word_list))
  }
}
