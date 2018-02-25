/* Klasse Cutscene 06 */
class Cutscene06 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level18', // nächstes Level
      14200      // Totaldauer
    )

    // Bilder werden nacheinander angezeigt
    this.createImage(this, 0, 0, 0, 2000, 'Sequence Gus 1')
    this.createImage(this, 0, 0, 2000, 2000, 'Sequence Gus 2')
    this.createImage(this, 0, 0, 4000, 1000, 'Sequence Gus 1')
    this.createImage(this, 0, 0, 5000, 1000, 'Sequence Gus 2')
    this.createImage(this, 0, 0, 6000, 200, 'Sequence Gus 3')
    this.createImage(this, 0, 0, 6200, 200, 'Sequence Gus 2')
    this.createImage(this, 0, 0, 6400, 200, 'Sequence Gus 3')
    this.createImage(this, 0, 0, 6600, 200, 'Sequence Gus 2')
    this.createImage(this, 0, 0, 6800, 200, 'Sequence Gus 3')

    this.createImage(this, 0, 0, 7000, 2000, 'Sequence Gus 5')
    this.createImage(this, 0, 0, 9000, 2000, 'Sequence Gus 4')
    this.createImage(this, 0, 0, 11000, 1000, 'Sequence Gus 5')
    this.createImage(this, 0, 0, 12000, 1000, 'Sequence Gus 4')
    this.createImage(this, 0, 0, 13000, 200, 'Sequence Gus 6')
    this.createImage(this, 0, 0, 13200, 200, 'Sequence Gus 4')
    this.createImage(this, 0, 0, 13400, 200, 'Sequence Gus 6')
    this.createImage(this, 0, 0, 13600, 200, 'Sequence Gus 4')
    this.createImage(this, 0, 0, 13800, 200, 'Sequence Gus 6')
    this.createImage(this, 0, 0, 14000, 200, 'Sequence Gus 4')
  }
}
