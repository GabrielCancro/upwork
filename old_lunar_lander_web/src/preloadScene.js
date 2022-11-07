//import { wait, localData } from '../common.js'

class preloadScene extends Phaser.Scene
{
    constructor()
    {
        super('preloadScene');     
        // 1624 x 750   
    }

    preload(){
        this.load.image('ship', 'assets/ship.png?');
    }

    async create()
    {     

        //this.preload_bg = this.add.image(sm.x(0.5), sm.y(1), "preload_bg").setOrigin(0.5,1); 
        //this.title = this.add.image(sm.x(0.5), 200, "title").setOrigin(0.5,0).setScale(.9); 

        //this.preload_bar_bg = this.add.image(sm.x(0.5), sm.y(0.60), "preload_bar_empty"); 
        //this.preload_bar = this.add.image(sm.x(0.5), sm.y(0.60), "preload_bar_full"); 
        
        this.prg_tx = this.add.text(400, 400, "0%", GC.styleBase).setOrigin(0.5);

        this.startLoad();
    }

    async startLoad()
    {   
        this.load.on('progress', (prg) => {
            this.prg_tx.text = Math.floor(prg*100)+"%";
            //this.preload_bar.setCrop(0, 0, this.preload_bar.width*prg, this.preload_bar.height);
        });

        this.load.once('complete', async () => {
            this.scene.start('gameScene');
        } );

        this.load.start(); 
    }

}

export default preloadScene
