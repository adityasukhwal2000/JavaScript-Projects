//? Taking references of elements

const easyBtn = document.querySelector(".easy");
const hardBtn = document.querySelector(".hard");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const inputGuessNum = document.querySelector(".input_guess");
const newGameBtn = document.querySelector(".new-game");
const previousGuess = document.querySelector(".num_guess");
const yourGuess = document.querySelector(".user_guess");
const previousAttempts = document.querySelector(".num_attempt");

//? Audio for game
const audioGame = new Audio("./assets/audios/game.wav");
const winGameAudio = new Audio("./assets/audios/win.wav");
const looseGameAudio = new Audio("./assets/audios/loose.wav");

//? Initializing variable
let computerGuess;
let userGuesses = [];
let maxGuess;

//? making functions

//* Random Generate
const randomNum = () => {
  computerGuess = Math.floor(Math.random() * 100) + 1;
  newGameBtn.classList.add("hidden");
};

//* Displaying game page on click buttons
const displayGamePage = () => {
  section2.classList.remove("hidden");
  section1.classList.add("hidden");
};

//* Buttons
const easyPlay = () => {
  audioGame.play();
  maxGuess = 10;
  displayGamePage();
};

const hardPlay = () => {
  audioGame.play();
  maxGuess = 5;
  displayGamePage();
};

//* New game start button
const startNewGame = () => {
  audioGame.play();
  newGameBtn.classList.remove("hidden");
  inputGuessNum.setAttribute("disabled", true);
};

//* new Game button
const newGameButton = () => {
  location.reload();
  audioGame.play();
};

//* gif add
const newGameWinGif = () => {
    section2.classList.add("gif");
}

//* Writing Logic for Input guess Number

const compareGuess = () => {
  audioGame.play(); //? game audio
  let userGuessNum = Number(inputGuessNum.value); //!

  userGuesses = [...userGuesses, userGuessNum];
  previousGuess.innerText = userGuesses;

  if (userGuesses.length < maxGuess) {
    if (userGuessNum > computerGuess) {
      yourGuess.innerText = "Your Guess is High 😯";
    } else if (userGuessNum < computerGuess) {
      yourGuess.innerText = "Your Guess is Low 🙄";
    } else {
      yourGuess.innerText = "It's Correct 😄";
      newGameWinGif();
      winGameAudio.play();
      startNewGame();
    }
  } else {
    if (userGuessNum > computerGuess) {
      yourGuess.innerText = `You Loose 😭!! The correct number is ${computerGuess}`;
      looseGameAudio.play();
      startNewGame();
    } else if (userGuessNum < computerGuess) {
      yourGuess.innerText = `You Loose 😭!! The correct number is ${computerGuess}`;
      looseGameAudio.play();
      startNewGame();
    } else {
      yourGuess.innerText = "It's Correct 😄";
      newGameWinGif();
      startNewGame();
    }
  }

  previousAttempts.innerText = userGuesses.length;
  inputGuessNum.value = "";
};

//? applying event | event listener

easyBtn.addEventListener("click", easyPlay);
hardBtn.addEventListener("click", hardPlay);
inputGuessNum.addEventListener("change", compareGuess);
newGameBtn.addEventListener("click", newGameButton);
