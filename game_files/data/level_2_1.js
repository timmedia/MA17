Game.level_2_1 = function(){};

Game.level_2_1.prototype = {
  create:function(){
    this.world.bounds.setTo(0, 0, 900, 450);
    this.background = this.add.sprite(0, 0, 'background_1_1');

    this.map = this.add.tilemap('map_2_1', 10, 10);
    this.map.addTilesetImage('debug10x10');
    this.map.setCollisionBetween(0,1);
    this.layer = this.map.createLayer(0);

    this.player = new object.Player(200, 100, 'player_2_1', 300, -600, this);
    //this.buttons = this.add.physicsGroup(this.physics.arcade);

    this.button_1 = new object.Button(85, 380, 'button_1', 'right', function(game){
      game.physics.arcade.gravity.y *= -1;
      game.player.jumpSpeed *= -1;
      game.player.angle += 180;
    }, this);

    this.button_2 = new object.Button(715, 50, 'button_1', 'left', function(game){
      game.physics.arcade.gravity.y *= -1;
      game.player.jumpSpeed *= -1;
      game.player.angle += 180;
    }, this);

    this.box = new object.Box(120, 20, 'box_1', 500, 0.5, this);

    this.physics.arcade.gravity.y = 1300;

    this.controls = controls;

  },
  update:function(){

    thisthis = this;
    this.physics.arcade.collide(this.player, [this.layer, this.box]);
    this.physics.arcade.collide(this.layer, this.box);
    this.physics.arcade.collide(this.player, this.button_1, this.button_1.collideCallback, null);
    this.physics.arcade.collide(this.player, this.button_2, this.button_2.collideCallback, null);


    checkInput(this.player, this.controls);


  }
}
