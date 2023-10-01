import { font } from "./game.js";

export let sounds = []
export let images = [];
export let panelMusicEnable = false
let sound_now;

export function loadFiles(json) {
    setTimeout(() => {
        for (let i = 0; i < json.images.length; i++) {
        let img = loadImage(`./img/${json.images[i]}`)
        images.push(img)
        console.log("Image is done. Image: " + img)
        }
    
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

export function musicLevelEnable(sound_name) {
    sounds.forEach((sound,index) => {
        if (sound_name != undefined&&typeof sound_name === 'string') {
        if (sound.src!=undefined&&sound.src.indexOf("/"+sound_name+".")!=-1) {
            return !sound.elt.played;
        }
        }
    });
}

export function musicLevelLoad(sound_name) {
    console.log(sound_now);
    
    sounds.forEach((sound,index) => {
        if (sound_name != undefined&&typeof sound_name === 'string') {
        sound.stop();
        if (sound.src!=undefined&&sound.src.indexOf("/"+sound_name+".")!=-1&&sound!=sound_now) {
        sound.play()
        sound.loop()
        if (sound.elt.played) {
            panelMusicEnable = true
            sound_now = sound
            setTimeout(() => {
                panelMusicEnable = false
            }, 5000);
        }
        }
        if(sound==sound_now){
            sound.play()
        }
        }else if(sound==sound_now){
            sound.play()
        }
    });
}

export function musicLevelStop() {
    sounds.forEach((sound,index) => {
        if (sound.src!=undefined&&sound.src.indexOf("/music/")!=-1) {
            sound.stop();
        }
    });
}