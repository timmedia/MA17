/* Klasse Tutorial */
class Tutorial extends GameState {
  build() {
    this.setup(
      'Tutorial Map',        // Karte
      800, 480,              // Weltgrösse
      2000,                  // Gravitation
      'Level13',             // nächstes Level
      'Tutorial Foreground', // Vordergrund-Bild
      'Tutorial Midground',  // Mittelgrund-Bild
      'Tutorial Background', // Hintergrund-Bild
      'blue_white'           // Farbmodus (Arcade)
    )

    // Musik
    game.switchMusic('Tutorial', 1)

    // Michael mit Animation (versetzt damit nicht gleiche Bewegun wie Spieler
    // selbst), Ankerpunk unten mittig
    this.michael = this.add.sprite(155, 460, 'Tutorial Michael')
    this.michael.animations.add('idle', [2, 3, 0, 1], 5, true)
    this.michael.animations.play('idle')
    this.michael.anchor.setTo(0.5, 1)

    // Sprechblasen, Ankerpunkt unten links, erstes Frame angezeigt, Grösse 0
    this.speechbubble = this.add.sprite(178, 315, 'Tutorial Speechbubbles')
    this.speechbubble.anchor.setTo(0, 1)
    this.speechbubble.scale.setTo(0, 0)

    // Erstes Sprechblasen-Bild soll nach 1.5s erscheinen
    this.time.events.add(1500, this.openBubble, this, 0)

    // Knopf um Schlüssel zu bekommen
    this.button = new Button(
      this, 790, 390, 'General Button', -90, this.buttonPress
    )

    // Spieler
    this.player = new Player(this, 300, 300, 'Player 01', 300, -800)

    // Schlüssel, zuerst nicht sichtbar
    this.key = new Key(this, 585, 210, 'General Key', 0, false, this.collectKey)
  }

  // Spiel-Schleife
  loop() {
    // Spieler-Aktionen überprüfen
    this.michaelCheck()
  }

  // Knopf wird gedrückt
  buttonPress() {
    // Falls Schlüssel noch nicht sichtbar, soll er erscheinen
    if (!this.key.visible) this.key.visible = true
  }

  // Sprechblase öffnen
  openBubble(n) {
    this.speechbubble.frame = n // Frame ab Argument
    // Sprechblase von Grösse 0 zu Grösse 1 während 300ms
    this.add.tween(this.speechbubble.scale)
      .to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.Out, true)
    this.speechbubble.busy = false // siehe später
  }

  // Sprechblase schliessen
  closeBubble() {
    // Sprechblase während 200ms auf Grösse 0 skaliert
    this.add.tween(this.speechbubble.scale)
      .to({x: 0, y: 0}, 200, Phaser.Easing.Quadratic.InOut, true)
  }

  // Status überprüfen
  michaelCheck() {
    // Je nach aktuelle Sprechblase soll etwas anderes überprüft werden
    switch (this.speechbubble.frame) {
      case 0:
        // Spieler soll laufen
        if (!this.speechbubble.busy && (this.player.body.velocity.x != 0)) {
          // Spieler hat horizontale Geschwindigkeit, er läuft
          // Sprechblase wird noch 2.5s angezeigt, dann geschlossen
          this.time.events.add(2500, this.closeBubble, this)
          this.speechbubble.busy = true // soll nicht wieder überprüft werden
          // nächste Sprechblase nach 500ms Pause (2500 + 500)
          this.time.events.add(3000, this.openBubble, this, 1)
        }
        break
      case 1:
        // Spieler soll springen
        if (!this.speechbubble.busy && (this.player.body.velocity.y != 0)) {
          // Spieler hat vertikale Geschwindigkeit
          // nächste Sprechblase, gleich wie zuvor
          this.time.events.add(2500, this.closeBubble, this)
          this.speechbubble.busy = true
          this.time.events.add(3000, this.openBubble, this, 2)
        }
        break
      case 2:
        // Spieler soll Türe berühren
        if (!this.speechbubble.busy) {
          // Phaser Physik: Kollision überprüfen
          this.physics.arcade.overlap(this.door, this.player, () => {
            // nächste Sprechblase, gleich wie zuvor
            this.time.events.add(2500, this.closeBubble, this)
            this.speechbubble.busy = true
            this.time.events.add(3000, this.openBubble, this, 3)
          })
        }
        break
      case 3:
        // Spieler soll Knopf berühren
        if (!this.speechbubble.busy) {
          // Phaser-Physik: Kollision mit Knopf
          this.physics.arcade.overlap(this.button, this.player, () => {
            // nächste Sprechblase, gleich wie zuvor
            this.time.events.add(2500, this.closeBubble, this)
            this.speechbubble.busy = true
            this.time.events.add(3000, this.openBubble, this, 4)
          })
        }
        break
      default:
        break
    }
  }

  // Schlüssel einsammeln
  collectKey() {
    this.door.unlock() // Türe öffnen
    this.key.destroy() // Schlüssel zerstören
  }
}
