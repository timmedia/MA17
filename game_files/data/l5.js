var self

class Level05 extends GameState {
  build() {
    this.setup('Level05 map', 2000, 480, 1300, 50, 'main_menu', null, null, '2_1_background')
    this.player = new Player(this, 200, 300, 'player_1', 200, -600)
    this.camera.follow(this.player)
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) this.damagePlayer()
    })
    const clouds = [
      [700, 350, 0],
      [1000, 420, 1],
      [1220, 350, 2],
      [1400, 290, 0],
      [1650, 310, 7],
      [1750, 200, 6],
      [1920, 190, 5],
      [2200, 390, 1]
    ]
    this.platforms = this.game.add.group()
    clouds.forEach(cloud => {
      this.platforms.add(this.platform(cloud[0], cloud[1], cloud[2]))
    })
  }
  loop() {
   self = this
  }
  platform(x, y, i) {
    var res
    switch (i) {
      case 0:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud1')
        res.body.setSize(100, 30, 10, 20)
        break
      case 1:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud1')
        res.scale.setTo(- 1, 1)
        res.body.setSize(100, 30, 10, 20)
        break
      case 2:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud2')
        res.body.setSize(103, 30, 10, 20)
        break
      case 3:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud2')
        res.scale.setTo(- 1, 1)
        res.body.setSize(100, 30, 10, 20)
        break
      case 4:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud3')
        res.body.setSize(79, 30, 5, 20)
        break
      case 5:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud3')
        res.scale.setTo(- 1, 1)
        res.body.setSize(79, 30, 5, 20)
        break
      case 6:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud4')
        res.body.setSize(60, 30, 0, 20)
        break
      case 7:
        res = new DynamicGameObject(this, x, y, 'Level05 cloud3')
        res.scale.setTo(- 1, 1)
        res.body.setSize(60, 30, 0, 20)
        break
      default:
        break
    }
    res.body.allowGravity = false
    res.body.velocity.x = -80
    res.body.maxVelocity.y = 2
    res.body.checkCollision.left = false
    res.body.checkCollision.right = false
    res.body.checkCollision.down = false
    res.anchor.setTo(0.5, 0.5)
    this.collidePlayerList.push(res)
    res.update = () => {
      if (!res.body.wasTouching.up) {
        res.dx = res.body.x - this.player.body.x
      }
      if (res.body.touching.up) {
        if (this.player.body.acceleration.x === 0) {
          this.player.body.x = res.body.x - res.dx
        } else {
          res.dx = res.body.x - this.player.body.x
        }
      }
    }
    return res
  }
}
