Game.level_2_1 = function(){};

Game.level_2_1.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, '2_1_background');

    // Tilemapse ab JSON (enthält auch Koordinaten für Kiste & Türe)
    this.map = this.add.tilemap('2_1_map', 10, 10);

    // Debug-Grafik
    this.map.addTilesetImage('debug10x10');

    // Soll kollidieren
    this.map.setCollision(1);

    // 'Tile Layer 1' wird später für Kollision gebraucht
    this.layer = this.map.createLayer('Tile Layer 1');

    // Mittelgrund
    this.midground = this.add.sprite(0, 0, '2_1_midground');

    // Knöpfe werden hinzugefügt (als Gruppe)
    // Gruppe kann später im Kollisionscheck benutzt werden
    this.buttons = this.game.add.group();
    this.buttons.add(new Button(80, 380, '1_1_button', 'right', this.switchGravity, this));
    this.buttons.add(new Button(720, 50, '1_1_button', 'left', this.switchGravity, this));

    // Vorläufige Kollisionsbestimmung beider Knöpfe in einer Funktion
    this.buttons.collideCallback = function(o1, o2){
      this.buttons.children[0].collideCallback(o1, o2);
      this.buttons.children[1].collideCallback(o1, o2);
    }

    // Türe wird ab JSON-Datei geladen
    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, '1_1_door', 'up', true, this.startNextLevel, this);
    }, this);

    // Kisten werden ab JSON-Datei geladen und einer Gruppe hinzugefügt
    this.boxes = this.game.add.group();
    this.map.objects['Object Layer Boxes'].forEach(function(box){
      this.boxes.add(new Box(box.x, box.y, '1_1_box', 5000, 0.5, this));
    }, this);

    // Schlüssel wird hinzugefügt
    this.key = new Key(390, 416, 'debug_key', this.collectKey, this);

    // Wasserfall Grafik, Festpunkt
    this.water = this.add.sprite(405, 291, '2_1_water');
    this.water.anchor.setTo(0.5, 0.5);

    // Wasserfall Animationen
    this.water.animations.add('down', [0,1,2,3], 10, true);
    this.water.animations.add('go_up', [4,5,6,7], 10, false);
    this.water.animations.add('go_down', [12,13,14,15], 10, false);
    this.water.animations.add('up', [8,9,10,11], 10, true);
    this.water.animations.play('down');

    // Standargemäss fliesst das Wasser nach unten
    this.water.direction = 'down';

    // Physik aktiviert, jedoch unbeweglich
    this.physics.arcade.enable(this.water);
    this.water.body.moves = false;

    // Hitbox wird auf den sichtbaren Teil reduziert
    this.water.body.setSize(50, 150, 34, 173);

    // Funktion zur Richtungsänderung des Wassers
    this.water.switch = function() {
      if(this.water.direction === 'down') {
        // von normal zu umgekehrt
        this.water.direction = 'up';
        // Nach Übergangsanimation soll normale Animation spielen
        this.water.animations.play('go_up');
        this.water.animations.currentAnim.onComplete.add(function(){this.water.animations.play('up')}, this);
        // neue Hitbox (gemäss sichtbaren Teil)
        this.water.body.setSize(50, 150, 34, 0);
      }
      else {
        // Wasser wird nach unten fliessen
        this.water.direction = 'down';
        // Nach Übergangsanimation soll normale Animation spielen
        this.water.animations.play('go_down');
        this.water.animations.currentAnim.onComplete.add(function(){this.water.animations.play('down');}, this);
        // neue Hitbox (gemäss sichtbaren Teil)
        this.water.body.setSize(50, 150, 34, 173);
      }
    }

    // Spieler wird hinzugefügt
    this.player = new Player(200, 300, 'player_2_1', 300, -600, this);

    // Gravitationskraft
    this.physics.arcade.gravity.y = 1300;
  },
  update: function(){
    // Kollisionsbestimmungen ohne Auswirkung
    this.physics.arcade.collide(this.layer, [this.boxes, this.player]);
    this.physics.arcade.collide(this.player, this.boxes);

    // Beim berühren der Knöpfe soll die Gravitation geändert werden
    this.physics.arcade.collide(this.player, this.buttons, this.buttons.collideCallback, null, this);

    // Türe
    this.physics.arcade.overlap(this.player, this.door, this.door.collideCallback, this.door.processCallback, this);

    // Schlüssel
    this.physics.arcade.overlap(this.player, this.key, this.key.collideCallback, null, this);

    // Berühren des Wassers ist tödlich
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);

    // Input wird abgefragt
    checkInput(this.player, controls);
  },
  switchGravity: function() {
    // Gravitations-, Sprungkraft und Wasserrichtung ändern sich
    this.physics.arcade.gravity.y *= -1;
    this.player.jumpSpeed *= -1;
    this.water.switch.call(this);

    // Winkel soll um 180° verändert werden
    let ang = (this.player.angle + 180)%360;

    // Animierter übergang der Winkel-Werte
    this.add.tween(this.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out,true);
  },
  killPlayer: function(){
    // Tod des Spielers bedeutet Neustart des Levels
    this.state.start('level_2_1');
  },
  collectKey: function() {
    // Berühren des Schlüssels soll Tür öffnen & Schlüssel löschen
    this.door.unlock();
    this.key.destroy();
  },
  startNextLevel: function() {
    // Start des nächsten Levels
    this.state.start('main_menu');
  }
}
