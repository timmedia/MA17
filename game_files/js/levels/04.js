/* Klasse Level 04 */
class Level04 extends GameState {
  build() {
    this.setup(
      'Level04 Map',       // Karte
      4500, 2000,          // Kartengrösse (x, y)
      1300,                // Gravitation
      'Cutscene04',        // nächstes Level
      'Debug empty10x10',  // Leeres Vordergrund-Bild damit Parallaxing läuft
      'Debug empty10x10',  // Leeres Mittelgrund, gleicher Grund
      'Level04 Background',// Hintergrund-Bild, mit Parallaxing
      'yellow_white'       // Akzentfarbe
    )

    // Musik
    game.switchMusic('Cottoncandy', 1)

    // Spieler, Kamera soll nur auf y-Achse folgen
    this.player = new Player(
      this, 100, 1745, 'Player 01', 250, -600, false, true
    )
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0, 0.1)
    this.player.topReached = false // Variable für später; Ist Spieler oben?
    this.player.mu = 1.5 // Spieler soll auf dem Eis rutschen

    // Häuser unten, wird später nicht mehr angesprochen
    let houses = this.add.sprite(0, 1790, 'Level04 Houses')

    // Wasser unten mit Semitransparenz, wird später nicht mehr angesprochen
    let water = this.add.sprite(0, 1980, 'Level04 Water')
    water.alpha = 0.8

    // Grafik für Berg, wird später nicht mehr angesprochen
    let mountain = this.add.sprite(3600, 400, 'Level04 Mountain')

    // Koordinaten für Eisplatten
    var iceCoords = [
      // x, y, Grafik #
      [60, 1950, 4],
      [250, 1850, 1],
      [500, 1780, 8],
      [550, 1700, 2],
      [230, 1590, 3],
      [130, 1480, 5],
      [280, 1380, 8],
      [670, 1410, 7],
      [710, 1250, 1],
      [500, 1220, 4],
      [380, 1100, 5],
      [280, 1000, 6],
      [530, 1000, 8],
      [180, 820, 1],
      [300, 740, 4],
      [560, 620, 5],
      [440, 525, 8],
      [550, 400, 1],
      [700, 450, 2]
    ]

    // Eisblöcke als Physikgruppe
    this.iceblocks = this.game.add.group()

    // Platten an Koordinaten hinzufügen
    for (var i in iceCoords) {
      var platform // Platform als leere Variable, soll in diesem Scope sein
      if (iceCoords[i][2] < 5) {
        // Grafikindex < 5 heisst Grafik soll nicht gespiegelt angezeigt werden
        // (es gibt 4 verschiedene)
        var graphicIndex = 'Level04 Ice' + iceCoords[i][2].toString()
        platform = new StaticGameObject(
          this, iceCoords[i][0], iceCoords[i][1], graphicIndex
        )
        // Hitbox kleiner, Eiszapfen untendran sollen nicht kollidieren
        platform.body.setSize(platform.width, 20, 0, 0)
      } else {
        // Grafikindex > 4, heisst Index -= 4, Grafik wird gespiegelt
        var graphicIndex = 'Level04 Ice' + (iceCoords[i][2] - 4).toString()
        platform = new StaticGameObject(
          this, iceCoords[i][0], iceCoords[i][1], graphicIndex
        )
        platform.body.setSize(platform.width, 20, 0, 0) // muss vor scale.x = -1
        platform.scale.x = -1 // Spiegelung
      }
      this.iceblocks.add(platform) // Platform der Physikgruppe hinzufügen
    }

    this.collidePlayerList.push(this.iceblocks) // Gruppe kollidiert mit Spieler

    // Wolken als Physikgruppe
    this.clouds = this.game.add.group()

