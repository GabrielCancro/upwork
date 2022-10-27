function startSandKasten() {
  start();
}

//const values for use in code...
const JA = true;
const NEIN = false;

const WAHR = true;
const FALSCH = false;

const OBEN = "OBEN";
const UNTEN = "UNTEN";
const LINKS = "LINKS";
const RECHTS = "RECHTS";

const HORIZONZAL = [LINKS, RECHTS];
const VERTIKAL = [OBEN, UNTEN];
const VIER_RICHTUNGEN = [LINKS, RECHTS, OBEN, UNTEN];

const GANZ_HINTEN = -9999;
const GANZ_VORNE = 9999;

const WELT_OBEN = 0;
const WELT_LINKS = 0;
const WELT_UNTEN = 450;
const WELT_RECHTS = 800;

const WELT_MITTE_X = 400;
const WELT_MITTE_Y = 225;
const MITTE_X = 400;
const MITTE_Y = 225;

// we use german translation for some js expressions
const NIX = null;
const GIBTSNICHT = undefined;
const OHNE = undefined;
NICHTS_MACHEN = function() {}

const UNENDLICH = Infinity;

// colors
const NEON_GRÜN = 0x00FF00;
const ROT = 0xFF0000;
const BLAU = 0x0000FF;
const WEIß = 0xFFFFFF;
const SCHWARZ = 0x000000;
const GELB = 0xFFFF00;
const ORANGE = 0xFF8C00;
const ROSA = 0xE8ADAA;
const LILA = 0xA146FF;
const HELL_BLAU = 0xADD8E6;
const DUNKEL_BLAU = 0x00008B;
const GRÜN = 0x008000;
const GRAU = 0x808080;
const MAGENTA = 0xFF0090;
const TÜRKIS = 0x00FFFF;
const CYAN = 0x007EFF;
const BRAUN = 0x5b3a29;
const PINK = 0xFFC0CB;
const GOLD = 0xFFD700;
const HIMMEL_BLAU = 0x87CEFA;
const GRAS_GRÜN = 0x228B22;
const BEIGE = 0xCFC295;

let ENDE_FARBE = NEON_GRÜN;

let background = null;
/**
 * sets an background
 * @param {string} name name of the asset (no sideloading!)
 * @param {*} x x position
 * @param {*} y y position
 */
function hintergrund(name, x ,y) {
  if (background != null) {
    background.destroy();
  }

  background = sandpit.currentscene.add.image(0, 0, name);
  background.setDepth(GANZ_HINTEN*2);
  if (x !== undefined && y !== undefined)  {
    background.setX(x);
    background.setY(y);
  } else {
    background.displayWidth = 800;
    background.displayHeight = 450;
    background.setOrigin(0,0);
  }
  checkAsset(name, "image", undefined, function() {
    background.setTexture(name);
    //background.setInteractive();
    //background.setSize(800,450);
    background.displayWidth = 800;
    background.displayHeight = 450;
    background.setOrigin(0,0);
    //background.setScale(0.5);
  })
}

/**
 * alternative wording for background
 * @param {string} name
 */
function bühne(name) {
  hintergrund(name);
}

/**
 * background color instead of background asset
 * @param {hex int} color color value for background
 * @param {*} alpha
 */
function hintergrundFarbe(color, alpha) {
  var halpha = 1;
  if (alpha != undefined) {
    halpha = alpha;
  }
  const figure = sandpit.currentscene.add.rectangle(WELT_MITTE_X, WELT_MITTE_Y, 800, 450, color, halpha);
  figure.setDepth(GANZ_HINTEN*2);
  return getSandFigure(figure);
}

/**
 * create an interactive object (figure) in the game world, @see sandfigure.js
 * @param {string} name asset name
 * @param {*} x x position
 * @param {*} y y position
 * @param {*} size size from 0 (0%) to 1 (100%), default is 0.8 (80%)
 *  @param {*} frame index from 0 if asset name is a spritesheet
 */
