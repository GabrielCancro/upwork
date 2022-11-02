//import InputManager from '../inputManager.js'
import Ship from './gameObjects/Ship.js'

class gameScene extends Phaser.Scene
{
    constructor()
    {
        super('gameScene');
    }

    create()
    {         
        //create ui elements from this scene and set callback
        this.ship = new Ship( this );
        this.setShipControls();
        this._fpsText = this.add.text(300, 50, "FPS", GC.styleBase).setOrigin(0.5);
        this._velText = this.add.text(450, 50, "velX", GC.styleBase).setOrigin(0.5);

    }

    setShipControls(){
        this.keys = this.input.keyboard.addKeys({
            left: 'left',
            right: 'right',
            up: 'up'
        });
    }

    update(t,d){
        if(this._fpsText) this._fpsText.text = Math.floor( game.loop.actualFps );
        this.ship.update(t,d);
        this.ship.moveControl(this.keys);
        this._velText.text = "velX: "+Math.floor(this.ship.velX*10);
        this._velText.text += "\nvelY: "+Math.floor(this.ship.velY*10);
    }  
}

export default gameScene
