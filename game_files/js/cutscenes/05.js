/* Klasse Cutscene 05 */
class Cutscene05 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level16', // nächstes Level
      5000       // Totaldauer
    )

    // Texte
    this.createText(
      this, 400, 200, 0, 6000, 'It is not my fault\nthey all died!', 64
    )
    this.createText(this, 370, 380, 3000, 6000, 'Now go away!', 96)
  }
}
