/* Klasse Level 06 */
class Level06 extends GameState {
  build() {
    this.setup(
      'Level06 Map',       // Karte
      6420, 480,           // Kartengrösse
      1300,                // Gravitation
      'Level11',           // nächstes Level
      'Debug empty10x10',  // Vordergrund-Bild
      'Level06 Midground', // Mittelgrund-Bild
      'Level06 Background',// Hintergrund-Bild
      'green'              // Akzentfarbe
    )


    // Andere Musik
    game.switchMusic('Level06', 1)

    // Grafik für geöffnete (!) Tür am Ende des Levels
    this.door = new StaticGameObject(this, 6190, 440, 'Level06 Door')
    this.door.alpha = 0 // Standardgemöss verschlossen
    // Funktion um Türe zu öffnen, wird bei Kollision mit Spieler abgerufen
    this.door.reveal = () => {
      // Soll nur erscheinen falls nicht scho erschienen
      if (this.door.alpha === 0) {
        // Übergang von durchsichtig zu sichtbar während 1s
        this.add.tween(this.door)
          .to({alpha: 1}, 1000, Phaser.Easing.Cubic.Out, true)
      } else if (this.door.alpha === 1) {
        // Türe wurde schon geöffnet, nächstes Level darf gestartet werden
        return true
      }
      // Türe noch nicht offen
      return false
    }

    // Spielcharakter
    this.player = new Player(
      this, 525, 350, 'Player 01', 300, -650, true, false, true
    )

    // Stacheldrähte in Gruppe, nur Hitbox für Kollision, Grafik ist schon im
    // Mittelgrund vorhanden
    this.wire = this.game.add.group()
    let wire1 = new StaticGameObject(this, 1070, 400)
    wire1.body.setSize(270, 70, 0, 0) // Grösse der Hitbox
    this.wire.add(wire1)
    let wire2 = new StaticGameObject(this, 2530, 380)
    wire2.body.setSize(370, 90, 0, 0) // Grösse der Hitbox
    this.wire.add(wire2)

    // Stacheldraht-Gruppe soll bei Kollision Spieler schaden
    this.damagePlayerList.push(this.wire)

    // Gegner, in Gruppe
    this.enemies = this.game.add.group()
    // Koordinaten der Gegener, an jeder Koordinate wird ein Gegner erstellt
    let coords = [
      [2155, 150],
      [2420, 300],
      [2585, 200],
      [2780, 260],
      [3540, 160],
      [5125, 230],
      [5960, 440]
    ]

    // Gegner an allen Koordinaten erstellen
    for (let i in coords) {
      this.enemies.add(
        new Enemy(this, coords[i][0], coords[i][1], 'Level06 Guard')
      )
    }
    // Gegener wird aktiviert (siehe 'class Enemy' unten)
    this.enemies.forEach((child) => { child.start() })
  }

  // Update-Schleife
  loop() {
    // Überprüfen ob Schüsses des Spielers einen Gegner treffen
    this.physics.arcade.overlap(
      this.enemies,
      this.player.bullets,
      // Soll nur eine Auswirkung haben falls Gegner noch nicht getroffen wurde
      (enemy, bullet) => {
        return enemy.alive
      },
      // Noch nicht getroffen
      (enemy, bullet) => {
        bullet.kill() // Kugel verschwindet
        enemy.alive = false // Gegner deaktiviert (kann nicht mehr schiessen)
        // Gegner schwarz und transparent (während 800ms), wird danach gelöscht
        this.add.tween(enemy).to({tint: 0, alpha: 0}, 800, Phaser.Easing.Cubic.Out, true)
        this.time.events.add(800, () => {
          enemy.kill()
        })
      }
    )
    // Falls Spieler die Türe berührt erscheint die Grafik der geöffneten Türe
    this.physics.arcade.overlap(
      this.player,
      this.door,
      this.door.reveal,
      this.goToNextLevel,
      this
    )
  }
}

