var LoadMapData;
var LevelFade;
var SetupParallax;
var UpdateParallax;

var globalDebug = true

class GameState extends Phaser.State {
  setup(map, boundX, boundY, gravity, maxTime, nextLevel, fg, mg, bg) {
    this.collidePlayerList = []
    this.collideLayerList = []
    this.damagePlayerList = []
    this.loadMapData(map)
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
  update(dt) {
    this.checkCollisions()
    this.loop()
  }
  loop() {  }
  checkCollisions() {
    this.physics.arcade.collide(this.layer, this.collideLayerList)
    this.physics.arcade.collide(this.player, this.collidePlayerList)
    this.physics.arcade.collide(this.player, this.damagePlayerList, this.damagePlayer)
  }
  damagePlayer() {
    game.state.restart()
  }
  goToNextLevel() {
    this.time.events.add(500,() => {
      game.state.start(this.nextLevel)
    })
  }
  levelFade() {
    var fade = this.add.sprite(0, 0, 'blackscreen')
    fade.fixedToCamera = true
    this.add.tween(fade).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true)
    this.time.events.add(1000, fade.kill, this)
  }
  loadMapData(map) {
    var map = this.add.tilemap(map)
    map.addTilesetImage('debug10x10', 'debug10x10')
    map.setCollision(1, 8)
    this.layer = map.createLayer('Tile Layer 1')
    this.layer.alpha = globalDebug ? 1 : 0

    var doorLayer = map.objects['Object Layer Door']
    var boxesLayer = map.objects['Object Layer Boxes']

    if (doorLayer) {
      this.doors = this.game.add.group()
      doorLayer.forEach(door => {
        var locked = door.properties && door.properties.locked
        this.door = new Door(this, door.x, door.y, '1_1_door', 0, locked, this.goToNextLevel)
        this.door.update = () => {
          this.physics.arcade.overlap(this.door, this.player, this.door.callback, this.door.processCallback, this)
        }
      })
    }

    if (boxesLayer) {
      this.boxes = this.game.add.group()
      boxesLayer.forEach(box => {
        this.boxes.add(new Box(this, box.x, box.y, '1_1_box', 3000, 0.5))
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

class BasicGameObject extends Phaser.Sprite {
  constructor(context, x, y, key, angle, frame) {
    super(context.game, x, y, key, angle, frame)
    this.anchor.setTo(0,1)
    this.angle = angle || 0
    context.game.add.existing(this)
  }
}

class DynamicGameObject extends BasicGameObject {
  constructor(context, x, y, key, angle, drag, bounce, frame) {
    super(context, x, y, key, angle, frame)
    context.game.physics.arcade.enable(this)                              // Physik (Arcade) wird aktiviert
    this.body.drag.x = drag || 0                                          // Reibung wird gesetzt, falls nicht vorhanden = 0
    this.body.bounce.y = bounce || 0                                      // Aufprall wird gesetzt, falls nicht vorhanden = 0
  }
}

class StaticGameObject extends DynamicGameObject {
  constructor(context, x, y, key, angle, frame) {
    super(context, x, y, key, angle, null, null, frame)
    this.body.moves = false
  }
}

class Player extends DynamicGameObject {
  constructor(context, x, y, key, walkSpeed, jumpSpeed, bounce) {
    super(context, x, y, key, null, null, bounce)
    this.animations.add('idle', [10, 11, 12, 13], 5, true)                  // Animation: stehen
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)         // Animation: laufen
    this.animations.add('jump', [0], 10, true)                           // Animation: springen
    this.anchor.setTo(0.5, 0.5)                                            // Festpunkt soll horizontal mittig sein (wegen der Spieglung bei Richtungswechsel)
    this.body.setSize(25, 72, 17, 0)                                     // Hitbox wird verkleinert
    this.body.maxVelocity.x = walkSpeed || 300                                 // Laufgeschwindigkeit ab Argument, falls nicht vorhanden = 0
    this.jumpSpeed = jumpSpeed || 0                                      // Sprunggeschwindigkeit ab Argument, falls nicht vorhanden = 0
    context.collideLayerList.push(this)
  }
  update() {
    const rightDown = controls.right.isDown || controls.j_right
    const leftDown = controls.left.isDown || controls.j_left
    const upDown = controls.up1.isDown || controls.up2.isDown || controls.j_up
    const gravitySwitched = (this.jumpSpeed < 0) ? false : true
    const grounded = gravitySwitched
      ? this.body.blocked.up || this.body.touching.up
      : this.body.blocked.down || this.body.touching.down

    if (controls.lvl1.isDown) game.state.start('level_1_1')
    else if (controls.lvl2.isDown) game.state.start('level_2_1')
    else if (controls.lvl3.isDown) game.state.start('level_3_1')
    else if (controls.tut.isDown) game.state.start('tutorial')

    if (rightDown && !leftDown) {
      this.body.acceleration.x = 3000
      this.animations.play('walk')
      this.scale.x = gravitySwitched ? -1 : 1
    } else if (leftDown && !rightDown) {
      this.body.acceleration.x = - 3000
      this.animations.play('walk')
      this.scale.x = gravitySwitched ? 1 : -1
    } else {
      this.body.velocity.x = 0
      this.body.acceleration.x = 0
      if (grounded) this.animations.play('idle')
    }
    if (grounded) {
      if (upDown) this.body.velocity.y = this.jumpSpeed
    } else {
      this.animations.play('jump')
    }
  }
}

class Box extends DynamicGameObject {
  constructor(context, x, y, key, drag, bounce) {
    super(context, x, y, key, null, drag, bounce)
    this.body.collideWorldBounds = true
  }
}

class Button extends StaticGameObject {
  constructor(context, x, y, key, angle, callback) {
    super(context, x, y, key, angle)
    this.body.setSize(24, 24, -4, -4)
    this.callback = callback
    this.animations.add('u', [0], 1, false)
    this.animations.add('d', [1], 0.5, false)
    this.up = true
    this.update = () => {
      context.physics.arcade.overlap(this, context.player, this.callback, this.processCallback, context)
    }
  }
  switchState(self) {
    if (self.up) {
      self.up = false
    } else {
      self.up = true
      self.animations.play('u')
    }
  }
  processCallback(self) {
    if (self.up) {
      self.switchState(self)
      self.animations.play('d')
      self.animations.currentAnim.onComplete.add(self.switchState, this)
      return true
    } else {
      return false
    }
  }
}

class Door extends StaticGameObject {
  constructor(context, x, y, key, angle, locked, callback) {
    super(context, x, y, key, angle)
    this.endCallback = callback
    this.animations.add('locked', [0], 1, false)
    this.animations.add('closed', [1], 1, false)
    this.animations.add('open', [2], 1, false)
    this.animations.add('opening', [5, 4, 3, 2], 10, false)
    this.animations.add('closing', [2, 3, 4, 5], 10, false)
    this.anchor.setTo(0.5, 1)
    this.locked = locked
    this.animations.play(locked ? 'locked' : 'closed')
  }
  lock() {
    this.locked = true
    this.animations.play('locked')
  }
  unlock() {
    this.locked = false
    this.animations.play('closed')
  }
  processCallback(self) {
    return !self.locked
  }
  callback(self) {
    self.animations.play('opening')
    self.locked = true // Animation once only
    self.animations.currentAnim.onComplete.add(self.endCallback, this)
  }
}

class Key extends StaticGameObject {
  constructor(context, x, y, key, angle, visible, callback) {
    super(context, x, y, key, angle)
    this.visible = visible
    this.callback = callback
    this.update = () => {
      context.physics.arcade.overlap(context.player, this, this.callback, this.processCallback, context)
    }
  }
  processCallback(self) {
    return self.visible
  }
}

// Überall wo in der JSON-Datei eine Box plaziert wurde, soll ein Box-Objekt hin
// Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db

LoadMapData = function (context, key) {
  var map = context.add.tilemap(key)
  map.addTilesetImage('debug10x10', 'debug10x10')
  map.setCollision(1, 8)
  context.layer = map.createLayer('Tile Layer 1')

  var doorLayer = map.objects['Object Layer Door']
  var boxesLayer = map.objects['Object Layer Boxes']

  if (doorLayer) {
    context.doors = context.game.add.group()
    doorLayer.forEach(door => {
      var locked = false
      if (door.properties && door.properties.locked) locked = true
      context.door = new Door(context, door.x, door.y, '1_1_door', 0, locked, context.doorAction)
    })
  }
  if (boxesLayer) {
    context.boxes = context.game.add.group()
    boxesLayer.forEach(box => {
      context.boxes.add(new Box(context, box.x, box.y, '1_1_box', 3000, 0.5))
    })
  }
}

SetupParallax = function (context, foreground, midground, background) {
  let fg = context.add.sprite(0, 0, foreground)
  let mg = context.add.sprite(0, 0, midground)
  let bg = context.add.sprite(0, 0, background)
  mg.sendToBack()
  bg.sendToBack()
  return [fg, mg, bg]
}

UpdateParallax = function (context, parallax) {
  parallax[0].x = context.world.x / 3
  parallax[2].x = - context.world.x / 3
}

LevelFade = function (context) {
  let fade = context.add.sprite(0, 0, 'blackscreen')
  context.add.tween(fade).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true)
}
