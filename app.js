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

//update the counters
const updateCounters = () => {
    $counters.empty();
    $counters.append(`<h3 class = "guesses-remaining">Guesses Remaining: ${guessesRemaining}</h3><h3 class = "letters-remaining">Letters Remaining: ${lettersRemaining}</h3>`);
};

//actions when guess is right
const guessIsCorrect = (target) => {
    userWord[x] = splitRandomWord[x];
    $userStringBox.empty();
    $userStringBox.append(userWord);
    target.off(`click`);
    changeGreen(target);
    updateCounters();
    updateImage();
    setTimeout(checkGameStatus, 6000);
};

//actions when guess is wrong
const guessIsIncorrect = (target) => {
    target.off(`click`);
    changeRed(target);
    updateCounters();
    updateImage();
    setTimeout(checkGameStatus, 6000);
};

//check the letter that is guessed
const checkLetter = (letter, target) => {
    const letterCheck = splitRandomWord.some((value, index) => {
        return value == letter;
    })
    for (x = 0; x < splitRandomWord.length; x++){
        if(letter == splitRandomWord[x]){
            lettersRemaining--;
            guessIsCorrect(target);
        } 
    }
    if (letterCheck === false) {
        guessesRemaining--;
        guessIsIncorrect(target);
    }
};

//get the random word
const getRandomWord = () => {
    randomWord = words[Math.floor(Math.random() * words.length)];
};

//set the user word to blank
const setUserWord = () => {
    splitRandomWord = randomWord.split(``);
    for (x = 0; x < splitRandomWord.length; x++) {
        userWord[x] = `_`;
    }
    $userStringBox.append(userWord);
};

//set the Counters
const setCounters = () => {
    lettersRemaining = splitRandomWord.length;
    $counters.append(`<h3 class = "guesses-remaining">Guesses Remaining: ${guessesRemaining}</h3><h3 class = "letters-remaining">Letters Remaining: ${lettersRemaining}</h3>`);
};

//sets player scores
const setPlayerScore = () => {
    $playerOne.empty();
    $playerTwo.empty();
    $playerOne.append(`<h2>Player 1 Score: ${playerOneScore}</h4>`);
    $playerTwo.append(`<h2>Player 2 Score: ${playerTwoScore}</h4>`);
};

//event listeners/handlers for lose round modal
const openModal4 = () => {
    $modal4.css('display', 'block');
  };
const closeModal4 = () => {
    $modal4.css('display', 'none');
  };
$closeBtn4.on('click', closeModal4);

//event listeners/handlers for lose round modal
const openModal3 = () => {
    $modal3.css('display', 'block');
  };
const closeModal3 = () => {
    $modal3.css('display', 'none');
  };
$closeBtn3.on('click', closeModal3);

//event listeners/handlers for win round modal
const openModal2 = () => {
    $modal2.css('display', 'block');
  };  
const closeModal2 = () => {
    $modal2.css('display', 'none');
  };
$closeBtn2.on('click', closeModal2);

//event listeners/handlers for instructions modal
const openModal = () => {
    $modal.css('display', 'block');
    $openBtn.css(`box-shadow`, `0 0 3px 3px inset`);
    $openBtn.css(`background-color`, `rgb(228, 228, 228)`);
    $openBtn.css(`font-size`, `1.9rem`);
  };
  
const closeModal = () => {
    $modal.css('display', 'none');
    $openBtn.css(`box-shadow`, `0 0 2px 2px`);
    $openBtn.css(`background-color`, `white`);
    $openBtn.css(`font-size`, `2rem`);
  };

$openBtn.on('click', openModal);
$closeBtn.on('click', closeModal);

//function to reset the buttons once the round is over
const resetButtons = () => {
    $button.off(`click`);
    $button.css(`background-color`, `white`);
    $button.css(`box-shadow`, "0 0 4px 4px");
    $button.css(`font-size`, "1.5rem");
    $button.on(`click`, (event) => {
        const $element = $(event.currentTarget);
        checkLetter($element.text().trim(), $element);
    });

}

//Set event listener on buttons and animate them
$button.on(`click`, (event) => {
    const $element = $(event.currentTarget);
    checkLetter($element.text().trim(), $element);
    
});


//Main function for running the game
runGame = () => {
    $hangman.css(`background-image`, `url(img/first.png)`)
    setPlayerScore();
    getRandomWord();
    setUserWord();
    setCounters();
}

runGame();
