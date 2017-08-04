class Level02 extends GameState {
  build() {
    this.setup('2_1_map', 800, 480, 1300, 50, 'main_menu', null, '2_1_midground', '2_1_background')
    this.key = new Key(this, 390, 400, '2_1_key', 0, true, this.collectKey)

    this.water = new StaticGameObject(this, 344, 440, '2_1_water')
    this.water.animations.add('down', [0, 1, 2, 3], 10, true)
    this.water.animations.add('go_up', [4, 5, 6, 7], 10, false)
    this.water.animations.add('go_down', [12, 13, 14, 15], 10, false)
    this.water.animations.add('up', [8, 9, 10, 11], 10, true)
    this.water.animations.play('down')
    this.water.direction = 'down'
    this.water.body.setSize(35, 150, 44, 173)

    this.button1 = new Button(this, 80, 380, '1_1_button', 90, this.switchGravity)
    this.button2 = new Button(this, 720, 100, '1_1_button', -90, this.switchGravity)
    this.player = new Player(this, 200, 300, 'player_1', 300, -600)
  }
  switchWater() {
    if (this.water.direction === 'down') {
      this.water.direction = 'up'
      this.water.animations.play('go_up')
      this.water.animations.currentAnim.onComplete.add(() => {
        this.water.animations.play('up')
      })
      this.water.body.setSize(35, 150, 44, 0)
    } else {
      this.water.direction = 'down'
      this.water.animations.play('go_down')
      this.water.animations.currentAnim.onComplete.add(() => {
        this.water.animations.play('down')
      })
      this.water.body.setSize(35, 150, 44, 173)
    }
  }
  switchGravity() {
    this.physics.arcade.gravity.y *= - 1
    this.player.jumpSpeed *= - 1
    this.switchWater()
    let ang = (this.player.angle + 180) % 360
    this.add.tween(this.player).to({angle: ang}, 500, Phaser.Easing.Cubic.Out, true)
  }
  collectKey() {
    this.door.unlock()
    this.key.destroy()
  }
  loop() {  }
}
