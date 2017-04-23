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
    this.load.image('tileset_1_1', 'assets/graphics/tileset_1.gif');
    this.load.spritesheet('water_1', 'assets/graphics/water_1.gif', 150, 250);
    this.load.image('background_1_1', 'assets/graphics/background_1_1.gif');
    this.load.image('box_1', 'assets/graphics/box_1.gif');
    this.load.spritesheet('player_1_1', 'assets/graphics/player_1_1.gif', 40, 80);
    this.load.spritesheet('bridge_1', 'assets/graphics/bridge_1.gif', 150, 150);
    this.load.spritesheet('button_1', 'assets/graphics/button_1.gif', 20, 7);

    this.load.tilemap('map_2_1', 'assets/map/level_2_1.csv');
    this.load.image('tileset_2_1', 'assets/graphics/level_2_1/tileset.gif');



  },

  create:function(){
    this.state.start('level_2_1');
  }
}
