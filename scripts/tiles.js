import { boss_1, hit_boss } from "./boss.js";
import { shakeCamera } from "./camera.js";
import { god_mode } from "./controls.js";
import {
    number_level,
    map_create,
    font,
    playerSetTextDefult,
    timer1,
    player,
    bullets,
} from "./game.js";
import { LoadSoundplayer, musicLevelLoad, musicLevelStop } from "./loadF.js";
import { getRandomInt } from "./utils.js";
export let tiles,
    objects,
    spawns,
    emoji,
    alphabet_letters,
    blocks,
    cubes,
    spikes,
    wall,
    jumping,
    speedRight,
    speedLeft,
    boss,
    boss_arm,
    robots,
    robots_fly,
    die,
    fall,
    fall_barrier,
    trap,
    laser_traps,
    lasers,
    button,
    fake,
    win;
export let win_next = false,
    slowmotion = false;
export let scoreDeaths = 0,
    fall_barrier_save;
const alphabetLang =
    "abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё";
let alphabet = (alphabetLang + alphabetLang.toUpperCase()).split("");
export let camera_object;

export function setup_tiles() {
    tiles = new Group();
    tiles.w = 50;
    tiles.h = 50;

    alphabet_letters = new tiles.Group();
    alphabet.forEach((letter) => {
        let lettero = new alphabet_letters.Group();
        lettero.type = "letter";
        lettero.collider = "s";
        lettero.health = 100;
        lettero.color = `rgba(0,0,0,0)`;
        lettero.stroke = `rgba(0,0,0,0)`;
        lettero.w = 20;
        lettero.h = 20;
        lettero.textSize = 40;
        lettero.tile = "";
        lettero.text = letter;
        if (
            letter == "e" ||
            letter == "o" ||
            letter == "c" ||
            letter == "q" ||
            letter == "о" ||
            letter == "с" ||
            letter == "р" ||
            letter == "э" ||
            letter == "е"
        ) {
            lettero.diameter = 20;
        }
        if (letter == "i" || letter == "l") {
            lettero.w = 10;
        }
    });

    objects = new Group();
    objects.w = 50;
    objects.h = 50;

    spawns = new tiles.Group();
    spawns.collider = "n";
    spawns.visible = false;
    spawns.tile = "";

    emoji = new tiles.Group();
    emoji.collider = "n";
    emoji.diameter = 10;
    emoji.textSize = 32;
    emoji.color = `rgba(0,0,0,0)`;
    emoji.stroke = `rgba(0,0,0,0)`;
    emoji.text = "�";
    emoji.tile = "";

    blocks = new tiles.Group();
    blocks.collider = "s";
    blocks.color = "black";
    blocks.tile = "";

    cubes = new objects.Group();
    cubes.collider = "d";
    cubes.active = true;
    cubes.textSize = 32;
    cubes.w = 30;
    cubes.h = 30;
    cubes.text = "🔲";
    cubes.tile = "";

    spikes = new tiles.Group();
    spikes.collider = "s";
    // spikes.img = './img/spike.png';
    spikes.textSize = 42;
    spikes.text = "🗻";
    spikes.color = "rgba(0,0,0,0)";
    spikes.stroke = "rgba(0,0,0,0)";
    spikes.w = 30;
    spikes.h = 30;
    spikes.tile = "";

    wall = new tiles.Group();
    wall.collider = "static";
    wall.color = "rgb(155,155,155)";
    wall.stroke = "gray";
    wall.tile = "";

    jumping = new tiles.Group();
    jumping.collider = "s";
    jumping.textSize = 42;
    jumping.text = "⏏️";
    jumping.w = 45;
    jumping.h = 42;
    jumping.tile = "";

    speedRight = new tiles.Group();
    speedRight.collider = "s";
    speedRight.textSize = 42;
    speedRight.text = "▶️";
    speedRight.w = 45;
    speedRight.h = 42;
    speedRight.tile = "";

    speedLeft = new tiles.Group();
    speedLeft.collider = "s";
    speedLeft.textSize = 42;
    speedLeft.text = "◀️";
    speedLeft.w = 45;
    speedLeft.h = 42;
    speedLeft.tile = "";

    boss = new objects.Group();
    boss.collider = "k";
    boss.textSize = 128;
    boss.diameter = 90;
    boss.health = 120;
    boss.text = "😈";
    boss.tile = "";
    boss.death = false;
    boss_1();

    boss_arm = new Group();

    robots = new objects.Group();
    robots.collider = "d";
    robots.img = "./img/robot.png";
    robots.w = 40;
    robots.h = 40;
    robots.tile = "";
    robots.health = 30;
    // move_robot()

    robots_fly = new objects.Group();
    robots_fly.collider = "k";
    // robots_fly.img = './img/fly_robot.png';
    robots_fly.textSize = 35;
    robots_fly.text = "💿🧿💿";
    robots_fly.diameter = 30;
    robots_fly.tile = "";
    robots_fly.health = 50;
    // move_robot_fly()

    die = new tiles.Group();
    die.collider = "s";
    die.color = "purple";
    die.tile = "";

    fall = new tiles.Group();
    fall.collider = "s";
    fall.color = blocks.color;
    fall.tile = "";

    fall_barrier = new tiles.Group();
    fall_barrier.collider = "n";
    fall_barrier.d = 0;
    fall_barrier.tile = "";

    trap = new tiles.Group();
    trap.collider = "s";
    trap.color = blocks.color;
    trap.tile = "";

    laser_traps = new tiles.Group();
    laser_traps.active = true;
    laser_traps.collider = "s";
    laser_traps.color = blocks.color;
    laser_traps.tile = "";

    lasers = new Group();
    lasers.collider = "k";
    lasers.color = "red";
    lasers.stroke = "red";

    button = new tiles.Group();
    button.collider = "s";
    button.textSize = 32;
    button.text = "🕹️";
    button.diameter = 20;
    button.tile = "";

    fake = new tiles.Group();
    fake.collider = "n";
    fake.color = wall.color;
    fake.stroke = wall.stroke;
    fake.w = 50;
    fake.h = 50;
    fake.tile = "";

    win = new tiles.Group();
    win.collider = "d";
    // win.img = './img/win_block.png';
    win.color = win.stroke = "rgba(0,0,0,0)";
    win.textSize = 50;
    win.text = "✅";
    win.w = 50;
    win.h = 50;
    win.tile = "";
}

