Game.preload = function() {

  this.preload_graphic = null;

};

Game.preload.prototype = {
  preload:function(){

    this.preload_graphic = this.add.sprite(this.world.centerX, this.world.centerY, 'preload_graphic');

    this.preload_graphic.anchor.setTo(0.5, 0.5);

    this.time.advancedTiming = true;

    this.load.setPreloadSprite(this.preload_graphic);

    //this.load.tilemap('map_1_1', 'assets/map/level_1_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map_1_1', 'assets/map/level_1_1.csv');
    this.load.tilemap('map_2_1', 'assets/map/level_2_1.csv');
    this.load.image('tileset_1_1', 'assets/graphics/tileset_1.gif');
    this.load.spritesheet('water_1', 'assets/graphics/water_1.gif', 150, 250);
    this.load.image('background_1_1', 'assets/graphics/background_1_1.gif');
    this.load.image('box_1', 'assets/graphics/box_1.gif');
    this.load.spritesheet('player_1_1', 'assets/graphics/player_1_1.gif', 40, 80);
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);
    this.load.spritesheet('bridge_1', 'assets/graphics/bridge_1.gif', 150, 150);
    this.load.spritesheet('button_1', 'assets/graphics/button_1.gif', 20, 7);
    this.load.image('tileset_2_1', 'assets/graphics/level_2_1/tileset.gif');

    this.load.image('debug10x10', 'assets/graphics/debug/tile10x10.gif')

    controls = {
      right:this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:  this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:  this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    checkInput = function(p, ctrl) {
      var grounded  = p.body.blocked.down;
      var rightDown = ctrl.right.isDown;
      var leftDown  = ctrl.left.isDown;
      var upDown    = ctrl.up1.isDown;

      if(p.jumpSpeed < 0){
        grounded = p.body.blocked.down || p.body.touching.down;
      }
      else {
        grounded = p.body.blocked.up || p.body.touching.up;
      }
      var res;

      //console.log(grounded);

      if(rightDown && !leftDown) {
        p.body.velocity.x = p.walkSpeed;
        p.animations.play('walk');
      }
      else if(leftDown && !rightDown) {
        p.body.velocity.x = -p.walkSpeed;
        p.animations.play('walk');
      }
      else {
        p.body.velocity.x = 0;
        if(grounded){p.animations.play('idle');}
      }

      if(grounded) {
        if(upDown){
          p.body.velocity.y = p.jumpSpeed;
        }
      }
      else {
        p.animations.play('jump');
        if(p.body.velocity.y > p.maxFallingSpeed) {
          p.body.velocity.y = p.maxFallingSpeed;
        }
      }
    }
  },

  create:function(){
    this.state.start('level_2_1');
  }
}
