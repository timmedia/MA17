var globalDebug

/* Klasse Startup */
class Startup extends Phaser.State {
  init() {
    this.input.maxPointers = 2 // maximale Touch-Eingaben

    // Spiel soll beim Verlassen des Fensters nicht stoppen
    this.stage.disableVisibilityChange = true

    // Skalierung, ganzes Spiel soll angezeigt werden
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    // Spiel horizontal zentrieren
    this.scale.pageAlignHorizontally = true

    // Pixels runden, Behebung Zittereffekt
    // (Lösung von: http://www.html5gamedevs.com/topic/12485-sprite-jittering-
    // with-camera-follow/)
    window.game.renderer.renderSession.roundPixels = true

    // Optionen für das Spiel ab query string, Einzelne Optionen in ein Array
    // z.B. ['option1=value1', 'option2=value2']
    var query = window.location.search.substr(1).split('&')
    // Optionen sollen überall verfügbar sein
    game.options = {}
    // momentan noch im format 'option=value', wid nun umgewandelt in {option:
    // value} und gespeichert im game.options-Objekt
    query.forEach(option => {
      let elements = option.split('=')
      game.options[elements[0]] = elements[1]
    })
    // game.options nun z.B. = {option1: value1, option2: value} (JSON)

    // wichtigste Eigenschaften des Spieles (z.B. wichtig für Arcade, mobile
    // Geräte, Webseite, ...), erweiterbar
    // game.status.info.changeCounter ist nötig um Veränderungen zu erkennen,
    // Objekt-Vergleiche sind mühsam und ineffizient in JavaScript
    game.status = {
      // Informationen als JSON
      info: {
        mode: 'loading',
        deathCount: 0,
        shootEnabled: false,
        changeCounter: 0
      },

      // Modus setzen
      setMode: function (mode) {
        this.info.mode = mode || 'loading'
        this.info.changeCounter += 1
      },

      // Anzahl Tode setzen
      setDeathCount: function (deaths) {
        this.info.deathCount = deaths || 0
        this.info.changeCounter += 1
      },

      // Anzahl Tode um 1 erhöhen
      increaseDeathCount: function () {
        this.info.deathCount += 1
        this.info.changeCounter += 1
      },

      // Schiess-Modus an/ausf
      setShootMode: function (boolean) {
        this.info.shootEnabled = boolean
        this.info.changeCounter += 1
      }
    }

    if (game.options.mode) {
      if (game.options.mode === 'arcade') {
        game.isArcade = true
        game.isMobile = false
        game.server = new WebSocketConnection(9001)
      } else if (game.options.mode === 'mobile') {
        game.isArcade = false
        game.isMobile = true
      } else {
        game.isArcade = false
        game.isMobile = false
      }
    }

    // Debug-Modus ab Query (Tilemaps werden im Debug-Modus angezeigt, siehe
    // gamestate.js)
    if (game.options.debug && game.options.debug === 'true') {
      globalDebug = true
    }

    // Start-Level ab Argument festlegen
    game.startLevel = game.options.state || 'Menu'
  }

  // Ladebalken-Grafik laden
  preload() {
    this.load.image('Preload Bar', 'assets/graphics/preload/bar.gif')
  }

  // Dateilade-State starten
  create() {
    this.state.start('Preload')
  }
}
