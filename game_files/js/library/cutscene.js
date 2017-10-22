class Cutscene extends Phaser.State {
  setup(context, nextLevel, duration) {
    this.frames = frames // Array mit allen frames
    setTimeout(() => {
      var fade = this.add.sprite(0, 0, 'Blackscreen')
      fade.bringToTop()
      fade.alpha = 0
      context.add.tween(fade).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true)
      setTimeout(() => {
        context.state.start(nextLevel)
      }, 1000)
    }, duration)
  }
  createImage(context, x, y, delay, duration, velocityX, velocityY, sprite) {
    var image = context.add.sprite(x, y, sprite)
    image.visible = false
    if (velocityX || velocityY) {
      context.physics.arcade.enable(image)
      image.body.allowGravity = false
    }
    setTimeout(() => {
      image.visible = true
      if (velocityX || velocityY) image.body.velocity.setTo(velocityX || 0, velocityY || 0)
    }, delay)
    setTimeout(() => {
      image.kill()
    }, delay + duration)
    return image
  }
  createText(context, x, y, delay, duration, text, size) {
    let image = context.add.bitmapText(x, y, 'Small White', text, size || 16)
    image.anchor.setTo(0.5, 1)
    image.visible = false
    setTimeout(() => {
      image.visible = true
    }, delay)
    setTimeout(() => {
      image.kill()
    }, delay + duration)
    return image
  }
  generateSequence(context, initialDelay, durationArray, spriteGroup) {
    var delays = [0]
    for (let i = 0; i < durationArray.length; i++) {
      delays.push(delays[i] + durationArray[i])
      this.createImage(
        context,                                                                // Übergabe Kontext
        0, 0,                                                                   // x|y Koordinaten, hier 0|0
        initialDelay + delays[i],                                               // Verzögerung der Anzeige
        durationArray[i],                                                       // Länge der Anzeige
        null, null,                                                             // keine Bewegung
        'Sequence ' + spriteGroup + ' ' + (i + 1).toString()                    //
      )
    }
  }
}
