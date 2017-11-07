/* Klasse Level 17 */
class Level17 extends GameState {
  build() {
    this.setup(
      'Level17 Map',        // Karte
      1900, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Cutscene06',         // nächstes Level
      null, null,
      'Level17 Background', // nur Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Gus, mit Animation
    this.gus = this.add.sprite(300, 260, 'Level17 Gus')
    this.gus.animations.add('running', [0, 1, 2, 3], 5, true)
    this.gus.animations.play('running')

    // Sprechblasen
    this.bubble = this.add.sprite(450, 200, 'Level17 Speechbubbles')
    this.bubble.scale.setTo(0, 0)

    // Spieler wird hinzugefügt
    this.player = new Player(this, 100, 250, 'Player 01', 200, -600, true)

    this.time.events.add(2500, this.openBubble, this, 0)
    this.time.events.add(7500, this.closeBubble, this)
    this.time.events.add(8500, this.openBubble, this, 1)
    this.time.events.add(11500, this.closeBubble, this)
    this.time.events.add(14500, this.openBubble, this, 2)
    this.time.events.add(19500, this.closeBubble, this)
    this.time.events.add(20500, this.openBubble, this, 3)
    this.time.events.add(25500, this.closeBubble, this)
    this.time.events.add(26500, this.openBubble, this, 4)
    this.time.events.add(30500, this.closeBubble, this)
    this.time.events.add(31500, this.openBubble, this, 5)
    this.time.events.add(36500, this.closeBubble, this)
    this.time.events.add(37500, this.openBubble, this, 6)
    this.time.events.add(42500, this.closeBubble, this)
    this.time.events.add(43500, this.openBubble, this, 7)
    this.time.events.add(48500, this.closeBubble, this)
  }

  // Spiel-Schleife
  loop() {
    if (this.bubble.frame === 7 && this.player.x > 1000) {
      // letztes frame wurde angezeigt, Spieler kann löschen
      this.goToNextLevel()
    }
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
