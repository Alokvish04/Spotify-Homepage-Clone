console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "NSYNC - BYE BYE BYE DEADPOOL", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Robinson - Ayo Girl (Fayahh Beat)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Djo - End of Beginning", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Jungkook - Still With You", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "JAWNY - Honeypie", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Die With A Smile - (Lady Gaga, Bruno Mars)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Left and Right BTS by Charlie Puth", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Katty Perry - Harleys In Hawaii", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Ali Gatie - It's You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Sabrina Carpenter - Espresso", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "BTS - I Need You", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Co2 Song - Prateek Kuhad", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    ]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Handle play/pause click for each song item
songItems.forEach((element, i) => {
    element.getElementsByClassName('songItemPlay')[0].addEventListener('click', (e) => {
        if (audioElement.src !== songs[i].filePath) {
            audioElement.src = songs[i].filePath;
            masterSongName.innerText = songs[i].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        }
    });
});


// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})