//Движение роботов
async function move_robot() {
    await robots.moveTo(player[0].x - 10, player[0].y - 20, 2);
    await delay(200);
    await robots.moveTo(player[0].x, player[0].y, 2);
    await delay(200);
    move_robot();
}

//Движение ультра-роботов
async function move_ultra_robot() {
    await robots.moveTo(player[0].x - 10, player[0].y, 2);
    await delay(200);
    await robots.moveTo(player[0].x, player[0].y, 5);
    await delay(500);
    move_robot();
}

//Движение летающих роботов
async function move_robot_fly() {
    await robots_fly.moveTo(player[0].x, player[0].y, 5);
    await delay(100);
    move_robot_fly();
}

//Движение летающих ультра-роботов
async function move_ultra_robot_fly() {
    await robots_fly.moveTo(player[0].x, player[0].y / 2, 3);
    await delay(200);
    await robots_fly.moveTo(player[0].x, player[0].y * 1.2, 10);
    await delay(500);
    move_robot_fly();
}

export function tile_functional(player, map, json, difficulty, gun, bullets) {
    player[0].collides(alphabet_letters, (player, letter) => {
        if (letter.type == "letter" && letter.collider == "static") {
            letter.health -= getRandomInt(0, 50);
        }
    });

    bullets.collides(alphabet_letters, (b, letter) => {
        if (letter.type == "letter" && letter.collider == "static") {
            letter.health -= getRandomInt(0, 80);
        }
    });

    alphabet_letters.forEach((letter) => {
        if (
            letter.type == "letter" &&
            letter.collider == "static" &&
            letter.health <= 0
        ) {
            letter.collider = "d";
            letter.textColor = "rgb(100,100,100)";
            letter.life = getRandomInt(1500, 1560);
        }
    });

    //При косания игрока к выигрышу
    if (player[0].collides(win) && !win_next) {
        if (
            map.win == "none" ||
            (map.levels[number_level].win != undefined &&
                map.levels[number_level].win == "none")
        ) {
            if (map.one_level == true) {
                map.levels.splice(0, map.levels.length);
            } else {
                map.levels.splice(number_level, 1);
            }
            win.text = "✅";
            win.collider = "d";
            win.visible = true;
            win.w = 50;
            win.h = 50;
            win_next = slowmotion = false;
            map_create("none");
            player[0].rotation = 0;
        } else {
            player[0].text = player[0].emojis.win;
            player[0].color = player[0].emojis.win_color;
            player[0].death = false;
            clearTimeout(timer1);
            win_next = slowmotion = true;
            if (map.levels[number_level].win != undefined) {
                if (map.levels[number_level].win == "normal") {
                    win.text = "✔️";
                    LoadSoundplayer("/win.");
                } else {
                    win.visible = false;
                    LoadSoundplayer("/win_gun.");
                }
            } else {
                if (map.win == "normal"||map.win == undefined) {
                    win.text = "✔️";
                    LoadSoundplayer("/win.");
                } else {
                    win.visible = false;
                    LoadSoundplayer("/win_gun.");
                }
            }
            win.w = 1;
            win.h = 1;
            setTimeout(() => {
                playerSetTextDefult(false);
                if (json.info[difficulty] == "boss") {
                    playerSetTextDefult(false, true);
                }
                if (map.one_level == true) {
                    map.levels.splice(0, map.levels.length);
                } else {
                    map.levels.splice(number_level, 1);
                }
                win.text = "✅";
                win.collider = "d";
                win.visible = true;
                win.w = 50;
                win.h = 50;
                win_next = slowmotion = false;
                map_create("none");
                player[0].rotation = 0;
            }, 1000);
        }
    }
    if (slowmotion) {
        world.step(1 / 240);
    }

    if (win_next) {
        if (json.info[difficulty] == "boss") {
            background(0, 0, 0, 255);
            player[0].text = player[0].emojis.win_glitch;
            player[0].color = player[0].emojis.win_color;
        } else {
            background(0, 255, 0, 10);
        }
    }

    //При косания игрока к шипам, летающим или просто роботов. При условии, что игрок не прошёл уровень
    if ((player[0].collides(spikes) ||player[0].overlaps(lasers) ||player[0].collides(robots) ||player[0].collides(robots_fly)) &&player[0].visible &&!win_next) {
        LoadSoundplayer("/dead.");
        if (!map.random_level_after_die) {
            musicLevelStop();
        }
        let skeleton = new objects.Sprite(player[0].x, player[0].y);
        skeleton.collider = "d";
        skeleton.color = "white";
        skeleton.stroke = "white";
        skeleton.textSize = 26;
        skeleton.text = "💀";
        skeleton.bounciness = 2;
        skeleton.direction = -player[0].rotation;
        skeleton.speed = Math.abs(player[0].velocity.x + player[0].velocity.y);
        skeleton.layer = 1;
        skeleton.diameter = 20;
        camera_object = skeleton;
        let gun_weapon = new objects.Sprite(gun.x, gun.y);
        gun_weapon.collider = "d";
        gun_weapon.color = "white";
        gun_weapon.stroke = "white";
        gun_weapon.textSize = 32;
        gun_weapon.text = "🔫";
        gun_weapon.bounciness = 2;
        skeleton.direction = -gun.rotation;
        skeleton.speed = 10;
        gun_weapon.layer = 1;
        gun_weapon.diameter = 10;
        if (map.levels[number_level].gun_enable != undefined) {
            gun_weapon.visible = map.levels[number_level].gun_enable;
        } else {
            gun_weapon.visible = map.gun_enable;
        }
        player[0].collider = "n";
        player[0].death = true;
        player[0].visible = false;
        gun.visible = false;
        slowmotion = true;
        setTimeout(() => {
            player[0].collider = "d";
            player[0].death = false;
            camera_object = undefined;
            if (map.enable_scoreDeath) {
                scoreDeaths++;
            } else if (map.enable_scoreDeath == undefined) {
                scoreDeaths++;
            }
            player[0].sleeping = true;
            player[0].visible = true;
            player[0].rotation = 0;
            slowmotion = false;
            if (map.random_level_after_die) {
                map_create("none", "spike");
            } else {
                map_create("level", "spike");
            }
        }, 1500);
    }

    if (player[0].collides(boss_arm)) {
        LoadSoundplayer("/dead.");
        if (!map.random_level_after_die) {
            musicLevelStop();
        }
        let skeleton = new objects.Sprite(player[0].x, player[0].y);
        skeleton.collider = "d";
        skeleton.color = "white";
        skeleton.stroke = "white";
        skeleton.textSize = 26;
        skeleton.text = "💀";
        skeleton.bounciness = 2;
        skeleton.direction = -player[0].rotation;
        skeleton.speed = Math.abs(player[0].velocity.x + player[0].velocity.y);
        skeleton.layer = 1;
        skeleton.diameter = 20;
        camera_object = skeleton;
        let gun_weapon = new objects.Sprite(gun.x, gun.y);
        gun_weapon.collider = "d";
        gun_weapon.color = "white";
        gun_weapon.stroke = "white";
        gun_weapon.textSize = 32;
        gun_weapon.text = "🔫";
        gun_weapon.bounciness = 2;
        skeleton.direction = -gun.rotation;
        skeleton.speed = 10;
        gun_weapon.layer = 1;
        gun_weapon.diameter = 10;
        if (boss[0] != undefined) {
            boss[0].text = "👹";
        }
        if (map.levels[number_level].gun_enable != undefined) {
            gun_weapon.visible = map.levels[number_level].gun_enable;
        } else {
            gun_weapon.visible = map.gun_enable;
        }
        player[0].collider = "n";
        player[0].death = true;
        player[0].visible = false;
        gun.visible = false;
        slowmotion = true;
        setTimeout(() => {
        player[0].collider = "d";
        player[0].death = false;
        player[0].sleeping = true;
        player[0].visible = true;
        player[0].rotation = 0;
        slowmotion = false;
        camera_object = undefined;
        scoreDeaths++;
        map_create("map");
        }, 1500);
    }

    //При падения игрока к границам canvas
    fall_barrier.forEach((element) => {
        fall_barrier_save = element;
        if (player[0].y > element.y && !god_mode) {
            player.text = player.emojis.schock;
            player.color = player.emojis.schock_color;
            playerSetTextDefult(true);
            player[0].rotation = 0;
            player[0].sleeping = true;
            player[0].velocity.y = 0.001;
            if (map.next_level_after_fall && map.levels.length != 1) {
                map.levels.splice(number_level, 1);
            }
            if (map.random_level_after_die) {
                map_create("none", "fall");
            }
            map_create("level", "fall");
            if (!map.random_level_after_die || map.enable_scoreDeath) {
                scoreDeaths++;
            }
        }
    });

    if (
        player[0].y > fall_barrier_save.y &&
        fall_barrier.length == 0 &&
        !god_mode
    ) {
        player[0].text = player[0].emojis.schock;
        player[0].color = player[0].emojis.schock_color;
        playerSetTextDefult(true);
        player[0].rotation = 0;
        player[0].sleeping = true;
        player[0].velocity.y = 0.001;
        if (map.next_level_after_fall && map.levels.length != 1) {
            map.levels.splice(number_level, 1);
        }
        if (map.random_level_after_die) {
            map_create("none", "fall");
        }
        map_create("level", "fall");
        if (!map.random_level_after_die || map.enable_scoreDeath) {
            scoreDeaths++;
        }
    }

    fall_barrier.forEach((element) => {
        win.forEach(win1 => {
            if (win1.y>element.y) {
                map_create("level", "");
            }
        });
    });

    //При косания игрока к смертельному блок или при нажатии кнопки "/". При условии, что игрок не прошёл уровень
    if ((player[0].colliding(die) || kb.presses("/")) && !win_next) {
        LoadSoundplayer("/dead.");
        musicLevelLoad(json.song_die);
        textFont(font);
        for (let i = 0; i < random(10, 100); i++) {
            textSize(random(16, 64));
            fill(random(120, 255));
            text(
                "SyntaxError:player is not defined",
                random(0, canvas.w),
                random(0, canvas.h)
            );
            text(
                "SyntaxError: purple destroy player forever ",
                random(0, canvas.w),
                random(0, canvas.h)
            );
            text(
                "Uncaught SyntaxError: 🤚😨✋ ",
                random(0, canvas.w),
                random(0, canvas.h)
            );
        }
        textSize(64);
        fill(blocks.color);
        text("Deaths:" + scoreDeaths, canvas.w / 15, canvas.h / 5);
        text("The restart of the site", canvas.w / 15, canvas.h / 3);
        text("will start in 5 minutes", canvas.w / 15, canvas.h / 2);
        setTimeout(() => {
            location.reload();
        }, 50000);
        player[0].text = " ";
        throw new SyntaxError("🤚😨✋");
    }

    //При косания игрока к прыгующему блоку
    player[0].collides(jumping, (player1, jump) => {
        if (player1.y + player1.h < jump.y) {
            LoadSoundplayer("/jump_block.");
            shakeCamera(200, 1);
            player[0].vel.y = -10;
            player[0].text = player[0].emojis.schock;
            player[0].color = player[0].emojis.schock_color;
            playerSetTextDefult(true);
            jump.text = "⏫";
            setTimeout(() => {
                jump.text = "⏏️";
            }, 200);
        }
        if (player1.y > jump.y + jump.h) {
            player[0].vel.y = 10;
            LoadSoundplayer("/jump_block.");
            shakeCamera(200, 1);
        }
    });

    //При косания игрока к ускоренному вправо блоку
    player[0].collides(speedRight, (player1, speed1) => {
        if (player[0].x >= speed1.x) {
            player[0].vel.x = 12;
            LoadSoundplayer("/jump_block.");
            shakeCamera(200, 1);
            player[0].text = player[0].emojis.schock;
            player[0].color = player[0].emojis.schock_color;
            playerSetTextDefult(true);
            player[0].cooldown = true;
            setTimeout(() => {
                player[0].cooldown = false;
            }, 1000);
            speed1.text = "⏩";
            setTimeout(() => {
                speed1.text = "▶️";
            }, 200);
        }
    });

    //При косания игрока к ускоренному влево блоку
    player[0].collides(speedLeft, (player1, speed1) => {
        if (player[0].x <= speed1.x) {
            player[0].cooldown = true;
            LoadSoundplayer("/jump_block.");
            shakeCamera(200, 1);
            player[0].vel.x = -12;
            player[0].text = player[0].emojis.schock;
            player[0].color = player[0].emojis.schock_color;
            playerSetTextDefult(true);
            setTimeout(() => {
                player[0].cooldown = false;
            }, 1000);
            speed1.text = "⏪";
            setTimeout(() => {
                speed1.text = "◀️";
            }, 200);
        }
    });

    //При косания игрока к сломанному блоку
    player[0].collides(fall, (player, fall) => {
        if (fall.collider == "static") {
            setTimeout(() => {
                LoadSoundplayer("/trap.");
                fall.collider = "n";
                fall.velocity.y = 2;
                fall.life = 20;
            }, 20);
        }
    });

    //При косания игрока к ловушке
    player[0].collides(trap, (player, trap) => {
        setTimeout(() => {
            LoadSoundplayer("/trap.");
            let spike_trap = new spikes.Sprite();
            spike_trap.x = trap.x;
            spike_trap.y = trap.y - 30;
            spike_trap.textSize = 24;
            spike_trap.collider = "s";
            spike_trap.life = 30;
            spike_trap.layer = -1;
        }, 350);
    });

    robots.forEach((robot) => {
        let distance = dist(player[0].x, player[0].y, robot.x, robot.y);
        if (distance < 70) {
            player[0].text = player[0].emojis.unruhe[2];
            player[0].color = player[0].emojis.unruhe_color[2];
        } else if (distance < 80) {
            player[0].text = player[0].emojis.unruhe[1];
            player[0].color = player[0].emojis.unruhe_color[1];
        } else if (distance < 150) {
            player[0].text = player[0].emojis.unruhe[0];
            player[0].color = player[0].emojis.unruhe_color[0];
        }
        playerSetTextDefult(true);
    });

    robots_fly.forEach((robot) => {
        let distance = dist(player[0].x, player[0].y, robot.x, robot.y);
        if (distance < 70) {
            player[0].text = player[0].emojis.unruhe[2];
            player[0].color = player[0].emojis.unruhe_color[2];
        } else if (distance < 80) {
            player[0].text = player[0].emojis.unruhe[1];
            player[0].color = player[0].emojis.unruhe_color[1];
        } else if (distance < 150) {
            player[0].text = player[0].emojis.unruhe[0];
            player[0].color = player[0].emojis.unruhe_color[0];
        }
        playerSetTextDefult(true);
    });

    boss_arm.forEach((arm) => {
        let distance = dist(player[0].x, player[0].y, arm.x, arm.y);
        if (distance < 70) {
            player[0].text = player[0].emojis.unruhe[2];
            player[0].color = player[0].emojis.unruhe_color[2];
        } else if (distance < 80) {
            player[0].text = player[0].emojis.unruhe[1];
            player[0].color = player[0].emojis.unruhe_color[1];
        } else if (distance < 150) {
            player[0].text = player[0].emojis.unruhe[0];
            player[0].color = player[0].emojis.unruhe_color[0];
        }
        playerSetTextDefult(true);
    });

    laser_traps.forEach((laser_trap) => {
        if (laser_trap.active) {
            setTimeout(() => {
                LoadSoundplayer("/laser.");
            }, 2000);
            if (lasers.length < 10) {
                let laser = new lasers.Sprite();
                laser.direction = -90;
                laser.speed = 10;
                laser.life = 10;
                laser.x = laser_trap.x;
                laser.y = laser_trap.y - laser_trap.w - 1;
                laser.w = 1;
            }
        }
    });

    cubes.forEach((cube) => {
        let distance = dist(player[0].x, player[0].y, mouse.x, mouse.y);
        if (cube.mouse.pressing() && distance < 250) {
            cube.x = mouse.x;
            cube.y = mouse.y;
            cube.sleeping = true;
            cube.collider = "d";
            cube.text = "🔲";
            cube.active = true;
        } else {
            if (
                cube.collider == "dynamic" &&
                cube.colliding(tiles) &&
                !cube.colliding(jumping) &&
                !cube.colliding(speedRight) &&
                !cube.colliding(speedLeft)
            ) {
                setTimeout(() => {
                    cube.collider = "k";
                    cube.sleeping = true;
                    cube.active = false;
                    cube.text = "⏹️";
                }, 500);
            }
        }
    });
    if (boss[0] != undefined) {
        bullets.overlaps(boss[0], hit_boss);
    }
}

