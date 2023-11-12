import { draw_game, preload_game, setup_game, windowResized_game } from './game.js';
import { loadFiles } from './loadF.js';

let buttons = []
let pause;
let json_load;
let menu_objects;
let scene;
let font_menu;
export let window_canvas = {w:4,h:3}
export function game_load() {
    buttons.forEach(button => {
        button.elt.disabled = true
    });
    window.draw=()=>{return false;};
    window.windowResized=()=>{return false;}
        preload_game()
        setTimeout(() => {
            buttons.forEach(button => {
                button.remove()
            });
            setup_game()
            window.draw = draw_game;
            window.windowResized = windowResized_game;
        }, 500);
}

function preload_menu() {
    json_load = loadJSON("./loadFiles.json");
    font_menu = loadFont("./fonts/typewriter.ttf");
}

function setup_menu() {
    loadFiles(json_load);
    createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");
    buttons[0] = createButton("New Game")
    buttons[0].position(canvas.w - 500, 350);
    buttons[0].size(240);
    buttons[0].mousePressed(game_load);
    buttons[1] = createButton("Editor")
    buttons[1].position(canvas.w - 500, 400);
    buttons[1].size(240);
    buttons[2] = createButton("Options")
    buttons[2].position(canvas.w - 500, 450);
    buttons[2].size(240);
    buttons[2].mousePressed(ddddd);
    buttons.forEach(button => {
        button.mouseOver(()=>{
            button.style('background-color', color(155, 155, 155))
            button.style('background-color', color(155, 155, 155))
        })
        button.mouseOut(()=>{
            button.style('background-color', color(255, 255, 255))
            button.style('background-color', color(255, 255, 255))
        })
    });
}

function ddddd() {
    console.log(buttons[0])
    buttons[0].position(window.innerWidth - 1500, 350);
    console.log(window.innerWidth - 500, buttons[0].x)
    pause = createDiv(`FULLSCREEN: <input type="checkbox" id="checkbox">`)
    pause.width = 1000
    pause.height = 1000
    pause.style('background-color', color(255,255,255,55));
    pause.position((window.innerWidth - window.innerWidth/1.2) + 350, 450);
    buttons[2].elt.disabled = true
}

function draw_menu() {
    if (pause!=undefined&&pause.elt.children.checkbox.checked) {
        fullscreen(true)
    }else if(pause!=undefined){
        fullscreen(false)
    }
    push()
    textSize(45)
    fill(255)
    text('EMOJICUBE', 30, 200);
    pop()
    buttons[0].position((window.innerWidth - window.innerWidth/1.2) + 50, 350);
    buttons[1].position((window.innerWidth - window.innerWidth/1.2) + 50, 400);
    buttons[2].position((window.innerWidth - window.innerWidth/1.2) + 50, 450);
}

window.preload = preload_menu;
window.setup = setup_menu;
window.draw = draw_menu;