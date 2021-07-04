"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//SELECTORS
var yourScore = 0;
var computerScore = 0;
var onClick = document.querySelector('#fading-btn');
var introPage = document.querySelector('.intro');
var gamePage = document.querySelector('.game-page');
var hands = document.querySelectorAll('.hands img');
var yourHand = document.querySelector('.your-hand');
var computerHand = document.querySelector('.computer-hand');
var options = document.querySelectorAll('.options button');
var decider = document.querySelector('.winner');
var yourScoreReal = document.querySelector('.your-score p');
var CompterScoreReal = document.querySelector('.computer-score p');
var youWin = document.querySelector('.win');
var youLost = document.querySelector('.lost');
var cup = document.querySelector('.cup');
var playAgin = document.querySelector('.playagain'); //event listeners

onClick.addEventListener('click', function () {
  introPage.classList.add('fadeOut');
  gamePage.classList.add('fadeIn');
});
hands.forEach(function (hand) {
  hand.addEventListener("animationend", function () {
    this.style.animation = "";
  });
}); //computer options

var computerOptions = ['rock', 'paper', 'scissors']; //hand animation

options.forEach(function (option) {
  option.addEventListener('click', function () {
    var _this = this;

    var computerNumber = Math.floor(Math.random() * 3);
    var computerChoice = computerOptions[computerNumber]; //animaton thing

    setTimeout(function () {
      compareHands(_this.textContent, computerChoice); //update emotes

      yourHand.src = "./assets/".concat(_this.textContent, ".png");
      computerHand.src = "./assets/".concat(computerChoice, ".png");
    }, 2000);
    yourHand.style.animation = "shakePlayer 2s ease";
    computerHand.style.animation = "shakeComputer 2s ease";
  });
}); //play again

playAgin.addEventListener('click', again); //funcitons or arrows
//comparision

var rockProbability = 0;
var paperProbability = 0;

function compareHands(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    decider.innerHTML = "<h3>Its a tie &#128528</h3>";
  } else if (playerChoice === 'rock') {
    if (rockProbability > 100) {
      decider.innerHTML = "<h4>Dont Play Smart! &#128579</h4>";
      gameover(0, 1);
      return;
    }

    decider.innerHTML = "<h3>You Win &#128526</h3>";
    yourScore++;
    rockProbability++;
    updateScore(yourScore, computerScore);
  } else if (playerChoice === 'paper') {
    if (paperProbability > 100) {
      decider.innerHTML = "<h4>Dont Play Smart! &#128579</h4>";
      gameover(0, 1);
      return;
    }

    decider.innerHTML = "<h3>Computer Wins &#128529</h3>";
    computerScore++;
    paperProbability++;
    updateScore(yourScore, computerScore);
  } else if (playerChoice === 'scissors') {
    if (computerChoice === 'paper') {
      decider.innerHTML = "<h3>You Win &#128526</h3>";
      yourScore++;
      updateScore(yourScore, computerScore);
    } else if (computerChoice === 'rock') {
      decider.innerHTML = "<h3>Computer Wins &#128529</h3>";
      computerScore++;
      updateScore(yourScore, computerScore);
    }
  }
}

function updateScore(yourScore, computerScore) {
  console.log(yourScoreReal);
  console.log(CompterScoreReal);
  yourScoreReal.textContent = "".concat(yourScore, "/10");
  CompterScoreReal.textContent = "".concat(computerScore, "/10");
  winnerAnnounce(yourScore, computerScore);
}

function winnerAnnounce(yourScore, computerScore) {
  if (yourScore === 10) {
    console.log('you win');
    gameover(1, 0);
  } else if (computerScore === 10) {
    console.log('computer wins');
    gameover(0, 1);
  }
}

function gameover(n1, n2) {
  if (n1 === 1) {
    gamePage.classList.remove('fadeIn');
    cup.classList.add('fadeIngameover');
    animation();
    playAgin.classList.add('fadeIngameover');
    youWin.classList.add('fadeIngameover');
  } else if (n2 === 1) {
    gamePage.classList.remove('fadeIn');
    playAgin.classList.add('fadeIngameover');
    youLost.classList.add('fadeIngameover');
  }
} //play again funciton 


function again() {
  document.location.reload();
} //animations


