import { draw, preload, setup, windowResized } from './game.js';
import { loadFiles } from './loadF.js';

let button;
let json_load;
let menu_objects;
let scene;
let font_menu;
export let window_canvas = {w:4,h:3}
export function setup_game() {
    button.hide();
    window.draw=()=>{return false;};
    window.windowResized=()=>{return false;}
        preload()
        setTimeout(() => {
            setup()
            window.draw = draw;
            window.windowResized = windowResized;
        }, 500);
}

function preload_menu() {
    json_load = loadJSON("./loadFiles.json");
    font_menu = loadFont("./fonts/typewriter.ttf");
}

function setup_menu() {
    loadFiles(json_load);
    createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");
    button = createButton("My Level")
    button.position(500, 262.5);
    button.size(240);
    button.mousePressed(setup_game);
}

function draw_menu() {
    // if (button.mouse.hovering()) mouse.cursor = 'grab';
	// else mouse.cursor = 'default';

	// if (button.mouse.presses()) {
    //     setup_game('game')
    //     console.log(menu_objects)
    //     // fullscreen(true)
    // }
}

window.preload = preload_menu;
window.setup = setup_menu;
window.draw = draw_menu;