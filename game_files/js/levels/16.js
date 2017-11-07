/* Klasse Level 16 */
class Level16 extends GameState {
  build() {
    this.setup(
      'Level15 Map',        // Karte
      4000, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Level03',            // nächstes Level
      'Level15 Foreground', // Vordergrund-Bild
      'Level15 Midground',  // Mittelgrund-Bild
      'Level15 Background', // Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Gabbie, mit Animationen
    this.gabbie = new StaticGameObject(this, 2515, 451, 'Level15 Gabbie')
    this.gabbie.animations.add('attack', [14, 15, 16, 17, 18, 19, 20], 4, true)
    this.gabbie.animations.play('attack')

    // Spieler wird hinzugefügt
    this.player = new Player(this, 2800, 250, 'Player 01', 200, -600, true)

    // Musiknoten, schaden Spieler
    this.notes = this.add.group()
    this.notes.enableBody = true
    this.notes.createMultiple(20, 'Level15 Notes')
    this.notes.forEach(note => note.animations.add('f', [0, 1, 2, 3], 4, true))

    // keine Gravitation, sollen beim Verschwinden sterben
    this.notes.setAll('body.allowGravity', false)
    this.notes.setAll('checkWorldBounds', true)
    this.notes.callAll(
      'events.onOutOfBounds.add', 'events.onOutOfBounds', obj => obj.kill()
    )

    // Schiess-Funktion
    this.gabbie.shoot = () => {
      var note = this.notes.getFirstExists(false)
      if (note) {
        note.animations.play('f')
        // Noten hinter Spieler generieren
        let rand = Math.random()
        note.reset(this.player.position.x - 450, rand * 100 + 280)
        note.body.velocity.x = 500 * Math.random() + 400
      }
    }

    // Noten werden in einem Interval generiert
    this.interval = setInterval(this.gabbie.shoot, 500)

  }

  // Spiel-Schleife
  loop() {
    // Spieler darf Noten nicht berührend
    this.physics.arcade.collide(this.player, this.notes, (player, note) => {
      player.damage.call(this, player, 1)
      note.kill()
    } )

    // Ende der Karte Erreicht?
    if (this.player.position.x > 3900) {
      this.goToNextLevel()
    }
  }
}
