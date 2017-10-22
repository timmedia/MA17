class Cutscene01 extends Cutscene {
  create() {
    this.setup(
      this,
      'Menu',
      9800
    )
    // (context, x, y, delay, duration, velocityX, velocityY, sprite/text)
    this.generateSequence(this, 0, [3000, 3000, 300, 100, 100, 100, 100, 100, 4000], 'Urielle')
    this.createText(this, 400, 470, 0, 3000, 'I KNOW YOU ARE JUST ONE OF MICHAELS CRUEL EXPERIMENTS', 24)
    this.createText(this, 400, 470, 3000, 3000, 'BUT YOU STILL BELONG TO THE CHILDREN OF FIRE....', 24)
    this.createText(this, 400, 470, 6300, 4500, 'AND NEED TO BE STOPPED', 64)
  }
}
