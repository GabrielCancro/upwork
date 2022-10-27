/**
 * Main class for an interactive object. Please prefer these functions on figures if possible.
 * use figur-Function for creation @see sand.js
 * DONT USE functions marked as *private*
 * @param {*} gameObject
 */
function SandFigure(gameObject) {
  this.me = this;
  this.internalObject = gameObject;
  this.pointerdown = false;
  this.dragDepth = null;
  this.worldWrap = -1;
  this.delay = {
    start : null,
    ms : null,
    end : null,
    wait : false
  };
  this.initialize();
}

/** private
 * internal function for initialization
 */
SandFigure.prototype.initialize = function() {
  if (this.art() !== "partikel") {
    sandpit.currentscene.physics.world.enable(this.internalObject);
  }

  this.subscribeToEvents = function(thisFigure) {
    this.internalObject.on('pointerdown', function (pointer) {
      if (thisFigure.gelöscht) return;
      thisFigure.pointerdown = true;
      thisFigure.halten(pointer.x, pointer.y);
    });

    this.internalObject.on('pointermove', function (pointer) {
      if (thisFigure.gelöscht) return;
      if (thisFigure.pointerdown) {
        if (thisFigure.dragDepth == null  && thisFigure.aufReihenfolge() > GANZ_HINTEN) {
          thisFigure.dragDepth = thisFigure.aufReihenfolge();
          console.log("down", thisFigure.dragDepth)
          thisFigure.aufReihenfolge(GANZ_VORNE + 1);
        }
        thisFigure.ziehen(pointer.x, pointer.y);
      }

    });

    this.internalObject.on('pointerup', function (pointer) {
      if (thisFigure.gelöscht) return;
      thisFigure.pointerdown = false;
      console.log("up", thisFigure.dragDepth)
      thisFigure.aufReihenfolge(thisFigure.dragDepth);
      thisFigure.dragDepth = null;

      thisFigure.antippen(pointer.x, pointer.y);
    });

    sandpit.currentscene.events.on('update', function() {
      if (thisFigure.gelöscht) return;
      thisFigure.wiederholen();
      if (thisFigure.worldWrap > -1) {
        endlosWelt(thisFigure, thisFigure.worldWrap);
      }

      if (thisFigure.internalObject.body) {
        if (thisFigure.internalObject.body.embedded) thisFigure.internalObject.body.touching.none = false;

        var touching = !thisFigure.internalObject.body.touching.none;
        var wasTouching = !thisFigure.internalObject.body.wasTouching.none;

        if (touching && !wasTouching) {
          thisFigure.internalObject.emit("overlapstart", thisFigure);
        }
        else if (!touching && wasTouching) {
          thisFigure.internalObject.emit("overlapend", thisFigure);
        }
      }
    });

  };

  this.subscribeToEvents(this);
}

/* private */
SandFigure.prototype.art = function() {
  return "figur";
}

/* private */
SandFigure.prototype.klone = function() {
  var oldObject = this.internalObject;

  figure = sandpit.currentscene.add.sprite(oldObject.x, oldObject.y, this.name).setInteractive();
  this.internalObject = figure;
  this.initialize();
  this.internalObject.setScale(oldObject.scale);
  this.internalObject.tint = oldObject.tint;
  this.internalObject.body.velocity = oldObject.body.velocity;
  this.internalObject.body.setAngularVelocity(oldObject.body.angularVelocity);
  /*this.internalObject.displayWidth = oldObject.displayWidth;
  this.internalObject.displayHeight = oldObject.displayHeight;*/
  this.internalObject.setAngle(oldObject.angle);
  this.internalObject.setFlipX(oldObject.flipX);
  this.internalObject.setFlipY(oldObject.flipY);
  //this.internalObject.setVisible(oldObject.visible)
  this.internalObject.setAlpha(oldObject.alpha)
  this.internalObject.setDepth(oldObject.depth)
  //berührt... wie erkennen und klonen?
  this.internalObject.body.setCollideWorldBounds(oldObject.body.collideWorldBounds)
  this.internalObject.body.setBounce(oldObject.body.bounce)
  if (oldObject.body.gravityX !== undefined) {
    this.internalObject.body.setGravityX(oldObject.body.gravityX)
  }
  if (oldObject.body.gravityY !== undefined) {
    this.internalObject.body.setGravityY(oldObject.body.gravityY)
  }
  var me = this;
  if (this.collider != undefined) {
    var oldCollider = this.collider;
    this.collider = sandpit.currentscene.physics.add.overlap(this.internalObject, oldCollider.object2, oldCollider.collideCallback)
    oldCollider.destroy()
  }

  oldObject.destroy();
}

