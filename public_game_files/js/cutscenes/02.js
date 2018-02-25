/* Klasse Cutscene 01 */
class Cutscene02 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level09', // nächstes Level
      6000       // Totaldauer
    )

    // Musik
    game.switchMusic('Labfight', 1)

    // Bild anzeigen
    this.createImage(this, 0, 0, 0, 7000, 'Cutscene02 Background')

    // Text anzeigen
    this.createText(
      this, 400, 470, 0, 7000, 'AND NOW IS MY CHANCE TO PROVE MYSELF', 32
    )

    // Name, kommt von der Seite, bleibt nach 600ms stehen
    var title = this.createImage(
      this, 100, 200, 0, 7000, 'Cutscene02 Title', 700, -50
    )
  }
}
