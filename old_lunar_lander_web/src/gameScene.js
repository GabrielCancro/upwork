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

       // this.physics.add.overlap(this.ship, healthGroup, spriteHitHealth);

       var data = [ 80, 109, 254, 127, 425, 180, 560, 250, 674, 336, 550, 513, 325, 410, 145, 283, 100, 195, 80, 109 ];

       // The boundary
       this.debugG = this.add.graphics({ lineStyle: { color: 0xffff00 } });
       this.boatBounds = new Phaser.Geom.Polygon(data);

       this.boatBounds = Phaser.Geom.Polygon.Smooth(this.boatBounds)
       this.boatBounds = Phaser.Geom.Polygon.Smooth(this.boatBounds)
       this.boatBounds = Phaser.Geom.Polygon.Smooth(this.boatBounds)

       this.debugG.clear().strokePoints(this.boatBounds.points)
       
       this.setPointer();
       //this.createLand();
    }

    setPointer(){
        this._pointerText = this.add.text(300, 100, "xy", GC.styleBase).setOrigin(0.5);
        this.input.on('pointermove', function (pointer){
            this._pointerText.text="x:"+Math.floor(pointer.x)+"\ny:"+Math.floor(pointer.y)
            if( this.boatBounds.contains(pointer.x, pointer.y) ) this._pointerText.text="OVERLAP!";
        }, this);
    }

    setShipControls(){
        this.keys = this.input.keyboard.addKeys({
            left: 'left',
            right: 'right',
            up: 'up'
        });
    }

    createLand(){
        //var data = [ 80, 109, 254, 127, 425, 180, 560, 250, 674, 336, 550, 513, 325, 410, 145, 283, 100, 195, 80, 109 ];
        var data = [
            {x:100,y:100},
            {x:400,y:200},
        ];        
        //var angle = Phaser.Point.angle({x:0,y:0},{x:10,y:10});
        /*for (var i=0; i<data.length-1; i++){
            var dist = Phaser.Math.Distance.BetweenPoints(data[i], data[i+1]);
            var angle = Phaser.Math.Angle.Between(data[i].x,data[i].y,data[i+1].x,data[i+1].y);
            var r = this.add.rectangle((data[i].x+data[i+1].x)/2, (data[i].y+data[i+1].y)/2, dist, 10 , 0x6666ff);
            var b = this.matter.add.gameObject(r);
            b.setRotation(angle);
            //r.angle = angle;
        }*/

        var star = '80 109 254 127 425 180 560 250 674 336 550 513 325 410 145 283 100 195 80 109';

        var poly = this.add.polygon(400, 400, star, 0x0000ff, 0.2);

        var b = this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: star, flagInternal: true } });
        b.setStatic(true)
        
    }

    update(t,d){
        if(this._fpsText) this._fpsText.text = Math.floor( game.loop.actualFps );
        if( Phaser.Geom.Polygon.ContainsPoint(this.boatBounds, this.ship.getLocalPoint(0,0)) ) this._fpsText.text = "OVERLAP!"
        this.ship.update(t,d);
        this.ship.moveControl(this.keys);
        this._velText.text = "velX: "+Math.floor(this.ship.velX*10);
        this._velText.text += "\nvelY: "+Math.floor(this.ship.velY*10);

    }  
}

export default gameScene