/** figure will say a text for a duration */
SandFigure.prototype.sag = function(text, dauer) {
  console.log(text);
  sagen(text, this.internalObject.x - (this.internalObject.displayWidth/2), 20 + this.internalObject.y + (this.internalObject.displayHeight/2), dauer);
}

/**
 * play animation of a figure
 * @param {*} name name of the animation
 */
SandFigure.prototype.animiere = function(name) {
  this.internalObject.play(name);
}

/**
 * stop the animation
 */
SandFigure.prototype.animationStop = function() {
  if (!this.internalObject.anims || !this.internalObject.anims.currentAnim) {
    return;
  }
  this.internalObject.anims.stopOnFrame(this.internalObject.anims.currentAnim.getFrameAt(0))
}

/**
 * colorize the figure with a color
 * @param {*} farbe hex color @see sand.js
 */
SandFigure.prototype.färben = function(farbe) {
  if (!farbe) {
    this.internalObject.tint = undefined;
  } else {
    this.internalObject.tint = farbe;
  }

}

/**
 * fill the figure with a color
 * @param {*} farbe hex color @see sand.js
 */
SandFigure.prototype.füllFarbe = function(farbe) {
  if (!farbe) {
    this.internalObject.fillColor = undefined;
  } else {
    this.internalObject.fillColor = farbe;
  }

}

/**
 * set physics-engine for figure to an endless word (will wrap on game world edges)
 * @param {*} padding
 */
SandFigure.prototype.endlosWelt = function(padding) {
  if (padding === undefined) {
    this.worldWrap = this.breite() / 2;
  } else {
    this.worldWrap = padding;
  }
}

/**
 * set position with distance to the given direction (no animated movement)
 * @param {*} direction
 * @param {*} distance
 */
SandFigure.prototype.bewegen = function(direction, distance) {
  if (direction === OBEN) {
    this.internalObject.setY(this.internalObject.y - distance);
  } else if (direction === UNTEN) {
    this.internalObject.setY(this.internalObject.y + distance);
  } else if (direction === LINKS) {
    this.internalObject.setX(this.internalObject.x - distance);
  } else if (direction === RECHTS) {
    this.internalObject.setX(this.internalObject.x + distance);
  }
}

/**
 * stop movement of figure (set velocity to zero)
 */
SandFigure.prototype.stoppen = function() {
  bewegungStoppen(this);
}

/** @see sand.js */
SandFigure.prototype.bewegenX = function(x) {
  if (x !== undefined) {
    bewegenX(this, x);
  }

  return this.internalObject.body.velocity.x;
}

/** @see sand.js */
SandFigure.prototype.bewegenY = function(y) {
  if (y !== undefined) {
    bewegenY(this, y);
  }

  return this.internalObject.body.velocity.y;
}

/** @see sand.js */
SandFigure.prototype.bewegenNach = function(x, y, geschwindigkeit) {
  bewegenNach(this, x, y, geschwindigkeit);
}

/** @see sand.js */
SandFigure.prototype.bewegenBis = function(x, y, geschwindigkeit, callback, toleranz) {
  var bToleranz = 15;
  if (toleranz !== undefined) {
    bToleranz = toleranz;
  }
  bewegenBis(this, x, y, geschwindigkeit, bToleranz, callback);
}

/** @see sand.js */
SandFigure.prototype.beschleunigung = function(x, y) {
  beschleunigung(this, x, y);
}

/** @see sand.js */
SandFigure.prototype.bremsen = function() {
  bremsen(this);
}

/**
 * getter and setter property for figrue scale
 * @param {*} größe sets scale if defined
 */
SandFigure.prototype.größe = function(größe) {
  if (größe !== undefined) {
    this.internalObject.setScale(größe);
  }

  return this.internalObject.scale;
}

/**
 * getter and setter property for figure x-position
 * return x-position of figure
 * @param {*} x set x if defined
 */
