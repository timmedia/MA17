Game = {};

Game.startup = function(){};

Game.startup.prototype = {
  init:function(){
     // Amount of pointrs allowed (multi-touch)
     this.input.maxPointers = 1;

     this.stage.disableVisibilityChange = true;
     // Removal of Jittering (http://www.html5gamedevs.com/topic/12485-sprite-jittering-with-camera-follow/)
     game.renderer.renderSession.roundPixels = true;
  },

  preload:function(){

    this.load.image('preload_graphic', 'assets/graphics/preload_graphic.gif');

  },

  create:function(){
    this.state.start('preload');
  }
}
