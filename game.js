var gamePattern = [];
var userPattern = [];
var level = 0;
var correct = false;

const buttonColours = [
  "red",
  "blue",
  "green",
  "yellow"
];

function playAudio(a) {
  var audio = new Audio(a);
  audio.play();
}

function clickAnimation (colour, cl) {
  var audioPath = "sounds/" + colour + ".mp3";
  if (cl === "u"){
    var seconds = 100;
  }
  else if (cl === "g") {
    var seconds = 500;
  }
  $("#"+colour).fadeOut(200).fadeIn(200);
  playAudio(audioPath);
  $("#" + colour).addClass("pressed");

  setTimeout(function (){
    $("#" + colour).removeClass("pressed");
  },seconds);
}

function nextSequence () {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  clickAnimation(randomChosenColour, "g");
}

function checkAnswer (currentLevel) {

  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    playAudio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over! Press any key to restart!");
    startOver();
  }

}

function startOver () {
  level = 0;
  correct = false;
  gamePattern = [];
}

$(document).on("keydown", function () {
  if (!correct){
    $("h1").text("Level " + level);
    nextSequence();
    correct = true;
  }
});


$('.btn').on('click', function(evt) {
  var userClickedColour = $(this).attr("class").split(" ")[1];
  userPattern.push(userClickedColour);
  clickAnimation(userClickedColour, "u");
  console.log(userPattern);
  checkAnswer(userPattern.length-1);
});
