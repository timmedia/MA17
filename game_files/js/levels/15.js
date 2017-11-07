/* Klasse Level 15 */
class Level15 extends GameState {
  build() {
    this.setup(
      'Level15 Map',        // Karte
      4000, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Cutscene05',         // nächstes Level
      'Level15 Foreground', // Vordergrund-Bild
      'Level15 Midground',  // Mittelgrund-Bild
      'Level15 Background', // Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Gabbie, mit Animationen
    this.gabbie = new StaticGameObject(this, 2515, 451, 'Level15 Gabbie')
    this.gabbie.animations.add('beginning', [0, 1, 2, 3, 4, 5, 6], 4, true)
    this.gabbie.animations.add('second', [7, 8, 9, 10, 11, 12, 13], 4, true)
    this.gabbie.animations.play('beginning')

    // Sprechblase, anfangs nicht zu sehen
    this.bubble = this.add.sprite(2520, 300, 'Level15 Speechbubbles')
    this.bubble.anchor.setTo(1, 1)
    this.bubble.scale.setTo(0, 0)

    // Hitbox verschieben um Sprechblasen zu aktivieren
    this.gabbie.body.setSize(20, 480, -200, -290)

    // Spieler wird hinzugefügt
    this.player = new Player(this, 420, 250, 'Player 01', 300, -600, true)
  }

  // Spiel-Schleife
  loop() {
    // Kollision Spieler und Hitbox von Gabbie
    this.physics.arcade.overlap(this.player, this.gabbie, () => {
      if (this.player.body.moves) {
        // Spieler kann sich nicht mehr bewegen, reden beginnt
        this.player.body.moves = false
        // nach kurzer Verzögerung beginnt sie zu reden
        this.time.events.add(850, this.openBubble, this, 0)
        this.time.events.add(6000, this.closeBubble, this)
        this.time.events.add(7000, this.openBubble, this, 1)
        this.time.events.add(12000, this.closeBubble, this)
        this.time.events.add(13000, this.openBubble, this, 2)
        this.time.events.add(18000, this.closeBubble, this)
        this.time.events.add(19000, this.openBubble, this, 3)
        this.time.events.add(24000, this.closeBubble, this)
        this.time.events.add(25000, this.openBubble, this, 4)
        this.time.events.add(30000, this.closeBubble, this)
        this.time.events.add(31000, () => {
          this.openBubble(5)
          this.gabbie.animations.play('second')
        })
        this.time.events.add(35000, this.closeBubble, this)
        this.time.events.add(36000, this.openBubble, this, 6)
        this.time.events.add(40000, this.closeBubble, this)
        this.time.events.add(41000, this.openBubble, this, 7)
        this.time.events.add(45000, this.closeBubble, this)
        this.time.events.add(46000, this.openBubble, this, 8)
        this.time.events.add(50000, this.goToNextLevel, this)
      }
    })
  }

  // Funktion um Sprechblase zu öffnen
  openBubble(n) {
    this.bubble.frame = parseInt(n)
    this.add.tween(this.bubble.scale)
      .to({x: 1, y: 1}, 500, Phaser.Easing.Cubic.Out, true)
  }

  // Funktion um Sprechblase zu schliessen
  closeBubble() {
    this.add.tween(this.bubble.scale)
      .to({x: 0, y: 0}, 300, Phaser.Easing.Cubic.Out, true)
  }
}
