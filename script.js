// Variables
const gameColors = ["red", "green", "yellow", "blue"];
let gameArray = [];
let playerArray = [];
let started = false;
let level = 0;
let record = 0;

// Start Game
gameStart = () => {
  if (!started) {
    started = true;
    nextSequence();
  }
};

// Next Sequence
nextSequence = () => {
  playerArray = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let gameChosenColor = gameColors[randomNumber];
  gameArray.push(gameChosenColor);
  $(`#${gameChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(gameChosenColor);
  level++;
  $("#level").text(`LEVEL ${level}`);
  console.log("game:", gameArray);
  console.log("player:", playerArray);
  if (record < level - 1) {
    record = level - 1;
  }
  $("#start").text("");
  $("h2").text(`HI: ${record}`);
};

// Color Click
function handler() {
  let playerChosenColor = this.id;
  playerArray.push(playerChosenColor);
  animatePress(playerChosenColor);
  console.log("game:", gameArray);
  console.log("player:", playerArray);
  checkAnswer();
}

// Check Answer
checkAnswer = () => {
  let i = playerArray.length - 1;
  if (playerArray[i] === gameArray[i]) {
    console.log("success");
    if (playerArray.length === gameArray.length) {
      setTimeout(nextSequence, 500);
    }
  } else {
    gameOver();
  }
};

// Game Over
gameOver = () => {
  console.log("wrong");
  playSound("wrong");
  $("#start").html("GAME OVER<br>PRESS HERE TO RESTART");
  $("body").addClass("gameover");
  setTimeout(() => {
    $("body").removeClass("gameover");
  }, 200);
  gameArray = [];
  playerArray = [];
  started = false;
  level = 0;
};

// Play sound
playSound = (color) => {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

// Animate Press
animatePress = (color) => {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
};

// Instructions

$("#dialog").dialog({
  autoOpen: false,
});
$(".fa").click(function () {
  $("#dialog").dialog("open");
});

$(".ui-button").text("X");

// Actions
$(".btn").on("click", handler);
$("#start").on("click", gameStart);
