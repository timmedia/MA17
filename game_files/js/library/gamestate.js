var globalDebug = globalDebug || false

/*
Änhlich wie die Objekte, soll auch jeder Gamerstate eine Vorlage haben, damit
der ganze boilerplate Code nur einmal geschrieben werden muss
*/
class GameState extends Phaser.State {
  setup(map, boundX, boundY, gravity, nextLevel, fg, mg, bg, mode) { // Arg.
    this.collidePlayerList = [] // alle Objekte, welche mit Spieler kollidieren
    this.collideLayerList = []  // alle Objekte, weche mit Tilemap kollidieren
    this.damagePlayerList = []  // alle Objekte, welche Spieler schaden sollen
    // Falls eine Karte (JSON) angegeben wurde, soll diese geladen werden
    if (map) this.loadMapData(map)
    this.nextLevel = nextLevel                 // das nächste Level
    this.world.setBounds(0, 0, boundX, boundY) // Grösse der Karte
    this.physics.arcade.gravity.y = gravity    // Schwerkraft
    // Grafiken für Parallaxing als Array
    this.parallaxImg = [fg || null, mg  || null, bg || null]

    // Backspace: Zurück zum Menu
    controls.backspace.onDown.add(() => game.state.start('Menu'), this)

    // ESC: Verbindung mit Server unterbrechen, Arcade shutdown
    if (this.arcade) controls.esc.onDown.add(() => this.server.end(), this)

    // Status, z.B. für Arcade Farbanzeige
    game.status.setMode(mode)

    // Gerät-spezfische Update-Funktion
    this.updateSpecial = function () {
      if (game.isArcade) {
        // Spiel ist auf Arcade
        return function () {
          game.server.update(game.status)
        }
      } else if (game.isMobile) {
        // Spiel auf mobilem Gerät
        return function () {
          // ... Code for when mobile, future-proofing
        }
      } else {
        return function () {}
      }
    } ()
  }

  // Loop, wird für jeden Physik-Durchgang aufgerufen
  // je nach Gerät-Typ wird eine andere Funktion zurückgegeben
  update() {
    this.checkCollisions()  // Kollisionen ab Listen überprüfen
    this.loop()             // loop(): Im Code des Levels bestimmt
    this.showPlayerHealth() // Herzanzeige aktualisieren
    this.updateSpecial()
  }

  // Funktion, wird von Phaser beim Start des Levels aufgerufen
  create() {
    this.build()         // pseudo-create() innerhalb Level-Code
    this.setupParallax() // Parallaxing wird initialisiert
    this.setupHearts()   // HP-System (Herzanzeige)
    this.levelFade()     // Übergang
  }

  // Leere Loop-Funktion, falls das Level keine hat (Fehler vermeiden)
  loop() {  }

  // Kollisionen ab Listen überprüfen
  checkCollisions() {
    this.physics.arcade.collide(this.layer, this.collideLayerList)
    this.physics.arcade.collide(this.collideLayerList, this.collideLayerList)
    this.physics.arcade.collide(this.player, this.collidePlayerList)
    this.physics.arcade.overlap(
      // Spieler schaden
      this.player, this.damagePlayerList, this.player.damage, null, this
    )
  }

  // Level neu starten, Anzahl Tode erhöht sich
  killPlayer() {
    game.status.increaseDeathCount()
    game.state.restart()
  }

  // Zum nächsten Level gehen
  goToNextLevel() {
    this.camera.fade() // Bildschirm wird schwarz
    this.time.events.add(500,() => {
      game.state.start(this.nextLevel) // nach 0.5s nächstes Level
    })
  }

