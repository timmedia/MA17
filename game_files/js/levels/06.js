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
    this.player = new Player(this, 525, 350, 'Player 01', 300, -650, true, false, true)

    this.wire = this.game.add.group()
    let wire1 = new StaticGameObject(this, 1070, 400)
    wire1.body.setSize(270, 70, 0, 0)
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
    this.enemies.forEach((child) => { child.start() })

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
    this.anchor.setTo(0.5, 1)
    this.bullets = context.game.add.group()
    this.bullets.enableBody = true
    this.bullets.createMultiple(20, 'Debug Arrow')
    this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', (bullet) => {if (bullet.y > 480) bullet.kill()})
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.forEach((bullet) => {
      bullet.alreadyHit = false
      bullet.update = () => {
        bullet.angle = Math.atan(bullet.body.velocity.y / bullet.body.velocity.x) / 3.14 * 180
      }
    })
    this.loop = null
    this.start = () => {
      this.loop = setInterval(() => {
        if (this.alive) {
          if (this.inCamera) {
            let x = Math.random()
            if (x < 0.6) this.shoot(context, x)
          }
        } else {
          clearInterval(this.loop)
        }
      }, 750 + Math.random() * 150)
    }
    this.update = () => {
      context.physics.arcade.overlap(this.bullets, context.player, (bullet, player) => {
        if (bullet.body.wasTouching.none) context.player.hp -= 2
      }

    )
    }
  }
  shoot(context, duration) {
    var bullet = this.bullets.getFirstExists(false)
    bullet.alreadyHit = false
    if (bullet) {
      var dt = duration * 2 + 0.2
      var selfY = this.position.y - this.body.height / 2
      var selfX
      if (this.position.x < context.player.x) {
        this.scale.x = 1
        bullet.scale.x = -1
        selfX = this.position.x + this.body.width / 2
      } else {
        this.scale.x = -1
        bullet.scale.x = 1
        selfX = this.position.x - this.body.width / 2
      }
      bullet.reset(selfX, selfY)
      bullet.body.velocity.x = (context.player.position.x - selfX) / dt
      bullet.body.velocity.y = (context.player.position.y - selfY + 0.5 * -context.physics.arcade.gravity.y * dt * dt) / dt
    }
  }
}
