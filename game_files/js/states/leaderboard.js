/*
Das High-score System läuft über Google Firebase
der Code wurde grossteils von der Dokumentation übernommen und modifiziert
https://firebase.google.com/docs/firestore/
*/

/* Klasse Leaderboard */
class Leaderboard extends Phaser.State {
  create() {
    // Hintergrund-Bild und Vignette hinzufügen
    this.add.sprite(0, 0, 'Credits Background')
    this.vignette = this.add.sprite(0, 0, 'Menu Vignette')

    // Musik abspielen
    game.switchMusic('Menu', 1)

    if (!game.firebaseStarted) {
      // Firebase initialisieren
      var config = {} // config goes here
      firebase.initializeApp(config)
      game.database = firebase.firestore()
      game.firebaseStarted = true
    }

    // Pfad der Dateien
    this.path = game.database.doc('scoring/highscores')

    // Text, wird angezeigt bis Daten eintreffen
    this.loadingText = this.add.bitmapText(
      40, 200, 'Small White', 'LOADING\nDATA' , 64
    )

    // Titeltext rechts
    this.add.bitmapText(110, 30, 'Small White', 'LEADERBOARD', 96)

    // 'zurück'-Text
    this.add.bitmapText(
      500, 275, 'Small White', 'PRESS BACKSPACE\nTO RETURN TO MENU', 32
    )

    // Dateien laden und anzeigen (passiert asynchron)
    this.path.get().then(entry => {
      // Falls in der Zwischenzeit der State veränder wird
      if (game.state.current === "Leaderboard") {
        this.loadingText.kill() // Ladetext löschen
        let data = entry.data()
        for (let i in data) {
          // Namen
          this.add.bitmapText(
            40, 150 + i * 60, 'Small White', data[i][1].toUpperCase() , 64
          )
          // Resultate
          this.add.bitmapText(240, 150 + i * 60, 'Small White', data[i][0], 64)
        }
      }
    })

    // Flackern des Hintergrundes, ähnlich wie im Menu
    this.flicker = () => {
      var delay                    // Zeit bis zum nächsten Fläckern
      if (this.vignette.alpha === 1) {
        this.vignette.alpha = 0.8
        delay = Math.random() * 300
      } else {
        this.vignette.alpha = 1
        delay = Math.random() * 2500
      }
      this.time.events.add(delay, this.flicker)
    }
    this.flicker() // Flackern starten

    // Das Drücken eines jeden Knopfes bewirkt ein Zurückgehen zum Menu (Idee:
    // http://www.html5gamedevs.com/topic/5905-what-is-function-check-any-key-
    // press-in-phaser/)

    // ESC: Verbindung mit Server unterbrechen, Arcade shutdown
    if (this.game.isArcade) controls.esc.onDown.add(() => game.server.end())

    this.game.input.keyboard.onDownCallback = () =>  this.state.start('Menu')
  }
}