SandFigure.prototype.X = function(x) {
  if (x !== undefined) {
    this.internalObject.setX(x);
  }

  return this.internalObject.x;
}

/**
 * getter and setter property for figure y-position
 * return y-position of figure
 * @param {*} y set y if defined
 */
SandFigure.prototype.Y = function(y) {
  if (y !== undefined) {
    this.internalObject.setY(y);
  }

  return this.internalObject.y;
}

/**
 * getter and setter property for figure position
 * return position of figure
 * @param {*} position set position if defined
 */
SandFigure.prototype.positionXY = function(position) {
  if (typeof position.x === 'number') {
    this.X(position.x);
  }
  if (typeof position.y === 'number') {
    this.Y(position.y);
  }
}

/**
 * setter property for figure position
 * return position of figure
 * @param {*} x set x-position if defined --> if x is a position-object, positionXY will be called!
 * @param {*} y set y-position if defined
 */
SandFigure.prototype.position = function(x,y) {
  if (typeof x === 'object') {
    this.positionXY(x);
    return;
  }
  if (typeof x === 'number') {
    this.X(x);
  }
  if (typeof y === 'number') {
    this.Y(y);
  }
}

/**
 * get center x-coordinate of figure
 */
SandFigure.prototype.mittelPunktX = function() {
  return this.internalObject.getCenter().x;
}

/**
 * get center y-coordinate of figure
 */
SandFigure.prototype.mittelPunktY = function() {
  return this.internalObject.getCenter().y;
}

/**
 * get top-coordinate of figure
 */
SandFigure.prototype.oben = function() {
  return this.internalObject.getTopCenter().y;
}

/**
 * get bottom-coordinate of figure
 */
SandFigure.prototype.unten = function() {
  return this.internalObject.getBottomCenter().y;
}

/**
 * get left-coordinate of figure
 */
SandFigure.prototype.links = function() {
  return this.internalObject.getLeftCenter().x;
}

/**
 * get right-coordinate of figure
 */
SandFigure.prototype.rechts = function() {
  return this.internalObject.getRightCenter().x;
}

/**
 * set origin of figure (important for rotation, etc.)
 */
SandFigure.prototype.mittelPunkt = function(mx, my) {
  this.internalObject.setOrigin(mx, my);
}

/**
 * getter and setter property for figure width
 * return width of figure
 * @param {*} breite set width if defined
 */
SandFigure.prototype.breite = function(breite) {
  if (breite !== undefined) {
    this.internalObject.displayWidth = breite;
  }

  return this.internalObject.displayWidth;
}

/**
 * getter and setter property for figure height
 * return height of figure
 * @param {*} hoehe set hoehe if defined
 */
SandFigure.prototype.hoehe = function(hoehe) {
  if (hoehe !== undefined) {
    this.internalObject.displayHeight = hoehe;
  }

  return this.internalObject.displayHeight;
}

/**
 * check if figure position is inside game world
 */
SandFigure.prototype.inWelt = function() {
  var hX = (this.internalObject.getRightCenter().x < 0 || this.internalObject.getLeftCenter().x > 800);
  var vY = (this.internalObject.getBottomCenter().y < 0 || this.internalObject.getTopCenter().y > 450);
  return !(hX || vY);
}

/**
 * getter and setter property for figure angle (in degrees)
 * return angle of figure
 * @param {*} winkel set angle if defined
 */
SandFigure.prototype.richtung = function(winkel) {
  if (winkel !== undefined) {
    this.internalObject.setAngle(winkel);
  }

  return this.internalObject.angle;
}

/**
 * set angle of figure to a coordinate
 * @param {*} x
 * @param {*} y
 */
SandFigure.prototype.dreheZu = function(x,y) {
  this.internalObject.setAngle(winkel(this.internalObject.x, this.internalObject.y, x, y));
}

/**
 * set angle of figure to a degree
 * @param {*} winkel degree
 */
SandFigure.prototype.drehen = function(winkel) {
  this.internalObject.setAngle(this.internalObject.angle + winkel);
}

/**
 * getter and setter property for figure rotation (angular velocity)
 * return rotation of figure
 * @param {*} geschwindigkeit velocity of rotation
 */
