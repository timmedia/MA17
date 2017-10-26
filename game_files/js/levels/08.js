/* Klasse Level 08 */
class Level08 extends GameState {
  build() {
    // Initialisierung der Ebene
    this.setup(
      'Level08 Map',        // Karte
      3720, 480,            // Kartengrösse
      1300,                 // Gravitation
      'Cutscene02',         // nächstes Level
      'Level08 Foreground', // Vordergrund-Bild
      'Level08 Midground',  // Mittelgrund-Bild
      'Level08 Background'  // Hintergrund-Bild
    )

    // Spielerobjekt
    this.player = new Player(this, 400, 405, 'Player 01', 250, -600, true)

    // Gegner ab statisches Objekt, mit Animation
    this.enemy = new StaticGameObject(this, 3500, 450, 'Level08 17')
    this.enemy.animations.add('idle', [24, 25, 26, 27], 5, true)
    this.enemy.animations.play('idle')
    // Hitbox so hoch wie Welt, nach links verschoben
    this.enemy.body.setSize(50, 480, -300, -380)
    this.enemy.activated = false // Wurde noch nicht aktiviert (siehe später)

    // Sprechblase, Ankerpunk unten rechts, anfangs Grösse 0
    this.speechbubble = this.add.sprite(3505, 390, 'Level08 Speechbubbles')
    this.speechbubble.anchor.setTo(1, 1)
    this.speechbubble.scale.setTo(0, 0)
  }

  // Spiel-Schleife
  loop() {
    // Kollision Spieler und Gegner, um Sprechblase zu aktivieren
    this.physics.arcade.overlap(
      this.player,
      this.enemy,
      (player, enemy) => {
        // Sprechblase wird aktiviert
        enemy.activated = true // soll nur 1x passieren
        this.time.events.add(200, () => {
          player.body.moves = false      // Spieler kann sich nicht mehr bewegen
          player.scale.x = 1             // Spieler schaut in Richtung Gegner
          player.update = () => {}       // Spieler Update-Schleife deaktiviert
          player.animations.play('idle') // Stillstands-Animation
          this.enemyTalk()               // Gegner soll anfangen zu sprechen
        })
      },
      (player, enemy) => {
        // Sprechblase soll nur 1x aktiviert werden
        return !enemy.activated
      }
    )
  }

  // Funktion um Sprechblase zu öffnen
  openBubble(context, frame, duration) {
    // Frame (Argument) ab Spritesheet mit allen Sprechblasen
    context.speechbubble.frame = frame
    // Sprechblase vergrösser sich während 300ms
    context.add.tween(context.speechbubble.scale)
      .to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.Out, true)
    // Sprechblase soll nachher wieder verkleinert werden
    context.time.events.add(duration, context.closeBubble, context, context)
  }

  // Funktion um Sprechblase zu schliessen
  closeBubble(context) {
    // Sprechblase wird während 300ms auf 0 skaliert
    context.add.tween(context.speechbubble.scale)
      .to({x: 0, y: 0}, 300, Phaser.Easing.Quadratic.Out, true)
  }

  // Sprechblasen nacheinander anzeigen
  enemyTalk() {
    // erste Sprechblase öffnen
    this.openBubble(this, 0, 1800)
    // restliche Sprechblasen nacheinander öffnen
    this.time.events.add(2500, this.openBubble, this, this, 1, 3400)
    this.time.events.add(6400, this.openBubble, this, this, 2, 3900)
    this.time.events.add(13000, this.openBubble, this, this, 3, 3900)
    this.time.events.add(18000, this.openBubble, this, this, 4, 4100)
    this.time.events.add(23000, this.openBubble, this, this, 5, 3600)
    this.time.events.add(27000, this.openBubble, this, this, 6, 2500)
    // nach 30s zur Cutscene gehen
    this.time.events.add(30000, this.goToNextLevel, this)
    // setTimeout(() => {
    //   this.goToNextLevel()
    // }, 30000)
  }
}
