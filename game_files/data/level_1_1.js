  Game.level_1_1 = function() {};

  Game.level_1_1.prototype = {
    create:function(){
      // Hintergrundbild
      this.background = this.add.sprite(0, 0, 'background_1_1');
      // Weltgrösse wird beschränkt
      this.world.setBounds(0, 0, 1800, 450);

      // Level data ab JSON Datei
      this.map = this.add.tilemap('map_1_1');

      // Debug-Grafik, Tilemaps dienen bloss zur Kollisionsbestimmung
      this.map.addTilesetImage('debug10x10', 'debug10x10');

      // Kollision mit Karte
      this.map.setCollisionBetween(0, 2);

      // Karte als Layer
      this.layer = this.map.createLayer('Tile Layer 1');

      // Gravitationskraft
      this.physics.arcade.gravity.y = 2000;

      // Überall wo in der JSON-Datei eine Box plaziert wurde, soll ein Box-Objekt hin
      // Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db
      this.boxes = this.game.add.group();
      this.map.objects['Object Layer Boxes'].forEach(function(box){
        this.boxes.add(new Box(box.x, box.y, 'debug_box', 5000, 0.5, this));
      }, this);

      this.map.objects['Object Layer Door'].forEach(function(door){
        this.door = new Door(door.x, door.y, 'debug_door', 'up', false, function(game){
          game.state.start('level_2_1');
        }, this);
      }, this);

      // Knopfdruck lässt die Brücke fallen/nach oben gehen
      this.button = new Button(350, 120, 'debug_button', 'down', function(game){
        game.bridge.switch(game);
      }, this);

      // Wasserfall: Sprite & Animationen wereden hinzugefügt
      this.water = this.add.sprite(490, 115, 'water_1');
      this.water.anchor.setTo(0.5, 0.5);
      this.water.animations.add('running', [0,1,2,3], 7, true);
      this.water.animations.play('running');

      // Physik wird aktiviert, jedoch ohne Bewegung
      this.physics.arcade.enable(this.water);
      this.water.body.moves = false;

      // Hitbox wird etwas verkleinert
      this.water.body.setSize(100, 200, 25, 25);

      // Sprite der Brücke, Animationen
      this.bridge = this.add.sprite(425, 120, 'debug_bridge');
      this.bridge.anchor.setTo(0.15, 1);
      this.bridge.animations.add('up', [3,2,1,0], 5, false);
      this.bridge.animations.add('down', [0,1,2,3], 10, false);

      // Physik aktiviert, ohne Beweglichkeit
      this.physics.arcade.enable(this.bridge);
      this.bridge.body.moves = false;

      // Brücke ist nicht unten (Wird später benötigt)
      this.bridge.down = false;

      // Funktion, welche aktiviert wird, wenn die Brücke nach oben/untern klappt
      this.bridge.switch = function(context) {
        // Brücke wird geöffnet, Wasserfall wird entsprechend verschoben
        if(context.bridge.down){
          context.add.tween(context.bridge).to({angle: 0}, 500, Phaser.Easing.Cubic.Out,true);
          context.bridge.down = false;
          context.water.y = 115;
        }
        else {
          context.add.tween(context.bridge).to({angle: 90}, 500, Phaser.Easing.Cubic.Out,true);
          context.bridge.down = true;
          context.water.y = -10;
        }
      }

      // Controls werden geladen
      this.controls = controls;

      this.player = new Player(100, 100, 'player_2_1', 300, -800, this);
      // Wenn der Spieler das Sichtbare Spielfeld verlässt (und y-Koord. > 0: nicht oben, nur unten) wird das Level neu gestartet
      this.player.checkWorldBounds = true;
      this.player.events.onOutOfBounds.add(function(){if(this.player.y > 0){this.killPlayer();}}, this);

      // Kamera folgt Spieler
      this.camera.follow(this.player);
    },
    update:function(){
      // Kollisionsbestimmung zwischen Objekten
      this.physics.arcade.collide(this.player, [this.layer, this.bridge, this.boxes]);
      this.physics.arcade.collide(this.layer, this.boxes);
      this.physics.arcade.collide(this.boxes, this.boxes);

      // Beim berühren des Wassers stirbt der Spieler
      this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);

      // Knopfdruck soll Brücke bewegen
      this.physics.arcade.collide(this.player, this.button, this.button.collideCallback, null, this);

      // Türe soll nächstes Level starten
      this.physics.arcade.overlap(this.player, this.door, this.door.overlapCallback, null, this);

      // Input wird abgefragt
      checkInput(this.player, this.controls);
    },
    killPlayer: function() {
      // Tod des Spielers bewirkt Neustart des Levels
      this.state.start('level_1_1');
    }
  }
