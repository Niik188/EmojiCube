import { boss_ready } from "./boss.js";
import { cameraPosition, shakeCamera } from "./camera.js";
import { controls, p5controls, god_mode, chancePlayerSpeed } from "./controls.js";
import { effects_draw, effects_start } from "./lighting.js";
import { images, LoadSoundplayer, musicLevelEnable, musicLevelLoad, musicLevelStop, panelMusicEnable, sounds } from "./loadF.js";
import { window_canvas } from "./menu.js";
import { boss, boss_arm, chanceColorTiles, emoji, load_tiles, objects, scoreDeaths, setup_tiles, spawns, tiles, tile_functional, win } from "./tiles.js";
import { getRandomInt } from "./utils.js";
export let player;
let player_spawn = { active: false, x: 0, y: 0 };
let playerTextdefult = "😐";
let playerColordefult = "#FFC83D";
let gun;
export let bullets;
let difficulty;
let map = [],
    backgroundMap;
export let number_level = 0;
let random_level = 0;
export let pauseGame = false;
let json;
let dark1;
let dark;
export let light, light1;
let date;
export let font;
export let timer1;

//Запуск
export function setup() {
    createCanvas(`${window_canvas.w}:${window_canvas.h}`, "fullscreen");

    player = new Sprite();
    player.health = 100;
    player.textSize = 35;
    player.color = "#FFC83D";
    player.stroke = "black";
    player.w = 38;
    player.h = 38;
    player.emojis = {
        win: "😄",
        schock: "😲",
        unruhe: ["😟", "😨", "😱"],
        cheat: "😎",
        win_glitch: "😰",
        win_color: "#FFC83D",
        schock_color: "#FFC83D",
        unruhe_color: ["#FFC83D", "#FFC83D", "#FFC83D"],
    };
    player.death = false;
    player.cooldown = false;
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
    player.text = playerTextdefult;

    gun = new Sprite();
    gun.textSize = 32;
    gun.text = "🔫ㅤㅤ";
    gun.collider = "n";
    gun.w = 0;
    gun.h = 0;
    player.layer = 1;
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
    dark1.scale = 2;

    effects_start(dark1, player);
    controls(player);
    difficulty = 0;
    map = json[json.info[difficulty]][0];
    map_create();
    setTimeout(() => {
        musicLevelLoad(map.song_main);
    }, 1000);
}

//До загрузки
export function preload() {
    json = loadJSON("./map.json");
    //background(canvas.toDataURL())
    light = loadImage("./img/light.png");
    light1 = loadImage("./img/light1.png");
    font = loadFont("./fonts/typewriter.ttf");
    
}

export function windowResized() {
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
        player.emojis = {
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

let rotate1;
let timer_bullets;
export function draw() {
    if (backgroundMap.img != undefined) {
        imageMode(CORNERS);
        background(images[backgroundMap.img - 1]);
    } else {
        background(backgroundMap);
        if (backgroundMap[0] < 155 && backgroundMap[1] < 155 && backgroundMap[2] < 155) {
            bullets.stroke = bullets.color = "rgb(135, 194, 212)";
        } else {
            bullets.stroke = bullets.color = "rgb(79, 89, 176)";
        }
    }
    gun.x = player.x;
    gun.y = player.y;
    gun.rotateTowards(mouse, 0.1, 0);
    //При нажатие кнопки мыши и при наличие оружия
    if (mouse.pressing() && gun.visible) {
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
        gun.mirror.x = true;
        gun.mirror.y = false;
        rotate1 = -150;
    } else {
        gun.mirror.x = true;
        gun.mirror.y = true;
        rotate1 = 150;
    }
    effects_draw(dark1, map.levels[random_level]);
    p5controls(player, map.levels[random_level]);
    tile_functional(player, map, json, difficulty, gun, bullets);
    cameraPosition(camera, player, map, canvas, number_level);
    //GUI
    push();
    textFont(font);
    textSize(24);
    fill(0, 0, 0);
    rect(4, 2, 300, 55);
    fill(255, 255, 255);
    if (panelMusicEnable) {
        fill(0, 0, 0);
        rect(canvas.w - 550, 10, 500, 55);
        fill(255, 255, 255);
        text("Now playing music: " + map.song_main, canvas.w - 500, 40);
    }
    date = new Date();
    try {
        if (map.levels.length <= 1) {
            text(map.title + " Deaths: " + scoreDeaths, 10, 20);
        } else {
            text(map.title + " " + map.levels.length + " Deaths: " + scoreDeaths, 10, 20);
        }
        text(date.toLocaleTimeString() + " " + date.toLocaleDateString(), 10, 40);
        if (boss.length != 0) {
            fill(255, 255, 255);
            textFont("Arial");
            let text1 = [];
            for (let i = 0; i < boss[0].health / 10; i++) {
                text1.push("❤️");
            }
            if (playerTextdefult == "😋") {
                text(" BOSS of the GYM: " + text1.join(""), 4, 90);
            } else if (playerTextdefult == "☝️🤓ᅟ") {
                text(" Bully: " + text1.join(""), 4, 90);
            } else {
                text(" BOSS: " + text1.join(""), 4, 90);
            }
        }
    } catch (err) {
        text(err + " " + "♾️", 10, 20);
    }

    pop();
}

//Создание и перезапуск уровня
export function map_create(restart_level, death) {
    chancePlayerSpeed(3);
    
    background(0);
    tiles.removeAll();
    objects.removeAll();
    boss_arm.removeAll();
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
    player.rotationLock = map.levels[random_level].rotationLock;
    if (map.player_ball) {
        player.diameter = 30;
    } else {
        player.w = 38;
        player.h = 38;
    }
    if (map.levels[random_level].win != undefined) {
        if (map.levels[random_level].win == "gun") {
            win.text = "🔫";
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
        win.text = "🔫";
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
    checkTiles(map.levels[random_level].map, death);
    try {
        if (death == "fall") {
            if (map.fall_spawn && spawns.length != 0) {
                player.x = spawns[getRandomInt(0, spawns.length)].x;
                player.y = 0;
            } else if (spawns.length == 0) {
                player.y = 0;
                player_spawn.active = true;
                player_spawn.x = player.x;
                player_spawn.y = player.y;
            } else {
                player.y = 0;
            }
        } else {
            player.x = spawns[getRandomInt(0, spawns.length)].x;
            player.y = spawns[getRandomInt(0, spawns.length)].y;
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