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

var self

class Level01 extends GameState {
  build() {
    this.setup('1_1_map', 1200, 480, 2000, 50, 'main_menu', '1_1_foreground', '1_1_midground', '1_1_background')

    this.water = new StaticGameObject(this, 400, 240, '1_1_waterfall')
    this.water.animations.add('running_down', [0, 1, 2, 3], 10, true)              // Wasserfall Animationen
    this.water.animations.add('transition', [4, 5, 6, 7], 10, false)
    this.water.animations.add('running_up', [8, 9, 10, 11], 10, true)
    this.water.animations.play('running_down')
    this.water.body.setSize(100, 240, 50, 0)
    this.damagePlayerList.push(this.water)

    this.bridge = new StaticGameObject(this, 420, 120, '1_1_bridge')
    this.bridge.body.setSize(10, 150, -10, 0)
    this.bridge.down = false
    this.collidePlayerList.push(this.bridge)

    this.water_splash = this.add.sprite(405, 70, '1_1_water_splash')
    this.water_splash.animations.add('splash', [0, 1, 2, 3], 10, true)
    this.water_splash.visible = false

    this.button = new Button(this, 350, 120, '1_1_button', 0, this.bridgeSwitch)

    this.player = new Player(this, 100, 300, 'player_1', 300, -800)
    this.camera.follow(this.player)                                        // Kamera soll Spieler folgen
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) this.damagePlayer()
    })

    const water_foreground = this.add.sprite(0, 450, '1_1_water_foreground')
    water_foreground.anchor.setTo(0, 1)
    water_foreground.animations.add('moving', [0, 1, 2, 3, 4, 5], 5, true)
    water_foreground.animations.play('moving')
  }
  bridgeSwitch() {
    if (this.bridge.down) {
      this.add.tween(this.bridge).to({angle: 0}, 500, Phaser.Easing.Cubic.Out, true)
      this.water_splash.animations.stop()
      this.water_splash.visible = false
      this.water.animations.play('running_down')
      this.water.body.setSize(150, 240, 25, 0)
      this.bridge.body.setSize(10, 150, -10, 0)
      this.bridge.down = false
    } else {
      this.add.tween(this.bridge).to({angle: 90}, 500, Phaser.Easing.Cubic.Out, true)
      this.time.events.add(500, () => {
        this.water_splash.animations.play('splash')
        this.water_splash.visible = true
      })
      this.bridge.down = true
      this.water.animations.play('transition')
      this.water.animations.currentAnim.onComplete.add(() => {
        this.water.animations.play('running_up')
      })
      this.water.body.setSize(150, 100, 25, 0)
      this.bridge.body.setSize(150, 150, 0, 20)
    }
  }
  loop() { }
}
