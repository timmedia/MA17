class Level03 extends GameState {
  build() {
    this.setup('Level03 map', 800, 2000, 1300, 50, 'main_menu', 'Level03 foreground', 'Level03 midground', 'Level03 background')
    this.player = new Player(this, 225, 1850, 'player_1', 300, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) { this.damagePlayer() }
      else { this.nextLevel() }
    })
  }
}
