/* Klasse Credits */
class Credits extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level09', // nächstes Level
      60000       // Totaldauer
    )

    this.createImage(this, 0, 0, 0, 20000, 'Credits Background')

    let logo =
      this.createImage(this, 200, 80, 50, 20000, 'Menu Logo', 4000, null, 500)

    logo.scale.setTo(3, 3)

    this.createText(this, 400, 400, 700, 19500, 'Created by Alex and Tim', 32)
  }
}
