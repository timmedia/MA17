/* Klasse Startup */
class Startup extends Phaser.State {
  init() {
    this.input.maxPointers = 2 // maximale Touch-Eingaben
    this.stage.disableVisibilityChange = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    window.game.renderer.renderSession.roundPixels = true
  }
  preload() {
    // Ladebalken-Grafik laden
    this.load.image('Preload Bar', 'assets/graphics/preload/bar.gif')
  }
  create() {
    this.state.start('Preload') // Dateilade-State starten
  }
}
