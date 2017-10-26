/* Klasse Level 02 */
class Level02 extends GameState {
  build() {
    this.setup(
      'Level02 Map',       // Karte
      800, 480,            // Grösse der Karte (x, y)
      1300,                // Gravitation
      'Level03',           // nächstes Level
      null,                // kein Vordergrund-Bild
      'Level02 Midground', // Mittelgrund-Bild
      'Level02 Background' // Hintergrund-Bild
    )

    // Schlüssel um Türe zu öffnen (this.collectKey ist Callback-Funktion)
    this.key = new Key(this, 390, 400, 'General Key', 0, true, this.collectKey)

    // Wasserfall mit Animationen für nach unten (default), nach oben, Übergänge
    this.water = new StaticGameObject(this, 344, 460, 'Level02 Waterfall')
    this.water.animations.add('down', [0, 1, 2, 3], 10, true)
    this.water.animations.add('go_up', [4, 5, 6, 7], 10, false)
    this.water.animations.add('go_down', [12, 13, 14, 15], 10, false)
    this.water.animations.add('up', [8, 9, 10, 11], 10, true)
    this.water.animations.play('down')
    this.water.direction = 'down'             // Richtung: nach unten (später)
    this.water.body.setSize(35, 150, 44, 173) // Hitbox verkleinert
    this.damagePlayerList.push(this.water)    // schadet Spieler

    // Knöpfe um Richtung der Gravitation zu ändern
    this.button1 = new Button(this, 80, 400, 'General Button', 90, this.switchGravity)
    this.button2 = new Button(this, 720, 120, 'General Button', -90, this.switchGravity)

    // Spielerobjekt
    this.player = new Player(this, 200, 300, 'Player 01', 250, -600)
  }

  // Funktion um Richtung des Wassers zu ändern
  switchWater() {
    if (this.water.direction === 'down') {
      // Wasser flisst nach unten, soll nach oben fliessen
      this.water.direction = 'up'
      // Übergangsanimation, danach Animation für nach oben
      this.water.animations.play('go_up')
      this.water.animations.currentAnim.onComplete.add(() => {
        this.water.animations.play('up')
      })
      this.water.body.setSize(35, 150, 44, 0) // Hitbox angepasst
    } else {
      // Wasser flisst, nach oben, soll nach unten fliessen
      this.water.direction = 'down'
      // Übergangsanimation, danach Animation für nach unten
      this.water.animations.play('go_down')
      this.water.animations.currentAnim.onComplete.add(() => {
        this.water.animations.play('down')
      })
      this.water.body.setSize(35, 150, 44, 173) // Hitbox angepasst
    }
  }

  // Funktion um Richtung der Gravitation zu ändern
  switchGravity() {
    this.physics.arcade.gravity.y *= - 1 // Phaser Physik: Richtungsänderung
    this.player.jumpSpeed *= - 1         // Spieler Sprungkraft umkehren
    this.switchWater()                   // Wasserfall-Richuntungsänderung
    // Winkel des Spielers anpassen, soll nicht unnötig über 360° sein, wird
    // während 500ms verändert (quasi Rotationsanimation)
    let ang = (this.player.angle + 180) % 360
    this.add.tween(this.player)
      .to({angle: ang}, 500, Phaser.Easing.Cubic.Out, true)
  }

  // Schlüssel wird eingesammelt
  collectKey() {
    this.door.unlock() // Türe wird geöffnet
    this.key.destroy() // Schlüssel verschwindet
  }
}
