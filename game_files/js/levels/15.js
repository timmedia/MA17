/* Klasse Level 15 */
class Level15 extends GameState {
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

    // Michael
    this.michael = new StaticGameObject(this, 1650, 430, 'Level14 Michael')
    this.michael.anchor.setTo(0.5, 1)

    // Spieler wird hinzugefügt
    this.player = new Player(this, 1500, 300, 'Player 01', 300, -600, true)
  }

  // Spiel-Schleife
  loop() {
    // Falls Spieler Türe erreicht, soll des nächste Level beginnen
    if (this.player.position.x > 2200) {
      this.goToNextLevel()
    } else {
      // Michael soll Spieler hinterherschauen
      if (this.michael.position.x > this.player.position.x) {
        this.michael.scale.x = 1
      } else {
        this.michael.scale.x = -1
      }
    }
  }
}
