// Create A Constant
const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music (Creating an array of objects)
const songs = [
    {
        name : 'The Spirituals 1',
        displayName: 'Wade in the Waters',
        artist: 'The Spirituals',
    },

    {
        name : 'Amen-Amen 1(-si-trn--ore-macaulay)',
        displayName: 'Amen-Amen',
        artist: 'ore-macaulay',
    },

    {
        name : 'Baba-yetu (Stellenbosch University Choir)',
        displayName: 'Baba-yetu',
        artist: 'Stellenbosch University Choir',
    },

    {
        name : 'FIRE FIRE- Greatman Takit, TY Bello, Folabi Nuel, 121 Selah 1',
        displayName: 'FIRE FIRE',
        artist: 'Greatman Takit, TY Bello, Folabi Nuel, 121 Selah 1',
    },

    {
        name : 'Holy-Holy (UWANA ETUK feat. SINMIDELE)',
        displayName: 'Holy-Holy',
        artist: 'UWANA ETUK feat. SINMIDELE',
    },

    {
        name : 'KuMamaPapa-1',
        displayName: 'KuMamaPapa',
        artist: 'Prinx-Emmanuel',
    },

    {
        name : 'Lord Youre Holy Ballin (Live From Paris, France)',
        displayName: 'Lord Youre Holy',
        artist: 'Kanye-west',
    },

    {
        name : 'stormzy-blin-trn-e-pt2-ft-mnek',
        displayName: 'Blinded By Your Grace',
        artist: 'stormzy-blin-trn-e-pt2-ft-mnek',
    },
];

// Create A boolean
// Check if Playing
let isPlaying = false;

// Create A Function
// (Play Function)
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// (Pause Function)
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM element
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Creating Previous Function
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
 }

// Creating Next Function
function nextSong() {
   songIndex++;
   if (songIndex > songs.length -1) {
       songIndex = 0;
   }
   loadSong(songs[songIndex]);
   playSong();
}

// On Load -Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
      const  { duration, currentTime } = e.srcElement;
    //   Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds =`0${durationSeconds}`;
    }
   
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
        durationTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
     // Calculate display for current
     const currentMinutes = Math.floor(currentTime / 60);
     let currentSeconds = Math.floor(currentTime % 60);
     if (currentSeconds < 10) {
         currentSeconds =`0${currentSeconds}`;
     }
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    };
}

// Set Progress Bar
function setProgressBar (e) {
const width = this.clientWidth;
const clickX = e.offsetX;    
const { duration } = music;
music.currentTime = (clickX / width) * duration;
}

// Previous and Next Event Listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);