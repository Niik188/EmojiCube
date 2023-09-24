import { shakeCamera } from "./camera.js";
import { chancePlayerSpeed } from "./controls.js";
import { player } from "./game.js";
import { LoadSoundplayer } from "./loadF.js";
import { boss, boss_arm, die, objects, scoreDeaths, spawns, win } from "./tiles.js";
import { getRandomInt } from "./utils.js";

let random_attack = 1,
    speed_arm = 5,
    spawn1;
export function hit_boss(bullet, boss1) {
    if (boss1.visible) {
        boss1.text = "🥶";
        boss1.color = "rgba(0,0,0,0)";
        boss1.diameter = 180 - boss1.health;
        LoadSoundplayer("hit_boss.");
        setTimeout(() => {
            boss1.text = "😈";
        }, 200);
        boss1.health -= 5;
        if (boss[0].health <= 80 && random_attack < 5) {
            random_attack = getRandomInt(0, 10);
            speed_arm = getRandomInt(5, 10);
            chancePlayerSpeed(3);
        }
        if (boss1.health < 20) {
            let die1 = new die.Sprite(random(100, 750), boss1.y - 30);
            die1.collider = "d";
            die1.textSize = 32;
            die1.text = "🔮";
            die1.diameter = 20;
            die1.life = 100;
        }
        if (boss1.health <= 0) {
            let explosion = new Sprite(boss1.x, boss1.y);
            explosion.collider = "n";
            explosion.textSize = 240;
            explosion.text = "💥";
            explosion.diameter = 1;
            explosion.life = 40;
            explosion.layer = 1;
            let detals = new objects.Group();
            detals.collider = "d";
            detals.textSize = 30;
            detals.text = "⚙️";
            detals.bounciness = 1;
            detals.friction = 0;
            detals.diameter = 5;
            detals.life = 120;
            detals.layer = 1;
            for (let i = 0; i < 10; i++) {
                let del = new detals.Sprite();
                del.x = boss1.x + random(-60, 60);
                del.y = boss1.y + random(-60, 60);
            }
            if (detals != undefined) {
                new win.Sprite(boss1.x, boss1.y + 150);
            }
            boss_arm.remove();
            boss1.remove();
        }
    }
    // bullet.remove()
}

export function boss_ready() {
    if (boss.length != 0) {
        random_attack = 1;
        speed_arm = 5;
        spawns.forEach((spawn) => {
            spawn1 = spawn;
        });
        setTimeout(() => {
            for (let i = 0; i < scoreDeaths + 2; i++) {
                let arm = new boss_arm.Sprite();
                arm.collider = "k";
                arm.diameter = 20;
                if (i == 0) {
                    arm.x = boss[0].x - 150;
                    arm.y = boss[0].y;
                }
                if (i == 1) {
                    arm.x = boss[0].x + 150;
                    arm.y = boss[0].y;
                }
                if (i == 2) {
                    arm.x = boss[0].x;
                    arm.y = boss[0].y;
                }
                if (i > 2) {
                    arm.life = scoreDeaths * 50 + i * 2;
                }
                arm.textSize = 72;
                arm.text = "🤜";
                boss_arm_1(arm);
            }
        }, 500);
    }
}

//Движение boss_arm
async function boss_arm_1(arm) {
    if (boss[0] != undefined) {
        await arm.rotateTo(player, 10, 0);
        await delay(scoreDeaths * 100 + 200);
        if (random_attack < 5) {
            await arm.moveTo(player.x, player.y, speed_arm);
        } else if (random_attack > 5) {
            boss[0].visible = false;
            await arm.moveTo(canvas.w, player.y, 25);
            await delay(200);
            await arm.moveTo(0, spawn1.y, speed_arm);
            random_attack = 1;
            boss[0].visible = true;
        }
    }
    shakeCamera(6);
    LoadSoundplayer("hit.");
    await delay(50);
    await arm.moveTo(boss[0].x - random(-250, 250), boss[0].y, 25);
    if (boss[0] != undefined) {
        boss_arm_1(arm);
    }
}
