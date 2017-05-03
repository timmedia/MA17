Game.level_1_1 = function() {};

Game.level_1_1.prototype = {
  create:function(){

    this.background = this.add.sprite(0, 0, 'background_1_1');

    this.player = new object.Player(100, 100, 'player_2_1', 300, -900, this);

    this.box_1 = new object.Box(700, 80, 'box_1', 5000, 0.5, this);
    this.box_2 = new object.Box(770, 210, 'box_1', 5000, 0.5, this);

    this.water = this.add.sprite(458, -20, 'water_1');
    this.water.animations.add('running', [0,1,2,3], 7, true);
    this.water.animations.play('running');
    this.physics.arcade.enable(this.water);
    this.water.body.setSize(100, 200, 25, 25);
    this.water.body.moves = false;

    this.bridge = this.add.sprite(455, -50, 'bridge_1');
    this.bridge.animations.add('up', [0], 5, false);
    this.bridge.animations.add('down', [1,2,3], 5, false);
    this.physics.arcade.enable(this.bridge);
    this.bridge.body.moves = false;
    this.bridge.down = false;

    this.bridge.switch = function() {
      if(this.button.body.touching.up && !this.button.body.wasTouching.up){
        if(this.bridge.down){
          this.bridge.animations.play('up')
          this.bridge.down = false;
          this.water.centerY = 105;
        }
        else {
          this.bridge.animations.play('down');
          this.bridge.down = true;
          this.water.centerY = -30;
        }
      }
    }

    this.button = this.add.sprite(350, 93, 'button_1');
    this.button.animations.add('up', [0], 10, false);
    this.button.animations.add('down', [1], 10, false);
    this.button.animations.play('up');
    this.physics.arcade.enable(this.button);
    this.button.body.moves = false;

    this.map = this.add.tilemap('map_1_1', 25, 25);
    this.map.addTilesetImage('tileset_1_1');
    this.map.setCollisionBetween(0, 2);

    this.layer = this.map.createLayer(0);
    //this.layer.resizeWorld();
    this.camera.follow(this.player);

    this.world.setBounds(0, 0, 1800, 450);

    this.physics.arcade.checkCollision.up = false;

    this.physics.arcade.gravity.y = 2000;

    this.controls = controls;



  },
  update:function(){

    thisthis = this;

    this.physics.arcade.collide(this.player, [this.box_1, this.box_2, this.bridge]);
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);
    this.physics.arcade.collide(this.player, this.button, this.bridge.switch, null, this);

    this.physics.arcade.collide(this.layer, [this.player, this.box_1, this.box_2]);
    this.physics.arcade.collide(this.box_1, this.box_2);

    checkInput(this.player, this.controls);
  },
  killPlayer: function() {

      this.state.start('level_1_1');

  }
}
