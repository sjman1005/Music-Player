document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.img-area img');
    const title = document.querySelector('.song-details .name');
    const artist = document.querySelector('.song-details .artist');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.max-duration');
    const progress = document.querySelector('.progress-bar');
    const playerProgress = document.querySelector('.progress-area');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const playBtn = document.getElementById('play-pause');
    const background = document.querySelector('.img-area img'); // Assuming 'background' was intended for the image in '.img-area'

    // Audio object
    const music = new Audio();

    // Array of songs
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
            path: 'musics/The Script - Hall of Fame.mp3',
            displayName: 'Hall of Fame',
            cover: 'images/Hall of Fame.jpeg',
            artist: 'The Script'
        },
        {
            path: 'musics/Megham-Karukatha.mp3',
            displayName: 'MeghamKarukatha',
            cover: 'images/Thiruchithrambalam.jpg',
            artist: 'Thiruchitrambalam'
        },
        {
            path: 'musics/Ranam.mp3',
            displayName: 'Ranam Title Track',
            cover: 'images/Ranam.jpg',
            artist: 'Jakes Bejoy'
        },
        {
            path: 'musics/Nenjin Ezhuth.mp3',
            displayName: 'Nenjin Ezhuth',
            cover: 'images/Nenjin Ezhuth.jpeg',
            artist: 'Adarsh Krishnan N'
        },
        {
            path: 'musics/Kaane Kaane.mp3',
            displayName: 'Kaane Kaane',
            cover: 'images/Puthiya Mugham.jpg',
            artist: 'Prithviraj'
        },
        {
            path: 'musics/Nyabagam.mp3',
            displayName: 'Nyabagam',
            cover: 'images/Varshanna.jpg',
            artist: 'Vineeth Sreenivasan'
        },
        {
            path: 'musics/Crazy Frog.mp3',
            displayName: 'Crazy Frog',
            cover: 'images/Crazy Frog.jpeg',
            artist: 'Shaan Rehman'
        },
        {
            path: 'musics/Kuthanthram.mp3',
            displayName: 'Kuthanthram',
            cover: 'images/Manjumel Boys.jpeg',
            artist: 'Sushin Shyam'
        },
        {
            path: 'musics/Nebulakal.mp3',
            displayName: 'Nebulakal',
            cover: 'images/Manjumel Boys.jpeg',
            artist: 'Sushin Shyam'
        },
        {
            path: '/musics/Miia - Dynasty.mp3',
            displayName: 'Dynasty',
            cover: '/images/Miia Dynasty.jpeg',
            artist: 'Miia'
        },
        {
            path: 'musics/See You Again.mp3',
            displayName: 'See You Again',
            cover: 'images/fast.jpg',
            artist: 'Wiz Khalifa'
        },
    ];

    let musicIndex = 0;
    let isPlaying = false;

    // Function to toggle play and pause
    function togglePlay() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    // Function to play music
    function playMusic() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        music.play();
    }

    // Function to pause music
    function pauseMusic() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        music.pause();
    }

    // Function to load music and update UI
    function loadMusic(song) {
        music.src = song.path;
        title.textContent = song.displayName;
        artist.textContent = song.artist;
        image.src = song.cover;
        background.src = song.cover;
    }

    // Function to change to the next or previous song
    function changeMusic(direction) {
        musicIndex = (musicIndex + direction + songs.length) % songs.length;
        loadMusic(songs[musicIndex]);
        if (isPlaying) {
            playMusic();
        }
    }

    // Function to update the progress bar and time display
    function updateProgressBar() {
        const { currentTime, duration } = music;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        };

        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }

    // Function to set music position based on click on progress bar
    function setProgressBar(e) {
        const width = playerProgress.clientWidth;
        const clickX = e.offsetX;
        music.currentTime = (clickX / width) * music.duration;
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeMusic(-1));
    nextBtn.addEventListener('click', () => changeMusic(1));
    music.addEventListener('ended', () => changeMusic(1))
    music.addEventListener('timeupdate', updateProgressBar);
    playerProgress.addEventListener('click', setProgressBar);

    // Initial load of the first song
    loadMusic(songs[musicIndex]);
});
