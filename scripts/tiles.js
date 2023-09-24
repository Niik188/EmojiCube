import { cameraPosition, shakeCamera } from "./camera.js";
import { god_mode } from "./controls.js";
import { number_level, map_create, font, playerSetTextDefult, timer1, player, bullets} from "./game.js";
import { LoadSoundplayer, musicLevelLoad } from "./loadF.js";
import { getRandomInt } from "./utils.js";
export let tiles,objects,spawns,emoji,alphabet_letters,blocks,cubes,spikes,wall,jumping,speedRight,speedLeft,boss,
        boss_arm,robots,robots_fly,die,fall,fall_barrier,trap,laser_traps,lasers,button,fake,win;
export let win_next = false, slowmotion = false;
export let scoreDeaths = 0, fall_barrier_save;
const alphabetLang = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'
let alphabet = (alphabetLang + alphabetLang.toUpperCase()).split('');
export function setup_tiles() {
    tiles = new Group()
    tiles.w = 50;
    tiles.h = 50;

    objects = new Group()
    objects.w = 50;
    objects.h = 50;

    spawns = new tiles.Group()
    spawns.collider = 'n'
    spawns.visible = false
    spawns.tile = ''

    emoji = new tiles.Group()
    emoji.collider = 'n'
    emoji.diameter = 10
    emoji.textSize = 32
    emoji.color = `rgba(0,0,0,0)`;
    emoji.stroke = `rgba(0,0,0,0)`;
    emoji.text = '�'
    emoji.tile = ''

    blocks = new tiles.Group();
    blocks.collider = 's';
    blocks.color = 'black';
    blocks.tile = '';

    cubes = new objects.Group();
    cubes.collider = 'd'
    cubes.active = true
    cubes.textSize = 32
    cubes.w = 30;
    cubes.h = 30;
    cubes.text = '🔲'
    cubes.tile = '';

    spikes = new tiles.Group();
    spikes.collider = 's';
    // spikes.img = './img/spike.png';
    spikes.textSize = 42
    spikes.text = '🗻'
    spikes.color = 'rgba(0,0,0,0)'
    spikes.stroke = 'rgba(0,0,0,0)'
    spikes.w = 30;
    spikes.h = 30;
    spikes.tile = '';

    wall = new tiles.Group();
    wall.collider = 'static';
    wall.color = 'rgb(155,155,155)';
    wall.stroke = 'gray';
    wall.tile = '';

    jumping = new tiles.Group();
    jumping.collider = 's';
    jumping.textSize = 42
    jumping.text = '⏏️'
    jumping.w = 45;
    jumping.h = 42;
    jumping.tile = '';

    speedRight = new tiles.Group();
    speedRight.collider = 's';
    speedRight.textSize = 42
    speedRight.text = '▶️'
    speedRight.w = 45;
    speedRight.h = 42;
    speedRight.tile = '';

    speedLeft = new tiles.Group();
    speedLeft.collider = 's';
    speedLeft.textSize = 42
    speedLeft.text = '◀️'
    speedLeft.w = 45;
    speedLeft.h = 42;
    speedLeft.tile = '';

    boss = new objects.Group();
    boss.collider = 'k'
    boss.textSize = 128
    boss.health = 120
    boss.text = '😈'
    boss.tile = ''
    boss_1()

    boss_arm = new spikes.Group()

    robots = new objects.Group();
    robots.collider = 'd';
    robots.img = './img/robot.png';
    robots.w = 40;
    robots.h = 40;
    robots.tile = '';
    robots.health = 30
    // move_robot()

    robots_fly = new objects.Group();
    robots_fly.collider = 'k';
    // robots_fly.img = './img/fly_robot.png';
    robots_fly.textSize = 35
    robots_fly.text = '💿🧿💿'
    robots_fly.diameter = 30;
    robots_fly.tile = '';
    robots_fly.health = 50
    // move_robot_fly()

    die = new tiles.Group();
    die.collider = 's';
    die.color = 'purple';
    die.tile = '';

    fall = new tiles.Group();
    fall.collider = 's';
    fall.color = blocks.color
    fall.tile = '';

    fall_barrier = new tiles.Group();
    fall_barrier.collider = 'n';
    fall_barrier.d = 0
    fall_barrier.tile = '';

    trap = new tiles.Group();
    trap.collider = 's';
    trap.color = blocks.color
    trap.tile = "";

    laser_traps = new tiles.Group()
    laser_traps.active = true
    laser_traps.collider = 's'
    laser_traps.color = blocks.color
    laser_traps.tile = '';

    lasers = new Group()
    lasers.collider = 'k'
    lasers.color = 'red'
    lasers.stroke = 'red'

    button = new tiles.Group()
    button.collider = 's'
    button.textSize = 32
    button.text = '🕹️'
    button.diameter = 20
    button.tile = ''

    fake = new tiles.Group();
    fake.collider = 'n';
    fake.color = wall.color
    fake.stroke = wall.stroke
    fake.w = 50;
    fake.h = 50;
    fake.tile = '';

    win = new tiles.Group();
    win.collider = 'd';
    // win.img = './img/win_block.png';
    win.textSize = 50
    win.text = '✅'
    win.w = 50;
    win.h = 50;
    win.tile = '';
}

