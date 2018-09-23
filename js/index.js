'use strict';

var newGameBtn = document.getElementById('newGame');
var startGameBtn = document.getElementById('startGame');

var resultGame = document.getElementById('output'); // do wyświetlania wyniku gry
var compM = document.getElementById('output2'); // roboczo do wyświetlania wylosowanego ruchu kompa 
var winsInfo = document.getElementById('result'); // do wyświetlania statystyk gry
var amountWinsInfo = document.getElementById('amountWins'); // do wyświetlania liczby wygrnych rund kończących grę
var entireResultInfo = document.getElementById('entireResult'); // do wyświetlenia wyniku gry
var statisticsInfo = document.getElementById('statistics'); // do wstawiania statystyk z tablicy obiektów progress

var params = {
    playerName: '',         //imię gracza
    playerWins: 0,          // wygrane gracza
    computerWins: 0,        // wygrane kompa
    amountWinRounds: 0,     //ilość wygranych rund
    roundNumber: 0,         //aktualny numer rundy gry
    play: false,            // stan gry
    progress: [],           //info z przebiegu gry
}

// var playerWins = 0; 
// var computerWins = 0; 
// var amountWinRounds = 0; 
// var play = false; // stan gry

//tablica elementów z klasą player-move
var buttons = document.querySelectorAll('.player-move');

//do obslugi pętli z wywołaniem decyzji gracza
var playerBtnClick = function (event) {

    console.log(event.target);
    var playerChoice = event.target.getAttribute('data-move'); //odnosi się do klikniętego obiektu czyli naszego buttona
    playerMove(playerChoice);
    
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

// zamknięcie modala
var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

// obsługa zamknięcia modali
var closeModal = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);

//zablokowanie propagacji kliknięć w ciało modala
var modals = document.querySelectorAll('.modal');
for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

function endGame() {

    params.play = false;
    resetButtons();
    if (params.playerWins == params.amountWinRounds) {

        entireResultInfo.innerHTML = params.playerName + ' WON THE ENTIRE GAME!!!' + '<br><br>';
    } else
        entireResultInfo.innerHTML = 'COMPUTER WON THE ENTIRE GAME!!!' + '<br><br>';

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', infoStartNewGame);
    }

    console.log(params.progress);
    for (var i = 0; i < params.progress.length; i++) {
        statisticsInfo.innerHTML += '<tr><td>' + params.progress[i].round + '</td><td>' + params.progress[i].playerMove + '</td><td>' + params.progress[i].computerMove + '</td><td>' + params.progress[i].resultRound + '</td><td>' + params.progress[i].winsStatistics + '</td></tr>';
    }

    document.querySelector('#modal-overlay').classList.add('show');
    document.getElementById("startModal").classList.remove('show');
    document.getElementById("finishModal").classList.add('show');
    
};

// algorytm gry
function playerMove(move) {

    params.roundNumber++;
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
        var resultRound = 'DRAW!!!'; 
    } else if (playerMove == 1 && computerMove == 2) {
        params.playerWins++;
        resultRound = params.playerName + ' WON: ' + params.playerName + ' played PAPER, computer played ROCK';   
    } else if (playerMove == 2 && computerMove == 3) {
        params.playerWins++;
        resultRound = params.playerName + ' WON: ' + params.playerName + ' played ROCK, computer played SCISSORS';      
    } else if (playerMove == 3 && computerMove == 1) {
        params.playerWins++;
        resultRound = params.playerName + ' WON: ' + params.playerName + ' played SCISSORS, computer played PAPER';
    } else {
        params.computerWins++;
        resultRound = 'COMPUTER WON';
    }

    var winsStat = params.playerWins + ' - ' + params.computerWins;
    winsInfo.innerHTML = winsStat + '<br><br>';

    resultGameInfo(resultRound);
    
    var roundData = {
        round:  params.roundNumber,
        playerMove: playerMove,
        computerMove: computerMove,
        resultRound: resultRound,
        winsStatistics: winsStat,
    }

    params.progress.push(roundData);  //dodawanie elementu do tablicy
    // console.log(params.progress);

    if (params.playerWins == params.amountWinRounds || params.computerWins == params.amountWinRounds) {
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
    document.querySelector('#modal-overlay').classList.add('show');
    document.getElementById("finishModal").classList.remove('show');
    document.getElementById("startModal").classList.add('show');
    startGameBtn.addEventListener('click', startGame);
}

function startGame(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('.new-game').classList.remove('show');  
    params.play = true;
    params.playerWins = 0;
    params.computerWins = 0;
    params.roundNumber = 0;
    params.progress = [];
    params.playerName = document.getElementById('playerName').value;
    params.amountWinRounds = document.getElementById('amountWinToEnd').value;
    console.log(params);
    resetButtons();
    amountWinsInfo.innerHTML = params.amountWinRounds + '<br><br>';
    winsInfo.innerHTML = '';
    entireResultInfo.innerHTML = '';
    statisticsInfo.innerHTML = '';
    // wyłapanie decyzji gracza
    console.log("new game");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', playerBtnClick);
    }

}