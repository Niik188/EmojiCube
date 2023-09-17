let player, player_spawn = { active: false, x: 0, y: 0 };
let tiles;
let json;
let win_next = false, slowmotion = false;
let difficulty;
let map = [], backgroundMap, fall_barrier_save;
let number_level = 0, random_level = 0;
let dark1;
let dark;
let light;
let font;
const alphabetLang = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'
let alphabet = (alphabetLang + alphabetLang.toUpperCase()).split('');
let god_mode = false, pauseGame = false;
let scoreDeaths = 0, date;
let boss_arm;
let commandsGame = {
    stage: ""
};
let consoleActive = false;
let images = []

//Запуск
function setup() {
    for (let i = 0; i < json.images.length; i++) {
        if (json.images[i].indexOf(`.`) != -1) {
            img = loadImage(`./img/${json.images[i]}`)
        }else {
            img = loadImage(`./img/${json.images[i]}.${json.formatIMG}`)
        }
        if (json.images[i].indexOf(`.gif`) != -1) {
            img = loadGif(`./img/${json.images[i]}.${json.formatIMG}`)
        }
        if (json.images[i].indexOf(`dark`) != -1) {
            dark = img
            console.log("Dark is done" + dark1)
        }else{
        images.push(img)
        console.log("Image is done. Image: " + img)
        }
    }
    createCanvas('2:1', 'fullscreen');
    world.gravity.y = 10;
    player = new Sprite()
    player.health = 100
    player.textSize = 35
    player.color = '#FFC83D'
    player.stroke = 'black'
    player.text = '😐'
    player.w = 38
    player.h = 38

    gun = new Sprite()
    gun.textSize = 32
    gun.text = '🔫ㅤㅤ'
    gun.collider = 'n'
    gun.w = 0
    gun.h = 0
    player.layer = 1;
    gun.layer = 0;

    bullets = new Group()
    bullets.stroke = "rgb(199,219,255)"
    bullets.color = "rgb(199,219,255)"
    bullets.collider = 'd'
    bullets.diameter = 5
    bullets.life = 30
    bullets.layer = -1;
    bullets.speed = 50;

    tiles = new Group()
    tiles.w = 50;
    tiles.h = 50;

    objects = new Group()
    objects.w = 50;
    objects.h = 50;

    spawns = new tiles.Group()
    spawns.collider = 'n'
    spawns.visible = false
    spawns.tile = '{'

    emoji = new tiles.Group()
    emoji.collider = 'n'
    emoji.diameter = 10
    emoji.textSize = 32
    emoji.color = `rgba(0,0,0,0)`;
    emoji.stroke = `rgba(0,0,0,0)`;
    emoji.text = '�'
    emoji.tile = '~'

    alphabet_letters = new tiles.Group()
    alphabet.forEach(letter => {
        let lettero = new alphabet_letters.Group();
        lettero.type = "letter"
        lettero.debug = true
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

    blocks = new tiles.Group();
    blocks.collider = 's';
    blocks.color = 'black';
    blocks.tile = '=';

    cubes = new objects.Group();
    cubes.collider = 'd'
    cubes.active = true
    cubes.textSize = 32
    cubes.w = 30;
    cubes.h = 30;
    cubes.text = '🔲'
    cubes.tile = ',';

    spike = new tiles.Group();
    spike.collider = 's';
    spike.img = './img/spike.png';
    spike.w = 30;
    spike.h = 30;
    spike.tile = '*';

    wall = new tiles.Group();
    wall.collider = 'static';
    wall.color = 'rgb(155,155,155)';
    wall.stroke = 'gray';
    wall.tile = '|';

    jumping = new tiles.Group();
    jumping.collider = 's';
    jumping.textSize = 42
    jumping.text = '⏏️'
    jumping.w = 45;
    jumping.h = 42;
    jumping.tile = '+';

    speedRight = new tiles.Group();
    speedRight.collider = 's';
    speedRight.textSize = 42
    speedRight.text = '▶️'
    speedRight.w = 45;
    speedRight.h = 42;
    speedRight.tile = '>';

    speedLeft = new tiles.Group();
    speedLeft.collider = 's';
    speedLeft.textSize = 42
    speedLeft.text = '◀️'
    speedLeft.w = 45;
    speedLeft.h = 42;
    speedLeft.tile = '<';

    boss = new objects.Group();
    boss.collider = 'k'
    boss.textSize = 128
    boss.health = 120
    boss.text = '😈'
    boss.tile = '1'
    boss_1()

    boss_arm = new spike.Group()

    robots = new objects.Group();
    robots.collider = 'd';
    robots.img = './img/robot.png';
    robots.w = 40;
    robots.h = 40;
    robots.tile = '0';
    robots.health = 30
    move_robot()

    robots_fly = new objects.Group();
    robots_fly.collider = 'k';
    // robots_fly.img = './img/fly_robot.png';
    robots_fly.textSize = 35
    robots_fly.text = '💿🧿💿'
    robots_fly.diameter = 30;
    robots_fly.tile = '@';
    robots_fly.health = 50
    move_robot_fly()

    die = new tiles.Group();
    die.collider = 's';
    die.color = 'purple';
    die.tile = '?';

    fall = new tiles.Group();
    fall.collider = 's';
    fall.color = blocks.color
    fall.tile = '-';

    fall_barrier = new tiles.Group();
    fall_barrier.collider = 'n';
    fall_barrier.d = 0
    fall_barrier.tile = '/';

    trap = new tiles.Group();
    trap.collider = 's';
    trap.color = blocks.color
    trap.tile = "'";

    laser_traps = new tiles.Group()
    laser_traps.active = true
    laser_traps.collider = 's'
    laser_traps.color = blocks.color
    laser_traps.tile = '!';

    lasers = new Group()
    lasers.collider = 'k'
    lasers.color = 'red'
    lasers.stroke = 'red'

    button = new tiles.Group()
    button.collider = 's'
    button.textSize = 32
    button.text = '🕹️'
    button.diameter = 20
    button.tile = '#'

    fake = new tiles.Group();
    fake.collider = 'n';
    fake.color = wall.color
    fake.stroke = wall.stroke
    fake.w = 50;
    fake.h = 50;
    fake.tile = '_';

    win = new tiles.Group();
    win.collider = 'd';
    // win.img = './img/win_block.png';
    win.textSize = 50
    win.text = '✅'
    win.w = 50;
    win.h = 50;
    win.tile = ']';

    dark1 = new Sprite()
    dark1.img = dark;
    dark1.collider = 'n'
    dark1.visible = false
    dark1.scale = 10
    
    dark.mask(light);
    imageMode(CENTER);
    difficulty = 0
    map = json[json.info[difficulty]][0]
    map_create()
    if (getRandomInt(0, 10) <= 3) {
        document.title = '🥵EmojiCube😋'
    }
}
//До загрузки
function preload() {
    json = loadJSON('./map.json');
    dark = loadImage('./img/dark.png');
    //background(canvas.toDataURL())
    light = loadImage('./img/light.png');
    font = loadFont("./fonts/typewriter.ttf");
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

function windowResized(){
    setTimeout(() => {
        createCanvas('2:1', 'fullscreen');
    }, 60);
}

//Рендер
function draw() {
    if (commandsGame.stage != "") {
        consoleActive = true
        map = json[commandsGame.stage][0]
        if (!map.random_level) {
            number_level = random_level = 0
        }
        map_create()
        commandsGame.stage = ""
    }
    
    if (backgroundMap.img!=undefined) {
        imageMode(CORNERS)
        background(images[backgroundMap.img-1])
        
    }else{
        background(backgroundMap)
    }
    gun.x = player.x; gun.y = player.y
    gun.rotateTowards(mouse, 0.1, 0);
    //При нажатие кнопки мыши и при наличие оружия
    if (mouse.presses() && gun.visible) {
        delay(500);
        let bullet = new bullets.Sprite()
        if (gun.x < mouse.x) {
            bullet.x = gun.x + 10; bullet.y = gun.y;
        } else {
            bullet.x = gun.x - 10; bullet.y = gun.y;
        }

        bullet.direction = bullet.angleTo(mouse);
    }
    //Отражать оружие, когда x мыши меньше x игрока
    if (player.x < mouse.x) {
        gun.mirror.x = true;
        gun.mirror.y = false;
    } else {
        gun.mirror.x = true;
        gun.mirror.y = true;
    }

    dark1.moveTowards(mouse, 0.10);
    //Клавиши
    //Noclip
    if (kb.presses('v')) {
        player.sleeping = true;
        player.rotation = 0
        god_mode = !god_mode
        player.text = '😐'
    }

    if (!god_mode) {
        player.collider = 'd'
        allSprites.debug = false
        if (map.levels[random_level].debug_danger) {
            spike.debug = true
        }
    }

    if (god_mode) {
        player.text = '😎'
        allSprites.debug = true
        player.collider = 'n'
    }
    //Use
    if (kb.presses('e') && player.colliding(button)) {
        console.log("PLAYER USED BUTTON")
        laser_traps.forEach(laser_trap => {
            laser_trap.active = false
        });
    }
    //Restart
    if (kb.presses('r')) {
        player.rotation = 0
        map_create(true)
    }
    //Pause
    if (kb.presses('p')) {
        pauseGame = !pauseGame
        player.vel.x = 0.00000001
    }

    if (pauseGame) {
        allSprites.sleeping = true;
        background(150, 150, 150)
    } else {
        allSprites.sleeping = false;
    }

    //При косания игрока к шипам, летающим или просто роботов. При условии, что игрок не прошёл уровень
    if ((player.collides(spike) || player.overlaps(lasers) || player.collides(robots) || player.collides(robots_fly)) && player.visible && !win_next) {
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
        if (map.levels[random_level].gun_enable != undefined) {
            gun_weapon.visible = map.levels[random_level].gun_enable
        } else {
            gun_weapon.visible = map.gun_enable
        }
        player.x = 0; player.y = 0;
        player.visible = false
        gun.visible = false
        slowmotion = true
        setTimeout(() => {
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
        if (player.y > element.y) {
            player.text = '😲'
            player.rotation = 0
            player.sleeping = true;
            if (map.next_level_after_fall && map.levels.length != 1) {
                map.levels.splice(number_level, 1)
            }
            if (map.random_level_after_die) { map_create(false, 'fall') }
            map_create(true, 'fall')
            if (!map.random_level_after_die || map.enable_scoreDeath) {
                scoreDeaths++
            }
            setTimeout(() => {
                player.text = '😐'
            }, 1000);
        }
    });
    if (player.y > fall_barrier_save.y && fall_barrier.length == 0) {
        player.text = '😲'
        player.rotation = 0
        player.sleeping = true;
        if (map.next_level_after_fall && map.levels.length != 1) {
            map.levels.splice(number_level, 1)
        }
        if (map.random_level_after_die) { map_create(false, 'fall') }
        map_create(true, 'fall')
        if (!map.random_level_after_die || map.enable_scoreDeath) {
            scoreDeaths++
        }
        setTimeout(() => {
            player.text = '😐'
        }, 1000);
    }

    //При косания игрока к смертельному блок или при нажатии кнопки "/". При условии, что игрок не прошёл уровень
    if ((player.collides(die) || kb.presses('/')) && !win_next) {
        let skeleton = new Sprite(player.x, player.y)
        player.visible = false
        skeleton.collider = 'd'
        skeleton.color = 'white';
        skeleton.stroke = 'white';
        skeleton.text = "💀"
        skeleton.diameter = 5
        skeleton.layer = 1;
        skeleton.life = 50;
        // alert("💀goodbye!💀 Deaths💀:" + scoreDeaths)
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
        text("will start in 5 seconds", canvas.w / 15, canvas.h / 2)
        setTimeout(() => {
            location.reload();
        }, 5000);
        throw new SyntaxError("🤚😨✋");

    }

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
            let spikes = new spike.Sprite()
            spikes.x = trap.x
            spikes.y = trap.y - 10
            spikes.textSize = 25
            spikes.text = '🖤'
            spikes.collider = 's'
            spikes.life = 30
        }, 350);
    })

    //При косания игрока к прыгующему блоку
    player.collides(jumping, (player1, jump) => {
        if (player1.y + player1.h < jump.y) {
            player.vel.y = -10
            player.text = '😲'
            setTimeout(() => {
                player.text = '😐'
            }, 1000);
            jump.text = '⏫'
            setTimeout(() => {
                jump.text = '⏏️'
            }, 200);
        }
        if (player1.y > jump.y + jump.h) {
            player.vel.y = 10
        }


    })

    //При косания игрока к ускоренному вправо блоку
    player.collides(speedRight, (player1, speed1) => {
        player.vel.x = 8
        player.text = '😲'
        setTimeout(() => {
            player.text = '😐'
        }, 1000);
        speed1.text = '⏩'
        setTimeout(() => {
            speed1.text = '▶️'
        }, 200);
    })

    //При косания игрока к ускоренному влево блоку
    player.collides(speedLeft, (player1, speed1) => {
        player.vel.x = -8
        player.text = '😲'
        setTimeout(() => {
            player.text = '😐'
        }, 1000);
        speed1.text = '⏪'
        setTimeout(() => {
            speed1.text = '◀️'
        }, 200);
    })

    player.collides(alphabet_letters, (player, tile) => {
        if (tile.type == 'letter' && tile.collider == 'static' && getRandomInt(0, alphabet_letters.length) == 6) {
            tile.collider = 'd'
            tile.textColor = 'rgb(100,100,100)'
            tile.life = getRandomInt(1500, 1560)
        }
    })

    bullets.collides(alphabet_letters, (bullet, tile) => {
        if (tile.type == 'letter' && tile.collider == 'static' && getRandomInt(0, 10) == 6) {
            tile.collider = 'd'
            tile.textColor = 'rgb(100,100,100)'
            tile.life = getRandomInt(1500, 1560)
        }
    })


    //При косания куба лазера
    cubes.overlaps(lasers, (cube, laser) => {
        cube.drag = 10;
        cube.text = '🈲'
        cube.collider = 'd'
        setTimeout(() => {
            cube.remove()
        }, 600);
    })

    //При косания объекта на прыгующий блок
    objects.collides(jumping, (object, jump) => {
        if (object.y < jump.y) {
            object.vel.y = -10
            jump.text = '⏫'
            setTimeout(() => {
                jump.text = '⏏️'
            }, 200);
        }
        if (object.y > jump.y + jump.h) {
            object.vel.y = 10
        }
    })

    //При косания игрока к ускоренному вправо блоку
    objects.collides(speedRight, (object, speed1) => {
        object.vel.x = 10
        object.vel.y = -2
        speed1.text = '⏩'
        setTimeout(() => {
            speed1.text = '▶️'
        }, 200);
    })

    //При косания игрока к ускоренному влево блоку
    objects.collides(speedLeft, (object, speed1) => {
        object.vel.x = -10
        object.vel.y = -2
        speed1.text = '⏪'
        setTimeout(() => {
            speed1.text = '◀️'
        }, 200);
    })

    //При косания игрока к выигрышу
    if (player.collides(win) && !win_next) {
        player.text = '😄'
        win_next = slowmotion = true
        if (!map.gun_of_win) {
            win.text = '✔️'
        } else {
            win.visible = false
        }
        win.w = 1;
        win.h = 1;
        setTimeout(() => {
            player.text = '😐'
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

    //При косания пуль к роботам
    bullets.overlaps(robots_fly, hit);
    bullets.overlaps(robots, hit);
    // imageMode(CORNERS)
    // image(background1, 0, 0, canvas.w, canvas.h)
    //GUI
    push()
    textFont(font);
    textSize(24);
    fill(0, 0, 0);
    rect(4, 2, 300, 55)
    fill(255, 255, 255);
    date = new Date();
    try {

        if (map.levels.length <= 1) {
            text(map.title + " Deaths: " + scoreDeaths, 10, 20)
        } else {
            text(map.title + " " + map.levels.length + " Deaths: " + scoreDeaths, 10, 20)
        }
        text(date.toLocaleTimeString() + " " + date.toLocaleDateString(), 10, 40)
        if (boss.length != 0) {
            fill(255, 255, 255);
            textFont('Arial');
            let text1 = []
            for (let i = 0; i < boss[0].health / 10; i++) {
                text1.push('❤️')
            }
            text(" BOSS: " + text1.join(''), 4, 90)
        }
    } catch (err) {
        text(err + " " + "♾️", 10, 20)
    }
    pop()

    dark1.layer = 2;
    camera.zoom = Math.abs(canvas.w * 1.0007 - canvas.w)
    camera.x = canvas.w / 0.85 - canvas.w
    camera.y = canvas.h / 0.7 - canvas.h
    if (canvas.w < 1200) {
        camera.x = player.x
    }
    if (canvas.h < 800) {
        camera.y = player.y
    }
    if (map.levels[random_level].camera_player != undefined && player.x >= canvas.w / 3.5) {
        if (map.levels[random_level].camera_player) {
            camera.x = player.x
        }
    } else if (player.x >= canvas.w / 3.5) {
        if (map.camera_player) {
            camera.x = player.x
        }
    }


    robots_fly.forEach(robot => {
        let distance = dist(player.x, player.y, robot.x, robot.y)
        if (distance < 70) {
            player.text = '😱'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        } else if (distance < 80) {
            player.text = '😨'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        } else if (distance < 150) {
            player.text = '😟'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        }
    });

    boss_arm.forEach(arm => {
        let distance = dist(player.x, player.y, arm.x, arm.y)
        if (distance < 70) {
            player.text = '😱'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        } else if (distance < 80) {
            player.text = '😨'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        } else if (distance < 150) {
            player.text = '😟'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        }
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
    if (boss[0] != undefined) {
        bullets.overlaps(boss[0], hit_boss);
    }
    if (map.levels[random_level].effects) {
        setTimeout(() => {
            eff = new Sprite(random(-canvas.w, canvas.w), 0)
            eff.collider = 'd'
            eff.diameter = 0
            eff.mass = 0
            eff.drag = random(2, 5)
            eff.bounciness = random(0, 1);
            eff.textColor = 'rgba(0,0,0,2)'
            eff.text = '🌀'
            eff.life = random(0, 250)
        }, 6000);
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
        await delay(50);
    }
    if (boss[0] != undefined) {
        boss_arm_1(arm1)
    }
}

//Zoom в бит
setInterval(() => {
    if (map.tick) {
        camera.zoomTo(1.03)
        setTimeout(() => {
            camera.zoomTo(1)
        }, 100);
    }
}, 600);

//Урон по врагу при косания пуль к врагу
function hit(bullet, robot) {
    robot.health -= 10
    if (robot.health <= 0) {
        robot.remove()
        let explosion = new Sprite(bullet.x, bullet.y)
        explosion.collider = 'n'
        explosion.textSize = 50
        explosion.text = '💥'
        explosion.diameter = 1
        explosion.life = 10
        explosion.layer = 1;
        let detals = new objects.Group()
        detals.collider = 'd'
        detals.textSize = 30
        detals.text = '⚙️'
        detals.x = bullet.x + random(-2, 2)
        detals.y = bullet.y + random(-2, 2)
        detals.amount = 5
        detals.bounciness = 1;
        detals.friction = 0;
        detals.diameter = 5
        detals.life = 60
        detals.layer = 1;
    }
    bullet.remove()
}

function hit_boss(bullet, boss1) {
    boss1.text = '🥶'
    setTimeout(() => {
        boss1.text = '😈'
    }, 200);
    boss1.health -= 5
    if (boss1.health < 20) {
        die1 = new die.Sprite(random(100, 750), boss1.y - 30)
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
    bullet.remove()
}

//Клавиши 2
var keyState = {};
addEventListener('keydown', function (e) {
    keyState[e.key] = true;
}, true);
addEventListener('keyup', function (e) {
    keyState[e.key] = false;
    player.velocity.x = 0;
}, true);

function gameLoop() {
    if (keyState['W'] || keyState['w']) {
        if (!player.colliding(wall) && !player.colliding(jumping) && player.colliding(tiles)) {
            player.velocity.y = -5;
        }
        objects.forEach(object => {
            if (player.colliding(object) && !object.active) {
                player.velocity.y = -5;
            }
        });
        if (god_mode) {
            player.y -= 5;
        }
    }
    if (keyState['S'] || keyState['s']) {
        if (god_mode) {
            player.y += 5;
        }
    }

    if (keyState['A'] || keyState['a']) {
        player.velocity.x = -3;
        if (god_mode) {
            player.velocity.x = -5;
        }
    }
    if (keyState['D'] || keyState['d']) {
        player.velocity.x = 3;
        if (god_mode) {
            player.velocity.x = 5;
        }
    }
    if ((keyState['A'] || keyState['a']) && (keyState['D'] || keyState['d'])) {
        player.velocity.x = 0;
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}
gameLoop();

//Рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//Создание и перезапуск уровня
function map_create(restart_level, death) {
    // try {
    background(0)
    tiles.removeAll()
    objects.removeAll()
    if (map.levels.length == 0) {
        if (!consoleActive) {
            difficulty += 1
        } else {
            difficulty = 0
        }
        consoleActive = false
        map = json[json.info[difficulty]][0]
        if ((!map.random_level || map.begin_level) && (map.random_level != undefined || map.begin_level != undefined)) {
            number_level = random_level = 0
        }
        json = loadJSON('./map.json');
    }
    if ((map.random_level || map.random_level == undefined) && (!restart_level && !map.begin_level)) {
        random_level = getRandomInt(0, map.levels.length)
        while (random_level == number_level && map.levels.length != 1) {
            random_level = getRandomInt(0, map.levels.length)
        }
        number_level = random_level
    }
    if (map.levels[random_level] == map.levels[0]) {
        map.begin_level = false
    }
    player.rotationLock = map.levels[random_level].rotationLock;
    if (map.player_ball) {
        player.diameter = 30
    }
    if (map.gun_of_win) {
        win.text = '🔫'
        win.w = 10
        win.h = 10
        win.collider = 's'
    }
    if (map.levels[random_level].tile_position != undefined) {
        new Tiles(map.levels[random_level].tile, map.levels[random_level].tile_position.x, map.levels[random_level].tile_position.y, tiles.w, tiles.h);
    } else {
        new Tiles(map.levels[random_level].tile, 0, 350, tiles.w, tiles.h);
    }
    for (let i = 0; i < emoji.length; i++) {
        if (map.levels[random_level].emoji[i] != undefined) {
            emoji[i].text = map.levels[random_level].emoji[i]
        }
    }
    if (boss.length != 0) {
        setTimeout(() => {
            for (let i = 0; i < scoreDeaths + 2; i++) {
                arm = new boss_arm.Sprite()
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
    blocks.color = blocks.stroke = 'black'
    wall.color = wall.stroke = 'gray'
    if (map.levels[random_level].color != undefined) {
        blocks.color = blocks.stroke = map.levels[random_level].color.blocks
        wall.color = wall.stroke = map.levels[random_level].color.walls
    }
    checkTiles(map.levels[random_level].tile, death)
    try {
        if (death == 'fall') {
            if (map.fall_spawn && spawns.length != 0) {
                player.x = spawns[getRandomInt(0, spawns.length)].x; player.y = 0

            } else if (spawns.length == 0) {
                player.y = 0
                player_spawn.active = true
                player_spawn.x = player.x; player_spawn.y = player.y
            } else {
                player.y = 0
            }
        } else {
            player.x = spawns[getRandomInt(0, spawns.length)].x; player.y = spawns[getRandomInt(0, spawns.length)].y
        }
    } catch (error) {
        player.x = player_spawn.x; player.y = player_spawn.y
    }
    if (map.levels[random_level].gun_enable != undefined) {
        gun.visible = map.levels[random_level].gun_enable
    } else {
        gun.visible = map.gun_enable
    }
    if (map.levels[random_level].background != undefined) {
        backgroundMap = map.levels[random_level].background
    } else {
        backgroundMap = map.background
    }
    if (map.levels[random_level].light != undefined) {
        dark1.visible = !map.levels[random_level].light
    } else {
        dark1.visible = !map.light
    }
    tiles.layer = 1;
    robots.layer = 1;
    robots_fly.layer = 1;
    // } catch (error) {
    //     alert("🎉Thank for playing!🎉 Goodbye!😥" + " Deaths💀:" + scoreDeaths)
    //     alert(error)
    //     location.reload();
    // }
}

function checkTiles(tiles, death) {
    let count = 0
    // create a new image, same dimensions as img
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x] == '{') {
                count++
            }
        }
    }
    if (count == 0 && death != "fall" && !player_spawn.active) {
        player.remove()
        console.log('%c💀Error spawn is not defined💀', 'color: red; background-color: black');
        setInterval(() => {
            for (let i = 0; i < random(10, 100); i++) {
                textSize(random(16, 64));
                fill(random(120, 255))
                text("SyntaxError:player is not defined", random(0, canvas.w), random(0, canvas.h))
                text("SyntaxError:spawn is not defined", random(0, canvas.w), random(0, canvas.h))
            }
        }, 200);
    }
}