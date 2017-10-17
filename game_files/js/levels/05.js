var self
class Level05 extends GameState {
  build() {
    this.setup(
      'Level05 Map',
      4800, 480,
      1300,
      50,
      'Menu',
      'Debug empty10x10',
      'Level05 Midground',
      'Level05 Background'
    )

    // Hinzufügen des Spieler-Objekts
    this.player = new Player(this, 200, 300, 'Player 01', 280, -600)
    // Kamera soll Spieler folgen, jedoch längsämer als üblich
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    // Fall Spieler das sichtbare in die untere Richtung (y>0) verlässt, soll neu gestartet werden
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) this.killPlayer()
    })

    // Wasser, wird später nicht mehr benötigt
    let water = this.add.sprite(0, 480, 'Level05 Water')
    water.anchor.setTo(0, 1)
    water.alpha = 0.7

    this.char2 = this.add.sprite(1920, 385, 'Level05 Char2')
    this.char2.animations.add('idle', [0, 1], 5, true)
    this.char2.animations.play('idle')

    // Nach 1.5s soll der Wind starten
    setTimeout(() => {this.startWind()}, 1500)
  }
  loop() {
    // Beim Erreichen der letzten Platform ist das Level fertig
    if (this.player.x > 4750) {
      this.goToNextLevel()
    }
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
