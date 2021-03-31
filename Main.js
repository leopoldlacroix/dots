import { Game } from './Game.js';
import { Show } from './Show.js';

var game = new Game(100,150);
var show = new Show(game);


document.getElementById("play").onclick = playPause;
document.getElementById("loop").onclick = playPauseEnd;
document.getElementById("fps").onchange = setFpsFromDom;

function setFpsFromDom(){
    let input_dom = document.getElementById("fps");
    let input_val = input_dom.value;
    show.setFps(input_val);
}

function playPause(){
    let play = document.getElementById("play");


    if(play){
        
        play.id = "pause";
        play.innerHTML = "pause";
        setFpsFromDom();
        return;
    }
    let pause = document.getElementById("pause");
    if(pause){
        pause.id = "play";
        pause.innerHTML = "play";
        show.setFps(0);
    }
}

function playPauseEnd(){
    show.loop = !show.loop;
    let loop_dom = document.getElementById("loop");
    loop_dom.innerHTML = `loop ${show.loop}`;
}
playPauseEnd();


