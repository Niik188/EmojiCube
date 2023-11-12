import { boss_ready } from "./boss.js";
import { cameraPosition, scaleFactor, shakeCamera } from "./camera.js";
import { controls, p5controls, chancePlayerSpeed } from "./controls.js";
import { GUI_render, GUI_setup } from "./gui.js";
import { effects_draw, effects_start } from "./lighting.js";
import { images, LoadSoundplayer, musicLevelEnable, musicLevelLoad, musicLevelStop} from "./loadF.js";
import { window_canvas } from "./menu.js";
import { boss, boss_arm, chanceColorTiles, emoji, load_tiles, objects, scoreDeaths, setup_tiles, slowmotion, spawns, tiles, tile_functional, win } from "./tiles.js";
import { getRandomInt } from "./utils.js";
let players;
let player_spawn = { active: false, x: 0, y: 0 };
let playerTextdefult;
let spawns_activated = 0
let playerColordefult;
let gun;
export let bullets;
let difficulty;
let map = [],
    backgroundMap;
export let number_level = 0;
let random_level = 0;
export let pauseGame = false;
let json;
export let skins;
let dark1;
export let light, light1;
export let font;
export let timer1;
export let player

//Запуск
export function setup_game() {
    createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");
    let random_count = getRandomInt(0, 10);
    if (random_count <= 3 && random_count >= 2) {document.title = "🥵EmojiCube😋"}
    if (random_count >= 6 && random_count <= 8) {document.title = "🤓Cube"}
    if (random_count >= 9) {document.title = "(^o^)Cube"}
    if (random_count <= 1) {document.title = "😏EmojiCube"}
    players = new Group();
    players.skin = "skin2"
    players.health = 100;
    players.textSize = skins[players.skin].textSize;
    playerTextdefult = skins[players.skin].defualt
    players.text = playerTextdefult;
    playerColordefult = skins[players.skin].defualt_color
    players.color = playerColordefult;
    players.emojis = {
        win: skins[players.skin].win,
        schock: skins[players.skin].schock,
        unruhe: skins[players.skin].unruhe,
        cheat: skins[players.skin].cheat,
        death: skins[players.skin].death,
        win_glitch: skins[players.skin].win_glitch,
        win_color: skins[players.skin].win_color,
        schock_color: skins[players.skin].schock_color,
        unruhe_color: skins[players.skin].unruhe_color,
    };
    players.act = "none"
    players.stroke = "black";
    players.w = 38;
    players.h = 38;
    players.death = false;
    players.cooldown = false;
    players.tile = ''
    //controls(player,god_mode)
    //let random_count = getRandomInt(0, 10);
    // if (random_count <= 3 && random_count >= 2) {
    //     document.title = "🥵EmojiCube😋";
    //     playerTextdefult = "😋";
    //     player.emojis = {
    //         win: "🥵",
    //         schock: "😳",
    //         unruhe: ["🤨", "😳", "🥵"],
    //         cheat: "🤑",
    //         win_glitch: "😰",
    //         win_color: "#F03A17",
    //         schock_color: "#FFC83D",
    //         unruhe_color: ["#FFC83D", "#FFC83D", "#F03A17"],
    //     };
    // } else if (random_count >= 6 && random_count <= 8) {
    //     document.title = "🤓Cube";
    //     playerTextdefult = "☝️🤓ᅟ";
    //     player.emojis = {
    //         win: "📙😄ᅟ",
    //         schock: "🖐️😲🖐️",
    //         unruhe: ["☝️😟ᅟ", "☝️😨ᅟ", "😱"],
    //         cheat: "☹️",
    //         win_glitch: "😰",
    //         win_color: "#FFC83D",
    //         schock_color: "#FFC83D",
    //         unruhe_color: ["#FFC83D", "#FFC83D", "#FFC83D"],
    //     };
    // } else if (random_count >= 9) {
    //     document.title = "(^o^)Cube";
    //     player.textSize = 24;
    //     player.color = "white";
    //     playerTextdefult = "◕_◕";
    //     playerColordefult = "white";
    //     player.emojis = {
    //         win: " ͡° ͜ʖ ͡°",
    //         schock: "｡>﹏<｡",
    //         unruhe: ["ಠ_ಠ", "ŏ﹏ŏ", "ó_ò"],
    //         cheat: "^o^",
    //         win_glitch: "｡ŏ﹏ŏ",
    //         win_color: "white",
    //         schock_color: "white",
    //         unruhe_color: ["white", "white", "white"],
    //     };
    // } else if (random_count <= 1) {
    //     document.title = "😏EmojiCube";
    //     player.textSize = 32;
    //     playerTextdefult = "😏";
    //     player.emojis = {
    //         win: "😎",
    //         schock: "😵",
    //         unruhe: ["🤫", "☹️", "💀"],
    //         cheat: "👁️",
    //         win_glitch: "😰",
    //         win_color: "#FFC83D",
    //         schock_color: "#FFC83D",
    //         unruhe_color: ["#FFC83D", "#FFC83D", "#FFC83D"],
    //     };
    // }

    gun = new Sprite();
    gun.textSize = 32;
    gun.text = `${skins[players.skin].gun}ㅤㅤ`;
    gun.collider = "n";
    gun.w = 0;
    gun.h = 0;
    players.layer = 1;
    gun.layer = 0;

    bullets = new Group();
    bullets.stroke = bullets.color = "rgb(79, 89, 176)";
    bullets.collider = "d";
    bullets.diameter = 5;
    bullets.life = 30;
    bullets.layer = -1;
    bullets.speed = 50;

    setup_tiles();

    dark1 = new Sprite();
    dark1.collider = "n";
    dark1.visible = false;
    dark1.scale = 4;

    effects_start(dark1, player);
    GUI_setup();
    difficulty = 0;
    map = json[json.info[difficulty]][0];
    map_create();
    controls(players);
    setTimeout(() => {
        musicLevelLoad(map.song_main);
    }, 1000);
}

