Game.level_1_1 = function() {};

Game.level_1_1.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, 'background_1_1');
    // Objekte aus Bibliothek werden hinzugefügt
    this.player = new object.Player(100, 100, 'player_2_1', 300, -800, this);
    this.box_1 = new object.Box(700, 80, 'box_1', 5000, 0.5, this);
    this.box_2 = new object.Box(600, 400, 'box_1', 5000, 0.5, this);
    // Nachdem die Türe geöffnet wurde, soll das nächste Level beginnen
    this.door = new object.Door(1200, 350, 'debug_door', 'up', function(game){
      game.state.start('level_2_1');
    }, this);
    // Knopfdruck lässt die Brücke fallen/nach oben gehen
    this.button = new object.Button(350, 95, 'button_1', 'down', function(game){
      game.bridge.switch(game);
    }, this);

    // Wasserfall: Sprite & Animationen wereden hinzugefügt
    this.water = this.add.sprite(458, -20, 'water_1');
    this.water.animations.add('running', [0,1,2,3], 7, true);
    this.water.animations.play('running');
    // Physik wird aktiviert, jedoch ohne Bewegung
    this.physics.arcade.enable(this.water);
    this.water.body.moves = false;
    // Hitbox wird etwas verkleinert
    this.water.body.setSize(100, 200, 25, 25);

    // Sprite der Brücke, Animationen
    this.bridge = this.add.sprite(455, -50, 'bridge_1');
    this.bridge.animations.add('up', [3,2,1,0], 5, false);
    this.bridge.animations.add('down', [0,1,2,3], 10, false);
    // Physik aktiviert, ohne Beweglichkeit
    this.physics.arcade.enable(this.bridge);
    this.bridge.body.moves = false;
    // Brücke ist nicht unten (Wird später benötigt)
    this.bridge.down = false;

    // Funktion, welche aktiviert wird, wenn die Brücke nach oben/untern klappt
    this.bridge.switch = function(game) {
      // Brücke wird geöffnet, Wasserfall wird entsprechend verschoben
      if(game.bridge.down){
        game.bridge.animations.play('up')
        game.bridge.down = false;
        game.water.centerY = 105;
      }
      else {
        game.bridge.animations.play('down');
        game.bridge.down = true;
        game.water.centerY = -30;
      }
    }

    // Level data ab CSV Data (zur Kollisionsbestimmung), Schlussendlich wird eine schönere Grafik darübergerendert
    this.map = this.add.tilemap('map_1_1', 10, 10);
    // Vorläufig soll eine Debug-Grafik angezeigt werden
    this.map.addTilesetImage('debug10x10');
    // Kollision mit Karte
    this.map.setCollisionBetween(0, 2);
    // Karte als Layer
    this.layer = this.map.createLayer(0);
    // Kamera folgt Spieler
    this.camera.follow(this.player);
    // Weltgrösse wird beschränkt
    this.world.setBounds(0, 0, 1800, 450);
    // Gravitationskraft
    this.physics.arcade.gravity.y = 2000;
    // Controls werden geladen
    this.controls = controls;
  },
  update:function(){
    // Kollisionsbestimmung zwischen Objekten
    this.physics.arcade.collide(this.player, [this.layer, this.box_1, this.box_2, this.bridge]);
    this.physics.arcade.collide(this.layer, [this.box_1, this.box_2]);
    this.physics.arcade.collide(this.box_1, this.box_2);
    // Beim berühren des Wassers stirbt der Spieler
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);
    // Knopfdruck
    this.physics.arcade.collide(this.player, this.button, this.button.collideCallback, null, this);
    // Türe
    this.physics.arcade.collide(this.player, this.door, this.door.collideCallback, null, this);
    // Input wird abgefragt
    checkInput(this.player, this.controls);
  },
  killPlayer: function() {
    // Tod des Spielers bewirkt Neustart des Levels
    this.state.start('level_1_1');
  }
}
