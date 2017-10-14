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
    this.player = new Player(this, 225, 350, 'Player 01', 300, -650)
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)

    this.wire = this.game.add.group()
    let wire1 = new StaticGameObject(this, 1070, 350)
    wire1.body.setSize(270, 120, 0, 0)

    this.wire.add(wire1)
    let wire2 = new StaticGameObject(this, 2530, 380)
    wire2.body.setSize(370, 90, 0, 0)
    this.wire.add(wire2)

    this.damagePlayerList.push(this.wire)

    this.wire.enableBodyDebug = true
  }
  loop() {
    self = this
  }
  render() {
    game.debug.body(this.wire.children[0])
    game.debug.body(this.wire.children[1])
  }
}
