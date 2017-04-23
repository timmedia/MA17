Game.level_2_1 = function(){};


Game.level_2_1.prototype = {
  create:function(){
    this.world.bounds.setTo(0, 0, 900, 450);
    this.background = this.add.sprite(0, 0, 'background_1_1');

    this.map = this.add.tilemap('map_2_1', 25, 25);
    this.map.addTilesetImage('tileset_2_1');
    this.map.setCollisionBetween(0, 2);
    this.layer = this.map.createLayer(0);


    this.player = this.add.sprite(200, 100, 'player_1_1');
    this.player.anchor.setTo(0.5, 0.5);

    this.player.animations.add('idle', [0,1,2,3], 5, true);
    this.player.animations.add('walk', [4,5,6,7], 5, true);
    this.player.animations.add('jump', [8,9,10,11], 5, true);

    this.physics.arcade.gravity.y = 2000;
    this.physics.arcade.enable(this.player);

    this.buttons = this.add.physicsGroup(this.physics.arcade);

    var s = this.buttons.create

    this.button_1 = new this.buttonObject(0, this, 127, 380, 'left');



    this.controls = {
      right:this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up:   this.input.keyboard.addKey(Phaser.Keyboard.W)
    }

    this.player.walkSpeed = 300;
    this.player.jumpSpeed = -740;

  },
  update:function(){
    this.physics.arcade.collide(this.player, this.layer);

    var grounded = this.player.body.touching.down || this.player.body.onFloor();
    var rightDown = this.controls.right.isDown;
    var leftDown = this.controls.left.isDown;
    var upDown = this.controls.up.isDown;

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
  buttonObject: function(index, game, x, y, orientation) {
    let res = game.add.sprite(x, y, 'button_1');
    res.anchor.setTo(0.5, 0.5);
    res.name = index.toString();
    res.animations.add('up', [0], 0, false);
    res.animations.add('down', [1], 0, false);
    res.animations.play('up');
    switch (orientation) {
      case 'up':
        res.angle = 0;
        break;
      case 'left':
        res.angle = 90;
        break;
      case 'down':
        res.angle = 180;
        break;
      case 'left':
        res.angle = -90;
        break;
      default:
        console.log('button orientation invalid');
    }
    return res;
  }
}