SandFigure.prototype.drehung = function(geschwindigkeit) {
  if (geschwindigkeit !== undefined) {
    this.internalObject.body.setAngularVelocity(geschwindigkeit);
  }

  return this.internalObject.body.angularVelocity;
}

/** private */
SandFigure.prototype.zieleAuf = function(figur) {
  // TODO!!!
  const winkel = winkelZwischen(this, figur);
  this.internalObject.setAngle(winkel);
}

/**
 * getter and setter property for figure horizontal flip X
 * return x-flip of figure
 * @param {*} spiegeln set flipX if defined
 */
SandFigure.prototype.spiegelHorizontal = function(spiegeln) {
  if (spiegeln !== undefined) {
    this.internalObject.setFlipX(spiegeln);
  }

  return this.internalObject.flipX;
}

/**
 * getter and setter property for figure vertical flip Y
 * return y-flip of figure
 * @param {*} spiegeln set flipY if defined
 */
SandFigure.prototype.spiegelVertikal = function(spiegeln) {
  if (spiegeln !== undefined) {
    this.internalObject.setFlipY(spiegeln);
  }

  return this.internalObject.flipY;
}

/**
 * hide figure
 */
SandFigure.prototype.verstecken = function() {
  this.internalObject.setVisible(false);
}

/**
 * show figure
 */
SandFigure.prototype.zeigen = function() {
  this.internalObject.setVisible(true);
}

/**
 * destroy and delete figure
 */
SandFigure.prototype.löschen = function() {
  this.gelöscht = true;
  this.internalObject.destroy();
}

/**
 * getter and setter property for figure transparency (0 - not visible, 1 - not transparent, 0.5 - 50%)
 * return transparency of figure
 * @param {*} wert set transparency if defined
 */
SandFigure.prototype.durchsichtig = function(wert) {
  if (wert !== undefined) {
    this.internalObject.setAlpha(wert);
  }

  return this.internalObject.alpha;
}

/**
 * getter and setter property for figure depth (z-index)
 * return depth of figure
 * @param {*} spiegeln set depth if defined
 */
SandFigure.prototype.aufReihenfolge = function(stelle) {
  if (this.internalObject.scene !== undefined && stelle != undefined) {
    this.internalObject.setDepth(stelle);
  }

  return this.internalObject.depth;
}

/** set figure on z-index to front */
SandFigure.prototype.ganzNachVorne = function() {
  if (this.internalObject.scene !== undefined) {
    this.internalObject.setDepth(GANZ_VORNE);
  }
}

/** set figure on z-index to back */
SandFigure.prototype.ganzNachHinten = function() {
  if (this.internalObject.scene !== undefined) {
    this.internalObject.setDepth(GANZ_HINTEN);
  }
}

/** set figure on z-index to back for one */
SandFigure.prototype.nachHinten = function() {
  if (this.internalObject.scene !== undefined) {
    this.internalObject.setDepth(this.internalObject.depth - 1);
  }
}

/** set figure on z-index to front for one */
SandFigure.prototype.nachVorne = function() {
  if (this.internalObject.scene !== undefined) {
    this.internalObject.setDepth(this.internalObject.depth + 1);
  }
}

/** position figure on x and y */
SandFigure.prototype.verschieben = function(x,y) {
  this.internalObject.setX(x);
  this.internalObject.setY(y);
}

/**
 * enables/disables control via cursor
 * @param {*} aktiv
 */
SandFigure.prototype.steuerung = function(aktiv) {

  if (aktiv !== undefined) {
    this.steuerbar = aktiv;
    if (aktiv && sandpit.pad == null && sandpit.memory.hasTouch) {
      var me = this.me;
      this.figurePad = joystick(100, 350, function(daten) {
        //me.steuern(mapPad(daten));
      }, true);

    }
  }
  return this.steuerbar;
}


SandFigure.prototype.angetippt = function() {
  /* Bitte mit Phantasie befüllen! Funktion darf im Sandkasten überschrieben werden. */
}

/** overwrite this function for click handling (mouse up) */
SandFigure.prototype.antippen = function(x,y) {
  this.angetippt(x,y);
}

SandFigure.prototype.gehalten = function() {
  /* Bitte mit Phantasie befüllen! Funktion darf im Sandkasten überschrieben werden. */
}

/** overwrite this function for mouse down handling */
SandFigure.prototype.halten = function(x,y) {
  this.gehalten(x,y);
}