//Движение роботов
async function move_robot() {
    await robots.moveTo(player.x - 10, player.y - 20, 2);
    await delay(200);
    await robots.moveTo(player.x, player.y, 2);
    await delay(200);
    move_robot()
}

//Движение ультра-роботов
async function move_ultra_robot() {
    await robots.moveTo(player.x - 10, player.y, 2);
    await delay(200);
    await robots.moveTo(player.x, player.y, 5);
    await delay(500);
    move_robot()
}

//Движение летающих роботов
async function move_robot_fly() {
    await robots_fly.moveTo(player.x, player.y, 5);
    await delay(100);
    move_robot_fly()
}

//Движение летающих ультра-роботов
async function move_ultra_robot_fly() {
    await robots_fly.moveTo(player.x, player.y / 2, 3);
    await delay(200);
    await robots_fly.moveTo(player.x, player.y * 1.2, 10);
    await delay(500);
    move_robot_fly()
}

export function tile_functional(player,map,json,difficulty,gun) {
    player.collides(alphabet_letters, (player, tile) => {
        if (tile.type == 'letter' && tile.collider == 'static' && getRandomInt(0, 100) == getRandomInt(0, 50)) {
            tile.collider = 'd'
            tile.textColor = 'rgb(100,100,100)'
            tile.life = getRandomInt(1500, 1560)
        }
    })
    
    //При косания игрока к выигрышу
    if (player.collides(win) && !win_next) {
        player.text = player.emojis.win
        player.color = player.emojis.win_color
        player.death = false
        clearTimeout(timer1)
        win_next = slowmotion = true
        if (!map.gun_of_win) {
            win.text = '✔️'
            LoadSoundplayer("/win.")
        } else {
            win.visible = false
            LoadSoundplayer("/win_gun.")
        }
        win.w = 1;
        win.h = 1;
        setTimeout(() => {
            playerSetTextDefult(false)
            if (json.info[difficulty] == 'boss') {
                player.text = '🙁'
            }
            if (map.one_level == true) {
                map.levels.splice(0, map.levels.length);
            } else {
                map.levels.splice(number_level, 1)
            }
            win.text = '✅'
            win.collider = 'd'
            win.visible = true
            win.w = 50;
            win.h = 50;
            win_next = slowmotion = false
            map_create(false)
            player.rotation = 0
        }, 1000);
    }
    if (slowmotion) {
        world.step(1 / 240);
    }

    if (win_next) {
        if (json.info[difficulty] == 'boss') {
            background(0, 0, 0, 255)
            player.text = '😰'
        } else {
            background(0, 255, 0, 10)
        }
    }

    //При косания игрока к шипам, летающим или просто роботов. При условии, что игрок не прошёл уровень
    if ((player.collides(spikes) || player.overlaps(lasers) || player.collides(robots) || player.collides(robots_fly)) && player.visible && !win_next) {
        LoadSoundplayer("/dead.")
        let skeleton = new objects.Sprite(player.x, player.y)
        skeleton.collider = 'd'
        skeleton.color = 'white';
        skeleton.stroke = 'white';
        skeleton.textSize = 26
        skeleton.text = "💀"
        skeleton.bounciness = 2
        skeleton.rotation = player.rotation
        skeleton.layer = 1;
        skeleton.diameter = 20
        skeleton.life = 100;
        let gun_weapon = new objects.Sprite(player.x, player.y)
        gun_weapon.collider = 'd'
        gun_weapon.color = 'white';
        gun_weapon.stroke = 'white';
        gun_weapon.textSize = 32
        gun_weapon.text = "🔫"
        gun_weapon.bounciness = 2
        gun_weapon.rotation = gun.rotation
        gun_weapon.layer = 1;
        gun_weapon.diameter = 10
        gun_weapon.life = 130;
        if (boss[0] != undefined) {
            boss[0].text = '👹'
        }
        if (map.levels[number_level].gun_enable != undefined) {
            gun_weapon.visible = map.levels[number_level].gun_enable
        } else {
            gun_weapon.visible = map.gun_enable
        }
        player.collider = 'n'
        player.death = true
        player.visible = false
        gun.visible = false
        slowmotion = true
        setTimeout(() => {
            player.collider = 'd'
            player.death = false
            if (map.enable_scoreDeath) {
                scoreDeaths++
            } else if (map.enable_scoreDeath == undefined) {
                scoreDeaths++
            }
            player.sleeping = true;
            player.visible = true
            player.rotation = 0
            slowmotion = false
            if (map.random_level_after_die) { map_create(false, 'spike') }
            else { map_create(true, 'spike') }
        }, 2000);
    }

    //При падения игрока к границам canvas
    fall_barrier.forEach(element => {
        fall_barrier_save = element
        if (player.y > element.y&&!god_mode) {
            player.text = player.emojis.schock
            player.color = player.emojis.schock_color
            playerSetTextDefult(true)
            player.rotation = 0
            player.sleeping = true;
            player.velocity.y = 0.001
            if (map.next_level_after_fall && map.levels.length != 1) {
                map.levels.splice(number_level, 1)
            }
            if (map.random_level_after_die) { map_create(false, 'fall') }
            map_create(true, 'fall')
            if (!map.random_level_after_die || map.enable_scoreDeath) {
                scoreDeaths++
            }
        }
    });

    if (player.y > fall_barrier_save.y && fall_barrier.length == 0&&!god_mode) {
        player.text = player.emojis.schock
        player.color = player.emojis.schock_color
        playerSetTextDefult(true)
        player.rotation = 0
        player.sleeping = true;
        player.velocity.y = 0.001
        if (map.next_level_after_fall && map.levels.length != 1) {
            map.levels.splice(number_level, 1)
        }
        if (map.random_level_after_die) { map_create(false, 'fall') }
        map_create(true, 'fall')
        if (!map.random_level_after_die || map.enable_scoreDeath) {
            scoreDeaths++
        }
    }

    //При косания игрока к смертельному блок или при нажатии кнопки "/". При условии, что игрок не прошёл уровень
    if ((player.colliding(die) || kb.presses('/')) && !win_next) {
        musicLevelLoad(json.song_die)
        textFont(font);
        for (let i = 0; i < random(10, 100); i++) {
            textSize(random(16, 64));
            fill(random(120, 255))
            text("SyntaxError:player is not defined", random(0, canvas.w), random(0, canvas.h))
            text("SyntaxError: purple destroy player forever ", random(0, canvas.w), random(0, canvas.h))
            text("Uncaught SyntaxError: 🤚😨✋ ", random(0, canvas.w), random(0, canvas.h))
        }
        textSize(64);
        fill(blocks.color)
        text("Deaths:" + scoreDeaths, canvas.w / 15, canvas.h / 5)
        text("The restart of the site", canvas.w / 15, canvas.h / 3)
        text("will start in 5 minutes", canvas.w / 15, canvas.h / 2)
        setTimeout(() => {
            location.reload();
        }, 50000);
        player.text = ' '
        throw new SyntaxError("🤚😨✋");
    }

    //При косания игрока к прыгующему блоку
    player.collides(jumping, (player1, jump) => {
        if (player1.y + player1.h < jump.y) {
            LoadSoundplayer(2)
            player.vel.y = -10
            player.text = player.emojis.schock
            player.color = player.emojis.schock_color
            playerSetTextDefult(true)
            jump.text = '⏫'
            setTimeout(() => {
                jump.text = '⏏️'
            }, 200);
        }
        if (player1.y > jump.y + jump.h) {
            player.vel.y = 10
            LoadSoundplayer(2)
        }
    })

    //При косания игрока к ускоренному вправо блоку
    player.collides(speedRight, (player1, speed1) => {
        if (player.x >= speed1.x) {
            player.vel.x = 12
            player.text = player.emojis.schock
            player.color = player.emojis.schock_color
            playerSetTextDefult(true)
            player.cooldown = true
            setTimeout(() => {
                player.cooldown = false
            }, 1000);
            speed1.text = '⏩'
            setTimeout(() => {
                speed1.text = '▶️'
            }, 200);
        }
    })

    //При косания игрока к ускоренному влево блоку
    player.collides(speedLeft, (player1, speed1) => {
        if (player.x <= speed1.x) {
        player.cooldown = true
        player.vel.x = -12
        player.text = player.emojis.schock
        player.color = player.emojis.schock_color
        playerSetTextDefult(true)
        setTimeout(() => {
            player.cooldown = false
        }, 1000);
        speed1.text = '⏪'
        setTimeout(() => {
            speed1.text = '◀️'
        }, 200)}
    })

    //При косания игрока к сломанному блоку
    player.collides(fall, (player, fall) => {
        if (fall.collider == 'static') {
            setTimeout(() => {
                fall.collider = 'd'
                fall.life = 40
            }, 500);
        }
    })

    //При косания игрока к ловушке
    player.collides(trap, (player, trap) => {
        setTimeout(() => {
            let spike_trap = new spikes.Sprite()
            spike_trap.x = trap.x
            spike_trap.y = trap.y - 30
            spike_trap.textSize = 24
            spike_trap.collider = 's'
            spike_trap.life = 30
            spike_trap.layer = -1
        }, 350);
    })
    
    robots.forEach(robot => {
        let distance = dist(player.x, player.y, robot.x, robot.y)
        if (distance < 70) {
            player.text = player.emojis.unruhe[2]
            player.color = player.emojis.unruhe_color[2]
        } else if (distance < 80) {
            player.text = player.emojis.unruhe[1]
            player.color = player.emojis.unruhe_color[1]
        } else if (distance < 150) {
            player.text = player.emojis.unruhe[0]
            player.color = player.emojis.unruhe_color[0]
        }
        playerSetTextDefult(true)
    });

    robots_fly.forEach(robot => {
        let distance = dist(player.x, player.y, robot.x, robot.y)
        if (distance < 70) {
            player.text = player.emojis.unruhe[2]
            player.color = player.emojis.unruhe_color[2]
        } else if (distance < 80) {
            player.text = player.emojis.unruhe[1]
            player.color = player.emojis.unruhe_color[1]
        } else if (distance < 150) {
            player.text = player.emojis.unruhe[0]
            player.color = player.emojis.unruhe_color[0]
        }
        playerSetTextDefult(true)
    });

    boss_arm.forEach(arm => {
        let distance = dist(player.x, player.y, arm.x, arm.y)
        if (distance < 70) {
            player.text = player.emojis.unruhe[2]
            player.color = player.emojis.unruhe_color[2]
        } else if (distance < 80) {
            player.text = player.emojis.unruhe[1]
            player.color = player.emojis.unruhe_color[1]
        } else if (distance < 150) {
            player.text = player.emojis.unruhe[0]
            player.color = player.emojis.unruhe_color[0]
        }
        playerSetTextDefult(true)
    });

    laser_traps.forEach(laser_trap => {
        if (laser_trap.active) {
            let laser = new lasers.Sprite()
            laser.direction = -90
            laser.speed = 10
            laser.life = 40
            laser.x = laser_trap.x
            laser.y = laser_trap.y - laser_trap.w - 1
            laser.w = 1
        }
    });

    cubes.forEach(cube => {
        let distance = dist(player.x, player.y, mouse.x, mouse.y)
        if (cube.mouse.pressing() && distance < 250) {
            cube.x = mouse.x; cube.y = mouse.y
            cube.sleeping = true
            cube.collider = 'd'
            cube.text = '🔲'
            cube.active = true
        } else {
            if (cube.collider == 'dynamic' && cube.colliding(tiles)
                && !cube.colliding(jumping) && !cube.colliding(speedRight) && !cube.colliding(speedLeft)) {
                setTimeout(() => {
                    cube.collider = 'k'
                    cube.sleeping = true
                    cube.active = false
                    cube.text = '⏹️'
                }, 500);
            }
        }
    });
    if (boss[0] != undefined){
        bullets.overlaps(boss[0], hit_boss);
    }
}