    // Leere Grafik mit Grösse von 700x170, verwendet für Kollsion mit Spieler
    // Kollsion: Level fertig
    this.endDetection = new StaticGameObject(this, 3600, 400)
    this.endDetection.body.setSize(700, 170, 0, 0)
  }

  // Spiel-Schleife
  loop() {
    if (!this.player.topReached) {
      // Spieler nicht oben
      if (this.player.position.y < 320) {
        // Spieler ist an der obersten Eisplatfrom angekommen
        this.player.topReached = true
        // Kamera soll nun wieder in beide Richtungen folgen
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
        this.createClouds() // Wolken erstellen
        this.startClouds()  // Bewegung der Wolken starten
      }
    } else if (this.player.position.y > 480) {
      // Spieler ist bei den Wolken heruntergefallen
      this.clouds.callAll('kill') // Wolken löschen
      this.createClouds()         // neue Wolken an Ursprungsposition
      this.startClouds()          // Wolken starten
      this.player.x = 575         // Reset Position Spieler
      this.player.y = 250
      this.player.body.velocity.x = 0 // reset Geschwindigkeit
      this.player.body.velocity.y = 0
    }
    // Überprüfen ob Spieler den Berg erreicht hat
    this.physics.arcade.overlap(
      this.player, this.endDetection, this.goToNextLevel, null, this
    )
  }

  // Funktion um Bewegung der Wolken zu starten
  startClouds() {
    this.clouds.setAll('body.velocity.x', -70)
  }

  // Funtion um Wolken zu erstellen
  createClouds() {
    // Anfangskoordinaten der Wolken
    var cloudCoords = [
      // x, y, Grafik #
      [1105, 412, 1],
      [1265, 373, 2],
      [1507, 357, 3],
      [1545, 421, 4],
      [1839, 255, 5],
      [1661, 115, 6],
      [1755, 354, 1],
      [2012, 368, 2],
      [1858, 143, 5],
      [1986, 438, 6],
      [2054, 152, 4],
      [2199, 413, 3],
      [2201, 300, 1],
      [2304, 273, 5],
      [2374, 350, 6]
      [2516, 315, 2],
      [2583, 202, 4],
      [2612, 300, 5],
      [2678, 212, 1],
      [2748, 380, 6],
      [2823, 189, 5],
      [2841, 410, 3],
      [2941, 300, 2],
      [3013, 250, 4],
      [3194, 326, 1],
      [3317, 278, 5],
      [3488, 198, 6],
      [3672, 250, 2],
      [3909, 301, 3],
      [4135, 323, 4],
      [4355, 384, 5],
      [4575, 316, 6],
      [4766, 414, 2],
      [4893, 315, 1],
      [5112, 281, 3],
      [5316, 401, 4],
      [5518, 375, 5],
      [5723, 295, 6],
      [5956, 215, 2],
      [6131, 173, 5],
      [6245, 378, 1],
      [6430, 250, 6],
      [6631, 354, 3],
      [6815, 236, 4],
      [7034, 340, 5],
      [7251, 321, 2],
      [7414, 250, 6],
      [7623, 301, 1],
      [7840, 272, 4],
      [8053, 193, 3],
      [8240, 231, 5],
      [8410, 267, 6],
      [8631, 351, 4]
    ]

    // Wolken an Koordinaten erstellen
    for (var i in cloudCoords) {
      var cloud // Wolke als leere Variable, soll in diesem Scope sein
      if (cloudCoords[i][2] < 4) {
        // Wolke nicht gespiegelt, Grafikindex direkt
        var graphicIndex = 'Level04 Cloud'+ cloudCoords[i][2].toString()
        cloud = new DynamicGameObject(
          this, cloudCoords[i][0], cloudCoords[i][1], graphicIndex
        )
      } else {
        // Wolke gespiegelt, Grafikindex -= 3 da 3 verschiedene Sprites
        var graphicIndex = 'Level04 Cloud'+ (cloudCoords[i][2] - 3).toString()
        cloud = new DynamicGameObject(
          this, cloudCoords[i][0], cloudCoords[i][1], graphicIndex
        )
      }
      // Ankerpunk in der Mitte, damit Position nach Spieglung gleich ist
      cloud.anchor.setTo(0.5, 1)
      // Hitbox soll kleiner sein, als Wolk, nur als Balken unten
      cloud.body.setSize(cloud.width, 10, 0, cloud.height - 10)
      // Schwerkraft hat keinen Einfluss, max Geschw. in y-Richtung ist klein
      cloud.body.allowGravity = false
      cloud.body.maxVelocity.y = 0.5
      // Kollision nur oben, Spieler soll Wolken nur vertikal bewegen können
      cloud.body.checkCollision.left = false
      cloud.body.checkCollision.right = false
      cloud.body.checkCollision.down = false
      this.clouds.add(cloud) // Wolke der Gruppe hinzufügen
    }
    // Wolkengruppe soll mit Spieler kollidieren
    this.collidePlayerList.push(this.clouds)
  }
}
