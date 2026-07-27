/* ==========================================================
   NOTION MUSIC WIDGET
   SCRIPT.JS
   PART 1
========================================================== */

/* ==========================
   ELEMENTS
========================== */

const player = document.querySelector(".player");

const albumImage = document.getElementById("albumImage");

const title = document.querySelector(".title");

const artist = document.querySelector(".artist");

const playButton = document.getElementById("play");

const prevButton = document.getElementById("prev");

const nextButton = document.getElementById("next");

const playIcon = playButton.querySelector("i");


/* ==========================
   PLAYLIST
========================== */

const songs = [

    {

        title: "I Often Stammer and Forget the Way to Sleep",

        artist: "Thornapple",

        image: "assets/lovedive.jpg"

    },

    {

        title: "Strange Weather",

        artist: "Thornapple",

        image: "assets/ditto.jpg"

    },

     {

        title: "Capital Disease",

        artist: "Thornapple",

        image: "assets/weekend.jpg"

    },
  
     {

        title: "Enlightment",

        artist: "Thornapple",

        image: "assets/weekend.jpg"

    },

    {

        title: "Animal",

        artist: "Thornapple",

        image: "assets/weekend.jpg"

    },

    {

        title: "My Century",

        artist: "Thornapple",

        image: "assets/weekend.jpg"

    }

];


/* ==========================
   PLAYER STATE
========================== */

let currentSong = 0;

let isPlaying = false;


/* ==========================
   LP ROTATION
========================== */

// 현재 회전 각도(deg)
let rotation = 0;

// 현재 회전 속도
let speed = 0;

// 최고 회전 속도
const MAX_SPEED = 0.75;

// requestAnimationFrame ID
let animationId = null;


/* ==========================
   LP ENGINE
========================== */

function rotateDisc(){

    if(isPlaying){

        // 자연스럽게 가속

        speed += (MAX_SPEED - speed) * 0.05;

    }

    else{

        // 관성 감속

        speed *= 0.97;

        // 거의 멈추면 종료

        if(speed < 0.01){

            speed = 0;

            animationId = null;

            return;

        }

    }

    rotation += speed;

    albumImage.style.transform =
        `rotate(${rotation}deg)`;

    animationId =
        requestAnimationFrame(rotateDisc);

}


/* ==========================
   LOAD SONG
========================== */

function loadSong(index){

    const song = songs[index];

    title.classList.add("fade");

    artist.classList.add("fade");

    albumImage.classList.add("fade");

    setTimeout(()=>{

        title.textContent = song.title;

        artist.textContent = song.artist;

        albumImage.src = song.image;

        title.classList.remove("fade");

        artist.classList.remove("fade");

        albumImage.classList.remove("fade");

    },200);

}


/* ==========================
   PLAY
========================== */

function play(){

    isPlaying = true;

    player.classList.add("playing");

    playIcon.classList.remove("fa-play");

    playIcon.classList.add("fa-pause");

    playButton.setAttribute(

        "aria-label",

        "Pause"

    );

    if(!animationId){

        rotateDisc();

    }

}


/* ==========================
   PAUSE
========================== */

function pause(){

    isPlaying = false;

    player.classList.remove("playing");

    playIcon.classList.remove("fa-pause");

    playIcon.classList.add("fa-play");

    playButton.setAttribute(

        "aria-label",

        "Play"

    );

}


/* ==========================
   PLAY TOGGLE
========================== */

playButton.addEventListener("click",()=>{

    if(isPlaying){

        pause();

    }

    else{

        play();

    }

});

/* ==========================
   BUTTON ANIMATION
========================== */

function animateButton(button){

    button.animate(

        [

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(.88)"
            },

            {
                transform:"scale(1)"
            }

        ],

        {

            duration:180,

            easing:"ease"

        }

    );

}

/* ==========================
   NEXT SONG
========================== */

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadSong(currentSong);

}

/* ==========================
   PREVIOUS SONG
========================== */

function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

}

/* ==========================
   BUTTON EVENTS
========================== */

nextButton.addEventListener("click",()=>{

    animateButton(nextButton);

    nextSong();

});

prevButton.addEventListener("click",()=>{

    animateButton(prevButton);

    previousSong();

});


/* ==========================
   IMAGE LOAD
========================== */

albumImage.addEventListener("load",()=>{

    albumImage.classList.remove("fade");

});

/* ==========================
   ACCESSIBILITY
========================== */

playButton.setAttribute(

    "aria-label",

    "Play"

);

prevButton.setAttribute(

    "aria-label",

    "Previous Song"

);

nextButton.setAttribute(

    "aria-label",

    "Next Song"

);

/* ==========================
   PRELOAD IMAGES
========================== */

songs.forEach(song=>{

    const image = new Image();

    image.src = song.image;

});

/* ==========================
   INIT
========================== */

loadSong(currentSong);

/* ==========================
   OPTIONAL API
========================== */

window.player = {

    play,

    pause,

    next:nextSong,

    previous:previousSong,

    load(index){

        if(index >= 0 && index < songs.length){

            currentSong = index;

            loadSong(currentSong);

        }

    },

    songs

};

console.log(
    "🎵 Notion Music Widget Loaded"
);