// Klasse eines Gegeners, wird nur in diesem Level verwendet
// Erbt Eigenschaft von 'StaticGameObject' (hat Physik, aber keine Bewegung)
class Enemy extends StaticGameObject {
  constructor(context, x, y, key) {
    super(context, x, y, key)
    // Standardgemäss 2. Frame vom Spritesheet anzeigen
    this.frame = 1
    // Ankerpunk horizontal mittig damit Pos. beim Drehen (spiegeln) gleich ist
    this.anchor.setTo(0.5, 1)
    // Schüsse (Pfeile als Gruppe, 20x gleicher Pfeil)
    this.bullets = context.game.add.group()
    this.bullets.enableBody = true
    this.bullets.createMultiple(20, 'Level06 Arrow')
    // Beim verlassen des Spielfeldes unten wird der Pfeil gelöscht
    this.bullets.callAll(
      'events.onOutOfBounds.add',
      'events.onOutOfBounds',
      (bullet) => {if (bullet.y > 480) bullet.kill()}
    )
    this.bullets.setAll('checkWorldBounds', true)
    // wenn aktiv: Winkel gemäss Geschwindigkeit (Arctan)
    this.bullets.forEach((bullet) => {
      bullet.alreadyHit = false
      bullet.update = () => {
        // Winkel durch Arcus-Tangens von Geschwindigkeit in X- & Y-Richtung
        if (bullet.alive) {
          bullet.angle = Math.atan(
            bullet.body.velocity.y / bullet.body.velocity.x
          ) * 57 // 180 / 3.14 ist etwa 57
        }
      }
    })
    // Funktion um Gegner zu aktivieren
    this.start = () => {
      this.loop = setInterval(() => {
        // kann nur Schiesesen wenn noch nicht tod
        if (this.alive) {
          // kann nur schiessen falls im Kamerabereich
          if (this.inCamera) {
            // Geschwindigkeit des Schusses zufällig
            let x = Math.random()
            if (x < 0.6) this.shoot(context, x)
          }
        } else {
          // Gegner tod, Schleife soll beendet werden
          clearInterval(this.loop)
        }
      }, 900 + Math.random() * 200)
    }

    // Überprüfen ob Pfeile Spieler treffen
    this.update = () => {
      context.physics.arcade.overlap(this.bullets, context.player,
          (bullet, player) => {
          // nur im ersten Berührungsmoment soll Pfeil Schaden ausüben
          if (bullet.body.wasTouching.none) {
            context.player.damage.call(context, context.player, 1.5)
          }
        }
      )
    }
  }

  // Funktion um Schuss auf Spieler abzufeuern
  shoot(context, duration) {
    // ein deaktiviertes Pfeil-Element aus der Gruppe wird genommen
    var bullet = this.bullets.getFirstExists(false)
    // falls Pfeil vorhanden (sind schon 20 unterwegs gibt es keine mehr)
    if (bullet) {
      // hat Spieler noch nicht getroffen
      bullet.alreadyHit = false
      // Dauer bis Spieler an aktueller Position getroffen
      var dt = duration * 2 + 0.2
      // Ursprungsposition des Pfeiles
      var selfY = this.position.y - this.body.height / 2
      var selfX
      // Ursprungs-X-Pos. je nachdem ob Spieler links oder rechts vom Gegner ist
      if (this.position.x < context.player.x) {
        // Spieler ist rechts
        this.scale.x = -1   // Gegner dreht sich um
        bullet.scale.x = -1 // Pfeil in umgekehrte Richtung
        selfX = this.position.x + 20
      } else {
        // Spieler genau unterhalb oder links
        this.scale.x = 1
        bullet.scale.x = 1
        selfX = this.position.x - 20
      }
      // Pfeil an Startposition gesetzt
      bullet.reset(selfX, selfY)
      // Gschwindigk., damit Pfeil während Zeit dt bei Spielerposition ankommt
      bullet.body.velocity.x = (context.player.position.x - selfX) / dt
      bullet.body.velocity.y = (context.player.position.y - selfY -
        context.physics.arcade.gravity.y * dt * dt * 0.5) / dt

      // Passendes Frame des Gegners (Schuss nach unten / gerade / oben)
      let ratio = bullet.body.velocity.y / bullet.body.velocity.x
      if (ratio > 0.5) {
        this.frame = 2
      } else if (ratio < -0.5) {
        this.frame = 0
      } else {
        this.frame = 1
      }
    }
  }
}
