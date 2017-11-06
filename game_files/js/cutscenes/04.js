/* Klasse Cutscene 04 */
class Cutscene04 extends Cutscene {
  create() {
    this.setup(
      this,      // Kontext-Übergabe an parent-Objekt
      'Level07', // nächstes Level
       67000     // Totaldauer
    )

    // Hintergrund
    this.add.sprite(0, 0, 'Cutscene04 Background')

    // Raphael-Charakter, mit Animation
    this.raphael = this.add.sprite(350, 197, 'Cutscene04 Raphael')
    this.raphael.animations.add(
      'idle',
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      3,
      true
    )
    this.raphael.animations.play('idle')

    // Sprechblase, zuerst nicht zu sehen
    this.bubble = this.add.sprite(435, 325, 'Cutscene04 Speechbubbles', 0)
    this.bubble.anchor.setTo(0, 1)
    this.bubble.scale.setTo(0, 0)

    // Zeiten für einzelne Texte
    this.time.events.add(4000, this.openBubble, this, 0)
    this.time.events.add(8000, this.closeBubble, this)
    this.time.events.add(9000, this.openBubble, this, 1)
    this.time.events.add(13000, this.closeBubble, this)
    this.time.events.add(14000, this.openBubble, this, 2)
    this.time.events.add(18000, this.closeBubble, this)
    this.time.events.add(19000, this.openBubble, this, 3)
    this.time.events.add(24000, this.closeBubble, this)
    this.time.events.add(25000, this.openBubble, this, 4)
    this.time.events.add(29000, this.closeBubble, this)
    this.time.events.add(30000, this.openBubble, this, 5)
    this.time.events.add(35000, this.closeBubble, this)
    this.time.events.add(36000, this.openBubble, this, 6)
    this.time.events.add(40000, this.closeBubble, this)
    this.time.events.add(44000, this.openBubble, this, 7)
    this.time.events.add(49000, this.closeBubble, this)
    this.time.events.add(50000, this.openBubble, this, 8)
    this.time.events.add(54000, this.closeBubble, this)
    this.time.events.add(55000, this.openBubble, this, 9)
    this.time.events.add(59000, this.closeBubble, this)
    this.time.events.add(60000, this.openBubble, this, 10)

    // Spieler, nur als Grafik, nicht interagierbar
    this.player = this.add.sprite(100, -100, 'Player 01', 17)
    this.player.animations.add('idle', [10, 11, 12, 13], 5, true)
    this.add.tween(this.player.position)
      .to({x: 100, y: 348}, 3000, Phaser.Easing.Bounce.Out, true)

    // Variablen um rictige Grafik anzuzeigen
    this.player.prevY = -50
  }

  // Funktion um Sprechblase zu öffnen
  openBubble(n) {
    this.bubble.frame = parseInt(n)
    this.add.tween(this.bubble.scale)
      .to({x: 1, y: 1}, 500, Phaser.Easing.Cubic.Out, true)
  }

  // Funktion um Sprechblase zu schliessen
  closeBubble() {
    this.add.tween(this.bubble.scale)
      .to({x: 0, y: 0}, 300, Phaser.Easing.Cubic.Out, true)
  }

  // Schleife, richtige Grafik für Spieler anzeigen
  update() {
    var n = ~~(this.player.position.y - this.player.prevY)
    if (n === 0) {
      this.player.animations.play('idle')
    } else if (n > 0) {
      this.player.frame = 17
    } else if (n < 0) {
      this.player.frame = 15
    }
    this.player.prevY = this.player.position.y
  }
}
