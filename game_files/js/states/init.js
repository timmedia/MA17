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
    super(800, 480, Phaser.CANVAS, null, null, null, false)
    this.state.add('Startup', Startup)
    this.state.add('Preload', Preload)
    this.state.add('Menu', Menu)
    this.state.add('Tutorial', Tutorial)
    this.state.add('Level01', Level01)
    this.state.add('Level02', Level02)
    this.state.add('Level03', Level03)
    this.state.add('Level04', Level04)
    this.state.add('Level05', Level05)
    this.state.add('Level06', Level06)
    this.state.add('Level07', Level07)
    this.state.add('Level08', Level08)
    this.state.add('Level09', Level09)
    this.state.add('Cutscene01', Cutscene01)
    this.state.add('Cutscene02', Cutscene02)
    this.state.start('Startup')
  }
}
