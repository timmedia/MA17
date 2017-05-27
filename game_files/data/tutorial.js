Game.tutorial = function() {};

Game.tutorial.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, 'background_1_1');

    // Level data ab JSON Datei
    this.map = this.add.tilemap('map_tutorial');

    // Debug-Grafik, Tilemaps dienen bloss zur Kollisionsbestimmung
    this.map.addTilesetImage('debug10x10', 'debug10x10');

    // Kollision mit Karte
    this.map.setCollisionBetween(0, 2);

    // Karte als Layer
    this.layer = this.map.createLayer('Tile Layer 1');

    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, 'debug_door', 'up', false, function(game){
        game.state.start('level_2_1');
      }, this);
    }, this);

    this.map.objects['Object Layer Boxes'].forEach(function(box){
      this.box = new Box(box.x, box.y, 'debug_box', 5000, 0.5, this);
    }, this);

    this.button = new Button(790, 380, 'debug_button', 'left', this.buttonPress, this);

    //this.key = new Key

    // Spieler wird hinzugefügt
    this.player = new Player(200, 300, 'player_2_1', 300, -800, this);

    // Gravitationskraft
    this.physics.arcade.gravity.y = 2000;

    this.controls = controls;
  },
  update:function(){
    this.physics.arcade.collide(this.player, [this.layer, this.box]);
    this.physics.arcade.collide(this.layer, this.box);

    this.physics.arcade.overlap(this.player, this.button, this.button.collideCallback, null, this);

    // Input wird abgefragt
    checkInput(this.player, this.controls);
  },
  buttonPress:function() {
    console.log('hey');
  }
}
