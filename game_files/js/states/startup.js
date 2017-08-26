class Startup extends Phaser.State {
  init() {
    this.input.maxPointers = 2
    this.stage.disableVisibilityChange = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    window.game.renderer.renderSession.roundPixels = true
  }
  preload() {
    this.load.image('Preload Bar', 'assets/graphics/preload/bar.gif')
  }
  create() {
    this.state.start('Preload')
  }
}
