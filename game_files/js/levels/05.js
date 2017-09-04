class Level05 extends GameState {
  build() {
    this.setup(
      'Level05 Map',
      4500, 450,
      1300,
      50,
      'main_menu',
      null,
      null,
      null
    )
    this.player = new Player(this, 50, 300, 'Player 01', 300, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      (this.player.y > 0) ? this.damagePlayer() : this.nextLevel()
    })

  }
  loop() {
    this.player.body.x -= 2
    console.log(this.player.body.acceleration.x)
    self = this
  }
}
