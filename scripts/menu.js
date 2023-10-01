import { draw, preload, setup, windowResized } from './game.js';
import { loadFiles } from './loadF.js';

let button;
let json_load;
export let window_canvas = {w:5.6,h:4}
export function setup_game(scene1) {
    window.draw=()=>{return false;};
    window.windowResized=()=>{return false;};
    if (scene1 == 'game') {
        preload()
        setTimeout(() => {
            setup()
            window.draw = draw;
            window.windowResized = windowResized;
        }, 500);
    }else{
        // setTimeout(() => {
        //     setup_menu()
        //     window.draw = draw_menu();
        // }, 40);
    }
}

function preload_menu() {
    json_load = loadJSON("./loadFiles.json");
}

function setup_menu() {
    loadFiles(json_load);
    createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");
    button = new Sprite()
    button.w = 550
    button.textSize = 32
    button.text = 'Play'
}

function draw_menu() {
    if (button.mouse.hovering()) mouse.cursor = 'grab';
	else mouse.cursor = 'default';

	if (button.mouse.presses()) {
        setup_game('game')
        allSprites.remove()
        // fullscreen(true)
    }
}

window.preload = preload_menu;
window.setup = setup_menu;
window.draw = draw_menu;