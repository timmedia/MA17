/*
Beschreibung einiger Funktionen mit vielleicht weniger offensichtlichen Argumenten:
(Kann auch unter http://phaserchains.boniatillo.com/ nachgeschlagen werden.)

Hinzufügen einer Grafik: this.add.sprite(arg1, arg2, arg3)
arg1: X-Koordinate der Grafik
arg2: Y-Koordinate der Grafik
arg3: Name der Grafik (key mit der sie in preload.js definiert wurde)

Festpunkt der Grafik 'BeispielGrafik': this.BeispielGrafik.anchor.setTo(arg1, arg3)
(Dieser Punkt der Grafik wird an den oben bestimmten Koordinaten gesetzt, default (0, 0).)
arg1: X-Koordinate (% vom Sprite)
arg2: Y-Koordinate (% vom Sprite)
Bsp: mitte (0.5, 0.5); oben links (0, 0); unten rechts (1, 1)

Grösse der Welt limitieren: this.world.setBounds(arg1, arg2, arg3, arg4)
arg1: X offset (Pixel)
arg2: Y offset (Pixel)
arg3: Grösse X-Richtung (Pixel)
arg4: Grösse Y-Richtung (Pixel)

Tilemap-Grafik von 'BeispielMap': this.BeispielMap.addTilesetImage(arg1, arg2)
(Grafik der Blöcke, es muss eine gesetzt werden)
arg1: Name der in 'Tiled' verwendeten Grafik (steht in der Karten-JSON)
arg2: Name (key) der im Proload geladenen Grafik ('empty10x10' ist eine leere Grafik)

Kollision mit Tilemap aktivieren: this.BeispielMap.setCollision(arg1)
arg1: Index der verwendeten Grafik in 'Tiled' (hier 1)

Hitbox bestimmen (verkleinern/vergrössern): this.BeispielGrafik.body.setSize(arg1, arg2, arg3, arg4)
arg1: Breite (Pixel)
arg2: Höhe (Pixel)
arg3: Offset X-Richtung (von links)
arg4: Offset Y-Richtung (von oben)

Animation hinzufügen: this.BeispielGrafik.animations.add(arg1, arg2, arg3, arg4)
arg1: Name (key) der Animation
arg2: Index-Zahlen der Frames von der Spritesheet & Reihenfolge der Bilder (Array)
arg3: Animationsgeschwindigkeit (frames per second)
arg4: Loop (ja/nein, true/false)

Tween-Animation: this.add.tween(arg1).to(arg2, arg3, arg4, arg5);
(Verändert einen Wert über eine bestimmte Zeit, ähnlich wie Keyframes)
arg1: Objekt andem etwas geändert werden soll
arg2: veränderbare Variable & Endwert ({variable: Wert})
arg3: Länge (Zeit [ms])
arg3: Art des Überganges
arg5: Autostart (ja/nein, true/false)

Funktion später ausführen: this.time.events.add(arg1, arg2, arg3);
arg1: Wartezeit [ms]
arg2: Funktion welche ausgeführt werden soll
arg3: Kontext in dem die Funktion ausgeführt wird

Funktion nach Animation: this.BeispielGrafik.animations.currentAnim.onComplete.add(arg1, arg2);
arg1: Funktion welche ausgeführt werden soll
arg2: Kontext in dem die Funktion ausgeführt wird

Funktion nach Verlassen der Canvas: this.BeispielGrafik.events.onOutOfBounds.add(arg1, arg2);
(Diese Funktion wird ausgeführt wenn die 'BeispielGrafik' das sichtbare Feld verlässt.)
(Erfordert this.BeispielGrafik.checkWorldBounds = true;)
arg1: Funktion
arg2: Kontext der Funktion

Kollisionscheck: this.physics.arcade.collide(arg1, arg2, arg3, arg4, arg5);
(Testet ob sich zwei Objekte berühren.)
arg1: Objekt 1 (Variable / Gruppe / Tilemap / Array mit mehreren Objekten)
arg2: Objekt 2 (gleich wie arg1)
arg3 (optional): Funktion welche bei Kollision aufgerufen werden soll
arg4 (optional): Funktion welche zuerst aufgerufen wird, kann zusätzliche Checks durchführen, Kollision passiert nur bei return von 'true'
arg5: Kontext der Funktionen

Kollisionscheck: this.physics.arcade.overlap(arg1, arg2, arg3, arg4, arg5);
(Gleich wie .collide, bloss dass hier sich die Objekte überlagern dürfen)

*/


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
    this.waterfall = new StaticGameObject(this, 400, 240, 'Level01 Waterfall')  // Hinzugeben des Wasserfall-Bildes
    this.waterfall.animations.add('down', [0, 1, 2, 3], 10, true)               // Animation: Wasser fliess nach unten
    this.waterfall.animations.add('transition', [4, 5, 6, 7], 10, false)        // Animation: Überganges
    this.waterfall.animations.add('up', [8, 9, 10, 11], 10, true)               // Animation: Wasser fliess nach oben
    this.waterfall.animations.play('down')                                      // erste Animation soll starten
    this.waterfall.body.setSize(100, 240, 50, 0)                                // Hitbox wird angepasst (kleiner als Grafik)
    this.damagePlayerList.push(this.waterfall)                                  // Wasserfall soll bei Kolision Spieler schaden

    /* BRÜCKE */
    this.bridge = new StaticGameObject(this, 420, 120, 'Level01 Bridge')        // Brücke wird ab Grafik hinzugefügt
    this.bridge.body.setSize(10, 150, -10, 0)                                   // Hitbox wird angepasst (vergrössert)
    this.bridge.down = false                                                    // Boolean: Brücke unten? (für später)
    this.collidePlayerList.push(this.bridge)                                    // Brücke soll mit Spieler kollidieren

    /* WASSERSPRITZEN */
    this.splash = this.add.sprite(405, 70, 'Level01 Splash')                    // Spritzen des Wasser wird hinzugefügt
    this.splash.animations.add('default', [0, 1, 2, 3], 10, true)               // Animation der Sprite
    this.splash.visible = false                                                 // soll zu Beginn nicht angezeigt werden

    /* KNOPF UM BRÜCKE ZU BEWEGEN */
    this.button = new Button(this, 350, 120, 'General Button', 0, this.bridgeSwitch)

    /* SPIELER */
    this.player = new Player(this, 100, 300, 'Player 01', 250, -800)            // Sprite des Spielers
    this.camera.follow(this.player)                                             // Kamera soll Spieler folgen
    this.player.checkWorldBounds = true                                         // Kollision mit Weltrand soll überprüft
    this.player.events.onOutOfBounds.add(() => {                                //   werden, wenn Spieler ausserhalb der
      if (this.player.y > 0) this.damagePlayer()                                //   Karte ist, soll er sterben.
    })

    /* WASSER AM UNTEREN BILDRAND */
    var water = this.add.sprite(0, 450, 'Level01 Water')                        // Wasser als Variable da sie später nicht
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
      this.waterfall.body.setSize(150, 240, 25, 0)                              // Hitbox des Wasserfalls wird verändert
      this.bridge.body.setSize(10, 150, -10, 0)                                 // Hitbox der Brücke wird angepasst
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
      this.waterfall.body.setSize(150, 100, 25, 0)                              // Hitbox des Wassfalls
      this.bridge.body.setSize(150, 150, 0, 20)                                 // Hitbox der brücke angepasst
      this.bridge.down = true                                                   // Brücke ist nun unten
    }
  }
}
