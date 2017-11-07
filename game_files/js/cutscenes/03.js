/* Klasse Cutscene 03 */
class Cutscene03 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level14', // nächstes Level
      55000      // Totaldauer
    )

    // Feuer Hintergrund-Animations
    this.generateSequence(this, 0, [150, 150, 150, 150], 'Fire', 39)
    this.createImage(this, 0, 0, 23000, 29000, 'Cutscene03 Michael1')
    this.createImage(this, 0, 0, 28000, 14000, 'Cutscene03 Michael2')
    this.createImage(this, 0, 0, 51000, 5000, 'Cutscene03 Michael2')

    // Texte
    let txt1 =
      'I was able to create you by mixing\nelemental magic with human genes.'
    let txt2 = 'This enables you to shoot\nfire with '
    let txt3 = 'But it also makes you\nvulnerable to water.'
    let txt4 = 'If the fire inside you is\nextinguished, you will die.'
    let txt5 =
      'With that in mind, it is time for\nyou to embark on your mission!'
    let txt6 = 'I need to keep this short and\nit might sound confusing,'
    let txt7 = 'but I believe that we are\nstuck inside a video game!'
    let txt8 = 'This means that all our data of\nour world is saved somewhere.'
    let txt9 = 'I need you to go find the place, and reset every-\nthing back to when the world was still healthy.'
    let txt10 = 'Good luck out there!'

    // Texte
    this.createText(this, 400, 440, 0, 6000, txt1, 32)
    this.createText(this, 400, 440, 12000, 6000, txt3, 32)
    this.createText(this, 400, 440, 18000, 5000, txt4, 32)
    this.createText(this, 400, 440, 23000, 5000, txt5, 32)
    this.createText(this, 400, 440, 28000, 5000, txt6, 32)
    this.createText(this, 400, 460, 33000, 5000, txt7, 48)
    this.createText(this, 400, 440, 38000, 5000, txt8, 32)
    this.createText(this, 400, 440, 43000, 8000, txt9, 32)
    this.createText(this, 400, 440, 51000, 5000, txt10, 64)

    // zweiter Text abhängig vom Gerättyp
    if (game.isArcade) {
      this.createText(this, 400, 420, 6000, 6000, txt2 + 'the red button.', 32)
    } else {
      this.createText(this, 400, 440, 6000, 6000, txt2 + 'the shift key.', 32)
    }
  }
}
