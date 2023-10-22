import { shakeCamera } from "./camera.js";
import { light } from "./game.js";
import { window_canvas } from "./menu.js";

var dark
let effs

export function effects_start(dark1,player) {
    effs = new Group()
    if (window_canvas.w>window_canvas.h) {
        dark = createImage(canvas.w*4, canvas.h*5);
    }else{
        dark = createImage(canvas.w*4, canvas.h*8);
    }
    dark.loadPixels();
    for (let x = 0; x < dark.width; x++) {
    for (let y = 0; y < dark.height; y++) {
    //   let a = map(y, 0, img.height, 255, 0);
      dark.set(x, y, [0, 0, 0, 230]);
    }
    }
    dark.updatePixels();
    dark.mask(light)
    dark1.img = dark
}

export function effects_draw(dark1,level,player) {
    if((mouseX>-6&&mouseX<canvas.w*1.1)&&(mouseY>-6&&mouseY<canvas.h*1.1)){
        dark1.x = mouse.x
        dark1.y = mouse.y
    }
    if (level.effects) {
        if (effs.length<1000) {
            let eff = new effs.Sprite(random(-100, camera.x+550), -canvas.height)
            eff.collider = 'd'
            eff.layer = -2
            eff.diameter = 0
            eff.mass = 0.0001
            eff.drag = -1
            eff.bounciness = random(0, 1);
            eff.textColor = 'rgba(0,0,0,2)'
            eff.text = '🌀'
            eff.life = 120
        }
        shakeCamera(1000,0.01,true,false)
    }
    effs.collides(allSprites,(eff,tile)=>{
        setTimeout(() => {
            eff.remove()
        }, 10);
    })
}