Game.level_2_1 = function(){};

Game.level_2_1.prototype = {
  create:function(){
    // Weltgrösse & Hintergrundbild
    this.world.bounds.setTo(0, 0, 900, 450);
    this.background = this.add.sprite(0, 0, 'background_1_1');

    // Kollisions-'map' ab CSV Datei
    this.map = this.add.tilemap('map_2_1', 10, 10);
    this.map.addTilesetImage('debug10x10');
    this.map.setCollisionBetween(0,1);
    this.layer = this.map.createLayer(0);
    // Spieler wird hinzugefügt
    this.player = new object.Player(200, 100, 'player_2_1', 300, -600, this);
    // Gravitationsknöpfe (2x)
    this.button_1 = new object.Button(85, 380, 'button_1', 'right', function(game){
      game.physics.arcade.gravity.y *= -1;
      game.player.jumpSpeed *= -1;
      let ang = (game.player.angle + 180)%360;
      game.add.tween(game.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out,true);
    }, this);
    this.button_2 = new object.Button(715, 50, 'button_1', 'left', function(game){
      game.physics.arcade.gravity.y *= -1;
      game.player.jumpSpeed *= -1;
      let ang = (game.player.angle + 180)%360;
      game.add.tween(game.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out,true);
    }, this);
    // Kiste wird hinzugefügt
    this.box = new object.Box(500, 420, 'box_1', 5000, 0.5, this);
    // Türe wird hinzugefügt
    this.door = new object.Door(600, 60, 'debug_door', 'up', function(game){
      // Türe kann nur geöffnet werden, wenn sie nicht geschlossen ist
      if (!game.door.locked) {
          game.state.start('main_menu');
      }
    }, this);
    // Standardgemäss is die Türe geschlossen
    this.door.locked = true;
    // Gravitationskraft
    this.physics.arcade.gravity.y = 1300;
    // Controls
    this.controls = controls;
  },
  update:function(){
    // Kollisionsbestimmung
    this.physics.arcade.collide(this.player, this.box);
    this.physics.arcade.collide(this.layer, [this.box, this.player]);
    // Druck der Knöpfe
    this.physics.arcade.collide(this.player, this.button_1, this.button_1.collideCallback, null);
    this.physics.arcade.collide(this.player, this.button_2, this.button_2.collideCallback, null);
    // Berühren der Türe
    this.physics.arcade.collide(this.player, this.door, this.door.collideCallback, null);
    // Eingabeabfrage
    checkInput(this.player, this.controls);
  }
}
