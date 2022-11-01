
import preloadScene from './preloadScene.js'
import gameScene from './gameScene.js'
import { globalConfig } from './globalConfig.js'

var phaserConfig = {
    type: Phaser.WEBGL,
    transparent: false,
    //audio: { disableWebAudio: true },
    scale: { 
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT, 
        autoCenter: Phaser.Scale.CENTER_BOTH, 
        width: 800, 
        height: 560 
    },
    scene: [preloadScene,gameScene]
};

window.GC = globalConfig;


if( window.innerWidth / window.innerHeight > phaserConfig.scale.width / phaserConfig.scale.height ){
    phaserConfig.scale.mode = Phaser.Scale.HEIGHT_CONTROLS_WIDTH;
}  


window.game = new Phaser.Game(phaserConfig);
   