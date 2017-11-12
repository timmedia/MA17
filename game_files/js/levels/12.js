/* Klasse Level 12 */
class Level12 extends GameState {
  build() {
    this.setup(
      'Level12 Map',        // Karte
      800, 480,             // Kartengrösse
      1300,                 // Gravitation
      'Level05',            // nächstes Level
      null, null,           // Keine Mittel-/Vordergrundbilder
      'Level12 Background', // Hintergrund-Bild
      'pink'                // Akzentfarbe
    )

    // Baum rechts im Bild, Overlays für Schaden, zuerst nicht zu sehen
    this.tree = this.add.sprite(0, 0, 'Level12 Tree')
    this.tree.overlay1 = this.add.sprite(0, 0, 'Level12 Tree', 1)
    this.tree.overlay1.alpha = 0
    this.tree.overlay2 = this.add.sprite(0, 0, 'Level12 Tree', 2)
    this.tree.overlay2.alpha = 0
    this.tree.overlay3 = this.add.sprite(0, 0, 'Level12 Tree', 3)
    this.tree.overlay3.alpha = 0

    // Hitbox Baumstamm (leere Grafik)
    this.tree.trunk = new StaticGameObject(this, 0, 0)
    this.tree.trunk.body.setSize(70, 480, 730, 30)

    // Feuer-Grafiken, falls Baum getroffen wird
    this.tree.fire = this.add.group()
    this.tree.fire.createMultiple(40, 'Level12 Fire')
    this.tree.fire.forEach(
      element => element.animations.add('burning', [0, 1, 2], 5, true)
    )

    // Schaden des Baumes
    this.tree.damage = 0

    // Urielle
    this.urielle = new StaticGameObject(this, 500, 450, 'Level12 Urielle')
    this.urielle.defeated = false
    this.urielle.animations.add('idle', [2, 3, 0, 1], 4, true)
    this.urielle.animations.add('end', [4], 1, true)
    this.urielle.animations.add('attack down', [9, 8, 7, 6], 10, false)
    this.urielle.animations.add('attack up', [6, 7, 8, 9], 10, false)
    this.urielle.animations.add('hostile', [10, 11], 5, true)
    this.urielle.animations.add('none', [5], 1, true)
    this.urielle.animations.play('idle')

    // Pfeile für Attacke
    this.urielle.arrows = this.add.group()
    this.urielle.arrows.enableBody = true
    this.urielle.arrows.createMultiple(20, 'Level12 Arrow')
    // Winkel (um 90° gedreht)
    this.urielle.arrows.setAll('angle', - 90)
    // Beim verlassen des Spielfeldes unten wird der Pfeil gelöscht
    this.urielle.arrows.setAll('checkWorldBounds', true)
    this.urielle.arrows.callAll(
      'events.onOutOfBounds.add',
      'events.onOutOfBounds',
      (arrow) => {if (arrow.y > 480) arrow.kill()}
    )

    this.urielle.shoot = () => {
      var arrow = this.urielle.arrows.getFirstExists(false)
      if (arrow) {
        var rand1 = Math.random()
        var rand2 = Math.random()
        arrow.body.velocity.y = - 200 * rand1 - 100
        var x = 800 * rand1
        arrow.reset(x, - 500 * rand2)
      }
    }

    // Urielle Attacke
    this.urielle.attack = (duration) => {
      if (!this.urielle.defeated) {
        // Stab wird nach oben gehoben, bleibt dort
        this.urielle.animations.play('attack up')
        this.urielle.animations.currentAnim.onComplete.add(() => {
          this.urielle.animations.play('hostile')
        })

        // Nach einer vorgegebenen Zeit beginnt die Attacke
        this.time.events.add(duration, () => {
          // Animation Stab nach unten, Kamera bewegt scih
          this.camera.shake(0.01, 200, null)
          this.urielle.animations.play('attack down')

          // Pfeile kommen von oben her
          for (let i = 0; i < 10; i++) {
            this.urielle.shoot()
          }

          this.urielle.animations.currentAnim.onComplete.add(() => {
            // Zurück zur normalen Animation
            this.urielle.animations.play('idle')
          })
        })

        // Nächste Attacke, Pause hängt vom Schaden ab
        var delay = 9000 - this.tree.damage * 100
        this.time.events.add(delay, this.urielle.attack, this, 500)
      }
    }

    // Spieler wird hinzugefügt, kann schiessen
    this.player = new Player(
      this, 150, 300, 'Player 01', 300, -600, false, false, true
    )

    // Erste Attacke
    this.time.events.add(1500, this.urielle.attack, this, 500)

    // Jede Sekunde fällt ein Pfeil vom Himmel
    this.arrowInterval = setInterval(this.urielle.shoot, 1000)
  }