function animation() {
  var Progress =
  /*#__PURE__*/
  function () {
    function Progress() {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Progress);

      this.timestamp = null;
      this.duration = param.duration || Progress.CONST.DURATION;
      this.progress = 0;
      this.delta = 0;
      this.progress = 0;
      this.isLoop = !!param.isLoop;
      this.reset();
    }

    _createClass(Progress, [{
      key: "reset",
      value: function reset() {
        this.timestamp = null;
      }
    }, {
      key: "start",
      value: function start(now) {
        this.timestamp = now;
      }
    }, {
      key: "tick",
      value: function tick(now) {
        if (this.timestamp) {
          this.delta = now - this.timestamp;
          this.progress = Math.min(this.delta / this.duration, 1);

          if (this.progress >= 1 && this.isLoop) {
            this.start(now);
          }

          return this.progress;
        } else {
          return 0;
        }
      }
    }], [{
      key: "CONST",
      get: function get() {
        return {
          DURATION: 1000
        };
      }
    }]);

    return Progress;
  }();

  var Confetti =
  /*#__PURE__*/
  function () {
    function Confetti(param) {
      _classCallCheck(this, Confetti);

      this.parent = param.elm || document.body;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.width = param.width || this.parent.offsetWidth;
      this.height = param.height || this.parent.offsetHeight;
      this.length = param.length || Confetti.CONST.PAPER_LENGTH;
      this.yRange = param.yRange || this.height * 2;
      this.progress = new Progress({
        duration: param.duration,
        isLoop: true
      });
      this.rotationRange = typeof param.rotationLength === "number" ? param.rotationRange : 10;
      this.speedRange = typeof param.speedRange === "number" ? param.speedRange : 10;
      this.sprites = [];
      this.canvas.style.cssText = ["display: block", "position: absolute", "top: 0", "left: 0", "pointer-events: none"].join(";");
      this.render = this.render.bind(this);
      this.build();
      this.parent.appendChild(this.canvas);
      this.progress.start(performance.now());
      requestAnimationFrame(this.render);
    }

    _createClass(Confetti, [{
      key: "build",
      value: function build() {
        for (var i = 0; i < this.length; ++i) {
          var canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d");
          canvas.width = Confetti.CONST.SPRITE_WIDTH;
          canvas.height = Confetti.CONST.SPRITE_HEIGHT;
          canvas.position = {
            initX: Math.random() * this.width,
            initY: -canvas.height - Math.random() * this.yRange
          };
          canvas.rotation = this.rotationRange / 2 - Math.random() * this.rotationRange;
          canvas.speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2);
          ctx.save();
          ctx.fillStyle = Confetti.CONST.COLORS[Math.random() * Confetti.CONST.COLORS.length | 0];
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
          this.sprites.push(canvas);
        }
      }
    }, {
      key: "render",
      value: function render(now) {
        var progress = this.progress.tick(now);
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        for (var i = 0; i < this.length; ++i) {
          this.ctx.save();
          this.ctx.translate(this.sprites[i].position.initX + this.sprites[i].rotation * Confetti.CONST.ROTATION_RATE * progress, this.sprites[i].position.initY + progress * (this.height + this.yRange));
          this.ctx.rotate(this.sprites[i].rotation);
          this.ctx.drawImage(this.sprites[i], -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)) / 2, -Confetti.CONST.SPRITE_HEIGHT / 2, Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)), Confetti.CONST.SPRITE_HEIGHT);
          this.ctx.restore();
        }

        requestAnimationFrame(this.render);
      }
    }], [{
      key: "CONST",
      get: function get() {
        return {
          SPRITE_WIDTH: 9,
          SPRITE_HEIGHT: 16,
          PAPER_LENGTH: 100,
          DURATION: 8000,
          ROTATION_RATE: 50,
          COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"]
        };
      }
    }]);

    return Confetti;
  }();

  (function () {
    var DURATION = 8000,
        LENGTH = 120;
    new Confetti({
      width: window.innerWidth,
      height: window.innerHeight,
      length: LENGTH,
      duration: DURATION
    });
    setTimeout(function () {
      new Confetti({
        width: window.innerWidth,
        height: window.innerHeight,
        length: LENGTH,
        duration: DURATION
      });
    }, DURATION / 2);
  })();
}