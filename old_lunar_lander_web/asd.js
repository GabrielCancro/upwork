var boatBounds, playerRect, tempVelocity;

var Clamp = Phaser.Math.Clamp;

var SPEED = 180;

function preload() {
  this.load.image('underwater', 'assets/skies/underwater3.png');
  this.load.image('player', 'assets/sprites/phaser-dude.png');
  this.load.bitmapFont('nokia', 'assets/fonts/bitmap/nokia.png', 'assets/fonts/bitmap/nokia.xml');
}

function create() {
  this.cursors = this.input.keyboard.createCursorKeys();

  this.background = this.add.image(0, 0, 'underwater');
  this.background.setOrigin(0, 0);

  this.player = this.physics.add.image(400, 300, 'player');
  this.player.body.setCollideWorldBounds(true);

  this.debug = this.add.graphics({ lineStyle: { color: 0xffff00 } });
  
  this.text = this.add.bitmapText(0, 0, 'nokia').setAlpha(0.5);

  var data = [ 80, 109, 254, 127, 425, 180, 560, 250, 674, 336, 550, 513, 325, 410, 145, 283, 100, 195, 80, 109 ];
    
  // The boundary
  boatBounds = new Phaser.Geom.Polygon(data);
  
  // Will represent the player body
  playerRect = new Phaser.Geom.Rectangle();
  
  // Will hold a per-step velocity (distance)
  tempVelocity = new Phaser.Math.Vector2();
}

function update() {
  this.player.setVelocity(0);
  
  // Set a provisional velocity from the cursor input

  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-SPEED);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(SPEED);
  }

  if (this.cursors.up.isDown) {
    this.player.setVelocityY(-SPEED);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(SPEED);
  }

  var body = this.player.body;
  
  // Move the player rectangle ahead by one step of the provisional velocity
  projectRect(playerRect, body, 1 / this.physics.world.fps);
  
  // Check if the player rectangle is within the polygon and "block" the body on any corresponding axes
  setBlocked(body.blocked, playerRect, boatBounds);
  
  // Limit the provisional velocity based on the blocked axes
  clampVelocity(body.velocity, body.blocked);

  // Draw the polygons
  this.debug
    .clear()
    .strokePoints(boatBounds.points)
    .strokeRectShape(playerRect);
  
  this.text.setText(
    JSON.stringify(body, ['blocked', 'velocity', 'x', 'y', 'left', 'right', 'up', 'down', 'none'], 2)
  )
}

function projectRect(rect, body, time) {
  tempVelocity.copy(body.velocity).scale(time);
  Phaser.Geom.Rectangle.CopyFrom(body, rect);
  Phaser.Geom.Rectangle.OffsetPoint(rect, tempVelocity);
}

function clampVelocity(velocity, blocked) {
  if (blocked.left) velocity.x = Clamp(velocity.x, 0, Infinity);
  if (blocked.right) velocity.x = Clamp(velocity.x, -Infinity, 0);
  if (blocked.up) velocity.y = Clamp(velocity.y, 0, Infinity);
  if (blocked.down) velocity.y = Clamp(velocity.y, -Infinity, 0);
}

function setBlocked(blocked, rect, bounds) {
  if (!bounds.contains(rect.left, rect.top)) {
    blocked.left = true;
    blocked.up = true;
  }
  if (!bounds.contains(rect.left, rect.bottom)) {
    blocked.left = true;
    blocked.down = true;
  }
  if (!bounds.contains(rect.right, rect.top)) {
    blocked.right = true;
    blocked.up = true;
  }
  if (!bounds.contains(rect.right, rect.bottom)) {
    blocked.right = true;
    blocked.down = true;
  }

  blocked.none = !blocked.left && !blocked.right && !blocked.up && !blocked.down;
}

document.getElementById('version').textContent = 'Phaser v' + Phaser.VERSION;

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  loader: {
    baseURL: 'https://labs.phaser.io',
    crossOrigin: 'anonymous'
  }
});
