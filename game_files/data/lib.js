var BasicGameObject;    // einfaches Objekt, keine Physik/Bewegung
var DynamicGameObject;  // dynamisches Objekt, Physik & Bewegung
var StaticGameObject;   // statisches Objekt, nur Physik, keine Bewegung

var Player;
var Box;
var Button;
var Door;
var Key;

var LoadMapData;
var CheckStandardCollisions;

var SetupParallax;
var UpdateParallax;

var LevelFade;

/* EINFACHES SPRITE OBJEKT */
BasicGameObject = function(context, x, y, key, angle, frame) {
  Phaser.Sprite.call(this, context.game, x, y, key, frame);             // Phaser Sprite Objekt wird erstellt
  this.anchor.setTo(0, 1);                                              // Ankerpunkt unten links
  this.angle = angle || 0;                                              // Sprite wird gedreht falls Winkel angegeben
  context.game.add.existing(this);
}
BasicGameObject.prototype = Object.create(Phaser.Sprite.prototype);     // Prototyp wird vom Phaser Sprite Objekt übernommen
BasicGameObject.constructor = BasicGameObject;                          // Objekt wird sein eigener Konstruktor

/* DYNAMISCHES OBJEKT: kann sich bewegen, kann kollidieren */
DynamicGameObject = function(context, x, y, key, angle, drag, bounce, frame) {
  BasicGameObject.call(this, context, x, y, key, angle, frame);         // Vorher definiertes Objekt als Vorlage
  context.game.physics.arcade.enable(this);                             // Physik (Arcade) wird aktiviert
  this.body.drag.x = drag || 0;                                         // Reibung wird gesetzt, falls nicht vorhanden = 0
  this.body.bounce.y = bounce || 0;                                     // Aufprall wird gesetzt, falls nicht vorhanden = 0
}
DynamicGameObject.prototype = Object.create(BasicGameObject.prototype); // Prototyp wird vom vorherigen Objekt übernommen
DynamicGameObject.constructor = DynamicGameObject;                      // Eigener Konstruktor

/* STATISCHES OBJEKT: kann sich nicht bewegen, jedoch kollidieren */
StaticGameObject = function(context, x, y, key, angle, frame) {
  DynamicGameObject.call(this, context, x, y, key, angle, null, null, frame); // Dynamisches Objekt als Vorlage
  this.body.moves = false;                                              // Objekt kann sich jedoch nicht bewegen
}
StaticGameObject.prototype = Object.create(DynamicGameObject.prototype);// Prototyp vom dynamischen Objekt wird übernommen
StaticGameObject.constructor = StaticGameObject;                        // Konstruktor seiner selbst

/* SPIELER-OBJEKT */
Player = function(context, x, y, key, walkSpeed, jumpSpeed, bounce) {
  DynamicGameObject.call(this, context, x, y, key, null, null, bounce); // Dynamisches Objekt als Vorlage
  this.animations.add('idle', [10,11,12,13], 5, true);                  // Animation: stehen
  this.animations.add('walk', [0,1,2,3,4,5,6,7,8,9], 10, true);         // Animation: laufen
  this.animations.add('jump', [0], 10, true);                           // Animation: springen
  this.anchor.setTo(0.5, 0.5);                                            // Festpunkt soll horizontal mittig sein (wegen der Spieglung bei Richtungswechsel)
  this.body.setSize(25, 72, 17, 0);                                     // Hitbox wird verkleinert
  this.body.maxVelocity.x = walkSpeed;                                  // Laufgeschwindigkeit ab Argument, falls nicht vorhanden = 0
  this.jumpSpeed = jumpSpeed || 0;                                      // Sprunggeschwindigkeit ab Argument, falls nicht vorhanden = 0
}
Player.prototype = Object.create(DynamicGameObject.prototype);
Player.constructor = Player;

Player.prototype.update = function() {
  var rightDown = controls.right.isDown || controls.j_right;
  var leftDown  = controls.left.isDown || controls.j_left;
  var upDown    = controls.up1.isDown || controls.up2.isDown || controls.j_up;
  var gravitySwitched = (this.jumpSpeed < 0)? false : true;
  var grounded = gravitySwitched?
                  this.body.blocked.up || this.body.touching.up :
                  this.body.blocked.down || this.body.touching.down;
  if      (controls.lvl1.isDown) {game.state.start('level_1_1');}
  else if (controls.lvl2.isDown) {game.state.start('level_2_1');}
  else if (controls.lvl3.isDown) {game.state.start('level_3_1');}
  else if (controls.tut.isDown)  {game.state.start('tutorial');}

  if (rightDown && !leftDown) {
    this.body.acceleration.x = 3000;
    this.animations.play('walk');
    this.scale.x = gravitySwitched? -1 : 1;
  }
  else if (leftDown && !rightDown) {
    this.body.acceleration.x = -3000;
    this.animations.play('walk');
    this.scale.x = gravitySwitched? 1 : -1;
  }
  else {
    this.body.velocity.x = 0;
    this.body.acceleration.x = 0;
    if (grounded) {this.animations.play('idle');}
  }
  if (grounded) {
    if (upDown) {this.body.velocity.y = this.jumpSpeed;}
  }
  else {this.animations.play('jump');}
}

