  /* Klasse Cutscene 01 */
class Cutscene01 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level12', // nächstes Level
      9800       // Totaldauer
    )

    // Anzuzeigende texte
    let txt1 = 'I KNOW YOU ARE JUST ONE OF MICHAELS CRUEL EXPERIMENTS'
    let txt2 = 'BUT YOU STILL BELONG TO THE CHILDREN OF FIRE....'
    let txt3 = 'AND NEED TO BE STOPPED'

    // Bildsequenz erzeugen
    // (context, x, y, delay, duration, velocityX, velocityY, sprite/text)
    this.generateSequence(
      this, 0, [3000, 3000, 300, 100, 100, 100, 100, 100, 4000], 'Urielle'
    )

    // Text-Objekte erzeugen
    this.createText(this, 400, 470, 0, 3000, txt1, 24)
    this.createText(this, 400, 470, 3000, 3000, txt2, 24)
    this.createText(this, 400, 470, 6300, 4500, txt3, 64)

    // Name kommt von der Seite (nach 6s kommt Bild hineingeflogen, nach 750ms
    // bleibt es dann stehen)
    var title = this.createImage(
      this, 500, 240, 0, 11000, 'Cutscene01 Title', 700, 850
    )
  }
}
