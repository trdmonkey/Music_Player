'use strict';



/*
  * all music information
*/

const musicData = [
  {
    backgroundImage: "./assets/images/poster-10.jpg",
    posterUrl: "./assets/images/poster-10.jpg",
    title: "After Midnight",
    album: "Alpha Zulu",
    year: 2022,
    artist: "Phoenix",
    musicPath: "./assets/music/music-10.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-7.jpg",
    posterUrl: "./assets/images/poster-7.jpg",
    title: "When Am I Gonna Lose You",
    album: "Violet Street",
    year: 2019,
    artist: "Local Natives",
    musicPath: "./assets/music/music-7.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-8.jpg",
    posterUrl: "./assets/images/poster-8.jpg",
    title: "All About You",
    album: "History",
    year: 2022,
    artist: "The Knocks ft. Foster The People",
    musicPath: "./assets/music/music-8.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-6.jpg",
    posterUrl: "./assets/images/poster-6.jpg",
    title: "Memories",
    album: "Remixed",
    year: 2018,
    artist: "The Midnight",
    musicPath: "./assets/music/music-6.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-9.jpg",
    posterUrl: "./assets/images/poster-9.jpg",
    title: "Leave Me Alone",
    album: "Razzmatazz",
    year: 2020,
    artist: "I Dont Know How but They Found Me",
    musicPath: "./assets/music/music-9.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-11.jpg",
    posterUrl: "./assets/images/poster-11.jpg",
    title: "Freeze",
    album: "Thrill Of The Chase",
    year: 2022,
    artist: "Kygo",
    musicPath: "./assets/music/music-11.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-12.jpeg",
    posterUrl: "./assets/images/poster-12.jpeg",
    title: "The Ghost Of Beverly Drive",
    album: "Kintsugi",
    year: 2015,
    artist: "Death Cab For Cutie",
    musicPath: "./assets/music/music-12.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-13.jpg",
    posterUrl: "./assets/images/poster-13.jpg",
    title: "Love Brand New",
    album: "The Silence In Between",
    year: 2022,
    artist: "Bob Moses",
    musicPath: "./assets/music/music-13.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-14.jpg",
    posterUrl: "./assets/images/poster-14.jpg",
    title: "Moth To A Flame",
    album: "Dawn FM",
    year: 2022,
    artist: "Swedish House Mafia And The Weeknd",
    musicPath: "./assets/music/music-14.mp3",
  },
];


/* 
  * add eventListener on all elements that are passed 
*/
const addEventOnElements = function (elements, eventType, callBack) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callBack);
  }
}


/*  
  * -- PLAYLIST
  * Add all music in playlist, from 'musicData'

*/

const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = musicData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${musicData[i].posterUrl}" width="800" height="800" 
        alt="${musicData[i].title} Album Poster" class="img-cover">

      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `;
}


/*  
  * -- PLAYLIST MODAL SIDEBAR TOGGLE
  * show 'playlist' modal when click on playlist button in top app bar and hide when click on overlay or any playlist-item
*/

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);



/*
  * PLAYLIST ITEM
  
  * remove active state from last time played music
  * and add active state in clicked music
 */

const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
});



/*
  * PLAYER
  * 
  * change all visual information on player, based on current music
*/

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(musicData[currentMusic].musicPath);

const changePlayerInfo = function () {
  playerBanner.src = musicData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
  playerTitle.textContent = musicData[currentMusic].title;
  playerAlbum.textContent = musicData[currentMusic].album;
  playerYear.textContent = musicData[currentMusic].year;
  playerArtist.textContent = musicData[currentMusic].artist;

  audioSource.src = musicData[currentMusic].musicPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
}

addEventOnElements(playlistItems, "click", changePlayerInfo);

/* 
* Update Player Duration 
*/
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/* 
* Pass seconds and get timecode formate 
*/
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);


/* 
  *  PLAY MUSIC
  play and pause music when click on play button
*/

const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);

/* 
* update running time while playing music 
*/

const playerRunningTime = document.querySelector("[data-running-time]");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
}

/* 
  * RANGE FILL WIDTH 
  Cambiar el ancho del 'rangeFill' siempre que cambie el valor del rango
*/

const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
  let element = this || ranges[0];

  const rangeValue = (element.value / element.max) * 100;
  element.nextElementSibling.style.width = `${rangeValue}%`;
}

addEventOnElements(ranges, "input", updateRangeFill);


/*  
  * SEEK MUSIC
  buscar musica mientras que el reproductor cambia de rango
*/

const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);

/*  
  * END MUSIC
*/

const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill();
  }
}


/*  
  * SKIP TO NEXT MUSIC ******************************************************************** 
*/

const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= musicData.length - 1 ? currentMusic = 0 : currentMusic++;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipNextBtn.addEventListener("click", skipNext);


/*  
  * SKIP TO PREVIOUS MUSIC ********************************************************************
*/

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic <= 0 ? currentMusic = musicData.length - 1 : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);

/*  
  * SHUFFLE MUSIC
*/

/* get random number for shuffle  */
const getRandomMusic = () => Math.floor(Math.random() * musicData.length);

const shuffleMusic = () => currentMusic = getRandomMusic();

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function () {
  playerShuffleBtn.classList.toggle("active");

  isShuffled = isShuffled ? false : true;
}

playerShuffleBtn.addEventListener("click", shuffle);

/*  
  * REPEAT MUSIC
*/

const playerRepeatBtn = document.querySelector("[data-repeat]");

const repeat = function () {
  if (!audioSource.loop) {
    audioSource.loop = true;
    this.classList.add("active");
  } else {
    audioSource.loop = false;
    this.classList.remove("active");
  }
}

playerRepeatBtn.addEventListener("click", repeat);

/*  
  * MUSIC VOLUME
  * incrementar o disminuir el volumen cuando cambie
  * el rango de la barra de volumen
*/

const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
}

playerVolumeRange.addEventListener("input", changeVolume);

/*  
  * MUTE MUSIC
*/

const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume();
  }
}

playerVolumeBtn.addEventListener("click", muteVolume);