var controls // Array mit allen Knöpfen als globale Variable

/* Klasse Preload */
class Preload extends Phaser.State {
  preload() {
    this.bar = this.add.sprite(0, 300, 'Preload Bar') // Ladebalken anzeigen
    this.load.setPreloadSprite(this.bar) // Ladebalken an Phaser übergeben

    // Funktion um Grafiken mit weniger Syntax zu laden
    var loadImg = (name, path) => {
      // Phaser Lade-Funktion, automatisch im Grafik-Ordner
      this.load.image(name, 'assets/graphics/' + path)
    }

    // Spritesheets laden
    var loadSpr = (name, path, sizeX, sizeY) => {
      this.load.spritesheet(name, 'assets/graphics/' + path, sizeX, sizeY)
    }

    // JSON Karten laden
    var loadMap = (name, path) => {
      this.load.tilemap(
        name, 'assets/map/' + path, null, Phaser.Tilemap.TILED_JSON
      )
    }

    // Bitmap Schriftart laden
    var loadFont = (name, pathImage, pathData) => {
      this.load.bitmapFont(
        name, 'assets/font/' + pathImage, 'assets/font/' + pathData
      )
    }

    // Bildfolge laden
    var loadSequence = (name, frames) => {
      for (let i = 1; i <= frames; i++) { // jedes Frame wird geladen
        loadImg(
          'Sequence ' + name + ' ' + i.toString(), // key des Frame
          'sequences/' + name.toLowerCase() + '/' + i.toString() + '.png'
        )
      }
    }

    // Menu Dateien
    loadImg('Menu Background', 'menu/background.gif')
    loadImg('Menu Copyright', 'menu/copyright.gif')
    loadImg('Menu Vignette', 'menu/vignette.png')
    loadImg('Menu Lights', 'menu/lights.png')
    loadImg('Menu Leaderboard', 'menu/leaderboard.gif')
    loadImg('Menu Play', 'menu/play.gif')
    loadImg('Menu Logo', 'menu/logo.gif')
    loadImg('Menu Arrow', 'menu/arrow.gif')
    loadSpr('Menu Michael', 'menu/michael.gif', 49, 132)

    // Generelle Dateien
    loadSpr('Player 01', 'player/01.gif', 54, 72)
    loadImg('Blackscreen', 'general/black.gif')
    loadImg('General Box', 'general/box.gif')
    loadImg('General Fireball', 'general/fireball.gif')
    loadImg('General Healthbar', 'general/healthbar.gif')
    loadSpr('General Button', 'general/button.gif', 16, 16)
    loadSpr('General Door', 'general/door.gif', 75, 106)
    loadSpr('General Key', 'general/key.png', 24, 39)
    loadSpr('General Hearts', 'general/hearts.gif', 27, 27)

    // Schrift-Dateien
    loadFont('Small White', 'small/white.gif', 'small/font.xml')
    loadFont('Small Black', 'small/black.gif', 'small/font.xml')

    // Tutorial Dateien
    loadImg('Tutorial Background', 'tutorial/background.gif')
    loadImg('Tutorial Foreground', 'tutorial/foreground.png')
    loadImg('Tutorial Midground', 'tutorial/midground.gif')
    loadImg('Tutorial Michael', 'tutorial/michael.gif')
    loadSpr('Tutorial Speechbubbles', 'tutorial/speechbubbles.gif', 148, 72)

    // Level01
    loadImg('Level01 Background', '01/background.gif')
    loadImg('Level01 Foreground', '01/foreground.gif')
    loadImg('Level01 Midground', '01/midground.gif')
    loadImg('Level01 Bridge', '01/bridge.gif')
    loadSpr('Level01 Water', '01/water.png', 1210, 25)
    loadSpr('Level01 Splash', '01/splash.gif', 177, 50)
    loadSpr('Level01 Waterfall', '01/waterfall.gif', 200, 240)

    // Level02
    loadImg('Level02 Background', '02/background.gif')
    loadImg('Level02 Midground', '02/midground.gif')
    loadSpr('Level02 Waterfall', '02/waterfall.png', 122, 310)

    // Level03
    loadImg('Level03 Background', '03/background.gif')
    loadImg('Level03 Foreground', '03/foreground.gif')
    loadImg('Level03 Midground', '03/midground.gif')
    loadImg('Level03 Water', '03/water.png')
    loadSpr('Level03 Waves', '03/waves.png', 560, 74)

    // Level04
    loadImg('Level04 Background', '04/background.png')
    loadImg('Level04 Cloud1', '04/cloud1.gif')
    loadImg('Level04 Cloud2', '04/cloud2.gif')
    loadImg('Level04 Cloud3', '04/cloud3.gif')
    loadImg('Level04 Ice1', '04/ice1.png')
    loadImg('Level04 Ice2', '04/ice2.png')
    loadImg('Level04 Ice3', '04/ice3.png')
    loadImg('Level04 Ice4', '04/ice4.png')
    loadImg('Level04 Houses', '04/houses.png')
    loadImg('Level04 Water', '04/water.gif')
    loadImg('Level04 Mountain', '04/mountain.png')

    // Level05
    loadImg('Level05 Background', '05/background.png')
    loadImg('Level05 Midground', '05/midground.png')
    loadImg('Level05 Water', '05/water.png')
    loadSpr('Level05 Speechbubbles', '05/speechbubbles.png', 147, 57)
    loadSpr('Level05 Char1', '05/char1.gif', 36, 64)
    loadSpr('Level05 Char2', '05/char2.png', 36, 47)
    loadSpr('Level05 Char3', '05/char3.png', 29, 100)
    loadSpr('Level05 Char4', '05/char4.png', 42, 55)

    // Level06
    loadImg('Level06 Background', '06/background.png')
    loadImg('Level06 Midground', '06/midground.png')
    loadImg('Level07 Door', '06/door.png')

    // Level07
    loadImg('Level07 Background', '07/background.png')
    loadImg('Level07 Buildings', '07/buildings.png')
    loadImg('Level07 Bigcloud1', '07/bigcloud1.png')
    loadImg('Level07 Bigcloud2', '07/bigcloud2.png')
    loadImg('Level07 Smallcloud1', '07/smallcloud1.png')
    loadImg('Level07 Smallcloud2', '07/smallcloud2.png')
    loadImg('Level07 Smallcloud3', '07/smallcloud3.png')
    loadSpr('Level07 Platform', '07/platform.png', 38, 39)

    // Level08
    loadImg('Level08 Background', '08/background.png')
    loadImg('Level08 Midground', '08/midground.png')
    loadImg('Level08 Foreground', '08/foreground.png')
    loadSpr('Level08 Speechbubbles', '08/speechbubbles.png', 153, 57)
    loadSpr('Level08 17', '08/17.gif', 54, 72)

    // Cutscene01
    loadImg('Cutscene01 Title', 'cutscenes/01/title.png')
    loadSequence('Urielle', 9)

    // Cutscene02
    loadImg('Cutscene02 Background', 'cutscenes/02/background.png')
    loadImg('Cutscene02 Title', 'cutscenes/02/title.png')

    // Karten
    loadMap('Tutorial Map', 'tutorial.json')
    loadMap('Level01 Map', '01.json')
    loadMap('Level02 Map', '02.json')
    loadMap('Level03 Map', '03.json')
    loadMap('Level04 Map', '04.json')
    loadMap('Level05 Map', '05.json')
    loadMap('Level06 Map', '06.json')
    loadMap('Level08 Map', '08.json')
    loadMap('Level09 Map', '09.json')

    // Debug-Grafiken
    loadImg('Debug tile10x10', 'debug/tile10x10.gif')
    loadImg('Debug empty10x10', 'debug/empty10x10.gif')
    loadImg('Debug Enemy', 'debug/enemy.gif')
    loadImg('Debug Ball', 'debug/ball.gif')
    loadImg('Debug Arrow', 'debug/arrow.gif')

    // Steuerung, kann erst initialisiert werden wenn Spiel gestartet
    // (deshalb in einer Phaser-Funktion)
    controls = {
      right:  this.input.keyboard.addKey(Phaser.Keyboard.D),
      left:   this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:    this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      tut:    this.input.keyboard.addKey(Phaser.Keyboard.ZERO),
      shift:  this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
    }
  }
  create() {
    this.state.start('Level01'); // ersten State starten
  }
}
