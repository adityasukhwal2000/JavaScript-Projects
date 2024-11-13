//? Taking References of elements

const msg = document.querySelector(".msg");
const startBtn = document.querySelector(".btn");
const textArea = document.getElementById("type-text");

//? making variables & data

const textLines = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is a crucial skill in the digital world.",
  "Practice makes perfect when it comes to typing.",
  "Efficiency and accuracy are the keys to fast typing.",
  "The sun sets in the west and rises in the east.",
  "Good typing habits can greatly improve your productivity.",
  "In the digital age, typing has become a universal skill.",
  "I love the sound of clicking keys while typing.",
  "It is important to use all fingers for efficient typing.",
  "The speed of typing is often measured in words per minute (WPM).",
];

let startTime, endTime;

//? functions

const startTyping = () => {
  const randomText = textLines[Math.floor(Math.random() * textLines.length)];
  msg.textContent = randomText;

  textArea.removeAttribute("disabled");
  startBtn.textContent = "Done";

  let date = new Date();
  startTime = date;
};

const endTyping = () => {
  textArea.setAttribute("disabled", true);
  startBtn.textContent = "Start";

  let date = new Date();
  endTime = date;

  let totalTime = (endTime - startTime) / 1000;

  let totalTypeWord = textArea.value;
  let wordCount = wordCounter(totalTypeWord);

  let speed = Math.round((wordCount / totalTime) * 60);

  let finalMsg = `Your typing speed is ${speed} words per minutes.`;
  finalMsg += compareWords(msg.textContent, totalTypeWord);

  msg.textContent = finalMsg;

  textArea.value = "";
};

const wordCounter = (str) => {
  const words = str.split(" ").length;
  return words;
};

const compareWords = (str1, str2) => {
  let text1 = str1.split(" ");
  let text2 = str2.split(" ");
  let count = 0;

  text1.forEach((word, index) => {
    if (word === text2[index]) {
      count++;
    }
  });

  const errorWords = text1.length - count;
  return ` ${count} correct words out of ${text1.length} words and the total number of errors are ${errorWords}.`;
};

const handleBtn = () => {
  if (startBtn.textContent.toLowerCase() === "Start".toLowerCase()) {
    startTyping();
  } else if (startBtn.textContent.toLowerCase() === "Done".toLowerCase()) {
    endTyping();
  }
};

const disableCopy = (e) => {
  if (e.target === msg) {
    e.preventDefault();
  }
};

const disableTextSelection = () => {
  msg.style.userSelect = "none"; // Disable text selection on .msg
};

//? applying event(s)
startBtn.addEventListener("click", handleBtn);
msg.addEventListener("copy", disableCopy);
disableTextSelection();
