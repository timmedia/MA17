/* Klasse Level 09 */
class Level09 extends GameState {
  build() {
    // Initialisierung der Ebene
    this.setup(
      'Level09 Map',        // Karte
      5000, 480,            // Weltgrösse (x) wird später bestimmt
      1300,                 // Gravitation
      'Level17',               // nächstes Level
      'Level08 Foreground', // Vordergrund-Bild
      'Level08 Midground',  // Mittelgrund-Bild
      'Level08 Background'  // Hintergrund-Bild
    )

    // Spieler, soll mit Weltrand kollidieren
    this.player = new Player(this, 2400, 405, 'Player 01', 250, -600, null, null, true)
    this.player.checkWorldBounds = true
    this.player.body.collideWorldBounds = true

    // Gegner, soll auch mit Weltrand kollidieren
    this.enemy = new DynamicGameObject(this, 2720, 445, 'Level08 17')
    this.enemy.checkWorldBounds = true
    this.enemy.body.collideWorldBounds = true

    // Animationen des Gegners, Grafiken für Links / Rechts unterschiedlich
    this.enemy.animations.add(
      'walk left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true
    )
    this.enemy.animations.add(
      'walk right', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true
    )
    this.enemy.animations.add('idle right', [20, 21, 22, 23], 5, true)
    this.enemy.animations.add('idle left', [24, 25, 26, 27], 5, true)
    this.enemy.animations.add('jump start right', [28], 10, false)
    this.enemy.animations.add('jump up right', [29], 10, true)
    this.enemy.animations.add('jump top right', [30], 5, false)
    this.enemy.animations.add('jump down right', [31], 10, true)
    this.enemy.animations.add('jump landed right', [32], 5, false)
    this.enemy.animations.add('jump start left', [33], 10, false)
    this.enemy.animations.add('jump up left', [34], 10, true)
    this.enemy.animations.add('jump top left', [35], 5, false)
    this.enemy.animations.add('jump down left', [36], 10, true)
    this.enemy.animations.add('jump landed left', [37], 5, false)
    this.enemy.animations.add('shoot right', [38, 39, 40], 8, false)
    this.enemy.animations.add('shoot left', [41, 42, 43], 8, false)

    this.enemy.delay = 1000 // Anfangsverzögerung des Gegners [ms]
    this.enemy.dir = 'left' // Richtung, für Animationen später
    this.enemy.hp = 15      // Anzahl (halbe) Herzen

    // Health-Anzeige des Gegners
    this.enemy.addChild(this.add.sprite(5, -80, 'General Healthbar'))

    // Feuerkugeln des Gegeners, gleiche Funktionsweise wie beim Spieler
    this.enemy.bullets = this.game.add.group()
    this.enemy.bullets.enableBody = true // Physik soll aktiviert sein
    this.enemy.bullets.createMultiple(20, 'General Fireball') // Grafik
    this.enemy.bullets.setAll('checkWorldBounds', true) // nur im Kamerabereich
    // Deaktivierung beim Verlassen des sichtbaren Bereichs
    this.enemy.bullets.callAll(
      'events.onOutOfBounds.add', 'events.onOutOfBounds', (bullet) => {
        bullet.kill()
      }
    )
    this.enemy.bullets.setAll('body.allowGravity', false) // keine Schwerkraft

    // Funktion um zu Schiessen, ähnlich wie beim Spieler
    this.enemy.shoot = () => {
      if (this.enemy.hp < 0) return // Soll nicht schiessen falls 0 Herzen übrig
      this.time.events.add(this.enemy.delay, () => {
        // Kugel aus Objektgruppe
        var bullet = this.enemy.bullets.getFirstExists(false)
        // Animation, hiernach soll Kugel (200ms verzögert) erscheinen
        this.enemy.animations.play('shoot ' + this.enemy.dir)
        this.time.events.add(200, () => {
          // Falls Kugel vorhaden (max 20 vorhanden)
          if (bullet) {
            // Position von Kugel leicht von Spielerkoordinaten versetzt
            bullet.reset(this.enemy.position.x + 10, this.enemy.position.y - 55)
            // Geschwindigkeit ist die des Spielers + 500 in Laufrichtung
            // this.scale.x sagt aus, in welche Richtung der Spieler sich bewegt
            bullet.body.velocity.x = (this.enemy.dir === 'left')
              ? this.enemy.body.velocity.x - 500
              : this.enemy.body.velocity.x + 500
          }
        })
      })
    }

    // Gegner soll ab und zu (1-2s Abstand) selber Schiessen
    this.enemy.randomShoot = () => {
      this.enemy.shoot()
      let delay = Math.random() * 4500 + 500
      this.time.events.add(delay, this.enemy.randomShoot)
    }
    this.enemy.randomShoot()

    // Funktion um Gegner zu schaden
    this.enemy.damage = () => {
      this.enemy.hp -= 1             // ein halbes Herz wird abgezogen
      if (this.enemy.hp < 0) {
        // Kein Leben mehr, Gegnet stirbt
        this.enemy.death()
        return
      }
      this.enemy.delay -= 60         // Verzögerung wird reduziert
      this.enemy.tint = 0xFF0000     // rote Tönung
      // Breite der Health-Anzeige (40px ist volle Breite, +1 da sonst bei 0
      // Herzen Division durch 0 wäre)
      this.enemy.children[0].width = 40 / 20 * (this.enemy.hp + 1)
      // Tönung geht während 250ms wieder weg
      this.add.tween(this.enemy).to(
        {tint: 0xFFFFFF}, 250, Phaser.Easing.Cubic.Out, true
      )
    }

    // Gegner stirbt
    this.enemy.death = () => {
      this.enemy.children[0].width = 0 // Health-Anzeige verschwindet
      this.player.body.moves = false   // Spieler kann sich nicht bewegen
      this.enemy.body.moves = false    // Gegner kann sich nicht bewegen
      // Farbeffekt, Tönung geht zu schwarz (5s)
      this.add.tween(this.enemy).to(
        {tint: 0x000000}, 5000, Phaser.Easing.Cubic.Out, true
      )
      // Nach Farbeffekt stirbt Gegner endgültig
      this.time.events.add(5000, () => {
        this.camera.shake() // Kamera zittert
        // Kamera kann sich wieder mit Spieler bewegen
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
        this.world.setBounds(0, 0, 6000, 480) // Welt vergrössert
        this.player.body.moves = true         // Spieler bewegbar
        this.player.body.velocity.y = -50     // mini Sprung -> Animation reset
        this.enemy.kill()                     // Gegner wird gelöscht
      })
    }

    // Gegner soll auch (verzögert) schiessen
    controls.shift.onDown.add(this.enemy.shoot, this.enemy.delay)

    // Grösse der Welt & Positionierung der Kamera
    this.world.setBounds(0, 0, 3020, 480)
    this.camera.setPosition(2620, 0)
  }