//До загрузки
export function preload_game() {
    json = loadJSON("./map.json");
    skins = loadJSON("./skins.json");
    //background(canvas.toDataURL())
    light = loadImage("./img/light.png");
    light1 = loadImage("./img/light1.png");
    font = loadFont("./fonts/typewriter.ttf");
    
}

export function windowResized_game() {
    setTimeout(() => {
        createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");
        effects_start(dark1, player);
    }, 60);
}

export function playerSetTextDefult(timer, win_glitch) {
    if (win_glitch) {
        document.title = "𝓔ΜÕ𝓘Î Ćμ𝔹𝕰";
        playerTextdefult = "🙁";
        playerColordefult = "#FFC83D";
        players.emojis = {
            win: "😌",
            schock: "😮",
            unruhe: ["😟", "😨", "😱"],
            cheat: "😎",
            win_glitch: "😰",
            win_color: "#FFC83D",
            schock_color: "#FFC83D",
            unruhe_color: ["#FFC83D", "#FFC83D", "#FFC83D"],
        };
        playerSetTextDefult(false);
    } else {
        if (player.text != playerTextdefult && timer) {
            timer1 = setTimeout(() => {
                player.text = playerTextdefult;
                player.color = playerColordefult;
                clearTimeout(timer1);
            }, 1000);
        } else if (player.text != playerTextdefult) {
            player.text = playerTextdefult;
            player.color = playerColordefult;
        }
    }
}

