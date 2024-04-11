console.log("Welcome to Vfy");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let coverFrame = document.getElementById('coverFrame'); // Get the coverFrame element

let songs = [
    {songName:"LEO - Ordinary Person",filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Manasa Manasa",filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Pove Po",filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Villain Yaaru",filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Why this Kolaveri",filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"audio6",filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"audio7",filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"audio8",filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"audio9",filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName:"audio10",filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
];

// Populate song items with cover images and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to update the songItemPlay icon based on the current song
const updateSongItemPlayIcon = (songIndex) => {
    const songItemIcons = document.getElementsByClassName('songItemPlay');
    
    // Reset all icons to play state
    Array.from(songItemIcons).forEach(icon => {
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-play-circle');
    });

    // If the current song is playing, update the corresponding songItemPlay icon
    if (!audioElement.paused && audioElement.src.includes(`songs/${songIndex + 1}.mp3`)) {
        const currentSongItemIcon = songItemIcons[songIndex];
        currentSongItemIcon.classList.remove('fa-play-circle');
        currentSongItemIcon.classList.add('fa-circle-pause');
    }
};

// Update songItemPlay icon initially
updateSongItemPlayIcon(songIndex);

// Function to handle songItemPlay click event
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const icon = e.target;
        const clickedSongIndex = parseInt(icon.id);
        
        // If the clicked song is currently playing, pause it
        if (audioElement.src.includes(`songs/${clickedSongIndex + 1}.mp3`) && !audioElement.paused) {
            audioElement.pause();
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else { // Otherwise, play the clicked song
            Array.from(document.getElementsByClassName("songItemPlay")).forEach((icon) => {
                icon.classList.remove('fa-circle-pause');
                icon.classList.add('fa-play-circle');
            });
            gif.style.opacity = 1;
            icon.classList.remove('fa-play-circle');
            icon.classList.add('fa-circle-pause');
            audioElement.src = `songs/${clickedSongIndex + 1}.mp3`;
            masterSongName.innerText = songs[clickedSongIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-circle-pause');
            // Update the cover frame with the current song's cover
            coverFrame.src = songs[clickedSongIndex].coverPath;
        }

        // Update the songItemPlay icons after songItemPlay click
        updateSongItemPlayIcon(clickedSongIndex);
        // Update the style of the song items based on the currently playing song
        updateSongItemStyle(clickedSongIndex);
    });
});

// Function to update the progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Function to handle seek bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to handle next button click
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');
    updateSongItemPlayIcon(songIndex);
    // Update the cover frame with the current song's cover
    coverFrame.src = songs[songIndex].coverPath;
    // Update the style of the song items based on the currently playing song
    updateSongItemStyle(songIndex);
});

// Function to handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');
    updateSongItemPlayIcon(songIndex);
    // Update the cover frame with the current song's cover
    coverFrame.src = songs[songIndex].coverPath;
    // Update the style of the song items based on the currently playing song
    updateSongItemStyle(songIndex);
});

// Function to handle masterPlay button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
    updateSongItemPlayIcon(songIndex);
});

// Function to update the style of the song items based on the currently playing song
const updateSongItemStyle = (songIndex) => {
    const songItems = document.getElementsByClassName('songItem');
    
    // Remove the 'playing' class from all song items
    Array.from(songItems).forEach(item => {
        item.classList.remove('playing');
    });
    
    // Add the 'playing' class to the currently playing song item
    songItems[songIndex].classList.add('playing');
};

// Function to update the cover frame with the current song's cover
const updateCoverFrame = (coverPath) => {
    coverFrame.src = coverPath;
};
