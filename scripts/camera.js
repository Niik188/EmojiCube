let shakeCam = false;
let shake = {x:[],y:[]}
let shakePower = 0;
let scaleFactor = 0.15
let pixelsWidth;

export function cameraPosition(camera, player, map, canvas, number_level) {
    pixelsWidth = canvas.w
    camera.zoom = scaleFactor * (pixelsWidth / 256);
    let camerYoff = 10.0;
    let lagFactor = 0.05;
    let dx = 350 - camera.x + mouse.x/8;
    let dy = player.y- camerYoff - camera.y + mouse.y/10;
    // let dx = player.x+50 - camera.x + mouse.x/8;
    // let dy = player.y- camerYoff - camera.y + mouse.y/10;
    camera.x += dx * lagFactor;
    camera.y += dy * lagFactor/2;
    // camera.x = canvas.w / 0.85 - canvas.w;
    // camera.y = canvas.h / 0.7 - canvas.h;
    // if (canvas.w < 1200) {
    //     camera.x = player.x;
    // }
    // if (canvas.h < 800) {
    //     camera.y = player.y;
    // }
    // if (map.levels[number_level].camera_player != undefined && player.x >= canvas.w / 3.5) {
    //     if (map.levels[number_level].camera_player) {
    //         camera.x = player.x;
    //     }
    // } else if (player.x >= canvas.w / 3.5) {
    //     if (map.camera_player) {
    //         camera.x = player.x;
    //     }
    // }
    if (shakeCam) {
        if (shakePower<=0) {
            shakeCam = false;
        }
        let count_shake = 0
        while (count_shake<3) {
            if (shake.x==undefined||shake.x) {
                camera.x += random(-shakePower, shakePower);
            }
            if (shake.y==undefined||shake.y) {
                camera.y += random(-shakePower, shakePower);
            }
            count_shake++
        }
    }
}

export function shakeCamera(time,power,x,y) {
    shakeCam = true;
        shake.x = true
        shake.y = true
        shake.x = x
        shake.y = y
    shakePower += power;
    setTimeout(() => {
        shake = {x:[],y:[]}
        shakePower -= power;
    }, time);
}
