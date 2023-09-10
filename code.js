let player,spawn;
let tiles;
let json;
let win_next = false, slowmotion = false;
let difficulty;
let map, backgroundMap;
let number_level = 0, random_level = 0;
let dark1;
let dark;
let light;
let font;
let alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'.split(''),
    ALPHABET = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'.toUpperCase().split('');
let god_mode = false,pauseGame = false;
let scoreDeaths = 0,date;

//Запуск
function setup() {
    createCanvas(window.innerWidth-4,window.innerHeight-4);
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
    bullets.stroke = "blue"
    bullets.color = "blue"
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
    
    alphabet.forEach(letter => {
        let lettero = new tiles.Group();
        lettero.debug = true
        lettero.collider = 's';
        lettero.color = 'white';
        lettero.stroke = 'white';
        lettero.w = 20;
	    lettero.h = 20;
        lettero.textSize = 40;
        lettero.tile = letter;
        lettero.text = letter;
        if (letter == 'e'||letter == 'o'||letter == 'c'||letter == 'q'||letter == 'о'||letter == 'с'||
        letter == 'р'||letter == 'э'||letter == 'е') {
            lettero.diameter = 20;
        }
        if (letter == 'i'||letter == 'l') {
            lettero.w = 10;
        }
    });
    ALPHABET.forEach(letter => {
        let lettero = new tiles.Group();
        lettero.debug = true
        lettero.collider = 's';
        lettero.color = 'white';
        lettero.stroke = 'white';
        lettero.w = 35;
	    lettero.h = 25;
        lettero.textSize = 35;
        lettero.tile = letter;
        lettero.text = letter;
        if (letter == 'e'||letter == 'o'||letter == 'c'||letter == 'о'||letter == 'с'||
        letter == 'э'||letter == 'е') {
            lettero.diameter = 30;
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

    trap = new tiles.Group();
    trap.collider = 's';
    trap.color = blocks.color
	trap.tile = '1';

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
    if (getRandomInt(0,10) <= 3) {
        document.title = '🥵EmojiCube😋'
        player.text = '😳'
    }
    // else if (getRandomInt(0,10) <= 6) {
    //     document.title = '♂️EmojiBilly♂️'
    //     player.text = '️󠁨👨'
    //     player.mirror.y = 1
    // }
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
    await robots.moveTo(player.x-10, player.y-20, 2);
	await delay(200);
	await robots.moveTo(player.x, player.y, 2);
    await delay(200);
    move_robot()
}

//Движение ультра-роботов
async function move_ultra_robot() {
    await robots.moveTo(player.x-10, player.y, 2);
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
	await robots_fly.moveTo(player.x, player.y/2, 3);
    await delay(200);
    await robots_fly.moveTo(player.x, player.y*1.2, 10);
    await delay(500);
	move_robot_fly()
}

//Рендер
function draw() {
    background(backgroundMap)
    gun.x = player.x; gun.y = player.y
    gun.rotateTowards(mouse, 0.1, 0);
    //При нажатие кнопки мыши и при наличие оружия
    if (mouse.presses()&&gun.visible){
        delay(500);
        let bullet = new bullets.Sprite()
        if (gun.x<mouse.x) {
            bullet.x = gun.x+10;bullet.y = gun.y;
        }else{
            bullet.x = gun.x-10;bullet.y = gun.y;
        }
        
        bullet.direction = bullet.angleTo(mouse);
    }
    //Отражать оружие, когда x мыши меньше x игрока
    if (player.x<mouse.x) {
        gun.mirror.x = true;
        gun.mirror.y = false;
    }else{
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
    if (kb.presses('e')&&player.colliding(button)) {
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
    }else{
        allSprites.sleeping = false;
    }

    //При косания игрока к шипам, летающим или просто роботов. При условии, что игрок не прошёл уровень
    if ((player.collides(spike)||player.overlaps(lasers)||player.collides(robots)||player.collides(robots_fly))&&player.visible&&!win_next) {
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
        if (map.levels[random_level].gun_enable!=undefined){
            gun_weapon.visible = map.levels[random_level].gun_enable
        }else{
            gun_weapon.visible = map.gun_enable
        }
        player.x = 0;player.y = 0;
        player.visible = false
        gun.visible = false
        slowmotion = true
        setTimeout(() => {
        scoreDeaths++
        player.sleeping = true;
        player.visible = true
        player.rotation = 0
        slowmotion = false
        if (map.random_level_after_die) {map_create(false, 'spike')}
        map_create(true, 'spike')
        }, 2000);
	}

    //При падения игрока к границам canvas
    if (player.y > canvas.h + camera.zoom) {
        player.text = '😲'
        player.rotation = 0
        player.sleeping = true;
        
        if (map.next_level_after_fall&&map.levels.length != 1) {
            map.levels.splice(number_level, 1)
        }
        if (map.random_level_after_die) {map_create(false, 'fall')}
        map_create(true, 'fall')
        if (!map.random_level_after_die) {
            scoreDeaths++
        }
		setTimeout(() => {
            player.text = '😐'
        }, 1000);
	}

    //При косания игрока к смертельному блок или при нажатии кнопки "/". При условии, что игрок не прошёл уровень
    if ((player.collides(die)||kb.presses('/'))&&!win_next) {
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
        for (let i = 0; i < random(10,100); i++) {
            textSize(random(16,64));
            fill(random(120,255))
            text("SyntaxError:player is not defined", random(0,canvas.w), random(0,canvas.h))
            text("SyntaxError: purple destroy player forever ", random(0,canvas.w), random(0,canvas.h))
            text("Uncaught SyntaxError: 🤚😨✋ ", random(0,canvas.w), random(0,canvas.h))
        }
        textSize(64);
        fill(blocks.color)
        text("Deaths:" + scoreDeaths, canvas.w/15, canvas.h/5)
        text("The restart of the site", canvas.w/15, canvas.h/3)
        text("will start in 5 minutes", canvas.w/15, canvas.h/2)
        setTimeout(() => {
            location.reload();
        }, 5000);
        throw new SyntaxError("🤚😨✋");
        
	}

    //При косания игрока к сломанному блоку
    player.collides(fall, (player, fall)=>{
        if (fall.collider == 'static') {
        setTimeout(() => {
            fall.collider = 'd'
            fall.life = 40
        }, 500);
        }
    })

    //При косания игрока к ловушке
    player.collides(trap, (player, trap)=> {
        setTimeout(() => {
            let spikes = new spike.Sprite()
            spikes.x = trap.x
            spikes.y = trap.y-10
            spikes.textSize = 25
            spikes.text = '🖤'
            spikes.collider = 's'
            spikes.life = 30
        }, 350);
    })

    //При косания игрока к прыгующему блоку
    player.collides(jumping,(player1,jump)=>{
        if (player1.y+player1.h<jump.y) {
            player.vel.y = -8
            player.text = '😲'
            setTimeout(() => {
                player.text = '😐'
            }, 1000);
            jump.text = '⏫'
            setTimeout(() => {
                jump.text = '⏏️'
            }, 200);
        }
        if (player1.y>jump.y+jump.h) {
            player.vel.y = 10
        }
        
        
	})

    //При косания игрока к ускоренному вправо блоку
    player.collides(speedRight,(player1,speed1)=>{
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
    player.collides(speedLeft,(player1,speed1)=>{
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

    //При косания куба лазера
    cubes.overlaps(lasers,(cube,laser)=>{
        cube.drag = 10;
        cube.text = '🈲'
        cube.collider = 'd'
        setTimeout(() => {
            cube.remove()
        }, 600);
    })

    //При косания объекта на прыгующий блок
    objects.collides(jumping,(object,jump)=>{
        if (object.y<jump.y) {
            object.vel.y = -8
            jump.text = '⏫'
            setTimeout(() => {
                jump.text = '⏏️'
            }, 200);
        }
        if (object.y>jump.y+jump.h) {
            object.vel.y = 10
        }
    })

    //При косания игрока к ускоренному вправо блоку
    objects.collides(speedRight,(object,speed1)=>{
        object.vel.x = 10
        object.vel.y = -2
        speed1.text = '⏩'
        setTimeout(() => {
            speed1.text = '▶️'
        }, 200);
    })

    //При косания игрока к ускоренному влево блоку
    objects.collides(speedLeft,(object,speed1)=>{
        object.vel.x = -10
        object.vel.y = -2
        speed1.text = '⏪'
        setTimeout(() => {
            speed1.text = '◀️'
        }, 200);
    })
    
    //При косания игрока к выигрышу
    if (player.collides(win)&&!win_next) {
        player.text = '😄'
        win_next = slowmotion = true
        if (!map.gun_of_win) {
            win.text = '✔️'
        }else{
            win.visible = false
        }
        win.w = 1;
	    win.h = 1;
        setTimeout(() => {
            player.text = '😐'
            
            if(map.one_level == true) {
                map.levels.splice(0, map[0].levels.length);
            }else{
                map.levels.splice(number_level, 1)
            }
            win.text = '✅'
            win.collider = 'd'
            win.visible = true
            win.w = 50;
	        win.h = 50;
            win_next = slowmotion = false
            
            map_create()
            player.rotation = 0
        }, 1000);
	}
    
    if (slowmotion) {
        world.step(1/240);
    }

    if (win_next) {
        background(0,255,0, 10)
    }

    //При косания пуль к роботам
    bullets.overlaps(robots_fly, hit);
    bullets.overlaps(robots, hit);
    
    //GUI
    push()
    textFont(font);
    textSize(24);
    fill(0, 0, 0);
    rect(4,2,300, 55)
    fill(255, 255, 255);
    date = new Date();
    try {
      text(map.title + " " + map.levels.length + " Deaths:" + scoreDeaths, 10, 20)
      text(date.toLocaleTimeString() + " " + date.toLocaleDateString(), 10, 40)
    } catch (err) {
        text(err + " " + "♾️", 10, 20)
    }
    pop()

    dark1.layer = 2;
    // camera.zoom = canvas.w / canvas.h
    camera.x = 350;
    if (map.camera_player&&player.x >= canvas.w/3.5) {
        camera.x = player.x
    }

    robots_fly.forEach(robot => {
        let distance = dist(player.x, player.y, robot.x, robot.y)
        if(distance < 70){
            player.text = '😱'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        }else if(distance < 80){
            player.text = '😨'
            setTimeout(() => {
                player.text = '😐'
            }, 500);
        }else if(distance < 150){
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
            laser.y = laser_trap.y-laser_trap.w-1
            laser.w = 1
            
        }
    });

    cubes.forEach(cube => {
        let distance = dist(player.x, player.y, mouse.x, mouse.y)
        if (cube.mouse.pressing()&&distance<250) {
                cube.x = mouse.x;cube.y = mouse.y
                cube.sleeping = true
                cube.collider = 'd'
                cube.text = '🔲'
                cube.active = true
        }else{
            if (cube.collider == 'dynamic'&&cube.colliding(tiles)
            &&!cube.colliding(jumping)&&!cube.colliding(speedRight)&&!cube.colliding(speedLeft)) {
                setTimeout(() => {
                    cube.collider = 'k'
                    cube.sleeping = true
                    cube.active = false
                    cube.text = '⏹️'
                }, 500);
            }
        }
    });
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
        let explosion = new Sprite(bullet.x,bullet.y)
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
        detals.x = bullet.x + random(-2,2)
        detals.y = bullet.y + random(-2,2)
        detals.amount = 5
        detals.bounciness = 1;
        detals.friction = 0;
        detals.diameter = 5
        detals.life = 60
        detals.layer = 1;
    }
    bullet.remove()
}

//Клавиши 2
var keyState = {};    
addEventListener('keydown',function(e){
    keyState[e.key] = true;
},true);    
addEventListener('keyup',function(e){
    keyState[e.key] = false;
    player.velocity.x=0;
},true);

function gameLoop() {
    if (keyState['W'] || keyState['w']){
        if(!player.colliding(wall)&&!player.colliding(jumping)&&player.colliding(tiles)) {
            player.velocity.y=-5;
        }
        objects.forEach(object => {
            if (player.colliding(object)&&!object.active) {
                player.velocity.y=-5;
            }
        });
        if (god_mode) {
            player.y-=5;
        }
    }
    if (keyState['S'] || keyState['s']){
        if (god_mode) {
            player.y+=5;
        }
    }
    
    if (keyState['A'] || keyState['a']){ 
        player.velocity.x=-3;
        if (god_mode) {
            player.velocity.x=-5;
        }
    }
    if (keyState['D'] || keyState['d']){ 
        player.velocity.x=3;
        if (god_mode) {
            player.velocity.x=5;
        }
    }
    if ((keyState['A'] || keyState['a'])&&(keyState['D'] || keyState['d'])){ 
        player.velocity.x=0;
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
        difficulty+=1
        map = json[json.info[difficulty]][0]
        if (!map.random_level) {
            number_level = random_level = 0
        }
    }
    if (map.random_level&&!restart_level) {
        random_level = getRandomInt(0,map.levels.length)
            while (random_level == number_level&&map.levels.length != 1) {
                random_level = getRandomInt(0,map.levels.length)
            }
        number_level = random_level
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
    new Tiles(map.levels[random_level].tile, 0, 350, tiles.w, tiles.h);
    blocks.color = blocks.stroke = 'black'
    wall.color = wall.stroke = 'gray'
    if (map.levels[random_level].color!=undefined) {
        blocks.color = blocks.stroke = map.levels[random_level].color.blocks
        wall.color = wall.stroke = map.levels[random_level].color.walls
    }
    checkTiles(map.levels[random_level].tile)
    if (spawns.length!=0) {
        if (death == 'fall') {
            if (map.fall_spawn) {
                player.x = spawns[getRandomInt(0,spawns.length)].x; player.y = 0
            }else{
                player.y = 0
            }
        }else{
            player.x = spawns[getRandomInt(0,spawns.length)].x; player.y = spawns[getRandomInt(0,spawns.length)].y
        }
    }
    if (map.levels[random_level].gun_enable!=undefined) {
        gun.visible = map.levels[random_level].gun_enable
    }else{
        gun.visible = map.gun_enable
    }
    if (map.levels[random_level].background!=undefined) {
        backgroundMap = map.levels[random_level].background
    }else{
        backgroundMap = map.background
    }
    if (map.levels[random_level].light!=undefined) {
        dark1.visible = !map.levels[random_level].light
    }else{
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

function checkTiles(tiles) {
    let count = 0
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x] == '{') {
                count++
            }
        }
    }
    if (count == 0) {
        player.remove()
        setInterval(() => {
            for (let i = 0; i < random(10,100); i++) {
            textSize(random(16,64));
            fill(random(120,255))
            text("SyntaxError:player is not defined", random(0,canvas.w), random(0,canvas.h))
            text("SyntaxError:spawn is not defined", random(0,canvas.w), random(0,canvas.h))
            }
        }, 200);
    }
}