let rotate1 = 150;
let timer_bullets;
export function draw_game() {
    if (backgroundMap.img != undefined) {
        // imageMode(CORNERS);
        let dx = (mouseX/10)-20;
        let dy = (mouseY/10);
        tint(backgroundMap.tint)
        background(backgroundMap.tint);
        if (map.levels[number_level].camera_position != "static") {
            image(images[backgroundMap.img - 1],(dx*0.05)-100,(dy*0.05)-100,canvas.w*1.2,canvas.h*1.2, 0, 0, images[backgroundMap.img - 1].width, images[backgroundMap.img - 1].height, CONTAIN)
        }else{
            image(images[backgroundMap.img - 1],0,-80,canvas.w*1.2,canvas.h*1.2, 0, 0, images[backgroundMap.img - 1].width, images[backgroundMap.img - 1].height, CONTAIN)
        }
        if (!backgroundMap.light) {
            bullets.stroke = bullets.color = skins[players.skin].color_bullets_light;
            gun.textColor = 'white'
        } else {
            bullets.stroke = bullets.color = skins[players.skin].color_bullets_dark;
            gun.textColor = 'black'
        }
    } else {
        background(backgroundMap);
        if (backgroundMap[0] < 155 && backgroundMap[1] < 155 && backgroundMap[2] < 155) {
            bullets.stroke = bullets.color = skins[players.skin].color_bullets_light;
            gun.textColor = 'white'
        } else {
            bullets.stroke = bullets.color = skins[players.skin].color_bullets_dark;
            gun.textColor = 'black'
        }
    }
    gun.x = player.x;
    gun.y = player.y;
    gun.rotateTowards(mouse, 0.1, 0);
    //При нажатие кнопки мыши и при наличие оружия
    if (player.act == "shoot" && gun.visible) {
        if (bullets.length < 1) {
            gun.rotateTowards(mouse, 0.1, rotate1);
            let bullet = new bullets.Sprite();
            if (gun.x < mouse.x) {
                bullet.x = gun.x + 10;
                bullet.y = gun.y;
            } else {
                bullet.x = gun.x - 10;
                bullet.y = gun.y;
            }
            bullet.direction = bullet.angleTo(mouse) + random(-bullets.length + 10, bullets.length + 10);
            shakeCamera(200,0.6,true,true);
            LoadSoundplayer("/bullet.");
        }
    }
    //Отражать оружие, когда x мыши меньше x игрока
    if (player.x < mouse.x) {
        gun.mirror.x = skins[players.skin].gun_mirror_x;
        if (skins[players.skin].gun_mirror_y!=undefined) {
            gun.mirror.y = !skins[players.skin].gun_mirror_y;
        }else{
            gun.mirror.y = false;
        }
        rotate1 = gun.mirror.y*Math.abs(rotate1);
    } else {
        gun.mirror.x = skins[players.skin].gun_mirror_x;
        if (skins[players.skin].gun_mirror_y!=undefined) {
            gun.mirror.y = skins[players.skin].gun_mirror_y;
        }else{
            gun.mirror.y = true;
        }
        rotate1 = gun.mirror.y*Math.abs(rotate1);
    }
    GUI_render(map,scoreDeaths,boss)
    effects_draw(dark1, map.levels[random_level]);
    p5controls(player, map.levels[random_level]);
    tile_functional(players, map, json, difficulty, gun, bullets, backgroundMap, spawns_activated);
    cameraPosition(camera, player, map, canvas, number_level);
}