  // Spiel-Schleife
  loop() {
    // Gegner Kollision mit Level (geht nicht über collideLayerList da er sonst
    // auch mit dem Spieler kollidiern würde)
    this.physics.arcade.collide(this.layer, this.enemy)
    // Kollsion Spieler und Kugeln vom Gegner
    this.physics.arcade.overlap(this.player, this.enemy.bullets,
      (player, bullet) => {
        // Kollision: Kugel verschwindet, Spieler nimmmt 3x 0.5 Herzen Schaden
        bullet.kill()
        this.player.damage.call(this, this.player, 1)
      }, null, this
    )
    // Kollision Gegner und Kugeln vom Spieler
    this.physics.arcade.overlap(this.enemy, this.player.bullets,
      (enemy, bullet) => {
        // Kollision: Kugel verschwindet, Gegner nimmt Schaden
        bullet.kill()
        this.enemy.damage()
      }
    )
    // Verzögerung der Bewegungen des Gegners
    this.delayEnemyVelocity(
      this.player.body.velocity.x, this.player.body.velocity.y
    )
    // Passende Animation für den Gegner anzeigen
    this.renderEnemy()

    if (this.player.position.x > 3500) this.goToNextLevel()
  }

  // Gegener: Bewegungen des Spielers verzögert kopieren
  delayEnemyVelocity(vx, vy) {
    this.time.events.add(this.enemy.delay, () => {
      // Geschwindigkeiten übernehmen, an y-Achse gespiegelt
      this.enemy.body.velocity.x = -vx
      this.enemy.body.velocity.y = vy
    })
  }

  // Animation für Gegner berechnen
  renderEnemy() {
    var dir = this.enemy.dir // Abkürzung aktuelle Richtung
    var x = this.enemy.position.x  // aktuelle x-Position
    var y = this.enemy.position.y  // aktuelle y-Position
    var vx = this.enemy.body.velocity.x // Aktuelle Geschwindigkeit (x-Richtung)
    var vy = this.enemy.body.velocity.y // Aktuelle Geschwindigkeit (y-Richtung)
    // Unterschied Abstand im Vergleich zum vorherigen durchlaufen
    // (this.enemy.position.x und this.enemy.body.x sind leicht verschoben)
    var dx = ~~(this.enemy.body.prev.x - this.enemy.body.x)
    var dy = ~~(this.enemy.body.prev.y - this.enemy.body.y)

    // Richtungsänderung, keine Geschwindigkeit = keine Änderung
    if (vx > 0) {
      this.enemy.dir = 'right'
    } else if (vx < 0) {
      this.enemy.dir = 'left'
    }

    if (y === 450) {   // y = 450 heisst Gegner ist am Boden (vgl. grounded)
      if (vy === 0) {
        if (dx != 0) {
          // Laufanimation falls am Boden & keine vertikale Bewegung
          this.enemy.animations.play('walk ' + dir)
        } else {
          // 'idle' Animation soll warten fall Schuss-Animation gerade läuft
          let currentAnim = this.enemy.animations.currentAnim.name
          if (currentAnim === 'shoot ' + this.enemy.dir) {
            this.enemy.animations.currentAnim.onComplete.add(() => {
              this.enemy.animations.play('idle ' + dir)
            })
          } else {
            // Keine Schuss-Animation, keine Bewegung
            this.enemy.animations.play('idle ' + dir)
          }
        }
      }
    } else { // Gegner ist nicht am Boden
      if (dy === 0) {
        // keine vertikale Bewegung, Gegner ist am höchsten Punkt
        this.enemy.animations.play('jump top ' + dir)
      } else if (vy < 0) {
        // Gegner bewegt sich nach oben
        this.enemy.animations.play('jump up ' + dir)
      } else if (vy > 0) {
        // Gegner bewegt sich nach unten, delay da sonst Animation für höchsten
        // Punkt zu kurz erscheinen würde
        this.enemy.animations.currentAnim.onComplete.add(() => {
          this.enemy.animations.play('jump down ' + dir)
        })
      } else {
        // Gegner ist gerade am Boden angekommen
        this.enemy.animations.play('landed ' + dir)
      }
    }
  }
}