SandFigure.prototype.gezogen = function() {
  /* Bitte mit Phantasie befüllen! Funktion darf im Sandkasten überschrieben werden. */
}

/** overwrite this function for mouse down movement handling */
SandFigure.prototype.ziehen = function(x,y) {
  this.gezogen(x,y);
}

/** not needed currently, overwrite for looping on figure */
SandFigure.prototype.wiederholt = function() {
  /* Bitte mit Phantasie befüllen! Funktion darf im Sandkasten überschrieben werden. */
}

SandFigure.prototype.wiederholen = function() {
  if (this.wartenVorbei() === false) {
    return;
  }

  if (this.steuerung()) {
    this.steuern(currentControl());
  }

  this.wiederholt();
}

/**
 * cursor control for figure. default implementation if control is enabled.
 * @param {} richtung
 */
SandFigure.prototype.steuern = function(richtung) {
  /* Bitte mit Phantasie befüllen! Funktion darf im Sandkasten überschrieben werden. */
  this.internalObject.body.setVelocity(0);

  if (richtung.links) {
    this.internalObject.body.setVelocityX(-300);
  } else if (richtung.rechts) {
    this.internalObject.body.setVelocityX(300);
  }

  if (richtung.oben) {
    this.internalObject.body.setVelocityY(-300);
  } else if (richtung.unten) {
    this.internalObject.body.setVelocityY(300);
  }
}


/** not needed currently, overwrite for looping on figure */
SandFigure.prototype.warte = function(ms) {
  const start = performance.now();
  this.delay = {
    start : start,
    ms : ms,
    end : (ms + start),
    wait : true
  };
}

/**
 * collision detection with other figure. callback will be called once after collision
 * @param {*} figur collided figure
 * @param {*} callback function after collision
 */
SandFigure.prototype.berührt = function(figur, callback) {
  if (!figur) return;
  var me = this;
  this.collider = sandpit.currentscene.physics.add.overlap(this.internalObject, figur.internalObject, function(first, second) {
    second.on("overlapstart", function(figure) {
      //console.log("overlap start!");
      if (me.gelöscht || figure.gelöscht) return;
      callback(me, figure);
    });
    /*figur.internalObject.on("overlapend", function(figure) {
      console.log("overlapend event", figure.id);
    });*/
  });

}

/** private, overwrite only for own collision handling */
SandFigure.prototype.berühren = function(figur) {
  this.berührt(figur);
}

/** private */
SandFigure.prototype.wartenVorbei = function() {
  if (this.delay.wait === false) {
    return true;
  }

  const jetzt = performance.now();
  if (this.delay.end <= jetzt) {
    this.delay.wait = false;
    return true;
  }

  return false;
}

/**
 * figure explodes
 */
SandFigure.prototype.explodieren = function() {
  explodieren(this);
}

/**
 * figure dances
 */
SandFigure.prototype.tanzen = function() {
  tanzen(this);
}

/**
 * figure shakes
 */
SandFigure.prototype.zittern = function() {
  zittern(this);
}

/**
 * figure bursts
 */
SandFigure.prototype.platzen = function() {
  platzen(this);
}

/**
 * figure shrinks
 */
SandFigure.prototype.schrumpfen = function() {
  schrumpfen(this);
}

/**
 * figure flattened
 */
SandFigure.prototype.plätten = function() {
  plätten(this);
}

/**
 * add gravity on axis
 * @param {*} x x-gravity
 * @param {*} y y-gravity
 * @param {*} kollidiert true if should collide with world
 */
SandFigure.prototype.schwerkraft = function(x,y, kollidiert) {
  this.internalObject.body.setCollideWorldBounds(kollidiert)
  this.internalObject.body.setBounce(0.1)
  if (x != undefined) {
    this.internalObject.body.setGravityX(x)
  }
  if (y != undefined) {
    this.internalObject.body.setGravityY(y)
  }

}

/**
 * CLASS for interactive text figure (inherits SandFigure class)
 * use text-Function for creation @see sand.js
 * @param {*} textFigure
 */
function SandText(textFigure) {
  SandFigure.call(this, textFigure);
}

/** private */
SandText.prototype.art = function() {
  return "text";
}

