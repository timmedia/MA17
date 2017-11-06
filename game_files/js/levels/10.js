/* Klasse Level 10 */
class Level10 extends GameState {
  build() {
    this.setup(
      'Level10 Map',        // Karte
      1900, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Level01',            // nächstes Level
      'Debug empty10x10',   // leeres Vordergrund-Bild
      'Level10 Midground',  // Mittelgrund-Bild
      'Level10 Background', // Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Grafik für geöffnete Türe, zuerst nicht zu sehen
    this.door = new StaticGameObject(this, 1716, 420, 'Level10 Door')
    this.door.alpha = 0

    // Spieler wird hinzugefügt
    this.player = new Player(this, 225, 300, 'Player 01', 300, -600, true)

    // Sprechblasen an erstellen, Frame setzen (letztes Argument)
    let bubble1 = new BasicGameObject(
      this, 485, 310, 'Level10 Speechbubbles', null, 3
    )

    let bubble2 = new BasicGameObject(
      this, 700, 350, 'Level10 Speechbubbles', null, 1
    )

    let bubble3 = new BasicGameObject(
      this, 785, 340, 'Level10 Speechbubbles', null, 2
    )

    let bubble4 = new BasicGameObject(
      this, 920, 320, 'Level10 Speechbubbles', null, 0
    )

    // Ankerpunkt unten rechts, auf 0 skaliert, minimized = true für später
    this.bubbles = [bubble1, bubble2, bubble3, bubble4]
    this.bubbles.forEach(bubble => {
      bubble.anchor.setTo(1, 1)
      bubble.scale.setTo(0, 0)
      bubble.minimized = true
    })
  }

  // Funktion um Sprechblase zu öffnen
  openBubble(bubble) {
    bubble.minimized = false // nicht mehr minimiert
    this.add.tween(bubble.scale)
      .to({x: 1, y: 1}, 500, Phaser.Easing.Cubic.Out, true)
  }

  // Spiel-Schleife
  loop() {
    // Je nach Position soll entsprechende Sprechblase geöffnet werden
    if (this.bubbles[0].minimized && this.player.position.x > 350) {
      this.openBubble(this.bubbles[0])
    } else if (this.bubbles[1].minimized && this.player.position.x > 600) {
      this.openBubble(this.bubbles[1])
    } else if (this.bubbles[2].minimized && this.player.position.x > 700) {
      this.openBubble(this.bubbles[2])
    } else if (this.bubbles[3].minimized && this.player.position.x > 800) {
      this.openBubble(this.bubbles[3])
    } else {
      this.physics.arcade.overlap(this.door, this.player, door => {
        if (door.alpha === 0) {
          this.add.tween(door).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true)
        } else if (door.alpha === 1) {
          this.goToNextLevel()
        }
      })
    }
  }
}
