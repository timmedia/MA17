var game;

// Globale variable mit häufig genutzen Objekten

/*
Die Grundidee der Objekte stammt von:
https://mozdevs.github.io/html5-games-workshop/en/guides/platformer/the-main-character-sprite/

Lösung zu eine Kontext-Problem (bei Phaser.Sprite.call ist es 'context.game' anstatt nur 'context'): http://www.html5gamedevs.com/topic/4830-animations-adding-error-in-extended-sprite/#comment-56740

*/

Player = function(x, y, sprite, walkSpeed, jumpSpeed, context) {
  // Sprite
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  // Festpunkt unten in der Mitte
  this.anchor.setTo(0.5, 0.5);

  // Animationen werden hinzugefügt
  this.animations.add('idle', [0,1,2,3,4], 5, true);
  this.animations.add('walk', [0,1,2,3,4], 5, true);
  this.animations.add('jump', [0,1,2,3,4], 5, true);

  // Laufgeschwindigkeit und Sprungkraft werden abgespeichert
  this.walkSpeed = walkSpeed;
  this.jumpSpeed = jumpSpeed;

  // sobald sich etwas schneller als mit der Geschwindigkeit 900 bewegt, gibt es Physikprobleme
  this.maxFallingSpeed = 900;

  // Physik wird für den Spieler aktiviert
  context.game.physics.arcade.enable(this);

  // Objekt wird ins Spiel hinzugefügt
  context.game.add.existing(this);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Box = function(x, y, sprite, drag, bounce, context) {
  // Sprite wird hinzugefügt, Festpunkt gesetzt
  Phaser.Sprite.call(this, context.game, x, y, sprite);
  this.anchor.setTo(0.5, 1);

  // Physik aktiviert, Körper soll mit dem Weltrand kollidieren
  context.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  // Reibung wird gesetzt (sonst würden sie gleiten)
  this.body.drag.x = drag;

  // Aufsprung
  this.body.bounce.y = bounce;

  // Objekt wird ins Spiel hinzugefügt
  context.game.add.existing(this);
}
Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Button = function(x, y, sprite, orientation, collideCallback, context) {
  Phaser.Sprite.call(this, context.game, x, y, sprite);
  this.anchor.setTo(0.5, 1);
  this.animations.add('up', [0], 2, false);
  this.animations.add('down', [1], 2, false);
  this.animations.play('up');
  context.game.physics.arcade.enable(this);
  this.body.moves = false;
  // Ausrichtung
  switch (orientation) {
    case 'right':
      this.angle = 90;
      break;
    case 'left':
      this.angle = -90;
      break;
    default:
      this.angle = 0;
  }
  // Knopf soll nur im ersten Berührungsmoment aktiviert werden
  this.collideCallback = function(o1, o2) {
    var collisionCheck;
    switch (orientation) {
      case 'right':
        collisionCheck = o2.body.wasTouching.none && o2.body.touching.right;
        break;
      case 'left':
        collisionCheck = o2.body.wasTouching.none && o2.body.touching.left;
        break;
      case 'down':
        collisionCheck = o2.body.wasTouching.none && o2.body.touching.up;
        break;
      default:
        collisionCheck = false;
    }
    // Funktion wird ausgeführt, Knopf bleibt nur kurz unten
    if(collisionCheck){
      collideCallback(context);
      o2.animations.play('down');
      o2.animations.currentAnim.onComplete.add(function(){o2.animations.play('up')});
    }
  }
  this.game.add.existing(this);
}
Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Door = function(x, y, sprite, orientation, locked, overlapCallback, context) {
  // Sprite wird hinzugefügt & Festpunkt gesetzt, Körper kann sich nicht bewegen
  Phaser.Sprite.call(this, context.game, x, y, sprite);
  this.anchor.setTo(0.5, 1);

  // Animationen der Türe
  this.animations.add('locked', [0], 1, false);
  this.animations.add('closed', [1], 1, false);
  this.animations.add('open', [2], 1, false);
  this.animations.add('opening', [5,4,3,2], 10, false);
  this.animations.add('closing', [2,3,4,5], 10, false);

  // Türe standardgemäss geschlossen
  if(locked){
    this.animations.play('locked');
  }
  else {
    this.animations.play('closed');
  }

  // Türe offen / geschlossen
  this.locked = locked;
  this.unlock = function(){
    this.locked = false;
    this.animations.play('closed');
  }
  this.lock = function(){
    this.locked = true;
    this.animations.play('locked');
  }

  this.processCallback = function(o1, o2) {
    if(!o2.locked) {
      return true;
    }
    else {
      return false;
    }
  }

  // Physik aktiviert, Körper kann sich nicht bewegen
  context.game.physics.arcade.enable(this);
  this.body.moves = false;

  // Orientierung der Türe
  switch (orientation) {
    case 'up':
      this.angle = 0;
      break;
    case 'down':
      this.angle = 180;
      break;
    default:
      this.angle = 0;
  }

  // Funktion welche beim berühren der Türe ausgeführt wird
  this.overlapCallback = function(o1, o2) {

    // Türe soll sich nur im ersten Berührungsmoment öffnen
    var collisionCheck = o2.body.wasTouching.none && !o2.body.touching.none;

    // kann nur geöffnet werden, wenn sie verschlossen ist
    if(!o2.locked && collisionCheck){
      // Öffnungsanimation wird gespielt, danach die im Level bestimmte Funktion ausgeführt
      o2.animations.play('opening');
      o2.closed = false;
      o2.animations.currentAnim.onComplete.add(function(){
        overlapCallback(game)
      });
    }
  }
  context.game.add.existing(this);
}
Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Key = function(x, y, sprite, overlapCallback, context) {
  // Sprite
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  context.game.physics.arcade.enable(this);
  this.body.moves = false;

  context.game.add.existing(this);
}
Key.prototype = Object.create(Phaser.Sprite.prototype);
Key.prototype.constructor = Key;
