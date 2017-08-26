class Level03 extends GameState {
  build() {
    this.setup(
      'Level03 Map',
      800, 2000,
      1300,
      50,
      'main_menu',
      'Level03 Foreground',
      'Level03 Midground',
      'Level03 Background'
    )
    this.player = new Player(this, 225, 1850, 'Player 01', 300, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      (this.player.y > 0) ? this.damagePlayer() : this.nextLevel()
    })
    this.water = new DynamicGameObject(this, 120, 2100, 'Level03 Waves')
    this.water.animations.add('flowing', [0, 1, 2, 3, 4], 5, true)
    this.water.animations.play('flowing')
    this.water.addChild(new BasicGameObject(this, 0, 431, 'Level03 Water'))
    this.water.body.allowGravity = false
    this.water.body.velocity.y = - 40
    this.water.body.setSize(560, 100, 0, 50)
  }
  loop() {
    this.physics.arcade.overlap(this.player, this.water, this.damagePlayer, null, this)
  }
}
