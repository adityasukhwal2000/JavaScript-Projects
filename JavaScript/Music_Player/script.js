//? Taking References of elements

const play = document.getElementById("play");
const songAudio = document.querySelector("audio");
const songImg = document.querySelector(".song-img");
const songTitle = document.querySelector(".music-name");
const songArtist = document.querySelector(".artist-name");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const currentDuration = document.querySelector(".current-timing");
const totalTime = document.querySelector(".total-timing");
const progressBar = document.querySelector(".progress-bar");
const progressBarDiv = document.querySelector(".progress-bar--div");

//? making variables

const songsList = [
  {
    name: "song1",
    title: "love me like you do",
    artist: "ellie goulding",
  },
  {
    name: "song2",
    title: "kiss me",
    artist: "keti peri",
  },
  {
    name: "song3",
    title: "who says",
    artist: "selena gomez",
  },
];

let isPlaying = false;
let songIndex = 0;

//? functions
const playMusic = () => {
  isPlaying = true;
  songAudio.play();
  play.classList.replace("fa-play", "fa-pause");
  play.title = "Pause";
  songImg.classList.add("anime");
};

const pauseMusic = () => {
  isPlaying = false;
  songAudio.pause();
  play.classList.replace("fa-pause", "fa-play");
  play.title = "Play";
  songImg.classList.remove("anime");
};

const loadSongs = (song) => {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songImg.src = `./images/${song.name}.png`;
  songImg.alt = `./images/${song.name}`;
  songAudio.src = `./songs/${song.name}.mp3`;
};
loadSongs(songsList[0]);

const nextSong = () => {
  songIndex = (songIndex + 1) % songsList.length;
  loadSongs(songsList[songIndex]);
  //! it will play next music automatically. Otherwise if we click then it can't play
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songsList.length) % songsList.length;
  loadSongs(songsList[songIndex]);
  playMusic();
};

const songProgress = (e) => {
    const { currentTime, duration } = e.srcElement;

    let progress_percent = (currentTime / duration) * 100;
    progressBar.style.width = `${progress_percent}%`; 
  
    //* total time
    let total_min = Math.floor(duration / 60);
    let total_sec = Math.floor(duration % 60);
    
    if (duration) {
      totalTime.textContent = `${total_min}:${total_sec}`;
    }
  
    //* current time
    let curr_min = Math.floor(currentTime / 60);
    let curr_sec = Math.floor(currentTime % 60);
  
    if (curr_sec < 10) {
      curr_sec = `0${curr_sec}`;
    }
    currentDuration.textContent = `${curr_min}:${curr_sec}`;
}

//? applying events

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});
songAudio.addEventListener("timeupdate", songProgress);
progressBar.addEventListener("click", () => {
})

progressBarDiv.addEventListener("click", (e) => {
    console.log(e);
    const {duration} = songAudio;
    // console.log(duration);

    let moveProgress = (e.offsetX / e.srcElement.clientWidth) * duration;
    // console.log(moveProgress);

    songAudio.currentTime = moveProgress 
    
    
    
})
songAudio.addEventListener("ended", nextSong)
nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", prevSong);
