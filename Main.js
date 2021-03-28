import { Game } from './Game.js';
import { Show } from './Show.js';

var game = new Game(100,150);
var show = new Show(game);


document.getElementById("play").onclick = () => {show.start()};
document.getElementById("pause").onclick = () => {show.loop = false};


let fps_input =  document.getElementById("fps");
fps_input.onchange = (event) => setFps(fps_input);

function setFps(input_dom) {
    let input_val = input_dom.value;

    if(input_val){
        show.setFps(input_val);
    }
}


