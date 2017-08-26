function init() {
  // Kontextmenu (Rechtsklick, btw. langer Druck auf Mobilgeräten) wird deaktiviert
  // Lösung von: http://stackoverflow.com/q/3413683/
  window.oncontextmenu = function (event) {
     event.preventDefault()
     event.stopPropagation()
     return false
  }
  window.game = new Game()
}

class Game extends Phaser.Game {
  constructor() {
    super(800, 480, Phaser.Canvas, null, null, null, false)
    this.state.add('Startup', Startup)
    this.state.add('Preload', Preload)
    this.state.add('Level01', Level01)
    this.state.add('Level02', Level02)
    this.state.add('Level03', Level03)
    this.state.add('Level04', Level04)
    this.state.start('Startup')
  }
}
