Game.concept_1 = function() {};

Game.concept_1.prototype = {
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
    this.enemy.fireballs.createMultiple(15, 'debug_ball');

    // Funktion um einen einzelnen Ball zu löschen
    this.enemy.fireballs.reset = function(ball) {
      ball.kill();
    }

    // Beim verlassen des Spielfeldes werden sie gelöscht,
    this.enemy.fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.enemy.fireballs.reset);
    this.enemy.fireballs.setAll('checkWorldBounds', true);

    // Funktion um Bälle zu schliessen
    this.enemy.fireballs.shoot = function(vx, vy) {
      // erster 'nicht existierende' (inkativer) Ball aus der Gruppe wird genommen
      var fireball = this.enemy.fireballs.getFirstExists(false);
      if (fireball) {
        // Ursprungsposition des Balles an Festpunkt des Gegners
        fireball.reset(this.enemy.x, this.enemy.y);
        // Geschwindigkeit ab Argument
        fireball.body.velocity.setTo(vx, vy);
      }
    }

    // Bälle sollen Spieler treffen, Dauer des Schusses kann bestimmt werden
    this.enemy.fireballs.shootPlayer = function(time) {
      var vx = (this.player.x - this.enemy.x) / time;
      var vy = (this.player.y - this.enemy.y - 0.5 * this.physics.arcade.gravity.y * time * time) / time;
      this.enemy.fireballs.shoot.call(this, vx, vy);
    }

    // Gravitationskraft
    this.physics.arcade.gravity.y = 1200;

    // Gegner bewegt sich hin und her (Endlosschleife)
    this.enemy.animation  = this.add.tween(this.enemy).to({x: 50}, 7000, Phaser.Easing.Quadratic.InOut, false).to({x: 750}, 7000, Phaser.Easing.Quadratic.InOut, true).loop(true);
    this.enemy.animation.start();

  },
  update: function() {
    // Kollisionsbestimmungen ohne Auswirkung
    this.physics.arcade.collide(this.layer, [this.player, this.enemy]);

    // Gegner soll schiessen
    this.enemy.fireballs.shootPlayer.call(this, this.rnd.integerInRange(7,15)/10);

    // Input wird abgefragt
    checkInput(this.player, controls);
  }
}