//Создание и перезапуск уровня
export function map_create(restart_level, death) {
    chancePlayerSpeed(3);
    players.removeAll();
    tiles.removeAll();
    objects.removeAll();
    boss_arm.removeAll();
    setTimeout(() => {
        background(0);
    }, 50);
    if (map.levels.length == 0) {
        difficulty += 1;
        map = json[json.info[difficulty]][0];
        if ((!map.random_level || map.begin_level) && (map.random_level != undefined || map.begin_level != undefined)) {
            number_level = random_level = 0;
        }
        musicLevelLoad(map.song_main)
        json = loadJSON("./map.json");
    }
    if (restart_level == 'map') {
        map = json[json.info[difficulty]][0];
        if ((!map.random_level || map.begin_level) && (map.random_level != undefined || map.begin_level != undefined)) {
            number_level = random_level = 0;
        }
        json = loadJSON("./map.json");
    }
    if (restart_level != 'none') {
        musicLevelLoad(map.song_main)
    }
    if ((map.random_level || map.random_level == undefined) && restart_level == 'none' && !map.begin_level) {
        random_level = getRandomInt(0, map.levels.length);
        while (random_level == number_level && map.levels.length != 1) {
            random_level = getRandomInt(0, map.levels.length);
        }
        number_level = random_level;
    }
    if (!musicLevelEnable(map.song_main)) {
        musicLevelLoad(map.song_main)
    }
    if (map.levels[random_level].music_enable!=undefined&&!map.levels[random_level].music_enable) {
        console.log(map.levels[random_level].music_enable)
        musicLevelStop()
    }
    load_tiles(map.levels[random_level]);
    if (map.levels[random_level] == map.levels[0]) {
        map.begin_level = false;
    }
    players.rotationLock = map.levels[random_level].rotationLock;
    if (map.player_ball) {
        players.diameter = 30;
    } else {
        players.w = 38;
        players.h = 38;
    }
    if (map.levels[random_level].win != undefined) {
        if (map.levels[random_level].win == "gun") {
            win.text = skins[players.skin].gun;
            win.w = 10;
            win.h = 10;
            win.collider = "s";
        }
        if (map.levels[random_level].win == "none") {
            win.text = " ";
            win.collider = "s";
        }
    }else{
        if (map.win == "gun") {
        win.text = skins[players.skin].gun;
        win.w = 10;
        win.h = 10;
        win.collider = "s";
        }
        if (map.win == "none") {
        win.text = " ";
        win.collider = "s";
        }
    }
    world.gravity.x = 0;
    world.gravity.y = 10;
    if (map.gravity != undefined) {
        world.gravity.x = map.gravity.x;
        world.gravity.y = map.gravity.y;
    }
    if (map.levels[random_level].tile_position != undefined) {
        new Tiles(map.levels[random_level].map, map.levels[random_level].tile_position.x, map.levels[random_level].tile_position.y, tiles.w, tiles.h);
    } else {
        new Tiles(map.levels[random_level].map, 0, 350, tiles.w, tiles.h);
    }
    for (let i = 0; i < emoji.length; i++) {
        if (map.levels[random_level].emoji[i] != undefined) {
            emoji[i].text = map.levels[random_level].emoji[i];
        }
    }
    chanceColorTiles(map.levels[random_level]);
    boss_ready();
    // checkTiles(map.levels[random_level].map, death);
    if (spawns.length != 0) {
        player = new players.Sprite()
        console.log(player.emojis)
    }else{
        player = {x:0,y:0}
        player.visible = false
        player.collider = 'k'
    }
    try {
        if (death == "fall") {
            if (map.fall_spawn && spawns.length != 0) {
                players.x = spawns[getRandomInt(0, spawns.length)].x;
                players.y = 0;
            } else if (spawns.length == 0) {
                players.y = 0;
                player_spawn.active = true;
                player_spawn.x = player.x;
                player_spawn.y = player.y;
            } else {
                players.y = 0;
            }
        } else {
            if (spawns_activated>0) {
                players.x = spawns[getRandomInt(0, spawns_activated)].x;
                players.y = spawns[getRandomInt(0, spawns_activated)].y;
            }else{
                players.x = spawns[0].x;
                players.y = spawns[0].y;
            }
        }
    } catch (error) {
        player.x = player_spawn.x;
        player.y = player_spawn.y;
    }
    gun.visible = map.gun_enable;
    if (map.levels[random_level].gun_enable != undefined) {
        gun.visible = map.levels[random_level].gun_enable;
    }
    backgroundMap = map.background;
    if (map.levels[random_level].background != undefined) {
        backgroundMap = map.levels[random_level].background;
    }
    dark1.visible = !map.light;
    if (map.levels[random_level].light != undefined) {
        dark1.visible = !map.levels[random_level].light;
    }
    tiles.layer = 1;
    objects.layer = 1;
    dark1.layer = 2;
}

function checkTiles(tiles, death) {
    let count = 0;
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x] == "{") {
                count++;
            }
        }
    }
    if (count == 0 && death != "fall" && !player_spawn.active) {
        player.remove();
        console.log("%c💀Error spawn is not defined💀", "color: red; background-color: black");
        setInterval(() => {
            for (let i = 0; i < random(10, 100); i++) {
                textSize(random(16, 64));
                fill(random(120, 255));
                text("SyntaxError:player is not defined", random(0, canvas.w), random(0, canvas.h));
                text("SyntaxError:spawn is not defined", random(0, canvas.w), random(0, canvas.h));
            }
        }, 200);
    }
}