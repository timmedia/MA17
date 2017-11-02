class Cutscene extends Phaser.State {
  setup(context, nextLevel, duration) { // Argumente
    this.time.events.add(duration, () => {
      this.camera.fade(0x000000, 1000) // Bildschirm wird schwarz (Farbe, Dauer)
      // nach Fade soll nächstes Level starten
      this.time.events.add(1000, () => { context.state.start(nextLevel) })
    })
  }

  // Funktion um Bild zu erstellen
  // 'tween': Hineinfliegen (Dauer, Anfangs-x-pos, Anfangs-y-pos.)
  createImage(context, x, y, delay, duration, sprite, tweenT, tweenX, tweenY) {
    var image = context.add.sprite(x, y, sprite) // Bild als Sprite-Objekt
    image.visible = false                        // nicht sichtbar
    // Bild erscheinen lassen
    context.time.events.add(delay, () => {
      image.visible = true
      if (tweenT) {
        // Bild soll bewegt reinkommen
        image.position.setTo(tweenX || x, tweenY || y)
        context.add.tween(image)
          .to({x: x, y: y}, tweenT, Phaser.Easing.Cubic.Out, true)
      }
    })
    // Bild nach Anzeigedauer löschen
    context.time.events.add(delay + duration, () => {
      image.kill()
    })
    return image
  }

  // Text erstellen
  createText(context, x, y, delay, duration, text, size) {
    // Text als Bild ab Bitmap-Schriftart
    let image = context.add.bitmapText(x, y, 'Small White', text, size || 16)
    image.anchor.setTo(0.5, 1) // Ankerpunkt unten mittig
    image.visible = false      // Anfangs nicht sichtbar
    context.time.events.add(delay, () => {
      image.visible = true     // Sichtbar nach angegebener Verzögerung
    })
    context.time.events.add(delay + duration, () => {
      image.kill()  // Löschen nach anzeigedauer
    })
    return image
  }

  // Bildabfolge erstellen (Kontext, Delay bis zum ersten Bild, Liste mit allen
  // Anzeigedauern, Key der Grafikgruppe)
  generateSequence(context, initialDelay, durationArray, spriteGroup) {
    var delays = [0] // Liste mit allen Verzögerungen (später ab Anzeigedauern)
    for (let i = 0; i < durationArray.length; i++) {
      delays.push(delays[i] + durationArray[i])
      this.createImage(
        context,                  // Übergabe Kontext
        0, 0,                     // x|y Koordinaten, hier 0|0
        initialDelay + delays[i], // Verzögerung der Anzeige
        durationArray[i],         // Länge der Anzeige
        'Sequence ' + spriteGroup + ' ' + (i + 1).toString() // Key der Grafik
      )
    }
  }
}