  // Feuer erstellen
  createFire(x, y) {
    // Element aus Gruppe geholt
    var element = this.tree.fire.getFirstExists(false)
    if (element) {
      // Position vom Feuer nahe bei der Kugel, y-Achse leicht zufällig
      var rand = Math.random()
      element.reset(x, y - 100 + rand * 100)
      element.animations.play('burning') // Brenn-Animation abspielen
      this.tree.damage += 1 // Schaden erhöht sich

      // Nach einger Zeit verschwindet Feuer
      let delay = rand * 200000
      this.time.events.add(delay + 2000, element.kill, this)
      this.time.events.add(delay, () => {
        this.tree.damage -= 0.5 // Schaden verkleinert sich
        this.add.tween(element)
          .to({alpha: 0}, 2000, Phaser.Easing.Cubic.Out, true)
      })
    }
  }

  // Spiel-Schleife
  loop() {
    // Kollision Pfeile mit Spieler
    this.physics.arcade.overlap(
      this.urielle.arrows, this.player, (player, arrow) => {
        // Spieler nimmt Schaden, Pfeil verschwindet
        player.damage.call(this, player, 1)
        arrow.kill()
      }
    )

    // Kollision Feuerkugel und Baumstamm
    this.physics.arcade.overlap(
      this.player.bullets, this.tree.trunk, (trunk, bullet) => {
        // Baum soll nicht bei jedem Schuss anfangen zu brennen
        var rand1 = Math.random()
        if (rand1 > 0.87) {
          // Feuer am Ort der Kugel
          this.createFire(bullet.x, bullet.y)
          bullet.kill()
        } else if (rand1 < 0.08) {
          // Feuer in den Blättern (etwas verzögert)
          let rand2 = Math.random()
          this.time.events.add(
            1200, this.createFire, this, 800 - rand2 * 400, 200 * rand1 + 100
          )
          bullet.kill()
        }
        // Je nachdem wieviel Schaden der Baum hat, wird eine andere Grafik an-
        // gezeigt
        if (this.tree.damage > 15) {
          if (this.tree.overlay1.alpha === 0) {
            // erste Schadensgrafik kommt langsam zum Vorschein
            this.add.tween(this.tree.overlay1)
              .to({alpha: 1}, 2500, Phaser.Easing.Cubic.Out, true)
          } else if (this.tree.damage > 25) {
            // zweite Schadensgrafik
            if (this.tree.overlay2.alpha === 0) {
              this.add.tween(this.tree.overlay2)
                .to({alpha: 1}, 2500, Phaser.Easing.Cubic.Out, true)
            } else if (this.tree.damage > 35) {
              if (this.tree.overlay3.alpha === 0) {
                // dritte Schadensgrafik
                this.add.tween(this.tree.overlay3)
                  .to({alpha: 1}, 2500, Phaser.Easing.Cubic.Out, true)
              } else if (this.tree.overlay3.alpha === 1) {
                // Level fertig, Gegner besiegt
                this.endScene.call(this)
              }
            }
          }
        }
      }
    )
  }

  // Endszene
  endScene() {
    // Schüsse werden gestoppt, Spieler kann sich nicht bewegen
    clearInterval(this.arrowInterval)
    this.urielle.defeated = true
    this.player.body.moves = false
    // Endanimation: Zuerst flackert Urielle, dann verschwindet sie
    this.urielle.animations.play('end')
    this.time.events.add(1000, () => this.urielle.animations.play('none'))
    this.time.events.add(2000, () => this.urielle.animations.play('end'))
    this.time.events.add(3000, () => this.urielle.animations.play('none'))
    this.time.events.add(4000, () => this.urielle.animations.play('end'))
    this.time.events.add(5000, () => this.urielle.animations.play('none'))
    this.time.events.add(6000, () => this.urielle.animations.play('end'))
    this.time.events.add(7000, () => {
      this.add.tween(this.urielle)
        .to({alpha: 0}, 500, Phaser.Easing.Cubic.Out, true)
    })

    // Nach dem Verschwinden rüttelt die Kamera sich, es geht zum nächsten Level
    this.time.events.add(8000, () => this.camera.shake(0.05, 200), this)
    this.time.events.add(9000, () => this.goToNextLevel())
  }
}
