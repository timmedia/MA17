// Globale variable mit häufig genutzen Objekten
object = {
  Player: function(x, y, sprite, walkSpeed, jumpSpeed, game) {
    // Grafik des Spielers wird geladen
    let res = game.add.sprite(x, y, sprite);
    // Festpunkt in der Mitte des Spielers
    res.anchor.setTo(0.5, 0.5);
    // Animationen werden hinzugefügt
    res.animations.add('idle', [0,1,2,3,4], 5, true);
    res.animations.add('walk', [0,1,2,3,4], 5, true);
    res.animations.add('jump', [0,1,2,3,4], 5, true);
    // Laufgeschwindigkeit und Sprungkraft werden abgespeichert
    res.walkSpeed = walkSpeed;
    res.jumpSpeed = jumpSpeed;
    // sobald sich etwas schneller als mit der Geschwindigkeit 900 bewegt, gibt es Physikprobleme
    res.maxFallingSpeed = 900;
    // Physik wird für den Spieler aktiviert
    game.physics.arcade.enable(res);
    // Wenn der Spieler das Sichtbare Spielfeld verlässt (und y-Koord. > 0: nicht oben, nur unten) wird er getötet
    res.checkWorldBounds = true;
    res.events.onOutOfBounds.add(function(){if(res.y > 0) {game.killPlayer();}}, game);
    return res;
  },
  Box: function(x, y, sprite, drag, bounce, game) {
    // Sprite wird hinzugefügt
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(res);
    res.body.collideWorldBounds = true;
    // Reibung wird gesetzt (sonst würden sie gleiten)
    res.body.drag.x = drag;
    // Aufsprung
    res.body.bounce.y = bounce;
    return res;
  },
  Button: function(x, y, sprite, orientation, collideCallback, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    res.animations.add('up', [0], 2, false);
    res.animations.add('down', [1], 2, false);
    res.animations.play('up');
    game.physics.arcade.enable(res);
    res.body.moves = false;
    // Ausrichtung des Knopfes
    switch (orientation) {
      case 'right':
        res.angle = 90;
        break;
      case 'left':
        res.angle = -90;
        break;
      default:
        res.angle = 0;
    }
    // Knopf soll nur im ersten Berührungsmoment aktiviert werden
    var collisionCheck;
    res.collideCallback = function() {
      switch (orientation) {
        case 'right':
          collisionCheck = res.body.wasTouching.none && res.body.touching.right;
          break;
        case 'left':
          collisionCheck = res.body.wasTouching.none && res.body.touching.left;
          break;
        case 'down':
          collisionCheck = res.body.wasTouching.none && res.body.touching.up;
          break;
        default:
          collisionCheck = false;
      }
      // Funktion wird ausgeführt, Knopf bleibt nur kurz unten
      if(collisionCheck){
        collideCallback(game);
        res.animations.play('down');
        res.animations.currentAnim.onComplete.add(function(){res.animations.play('up')});
      }
    };
    return res;
  },
  Door: function(x, y, sprite, orientation, collideCallback, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    // Animationen der Türe
    res.animations.add('closed', [0], 1, false);
    res.animations.add('open', [4], 1, false);
    res.animations.add('opening', [0,1,2,3,4], 10, false);
    res.animations.add('closing', [4,3,2,1,0], 10, false);
    // Türe standardgemäss geschlossen
    res.animations.play('closed');
    res.closed = true;
    // Physik aktiviert, Körper kann sich nicht bewegen
    game.physics.arcade.enable(res);
    res.body.moves = false;
    // Orientierung der Türe
    switch (orientation) {
      case 'up':
        res.angle = 0;
        break;
      case 'down':
        res.angle = 180;
        break;
      default:
        res.angle = 0;
    }
    // Funktion welche beim berühren der Türe ausgeführt wird
    res.collideCallback = function() {
      // Türe soll sich nur im ersten Berührungsmoment öffnen
      var collisionCheck = res.body.wasTouching.none && !res.body.touching.none;
      // kann nur geöffnet werden, wenn sie verschlossen ist
      if(collisionCheck && res.closed){
        // Öffnungsanimation wird gespielt, danach die im Level bestimmte Funktion ausgeführt
        res.animations.play('opening');
        res.closed = false;
        res.animations.currentAnim.onComplete.add(function(){collideCallback(game)});
      }
    }
    return res;
  }
}
