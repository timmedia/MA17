var controls

class Preload extends Phaser.State {
  preload() {
    this.bar = this.add.sprite(0, 300, 'Preload Bar')
    this.load.setPreloadSprite(this.bar)

    let loadImg = (name, path) => {
      this.load.image(name, 'assets/graphics/' + path)
    }

    let loadSpr = (name, path, sizeX, sizeY) => {
      this.load.spritesheet(name, 'assets/graphics/' + path, sizeX, sizeY)
    }

    let loadMap = (name, path) => {
      this.load.tilemap(name, 'assets/map/' + path, null, Phaser.Tilemap.TILED_JSON)
    }

    loadImg('Menu Background', 'menu/background.gif')
    loadImg('Menu Copyright', 'menu/copyright.gif')
    loadImg('Menu Vignette', 'menu/vignette.png')
    loadImg('Menu Lights', 'menu/lights.png')
    loadImg('Menu Leaderboard', 'menu/leaderboard.gif')
    loadImg('Menu Play', 'menu/play.gif')
    loadImg('Menu Logo', 'menu/logo.gif')
    loadImg('Menu Arrow', 'menu/arrow.gif')
    loadSpr('Menu Michael', 'menu/michael.gif', 49, 132)

    loadSpr('Player 01', 'player/01.gif', 54, 72)

    loadImg('Blackscreen', 'general/black.gif')
    loadImg('General Box', 'general/box.gif')
    loadSpr('General Button', 'general/button.gif', 16, 16)
    loadSpr('General Door', 'general/door.gif', 75, 106)
    loadSpr('General Key', 'general/key.png', 24, 39)

    loadImg('Tutorial Background', 'tutorial/background.gif')
    loadImg('Tutorial Foreground', 'tutorial/foreground.png')
    loadImg('Tutorial Midground', 'tutorial/midground.gif')
    loadImg('Tutorial Michael', 'tutorial/michael.gif')
    loadSpr('Tutorial Speechbubbles', 'tutorial/speechbubbles.png', 134, 82)

    loadImg('Level01 Background', '01/background.gif')
    loadImg('Level01 Foreground', '01/foreground.gif')
    loadImg('Level01 Midground', '01/midground.gif')
    loadImg('Level01 Bridge', '01/bridge.gif')
    loadSpr('Level01 Water', '01/water.png', 1210, 25)
    loadSpr('Level01 Splash', '01/splash.gif', 177, 50)
    loadSpr('Level01 Waterfall', '01/waterfall.gif', 200, 240)

    loadImg('Level02 Background', '02/background.gif')
    loadImg('Level02 Midground', '02/midground.gif')
    loadSpr('Level02 Waterfall', '02/waterfall.png', 122, 310)

    loadImg('Level03 Background', '03/background.gif')
    loadImg('Level03 Foreground', '03/foreground.gif')
    loadImg('Level03 Midground', '03/midground.gif')
    loadImg('Level03 Water', '03/water.png')
    loadSpr('Level03 Waves', '03/waves.png', 560, 74)

    loadImg('Level04 Background', '04/background.png')
    loadImg('Level04 Cloud1', '04/cloud1.gif')
    loadImg('Level04 Cloud2', '04/cloud2.gif')
    loadImg('Level04 Cloud3', '04/cloud3.gif')
    loadImg('Level04 Cloud4', '04/cloud4.gif')

    loadImg('Level05 Background', '05/background.png')
    loadImg('Level05 Midground', '05/midground.png')

    loadImg('Level06 Background', '06/background.png')

    loadMap('Tutorial Map', 'tutorial.json')
    loadMap('Level01 Map', '01.json')
    loadMap('Level02 Map', '02.json')
    loadMap('Level03 Map', '03.json')
    loadMap('Level04 Map', '04.json')
    loadMap('Level05 Map', '05.json')
    loadMap('Level06 Map', '06.json')

    loadImg('Debug tile10x10', 'debug/tile10x10.gif')
    loadImg('Debug empty10x10', 'debug/empty10x10.gif')

    controls = {
      right:  this.input.keyboard.addKey(Phaser.Keyboard.D),
      left:   this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:    this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      tut:    this.input.keyboard.addKey(Phaser.Keyboard.ZERO),
      lvl1:   this.input.keyboard.addKey(Phaser.Keyboard.ONE),
      lvl2:   this.input.keyboard.addKey(Phaser.Keyboard.TWO),
      lvl3:   this.input.keyboard.addKey(Phaser.Keyboard.THREE),
      shift:  this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
    }
  }
  create() {
    this.state.start('Level06');
  }
}


    // Zeit-check
    checkTime = function(maxTime, action) {
      // verbleibende Zeit ist verlaufene Zeit von der maximalen Zeit subtrahiert
      let res = maxTime - this.game.time.totalElapsedSeconds();
      // wenn die Zeit vorüber ist, soll das Level neu gestartet werden
      if (res <= 0) {
        // Reset Zeit & Level
        this.game.time.reset();
        action.call(this);
        return 0.0;
      }
      // Zeit mit einer Dezimalstelle zurückgegeben
      return res.toFixed(1);
    }
