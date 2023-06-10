const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'musics/All Around The World (La La La) .mp3',
        displayName: 'All Around The World (La La La)',
        cover: 'images/All Around World.jpg',
        artist: 'All Around The World'
    },
    {
        path: 'musics/Avicii - The Nights.mp3',
        displayName: 'The Nights',
        cover: 'images/Avcii - The Nights.jpeg',
        artist: 'Avicii'
    },
    {
        path: 'musics/Hymn For The Weekend.mp3',
        displayName: 'Hymn For The Weekend',
        cover: 'images/Hymn for the Weekend.jpeg',
        artist: 'Coldplay'
    },
    {
        path: 'musics/En Sarwame.mp3',
        displayName: 'En Sarwame',
        cover: 'images/Charlie 777.jpg',
        artist: 'Charlie 777'
    },
    {
        path: 'musics/Life-of-Pazham-MassTamilan.dev.mp3',
        displayName: 'Life of Pazham',
        cover: 'images/Thiruchithrambalam.jpg',
        artist: 'Thiruchitrambalam'
    },
    {
        path: 'musics/Megham-Karukatha.mp3',
        displayName: 'MeghamKarukatha',
        cover: 'images/Thiruchithrambalam.jpg',
        artist: 'Thiruchitrambalam'
    },
    {
        path: 'musics/Parudeesa.mp3',
        displayName: 'Parudeesa',
        cover: 'images/Beeshma Paravam.jpg',
        artist: 'Bheeshma Parvam'
    },
    {
        path: 'musics/Rathipushpam.mp3',
        displayName: 'Rathipushpam',
        cover: 'images/Beeshma Paravam.jpg',
        artist: 'Bheeshma Parvam'
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

    
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX/width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click',() => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1))
music.addEventListener('timeupdate',updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);