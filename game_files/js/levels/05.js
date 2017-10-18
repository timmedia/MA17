var self
class Level05 extends GameState {
  build() {
    this.setup(
      'Level05 Map',
      4800, 480,
      1300,
      50,
      'Level06',
      'Debug empty10x10',
      'Level05 Midground',
      'Level05 Background'
    )

    // Wasser, wird später nicht mehr angesprochen (let anstatt this.)
    let water = this.add.sprite(0, 480, 'Level05 Water')
    water.anchor.setTo(0, 1)  // Ankerpunkt
    water.alpha = 0.7         // Semitransparenz

    /*
    Alle Charaktere in einer Gruppe. Der physikalische Körper (Hitbox) wird
    mittels body.setSize() verschoben und vergrössert, sodass der Spieler vor
    dem Erreichen des Charakters damit zusammenstosst. Beim Zusammenstossen
    erscheint die Sprechblase.
    */
    this.characters = this.add.group()

    let char1 = new StaticGameObject(this, 1920, 449, 'Level05 Char1')
    char1.animations.add('idle', [0, 1], 5, true)
    char1.body.setSize(50, 480, -270, -380)

    let char2 = new StaticGameObject(this, 2920, 300, 'Level05 Char2')
    char2.animations.add('idle', [0, 1, 2, 3], 5, true)
    char2.body.setSize(50, 480, -270, -231)

    let char3 = new StaticGameObject(this, 3540, 395, 'Level05 Char3')
    char3.animations.add('idle', [0, 1, 2], 5, true)
    char3.body.setSize(50, 480, -270, -310)
    char3.anchor.setTo(3.5, 0.75) // Einzige Grafik wo Sprechblase rechts von Charakter

    let char4 = new StaticGameObject(this, 4388, 440, 'Level05 Char4')
    char4.animations.add('idle', [0, 1, 2], 5, true)
    char4.body.setSize(50, 480, -270, -375)

    // Alle Charaktere der Gruppe hinzugefügt
    this.characters.addMultiple([char1, char2, char3, char4])

    // Jeder Charakter soll die Idle-Animation abspielen
    this.characters.forEach((char) => {
      char.animations.play('idle')
      char.started = false // für später, Sprechblase soll nur 1x erscheinen
    })

    // Funktion um Sprechblase zu öffnen
    this.characters.openBubble = (player, char) => {
      // Index des Charakters ist gleich wie Frame-Nummer der Sprechblase im Spritesheet
      let frame = this.characters.getChildIndex(char)
      // Sprechblase soll oberhalb & etwas rechts von Charakterkoordinaten platziert sein
      let bubble = this.add.sprite(char.position.x + 5, char.position.y - 60, 'Level05 Speechbubbles')
      // Entsprechendes Frame ab Spritesheet
      bubble.frame = frame
      // Ankerpunkt, von hier wird sie von Grösse 0 zu Grösse 1 skaliert
      bubble.anchor.setTo(1, 1)
      bubble.scale.setTo(0 , 0)
      // Sprechblase soll nur 1x erscheinen
      char.started = true
      // Während 500ms erscheint die Sprechblase
      this.add.tween(bubble.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Cubic.Out, true)
      // Grafik der Sprechblase soll hinter dem Spieler sein
      this.player.bringToTop()
    }

    // Nach 250ms soll der Wind starten
    setTimeout(() => {this.startWind()}, 250)

    // Hinzufügen des Spieler-Objekts
    this.player = new Player(this, 200, 300, 'Player 01', 280, -600)
    // Kamera soll Spieler folgen, jedoch längsämer als üblich
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    // Fall Spieler das sichtbare in die untere Richtung (y>0) verlässt, soll neu gestartet werden
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.position.y < 480 || this.player.position.x > 4800) {
        this.goToNextLevel()
      } else if (this.player.position.y > 0) {
        this.killPlayer()
      }
    })
  }
  loop() {
    // Überprüfung ob Spieler mit eines der Charaktere kollidiert
    this.physics.arcade.overlap(
      this.player,
      this.characters,
      this.characters.openBubble,
      // Sprechblase soll nur geöffnet werden, falls sie noch nicht geöffnet wurde
      (player, char) => {return !char.started},
      this
    )
  }
  startWind() {
    // Wind wird gestartet
    this.player.wind = -100
    // this.recur für später, damit die Schleife unterbrochen werden kann
    this.recur = null
    // Zufallswind
    this.randomWind()
  }
  randomWind() {
    // Zufallswind (liefert Zahl zwischen 0 und 1)
    let x = Math.random()
    let y = Math.random()
    // Windstoss, Geschwindigkeit des Spielers um einen Wert verändert
    this.player.body.velocity.x -= 100 * x
    // nächste Wiederholung (0 - 1.2s Pause)
    this.recur = setTimeout(() => {this.randomWind()}, 1200 * y)
  }
}