function figur(name, x, y, size) {
  spriteX = 0;
  spriteY = 0;
  if (x != undefined && y != undefined) {
    spriteX = x;
    spriteY = y;
  } else {
    spriteX = zufallsZahl(15, 785)
    spriteY = zufallsZahl(15, 435)
  }

  let figure = sandpit.currentscene.add.sprite(spriteX, spriteY, name);

  var sandFigure = getSandFigure(figure);
  sandFigure.name = name;
  if (size !== undefined) {
    sandFigure.internalObject.setScale(size);
    //figure.displayHeight = figure.displayHeight * size;
    //figure.displayWidth = figure.displayWidth * size;
  } else {
    sandFigure.internalObject.setScale(0.8);
  }
  checkAsset(name, "image", undefined, function() {
    sandFigure.internalObject.setTexture(name);
    sandFigure.internalObject.setInteractive();
    sandFigure.internalObject.body.setSize(sandFigure.internalObject.width, sandFigure.internalObject.height);
  })
  generateFigureID(sandFigure);
  playDefaultAnimation(name, sandFigure);
  return sandFigure;
}

/**
 * rectangle as interactive object @see sandfigure.js
 * @param {int} x
 * @param {*} y
 * @param {*} w
 * @param {*} h
 * @param {*} color
 * @param {*} alpha
 */
