class Cutscene02 extends Cutscene {
  create() {
    this.setup(
      this,
      'Level09',
      6000
    )
    // (context, x, y, delay, duration, velocityX, velocityY, sprite/text)
    this.createImage(this, 0, 0, 0, 7000, 0, 0, 'Cutscene02 Background')
    this.createText(this, 400, 470, 0, 7000, 'AND NOW IS MY CHANCE TO PROVE MYSELF', 32)
    var title = this.createImage(this, -200, 200, 0, 7000, 400, 0, 'Cutscene02 Title')
    setTimeout(() => { title.body.velocity.x = 0 }, 600)
  }
}
