class Startup extends Phaser.State {
  init() {
    this.input.maxPointers = 2
    this.stage.disableVisibilityChange = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    window.game.renderer.renderSession.roundPixels = true
  }
  preload() {
    this.load.image('preload_graphic', 'assets/graphics/preload/bar.gif')
  }
  create() {
    this.state.start('Preload')
  }
}

// 'Startup'-State als leere Funktion
Game.startup = function () {};

Game.startup.prototype = {
  init: function () {
     // Anzahl Inputs (später ev. für Multitouch-Support)
     this.input.maxPointers = 2
     this.stage.disableVisibilityChange = true

     // Skalierung
     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

     // Behebungs eines Zittereffekts
     // Lösung von: http://www.html5gamedevs.com/topic/12485-sprite-jittering-with-camera-follow/
     game.renderer.renderSession.roundPixels = true;

  },
  preload: function () {
    // Ladebalken wird in den Cache geladen
    this.load.image('preload_graphic', 'assets/graphics/preload/bar.gif');
  },
  create: function () {
    // 'Preload'-state wird gestartet
    this.state.start('Preload');
  }
}
