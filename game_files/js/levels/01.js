/* Klasse Level 01 */
class Level01 extends GameState {
  build() {
    this.setup(
      'Level01 Map',        // Karte
      1200, 480,            // Kartengrösse (x, y)
      2000,                 // Gravitation
      'Level02',            // nächstes Level
      'Level01 Foreground', // Vordergrund-Bild
      'Level01 Midground',  // Mittelgrund-Bild
      'Level01 Background', // Hintergrund-Bild
      'green'               // Akzentfarbe
    )

    // Musik
    game.switchMusic('Lab', 1)

    // Hinzufügen Wasserfall mit Animationen
    this.waterfall = new StaticGameObject(this, 400, 270, 'Level01 Waterfall')
    this.waterfall.animations.add('down', [0, 1, 2, 3], 10, true)
    this.waterfall.animations.add('transition', [4, 5, 6, 7], 10, false)
    this.waterfall.animations.add('up', [8, 9, 10, 11], 10, true)
    this.waterfall.animations.play('down')
    this.waterfall.alpha = 0.9                   // Semitransparenz
    this.waterfall.body.setSize(100, 240, 50, 0) // Hitbox kleiner als Grafik
    this.damagePlayerList.push(this.waterfall)   // schadet Spieler

    // Brücke wird hinzugefügt, Hitbox vergrössert
    this.bridge = new StaticGameObject(this, 420, 150, 'Level01 Bridge')
    this.bridge.body.setSize(20, 150, 0, 0)
    this.bridge.angle = 0
    this.bridge.down = false                 // Brücke unten? (für später)
    this.collidePlayerList.push(this.bridge) // kollidiert mit Spieler

    // Wasserplatschen mit Animation, erst sichtbar wenn Brücke unten
    this.splash = this.add.sprite(405, 100, 'Level01 Splash')
    this.splash.animations.add('default', [0, 1, 2, 3], 10, true)
    this.splash.visible = false

    // Knopf um Position der Brücke zu verändern
    this.button = new Button(
      this, 350, 150, 'General Button', 0, this.bridgeSwitch
    )

    // Spieler
    this.player = new Player(this, 100, 300, 'Player 01', 250, -800, true, true)

    // Wasser mit Animation am unteren Bildrand, als lokale Variable da später
    // nicht mehr angesprochen
    var water = this.add.sprite(0, 480, 'Level01 Water')
    water.anchor.setTo(0, 1) // Ankerpunk unten links, einfachere Positionierung
    water.animations.add('default', [0, 1, 2, 3, 4, 5], 5, true)
    water.animations.play('default')
  }

  // Auf- und Herunterklappen der Brücke
  bridgeSwitch() {
    if (this.bridge.down) {
      // Brücke ist unten, soll nach oben
      // Übergang von 90° zu 0° gekippt
      this.add.tween(this.bridge)
        .to({angle: 0}, 500, Phaser.Easing.Cubic.Out, true)
      this.splash.animations.stop() // Animation vom Platschen wird gestoppt
      this.splash.visible = false   // Wasserplatschen nicht mehr sichtbar
      this.waterfall.animations.play('down')       // Andere Animation
      this.waterfall.body.setSize(100, 240, 50, 0) // Hitbox angepasst
      this.bridge.body.setSize(20, 150, 0, 0)      // Hitbox der Brücke anpassen
      this.bridge.down = false                     // Brücke ist nun oben
    } else {
      // Brücke ist oben, soll nach unten
      // Winkel während 500ms von 0° zu 90°
      this.add.tween(this.bridge)
        .to({angle: 90}, 500, Phaser.Easing.Cubic.Out, true)
         // Nachdem Brücke gekippt wurde, soll das Platschen-Sprite wieder
         // erscheinen und deren Animation abgespielt werden
      this.time.events.add(500, () => {
        this.splash.animations.play('default')
        this.splash.visible = true
      })
      // Übergangsanimation des Wasserfalls (von oben nach unten)
      this.waterfall.animations.play('transition')
      // Hauptanimation nach Übergangsanimation
      this.waterfall.animations.currentAnim.onComplete.add(() => {
        this.waterfall.animations.play('up')
      })
      this.waterfall.body.setSize(100, 100, 50, 0) // Hitbox angepasst
      this.bridge.body.setSize(150, 20, 0, 150)    // Hitbox der brücke angepasst
      this.bridge.down = true                      // Brücke ist nun unten
    }
  }
}
