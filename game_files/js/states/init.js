// Initialisierungsfunktion, aktivert nach dem Laden der HTML-Seite
function init() {
  // Kontextmenu deaktivieren (Lösung von: http://stackoverflow.com/q/3413683/)
  window.oncontextmenu = (event) => {
     event.preventDefault()
     event.stopPropagation()
     return false
  }
  // Spiel als neues Spiel-Objekt (ab eigener Vorlage unten)
  window.game = new Game()
}

// Spiel-Objekt, child von Phaser-Spiel-Objekt
class Game extends Phaser.Game {
  constructor() {
    // Grösse (x, y), Anzeigeart, parent-Objekt, default state, transparent
    super(800, 480, Phaser.CANVAS, 'gameBox', null, null, false)

    // Alle States hinzufügen
    this.state.add('Startup', Startup)
    this.state.add('Preload', Preload)
    this.state.add('Menu', Menu)
    this.state.add('Credits', Credits)
    this.state.add('Leaderboard', Leaderboard)
    this.state.add('EnterName', EnterName)
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
    this.state.add('Level10', Level10)
    this.state.add('Level11', Level11)
    this.state.add('Level12', Level12)
    this.state.add('Level13', Level13)
    this.state.add('Level14', Level14)
    this.state.add('Level15', Level15)
    this.state.add('Level16', Level16)
    this.state.add('Level17', Level17)
    this.state.add('Level18', Level18)
    this.state.add('Cutscene01', Cutscene01)
    this.state.add('Cutscene02', Cutscene02)
    this.state.add('Cutscene03', Cutscene03)
    this.state.add('Cutscene04', Cutscene04)
    this.state.add('Cutscene05', Cutscene05)
    this.state.add('Cutscene06', Cutscene06)

    // Startup-State starten
    this.state.start('Startup')
  }
}
