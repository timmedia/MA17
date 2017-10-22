class Level09 extends GameState {
  build() {
    // Initialisierung der Ebene
    this.setup(
      'Level08 Map',
      3720,
      480,
      1300,
      50,
      'Menu',
      'Level08 Foreground',
      'Level08 Midground',
      'Level08 Background'
    )
    this.player = new Player(this, 2500, 405, 'Player 01', 250, -600, true)
    this.enemy = new DynamicGameObject(this, 2700, 450, 'Level08 17')
    this.collideLayerList.push(this.enemy)
    this.enemy.animations.add('walk left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)
    this.enemy.animations.add('walk right', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true)
    this.enemy.animations.add('idle right', [20, 21, 22, 23], 5, true)
    this.enemy.animations.add('idle left', [24, 25, 26, 27], 5, true)
    this.enemy.animations.add('jump right start', [28], 5, false)
    this.enemy.animations.add('jump right up', [29], 10, true)
    this.enemy.animations.add('jump right top', [30], 5, false)
    this.enemy.animations.add('jump right down', [31], 10, true)
    this.enemy.animations.add('jump right landed', [32], 5, false)
    this.enemy.animations.add('jump left start', [33], 5, false)
    this.enemy.animations.add('jump left up', [34], 10, true)
    this.enemy.animations.add('jump left top', [35], 5, false)
    this.enemy.animations.add('jump left down', [36], 10, true)
    this.enemy.animations.add('jump left landed', [37], 5, false)
  }
  loop() {
    this.delayEnemyVelocity(this.player.body.velocity.x, this.player.body.velocity.y)
    this.renderEnemy()
  }
  delayEnemyVelocity(vx, vy) {
    setTimeout(() => {
      this.enemy.body.velocity.x = vx
      this.enemy.body.velocity.y = vy
    }, 500)
  }
  renderEnemy() {
    var vx = this.enemy.body.velocity.x
    var vy = this.enemy.body.velocity.y
    var dx = this.enemy.body.prev.x - this.enemy.position.x
    var dy = this.enemy.body.prev.y - this.enemy.position.y

    if (vy === 0) {
      if (dy === 0) {

      } else {

      }
    } else {

    }
  }
}