function hit_boss(bullet, boss1) {
    boss1.text = '🥶'
    LoadSoundplayer('hit_boss.')
    setTimeout(() => {
        boss1.text = '😈'
    }, 200);
    boss1.health -= 5
    if (boss1.health < 20) {
        let die1 = new die.Sprite(random(100, 750), boss1.y - 30)
        die1.collider = 'd'
        die1.textSize = 32
        die1.text = '🔮'
        die1.diameter = 20
        die1.life = 100
    }
    if (boss1.health <= 0) {
        let explosion = new Sprite(boss1.x, boss1.y)
        explosion.collider = 'n'
        explosion.textSize = 240
        explosion.text = '💥'
        explosion.diameter = 1
        explosion.life = 40
        explosion.layer = 1;
        let detals = new objects.Group()
        detals.collider = 'd'
        detals.textSize = 30
        detals.text = '⚙️'
        detals.bounciness = 1;
        detals.friction = 0;
        detals.diameter = 5
        detals.life = 120
        detals.layer = 1;
        for (let i = 0; i < 10; i++) {
            let del = new detals.Sprite()
            del.x = boss1.x + random(-60, 60)
            del.y = boss1.y + random(-60, 60)
        }
        if (detals != undefined) {
            new win.Sprite(boss1.x, boss1.y + 150)
        }
        boss_arm.remove()
        boss1.remove()
    }
    // bullet.remove()
}