/** private */
SandText.prototype = Object.create(SandFigure.prototype);
/** private */
SandText.prototype.constructor = SandText;

/** sets new Text in the text object */
SandText.prototype.schreibe = function(text) {
  this.internalObject.setText(text);
}

/** returns text from the text object */
SandText.prototype.text = function() {
  return this.internalObject.text
}

/**
 * CLASS for interactive media stream (inherits SandFigure class)
 * use webcamVideo-Function for creation @see sand.js
 * @param {*} video-object
 */
function SandStream(video) {
  //SandFigure.call(this, video);
  this.me = this;
  this.internalObject = video;
  this.streamLoaded = false;
}

/** private */
SandStream.prototype.art = function() {
  return "stream";
}

/** private */
SandStream.prototype = Object.create(SandFigure.prototype);
/** private */
SandStream.prototype.constructor = SandText;

/** plays the media stream */
SandStream.prototype.abspielen = function(fertig) {
  if (this.streamLoaded) {
    this.internalObject.play(true);
  } else {
    let me = this;
    setTimeout(function() {
      me.internalObject.play(true);
      if (fertig) {
        fertig();
      }
    }, 2500);
  }
}

/** plays the media stream, takes a photo and shows it */
SandStream.prototype.fotografieren = function(fertig) {
  if (this.streamLoaded) {
    this.internalObject.play(true);
    let me = this;
    var foto;
    setTimeout(function() {
      var fotoDatei = me.internalObject.snapshot();
      foto = sandpit.currentscene.add.image(me.internalObject.x, me.internalObject.y, fotoDatei);
      foto.setScale(me.internalObject.scale);
      me.webcamObject = me.internalObject;
      me.internalObject = foto;
      if (fertig) {
        fertig();
      }
    }, 2000);
  } else {
    let me = this;
    setTimeout(function() {
      me.internalObject.play(true);
      var foto;
      setTimeout(function() {
        var fotoDatei = me.internalObject.snapshot();
        foto = sandpit.currentscene.add.image(me.internalObject.x,me.internalObject.y, fotoDatei);
        foto.setScale(me.internalObject.scale);
        me.webcamObject = me.internalObject;
        me.internalObject = foto;
        if (fertig) {
          fertig();
        }
      }, 2000);
    }, 2500);
  }
}


/** plays the media stream */
SandStream.prototype.stop = function() {
  this.internalObject.stop(true);
}


/** CLASS SandGroup
 * represents a group of SandFigures
 * use gruppe-Function for creation @see sand.js
 */
function SandGruppe(group) {
  this.internalObject = group;
  this.objects = [];
}

/** private */
SandGruppe.prototype.art = function() {
  return "gruppe";
}

/** add figure to group */
SandGruppe.prototype.figurAufnehmen = function(figur) {
  this.hinzufügen(figur);
}

/** private */
SandGruppe.prototype.hinzufügen = function(figur) {
  figur.internalObject.id = figur.id;
  this.objects.push(figur);
  this.internalObject.add(figur.internalObject);
}

/** check if a figure in this group is near the coordinates including tolerance */
SandGruppe.prototype.figurInDerNähe = function(x,y, toleranz) {
  var found = null;
  this.objects.find(function(child) {
    if (inDerNähe(child.internalObject.x, child.internalObject.y, x, y, toleranz)) {
      found = child;
    }
  });
  return found;
}

/** get objects length */
SandGruppe.prototype.anzahl = function() {
  return this.objects.length;
}

/** get figure at index */
SandGruppe.prototype.holeFigur = function(nummer) {
  return this.objects[nummer];
}

/** get figure at index */
SandGruppe.prototype.alleLöschen = function() {
  this.objects.forEach(function(figure) {
    figure.löschen();
  })
  this.objects.splice(0, this.objects.length);
}

/** get figure at index */
SandGruppe.prototype.alleEntfernen = function() {
  this.objects.splice(0, this.objects.length);
}

/**
 * CLASS for sound
 * use geräusch-Function for creation @see sand.js
 * @param {*} sound
 */
function SandSound(sound) {
  this.internalObject = sound;
}

/** private */
SandSound.prototype.art = function() {
  return "geräusch";
}

