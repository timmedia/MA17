var LoadMapData
var LevelFade
var SetupParallax
var UpdateParallax
var this3
var globalDebug = true

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
    this.body.immovable = true
  }
}

class Player extends DynamicGameObject {
  constructor(context, x, y, key, walkSpeed, jumpSpeed, cameraFollow, killOnExit, enableShoot, bounce) {
    super(context, x, y, key, null, null, bounce)
    this.animations.add('idle', [10, 11, 12, 13], 5, true)                  // Animation: stehen
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)         // Animation: laufen
    this.animations.add('jump_start', [14], 7, false)                           // Animation: springen
    this.animations.add('jump_up', [15], 10, true)
    this.animations.add('jump_top', [16], 5, false)
    this.animations.add('jump_down', [17], 10, true)
    this.animations.add('jump_end', [18], 5, false)
    this.anchor.setTo(0.5, 0.5)                                            // Festpunkt soll horizontal mittig sein (wegen der Spieglung bei Richtungswechsel)
    this.body.setSize(25, 72, 17, 0)                                     // Hitbox wird verkleinert
    this.jumpSpeed = jumpSpeed || 0                                      // Sprunggeschwindigkeit ab Argument, falls nicht vorhanden = 0
    this.walkSpeed = walkSpeed || 50
    this.hp = 9 // Health points
    this.killPlayer = context.killPlayer
    this.body.maxVelocity.x = this.walkSpeed * 2
    context.collideLayerList.push(this)

    if (cameraFollow) {
      context.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    }

    if (killOnExit) {
      this.checkWorldBounds = true                                         // Kollision mit Weltrand soll überprüft
      this.events.onOutOfBounds.add(() => {                                //   werden, wenn Spieler ausserhalb der
        if (this.y > 0) context.killPlayer()                                //   Karte ist, soll er sterben.
      })
    }

    if (enableShoot) {
      this.enableShoot = true
      this.setupShoot(context)
    }

    // Variablen für Laufmechanismus
    this.mu = 35
    this.wind = 0

    controls.right.onDown.add(this.pressRight, this)
    controls.left.onDown.add(this.pressLeft, this)
    if (enableShoot) controls.shift.onDown.add(this.shoot, this)
  }
  pressRight() {
    this.body.acceleration.x += 2000
    if (this.body.acceleration.x > 2000) {
      this.body.acceleration.x = 2000
    }
    this.scale.x = (this.jumpSpeed < 0)? 1 : -1
  }
  pressLeft() {
    this.body.acceleration.x -= 2000
    if (this.body.acceleration.x < -2000) {
      this.body.acceleration.x = -2000
    }
    this.scale.x = (this.jumpSpeed < 0)? -1 : 1
  }
  update() {
    if (this.hp < 0) {
      this.killPlayer()
      return
    }
    const gravitySwitched = this.jumpSpeed > 0
    const grounded = gravitySwitched
      ? this.body.blocked.up || this.body.touching.up
      : this.body.blocked.down || this.body.touching.down

    /* BEWEGUNGS-LOGIK */
    if (controls.right.isDown) {
      if (this.body.velocity.x > this.walkSpeed) {
        this.body.acceleration.x = 0
      } else if (Math.abs(this.body.velocity.x) < 0.5 * this.walkSpeed && controls.right.duration > 300) {
        this.body.velocity.x = this.walkSpeed
      }
    } else if (controls.left.isDown) {
      if (this.body.velocity.x < -this.walkSpeed) {
        this.body.acceleration.x = 0
      } else if (Math.abs(this.body.velocity.x) < 0.5 * this.walkSpeed && controls.left.duration > 300) {
        this.body.velocity.x = -this.walkSpeed
      }
    } else if (!controls.right.isDown && !controls.left.isDown) {
      if (this.body.velocity.x != 0) {
        if (this.wind === 0) {
          this.body.acceleration.x = -this.mu * this.body.velocity.x
        } else {
          if (this.wind / this.body.velocity.x < 0) {
            this.body.acceleration.x = -this.mu * this.body.velocity.x + this.wind
          } else {
            this.body.acceleration.x = this.wind
          }
        }
      } else {
        this.body.acceleration.x = this.wind
      }
    }

    var delta_x = Math.round(this.body.position.x - this.body.prev.x)
    var delta_y = Math.round(this.body.position.y - this.body.prev.y)

    if (grounded) {
      if (controls.up1.isDown || controls.up2.isDown) {
        if (Math.round(this.body.velocity.x) != 0) {
          this.animations.play('jump_up')
          this.body.velocity.y = this.jumpSpeed
        } else {
          this.animations.play('jump_start')
          this.animations.currentAnim.onComplete.add(() => {
            this.animations.play('jump_up')
            this.body.velocity.y = this.jumpSpeed
          })
        }
      } else if (controls.right.isDown ||controls.left.isDown) {
        this.animations.play('walk')
      } else {
        if (delta_x === 0) {
          this.animations.currentAnim.onComplete.add(() => {this.animations.play('idle')}) // after currentAnim
        } else {
          this.animations.play('idle') // whitout delay
        }
      }
      if (delta_y > 0) {
        this.animations.play('jump_end')
      }
    } else {
      if (delta_y === 0) {
        this.animations.play('jump_top')
      } else if (delta_y > 0) {
        this.animations.currentAnim.onComplete.add(() => {this.animations.play('jump_down')})
      }
    }
  }
  damage(player, hp) {
    console.log('damage')
    player.hp -= parseInt(hp) || 5
    if (player.hp < 0) {
      this.killPlayer()
    } else {
      player.tint = 0xFF0000
      this.add.tween(player).to({tint: 0xFFFFFF}, 250, Phaser.Easing.Cubic.Out, true)
    }
  }
  // https://www.codecaptain.io/blog/game-development/shooting-bullets-using-phaser-groups/518
  setupShoot(context) {
    this.bullets = context.game.add.group()
    this.bullets.enableBody = true
    this.bullets.createMultiple(20, 'Debug Ball')
    this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', (bullet) => {bullet.kill()})
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('body.allowGravity', false)
  }
  shoot() {
    var bullet = this.bullets.getFirstExists(false)
    if (bullet) {
      bullet.reset(this.position.x, this.position.y)
      bullet.body.velocity.x = this.body.velocity.x + this.scale.x * 500
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
    this.animations.play('u')
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