export function boss_ready() {
    if (boss.length != 0) {
    setTimeout(() => {
        for (let i = 0; i < scoreDeaths + 2; i++) {
            let arm = new boss_arm.Sprite()
            arm.collider = 'k'
            arm.diameter = 20
            if (i == 0) {
                arm.x = boss[0].x - 150
                arm.y = boss[0].y
            }
            if (i == 1) {
                arm.x = boss[0].x + 150
                arm.y = boss[0].y
            }
            if (i == 2) {
                arm.x = boss[0].x
                arm.y = boss[0].y
            }
            if (i > 2) {
                arm.life = (scoreDeaths * 50) + (i * 2)
            }
            arm.textSize = 72
            arm.text = '🤜'
            boss_arm_1(arm)
        }
    }, 500);
    }
}

//Движение boss
async function boss_1() {
    await boss.moveTo(100, 200, 8);
    await delay(30);
    await boss.moveTo(750, 200, 8);
    await delay(30);
    boss_1()
}

//Движение boss_arm
async function boss_arm_1(arm1) {
    if (boss[0] != undefined) {
        await arm1.moveTo(boss[0].x - random(-250, 250), boss[0].y, 25);
        await delay(scoreDeaths * 100 + 200);
        await arm1.rotateTo(player, 10, 0);
        await arm1.moveTo(player.x, player.y, 20 - (boss[0].health + 30) / 8);
        shakeCamera(6)
        LoadSoundplayer('hit.')
        await delay(50);
    }
    if (boss[0] != undefined) {
        boss_arm_1(arm1)
    }
}

