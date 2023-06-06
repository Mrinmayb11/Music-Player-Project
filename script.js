 
// Get All The Elements
const AllPlayBtn = document.getElementsByClassName("fa-circle-play");
const TopMasterPlay = document.getElementById("fa-circle-play");
const MasterPlay = document.getElementById("MasterPlay");
const NextSong = document.getElementById("NextPlay");
const PrevPlay = document.getElementById("PrevPlay");
const MaincoverImg = document.getElementById("Main-cover");
const MainSongName = document.getElementById("Main-SongName");
const SongItems = Array.from(document.getElementsByClassName("song-item"));
const TimeBar = document.getElementById("time-bar");
const Volume = document.getElementById("Volume-range");
const AllPlayBtnArr = Array.from(AllPlayBtn);
const EachPlay = Array.from(document.getElementsByClassName("fa-play"));
const SongDuration = document.getElementById("Song-Duration");
const SongCurrentTime = document.getElementById("Song-CurrentTime");
const MobileCurrentTime = document.getElementById("p4");

const AudioElement = new Audio();

AllPlayBtnArr.forEach((Btn) => {
  Btn.addEventListener("click", (btn) => {
    TopMasterPlay.classList.toggle("fa-circle-pause");
    MasterPlay.classList.toggle("fa-circle-pause");
    if (AudioElement.paused || AudioElement.currentTime <= 0 || MasterPlay.classList.contains("fa-circle-pause")) {
      AudioElement.play();
    } else {
      AudioElement.pause();
    }
  });
});

// set up all the song items
SongItems.forEach((element, i) => {
  element.getElementsByClassName("SongName")[0].innerHTML = SongsData[i].SongName;
  element.getElementsByTagName("img")[0].src = SongsData[i].Cover;
});

AudioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((AudioElement.currentTime / AudioElement.duration) * 100);
  TimeBar.value = progress;
  let songDuration = formatTime(AudioElement.duration);
  let currentTime = formatTime(AudioElement.currentTime);
  SongDuration.innerHTML = songDuration;
  SongCurrentTime.innerHTML = currentTime;
  MobileCurrentTime.innerHTML = currentTime;

});

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

AudioElement.addEventListener("ended", () => {
  MasterPlay.classList.remove("fa-circle-pause");
  TopMasterPlay.classList.remove("fa-circle-pause");
});


TimeBar.addEventListener("change", () => {
  AudioElement.currentTime = (TimeBar.value * AudioElement.duration) / 100;
});

let SongIndex = 0;

const RemoveAllPlay = () => {
  EachPlay.forEach((element) => {
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
    element.parentElement.parentElement.style.background = ""
  });
};

const PlaySong = (index) => {
  RemoveAllPlay();
  EachPlay[index].classList.remove("fa-play");
  EachPlay[index].classList.add("fa-pause");
  EachPlay[index].parentElement.parentElement.style.background = "rgb(59, 59, 59)"
  const img = EachPlay[index].nextElementSibling.src;
  MaincoverImg.src = img;
  SongIndex = index;
  MasterPlay.classList.add("fa-circle-pause");
  TopMasterPlay.classList.add("fa-circle-pause");
  MainSongName.innerHTML = `${SongsData[index].SongName}`;
  AudioElement.src = `${SongsData[index].Path}`;
  AudioElement.play();
};

EachPlay.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    PlaySong(i);
  });
});

NextSong.addEventListener("click", () => {
  let nextIndex = (SongIndex + 1) % SongsData.length;
  PlaySong(nextIndex);
});

PrevPlay.addEventListener("click", () => {
  let prevIndex = SongIndex - 1 < 0 ? SongsData.length - 1 : SongIndex - 1;
  PlaySong(prevIndex);
});

Volume.addEventListener("input", () => {
   AudioElement.volume = Volume.value / 100;
 });

