Game.level_1_1 = function(){};

Game.level_1_1.prototype = {
  create:function(){

    this.world.bounds.setTo(0, 0, 2400, 450);
    this.background = this.add.sprite(0, 0, 'background_1_1');

    this.player = this.add.sprite(100, 100, 'player_1_1');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('idle', [0,1,2,3], 5, true);
    this.player.animations.add('walk', [4,5,6,7], 5, true);
    this.player.animations.add('jump', [8,9,10,11], 5, true);
    this.physics.arcade.enable(this.player);
    this.player.checkWorldBounds = true;
    this.player.walkSpeed = 300;
    this.player.jumpSpeed = -900;

    this.box_1 = new this.boxObject(0, this, 700, 80);
    this.box_2 = new this.boxObject(0, this, 750, 210);

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
    this.layer.resizeWorld();
    this.camera.follow(this.player);

    this.physics.arcade.gravity.y = 2000;

    this.controls = controls;

  },
  update:function(){

    this.physics.arcade.collide(this.player, [this.box_1, this.box_2, this.bridge]);
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);
    this.physics.arcade.collide(this.player, this.button, this.bridge.switch, null, this);

    this.physics.arcade.collide(this.layer, [this.player, this.box_1, this.box_2]);
    this.physics.arcade.collide(this.box_1, this.box_2);

    var grounded  = this.player.body.touching.down || this.player.body.onFloor();
    var rightDown = this.controls.right.isDown;
    var leftDown  = this.controls.left.isDown;
    var upDown    = this.controls.up.isDown;

    if(rightDown && !leftDown) {
      this.player.body.velocity.x = this.player.walkSpeed;
      this.player.animations.play('walk');
    }
    else if(leftDown && !rightDown) {
      this.player.body.velocity.x = -this.player.walkSpeed;
      this.player.animations.play('walk');
    }
    else {
      this.player.body.velocity.x = 0;
      this.player.animations.play('idle');
    }
    if(grounded) {
      if(upDown){
        this.player.body.velocity.y = this.player.jumpSpeed;
        this.player.animations.play('jump');
      }
    }
  },
  killPlayer: function() {
    this.state.start('level_1_1');
  },
  boxObject: function(index, game, x, y) {
    let res = game.add.sprite(x, y, 'box_1');
    res.anchor.setTo(0.5, 0.5);
    res.name = index.toString();
    game.physics.arcade.enable(res);
    res.body.drag.x = 5000;
    res.body.bounce.y = 0.5;
    res.body.collideWorldBounds = true;
    return res;
  }
}
