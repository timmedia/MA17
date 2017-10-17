var globalDebug = globalDebug || false

class GameState extends Phaser.State {
  setup(map, boundX, boundY, gravity, maxTime, nextLevel, fg, mg, bg) {
    this.collidePlayerList = []
    this.collideLayerList = []
    this.damagePlayerList = []
    if (map) this.loadMapData(map)
    this.maxTime = maxTime
    this.nextLevel = nextLevel
    this.world.setBounds(0, 0, boundX, boundY)
    this.physics.arcade.gravity.y = gravity
    this.parallaxImages = [fg || null, mg  || null, bg || null]
  }
  create() {
    this.build()
    this.setupParallax()
    this.levelFade()
  }
  update() {
    this.checkCollisions()
    this.loop()
  }
  loop() {  }
  checkCollisions() {
    this.physics.arcade.collide(this.layer, this.collideLayerList)
    this.physics.arcade.collide(this.collideLayerList, this.collideLayerList)
    this.physics.arcade.collide(this.player, this.collidePlayerList)
    this.physics.arcade.overlap(this.player, this.damagePlayerList, this.player.damage, null, this)
  }
  killPlayer() {
    game.state.restart()
  }
  goToNextLevel() {
    this.time.events.add(500,() => {
      game.state.start(this.nextLevel)
    })
  }
  levelFade() {
    var fade = this.add.sprite(0, 0, 'Blackscreen')
    fade.fixedToCamera = true
    this.add.tween(fade).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true)
    this.time.events.add(1000, fade.kill, this)
  }
  loadMapData(map) {
    var map = this.add.tilemap(map)
    map.addTilesetImage('debug10x10', 'Debug tile10x10')
    map.setCollision(1, 8)
    this.layer = map.createLayer('Tile Layer 1')
    this.layer.alpha = globalDebug ? 1 : 0

    var doorLayer = map.objects['Object Layer Door']
    var boxesLayer = map.objects['Object Layer Boxes']

    if (doorLayer) {
      doorLayer.forEach(door => {
        var locked = door.properties && door.properties.locked
        this.door = new Door(this, door.x, door.y, 'General Door', 0, locked, this.goToNextLevel)
        this.door.update = () => {
          this.physics.arcade.overlap(this.door, this.player, this.door.callback, this.door.processCallback, this)
        }
      })
    }

    if (boxesLayer) {
      this.boxes = this.game.add.group()
      boxesLayer.forEach(box => {
        this.boxes.add(new Box(this, box.x, box.y, 'General Box', 3000, 0.5))
      })
      this.collideLayerList.push(this.boxes)
      this.collidePlayerList.push(this.boxes)
    }
  }
  setupParallax() {
    this.parallax = [
      this.parallaxImages[0] ? this.add.sprite(0, 0, this.parallaxImages[0]) : null,
      this.parallaxImages[1] ? this.add.sprite(0, 0, this.parallaxImages[1]) : null,
      this.parallaxImages[2] ? this.add.sprite(0, 0, this.parallaxImages[2]) : null
    ]
    if (this.parallax[0] && this.parallax[1] && this.parallax[2]) {
      this.parallax[0].update = () => {
        this.parallax[0].x = this.world.x / 3
        this.parallax[0].y = this.world.y / 3
        this.parallax[2].x = - this.world.x / 3
        this.parallax[2].y = - this.world.y / 3
      }
    }
    if (this.parallax[1]) this.parallax[1].sendToBack()
    if (this.parallax[2]) this.parallax[2].sendToBack()
  }
}