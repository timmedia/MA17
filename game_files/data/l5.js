var self
class Level05 extends GameState {
  build() {
    this.setup('l5_map', 2000, 480, 1300, 50, 'main_menu', null, null, '2_1_background')
    this.player = new Player(this, 200, 300, 'player_1', 300, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) this.damagePlayer()
    })
  }
  loop() {
    self = this
  }
}
