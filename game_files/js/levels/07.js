/* Klasse Level 07 */
class Level07 extends GameState {
  build() {
    // Initialisierung der Ebene
    this.setup(
      null,             // Keine Karte
      4200, 480,        // Weltgrösse (x, y)
      1300,             // Gravitation
      'Level15',        // nächstes Level
      null, null, null, // Keine Hinter-, Mittle und Vordergrund-Bilder
      'yellow_white'    // Farbakzent
    )

    // Hintergrund, bewegt sich mit Kamera
    this.background = this.add.sprite(0, 0, 'Level07 Background')
    this.background.fixedToCamera = true

    // Grosse Wolken im Hintergrund, alle in einer Gruppe
    this.bigclouds = this.add.group()
    this.bigclouds.create(-50, 480, 'Level07 Bigcloud1')
    this.bigclouds.create(700, 480, 'Level07 Bigcloud2')
    this.bigclouds.create(1500, 480, 'Level07 Bigcloud1')
    this.bigclouds.setAll('anchor.y', 1) // Ankerpunkt unten

    // Grafik der Gebäude soll davor zu sehen sein
    this.buildings = this.add.sprite(0, 0, 'Level07 Buildings')

    // Spieler: Beim Verlassen des Spielfeldes im unteren Rand soll das Level neu
    // beginnen, beim Verlasse rechts wurde das Level beendet
    this.player = new Player(this, 525, 0, 'Player 01', 250, -600, true)
    // Spieler soll beim Verlassen der Welt ganz rechts zu nächsten Level gehen
    // und sterben wenn er herunterfällt
    this.player.checkWorldBounds = true
    this.player.events.onOutOfBounds.add(() => {
      if (this.player.position.x > 4190) {
        this.goToNextLevel()
      } else if (this.player.position.y > 0) {
        this.killPlayer()
      }
    })

    // Platformen, als Gruppe, Koordinaten aus Liste
    this.allPlatforms = this.add.group()
    let coords = [
      // x, y, Länge (Anz. Blöcke)
      [90, 50, 2],
      [90, 90, 2],
      [90, 130, 2],
      [90, 170, 2],
      [90, 210, 2],
      [90, 250, 2],
      [90, 290, 2],
      [90, 330, 2],
      [90, 370, 2],
      [180, 400, 8],
      [520, 350, 7],
      [810, 320, 6],
      [1150, 310, 8],
      [1500, 270, 7],
      [1843, 210, 6],
      [2150, 150, 5],
      [2550, 420, 6],
      [2880, 450, 3],
      [3130, 410, 3],
      [3390, 385, 3],
      [3680, 350, 3],
      [3840, 370, 2],
      [4010, 345, 2]
    ]

    // Erstellen der Platformen an den Koordinaten
    for (let i in coords) {
      this.createPlatform(coords[i][0] + 400, coords[i][1], coords[i][2])
    }

    // kleine Wolek im Vordergrund als Gruppe
    this.smallclouds = this.add.group()
    this.smallclouds.create(100, 490, 'Level07 Smallcloud1')
    this.smallclouds.create(800, 480, 'Level07 Smallcloud2')
    this.smallclouds.create(1600, 500, 'Level07 Smallcloud3')
    this.smallclouds.create(2450, 490, 'Level07 Smallcloud1')
    this.smallclouds.create(3250, 495, 'Level07 Smallcloud2')
    this.smallclouds.create(4000, 480, 'Level07 Smallcloud3')
    this.smallclouds.setAll('anchor.y', 1) // Ankerpunkt unten
  }

  // Spiel-Schleife
  loop() {
    // Parallaxing, Grosse Wolken und Gebäude bewegen sich nach hinten, kleine
    // Wolken vorne nach rechts (anders als sonst, deshalb nicht ab Vorlage)
    this.bigclouds.x = - this.world.x / 1.5     // Bewegung in Gegenrichtung
    this.buildings.x = - this.world.x / 2 + 700 // Bewegung in Gegenrichtung
    this.smallclouds.x = this.world.x / 6 // Bewegung in Spielerrichtung

    // Beim Berühren der einzelnen Blöcke gehen diese kaputt
    this.physics.arcade.collide(
      this.player,
      this.allPlatforms,
      // Überprüfen ob Block noch ganz ist
      (player, platform) => {
        return !platform.broken
      },
      (player, platform) => {
        // Block ist noch ganz, wird nun zerstört
        platform.broken = true
        // Zerstörungsanimation
        platform.animations.play('dissolve')
        // Spieler kann noch 100ms darauf stehen bleiben
        this.time.events.add(100, () => { platform.body.enable = false })
        // Nach der Animation wird Platform aus Gruppe gelöscht
        platform.animations.currentAnim.onComplete.add(() => {
          platform.alpha = 0
          platform.kill()
        })
      }
    )
  }

  // Funktion um Platform zu erstellen (x|y Koordinaten, Länge anzugeben)
  createPlatform(x, y, length) {
    // For-Schleife, jeder Block wird einzeln erstellt
    for (let i = 0; i < length; i++) {
      // Objekt mit Grafik und Physik, jedoch nicht bewegbar -> StaticGameObject
      let tile = new StaticGameObject(this, x + i * 19, y, 'Level07 Platform')
      tile.animations.add('dissolve', [1, 2, 3, 4, 5, 6, 7], 10, false)
      tile.broken = false
      // Block wird zur Kollisionsgruppe hinzugefügt
      this.allPlatforms.add(tile)
    }
  }
}
