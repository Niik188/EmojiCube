let shakeCam = false;
let shakePower = 0;

export function cameraPosition(camera, player, map, canvas, number_level) {
    camera.zoom = Math.abs(canvas.w * 1.0007 - canvas.w);
    camera.x = canvas.w / 0.85 - canvas.w;
    camera.y = canvas.h / 0.7 - canvas.h;
    if (canvas.w < 1200) {
        camera.x = player.x;
    }
    if (canvas.h < 800) {
        camera.y = player.y;
    }
    if (map.levels[number_level].camera_player != undefined && player.x >= canvas.w / 3.5) {
        if (map.levels[number_level].camera_player) {
            camera.x = player.x;
        }
    } else if (player.x >= canvas.w / 3.5) {
        if (map.camera_player) {
            camera.x = player.x;
        }
    }
    if (shakeCam) {
        camera.x += random(-shakePower, shakePower);
        camera.y += random(-shakePower, shakePower);
        camera.x += random(-shakePower, shakePower);
        camera.y += random(-shakePower, shakePower);
        camera.x += random(-shakePower, shakePower);
        camera.y += random(-shakePower, shakePower);
    }
}

export function shakeCamera(power) {
    shakeCam = true;
    shakePower = power;
    setTimeout(() => {
        shakeCam = false;
    }, 200);
}
