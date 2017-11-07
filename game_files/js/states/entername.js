/* Klasse Eintrag ins Leaderboard */
class EnterName extends Phaser.State {
  create() {
    // Hintergrund-Bild und Vignette hinzufügen
    this.add.sprite(0, 0, 'Credits Background')
    this.vignette = this.add.sprite(0, 0, 'Menu Vignette')

    if (!game.firebaseStarted) {
      // Firebase initialisieren
      var config = {
        apiKey: "AIzaSyDip3wz7_-m13S1-i-sOLOS6PBlanqSrj4",
        authDomain: "mission-reset.firebaseapp.com",
        projectId: "mission-reset"
      }
      firebase.initializeApp(config)
      this.database = firebase.firestore()
      game.firebaseStarted = true
    }

    // Pfad der Dateien
    this.path = this.database.doc('scoring/highscores')

    // Text, wird angezeigt bis Daten eintreffen
    this.loadingText1 = this.add.bitmapText(
      40, 200, 'Small White', 'CALCULATING YOUR SCORE' , 64
    )

    // Text, wird angezeigt bis Daten eintreffen
    this.loadingText2 = this.add.bitmapText(
      300, 100, 'Small White', 'PLEASE WAIT' , 32
    )

    this.score = 400

    // Dateien laden um zu vergleichen
    this.path.get().then(entry => {
      this.loadingText1.kill() // Ladetext löschen
      this.loadingText2.kill() // Ladetext löschen
      let data = entry.data()
      var ranking = 5
      // Ranking herausfinden
      if (this.score < data[4][0]) {
        if (this.score < data[3][0]) {
          if (this.score < data[2][0]) {
            if (this.score < data[1][0]) {
              if (this.score < data[0][0]) { ranking = 0 } // Erster Platz
              else { ranking = 1 }                         // Zweiter Platz
            } else { ranking = 2 }                         // Dritter Platz
          } else { ranking = 3 }                           // Vierter Platz
        } else { ranking = 4 }                             // Fünfter Platz
      }

      if (ranking !== 5) {
        // Eintrag ins Highscore
        var text
        switch (ranking) {
          case 4:
            text = 'YOU ARE FIFTH! NICE JOB.'
            break;
          case 3:
            text = 'YOU ARE FOURTH! WELL DONE.'
            break;
          case 2:
            text = 'YOU CAME IN THIRD! AMAZING.'
            break;
          case 1:
            text = 'YOU ARE SECOND! WOW.'
            break;
          case 0:
            text = 'YOU BEAT THE HIGHSCORE! YOU ARE THE BEST.'
            break;
        }
        this.add.bitmapText(40, 40, 'Small White', text , 64)

        // Name eingeben
        this.add.bitmapText(
          40, 200, 'Small White', 'PLEASE ENTER YOUR NAME:', 32
        )

        // Felder Anzeige der verschiedenen Buchstaben
        this.field1 = this.add.bitmapText(80, 290, 'Small White', 'A', 128)
        this.field1 = this.add.bitmapText(200, 290, 'Small White', 'A', 128)
        this.field1 = this.add.bitmapText(320, 290, 'Small White', 'A', 128)
        this.field1 = this.add.bitmapText(440, 290, 'Small White', 'A', 128)
        this.field1 = this.add.bitmapText(560, 290, 'Small White', 'A', 128)
      } else {
        // Kein Eintrag
        this.add.bitmapText(
          120, 140, 'Small White', 'YOUR SCORE IS ' + this.score.toString() , 64
        )
        this.time.events.add(5000, () => this.state.start('Menu'))
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

  }
}
