let player,spawn;
let c;
let tiles;
let json;
let win_next = false;
let difficulty;
let map;
let number_level = 0, random_level = 0;
let dark1;
let rain;
let dark;
let light;
let font;
let alphabet = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'.split(''),
    ALPHABET = 'abcdefghijklmnopqrstuvwxyzйцукенгшщзхъфывапролджэячсмитьбюё'.toUpperCase().split('');
let god_mode = false;
let pauseGame = false
let date;
let scoreDeaths = 0;

//Запуск
function setup() {
    createCanvas(1000, 1000);
    world.gravity.y = 10;
    player = new Sprite()
    player.health = 100
    player.textSize = 35
    player.color = '#FFC83D'
    player.stroke = 'black'
    player.text = '😐'
    player.scale /= 1.2;

    gun = new Sprite()
    gun.textSize = 32
    // gun.img = './img/gun.png';
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
    jumping.img = './img/jump_block.png';
	jumping.tile = '+';

    speed = new tiles.Group();
    speed.collider = 's';
    speed.img = './img/speed_block.png';
	speed.tile = '>';

    robots = new Group();
    robots.collider = 'd';
    robots.img = './img/robot.png';
	robots.w = 40;
	robots.h = 40;
	robots.tile = '0';
    robots.health = 30
    move_robot()

    robots_fly = new Group();
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
    fall.color = 'black';
	fall.tile = '!';

    trap = new tiles.Group();
    trap.collider = 's';
    trap.color = 'black';
	trap.tile = '1';

    fake = new tiles.Group();
    fake.collider = 'n';
    fake.color = 'rgb(155,155,155)';
    fake.stroke = 'gray';
	fake.w = 50;
	fake.h = 50;
	fake.tile = '-';

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
    map = json[json.info[difficulty]]
    spawn = map[0].spawn_position
    player.rotation = 0
    player.x = spawn.x; player.y = spawn.y
    if (map[0].gun_enable == false) {
        gun.visible = false
    }
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
    rain = loadGif('./img/g_rain2_900.gif');
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
    // resizeCanvas(window.innerWidth,window.innerHeight);
    background(map[0].background)
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
        if (map[0].levels[random_level].debug_danger) {
            spike.debug = true
        }
    }

    if (god_mode) {
        player.text = '😎'
        allSprites.debug = true
        player.collider = 'n'
    }
    //Restart
    if (kb.presses('r')) {
        player.rotation = 0
        player.x = spawn.x; player.y = spawn.y
        map_restart()
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
    if ((player.collides(spike)||player.collides(robots)||player.collides(robots_fly))&&!win_next) {
        let skeleton = new Sprite(player.x, player.y)
        skeleton.collider = 'd'
        skeleton.color = 'white';
        skeleton.stroke = 'white';
        skeleton.textSize = 24
        skeleton.text = "💀"
        skeleton.layer = 1;
        skeleton.diameter = 5
        skeleton.life = 30;
        scoreDeaths++
        player.sleeping = true;
        player.rotation = 0
        map_restart()
        if (map[0].random_level_after_die) {map_create()}
        player.x = spawn.x; player.y = spawn.y
	}

    //При падения игрока к границам canvas
    if (player.y > canvas.h) {
        player.text = '😲'
        player.rotation = 0
        player.sleeping = true;
        
        if (map[0].next_level_after_fall&&map[0].levels.length != 1) {
            map[0].levels.splice(number_level, 1)
        }
        if (map[0].random_level_after_die) {map_create()}
        if (map[0].fall_spawn) {
            player.x = spawn.x; player.y = 0
            map_restart()
            if (!map[0].random_level_after_die) {
                scoreDeaths++
            }
        }else{
            player.y = 0
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
    if (player.colliding(jumping)) {
        player.vel.y = -8
        player.text = '😲'
        setTimeout(() => {
            player.text = '😐'
        }, 1000);
	}
    
    //При косания игрока к выигрышу
    if (player.collides(win)&&!win_next) {
        player.text = '😄'
        win_next = true
        if (!map[0].gun_of_win) {
            win.text = '✔️'
        }else{
            win.visible = false
        }
        win.w = 1;
	    win.h = 1;
        setTimeout(() => {
            player.text = '😐'
            
            if(map[0].one_level == true) {
                map[0].levels.splice(0, map[0].levels.length);
            }else{
                map[0].levels.splice(number_level, 1)
            }
            win.text = '✅'
            win.collider = 'd'
            win.visible = true
            win.w = 50;
	        win.h = 50;
            win_next = false
            map_create()
            player.rotation = 0
            player.x = spawn.x; player.y = spawn.y
        }, 1000);
	}
    
    if (win_next) {
        world.step(1/240);
        background(0,255,0, 10)
    }

    //При косания пуль к роботам
    bullets.overlaps(robots_fly, hit);
    bullets.overlaps(robots, hit);
    if (player.collided(speed)) {
		player.vel.x = 8
        player.text = '😲'
        setTimeout(() => {
            player.text = '😐'
        }, 1000);
	}
    
    //GUI
    push()
    textFont(font);
    textSize(24);
    fill(0, 0, 0);
    rect(4,2,300, 55)
    fill(255, 255, 255);
    date = new Date();
    try {
      text(map[0].title + " " + map[0].levels.length + " Deaths:" + scoreDeaths, 10, 20)
      text(date.toLocaleTimeString() + " " + date.toLocaleDateString(), 10, 40)
    } catch (err) {
        text(err + " " + "♾️", 10, 20)
    }
    pop()

    dark1.layer = 2;
    camera.x = 350;
    if (map[0].camera_player&&player.x >= canvas.w/3.5) {
        camera.x = player.x
    }

    for (let i = 0; i < robots_fly.length; i++) {
        let distance = dist(player.x, player.y, robots_fly[i].x, robots_fly[i].y)
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
    }
}

//Zoom в бит
setInterval(() => {
    if (map[0].tick) {
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
        let detals = new Group()
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
        if(!player.colliding(wall)&&player.colliding(tiles)) {
            player.velocity.y=-5;
        }
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

//Перезапуск карты
function map_restart(){
    tiles.removeAll()
    robots.removeAll()
    robots_fly.removeAll()
    background(0)
    new Tiles(map[0].levels[number_level].tile, 0, 350, blocks.w-2, blocks.h-2);
    tiles.layer = 1;
    robots.layer = 1;
    robots_fly.layer = 1;
}

//Создание случайного уровня
function map_create() {
    // try {
    tiles.removeAll()
    robots.removeAll()
    robots_fly.removeAll()
    if (map[0].levels.length == 0) {
        difficulty+=1
        map = json[json.info[difficulty]]
        if (!map[0].random_level) {
            number_level = random_level = 0
        }
    }
    if (map[0].random_level) {
        random_level = getRandomInt(0,map[0].levels.length)
            while (random_level == number_level&&map[0].levels.length != 1) {
                random_level = getRandomInt(0,map[0].levels.length)
            }
        number_level = random_level
    }
    player.rotationLock = map[0].levels[random_level].rotationLock;
    if (map[0].player_ball) {
        player.diameter = 30
    }
    if (map[0].gun_of_win) {
        win.text = '🔫'
        win.w = 10
        win.h = 10
        win.collider = 's'
    }
    npcTiles(map[0].levels[random_level].tile)
    new Tiles(map[0].levels[random_level].tile, 0, 350, blocks.w-2, blocks.h-2);
    if (map[0].levels[random_level].gun_enable!=undefined) {
        gun.visible = map[0].levels[random_level].gun_enable
    }else{
        gun.visible = map[0].gun_enable
    }
    if (map[0].levels[random_level].spawn_position!=undefined) {
        spawn = map[0].levels[random_level].spawn_position
    }else{
        spawn = map[0].spawn_position
    }
    if (map[0].levels[random_level].light!=undefined) {
        dark1.visible = !map[0].levels[random_level].light
    }else{
        dark1.visible = !map[0].light
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

function npcTiles(tiles) {
    let count = 0
    console.log(tiles.length)
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x] == '=') {
                count++
                
            }
        }
    }
    console.log(count)
}