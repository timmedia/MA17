Game.concept_2 = function() {};

Game.concept_2.prototype = {
  create:function(){
    // Hintergrundfarbe
    this.stage.backgroundColor = '#FFFFFF';

    // Weltgrösse wird beschränkt
    this.world.setBounds(0, 0, 800, 450);

    // Tilemap als Ebene, Platzhaltergrafik, Kollision
    this.map = this.add.tilemap('debug_map_box');
    this.map.addTilesetImage('debug10x10');
    this.map.setCollision(1);
    this.layer = this.map.createLayer('Tile Layer 1');

    // Spieler wird hinzugefügt
    this.player = new Player(100, 300, 'debug_player', 300, -700, this);

    // Gegner
    this.enemy = this.add.sprite(750, 380, 'debug_enemy');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);

    // Bälle als Gruppe
    this.enemy.fireballs = this.game.add.group();
    this.enemy.fireballs.enableBody = true;

    // 15 Bälle erstellt, jedoch inaktiv, sobald sie aufgebraucht sind, werden 20 neue erstellt
    this.enemy.fireballs.createMultiple(1, 'debug_ball');

    // Funktion um einen einzelnen Ball zu löschen
    this.enemy.fireballs.reset = function(ball) {
      ball.kill();
    }

    // Beim verlassen des Spielfeldes werden sie gelöscht,
    this.enemy.fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.enemy.fireballs.reset);
    this.enemy.fireballs.setAll('checkWorldBounds', true);
    this.enemy.fireballs.setAll('allowGravity', false);

    // Funktion um Bälle zu schliessen
    this.enemy.fireballs.shoot = function(vx, vy) {
      // erster 'nicht existierende' (inkativer) Ball aus der Gruppe wird genommen
      var fireball = this.enemy.fireballs.getFirstExists(false);
      if (fireball) {
        // Ursprungsposition des Balles an Festpunkt des Gegners
        fireball.reset(this.enemy.x, this.enemy.y);
        // Geschwindigkeit ab Argument
        var parent = this;
        var maxtime = this.game.time.totalElapsedSeconds() + 1;
        fireball.update = function() {
          var now = this.game.time.totalElapsedSeconds();
          var coords = parent.enemy.fireballs.getVelocity.call(parent, parent.player, this);
          this.body.velocity.setTo(coords[0], coords[1]);
          if (now - 2 > maxtime) {
            this.kill();
          }
        }
      }
    }

    // Bälle sollen Spieler treffen, Dauer des Schusses kann bestimmt werden
    this.enemy.fireballs.getVelocity = function(o1, o2) {
      var maxSpeed = 200;
      var vx = o1.x - o2.x;
      var vy = o1.y - o2.y;
      return [2*vx, 2*vy];
    }

    // Gravitationskraft
    this.physics.arcade.gravity.y = 1200;
  },
  update: function() {
    // Kollisionsbestimmungen ohne Auswirkung
    this.physics.arcade.collide(this.layer, [this.player, this.enemy]);

    // Gegner soll schiessen
    this.enemy.fireballs.shoot.call(this, this.rnd.integerInRange(7,15)/10);

    // Input wird abgefragt
    checkInput(this.player, controls);
  }
}
