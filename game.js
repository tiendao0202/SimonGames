var userClickedPattern=[];
var gamePattern= [];
var buttonColors=["red","blue","green","yellow"];
var started = false;
var level = 0;
// Random Colors
function nextSequence() {
  userClickedPattern=[];
  level++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
  $("#level-title").text("Level "+ level);

};


//Playsound Function
function playsound(sound){
  var sound= new Audio("sounds/"+sound+".mp3");
  sound.play();
};

// Clicked Buttons
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


//animate buttonColors
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
//Keypress with any keys
$(document).keypress(function() {
   if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
     started = true;
   }
});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      new Audio("sounds/wrong.mp3").play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startover();
    }

}

function startover(){
  level=0;
  gamePattern=[];
  started=false;
}
