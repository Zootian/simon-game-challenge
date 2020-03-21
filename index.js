var btnColors = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userPattern = [],
  level = 0;

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = btnColors[randomNumber];
  gamePattern.push(randomColor);
  //$("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + randomColor).css('opacity', '0').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
	$(this).css('opacity', '1');
});
  playSound(randomColor);
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

$(".btn").click(function() {
  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length - 1);
  console.log(userPattern);
});

// https://www.mydevice.io/#compare-devices
if (window.matchMedia("(max-width: 1080px)").matches) {
  $("h1").html("Tap anywhere to start.");
  $("html").one("click", function() {
    nextSequence();
    console.log("Mobile Started.");
  });
} else {
  $("html").one("keydown", function() {
    nextSequence();
    console.log("Desktop Started.");
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === (userPattern[currentLevel])) {
    if (gamePattern.length === userPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    if (window.matchMedia("(max-width: 1080px)").matches) {
      $("h1").html("Game Over, Tap anywhere to Restart");
      setTimeout(function() {
        restartGame("click");
        console.log("Mobile game Stopped.");
      }, 1000);

    } else {
      $("h1").html("Game Over, Press any Key to Restart");
      restartGame("keydown");
      console.log("Desktop Started.");
    }
}
}

function restartGame(action) {
  level = 0;
  gamePattern = [];
  $("html").one(action, function() {
    nextSequence();
    console.log("Started again.");
  });
}
