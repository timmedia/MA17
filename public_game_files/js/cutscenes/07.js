/* Klasse Cutscene 07 */
class Cutscene07 extends Cutscene {
  create() {
    this.setup(
      this,        // Kontext-Übergabe an parent-Objekt
      'EnterName', // nächstes Level
      6000         // Totaldauer
    )
    this.createImage(this, 0, 0, 0, 8000, 'Cutscene07 Background')

  }
}