export function load_tiles(level) {
    blocks.tile = level.tiles.block;        wall.tile = level.tiles.wall
    spawns.tile = level.tiles.spawn;        emoji.tile = level.tiles.emoji
    win.tile = level.tiles.win;             cubes.tile = level.tiles.cube
    fall_barrier.tile = level.tiles.fall_barrier;   jumping.tile = level.tiles.jump_block
    spikes.tile = level.tiles.spike;        speedRight.tile = level.tiles.speed_right_block
    robots.tile = level.tiles.robot;        speedLeft.tile = level.tiles.speed_left_block
    robots_fly.tile = level.tiles.robot_fly;boss.tile = level.tiles.boss
    fall.tile = level.tiles.fall_block;     laser_traps.tile = level.tiles.laser_trap
    trap.tile = level.tiles.trap_block;     button.tile = level.tiles.button
    fake.tile = level.tiles.fake_block;     die.tile = level.tiles.die_block
        alphabet_letters = new tiles.Group()
        alphabet.forEach(letter => {
        let lettero = new alphabet_letters.Group();
        lettero.type = "letter"
        lettero.collider = 's';
        lettero.color = `rgba(0,0,0,0)`;
        lettero.stroke = `rgba(0,0,0,0)`;
        lettero.w = 20;
        lettero.h = 20;
        lettero.textSize = 40;
        lettero.tile = letter;
        lettero.text = letter;
        if (letter == 'e' || letter == 'o' || letter == 'c' || letter == 'q' || letter == 'о' || letter == 'с' ||
            letter == 'р' || letter == 'э' || letter == 'е') {
            lettero.diameter = 20;
        }
        if (letter == 'i' || letter == 'l') {
            lettero.w = 10;
        }
        });
    
}

export function chanceColorTiles(level) {
    blocks.color = blocks.stroke = 'black'
    wall.color = wall.stroke = 'gray'
    if (level.color != undefined) {
        blocks.color = blocks.stroke = level.color.blocks
        wall.color = wall.stroke = level.color.walls
    }
    tiles.forEach((tile,index) => {
        if (level.tile_option!=undefined
            &&level.tile_option[index+1]!=undefined
            &&level.tile_option[index+1].img==undefined) {
            if (tile.text != ''&&tile.text != undefined) {
                tile.textColor = level.tile_option[index+1]
            }else{
                tile.color = level.tile_option[index+1]
                tile.stroke = level.tile_option[index+1]
            }
        }
    });
}