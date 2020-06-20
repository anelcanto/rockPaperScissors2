
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', execute);
window.addEventListener('keydown', playsound);
window.addEventListener('keydown', game);


var key =0;
var score = 0;
var turnsLeft = 5;
var i = 5;
let end=false;
var playerMoveP = document.createElement('p');
var computerMoveP = document.createElement('p');

function execute(){
    createPlayersDiv();
}




function removeTransition(e){
    if(e.propertyName !== 'transform') return; // skip if it's not a transition
    this.classList.remove('playing');
}

// Sounds logic starts here
function playsound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio){return audio}
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
    key=e.keyCode;
    if(i<1){
        location.reload();
    }
}

// Rock Paper scissors game logic starts here
function computerPlay(){
    var x= Math.floor(Math.random() *3);
    if(x==0){return "rock"}
    else if (x==1){return "paper"} 
    else {return "scissors"}
}

function playRound(keyValue){
    let finalResult= "";
    const computerSelection = computerPlay();
    const playerSelection = (function(){

        if(keyValue===74){
            return "rock";
        } else if (keyValue ===75){
            return "paper";
        } else if(keyValue ===76){
            return "scissors";
        } 
    })();

    playerMoveP.innerText= 'Your move: ' +playerSelection;
    computerMoveP.innerText=  "Computer's move: "+ computerSelection;


    document.createElement
    if(playerSelection == "rock"){
        if(computerSelection == "scissors"){ 
            finalResult =  "You win! Rock breaks scissors";
            }
        else if(computerSelection== "paper"){
            finalResult =  "You loose! Paper covers rock!";
        } else if (computerSelection=="rock"){finalResult = "Draw";}
    } else if(playerSelection=="paper"){
        if(computerSelection == "rock"){
            finalResult =  "You win! Paper covers rock!";
        } else if (computerSelection == "scissors"){
            finalResult =  "You loose! Scissors cut paper!";
        } else if (computerSelection=="paper"){finalResult = "Draw";}
    } else{
        if(computerSelection=="paper"){
            finalResult =  "You win! Scissors cut paper";
        } else if (computerSelection=="rock"){
            finalResult =  "You loose! Rock breaks scissors!"
        } else if (computerSelection=="scissors"){
            finalResult =  "Draw";
        }
    }
    document.getElementById("demo").innerHTML = finalResult;
    return finalResult;
}

function game(){
    var result = "";
        result = playRound(key);
        if(result.includes('win')){
            i--;
            score++;  
            } else if(result == "Draw"){
                i--;
            } else{
                i--;
            }

    document.getElementById("score").innerHTML = 'Score: '+ score;
    document.getElementById("turns_left").innerHTML = "Turns left: " +  i;

    if(i<1){
        end = true;
        var winDiv = document.createElement("div");
        winDiv.style.fontSize= '3rem';
        document.getElementById("box").appendChild(winDiv);
        if (score>2){
            winDiv.style.color="blue";
            winDiv.innerHTML = ("****** You won! ******").bold();
            window.removeEventListener('keydown',game);
        } else{
            winDiv.style.color='red';
            winDiv.innerHTML = ("You Lost... you can try again ").bold();
            console.log("You Lost... you can try again  :(");
            window.removeEventListener('keydown',game);

        }
    }
    
}

function createPlayersDiv(){
    // Div to contain players' moves
    var newNodeP = document.createElement('div');
    var referenceNode = document.querySelector('.container3');

    playerMoveP.innerText = 'Your move: ';
    computerMoveP.innerText = "Computer's move: ";

    newNodeP.appendChild(playerMoveP);
    newNodeP.appendChild(computerMoveP);


    referenceNode.parentNode.insertBefore(newNodeP, referenceNode.nextSibling);

    newNodeP.style.top = '1';
    newNodeP.style.display = 'grid';
    newNodeP.style.gridTemplateColumns = '1fr 1fr';
    playerMoveP.style.color= "blue";
    computerMoveP.style.color = "red";
}



