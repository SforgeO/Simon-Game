var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var gamePattern = [];

var userClickedPattern = [];

$(document).on("keypress", function () {
  if (level === 0) {
    nextSequence();
  }
} );

$("div[type=button]").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (checkAnswer(userClickedPattern.length - 1)) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 750);
      userClickedPattern = [];
    }
  } else {
    startOver();
  }
})

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // console.log(gamePattern);
  // console.log(userClickedPattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    return true;
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return false;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
