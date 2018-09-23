'use strict';

var newGameBtn = document.getElementById('newGame');

var resultGame = document.getElementById('output'); // do wyświetlania wyniku gry
var compM = document.getElementById('output2'); // roboczo do wyświetlania wylosowanego ruchu kompa 
var winsInfo = document.getElementById('result'); // do wyświetlania statystyk gry
var amountWinsInfo = document.getElementById('amountWins'); // do wyświetlania liczby wygrnych rund kończących grę
var entireResultInfo = document.getElementById('entireResult'); // do wyświetlenia wyniku gry

var playerWins = 0; // wygrane gracza
var computerWins = 0; // wygrane kompa

var amountWinRounds = 0;
var play = false; // stan gry

var buttons = document.querySelectorAll('.player-move'); //tablica elementów z klasą player-move

//do obslugi pętli z wywołaniem decyzji gracza
var playerBtnClick = function (event) {
    
    console.log(event.target);
    var playerChoice = event.target.getAttribute('data-move'); //odnosi się do klikniętego obiektu czyli naszego buttona
    playerMove(playerChoice);
    winsInfo.innerHTML = playerWins + ' - ' + computerWins + '<br><br>';

}


// losowanie ruchu kompa
function randomMove() {
    var moveC = Math.ceil(Math.random() * (3 - 1) + 1);
    return moveC;
};

// wyświetlanie komunikatów wynikowych gry
function resultGameInfo(text) {
    resultGame.innerHTML = text + '<br><br>';
};

//info - gdy gracz chce kliknąć w buttony poza grą
function infoStartNewGame() {
   
    winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
    resultGameInfo('');
    compM.innerHTML = '';

} 

// wyłączenie nasłuchiwania EventListener na przyciskach (musi być zdefiniowana funkcja)
function resetButtons() {

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', playerBtnClick);
        buttons[i].removeEventListener('click', infoStartNewGame);        
    }
};

function endGame() {

    play = false;
    resetButtons();
    if (playerWins == amountWinRounds) {
        entireResultInfo.innerHTML = 'YOU WON THE ENTIRE GAME!!!' + '<br><br>';
    } else
        entireResultInfo.innerHTML = 'COMPUTER WON THE ENTIRE GAME!!!' + '<br><br>';

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', infoStartNewGame);
    }

};

// algorytm gry
function playerMove(move) {

    var computerMove = randomMove();
    compM.innerHTML = 'Computer move ' + computerMove + '<br><br>';
    var playerMove;
    switch (move) {
        case 'paper':
            playerMove = 1;
            break;
        case 'rock':
            playerMove = 2;
            break;
        case 'scissors':
            playerMove = 3;
            break;
    }

    if (playerMove == computerMove) {
        resultGameInfo('DRAW!!!');
    } else if (playerMove == 1 && computerMove == 2) {
        playerWins++;
        resultGameInfo('YOU WON: you played PAPER, computer played ROCK');
    } else if (playerMove == 2 && computerMove == 3) {
        playerWins++;
        resultGameInfo('YOU WON: you played ROCK, computer played SCISSORS');
    } else if (playerMove == 3 && computerMove == 1) {
        playerWins++;
        resultGameInfo('YOU WON: you played SCISSORS, computer played PAPER');
    } else {
        computerWins++;
        resultGameInfo('COMPUTER WON');
    }

    if (playerWins == amountWinRounds || computerWins == amountWinRounds) {
        endGame();
    }
};

// wyłapanie decyzji gracza przed rozpoczęciem gry
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', infoStartNewGame);
}

//gracz rozpoczyna grę
newGameBtn.addEventListener('click', newGame);

function newGame() {
    
    amountWinRounds = window.prompt('How many wins end game?');
    play = true;
    playerWins = 0;
    computerWins = 0;
    resetButtons();
    amountWinsInfo.innerHTML = amountWinRounds + '<br><br>';
    winsInfo.innerHTML = '';
    entireResultInfo.innerHTML = '';
    // wyłapanie decyzji gracza
    console.log("new game");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', playerBtnClick);
    }

}