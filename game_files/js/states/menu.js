/* Klasse Menu */
class Menu extends Phaser.State {
  create() {
    this.add.sprite(0, 0, 'Menu Background')                // Hintergrund-Bild
    this.lights = this.add.sprite(174, 308, 'Menu Lights')  // Lampen

    // Michael, mit Animationen
    let michael = this.add.sprite(310, 318, 'Menu Michael')
    michael.animations.add('idle', [0, 1, 2, 3], 2, true)
    michael.animations.play('idle')

    // Verdunkelung
    this.vignette = this.add.sprite(0, 0, 'Menu Vignette')

    // Logo mit Semitransparenz
    this.logo = this.add.sprite(70, 287, 'Menu Logo')
    this.logo.alpha = 0.8

    // 'by Alex & Tim' Grafik
    this.add.sprite(586, 20, 'Menu Copyright')

    // Knopf um Spiel zu starten, Standardgemäss selektiert
    // wird bei Maus-Hover selektiert
    this.buttonP = this.add.button(108, 93, 'Menu Play', this.startGame, this)
    this.buttonP.events.onInputOver.add(this.selectButton, this, null, true)
    this.buttonP.selected = true

    // Knopf um Highscores zu sehen, wird bei Maus-Hover selektiert
    this.buttonL = this.add.button(
      108, 169, 'Menu Leaderboard', this.startLead, this
    )
    this.buttonL.events.onInputOver.add(this.selectButton, this, null, false)
    this.buttonL.alpha = 0.5      // Semitransparenz
    this.buttonL.selected = false // zu Beginn nicht selektiert

    // Pfeil links von Menu-Punkten
    this.arrow = this.add.sprite(72, 94, 'Menu Arrow')

    // Optionen mit Spiel-Steuerung ändern/wählen (haupsächlich für Arcade)
    controls.right.onDown.add(this.switchSelected, this)
    controls.left.onDown.add(this.switchSelected, this)
    controls.up1.onDown.add(this.startSelected, this)
    controls.up2.onDown.add(this.startSelected, this)

    // Flickern der Lichter
    this.lights.flicker = () => {
      let x = Math.random() > 0.93 // Häufigkeit (~7%)
      if (x) {                     // Soll flickers
        this.lights.alpha = 0.2    // Lampen Transparenz ändern (transparenter)
        this.vignette.alpha = 1    // Verdunkelung (nicht transparent, dunkel)
        this.logo.alpha = 0.4      // Logo dunkler
      } else {                     // Soll nicht flickern
        this.lights.alpha = 1      // Lampen hell
        this.vignette.alpha = 0.95 // Verdunkelung transparenter (heller)
        this.logo.alpha = 0.8      // Logo heller
      }
      // nach 0.1s wieder ausführen
      this.time.events.add(100, this.lights.flicker)
    }
    this.lights.flicker() // Flickern starten
  }

  // Funktion um Menu-Option zu selektieren
  selectButton(arg) {
    // arguments sind die von Phaser durchgegebenen Argumente, [2] ist hier
    // das Argument von '.events.onInputOver.add' (true: play; false: leaderb.)
    if (arguments[2] || arg === 'play') { // Spiel-Knopf ist ausgewählt
      this.buttonPlay.alpha = 1           // Spiel-Knopf keine Semitransparenz
      this.buttonPlay.selected = true     // Spiel-Knopf ist selektiert
      this.buttonLead.alpha = 0.5         // Semitransparenz beim Leaderb.-Knopf
      this.buttonLead.selected = false    // Leaderboard-Knopf nicht ausgewählt
      this.arrow.position.setTo(72, 94)   // Position des Pfeiles anpassen
    } else {                              // Leaderboard-Knopf wird ausgewählt
      this.buttonPlay.alpha = 0.5         // Spiel-Knopf Semitransparenz
      this.buttonPlay.selected = false    // Spiel-Knopf nicht selektiert
      this.buttonLead.alpha = 1           // Leaderb.-Knopf keie Transparenz
      this.buttonLead.selected = true     // Leaderb.-Knopf ist aktiv
      this.arrow.position.setTo(72, 170)  // Pfeil-Position anpassen
    }
  }

  // Menu-Option auswählen
  switchSelected() {
    if (this.buttonPlay.selected) { // Highscore-Knopf wählen
      this.selectButton('lead')
    } else {                        // Spiel-Knopf wählen
      this.selectButton('play')
    }
  }

  // Selektierte Option starten
  startSelected() {
    if (this.buttonPlay.selected) { // Spiel-Knopf ist selektiert
      this.startGame()              // Spiel starten
    } else {                        // Highscore-Knopf ist selektiert
      this.startLead()              // Highscore-Anzeige starten
    }
  }

  // Spiel starten
  startGame() {
    this.camera.fade() // verdunkeln
    game.state.start('Tutorial')
  }

  // Highscore-Anzeige starten
  startLead() {
    this.camer.fade() // verdunkeln
    console.log('Leaderboard started')
  }
}
