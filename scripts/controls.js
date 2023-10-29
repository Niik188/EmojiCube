import { shakeCamera } from "./camera.js";
import { map_create, playerSetTextDefult } from "./game.js";
import { LoadSoundplayer, sounds } from "./loadF.js";
import { setup_game } from "./menu.js";
import { jumping, objects, speedLeft, speedRight, spikes, tiles, wall } from "./tiles.js";
export let god_mode = false;
export let speedPlayer = 2
let keys = {
    up: ["KeyW", "ArrowUp", "Space"],
    down: ["KeyS", "ArrowDown"],
    left: ["KeyA", "ArrowLeft"],
    right: ["KeyD", "ArrowRight"],
    use: ["KeyE"],
    shoot:["mouse0"],
    noclip: ["KeyV"],
    restart: ["KeyR"],
    menu: ["KeyM"],
    restartCoolDown: false,
};

export function chancePlayerSpeed(speed) {
    speedPlayer = speed
}

function delay(callback, ms) {
        var timer = 0;
        return function() {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            callback.apply(context, args);
          }, ms || 0);
        };
}
var keyState = {};
export function controls(players) {
    //Клавиши
    addEventListener("keypress", (e) => {
        if (e.code == keys.noclip) {
            players[0].sleeping = true;
            players[0].rotation = 0;
            god_mode = !god_mode;
            playerSetTextDefult(false);
        }
        if (e.code == keys.restart && !keys.restartCoolDown) {
            players[0].sleeping = true;
            keys.restartCoolDown = true;
            players[0].rotation = 0;
            map_create('level');
            setTimeout(() => {
                keys.restartCoolDown = false;
            }, 500);
        }
        if (e.code == keys.menu && !keys.restartCoolDown) {
            location.reload()
        }
    });
    addEventListener("keydown",(e) => {
            keyState[e.code] = true;
        },true);
    addEventListener('mousedown',(e) => {
            keyState[`mouse${e.button}`] = true;
            console.log(e)
        },true);
let t;
    addEventListener('wheel',(e) => {
        clearTimeout(t)
        if (e.deltaY==-100) {
            keyState[`mouseWheelUp`] = true;
        }
        if (e.deltaY==100) {
            keyState[`mouseWheelDown`] = true;
        }
        t = setTimeout(() => {
            keyState[`mouseWheelUp`] = false;
            keyState[`mouseWheelDown`] = false;
        }, 100);
    });
    addEventListener("keyup",(e) => {
            keyState[e.code] = false;
            if (!players[0].cooldown) {
                players[0].act = "none"
                players[0].velocity.x = 0;
            }
        },true);
    addEventListener('mouseup',(e) => {
        keyState[`mouse${e.button}`] = false;
        if (!players[0].cooldown) {
            players[0].velocity.x = 0;
        }
        players[0].act = "none"
    },true);

    function gameLoop() {
        for (let i = 0; i < keys.shoot.length; i++) {
        if (keyState[keys.shoot[i]]) {
            players[0].act = "shoot"
        }
        }
        for (let i = 0; i < keys.use.length; i++) {
        if (keyState[keys.use[i]]) {
            players[0].act = "use"
            console.log(keyState[keys.use[i]]);
        }}
        for (let i = 0; i < keys.up.length; i++) {
            if (keyState[keys.up[i]]) {
                tiles.forEach(tile => {
                    if (players[0].colliding(tile)&&tile.ground == "jump") {
                    players[0].velocity.y = -5;
                    shakeCamera(100,0.1,false,true)
                    LoadSoundplayer("/jump.");
                    }
                });
                objects.forEach((object) => {
                    if (players[0].colliding(object) && !object.active && object.ground == "jump") {
                        players[0].velocity.y = -5;
                        LoadSoundplayer("/jump.");
                    }
                });
                if (god_mode) {
                    players[0].y -= 5;
                }
            }
        }

        for (let i = 0; i < keys.down.length; i++) {
            if (keyState[keys.down[i]]) {
                if (god_mode) {
                    players[0].y += 5;
                }
            }
        }

        for (let i = 0; i < keys.left.length; i++) {
            if (keyState[keys.left[i]] && !players[0].cooldown) {
                players[0].velocity.x = -speedPlayer;
                if (god_mode) {
                    players[0].velocity.x = -5;
                }
            }
        }

        for (let i = 0; i < keys.right.length; i++) {
            if (keyState[keys.right[i]] && !players[0].cooldown) {
                players[0].velocity.x = speedPlayer;
                if (god_mode) {
                    players[0].velocity.x = 5;
                }
            }
        }

        for (let i = 0; i < keys.right.length; i++) {
            for (let j = 0; j < keys.left.length; j++) {
                if (keyState[keys.left[i]] && keyState[keys.right[i]] && !players[0].cooldown) {
                    players[0].velocity.x = 0;
                }
            }
        }
        // redraw/reposition your object here
        // also redraw/animate any objects not controlled by the user

        setTimeout(gameLoop, 10);
    }
    gameLoop();
}

export function p5controls(player, level) {
    //Noclip
    if (god_mode) {
        player.text = player.emojis.cheat;
        allSprites.debug = true;
        player.collider = "n";
    }
    if (!god_mode && !player.death) {
        player.collider = "d";
        allSprites.debug = false;
        if (level.debug_danger) {
            spikes.debug = true;
        }
    }
}
