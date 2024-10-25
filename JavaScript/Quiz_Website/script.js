const quizData = async () => {
  try {
    const res = await fetch("./questions.json");
    const data = await res.json();

    // storing data in local storage
    localStorage.setItem("quizData", JSON.stringify(data));

    displayQuestion(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
};

const getQuizData = () => {
  const quizStoreData = JSON.parse(localStorage.getItem("quizData"));

  return quizStoreData ? quizStoreData : null;
};

// Taking references of elements | manipulating DOM
const quizStart = document.querySelector(".btn");
const retry = document.querySelector(".retry");
const questions = document.querySelector(".question");
const nextBtn = document.querySelector(".next");
let answerOptions = document.querySelector(".options");
const startTimerDisplay = document.querySelector(".time-remaining");
const questionCount = document.querySelector(".question-count");
const submitBtn = document.querySelector(".submit");
const quizSection = document.querySelector(".section-quiz--start");
const page1 = document.querySelector(".section-page1");
const resultSection = document.querySelector(".section-result");
const marks = document.querySelector(".marks");
const greenBar = document.querySelector(".green-bar");
const redBar = document.querySelector(".red-bar");
const greenMarkPercentage = document.querySelector(".green-mark--percentage");
const redMarkPercentage = document.querySelector(".red-mark--percentage");
const previousScoresContainer = document.querySelector(".previous-scores");

let currQuest = 0;
let timerValue;
let score = 0;

const displayQuestion = (data) => {
  // console.log(data.length);

  //   const { question, options, answer, timer } = data[currQuest];
  //   console.log(question);
  let numOfQuestions = data.length;
  let initialTimer = data[currQuest].timer;

  //? Timer Function
  const startTimer = () => {
    // Clear any existing timer
    clearInterval(timerValue);
    // Start the timer with the current question's time
    timerValue = setInterval(() => {
      // Decrement the timer
      if (data[currQuest].timer > 0) {
        data[currQuest].timer--;

        const halfTime = initialTimer / 2;
        const remainingTime = data[currQuest].timer;

        // Check for full time
        if (initialTimer) {
          document.body.classList.add("full-bg");
        }

        // Check for half time
        if (remainingTime <= halfTime && remainingTime > 0) {
          startTimerDisplay.parentElement.classList.add("half-time--remaining");
          nextBtn.parentElement.classList.add("half-next");
          document.body.classList.add("half-bg");
        }

        // Check for less than half time
        if (remainingTime <= halfTime / 2 && remainingTime > 0) {
          startTimerDisplay.parentElement.classList.add("lessThan-half--time");
          nextBtn.parentElement.classList.add("half-half--next");
          document.body.classList.add("half-half--bg");
        }

        // Format the timer display

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`;

        startTimerDisplay.textContent = formattedTimer;
      } else {
        clearInterval(timerValue);
        startTimerDisplay.textContent = "00:00";

        //* After time 0 you can't select
        answerOptions.querySelectorAll("li").forEach((item) => {
          item.style.pointerEvents = "none"; // Disable further clicks
        });

        //*
        nextQuestion();

        // displaySubmitButton(); // Show the submit button if time runs out
      }
    }, 1000);
  };

  //? Function to escape HTML special characters
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  //? Load Question data function
  //   let optionSelected = false; // Flag to check if an option is already selected

  const loadQuestion = () => {
    questions.innerText = `${currQuest + 1}. ${data[currQuest].question}`;
    answerOptions.innerHTML = ""; //? clear previous option

    data[currQuest].options.forEach((option) => {
      let li = document.createElement("li");
      let span = document.createElement("span");
      span.textContent = option;
      li.appendChild(span);
      answerOptions.appendChild(li);

      li.addEventListener("click", () => {
        // if (optionSelected) return; // Prevent further clicks if already selected

        const firstChild = li.firstElementChild.innerText;
        // console.log(firstChild);

        if (firstChild === data[currQuest].answer) {
          score++;
          li.classList.add("correct-answer");
          li.innerHTML = `<span> ${escapeHtml(data[currQuest].answer)} </span> 
           <img src="./images/correct.svg" alt = "correct" > `;
        } else {
          li.classList.add("wrong-answer");
          li.innerHTML = `<span> ${escapeHtml(firstChild)} </span> 
           <span class = "wrong-choose" >You Choose <img src="./images/wrong.svg" alt = "wrong" > </span> `;

          // Find and highlight the correct answer
          const correctAnswerLi = Array.from(answerOptions.children).find(
            (item) => {
              return (
                item.firstElementChild.innerText === data[currQuest].answer
              );
            }
          );

          if (correctAnswerLi) {
            correctAnswerLi.classList.add("correct-answer");
            correctAnswerLi.innerHTML = `<span>${escapeHtml(
              data[currQuest].answer
            )}</span> <img src="./images/correct.svg" alt="correct">`;
          }
        }

        answerOptions.querySelectorAll("li").forEach((item) => {
          // console.log(item);

          item.style.pointerEvents = "none"; // Disable further clicks
        });

        // Show submit button after the last question is answered
        if (currQuest === numOfQuestions - 1) {
          displaySubmitButton();
        }
        // else {
        //   nextQuestion();
        // }

        // Automatically go to next question after answering
        //  nextQuestion();
      });
    });

    //? Number of question done / Total number of questions
    questionCount.textContent = `${currQuest + 1}/${data.length}`;

    //! Reset the timer when loading a new question (because If we not doing this then for next question our time will run very fast)
    initialTimer = data[currQuest].timer; // Reset the initial timer value
  };

  //? next question function when we click on 'next' button
  const nextQuestion = () => {
    localStorage.setItem("currentQuestionIndex", currQuest); // Save current question index

    currQuest++;
    if (currQuest < numOfQuestions) {
      // Clean up previous classes before loading the new question
      startTimerDisplay.parentElement.classList.remove(
        "half-time--remaining",
        "lessThan-half--time"
      );
      nextBtn.parentElement.classList.remove("half-next", "half-half--next");
      document.body.classList.remove("half-bg", "half-half--bg", "full-bg");
      //? Both will call when we click on 'next' button
      startTimer();
      loadQuestion();
    } else {
      // console.log("score: ", score);
      clearInterval(timerValue);
      nextBtn.style.pointerEvents = "none"; // Disable pointer events on the Next button
      nextBtn.disabled = true; //
      displaySubmitButton(); // Show the submit button at the end
    }
  };

  const displaySubmitButton = () => {
    submitBtn.style.display = "block"; // Show the submit button
  };

  const displayScore = () => {
    clearInterval(timerValue); // Stop the timer
    document.body.classList.remove("half-bg", "half-half--bg", "full-bg");
    quizSection.style.display = "none";
    resultSection.style.display = "block";
    marks.innerText = `${score}/${numOfQuestions}`;

    let greenPercentage = (score / numOfQuestions) * 100;
    let redPercentage = 100 - greenPercentage;

    greenBar.style.width = `${greenPercentage}%`;
    greenMarkPercentage.innerText = `${Number(greenPercentage.toFixed(2))}%`;
    redBar.style.width = `${redPercentage}%`;
    redMarkPercentage.innerText = `${Number(redPercentage.toFixed(2))}%`;

    // Saving the current score to local storage
    saveScoreToLocalStorage(score, numOfQuestions);
  };

  // Add event listener to submit button
  submitBtn.addEventListener("click", displayScore);

  //? onClick event on 'next' button
  nextBtn.addEventListener("click", nextQuestion);

  //? Timer function loading
  startTimer();
  //? Question Loading for first time when we click on start button
  loadQuestion();
};

//? Calling this so that our data value can print
// quizData();

const saveScoreToLocalStorage = (currentScore) => {
  // Retrieve existing scores from localStorage
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  // Add the current score
  scores.push(currentScore);

  // Keep only the last three scores
  if (scores.length > 3) {
    scores = scores.slice(-3);
  }

  // Save the updated scores back to localStorage
  localStorage.setItem("quizScores", JSON.stringify(scores));
};

const displayPreviousScores = () => {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const total = JSON.parse(localStorage.getItem("quizData")).length;

  const prevMsg = document.createElement("p");
  prevMsg.textContent = "Result of previous 3 attempts are:";

  previousScoresContainer.innerHTML = ""; // Clear previous scores

  if (scores.length > 0) {
    previousScoresContainer.appendChild(prevMsg);

    scores.forEach((score, index) => {
      const scoreElement = document.createElement("p");
      scoreElement.textContent = `Attempt ${
        index + 1
      }: Score= ${score}/${total}`;
      previousScoresContainer.appendChild(scoreElement);
    });
  } else {
    previousScoresContainer.innerHTML = "<p>No previous attempts yet.</p>";
  }
};

const startQuiz = () => {
  quizSection.style.display = "block";
  document.body.classList.remove("half-bg", "half-half--bg", "full-bg");

  page1.style.display = "none";

  const data = getQuizData();

  displayPreviousScores(); // Display previous scores with total
  const savedIndex = localStorage.getItem("currentQuestionIndex"); // Retrieving the saved index
  // Resetting score and current question index
  currQuest = savedIndex ? parseInt(savedIndex) : 0;
  score = 0; // Reset score
  submitBtn.style.display = "none"; // Ensure submit button is hidden when starting quiz

  if (data) {
    currQuest = savedIndex ? parseInt(savedIndex) : 0; // Set currQuest based on saved index
    displayQuestion(data);
  } else {
    quizData(); // Fetch data if not found in local storage
  }
};

// Call this function to start the quiz
displayPreviousScores();

quizStart.addEventListener("click", startQuiz);

// retry
retry.addEventListener("click", () => {
  page1.style.display = "block";
  resultSection.style.display = "none";
  localStorage.removeItem("currentQuestionIndex"); // Clear the saved index
});
