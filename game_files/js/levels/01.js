/* Klasse Level 01 */
class Level01 extends GameState {
  build() {
    this.setup(
      'Level01 Map',
      1200, 480,
      2000,
      50,
      'Level02',
      'Level01 Foreground',
      'Level01 Midground',
      'Level01 Background'
    )
      /* WASSERFALL */
    this.waterfall = new StaticGameObject(this, 400, 270, 'Level01 Waterfall')  // Hinzugeben des Wasserfall-Bildes
    this.waterfall.animations.add('down', [0, 1, 2, 3], 10, true)               // Animation: Wasser fliess nach unten
    this.waterfall.animations.add('transition', [4, 5, 6, 7], 10, false)        // Animation: Überganges
    this.waterfall.animations.add('up', [8, 9, 10, 11], 10, true)               // Animation: Wasser fliess nach oben
    this.waterfall.animations.play('down')                                      // erste Animation soll starten
    this.waterfall.alpha = 0.9                                                  // Transparenz
    this.waterfall.body.setSize(100, 240, 50, 0)                                // Hitbox wird angepasst (kleiner als Grafik)
    this.damagePlayerList.push(this.waterfall)                                  // Wasserfall soll bei Kolision Spieler schaden

    /* BRÜCKE */
    this.bridge = new StaticGameObject(this, 420, 150, 'Level01 Bridge')        // Brücke wird ab Grafik hinzugefügt
    this.bridge.body.setSize(20, 150, 0, 0)                                     // Hitbox wird angepasst (vergrössert)
    this.bridge.down = false                                                    // Boolean: Brücke unten? (für später)
    this.collidePlayerList.push(this.bridge)                                    // Brücke soll mit Spieler kollidieren

    /* WASSERSPRITZEN */
    this.splash = this.add.sprite(405, 100, 'Level01 Splash')                   // Spritzen des Wasser wird hinzugefügt
    this.splash.animations.add('default', [0, 1, 2, 3], 10, true)               // Animation der Sprite
    this.splash.visible = false                                                 // soll zu Beginn nicht angezeigt werden

    /* KNOPF UM BRÜCKE ZU BEWEGEN */
    this.button = new Button(this, 350, 150, 'General Button', 0, this.bridgeSwitch)

    /* SPIELER */
    this.player = new Player(this, 100, 300, 'Player 01', 250, -800, true, true)            // Sprite des Spielers

    /* WASSER AM UNTEREN BILDRAND */
    var water = this.add.sprite(0, 480, 'Level01 Water')                        // Wasser als Variable da sie später nicht
    water.anchor.setTo(0, 1)                                                    //   mehr angesprochen wird, Fixpunkt unten
    water.animations.add('default', [0, 1, 2, 3, 4, 5], 5, true)                //   links, Animation der Sprite hinzugefügt
    water.animations.play('default')                                            // Animation wird abgespielt
  }

  /* AUF- & HERUNTERKLAPPEN DER BRÜCKE */
  bridgeSwitch() {
    if (this.bridge.down) {                                                     // Wenn Brücke unten ist, soll sie nach oben
      this.add.tween(this.bridge).to({angle: 0}, 500, Phaser.Easing.Cubic.Out, true) // Übergang von 90° zu 0° gekippt
      this.splash.animations.stop()                                             // Animation vom Wasserspritzen soll gestopt
      this.splash.visible = false                                               //   werden und Sprite nicht sichtbar sein
      this.waterfall.animations.play('down')                                    // Andere Wasserfall-Animation
      this.waterfall.body.setSize(100, 240, 50, 0)                             // Hitbox des Wasserfalls wird verändert
      this.bridge.body.setSize(20, 150, 0, 0)                                 // Hitbox der Brücke wird angepasst
      this.bridge.down = false                                                  // Brücke ist nun oben
    } else {                                                                    // Falls sie oben ist, soll sie nach unten
      this.add.tween(this.bridge).to({angle: 90}, 500, Phaser.Easing.Cubic.Out, true) // Winkel von 0° zu 90°
      this.time.events.add(500, () => {                                         // Nachdem sie gekippt wurde, soll das Spritzen
        this.splash.animations.play('default')                                  //   des Wasser erscheinen und die Animation
        this.splash.visible = true                                              //   gespielt werden
      })
      this.waterfall.animations.play('transition')                              // Übergangsanimation des Wasserfalls
      this.waterfall.animations.currentAnim.onComplete.add(() => {              // Nachdem die Übergangsanimation abgespielt
        this.waterfall.animations.play('up')                                    //   wurde soll die finale Animation gespielt
      })                                                                        //   werden
      this.waterfall.body.setSize(100, 100, 50, 0)                              // Hitbox des Wassfalls
      this.bridge.body.setSize(150, 20, 0, 150)                                // Hitbox der brücke angepasst
      this.bridge.down = true                                                   // Brücke ist nun unten
    }
  }
}