  // Übergang: Fade von schwarz zu Level
  levelFade() {
    var fade = this.add.sprite(0, 0, 'Blackscreen') // schwarz ab Grafik
    fade.fixedToCamera = true                       // bewegt sich mit Kamera
    this.add.tween(fade).to(
      {alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true
    )
    this.time.events.add(1000, fade.kill, this) // wird nach 1s wieder gelöscht
  }

  // Daten ab JSON Karte laden
  loadMapData(map) {
    var map = this.add.tilemap(map) // Tilemap hinzufügen
    map.addTilesetImage('debug10x10', 'Debug tile10x10') // Grafik hinzufügen
    map.setCollision(1, 8)                               // Kollision setzen
    this.layer = map.createLayer('Tile Layer 1') // Tilemap als Layer (Physik)
    this.layer.alpha = globalDebug ? 1 : 0 // Debuggrafik im Debug-Mode anzeigen

    // Türe und Kisten (falls vorhanden)
    var doorLayer = map.objects['Object Layer Door']
    var boxesLayer = map.objects['Object Layer Boxes']
    // Überall wo in der JSON eine Box plaziert ist, soll ein Box-Objekt hin
    // Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db
    if (doorLayer) { // Falls eine Tür-Ebene vorhanden ist
      doorLayer.forEach(door => { // Türe setzen
        // Verschlossen ab JSON
        var locked = door.properties && door.properties.locked
        // Türe setzen, Callback ist die Aktivierung des nächsten Levels
        this.door = new Door(
          this, door.x, door.y, 'General Door', 0, locked, this.goToNextLevel
        )
        this.door.update = () => {
          // Kollision von Türe und Spieler überprüfen
          this.physics.arcade.overlap(
            this.door, this.player,
            this.door.callback, this.door.processCallback, this
          )
        }
      })
    }
    // Ist Kisten-Ebene vorhanden, soll diese als Gruppe hinzugefügt werden
    if (boxesLayer) {
      this.boxes = this.game.add.group()
      boxesLayer.forEach(box => {
        this.boxes.add(new Box(this, box.x, box.y, 'General Box', 3000, 0.5))
      })
      this.collideLayerList.push(this.boxes)  // Kisten kollidieren mit Karte
      this.collidePlayerList.push(this.boxes) // Kisten kollidieren mit Spieler
    }
  }

  // Parallaxing aufsetzen
  setupParallax() {
    // Array mit allen Grafiken
    this.parallax = [
      this.parallaxImg[0] ? this.add.sprite(0, 0, this.parallaxImg[0]) : null,
      this.parallaxImg[1] ? this.add.sprite(0, 0, this.parallaxImg[1]) : null,
      this.parallaxImg[2] ? this.add.sprite(0, 0, this.parallaxImg[2]) : null
    ]

    // Parallaxing klappt nur falls alle Grafiken vorhanden
    if (this.parallax[0] && this.parallax[1] && this.parallax[2]) {
      // update: Grafiken sollen bewegt werden
      this.parallax[0].update = () => {
        this.parallax[0].x = this.world.x / 3   // Vordergrund schneller (x)
        this.parallax[0].y = this.world.y / 3   // Hintergrund langsamer (x)
        this.parallax[2].x = - this.world.x / 3 // Vordergrund schneller (y)
        this.parallax[2].y = - this.world.y / 3 // Hintergrund langsamer (y)
      }
    }
    // Hinter- & Mittelgrund sollen hinter allen anderen Grafiken sein
    if (this.parallax[1]) this.parallax[1].sendToBack()
    if (this.parallax[2]) this.parallax[2].sendToBack()
  }

  // Herzanzeige
  setupHearts() {
    this.healthBar = this.add.group()               // Alle Herzen als Gruppe
    this.healthBar.create(0, 0, 'General Hearts')   // Herzen hinzufügen
    this.healthBar.create(32, 0, 'General Hearts')
    this.healthBar.create(64, 0, 'General Hearts')
    this.healthBar.create(96, 0, 'General Hearts')
    this.healthBar.create(128, 0, 'General Hearts')
    this.healthBar.fixedToCamera = true             // Sollen mit Kamera bewegen
    this.healthBar.cameraOffset.setTo(20, 20) // Abstand: 20 von links, 20 oben
    this.previousHealth = 9 // Spieler startet mit 9 Herzen
  }

  // Herzanzeige aktualisieren
  showPlayerHealth() {
    if (this.player.hp != this.previousHealth) { // Gibt es Änderungen?
      var hp = this.player.hp + 1 // 0-9 zu 1-10
      // Je nach dem wieviel HP der Spielr hat soll 0.5-5 Herzen erscheinen
      this.healthBar.children[0].frame = (hp > 0)? (hp > 1)? 0 : 1 : 2
      this.healthBar.children[1].frame = (hp > 2)? (hp > 3)? 0 : 1 : 2
      this.healthBar.children[2].frame = (hp > 4)? (hp > 5)? 0 : 1 : 2
      this.healthBar.children[3].frame = (hp > 6)? (hp > 7)? 0 : 1 : 2
      this.healthBar.children[4].frame = (hp > 8)? (hp > 9)? 0 : 1 : 2
    }
  }
}
