class Tutorial extends GameState {
  build() {
    this.setup(
      'Tutorial Map',
      800, 480,
      2000,
      50,
      'Level01',
      'Tutorial Foreground',
      'Tutorial Midground',
      'Tutorial Background'
    )

    this.michael = this.add.sprite(155, 460, 'Tutorial Michael')
    this.michael.anchor.setTo(0.5, 1)

    this.speechbubble = this.add.sprite(252, 300, 'Tutorial Speechbubbles')
    this.speechbubble.anchor.setTo(0.5, 0.5)
    this.speechbubble.frame = 0
    this.speechbubble.scale.setTo(0, 0)
    this.time.events.add(1500, this.openBubble, this, 0)

    this.button = new Button(this, 790, 390, 'General Button', -90, this.buttonPress)
    this.player = new Player(this, 300, 300, 'Player 01', 300, -800)

    this.key = new Key(this, 585, 210, 'General Key', 0, false, this.collectKey)
    this.key.visible = false
  }
  loop() {
    this.michaelCheck()
  }
  buttonPress() {
    if (!this.key.visible) this.key.visible = true
  }
  openBubble(n) {
    this.speechbubble.frame = n
    this.add.tween(this.speechbubble.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.Out, true)
    this.speechbubble.busy = false
  }
  closeBubble() {
    this.add.tween(this.speechbubble.scale).to({x: 0, y: 0}, 200, Phaser.Easing.Quadratic.InOut, true)
  }
  michaelCheck() {
    switch (this.speechbubble.frame) {
      case 0:
        if (!this.speechbubble.busy && (this.player.body.velocity.x != 0)) {
          this.time.events.add(2500, this.closeBubble, this)
          this.speechbubble.busy = true
          this.time.events.add(3000, this.openBubble, this, 1)
        }
        break
      case 1:
        if (!this.speechbubble.busy && (this.player.body.velocity.y != 0)) {
          this.time.events.add(2500, this.closeBubble, this)
          this.speechbubble.busy = true
          this.time.events.add(3000, this.openBubble, this, 2)
        }
        break
      case 2:
        if (!this.speechbubble.busy) {
          this.physics.arcade.overlap(this.door, this.player, () => {
            this.time.events.add(2500, this.closeBubble, this)
            this.speechbubble.busy = true
            this.time.events.add(3000, this.openBubble, this, 3)
          })
        }
        break
      case 3:
        if (!this.speechbubble.busy) {
          this.physics.arcade.overlap(this.button, this.player, () => {
            this.time.events.add(2500, this.closeBubble, this)
            this.speechbubble.busy = true
            this.time.events.add(3000, this.openBubble, this, 4)
          })
        }
        break
      default:
        break
    }
  }
  collectKey() {
    this.door.unlock()
    this.key.destroy()
  }
}
