Game = {};

Game.startup = function(){};

Game.startup.prototype = {
  init:function(){
     // Später für Multi-Touch
     this.input.maxPointers = 1;
     this.stage.disableVisibilityChange = true;
     // Jitter-Effekt behoben (http://www.html5gamedevs.com/topic/12485-sprite-jittering-with-camera-follow/)
     game.renderer.renderSession.roundPixels = true;
  },
  preload:function(){
    // Ladebalken wird geladen
    this.load.image('preload_graphic', 'assets/graphics/preload_graphic.gif');
  },
  create:function(){
    // Nächster state wird gestartet
    this.state.start('preload');
  }
}
