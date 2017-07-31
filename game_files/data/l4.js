class Level3 extends GameState {
  build() {
    this.setup('l4_map', 800, 2000, 1300, 50, 'main_menu', null, null, '2_1_background')
    this.player = new Player(this, 200, 300, 'player_1', 300, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) this.damagePlayer()
    })
  }
  loop() { }
}
