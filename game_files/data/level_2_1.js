Game.level_2_1 = function(){};

Game.level_2_1.prototype = {
  create:function(){
    this.world.bounds.setTo(0, 0, 900, 450);
    this.background = this.add.sprite(0, 0, 'background_1_1');

    this.map = this.add.tilemap('map_2_1', 25, 25);
    this.map.addTilesetImage('tileset_2_1');
    this.map.setCollisionBetween(0, 2);
    this.layer = this.map.createLayer(0);

    this.player = new object.Player(200, 100, 'player_1_1', 300, -740, this);
    //this.buttons = this.add.physicsGroup(this.physics.arcade);

    //this.button_1 = new this.buttonObject(0, this, 127, 380, 'left');

    //x, y, sprite, orientation, collideCallback, processCallback, game
    this.button_1 = new object.Button(127, 380, 'button_1', 90, function(){
      game.physics.arcade.gravity.y *= -1;
    }, this);

    this.physics.arcade.gravity.y = 2000;


    this.controls = controls;

  },
  update:function(){
    this.physics.arcade.collide(this.player, this.layer);
    this.physics.arcade.collide(this.player, this.button_1, this.button_1.collideCallback, null);


    checkInput(this.player, this.controls);


  }
}
