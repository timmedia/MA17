/* Klasse Level 18 */
class Level18 extends GameState {
  build() {
    this.setup(
      'Level17 Map',        // Karte
      3200, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Menu',         // nächstes Level
      null, null,
      'Level17 Background', // nur Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Gus, mit Animation
    this.gus = new DynamicGameObject(this, 640, 260, 'Level17 Gus')
    this.gus.animations.add('running', [0, 1, 2, 3], 5, true)
    this.gus.animations.play('running')

    // Sprechblasen
    this.bubble = this.add.sprite(400, 200, 'Level17 Speechbubbles')
    this.bubble.scale.setTo(0, 0)

    // Spieler wird hinzugefügt
    this.player = new Player(this, 900, 415, 'Player 01', 230, -600, true)
    this.player.body.moves = false

    this.time.events.add(0, this.openBubble, this, 8)
    this.time.events.add(3000, this.closeBubble, this)
    this.time.events.add(4000, this.openBubble, this, 9)
    this.time.events.add(7000, () => {
      this.player.body.moves = true
      this.camera.shake()
      this.gus.body.velocity.x = 100
      this.gus.body.acceleration.x = 20
      this.gus.body.maxVelocity.x = this.player.body.maxVelocity.x -20
    })
  }

  // Spiel-Schleife
  loop() {
    if (this.player.position.x > 3000) this.goToNextLevel()
    this.physics.arcade.collide(this.layer, this.gus)
    this.physics.arcade.overlap(
      this.player, this.gus, () => this.player.damage.call(this, this.player, 1)
    )
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
