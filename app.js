
//jQuery Variables
const $button = $(`.button`);
const $userStringBox = $(`.guess-container`);
const $counters = $(`.counter`);
const $playerOne = $(`.playerOne`);
const $playerTwo = $(`.playerTwo`)
const $hangman = $(`#hangman-pictures`);

//gameplay variables
const words = [`SPORTS`, `FOOTBALL`, `HAMSTER`, `DOGS`, `CATS`, `RAINBOW`, `OOPS`, `SOMETHING`, `SAINT`, `PENNY`, `ROSIE`, `ROVER`, `FRENCH`, `EXPERIMENT`, `DEMO`, `MUSIC`, `POOF`, `EXPLORE`, `ENCOUNTER`, `EGGS`, `EGGO`, `STRANGE`, `OUTER`];
let userWord = [];
let randomWord = ``;
let splitRandomWord;

//counters
let guessesRemaining = 5;
let lettersRemaining;

//players
let playerOneScore = 0;
let playerTwoScore = 0;
let player = 1;

//instructions modal variables
const $openBtn = $('#openModal');
const $modal = $('#modal');
const $closeBtn = $('#close');

//win round modal variables
const $openBtn2 = $('#openModal2');
const $modal2 = $('#modal2');
const $closeBtn2 = $('#close2');

//lose round modal variables
const $openBtn3 = $('#openModal3');
const $modal3 = $('#modal3');
const $closeBtn3 = $('#close3');

//win the game modal variables
const $openBtn4 = $('#openModal4');
const $modal4 = $('#modal4');
const $closeBtn4 = $('#close4');
const $modalText4 = $('#modal-textbox4');
const $modalWinHeader = $(`.win-modal-header`);


///////////////////
//===Functions===//
///////////////////

//change the color of the button to green
const changeGreen = (target) => {
    target.css(`background-color`, `#556B2F`);
    target.css(`box-shadow`, "0 0 4px 4px inset");
    target.css(`font-size`, "1.3rem");
}

//change the color of the button to red
const changeRed = (target) => {
    target.css(`background-color`, `#B22222`);
    target.css(`box-shadow`, "0 0 4px 4px inset");
    target.css(`font-size`, "1.3rem");
}

//resets the whole game
const resetGame = () => {
    $userStringBox.empty();
    $counters.empty();
    guessesRemaining = 5;
    userWord = [];
    randomWord = ``;
    player = 1;
    playerOneScore = 0;
    playerTwoScore = 0;
    resetButtons();
    runGame();
}


//sets a new ronud
const resetRound = () => {
    $userStringBox.empty();
    $counters.empty();
    guessesRemaining = 5;
    userWord = [];
    randomWord = ``;
    resetButtons();
    runGame();

};

//checks player score to see if anyone won
const checkScore = () => {
    if (playerOneScore >= 1000) {
        $modalWinHeader.empty();
        $modalWinHeader.append(`<h1>Congrats Player 1 you Won!</h1>`);
        closeModal2();
        openModal4();
        resetGame();
    } else if (playerTwoScore >= 1000) {
        $modalWinHeader.empty();
        $modalWinHeader.append(`<h1>Congrats Player 1 you Won!</h1>`);
        closeModal2();
        openModal4();
        resetGame();
    }

};

//flips the player 
const flipPlayer = () => {
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }
};

//updates the image on a wrong guess
const updateImage = () => {
    if (guessesRemaining === 4){
        $hangman.css(`background-image`, `url(img/second.png)`)
    } else if (guessesRemaining === 3) {
        $hangman.css(`background-image`, `url(img/third.png)`)
     } else if (guessesRemaining === 2) {
        $hangman.css(`background-image`, `url(img/fourth.png)`)
     } else if (guessesRemaining === 1) {
        $hangman.css(`background-image`, `url(img/fifth.png)`)
     } else if (guessesRemaining === 0) {
        $hangman.css(`background-image`, `url(img/sixth.png)`)
     }
     if (lettersRemaining === 0) {
         $hangman.css(`background-image`, `url(img/seven.png)`)
     }
};

//check the status of the game
const checkGameStatus = () => {
    if (lettersRemaining <= 0){
        openModal2();
        if (player === 1) {
            playerOneScore = playerOneScore + 100;
        } else {
            playerTwoScore = playerTwoScore + 100;
        }
        resetRound();
        flipPlayer();
        checkScore();

    } 

    if (guessesRemaining <= 0){
        openModal3();
        resetRound();
        flipPlayer();
        checkScore();
    }
};