export function load_tiles(level) {
    for (let i = 0; i < alphabet_letters.subgroups.length; i++) {
        alphabet_letters.subgroups[i].tile = alphabet[i];
    }
    blocks.tile = level.tiles.block;
    wall.tile = level.tiles.wall;
    spawns.tile = level.tiles.spawn;
    emoji.tile = level.tiles.emoji;
    win.tile = level.tiles.win;
    cubes.tile = level.tiles.cube;
    fall_barrier.tile = level.tiles.fall_barrier;
    jumping.tile = level.tiles.jump_block;
    spikes.tile = level.tiles.spike;
    speedRight.tile = level.tiles.speed_right_block;
    robots.tile = level.tiles.robot;
    speedLeft.tile = level.tiles.speed_left_block;
    robots_fly.tile = level.tiles.robot_fly;
    boss.tile = level.tiles.boss;
    fall.tile = level.tiles.fall_block;
    laser_traps.tile = level.tiles.laser_trap;
    trap.tile = level.tiles.trap_block;
    button.tile = level.tiles.button;
    fake.tile = level.tiles.fake_block;
    die.tile = level.tiles.die_block;
}

export function chanceColorTiles(level) {
    blocks.color = blocks.stroke = "black";
    wall.color = wall.stroke = "gray";
    if (level.color != undefined) {
        blocks.color = blocks.stroke = level.color.blocks;
        wall.color = wall.stroke = level.color.walls;
    }
    tiles.forEach((tile, index) => {
        if (
            level.tile_option != undefined &&
            level.tile_option[index + 1] != undefined &&
            level.tile_option[index + 1].img == undefined
        ) {
            if (tile.text != "" && tile.text != undefined) {
                tile.textColor = level.tile_option[index + 1];
            } else {
                tile.color = level.tile_option[index + 1];
                tile.stroke = level.tile_option[index + 1];
            }
        }
    });
}
