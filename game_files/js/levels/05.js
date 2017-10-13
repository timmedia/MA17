var self
class Level05 extends GameState {
  build() {
    this.setup(
      'Level05 Map',
      4800, 480,
      1300,
      50,
      'main_menu',
      null,
      null,
      null
    )
    this.player = new Player(this, 50, 300, 'Player 01', 280, -600)
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      (this.player.y > 0) ? this.damagePlayer() : this.nextLevel()
    })
    setTimeout(() => {this.startWind()}, 1500)
  }
  loop() {
    self = this
  }
  startWind() {
    this.player.wind = -100
    this.recur = null
    this.randomWind()
  }
  randomWind() {
    let x = Math.random()                                                       // liefert Zahl zw. 0 & 1
    let y = Math.random()
    this.player.body.velocity.x -= 100 * x                                      // Windstoss (Veränderung Geschwindigkeit)
    this.recur = setTimeout(() => {this.randomWind()}, 1200 * y)                // Interval für nächsten Windstoss
  }
}
