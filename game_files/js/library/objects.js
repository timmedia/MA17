var LoadMapData;
var LevelFade;
var SetupParallax;
var UpdateParallax;

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
    //this.body.maxVelocity.x = walkSpeed || 300                                 // Laufgeschwindigkeit ab Argument, falls nicht vorhanden = 0
    this.jumpSpeed = jumpSpeed || 0                                      // Sprunggeschwindigkeit ab Argument, falls nicht vorhanden = 0
    context.collideLayerList.push(this)
    this.mu = 50
    this.baseAcceleration = {x: 0.0001, y: 0}
  }
  update() {
    const rightDown = controls.right.isDown || controls.j_right
    const leftDown = controls.left.isDown || controls.j_left
    const upDown = controls.up1.isDown || controls.up2.isDown || controls.j_up
    const gravitySwitched = (this.jumpSpeed < 0) ? false : true
    const grounded = gravitySwitched
      ? this.body.blocked.up || this.body.touching.up
      : this.body.blocked.down || this.body.touching.down

    if (controls.right.isDown) {
      this.body.acceleration.x = (controls.right.duration === 0)
        ? 7000
        : this.body.acceleration.x / 2
      this.animations.play('walk')
      this.scale.x = gravitySwitched ? -1 : 1
    }
    if (controls.left.isDown) {
      this.body.acceleration.x = (controls.left.duration === 0)
        ? - 7000
        : this.body.acceleration.x / 2
      this.animations.play('walk')
      this.scale.x = gravitySwitched ? 1 : -1
    }
    if (!controls.right.isDown && !controls.left.isDown) {
      this.body.acceleration.x = - this.body.velocity.x * this.mu
      //this.body.acceleration.x += 1000
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
