/* Klasse Level 03 */
class Level03 extends GameState {
  build() {
    this.setup(
      'Level03 Map',        // Karte
      800, 2000,            // Kartengrösse
      1300,                 // Gravitation
      'Level05',            // nächstes Level
      'Level03 Foreground', // Vordergrund-Bild
      'Level03 Midground',  // Mittelgrund-Bild
      'Level03 Background'  // Hintergrund-Bild
    )

    // Spieler wird hinzugefügt, Kamera soll ihn folgen (letztes Argument true)
    this.player = new Player(this, 225, 1850, 'Player 01', 300, -600, true)
    // Spieler soll beim Verlassen des unteren Weltrandes sterben
    // jedoch zum nächsten Level gehen beim Verlassen oben
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) {
        this.killPlayer() // Spieler ist unten, wird getötet
      } else {
        // Keine Gravitation mehr, Spieler bleibt oben (nicht sichtbar)
        this.player.body.allowGravity = false
        this.goToNextLevel() // nächstes Level wird gestartet
      }
    })

    // Wasseroberfläche als dynamisches Objekt mit Animation
    this.water = new DynamicGameObject(this, 120, 2100, 'Level03 Waves')
    this.water.animations.add('flowing', [0, 1, 2, 3, 4], 5, true)
    this.water.animations.play('flowing')

    // Wasser unterhalb Oberfäche, nicht animiert, als child von Oberflächen-
    // Bild damit Bewgung gleich ist
    this.water.addChild(new BasicGameObject(this, 0, 431, 'Level03 Water'))
    this.water.body.allowGravity = false     // keine Schwerkraft
    this.water.body.velocity.y = - 40        // konstante Bewegung nach oben
    this.water.body.setSize(560, 100, 0, 50) // Hitbox verkleinert
  }
  loop() {
    // Kollision zwischen Wasser und Spieler überprüfen
    this.physics.arcade.overlap(
      this.player, this.water, this.player.damage, null, this
    )
  }
}
