class Level08 extends GameState {
  build() {
    // Initialisierung der Ebene
    this.setup(
      'Level08 Map',
      3720,
      480,
      1300,
      50,
      'Cutscene02',
      'Level08 Foreground',
      'Level08 Midground',
      'Level08 Background'
    )
    this.player = new Player(this, 400, 405, 'Player 01', 250, -600, true)
    this.enemy = new StaticGameObject(this, 3500, 450, 'Level08 17')
    this.enemy.body.setSize(50, 480, -300, -380)
    this.enemy.animations.add('idle', [24, 25, 26, 27], 5, true)
    this.enemy.animations.play('idle')
    this.enemy.activated = false
    this.speechbubble = this.add.sprite(3505, 390, 'Level08 Speechbubbles')
    this.speechbubble.anchor.setTo(1, 1)
    this.speechbubble.scale.setTo(0, 0)
  }
  loop() {
    this.physics.arcade.overlap(
      this.player,
      this.enemy,
      (player, enemy) => {
        enemy.activated = true
        setTimeout(() => {
          player.body.moves = false
          player.scale.x = 1
          player.update = () => {}
          player.animations.play('idle')
          this.enemyTalk()
        }, 200)
      },
      (player, enemy) => {
        return !enemy.activated
      }
    )
  }
  openBubble(context, frame, duration) {
    context.speechbubble.frame = frame
    context.add.tween(context.speechbubble.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.Out, true)
    setTimeout(context.closeBubble, duration, context)
  }
  closeBubble(context) {
    context.add.tween(context.speechbubble.scale).to({x: 0, y: 0}, 300, Phaser.Easing.Quadratic.Out, true)
  }
  enemyTalk() {
    this.openBubble(this, 0, 1800)
    setTimeout(this.openBubble, 2500, this, 1, 3400)
    setTimeout(this.openBubble, 6400, this, 2, 3900)
    setTimeout(this.openBubble, 13000, this, 3, 3900)
    setTimeout(this.openBubble, 18000, this, 4, 4100)
    setTimeout(this.openBubble, 23000, this, 5, 3600)
    setTimeout(this.openBubble, 27000, this, 6, 2500)
    setTimeout(() => {
      this.goToNextLevel()
    }, 30000)
  }
}
