function PasswordStrength() {

  const display_selector = '#password_strength';
  let password_strength = {};

  this.estimateStrength = function() {
    let password = document.getElementById('output_target').textContent;
    password_strength = zxcvbn(password);
    // password_strength.crack_times_display.online_no_throttling_10_per_second;
    console.log(password_strength);
  }

  this.displayStrength = function() {
    var zxcvbn_demo_link = document.createElement('a');
    zxcvbn_demo_link.setAttribute('href', 'https://dl.dropboxusercontent.com/u/209/zxcvbn/test/index.html');
    zxcvbn_demo_link.innerHTML = 'Why?';

    var password_strength_output = document.querySelector(display_selector);
    var guesses_string = password_strength.guesses.toLocaleString();
    password_strength_output.textContent = 'Estimated guesses to crack: ' + guesses_string;
    password_strength_output.appendChild(zxcvbn_demo_link);
  }

  this.init = function() {
    if (typeof zxcvbn !== 'function') {
      let script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js';
      script.type = 'text/javascript';
      var self = this;
      script.onload = function() {
        self.estimateStrength();
        self.displayStrength();
      }
      document.head.appendChild(script);
    }
    else {
      this.estimateStrength();
      this.displayStrength();
    }
  };

  this.init();

}
