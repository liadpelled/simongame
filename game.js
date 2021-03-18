var gamePattern = []

var userClickedPattern = []

var buttonColours = ['red', 'blue', 'green', 'yellow'];

var started = false;
var level = 0;

$(document).on("keydown", function(){
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").on("click", function (event) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function startOver (){
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(button) {
    var audio = new Audio("sounds/" + button + ".mp3");
    audio.play();
}
