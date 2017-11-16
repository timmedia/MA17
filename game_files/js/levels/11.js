/* Klasse Level 11 */
class Level11 extends GameState {
  build() {
    this.setup(
      'Level11 Map',        // Karte
      800, 480,             // Kartengrösse
      1300,                 // Gravitation
      'Cutscene01',         // nächstes Level
      null, null,           // Keine Mittel-/Vordergrundbilder
      'Level11 Background', // Hintergrund-Bild
      'blue_white'          // Akzentfarbe
    )

    // Spieler wird hinzugefügt
    this.player = new Player(this, 150, 415, 'Player 01', 300, -600)
    this.player.body.moves = false

    // Sprechblase, Ankerpunkt unten rechts, auf 0 skaliert
    this.bubble = this.add.sprite(640, 330, 'Level11 Speechbubbles')
    this.bubble.anchor.setTo(1, 1)
    this.bubble.scale.setTo(0, 0)

    // Anzeigedauer & Abstand zwischen den Einzelnen Sprechblasen
    let durations = [2900, 3900, 3200, 3300, 3400, 4200, 3700]
    let delays = [2000, 1200, 1300, 800, 1200, 1100, 700]
    let totalDelay = 0

    // Jedes Bild soll zur richtigen Zeit angezeigt werden und verschwinden
    for (let i in durations) {
      totalDelay += delays[i]
      this.time.events.add(totalDelay, this.openBubble, this, i)
      this.time.events.add(totalDelay + durations[i], this.closeBubble, this)
      totalDelay += durations[i]
    }

    // Nach allen Sprechblasen soll der nächste State gestartet werden
    this.time.events.add(totalDelay + 200, this.goToNextLevel, this)
  }

  // Funktion um Sprechblase zu öffnen
  openBubble(n) {
    this.bubble.frame = parseInt(n)
    this.add.tween(this.bubble.scale)
      .to({x: 1, y: 1}, 500, Phaser.Easing.Cubic.Out, true)
  }

  closeBubble() {
    this.add.tween(this.bubble.scale)
      .to({x: 0, y: 0}, 300, Phaser.Easing.Cubic.Out, true)
  }
}
