'use strict';

var newGameBtn = document.getElementById('newGame');
var paperBtn = document.getElementById('paper');
var rockBtn = document.getElementById('rock');
var scissorsBtn = document.getElementById('scissors');

var resultGame = document.getElementById('output'); // do wyświetlania wyniku gry
var compM = document.getElementById('output2'); // roboczo do wyświetlania wylosowanego ruchu kompa 
var winsInfo = document.getElementById('result'); // do wyświetlania statystyk gry
var amountWinsInfo = document.getElementById('amountWins'); // do wyświetlania liczby wygrnych rund kończących grę
var entireResultInfo = document.getElementById('entireResult'); // do wyświetlenia wyniku gry

var playerWins = 0; // wygrane gracza
var computerWins = 0; // wygrane kompa

var amountWinRounds = 0;
var play = false; // stan gry

// losowanie ruchu kompa
function randomMove() {
    var moveC = Math.ceil(Math.random()*(3-1)+1);
    return moveC;
};

// wyświetlanie komunikatów wynikowych gry
function resultGameInfo(text) {
    resultGame.innerHTML = text + '<br><br>';
};

// wyłączenie nasłuchiwania EventListener na przyciskach (musi być zdefiniowana funkcja)
function resetButtons() {
  
    paperBtn.removeEventListener('click', playerMovePaperClick);
    rockBtn.removeEventListener('click', playerMoveRockClick);
    scissorsBtn.removeEventListener('click', playerMoveScisorsClick);
  
};

function endGame() {
    
    play = false;
    resetButtons();
    if (playerWins == amountWinRounds) {
        entireResultInfo.innerHTML = 'YOU WON THE ENTIRE GAME!!!' + '<br><br>';
    } else
        entireResultInfo.innerHTML = 'COMPUTER WON THE ENTIRE GAME!!!' + '<br><br>';
    
    paperBtn.addEventListener('click',function() {
        winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
        resultGameInfo('');
        compM.innerHTML = '';
    });

    rockBtn.addEventListener('click', function() {
        winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
        resultGameInfo('');
        compM.innerHTML = '';
    });

    scissorsBtn.addEventListener('click', function() {
        winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
        resultGameInfo('');
        compM.innerHTML = '';
    });
  
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

// wyłapanie decyzji gracza
paperBtn.addEventListener('click',function() {
    winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
});

rockBtn.addEventListener('click', function() {
    winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
});

scissorsBtn.addEventListener('click', function() {
    winsInfo.innerHTML = 'Game over, please press the new game button!' + '<br><br>';
});



// newGameBtn.addEventListener('click', function() {
//     amountWinRounds = window.prompt('How many wins end game?');
//     play = true;
//     playerWins = 0;
//     computerWins = 0;
//     resetButtons();
//     amountWinsInfo.innerHTML = amountWinRounds + '<br><br>';
//     winsInfo.innerHTML = '';
//     entireResultInfo.innerHTML = '';  
//     // wyłapanie decyzji gracza
//     paperBtn.addEventListener('click', playerMovePaperClick);
//     rockBtn.addEventListener('click', playerMoveRockClick);
//     scissorsBtn.addEventListener('click', playerMoveScisorsClick);     
// });

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
    paperBtn.addEventListener('click', playerMovePaperClick);
    rockBtn.addEventListener('click', playerMoveRockClick);
    scissorsBtn.addEventListener('click', playerMoveScisorsClick);    
}

function playerMovePaperClick() {
    playerMove('paper');
    winsInfo.innerHTML = playerWins + ' - ' + computerWins + '<br><br>';
}

function playerMoveRockClick() {
    playerMove('rock');
    winsInfo.innerHTML = playerWins + ' - ' + computerWins + '<br><br>';
}

function playerMoveScisorsClick() {
    playerMove('scissors');
    winsInfo.innerHTML = playerWins + ' - ' + computerWins + '<br><br>';
}