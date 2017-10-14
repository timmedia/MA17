class Level06 extends GameState {
  build() {
    this.setup(
      'Level06 Map',
      6420, 480,
      1300,
      50,
      'Menu',
      'Debug empty10x10',
      'Debug empty10x10',
      'Level06 Background'
    )
    this.player = new Player(this, 2325, 350, 'Player 01', 300, -650, true, false, true)

    this.wire = this.game.add.group()
    let wire1 = new StaticGameObject(this, 1070, 350)
    wire1.body.setSize(270, 120, 0, 0)
    this.wire.add(wire1)
    let wire2 = new StaticGameObject(this, 2530, 380)
    wire2.body.setSize(370, 90, 0, 0)
    this.wire.add(wire2)

    this.damagePlayerList.push(this.wire)

    this.enemies = this.game.add.group()
    let coords = [[2155, 150], [2420, 300], [2585, 200], [2780, 260], [3540, 160], [5125, 230], [5960, 440]]
    for (let i in coords) {
      this.enemies.add(new Enemy(this, coords[i][0], coords[i][1], 'Debug Enemy'))
    }
    this.enemies.setAll('isAlive', true)

  }
  loop() {
    self = this
    this.physics.arcade.overlap(
      this.enemies,
      this.player.bullets,
      (enemy, bullet) => {
        return enemy.isAlive
      },
      (enemy, bullet) => {
        bullet.kill()
        enemy.isAlive = false
        this.add.tween(enemy).to({tint: 0, alpha: 0}, 800, Phaser.Easing.Cubic.Out, true)
        setTimeout(() => {enemy.kill()}, 800)
      }
    )
  }
  render() {
    game.debug.body(this.wire.children[0])
    game.debug.body(this.wire.children[1])
  }
}

class Enemy extends StaticGameObject {
  constructor(context, x, y, key) {
    super(context, x, y, key)
    this.anchor.setTo(0, 1)
    this.bullets = context.game.add.group()
    this.bullets.enableBody = true
    this.bullets.createMultiple(20, 'Debug Ball')
  }
  shoot(context) {
    var bullet = this.bullets.getFirstExists(false)
    if (bullet) {
      var dt = 10
      bullet.reset(this.position.x, this.top)
      bullet.body.velocity.x = (context.player.x - this.position.x) / dt
      bullet.body.velocity.y = (context.player.y - this.position.y + 0.5 * context.physics.arcade.gravity.y * dt * dt) / dt
      console.log(context.player.y, this.y, context.physics.arcade.gravity.y)
    }
  }
}
