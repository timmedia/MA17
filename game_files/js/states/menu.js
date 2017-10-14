class Menu extends Phaser.State {
  create() {
    let background = this.add.sprite(0, 0, 'Menu Background')
    this.lights = this.add.sprite(174, 308, 'Menu Lights')
    let michael = this.add.sprite(310, 318, 'Menu Michael')
    michael.animations.add('idle', [0, 1, 2, 3], 2, true)
    michael.animations.play('idle')
    this.vignette = this.add.sprite(0, 0, 'Menu Vignette')
    this.logo = this.add.sprite(70, 287, 'Menu Logo')
    this.logo.alpha = 0.8
    let copyright = this.add.sprite(586, 20, 'Menu Copyright')

    this.buttonPlay = this.add.button(108, 93, 'Menu Play', this.startGame, this)
    this.buttonPlay.alpha = 1
    this.buttonPlay.selected = true
    this.buttonPlay.events.onInputOver.add(this.selectButton, this, null, true)

    this.buttonLead = this.add.button(108, 169, 'Menu Leaderboard', this.startLead, this)
    this.buttonLead.alpha = 0.5
    this.buttonLead.selected = false
    this.buttonLead.events.onInputOver.add(this.selectButton, this, null, false)

    this.arrow = this.add.sprite(72, 94, 'Menu Arrow')

    controls.right.onDown.add(this.switchSelected, this)
    controls.left.onDown.add(this.switchSelected, this)
    controls.up1.onDown.add(this.startSelected, this)
    controls.up2.onDown.add(this.startSelected, this)

    this.lights.flicker = () => {
      let x = Math.random() > 0.93 // Häufigkeit (~7%)
      if (x) {                     // Soll flickers
        this.lights.alpha = 0.2
        this.vignette.alpha = 1
        this.logo.alpha = 0.4
      } else {                     // Soll nicht flickern
        this.lights.alpha = 1
        this.vignette.alpha = 0.95
        this.logo.alpha = 0.8
      }
      setTimeout(this.lights.flicker, 100)
    }
    this.lights.flicker()

  }
  selectButton(arg) {
    if (arguments[2] || arg === 'play') {
      this.buttonPlay.alpha = 1
      this.buttonPlay.selected = true
      this.buttonLead.alpha = 0.5
      this.buttonLead.selected = false
      this.arrow.position.setTo(72, 94)
    } else {
      this.buttonPlay.alpha = 0.5
      this.buttonPlay.selected = false
      this.buttonLead.alpha = 1
      this.buttonLead.selected = true
      this.arrow.position.setTo(72, 170)
    }
  }
  switchSelected() {
    if (this.buttonPlay.selected) {
      this.selectButton('lead')
    } else {
      this.selectButton('play')
    }
  }
  startSelected() {
    if (this.buttonPlay.selected) {
      this.startGame()
    } else {
      this.startLead()
    }
  }
  startGame() {
    game.state.start('Tutorial')
  }
  startLead() {
    console.log('Leaderboard started')
  }
  update() {
    self = this
  }
}
