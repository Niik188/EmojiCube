import { max_bossHeatlh } from "./boss.js";
import { panelMusicEnable } from "./loadF.js";

let main_panel
let boss_panel
let music_panel
let opacityMusicPanel = 50
let date;

export function GUI_setup() {
    main_panel = createDiv('Easy 4 Deaths: 0');
    main_panel.style('color', 'rgb(255,255,255)');
    main_panel.style('padding', '10px');
    main_panel.style('font-family', '"font_menu", Arial, sans-serif');
    main_panel.style('font-size', '32px');
    main_panel.style('background-color', 'rgb(0,0,0)');
    boss_panel = createDiv('BOSS of the GYM:❤️❤️❤️❤️❤️❤️❤️❤️❤️');
    boss_panel.style('color', 'rgb(255,255,255)');
    boss_panel.style('padding', '10px');
    boss_panel.style('font-family', 'Arial, sans-serif');
    boss_panel.style('font-size', '24px');
    boss_panel.style('background-color', 'rgb(0,0,0)');
    music_panel = createDiv('Now playing music: None');
    music_panel.style('color', 'rgb(255,255,255)');
    music_panel.style('padding', '10px');
    music_panel.style('font-family', '"font_menu", Arial, sans-serif');
    music_panel.style('font-size', '32px');
    music_panel.style('background-color', 'rgb(0,0,0)');
    console.log(main_panel)
}

export function GUI_render(map,scoreDeaths,boss) {
        date = new Date();
        main_panel.position(0, 0);
        boss_panel.position(0, main_panel.elt.clientHeight);
        music_panel.position(0, main_panel.elt.clientHeight+boss_panel.elt.clientHeight);
        music_panel.style('opacity', `${opacityMusicPanel}%`);
        if (map.levels.length <= 1) {
            main_panel.elt.innerText = `${map.title} Deaths: ${scoreDeaths}\n${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
        }else{
            main_panel.elt.innerText = `${map.title}: ${map.levels.length} Deaths: ${scoreDeaths}\n${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
        }
        music_panel.elt.innerText = `Now playing music:\n${map.song_main}`
        if (panelMusicEnable) {
            opacityMusicPanel = 100
            music_panel.show()
        }
        if(opacityMusicPanel==0){
            music_panel.hide()
        }else{
            opacityMusicPanel-=1
        }
        if (boss.length != 0) {
            boss_panel.show()
            let text1 = [];
            for (let i = 0; i < boss[0].health / 10; i++) {
                text1.push("⬛");
            }
            for (let i = 0; i < (max_bossHeatlh-boss[0].health)/10; i++) {
                if (String((max_bossHeatlh-boss[0].health)/10).indexOf('.')!=-1&&i==0) {
                    text1.push("🔳");
                }else{
                    text1.push("⬜");
                }
            }
            boss_panel.elt.innerText = `BOSS of the GYM:\n${text1.join("")}`
        }else{
            boss_panel.hide()
        }
}