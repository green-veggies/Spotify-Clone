
console.log("Welcome homie");

// INITIALISE THE VARIABLES

let songIndex = 0;
let audioElement = new Audio('./assets/songs/1.mp3');
let coverPng = document.getElementById("coverPng");
let masterplay = document.getElementById('masterPlay');
let miniplayer = document.getElementsByClassName('miniplayer');
let coverName = document.getElementById('coverName');
let progressBar = document.getElementById('progressBar');
let songItem = Array.from(document.getElementsByClassName('songItems'));

let songs = [{songName:"Still Rollin - Shubh",filePath:"./assets/songs/1.mp3", cover:"./assets/covers/1.jpg"},
            {songName:"Blue Eyes - Honey Singh ",filePath:"./assets/songs/2.mp3", cover:"./assets/covers/2.jpg"},
            {songName:"Mi Amor",filePath:"./assets/songs/3.mp3", cover:"./assets/covers/3.jpg"},
            {songName:"Likhe jo khhat Tujhe - Mohd Rafi",filePath:"./assets/songs/4.mp3", cover:"./assets/covers/4.jpg"},
            {songName:"Excuses - AP Dhillion",filePath:"./assets/songs/5.mp3", cover:"./assets/covers/5.jpg"},
            {songName:"Baller - Shubh",filePath:"./assets/songs/6.mp3", cover:"./assets/covers/6.jpg"}
]

songItem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].cover;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle play/pause
masterplay.addEventListener("click",()=>{
    console.log("clicked");
    coverName.innerHTML = songs[songIndex].songName;
    coverPng.setAttribute("src",songs[songIndex].cover);
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        document.documentElement.style.setProperty('--opacity', '1');

    }

    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        coverPng.style.opacity="0";
        document.documentElement.style.setProperty('--opacity', '0');
        
    }
})

audioElement.addEventListener("timeupdate",()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})
progressBar.addEventListener("change",()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})

const makeAllplay=()=>{
    
    Array.from(document.getElementsByClassName("miniplayer")).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })

} 


Array.from(document.getElementsByClassName("miniplayer")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        console.log(e.target);
        makeAllplay();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = './assets/songs/'+(songIndex+1)+'.mp3';
        coverName.innerHTML = songs[songIndex].songName;
        if(audioElement.paused || audioElement.currentTime <= 0){
            audioElement.play();
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
            document.documentElement.style.setProperty('--opacity', '1');
    
        }
    
        else{
            audioElement.pause();
            masterplay.classList.remove('fa-pause');
            masterplay.classList.add('fa-play');
            coverPng.style.opacity="0";
            document.documentElement.style.setProperty('--opacity', '0');
            
        }
    })
})
document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=5;
    }
    else{
        songIndex--;
    }
    audioElement.src = './assets/songs/'+(songIndex+1)+'.mp3';
    coverName.innerHTML = songs[songIndex].songName;
    coverPng.setAttribute("src",songs[songIndex].cover);
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    document.documentElement.style.setProperty('--opacity', '1');
})
document.getElementById('next').addEventListener("click",()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    audioElement.src = './assets/songs/'+(songIndex+1)+'.mp3';
    coverName.innerHTML = songs[songIndex].songName;
    coverPng.setAttribute("src",songs[songIndex].cover);
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    document.documentElement.style.setProperty('--opacity', '1');
})