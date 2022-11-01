
const gravity = 0.05
export default class Ship extends Phaser.GameObjects.Container
{
	constructor(scene) {
        super(scene, 100, 100);
        console.log("CREATE SHIP!");
        this._sprite = scene.add.sprite( 0, 0, 'ship');  
        this._sprite.setScale(0.9).setOrigin(0.5,0.4);   
        this.add(this._sprite);	
		scene.add.existing(this);
        this.velX = 0;
        this.velY = 0;
    }

    moveControl(keys){
        if(keys.left.isDown) this.velX -= .1
        if(keys.right.isDown) this.velX += .1
        if(keys.up.isDown) this.velY -= .1
    }

    update(t,d){
        this.velY += gravity;
        this.y += this.velY*d/100;
        this.x += this.velX*d/100;
    }

}