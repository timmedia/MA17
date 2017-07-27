Game.level_2_1 = function() {};

Game.level_2_1.prototype.create = function() {

  this.add.sprite(0, 0, '2_1_background');
  this.add.sprite(0, 0, '2_1_midground');
  LoadMapData(this, '2_1_map');
  this.physics.arcade.gravity.y = 1300;

  this.key = new Key(this, 390, 400, '2_1_key', 0, true, this.collectKey);

  this.water = new StaticGameObject(this, 344, 440, '2_1_water');
  this.water.animations.add('down', [0,1,2,3], 10, true);
  this.water.animations.add('go_up', [4,5,6,7], 10, false);
  this.water.animations.add('go_down', [12,13,14,15], 10, false);
  this.water.animations.add('up', [8,9,10,11], 10, true);
  this.water.animations.play('down');
  this.water.direction = 'down';
  this.water.body.setSize(35, 150, 44, 173);

  this.button1 = new Button(this, 80, 380, '1_1_button', 90, this.switchGravity);
  this.button2 = new Button(this, 720, 100, '1_1_button', -90, this.switchGravity);
  this.player = new Player(this, 200, 300, 'player_1', 300, -600);

  LevelFade(this);
}

Game.level_2_1.prototype.render = function() {
  game.debug.body(this.player);
  game.debug.body(this.water);
}

Game.level_2_1.prototype.update = function() {
    this.physics.arcade.collide(this.layer, [this.boxes, this.player]);
    this.physics.arcade.collide(this.player, this.boxes);

    this.physics.arcade.collide(this.button1, this.player, this.button1.callback, this.button1.processCallback, this);
    this.physics.arcade.collide(this.button2, this.player, this.button2.callback, this.button2.processCallback, this);

    this.physics.arcade.overlap(this.door, this.player, this.door.callback, this.door.processCallback, this);

    this.physics.arcade.overlap(this.player, this.key, this.key.callback, this.key.processCallback, this);

    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);
}

Game.level_2_1.prototype.switchWater = function() {
  if(this.water.direction === 'down') {
    this.water.direction = 'up';
    this.water.animations.play('go_up');
    this.water.animations.currentAnim.onComplete.add(function() {
      this.water.animations.play('up');
    }, this);
    this.water.body.setSize(35, 150, 44, 0);
  }
  else {
    this.water.direction = 'down';
    this.water.animations.play('go_down');
    this.water.animations.currentAnim.onComplete.add(function() {
      this.water.animations.play('down');
    }, this);
    this.water.body.setSize(35, 150, 44, 173);
  }
}

Game.level_2_1.prototype.switchGravity = function() {
    this.physics.arcade.gravity.y *= -1;
    this.player.jumpSpeed *= -1;
    this.switchWater();
    let ang = (this.player.angle + 180) % 360;
    this.add.tween(this.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out,true);
}

Game.level_2_1.prototype.killPlayer = function() {
    this.state.restart();
}

Game.level_2_1.prototype.collectKey = function() {
    this.door.unlock();
    this.key.destroy();
}

Game.level_2_1.prototype.doorAction = function() {
    this.state.start('main_menu');
}
