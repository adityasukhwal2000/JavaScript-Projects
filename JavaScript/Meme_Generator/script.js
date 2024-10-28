//? Taking Reference of elements
const memeTitle = document.querySelector(".title");
const memeImage = document.querySelector(".image-url");
const authorName = document.querySelector(".author");
const memeGeneratorBtn = document.querySelector(".btn");

// Fetching data
const memeData = async () => {
  const res = await fetch("https://meme-api.com/gimme/wholesomemes");
  const data = await res.json();

  const { title, url, author } = data;

  memeTitle.innerText = title;
  memeImage.src = url;
  memeImage.alt = "meme image";
  authorName.innerText = `Meme by: ${author}`;
};

//! This will print our meme when we first time load otherwise we will get meme after click on button
memeData();

memeGeneratorBtn.addEventListener("click", memeData);
