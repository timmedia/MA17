Game.level_3_1 = function(){};

Game.level_3_1.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, '1_1_background');

    // Weltgrösse wird beschränkt
    this.world.setBounds(0, 0, 1800, 450);

    // Tilemapse ab JSON (enthält auch Koordinaten für Kiste & Türe)
    this.map = this.add.tilemap('3_1_map');

    // Debug-Grafik
    this.map.addTilesetImage('debug10x10');

    // Soll kollidieren
    this.map.setCollision(1);

    // 'Tile Layer 1' wird später für Kollision gebraucht
    this.layer = this.map.createLayer('Tile Layer 1');

    // Spieler wird hinzugefügt
    this.player = new Player(100, 300, 'player_2_1', 300, -700, this);

    // Verlassen des Spielfeldes tötet Spieler
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(this.killPlayer, this);

    // Feuerball-Gruppe mit 20 deaktivierten Elementen wird erstellt
    // Idee von: https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
    this.player.fireballs = this.game.add.group();
    this.player.fireballs.enableBody = true;
    this.player.fireballs.createMultiple(20, 'debug_ball');

    // Lösch-Funktion
    this.player.fireballs.reset = function(laser) {
      laser.kill();
    }

    // Alle Elemente sollen gelöscht werden, nachdem sie das Spielfeld verlassen
    this.player.fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.player.fireballs.reset);
    this.player.fireballs.setAll('checkWorldBounds', true);
    // Keinen Einfluss der Gravitationskraft
    this.player.fireballs.setAll('body.allowGravity', false);

    // Schiess-Funktion
    this.player.fireballs.shoot = function(dir) {
      // erstes deaktivierte Element wird genommen und aktiviert
      var fireball = this.player.fireballs.getFirstExists(false);
      if (fireball) {
        // Position des Balles beim Spieler
        fireball.reset(this.player.x, this.player.y);
        // Geschwindigkeit in x-Richtung
        fireball.body.velocity.setTo(dir*700, 0);
      }
    }

    // wird verwendet damit der Spieler beim Eindrücken der Schiess-Taste nur einmal schiesst
    this.player.fireballs.wasShot = false;

    // Gravitationskraft
    this.physics.arcade.gravity.y = 1800;

    // Gegner wird hinzugefügt
    this.enemy = this.add.sprite(500, 400, 'debug_enemy');
    this.enemy.anchor.setTo(0.5, 1);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.moves = false;

    // Funktion welche beim Treffen des Gegners ausgeführt wird
    this.enemy.damageTaken = function(o1, o2) {
      this.player.fireballs.reset(o2);
    }

    // Kamera folgt dem Spieler
    this.camera.follow(this.player);
  },
  update: function() {

    this2 = this;
    // Kollisionsbestimmungen ohne Auswirkung
    this.physics.arcade.collide(this.layer, [this.player]);

    this.physics.arcade.collide(this.player.fireballs, this.enemy, this.enemy.damageTaken, null, this);

    if(controls.shft.isDown) {
      if (!this.player.fireballs.wasShot) {
        this.player.fireballs.shoot.call(this, this.player.scale.x);
        this.player.fireballs.wasShot = true;
      }
    }
    else {
      this.player.fireballs.wasShot = false;
    }



    // Input wird abgefragt
    checkInput(this.player, controls);
  },
  killPlayer: function() {
    //Level wird neu gestartet
    this.state.start('level_3_1');
  }
}
