var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["blue","green","yellow","red"];
var level = 0;

function handler(clickedcolor){
    userClickedPattern.push(clickedcolor);
}

function AnimatePress(colorPressed){
    $("#" + colorPressed).addClass("pressed")
    setTimeout(function(){
        $("#" + colorPressed).removeClass("pressed");
    },100);
}

function makesound(key){

    var aud = new Audio("./sounds/" + key + ".mp3");
    aud.play();
}

function nextseq(){
    userClickedPattern = [];
    var randNm = Math.floor(Math.random()*4);
    var randomColorChosen = buttonColors[randNm];
    makesound(randomColorChosen);
    gamePattern.push(randomColorChosen);
    AnimatePress(randomColorChosen);

    level++;
    $("#level-title").text("Level " + level);

}  

function checkAnswer(){

    var ok=0;
   for(var i=0;i<userClickedPattern.length;++i){
       if(gamePattern[i]!=userClickedPattern[i]){
           ok=1;
           break;
       }
   }

   if(ok){
       gameOver();
   }else{
       if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextseq();
            },1000);
            
        }
   }   
}

function startAgain(){
    while(gamePattern.length > 0){
        gamePattern.pop();
    }

    while(userClickedPattern.length > 0){
        userClickedPattern.pop();
    }
    
    level = 0;

    $(document).on("keydown",function(){
        if(level==0)
            nextseq();
    });

}

function gameOver(){

    var aud = new Audio("./sounds/wrong.mp3");
    aud.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startAgain();
}

$(document).on("keydown",function(){
    if(level==0)
        nextseq();
});

$(".btn").on("click",function(){
    handler($(this).attr("id"));
    AnimatePress($(this).attr("id"));
    makesound($(this).attr("id"));
    checkAnswer();
});
 



