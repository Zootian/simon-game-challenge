var btnColors = ["red","blue","green","yellow"]

var gamePattern = [];
var userPattern = [];

var level = 0;

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").html("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = btnColors[randomNumber];
  gamePattern.push(randomColor);
  $(".btn #"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(color) {
  var sound = new Audio("sounds/"+color+".mp3");
  sound.play();
}

function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  }, 100);
}

$(".btn").click(function(){
  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length-1);
  console.log(userPattern);
});


  if(window.matchMedia("(max-width: 504px)").matches){
    $("html").one("click", function(){
      nextSequence();
      console.log("Mobile Started.")
    });
  } else {
    $("html").one("keydown", function(){
      nextSequence();
      console.log("Desktop Started.")
    });
  }

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === (userPattern[currentLevel])){
    if(gamePattern.length === userPattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    restartGame("keydown");
  }
}

function restartGame(action) {
  level = 0;
  gamePattern = [];
  $("html").one(action, function(){
    nextSequence();
    console.log("Started again.")
  });
}
