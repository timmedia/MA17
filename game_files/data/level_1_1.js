  Game.level_1_1 = function() {};

  Game.level_1_1.prototype = {
    create: function() {
      // Hintergrund
      this.background = this.add.sprite(0, 0, '1_1_background');

      // Weltgrösse wird beschränkt
      this.world.setBounds(0, 0, 1200, 450);

      // Level data ab JSON Datei
      this.map = this.add.tilemap('1_1_map');

      // Debug-Grafik, Tilemaps dienen bloss zur Kollisionsbestimmung
      this.map.addTilesetImage('debug10x10', 'empty10x10');

      // Mittelgrund
      this.midground = this.add.sprite(0, 0, '1_1_midground');

      // Kollision mit Karte (Tilemaps)
      this.map.setCollisionBetween(0, 2);

      // Tilemap als Layer (für Kollisionscheck)
      this.layer = this.map.createLayer('Tile Layer 1');

      // Gravitationskraft
      this.physics.arcade.gravity.y = 2000;

      // Überall wo in der JSON-Datei eine Box plaziert wurde, soll ein Box-Objekt hin
      // Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db
      this.boxes = this.game.add.group();
      this.map.objects['Object Layer Boxes'].forEach(function(box){
        this.boxes.add(new Box(box.x, box.y, '1_1_box', 5000, 0.5, this));
      }, this);

      this.map.objects['Object Layer Door'].forEach(function(door){
        this.door = new Door(door.x, door.y, '1_1_door', 'up', false, this.startNextLevel, this);
      }, this);

      // Wasserfall, Sprite wird hinzugefügt
      this.water = this.add.sprite(495, 120, '1_1_waterfall');

      // Festpunkt das Wasserfalls
      this.water.anchor.setTo(0.5, 0.5);

      // Wasserfall Animationen
      this.water.animations.add('running_down', [0,1,2,3], 10, true);
      this.water.animations.add('transition', [4,5,6,7], 10, false);
      this.water.animations.add('running_up', [8,9,10,11], 10, true);
      this.water.animations.play('running_down');

      // Wasserfall: Physik wird aktiviert, jedoch ohne Bewegung
      this.physics.arcade.enable(this.water);
      this.water.body.moves = false;

      // Wasserfall: Hitbox wird etwas verkleinert
      this.water.body.setSize(150, 240, 25, 0);

      // Sprite der Brücke, Animationen
      this.bridge = this.add.sprite(420, 120, '1_1_bridge');
      this.bridge.anchor.setTo(0, 1);

      // Brücke: Physik aktiviert, kann sich nicht bewegen
      this.physics.arcade.enable(this.bridge);
      this.bridge.body.moves = false;

      // Hitbox der Brücke als Quadrat (wegen mögliche Rotation der Brücke)
      this.bridge.body.setSize(150, 150);

      // Brücke ist nicht unten (wird später benötigt)
      this.bridge.down = false;

      // Platschen des Wassers, soll nur sichtbar sein wenn die Brücke unten ist
      this.water_splash = this.add.sprite(405, 70, '1_1_water_splash');
      this.water_splash.animations.add('splash', [0,1,2,3], 10, true);
      this.water_splash.visible = false;

      // Funktion, welche aktiviert wird, wenn die Brücke nach oben/untern klappt
      this.bridge.switch = function() {
        // Brücke geht rauf/runter
        if(this.bridge.down) {
          // Animation der Brücke nach oben
          this.add.tween(this.bridge).to({angle: 0}, 500, Phaser.Easing.Cubic.Out, true);
          // Platschen des Wasser soll aufhören & nicht sichtbar sein
          this.water_splash.animations.stop();
          this.water_splash.visible = false;
          this.bridge.down = false;
          // Andere Animation des Wasserfalls
          this.water.animations.play('running_down');
          this.water.body.setSize(150, 240, 25, 0);
        }
        else {
          // Brücke geht nach unten, wenn sie unten ist (nach 500ms), soll das Platschen erscheinen
          this.add.tween(this.bridge).to({angle: 90}, 500, Phaser.Easing.Cubic.Out,true);
          this.time.events.add(500, function(){this.water_splash.animations.play('splash'); this.water_splash.visible = true;}, this);
          this.bridge.down = true;
          this.water.animations.play('transition');
          this.water.animations.currentAnim.onComplete.add(function(){this.water.animations.play('running_up')}, this);
          this.water.body.setSize(150, 100, 25, 0);
        }
      }

      // Knopfdruck lässt die Brücke fallen/nach oben gehen
      this.button = new Button(350, 120, 'debug_button', 'down', this.bridge.switch, this);

      //Spieler wird hinzugefügt
      this.player = new Player(100, 300, 'player_2_1', 300, -800, this);

      // Wenn der Spieler das Sichtbare Spielfeld verlässt (und y-Koord. > 0: nicht oben, nur unten) wird das Level neu gestartet
      this.player.checkWorldBounds = true;
      this.player.events.onOutOfBounds.add(function(){if(this.player.y > 0) {this.killPlayer();}}, this);

      // Vordergrund (Wasser), animiert
      this.water_foreground = this.add.sprite(0, 450, '1_1_water_foreground');
      this.water_foreground.animations.add('moving', [0,1,2,3,4,5], 5, true);
      this.water_foreground.animations.play('moving');
      this.water_foreground.anchor.setTo(0, 1);

      // Vordergrund (Kabel in der Luft)
      this.foreground = this.add.sprite(0, 0, '1_1_foreground');

      // Kamera folgt dem Spieler
      this.camera.follow(this.player);
    },
    update:function(){
      // Kollisionsbestimmung zwischen Objekten (ohne Auswirkung)
      this.physics.arcade.collide(this.player, [this.layer, this.boxes]);
      this.physics.arcade.collide(this.player, this.bridge);
      this.physics.arcade.collide(this.layer, this.boxes);
      this.physics.arcade.collide(this.boxes, this.boxes);

      // Beim berühren des Wassers stirbt der Spieler
      this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);

      // Knopfdruck soll Brücke bewegen
      this.physics.arcade.overlap(this.player, this.button, this.button.collideCallback, null, this);

      // Türe soll nächstes Level starten
      this.physics.arcade.overlap(this.player, this.door, this.door.collideCallback, null, this);

      // Hintergrund bewegt sich weniger schnell, Vordergrund schneller (in jeweils entgegengesetzte Richtung)
      this.background.x = parseInt(-this.world.x/3);
      this.foreground.x = parseInt(this.world.x/3);

      // Input wird abgefragt
      checkInput(this.player, controls);
    },
    killPlayer: function() {
      // Tod des Spielers bewirkt Neustart des Levels
      this.state.start('level_1_1');
    },
    startNextLevel: function() {
      // nächstes Level
      this.state.start('level_2_1');
    }
  }
