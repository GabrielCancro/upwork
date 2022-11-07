
const gravity = 0.05
export default class Ship extends Phaser.GameObjects.Container
{
    
	constructor(scene) {
        super(scene, 100, 100);
        console.log("CREATE SHIP!");
        this._sprite = scene.add.sprite( 0, 0, 'ship');       
        this._sprite.setScale(0.9).setAlpha(0.1);   
        this.add(this._sprite);	

        var points = [ -10,-10, -10,10, 10,10, 10,-10 ];
        this.poly = new Phaser.Geom.Polygon(points);
        this._polyG = scene.add.graphics({ lineStyle: { color: 0xffff00 } });
        this._polyG.clear().strokePoints(this.poly.points)
		this.add(this._polyG);

        this.velX = 0;
        this.velY = 0;
        //this.bodyShip = scene.physics.add.image( 200, 0, 'ship');
        //this.matter.add.gameObject(poly
        //this.add(this.bodyShip);
        //setBodySize(width, height, [center])
        scene.add.existing(this);
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