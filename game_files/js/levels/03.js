class Level03 extends GameState {
  build() {
    this.setup(
      'Level03 Map',
      800, 2000,
      1300,
      50,
      'Level05',
      'Level03 Foreground',
      'Level03 Midground',
      'Level03 Background'
    )
    this.player = new Player(this, 225, 1850, 'Player 01', 300, -600, true)
    // Spieler soll sterben beim Verlassen des unteren Weltrandes, jedoch zum nächsten Level gehen beim Verlassen oben
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.y > 0) {
        this.killPlayer()
      } else {
        this.player.body.allowGravity = false // Spieler bleibt oben (verschwunden)
        this.goToNextLevel()
      }
    })
    // Wasseroberfläche als dynamisches Objekt mit Animation
    this.water = new DynamicGameObject(this, 120, 2100, 'Level03 Waves')
    this.water.animations.add('flowing', [0, 1, 2, 3, 4], 5, true)
    this.water.animations.play('flowing')
    // Wasser unterhalb Oberfäche separat, nicht animiert, als child damit Bewgung gleich
    this.water.addChild(new BasicGameObject(this, 0, 431, 'Level03 Water'))
    this.water.body.allowGravity = false // keine Schwerkraft
    this.water.body.velocity.y = - 40    // konstante Bewegung nach oben
    this.water.body.setSize(560, 100, 0, 50) // Hitbox verkleinert, 
  }
  loop() {
    // Kollision zwischen Wasser und Spieler überprüfen
    this.physics.arcade.overlap(this.player, this.water, this.player.damage, null, this)
  }
}