/** play the sound */
SandSound.prototype.abspielen = function() {
  var me = this;
  if (this.ready) {
    this.internalObject.play();
    if (this.intervalHandle !== undefined) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  } else {
    //try to call this until asset is ready.
    if (this.intervalHandle === undefined) {
      this.intervalHandle = setInterval(function() {
        me.abspielen();
      }, 300);
    } else {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  }
}

/** stop the sound */
SandSound.prototype.ruhe = function() {
  this.internalObject.stop();
}

/**
 * set to endless loop
 * @param {*} endlos endless-boolean
 */
SandSound.prototype.endlos = function(endlos) {
  if (endlos == undefined) {
    this.internalObject.setLoop(true);
  } else {
    this.internalObject.setLoop(endlos);
  }
  return this;
}

/** play endless */
SandSound.prototype.endlosAbspielen = function() {
  this.endlos(true);
  this.internalObject.play();
}

/**
 * CLASS SAndInstrument
 * @param {*} synth
 */
function SandInstrument(synth) {
  this.internalObject = synth;
  this.sequences = [];
}

/**
 * plays a synth tone
 * @param {*} ton the musical note like 'C3'
 * @param {*} dauer duration, ex. '4n' quarter note. seconds also possible
 */
SandInstrument.prototype.spieleTon = function(ton, dauer) {
  this.internalObject.triggerAttackRelease(ton, dauer);
  Tone.Transport.start();
}

/**
 * play a reccurring sequence of synth tone
 * @param {*} töne array with musicalnotes
 * @param {*} dauer speed of the sequence, '4n' quarter note
 * @param {*} notendauer length of one note, eg. '10hz'
 */
SandInstrument.prototype.spieleTöne = function(töne, dauer, notendauer) {
  var me = this.internalObject;
  if (notendauer === undefined) {
    notendauer = "10hz";
  }
  const synthPart = new Tone.Sequence(
    function(time, note) {
      me.triggerAttackRelease(note, notendauer, time);
    },
    töne,
    dauer
  );
  // Setup the synth to be ready to play on beat 1
  synthPart.start();
  this.sequences.push(synthPart);

  // Start the transport which is the main timeline
  Tone.Transport.start();
}

/**
 * stop all sounds from the synth
 */
SandInstrument.prototype.ruhe = function() {
  this.sequences.forEach(function(seq) {
    seq.stop();
  })
  Tone.Transport.stop();
}

/**
 * CLASS SandJoystick
 * @param {*} joystick
 */
function SandJoystick(joystick) {
  this.internalObject = joystick;
}

SandJoystick.prototype.holeStatus = function() {
  return mapPad(this.internalObject);
}

/**
 * Will be called on update if joystick is being used.
 * @param {} richtung data from mapPad
 */
SandJoystick.prototype.gedrückt = function(richtung) {
  /* nutze mich! */
}

/**
 * CLASS SandKnopf
 * @param {*} knopf
 */
function SandKnopf(knopf) {
  this.internalObject = knopf;
}

/**
 * bind button to a key
 * @param {*} taste
 */
SandKnopf.prototype.tasteVerbinden = function(taste) {
  this.internalObject.addKey(taste);
}

SandKnopf.prototype.gedrückt = function(taste) {
  /* nutze mich! */
}

SandKnopf.prototype.losgelassen = function(taste) {
  /* nutze mich! */
}

/** CLASS for particle */
function SandPartikel(particleManager, cfg) {
  SandFigure.call(this, particleManager);
  //this.particleManager = particleManager;
  this.initialize(cfg);
}

/** private */
SandPartikel.prototype.initialize = function(cfg) {
  SandFigure.call(this);
  if (cfg != undefined) {
    this.cfg = cfg;
    this.internalObject.createEmitter(cfg);
  }
}

/** private */
SandPartikel.prototype = Object.create(SandFigure.prototype);
/** private */
SandPartikel.prototype.constructor = SandPartikel;

/** advanced only create a particle emmitter from cfg */
SandPartikel.prototype.erstellen = function(cfg) {
  return this.internalObject.createEmitter(cfg);
}

/**
 * create effekt with name:
 * - brennen - fire
 * - sprühen - spray
 * - qualmen - smoke
 * - plätschern - water
 * - feuerwerk - firework
 * - glitzern - glitter sparkle
 * @param {*} name
 */
SandPartikel.prototype.effektErstellen = function(name) {
  if (name == "brennen") {
    this.brennen();
  } else if (name == "sprühen"){
    this.sprühen();
  } else if (name == "qualmen") {
    this.qualmen();
  } else if (name == "plätschern") {
    this.plätschern();
  } else if (name == "feuerwerk") {
    this.feuerwerk();
  } else if (name == "glitzern") {
    this.glitzern();
  }
}

/** stop emitting particles */
SandPartikel.prototype.stop = function() {
  this.internalObject.emitters.list.forEach(emitter => {
    emitter.stop()
  });
}

/**
 * burning particles
 */
SandPartikel.prototype.brennen = function() {
  var cfg = {
    alpha: { start: 1, end: 0 },
    scale: { start: 0.1, end: 0.3 },
    tint: { start: 0xff945e, end: 0xff945e },
    speed: 10,
    accelerationY: -100,
    angle: { min: -85, max: -95 },
    rotate: { min: -45, max: 45 },
    lifespan: { min: 1000, max: 1500 },
    blendMode: 'ADD',
    frequency: 80,
    maxParticles: 50
  };
  this.effekt = "brennen";
  this.erstellen(cfg);
}

/**
 * spraying particles
 */
SandPartikel.prototype.sprühen = function() {
  var cfg = {
    alpha: { start: 1, end: 0 },
    scale: { start: 0.1, end: 0.1 },
    tint: { start: 0xff945e, end: 0xff945e },
    speed: 10,
    angle: { min: -85, max: -95 },
    rotate: { min: -45, max: 45 },
    lifespan: { min: 500, max: 1000 },
    blendMode: 'ADD',
    frequency: 50,
    maxParticles: 250
  };
  this.effekt = "sprühen";
  this.erstellen(cfg);
}

/**
 * smoking particles
 */
SandPartikel.prototype.qualmen = function() {
  var cfg = {
    alpha: { start: 0.8, end: 0 },
    scale: { start: 0.1, end: 0.5 },
    speed: 15,
    accelerationY: -50,
    angle: { min: 0, max: 180 },
    rotate: { min: -180, max: 180 },
    lifespan: { min: 1000, max: 1500 },
    frequency: 180,
    maxParticles: 50
  };
  this.effekt = "qualmen";
  this.erstellen(cfg);
}

/**
 * waterfall particles
 */
SandPartikel.prototype.plätschern = function() {
  var cfg = {
    alpha: { start: 0.8, end: 0 },
    scale: { start: 0.1, end: 0.2 },
    speed: 10,
    gravityY: 150,
    angle: { min: -90, max: 90 },
    rotate: { min: -30, max: 30 },
    lifespan: { min: 1000, max: 1500 },
    frequency: 180,
    maxParticles: 50
  };
  this.effekt = "plätschern";
  this.erstellen(cfg);
}

/**
 * firework particles
 */
SandPartikel.prototype.feuerwerk = function() {
  var cfg = {
    angle: { min: 0, max: 360 },
    speed: { min: -100, max: 500 },
    gravityY: 200,
    scale: { start: 0.4, end: 0.1 },
    lifespan: 800,
    blendMode: 'SCREEN'
  };
  this.effekt = "feuerwerk";
  this.erstellen(cfg);
}

/**
 * sparkling glitter particles
 */
SandPartikel.prototype.glitzern = function() {
  var cfg = {
    //angle: { min: 0, max: 360 },
    scale: { start: 0.4, end: 0.8 },
    rotate: { min: -90, max: 90 },
    alpha: { start: 0.8, end: 0 },
    lifespan: 800,
    frequency: 2000,
    blendMode: 'SCREEN'
  };
  this.effekt = "glitzern";
  this.erstellen(cfg);
}

/** particles will follow figure */
SandPartikel.prototype.folgen = function(figur) {
  this.following = true;
  this.internalObject.emitters.list.forEach(emitter => {
    emitter.startFollow(figur.internalObject)
  });
}

/** private */
SandPartikel.prototype.art = function() {
  return "partikel";
}

/** CLASS Animation */
function SandAnimation(animation, cfg) {
  this.internalObject = animation;
  if (cfg != undefined) {
    this.cfg = cfg;
  }
}

/** private */
SandAnimation.prototype.art = function() {
  return "animation";
}

/** private */
SandAnimation.prototype.constructor = SandAnimation;