function kiste(x,y,w,h, color, alpha) {
  const figure = sandpit.currentscene.add.rectangle(x, y, w, h, color, alpha).setInteractive();
  const sandFigure = getSandFigure(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

/**
 * circle as interactive object @see sandfigure.js
 * @param {*} x
 * @param {*} y
 * @param {*} r
 * @param {*} color
 * @param {*} alpha
 */
function kreis(x,y,r, color, alpha) {
  const figure = sandpit.currentscene.add.circle(x, y, r, color, alpha).setInteractive();
  const sandFigure = getSandFigure(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

/**
 * line as interactive object @see sandfigure.js
 * @param {*} x
 * @param {*} y
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @param {*} color
 * @param {*} alpha
 */
function linie(x,y, x1, y1, x2, y2, color, alpha) {
  const figure = sandpit.currentscene.add.line(x, y, x1, y1, x2, y2, color, alpha).setInteractive();
  const sandFigure = getSandFigure(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

/**
 * triangle as interactive object @see sandfigure.js
 * @param {*} x
 * @param {*} y
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @param {*} x3
 * @param {*} y3
 * @param {*} color
 * @param {*} alpha
 */
function dreieck(x,y, x1, y1, x2, y2, x3, y3, color, alpha) {
  const figure = sandpit.currentscene.add.triangle(x, y, x1, y1, x2, y2, x3, y3, color, alpha).setInteractive();
  const sandFigure = getSandFigure(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

function box(x,y,z,w,h,d,m, color, alpha) {
  if (!sandpit.currentscene.third) {
    return null;
  }
  var transparency = false;
  if (alpha) {
    transparency = true;
  }
  const figure = sandpit.currentscene.third.physics.add.box({ x: x, y: y, z: z, width: w, height: h, depth: d, mass: m, collisionFlags: 0 },
    { lambert: { color: color, transparent: transparency, opacity: alpha } });
  const sandFigure = getSandFigure3D(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

function kugel(x,y,z, r,m, color, alpha) {
  if (!sandpit.currentscene.third) {
    return null;
  }
  var transparency = false;
  if (alpha) {
    transparency = true;
  }
  const figure = sandpit.currentscene.third.physics.add.sphere({ x: x, y: y, z: z, radius: r, mass: m, collisionFlags: 0 },
    { lambert: { color: color, transparent: transparency, opacity: alpha } });
  const sandFigure = getSandFigure3D(figure);
  generateFigureID(sandFigure);
  return sandFigure;
}

function kamera() {
  const figure = getSandCamera();
  generateFigureID(figure);
  return figure;
}

function webcamVideo(x,y,size, callback) {
  const video = sandpit.currentscene.add.video(x, y);
  let sandFigure = getSandStream(video);
  const cfg = { video: true, audio: false};
  webcamStream(function(stream) {
    video.loadMediaStream(stream);
    sandFigure.streamLoaded = true;
    if (size !== undefined) {
      sandFigure.internalObject.setScale(size);
    } else {
      sandFigure.internalObject.setScale(0.8);
    }
    if (callback) {
      callback(sandFigure);
    }
  }, cfg);
  return sandFigure;
}

/**
 * text as interactive object @see sandfigure.js (SandText)
 * @param {*} text
 * @param {*} x
 * @param {*} y
 * @param {*} size
 * @param {*} color
 * @param {*} fontFamily
 */
function text(text, x, y, size, color, fontFamily) {
  console.log('text: ' + text);
  var fontSize = 12;
  if (size != undefined) {
    fontSize = size;
  }
  var fontColor = "#000000";
  if (color !== undefined) {
    fontColor = colorToString(color);
  }

  var fontFamilyText = "Verdana";
  if (fontFamily !== undefined) {
    fontFamilyText = fontFamily;
  }
  const textObject = sandpit.currentscene.add.text(x, y, text, { fontFamily: fontFamilyText, fontSize: fontSize + 'px', fill: fontColor }).setInteractive();
  const sandText = getSandText(textObject);
  return sandText;
}

/**
 * create a group for figures @see sandfigure.js
 */
function gruppe() {
  const group = sandpit.currentscene.add.group();

  var sandGroup = new SandGruppe(group);
  return sandGroup;
}

/**
 * particle  as interactive object @see sandfigure.js
 * @param {*} name
 * @param {*} x
 * @param {*} y
 * @param {*} cfg
 */
function partikel(name, x, y, cfg) {
  // for cfg see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/
  let particles = sandpit.currentscene.add.particles(name);
  if (x != undefined && istZahl(x)) {
    particles.x = x;
  } else {
    particles.x = 0;
  }
  if (y != undefined && istZahl(y)) {
    particles.y = y;
  } else {
    particles.y = 0;
  }
  var sandPartikel = new SandPartikel(particles, cfg);
  checkAsset(name, "image", undefined, function() {
    sandPartikel.internalObject.destroy()
    let particles2 = sandpit.currentscene.add.particles(name);
    particles2.x = particles.x;
    particles2.y = particles.y
    sandPartikel.internalObject = particles2;
    sandPartikel.effektErstellen(sandPartikel.effekt);
    //sandPartikel.initialize(cfg);
  })
  return sandPartikel;
}

/**
 * animation for an interactive object @see sandfigure.js
 * @param {*} cfg for cfg see : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/animation/
 */
function animation(cfg) {
  var animation = sandpit.currentscene.anims.create(cfg);
  var sandAnimation = new SandAnimation(animation, cfg);
  return sandAnimation;
}

/**
 * show text for a given duration
 * @param {*} text
 * @param {*} x
 * @param {*} y
 * @param {*} dauer duration in millisec
 */
function sagen(text, x, y, dauer) {

  const textObject = sandpit.currentscene.add.text(x, y, text, { fontSize: '12px', fill: '#000' }).setInteractive();

  const positionX = textObject.getTopCenter().x;// - 10;
  const positionY = textObject.getTopCenter().y + 10;
  const width = textObject.displayWidth + 20;
  const height = textObject.displayHeight + 30;
  const hintergrund = sandpit.currentscene.add.rectangle(positionX, positionY, width, height, WEIß).setInteractive();
  hintergrund.setDepth(textObject.depth - 1);

  setTimeout(function() {
    textObject.destroy(true);
    hintergrund.destroy(true);
  }, dauer);
  return textObject;
}

function mikrofon() {
  navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then(function (stream) {
      console.log("stream start:", stream);

      var options = {};
      var speechEvents = hark(stream, options);

      speechEvents.on('speaking', function(ev) {
        console.log('speaking', ev);
        if (istFunktion(startObject.sprechenErkannt)) {
          startObject.sprechenErkannt()
        } else {
          sprechenErkannt();
        }
      });

      speechEvents.on('stopped_speaking', function(ev) {
        console.log('stopped_speaking', ev);
        if (istFunktion(startObject.ruheErkannt)) {
          startObject.ruheErkannt()
        } else {
          ruheErkannt();
        }
      });

      speechEvents.on('volume_change', function(volume) {
        console.log('current volume', volume+200);
        if (istFunktion(startObject.laut)) {
          startObject.laut(volume+200)
        } else {
          laut(volume+200);
        }
      });

    })
    .catch(function (err) {
      console.log(`Error: ${err}`);
    });
}

/**
 * check if figure was deleted
 * @param {*} figure
 */
function istGelöscht(figure) {
  return figure.gelöscht && figure.internalObject.active === false && figure.internalObject.visible === false;
}

/**
 * check if mouse pointer is down
 */
function gehalten() {
  return sandpit.state.pointerdown;
}

/**
 * return last clicked mouse position as object
 */
function getipptPosition() {
  return { x: sandpit.state.pointerx, y: sandpit.state.pointery };
}

/**
 * return last clicked mouse x-position
 */
function getipptPositionX() {
  return sandpit.state.pointerx;
}

/**
 * return last clicked mouse y-position
 */
function getipptPositionY() {
  return sandpit.state.pointery;
}

/**
 * clones the figure
 * @param {*} figure
 */
function klone(figure) {
  return figur(figure.internalObject.texture.key, figure.X(), figure.Y(), figure.internalObject.scale);
}

/**
 * create a sound for playing @see sandfigure.js
 * @param {*} name name of the sound asset
 */
function geräusch(name) {
  var soundFigure = new SandSound(undefined);
  soundFigure.ready = false;
  checkAsset(name, "audio", undefined, function() {
    console.log('load sound:', name);
    var sound = sandpit.currentscene.sound.add(name);
    soundFigure.internalObject = sound;
    soundFigure.ready = true;
  })

  return soundFigure;
}

/**
 * play a music asset (for ever)
 * @param {*} name name of the sound asset
 */
function musikAbspielen(name) {
  const sound = sandpit.currentscene.sound.add(name);
  const musik = new SandSound(sound);
  musik.endlosAbspielen();
  return musik;
}

/**
 * create a simple synth instrument
 */
function instrument() {
  const synth = new Tone.Synth().toMaster();
  var instrument = new SandInstrument(synth);
  return instrument;
}

/**
 * create a virtual joystick at position.
 * @param {*} x
 * @param {*} y
 * @param {*} callback
 */
function joystick(x,y, callback, unsichtbar) {
  var stick = sandpit.currentscene.pad.addStick(x, y, 150, 'arcade');
  const joystick = new SandJoystick(stick);
  stick.scale = 0.5;
  stick.showOnTouch = (unsichtbar === true);
  stick.on('update', function(data) {
    if (data.isDown) {
      joystick.gedrückt(mapPad(data));
      if (callback !== undefined) {
        callback(mapPad(data));
      }
    }
  }, this);
  if (sandpit.pad == null) {
    sandpit.pad = stick;
  }
  return joystick;
}

/**
 * create a virtual button, which is also bound to keyboard
 * @param {*} x
 * @param {*} y
 * @param {*} taste the key which is bound
 * @param {*} nummer button texture: choose 1, 2 or 3
 */
function knopf(x,y, taste, nummer) {
  var number = '1';
  if (nummer != undefined) {
    number = nummer;
  }
  var button = sandpit.currentscene.pad.addButton(x, y, 'arcade', 'button'+number+'-up','button'+number+'-down');
  const knopf = new SandKnopf(button);
  button.scale = 0.5;
  button.addKey(taste);
  button.on('down', function() {
    knopf.gedrückt(taste);
    userTasteGedrückt(taste);
  });
  button.on('up', function() {
    knopf.losgelassen(taste);
    userTasteLosgelassen(taste);
  });

  return knopf;
}

/**
 * get color from rgb-values
 * @param {*} r
 * @param {*} g
 * @param {*} b
 */
function farbe(r,g,b) {
  return Phaser.Display.Color.GetColor(r,g,b);
}

/**
 * random number between min and max
 * @param {*} min
 * @param {*} max
 */
function zufallsZahl(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * random x-coordinate
 */
function zufallX() {
  return zufallsZahl(0,800);
}

/**
 * random y-coordinate
 */
function zufallY() {
  return zufallsZahl(0,450);
}

/**
 * random floating point number between min and max
 * @param {*} min
 * @param {*} max
 */
function zufallsKommazahl(min, max) {
  var kommaZahl = (Math.random() * (max - min) + min);
  var zweiNachKommastellen = zahlRunden(kommaZahl);
  return zweiNachKommastellen;
}

/**
 * rounds floatingpoint number
 * @param {*} kommaZahl
 */
function zahlRunden(kommaZahl) {
  return parseFloat(kommaZahl.toFixed(2));
}

/**
 * return a random element from array. used for selecting random assets from an array.
 * ['affe', 'hund', 'banana'] --> will return one random element.
 * @param {*} array
 */
function zufallsName(array) {
  var index = zufallsZahl(0, array.length);
  return array[index];
}

/**
 * returns a random element from arguments:
 * zufall('affe', 'hund', 'banana')
 */
function zufall() {
  var index = zufallsZahl(0, arguments.length);
  return arguments[index];
}

/**
 * returns a random position
 * @param {boolean} außerhalbWelt if true coordinates can be in outer game world (max 50 pixels)
 */
function zufallsPosition(außerhalbWelt) {
  if (außerhalbWelt != undefined) {
    var x = -50;
    var y = -50;
    type = zufallsZahl(1,4);
    if (type == 1) {
      y = zufallsZahl(-50,500);
    } else if (type == 2) {
      x = 850;
      y = zufallsZahl(-50,500);
    } else if (type == 3) {
      x = zufallsZahl(-50,850);
    } else if (type == 4) {
      y = 500;
      x = y = zufallsZahl(-50,500);
    }
    return { x, y };
  }
  return { x : zufallsZahl(0,800), y : zufallsZahl(0,450)};
}

/**
 * wait for milliseconds (prefer verzögern-function)
 * @param {*} ms millis
 */
function warte(ms) {
  const start = performance.now();
  sandpit.state.delay = {
    start : start,
    ms : ms,
    end : (ms + start),
    wait : true
  };
}

/**
 * simple for loop wrapped as function
 * @param {*} anzahl count
 * @param {*} cb callback function for every iteration
 */
function wiederhole(anzahl, cb) {
  for (let i = 0; i < anzahl; i++) {
      cb();
  }
}

/**
 * delayed loop wrapped as function
 * @param {*} anzahl count
 * @param {*} pause delay in millis
 * @param {*} cb callback function for every iteration
 */
function verzögertWiederholen(anzahl, pause, cb) {
  var i = 0;
  var aufruf = function() {
    if (i < anzahl) {
      i++;
      cb();
      verzögern(pause, aufruf);
    }
  }
  verzögern(pause, aufruf);
}

/**
 * simple if else wrapped in a function
*/
function wennDann(bedingung, dann, sonst) {
  if (bedingung) {
    dann();
  } else {
    if (sonst !== undefined) {
      sonst();
    }
  }
}

/**
 * simple while wrapped in a function
*/
function solange(bedingung, dann) {
  while(bedingung) {
    dann();
  }
}

/**
 * not needed by now...
 */
function wartenVorbei() {
  if (sandpit.state.delay.wait === false) {
    return true;
  }

  const jetzt = performance.now();
  if (sandpit.state.delay.end <= jetzt) {
    sandpit.state.delay.wait = false;
    return true;
  }

  return false;
}

/** wrapped setTimeout-function */
function verzögern(ms, cb) {
  if (sandpit.state.gameOver == true) return;
  if (cb) {
    setTimeout(cb, ms);
  }
}

/** wrapped setTimeout-function */
function zukunft(ms, cb) {
  if (sandpit.state.gameOver == true) return;
  if (cb) {
    setTimeout(cb, ms);
  }
}

function intervall(ms, cb) {
  if (sandpit.state.gameOver == true) return;
  if (cb) {
    return setInterval(cb, ms);
  }
}

function intervallStop(intervallId) {
  if (intervallId) {
    clearInterval(intervallId);
  }
}

/**
 * prompts user for a number
 * @param {*} text
 */
function zahlEingeben(text) {
  var number = prompt(text);
  if (number == null) {
    alert("Abgebrochen!");
    return null;
  }
  return Number(number);
}

/**
 * pauses the game
 */
function pause() {
  if (sandpit.state.gameOver) return;
  if (sandpit.currentscene.scene.isPaused()) {
    sandpit.currentscene.scene.resume()
  } else {
    sandpit.currentscene.scene.pause()
  }
}

/**
 * end the game aka. game over
 */
/**
 * end the game aka. game over
 * @param {*} textstr the winner or loser text
 */
function ende(textstr) {
  if (sandpit.state.gameOver) return;
  sandpit.state.gameOver = true;
  text(textstr, 250, 150, 50, ENDE_FARBE)
  setTimeout(function() {
    sandpit.currentscene.scene.pause()
  }, 600);
}

// Should be added to the api.
function spielZuEnde() {
  return sandpit.state.gameOver
}

function stopUhrStarten() {
  return stoppUhrStarten();
}

/**
 * start a stopwatch
 */
function stoppUhrStarten() {
  sandpit.stopuhr = sandpit.currentscene.time.addEvent({loop : true})
  return sandpit.stopuhr
}


function stopUhrSekunden() {
  return stopUhrSekunden();
}

/**
 * get current stopwatch elapsed seconds
 */
function stoppUhrSekunden() {
  if (!sandpit.stopuhr) return 0;
  return sandpit.stopuhr.getElapsedSeconds()
}

/**
 * distance in pixels between figure1 and figure2
 * @param {*} figur1
 * @param {*} figur2
 */
function entfernung(figur1, figur2) {
  return Phaser.Math.Distance.Between(figur1.internalObject.x, figur1.internalObject.y, figur2.internalObject.x, figur2.internalObject.y);
}

/**
 * angle in degrees between coordinate1 and coordinate2
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
function winkel(x1, y1, x2, y2) {
  var rad = Phaser.Math.Angle.Between(x1, y1, x2, y2);
  return Phaser.Math.RadToDeg(rad);
}

/**
 * angle in degrees between figure1 and figure2
 * @param {*} figur1
 * @param {*} figur2
 */
function winkelZwischen(figur1, figur2) {
  return winkel(figur1.internalObject.x, figur1.internalObject.y, figur2.internalObject.x, figur2.internalObject.y);
}

/**
 * move figure to position with speed in maxTime
 * @param {*} figur1 figure
 * @param {*} x x-coordinate
 * @param {*} y y-coordinate
 * @param {*} geschwindigkeit speed
 * @param {*} maxZeit maxTime
 */
function bewegenNach(figur1, x, y, geschwindigkeit, maxZeit) {
  sandpit.currentscene.physics.moveTo(figur1.internalObject, x, y, geschwindigkeit, maxZeit);
}

/**
 * stop movement of the figure (sets velocity to zero)
 * @param {} figur the figure
 */
function bewegungStoppen(figur) {
  figur.internalObject.body.setVelocity(0,0);
}

/**
 * move figure on x-axis (sets velocity)
 * @param {*} figur
 * @param {*} x
 */
function bewegenX(figur, x) {
  figur.internalObject.body.setVelocityX(x);
}

/**
 * move figure on y-axis (sets velocity)
 * @param {*} figur
 * @param {*} y
 */
function bewegenY(figur, y) {
  figur.internalObject.body.setVelocityY(y);
}

/**
 * set acceleration of figure on x- and y-axis
 * @param {*} figur
 * @param {*} x
 * @param {*} y
 */
function beschleunigung(figur, x, y) {
  figur.internalObject.body.setAcceleration(x,y);
}

/**
 * set acceleration of figure on x- and y-axis to zero
 * @param {*} figur
 */
function bremsen(figur) {
  figur.internalObject.body.setAcceleration(0,0);
  bewegungStoppen(figur);
}

/**
 * move figure  to x- and y-position but with some tolerance. after reaching goal-position execute callback
 * @param {*} sFigure figure
 * @param {*} x x-position
 * @param {*} y y-position
 * @param {*} geschwindigkeit speed
 * @param {*} toleranz tolerance
 * @param {*} callback callback
 */
function bewegenBis(sFigure, x, y, geschwindigkeit, toleranz, callback) {
  sFigure.schonDa = false;
  sFigure.zielX = x;
  sFigure.zielY = y;
  sFigure.toleranz = toleranz;
  sFigure.stopCallback = callback;
  sFigure.bewegenNach(x, y, geschwindigkeit);

  var hookIndex = hookID();
  var stopHook = function() {
    if (sFigure.schonDa == false && istInDerNähe(sFigure, sFigure.zielX, sFigure.zielY, sFigure.toleranz)) {
      sFigure.stoppen();
      sFigure.schonDa = true;
      if(sFigure.stopCallback !== undefined) {
        sFigure.stopCallback();
      }
      unhook(hookIndex);
    }
  };
  hook(stopHook, hookIndex);
}

/**
 * return if figure is near x- and y-position including some tolerance
 * @param {*} sFigure figure
 * @param {*} x
 * @param {*} y
 * @param {*} toleranz tolerance
 */
function istInDerNähe(sFigure, x, y, toleranz) {
  return inDerNähe(sFigure.X(), sFigure.Y(), x, y, toleranz);
}

/**
 * return if position1 is near position2 including some tolerance
 * @param {*} sFigure figure
 * @param {*} x1 x-position1
 * @param {*} y1 y-position1
 * @param {*} x2 x-position2
 * @param {*} y2 y-position2
 * @param {*} toleranz tolerance
 */
function inDerNähe(x1, y1, x2, y2, toleranz) {
  var xUnten = x2 - toleranz;
  var xOben = x2 + toleranz;
  var inX = (x1 > xUnten && x1 < xOben);

  var yUnten = y2 - toleranz;
  var yOben = y2 + toleranz;
  var inY = (y1 > yUnten && y1 < yOben);

  return (inX && inY);
}

/**
 * set physics-engine for figure to an endless word (will wrap on game world edges)
 * @param {*} figur
 * @param {*} padding
 */
function endlosWelt(figur, padding) {
  sandpit.currentscene.physics.world.wrap(figur.internalObject, padding);
}

/**
 * destroy all game objects
 */
function allesNeu() {
  sandpit.currentscene.children.removeAll();
}

/**
 * wraps sinus function
 * @param {*} x
 */
function sinus(x) {
  return Math.sin(x)
}

/**
 * mixes array element in a random way (random sort)
 * @param {*} array
 */
function mischen(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Returns if a value is a string
function istText(wert) {
  return typeof wert === 'string' || wert instanceof String;
}

/**
 * return if value is a number
 * @param {*} value
 */
function istZahl (value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * return if value is an object
 * @param {*} value
 */
function istObjekt (value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

/**
 * return if value is an function
 * @param {*} value
 */
function istFunktion (value) {
  return typeof value === 'function';
}

/**
 * stringify an object
 * @param {*} value
 */
function zuText(daten) {
  return JSON.stringify(daten);
}

/**
 * parse a json-string to an object
 * @param {*} text
 */
function zuObjekt(text) {
  return JSON.parse(text);
}

/** save in localstorage */
function speichern(name, daten) {
  localStorage.setItem(name, daten);
}

/** load from localstorage */
function laden(name) {
  return localStorage.getItem(name);
}

function stoppeRotation(figur) {
  if (figur.length != undefined) {
    figur.forEach(function(elm, index) {
      stopRotatingAroundFigure(elm)
    })
  } else {
    stopRotatingAroundFigure(figur)
  }
}

function stopRotatingAroundFigure(figure) {
  if(figure.rotateAroundFigure)
    clearInterval(figure.rotateAroundFigure)
}

function rotiereUmFigur(figur, zielFigur, radius, geschw, letztenWinkel) {
  if (figur.length != undefined) {
    figur.forEach(function(elm, index) {
      rotateAroundFigure(elm, zielFigur, radius, geschw, letztenWinkel)
    })
  } else {
    rotateAroundFigure(figur, zielFigur, radius, geschw, letztenWinkel)
  }
}

function rotateAroundFigure(figure, targetFigure, radius, speed, useLastAngle) {
  stopUhrStarten();

  let centerX = targetFigure.X()
  let centerY = targetFigure.Y()
  let x, y, angel, radian, time;

  if(useLastAngle && figure.time) {
    time = figure.time
  } else {
    time = 0
    radian = (Math.atan2(figure.Y() - centerY, figure.X() - centerX) / speed);
    figure.radian = radian;
  }

  figure.rotateAroundFigure = setInterval(function() {
    angel = (stopUhrSekunden() + figure.radian + time) * speed;
    x = Math.sin(angel) * radius + centerX;
    y = Math.cos(angel) * radius + centerY;
    figure.verschieben(x, y);
    figure.time = stopUhrSekunden() + time;
  }, 1);
}
