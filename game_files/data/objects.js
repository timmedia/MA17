// 'game' wird schon vorher definiert, wird hier erwähnt um Errors zu vermeiden
var game;

/*
Objektbibliothek: Eine Sammlung an Konstruktor-Funktionen für häufig benötigte Sprites

Die Grundidee der Objekte stammt von:
https://mozdevs.github.io/html5-games-workshop/en/guides/platformer/the-main-character-sprite/

Lösung zu einem Kontext-Problem (bei Phaser.Sprite.call ist es 'context.game' anstatt nur 'context'):
http://www.html5gamedevs.com/topic/4830-animations-adding-error-in-extended-sprite/#comment-56740
*/

// Spieler Konstruktor-Funktion
Player = function(x, y, sprite, walkSpeed, jumpSpeed, context) {
  // 'this' Kontext wird vom Phaser-Sprite-Objekt übernommen, Sprite wird hinzugefügt
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  // Festpunkt unten in der Mitte
  this.anchor.setTo(0.5, 0.5);

  // Animationen werden hinzugefügt
  this.animations.add('idle', [0,1,2,3,4], 5, true);
  this.animations.add('walk', [0,1,2,3,4], 5, true);
  this.animations.add('jump', [0,1,2,3,4], 5, true);

  // Physik wird für den Spieler aktiviert
  context.game.physics.arcade.enable(this);

  // Laufgeschwindigkeit und Sprungkraft werden gesetzt
  this.walkSpeed = walkSpeed;
  this.jumpSpeed = jumpSpeed;

  // sobald sich etwas schneller als mit der Geschwindigkeit 900 bewegt, gibt es Physikprobleme
  this.maxFallingSpeed = 900;

  // Objekt wird ins Level hinzugefügt
  context.game.add.existing(this);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Box = function(x, y, sprite, drag, bounce, context) {
  // Kontext vom Sprite-Objekt übernommen
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  // Festpunkt
  this.anchor.setTo(0.5, 1);

  // Physik aktiviert, Körper soll mit dem Weltrand kollidieren
  context.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  // Reibung wird gesetzt (0: gleitet)
  this.body.drag.x = drag;

  // Aufsprung
  this.body.bounce.y = bounce;

  // Objekt wird ins Spiel hinzugefügt
  context.game.add.existing(this);
}
Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Button = function(x, y, sprite, orientation, collideCallback, context) {
  // Kontext übernommen
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  // Festpunkt
  this.anchor.setTo(0.5, 1);

  // Animationen (später erweiterbar)
  this.animations.add('up', [0], 2, false);
  this.animations.add('down', [1], 2, false);
  this.animations.play('up');

  // Physik aktiviert, nicht bewegbar
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

  // Funktion welche bei einer Kollision aufgerufen wird (update-Schleife)
  this.collideCallback = function(o1, o2) {

    // Je nach Ausrichtung soll die Kollision in einer anderen Richtung überprüft werden
    // Knopf soll nur im ersten Berührungsmoment etwas machen
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
    if(collisionCheck) {
      // In der Eingabe bestimmte Funktion soll ausgeführt werden
      collideCallback.call(context);
      // Knopf unten (1 Animationszyklus: 1s), danach wieder oben
      o2.animations.play('down');
      o2.animations.currentAnim.onComplete.add(function(){o2.animations.play('up');});
    }
  }

  // Objekt wird hinzugefügt
  this.game.add.existing(this);
}
Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Door = function(x, y, sprite, orientation, locked, collideCallback, context) {
  // Kontext übernommen
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  // Festpunkt in der Mitte
  this.anchor.setTo(0.5, 1);

  // Animationen der Türe
  this.animations.add('locked', [0], 1, false);
  this.animations.add('closed', [1], 1, false);
  this.animations.add('open', [2], 1, false);
  this.animations.add('opening', [5,4,3,2], 10, false);
  this.animations.add('closing', [2,3,4,5], 10, false);

  // Physik aktiviert, Körper kann sich nicht bewegen
  context.game.physics.arcade.enable(this);
  this.body.moves = false;

  // Türe offen / geschlossen, entsprechendes Bild wird angezeigt
  this.locked = locked;
  if(locked) {this.animations.play('locked');}
  else {this.animations.play('closed');}

  // Funktionen um Türe zu schliessen/öffnen
  this.unlock = function() {
    this.locked = false;
    this.animations.play('closed');
  }
  this.lock = function() {
    this.locked = true;
    this.animations.play('locked');
  }

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

  // Überprüfung ob Türe zu oder geschlossen ist, wird in der update-Schleife verwendet
  this.processCallback = function(o1, o2) {
    if(o2.locked) {return false;}
    else {return true;}
  }

  // Funktion welche beim berühren der Türe ausgeführt wird
  // Phaser gibt die beiden kollidierenden Objekte mit (o1 & o2)
  this.collideCallback = function(o1, o2) {

    // Türe soll sich nur im ersten Berührungsmoment öffnen
    var collisionCheck = o2.body.wasTouching.none && !o2.body.touching.none;

    // kann nur geöffnet werden, wenn sie nicht verschlossen ist
    if(!o2.locked && collisionCheck){
      // Öffnungsanimation wird gespielt, danach die im Level bestimmte Funktion ausgeführt
      o2.animations.play('opening');
      o2.closed = false;
      o2.animations.currentAnim.onComplete.add(collideCallback, context);
    }
  }

  // Objekt wird hinzugefügt
  context.game.add.existing(this);
}
Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Key = function(x, y, sprite, collideCallback, context) {
  // Kontext wird übernommen
  Phaser.Sprite.call(this, context.game, x, y, sprite);

  //Animationen
  this.animations.add('glow', [0,1,2,3], 5, true);
  this.animations.play('glow');

  // Physik aktiviert, Körper kann sich nicht bewegen
  context.game.physics.arcade.enable(this);
  this.body.moves = false;

  // Funktion im Argument wird gespeichert
  this.collideCallback = collideCallback;

  // Objekt wird hinzugefügt
  context.game.add.existing(this);
}
Key.prototype = Object.create(Phaser.Sprite.prototype);
Key.prototype.constructor = Key;
