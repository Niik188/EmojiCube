import { font } from "./game.js";

export let sounds = []
export let images = [];
export let panelMusicEnable = false

export function loadFiles(json) {
    
    for (let i = 0; i < json.images.length; i++) {
        let img = loadImage(`./img/${json.images[i]}`)
        images.push(img)
        console.log("Image is done. Image: " + img)
    }
    setTimeout(() => {
    for (let i = 0; i < json.sounds.length; i++) {
        let sound;
        if (json.sounds[i].indexOf('music/')!=-1) {
            sound = createAudio(`./sounds/${json.sounds[i]}`)
        }else{
            sound = loadSound(`./sounds/${json.sounds[i]}`)
            
        }
        sounds.push(sound)
        console.log("Sound is done. Sound: " + sound)
    }
    }, 500);
}

export function LoadSoundplayer(sound_name) {
    if (sound_name != undefined&&typeof sound_name === 'string') {
        sounds.forEach(sound => {
            if (sound.src==undefined&&sound.url.indexOf(sound_name)!=-1) {
                if (sound.isPlaying()) {
                    sound.stop()
                }
                sound.play()
            }
        });
        
    }
}

export function musicLevelLoad(sound_name) {
    if (sound_name != undefined&&typeof sound_name === 'string') {
    sounds.forEach((sound,index) => {
        sound.stop();
        if (sound.src!=undefined&&sound.src.indexOf("/"+sound_name+".")!=-1) {
        sound.play()
        sound.loop()
        if (sound.elt.played) {
            panelMusicEnable = true
            setTimeout(() => {
                panelMusicEnable = false
            }, 5000);
        }
    }
    });
    }
}