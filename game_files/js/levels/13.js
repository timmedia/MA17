/* Klasse Level 13 */
class Level13 extends GameState {
  build() {
    this.setup(
      'Level13 Map',        // Karte
      2600, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Cutscene03',         // nächstes Level
      'Level13 Foreground', // Vordergrund-Bild
      'Level13 Midground',  // Mittelgrund-Bild
      'Level13 Background', // Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Michael, gleich wie im Tutorial, nur gespiegelt
    this.michael = new StaticGameObject(this, 1700, 430, 'Tutorial Michael')
    this.michael.animations.add('idle', [0, 1, 2, 3], 4, true)
    this.michael.animations.play('idle')
    this.michael.scale.x = -1

    // Sprechblasen (auf 0 skaliert), Hitbox von Michael wird verschoben
    this.michael.body.setSize(20, 480, 180, -300)
    this.bubble = this.add.sprite(1655, 295, 'Level13 Speechbubbles')
    this.bubble.anchor.setTo(0, 1)
    this.bubble.scale.setTo(0, 0)
    this.bubble.activated = false

    // Spieler wird hinzugefügt
    this.player = new Player(this, 250, 300, 'Player 01', 300, -600, true)
  }

  // Funktion um Michael sprechen zu lassen
  startTalking() {
    this.player.body.moves = false
    this.time.events.add(1000, this.openBubble, this, 0)
    this.time.events.add(5000, this.closeBubble, this)
    this.time.events.add(5500, this.openBubble, this, 1)
    this.time.events.add(10500, this.closeBubble, this)
    this.time.events.add(12000, this.openBubble, this, 2)
    this.time.events.add(18000, this.closeBubble, this)
    this.time.events.add(19000, this.openBubble, this, 3)
    this.time.events.add(24500, this.closeBubble, this)
    this.time.events.add(25500, this.openBubble, this, 4)
    this.time.events.add(30000, this.closeBubble, this)
    this.time.events.add(31000, this.openBubble, this, 5)
    this.time.events.add(35500, this.closeBubble, this)
    this.time.events.add(36500, this.openBubble, this, 6)
    this.time.events.add(41000, this.goToNextLevel, this)
  }

  // Spiel-Schleife
  loop() {
    // Kollision Michael und Spieler
    this.physics.arcade.overlap(this.player, this.michael, () => {
      if (!this.bubble.activated) this.startTalking()
    })
  }

  render () {
    game.debug.body(this.michael)
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