Box = function(context, x, y, key, drag, bounce) {
  DynamicGameObject.call(this, context, x, y, key, null, drag, bounce);
  this.body.collideWorldBounds = true;
}
Box.prototype = Object.create(DynamicGameObject.prototype);
Box.constructor = Box;

Button = function(context, x, y, key, angle, callback) {
  StaticGameObject.call(this, context, x, y, key, angle);
  this.body.setSize(24, 24, -4, -4);
  this.callback = callback;
  this.animations.add('u', [0], 1, false);
  this.animations.add('d', [1], 0.5, false);
  this.up = true;
}
Button.prototype = Object.create(StaticGameObject.prototype);
Button.constructor = Button;

Button.prototype.switchState = function(self) {
  if (self.up) {self.up = false;}
  else {
    self.up = true;
    self.animations.play('u');
  }
}

Button.prototype.processCallback = function(self) {
  if (self.up) {
    self.switchState(self);
    self.animations.play('d');
    self.animations.currentAnim.onComplete.add(self.switchState, this);
    return true;
  }
  else {return false;}
}

Door = function(context, x, y, key, angle, locked, callback) {
  StaticGameObject.call(this, context, x, y, key, angle);
  this.endCallback = callback;
  this.animations.add('locked', [0], 1, false);
  this.animations.add('closed', [1], 1, false);
  this.animations.add('open', [2], 1, false);
  this.animations.add('opening', [5,4,3,2], 10, false);
  this.animations.add('closing', [2,3,4,5], 10, false);
  this.anchor.setTo(0.5, 1);
  this.locked = locked;
  this.animations.play(locked? 'locked' : 'closed');
}
Door.prototype = Object.create(StaticGameObject.prototype);
Door.constructor = Door;

Door.prototype.lock = function() {
  this.locked = true;
  this.animations.play('locked');
}

Door.prototype.unlock = function() {
  this.locked = false;
  this.animations.play('closed');
}

Door.prototype.processCallback = function(self) {
    return !self.locked;
}

Door.prototype.callback = function(self) {
  self.animations.play('opening');
  self.animations.currentAnim.onComplete.add(self.endCallback, this);
}

Key = function(context, x, y, key, angle, visible, callback) {
  StaticGameObject.call(this, context, x, y, key, angle);
  this.visible = visible;
  this.callback = callback;
}
Key.prototype = Object.create(StaticGameObject.prototype);
Key.constructor = Key;

Key.prototype.processCallback = function(self) {
  return self.visible;
}

// Überall wo in der JSON-Datei eine Box plaziert wurde, soll ein Box-Objekt hin
// Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db

LoadMapData = function(context, key) {
  var map = context.add.tilemap(key);
  map.addTilesetImage('debug10x10', 'debug10x10');
  map.setCollision(1,8);
  context.layer = map.createLayer('Tile Layer 1');

  if (map.objects['Object Layer Door']) {
    context.doors = context.game.add.group();
    map.objects['Object Layer Door'].forEach(function(door) {
      var locked = false;
      if (door.properties && door.properties.locked) { locked = true; };
      context.door = new Door(context, door.x, door.y, '1_1_door', 0, locked, context.doorAction);
    });
  }
  if (map.objects['Object Layer Boxes']) {
    context.boxes = context.game.add.group();
    map.objects['Object Layer Boxes'].forEach(function(box){
      context.boxes.add(new Box(context, box.x, box.y, '1_1_box', 3000, 0.5));
    });
  }
}

SetupParallax = function(context, foreground, midground, background) {
  var foreground = context.add.sprite(0, 0, foreground);
  var midground = context.add.sprite(0, 0, midground);
  var background = context.add.sprite(0, 0, background);
  midground.sendToBack();
  background.sendToBack();
  return [foreground, midground, background]
}

UpdateParallax = function(context, parallax) {
  parallax[0].x = context.world.x / 3;
  parallax[2].x = - context.world.x / 3;
}

LevelFade = function(context) {
  var fade = context.add.sprite(0, 0, 'blackscreen');
  context.add.tween(fade).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
}
