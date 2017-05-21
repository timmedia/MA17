Game.level_2_1 = function(){};

Game.level_2_1.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, 'background_1_1');

    // Tilemapse ab JSON (enthält auch Koordinaten für Kiste & Türe)
    this.map = this.add.tilemap('map_2_1', 10, 10);
    // Debug-Grafik
    this.map.addTilesetImage('debug10x10');
    // Soll kollidieren
    this.map.setCollisionBetween(0,1);
    // 'Tile Layer 1' wird später für Kollision gebraucht
    this.layer = this.map.createLayer('Tile Layer 1');

    // Knöpfe werden hinzugefügt (als Gruppe)
    this.buttons = this.game.add.group();
    this.buttons.add(new Button(80, 380, 'debug_button', 'right', this.switchGravity, this));
    this.buttons.add(new Button(720, 50, 'debug_button', 'left', this.switchGravity, this));

    // Vorläufige Kollisionsbestimmung beider Knöpfe in einer Funktion
    this.buttons.collideCallback = function(o1, o2){
      this.buttons.children[0].collideCallback(o1, o2);
      this.buttons.children[1].collideCallback(o1, o2);
    }

    // Türe wird ab JSON-Datei geladen
    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, 'debug_door', 'up', true, function(game){
        game.state.start('main_menu');
      }, this);
    }, this);

    // Kisten werden ab JSON-Datei geladen
    this.boxes = this.game.add.group();
    this.map.objects['Object Layer Boxes'].forEach(function(box){
      this.boxes.add(new Box(box.x, box.y, 'debug_box', 5000, 0.5, this));
    }, this);

    // Spieler wird hinzugefügt
    this.player = new Player(200, 100, 'player_2_1', 300, -600, this);

    // Schlüssel (wird gebraucht um Türe zu öffnen), Physik aktiviert, jedoch nicht beweglich
    this.key = this.add.sprite(390, 416, 'debug_key');
    this.physics.arcade.enable(this.key);
    this.key.body.moves = false;
    // Schlüssel soll beim Berühren die Türe entsperren & verschwinden
    this.key.overlapCallback = function(){
      this.door.unlock();
      this.key.destroy();
    }

    // Wasserfall & Animationen
    this.water = this.add.sprite(405, 285, 'water_2_1');
    this.water.anchor.setTo(0.5, 0.5);
    this.water.animations.add('down', [0,1,2], 5, true);
    this.water.animations.add('go_up', [3,4], 5, false);
    this.water.animations.add('go_down', [4,3], 5, false);
    this.water.animations.add('up', [5,6,7], 5, true);
    this.water.animations.play('down');
    // Standargemäss nach unten
    this.water.direction = 'down';
    // Physik aktiviert, jedoch unbeweglich
    this.physics.arcade.enable(this.water);
    this.water.body.moves = false;
    // Hitbox wird auf den sichtbaren Teil reduziert
    this.water.body.setSize(50, 164, 11, 151);

    // Richtungsänderung der Wassers
    this.water.switch = function(context) {
      if(context.water.direction === 'down') {
        // von normal zu umgekehrt
        context.water.direction = 'up';
        // Nach Übergangsanimation soll normale Animation spielen
        context.water.animations.play('go_up');
        context.water.animations.currentAnim.onComplete.add(function(){context.water.animations.play('up')});
        // neue Hitbox (gemäss sichtbaren Teil)
        context.water.body.setSize(50, 164, 11, 0);
      }
      else {
        context.water.direction = 'down';
        // Nach Übergangsanimation soll normale Animation spielen
        context.water.animations.play('go_down');
        context.water.animations.currentAnim.onComplete.add(function(){context.water.animations.play('down')});
        // neue Hitbox (gemäss sichtbaren Teil)
        context.water.body.setSize(50, 164, 11, 151);
      }
    }

    // Gravitationskraft
    this.physics.arcade.gravity.y = 1300;

    // Inputs werden geladen
    this.controls = controls;
  },
  update:function(){
    // Kollisionsbestimmungen ohne Effekt
    this.physics.arcade.collide(this.layer, [this.boxes, this.player]);
    this.physics.arcade.collide(this.player, this.boxes);

    // Beim berühren der Knöpfe soll die Gravitation geändert werden
    this.physics.arcade.collide(this.player, this.buttons, this.buttons.collideCallback, null, this);

    // Türe
    this.physics.arcade.overlap(this.player, this.door, this.door.overlapCallback, this.door.processCallback, this);

    // Schlüssel
    this.physics.arcade.overlap(this.player, this.key, this.key.overlapCallback, null, this);

    // Berühren des Wassers ist tödlich
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);

    // Input wird abgefragt
    checkInput(this.player, this.controls);
  },
  switchGravity: function(context) {
    // Gravitations-, Sprungkraft und Wasserrichtung ändern sich
    context.physics.arcade.gravity.y *= -1;
    context.player.jumpSpeed *= -1;
    context.water.switch(context);
    // Flüssiges rotieren des Spielers um 180 Grad (keyframes)
    let ang = (context.player.angle + 180)%360;
    context.add.tween(context.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out,true);
  },
  killPlayer: function(){
    // Tod des Spielers bedeutet Neustart des Levels
    this.state.start('level_2_1');
  }
}
