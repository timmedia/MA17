class Preload extends Phaser.State {
  preload() {
    this.preloadGraphic = this.add.sprite(0, 300, 'preload_graphic');
    this.load.setPreloadSprite(this.preloadGraphic);
    this.load.spritesheet('player_1', 'assets/graphics/player/01.gif', 54, 72);
    this.load.image('blackscreen', 'assets/graphics/general/black.gif');

    this.load.image('1_1_background', 'assets/graphics/level_1_1/background.gif');
    this.load.image('1_1_midground', 'assets/graphics/level_1_1/midground.gif');
    this.load.image('1_1_foreground', 'assets/graphics/level_1_1/foreground.gif');
    this.load.image('1_1_box', 'assets/graphics/level_1_1/box.gif');
    this.load.image('1_1_bridge', 'assets/graphics/level_1_1/bridge.gif');
    this.load.spritesheet('1_1_waterfall', 'assets/graphics/level_1_1/waterfall.png', 200, 240);
    this.load.spritesheet('1_1_water_splash', 'assets/graphics/level_1_1/water_splash.gif', 177, 50);
    this.load.spritesheet('1_1_water_foreground', 'assets/graphics/level_1_1/water_foreground.png', 1210, 25);
    this.load.spritesheet('1_1_door', 'assets/graphics/level_1_1/door.gif', 75, 106);
    this.load.spritesheet('1_1_button', 'assets/graphics/level_1_1/button.gif', 16, 16);

    this.load.image('2_1_background', 'assets/graphics/level_2_1/background.gif');
    this.load.image('2_1_midground', 'assets/graphics/level_2_1/midground.png');
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);
    this.load.spritesheet('2_1_water', 'assets/graphics/level_2_1/waterfall.png', 122, 310);
    this.load.spritesheet('2_1_key', 'assets/graphics/level_2_1/key.png', 24, 39);

    this.load.tilemap('l4_map', 'assets/map/l4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('l5_map', 'assets/map/l5.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('Level03 background', 'assets/graphics/Level03/background.gif')
    this.load.image('Level03 midground', 'assets/graphics/Level03/midground.gif')
    this.load.image('Level03 foreground', 'assets/graphics/Level03/foreground.gif')

    this.load.image('Level05 cloud1', 'assets/graphics/Level05/cloud1.gif')
    this.load.image('Level05 cloud2', 'assets/graphics/Level05/cloud2.gif')
    this.load.image('Level05 cloud3', 'assets/graphics/Level05/cloud3.gif')
    this.load.image('Level05 cloud4', 'assets/graphics/Level05/cloud4.gif')

    this.load.tilemap('Level03 map', 'assets/map/Level03.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('Level05 map', 'assets/map/Level05.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.tilemap('3_1_map', 'assets/map/level_3_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('1_1_map', 'assets/map/level_1_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('2_1_map', 'assets/map/level_2_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('debug_map_box', 'assets/map/box.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map_tutorial', 'assets/map/tutorial.json', null, Phaser.Tilemap.TILED_JSON);

    // Debug / Platzhaltergrafiken
    this.load.image('debug_box', 'assets/graphics/debug/debug_box.gif');
    this.load.image('debug10x10', 'assets/graphics/debug/tile10x10.gif');
    this.load.image('empty10x10', 'assets/graphics/debug/empty10x10.gif');
    this.load.image('debug_bridge', 'assets/graphics/debug/debug_bridge.gif');
    this.load.image('debug_key', 'assets/graphics/debug/debug_key.gif');
    this.load.image('debug_ball', 'assets/graphics/debug/debug_ball.gif');
    this.load.image('debug_enemy', 'assets/graphics/debug/debug_enemy.gif');
    this.load.image('debug_player', 'assets/graphics/debug/debug_player.gif');
    this.load.spritesheet('debug_door', 'assets/graphics/debug/debug_door.gif', 50, 80);
    this.load.spritesheet('debug_button', 'assets/graphics/debug/debug_button.gif', 20, 7);
    this.load.bitmapFont('debug_font', 'assets/font/debug/debug_font.png', 'assets/font/debug/debug_font.xml');

    // Tutorial
    this.load.image('tutorial_background', 'assets/graphics/tutorial/background.gif');
    this.load.image('tutorial_midground', 'assets/graphics/tutorial/midground.gif');
    this.load.image('tutorial_foreground', 'assets/graphics/tutorial/foreground.png');
    this.load.image('tutorial_michael', 'assets/graphics/tutorial/michael.gif');
    this.load.spritesheet('tutorial_speechbubbles', 'assets/graphics/tutorial/speechbubbles.png', 134, 82);

    // Menu Dateien
    this.load.image('menu_screen', 'assets/graphics/main_menu/menu_screen.gif');
    this.load.spritesheet('button_start_game', 'assets/graphics/main_menu/button_start_game.gif', 108, 48);
    this.load.spritesheet('button_leaderboard', 'assets/graphics/main_menu/button_leaderboard.gif', 248, 36);

    // Leaderboard Dateien
    this.load.image('leaderboard_background', 'assets/graphics/leaderboard/leaderboard_background.gif');
    this.load.image('leaderboard_button_back', 'assets/graphics/leaderboard/leaderboard_button_back.gif');

    // Touch Eingabe
    this.load.image('joystick_1', 'assets/graphics/touch_controls/joystick_1.gif');
    this.load.image('joystick_2', 'assets/graphics/touch_controls/joystick_2.gif');

    controls = {
      right:  this.input.keyboard.addKey(Phaser.Keyboard.D),
      left:   this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:    this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      tut:    this.input.keyboard.addKey(Phaser.Keyboard.ZERO),
      lvl1:   this.input.keyboard.addKey(Phaser.Keyboard.ONE),
      lvl2:   this.input.keyboard.addKey(Phaser.Keyboard.TWO),
      lvl3:   this.input.keyboard.addKey(Phaser.Keyboard.THREE),
      shft:   this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      j_left: false,
      j_right:false,
      j_up:   false
    }
  }
  create() {
    this.state.start('Level05');
  }
}

Game.preload = function() {};

Game.preload.prototype = {
  preload: function() {
    // Ladebalken wird bestimmt und angezeigt
    this.preload_graphic = this.add.sprite(0, 300, 'preload_graphic');
    this.load.setPreloadSprite(this.preload_graphic);

    /*
    Erklärung der Funktionsargumente:

    Bild laden:
    this.load.image(arg1, arg2);
    arg1: Name des Bildes, wird benötigt um später im Code darauf zuzugreifen zu können (key)
    aeg2: Pfad/Ort des Bildes in den Unterordnern

    Tilemap laden:
    this.load.tilemap(arg1, arg2, arg3, arg4);
    arg1 & arg2: gleich wie vorher
    arg3: (hier nicht genutzt, könnte alternative JSON-Datei laden)
    arg4: Art des Tilemaps (CSV, JSON)

    Spritesheet laden:
    this.load.spritesheet(arg1, arg2, arg3, arg4);
    arg1 & arg2: gleich wie vorher
    arg3: Grösse eines einzelnen Bildes (x-Wert)
    arg4: Grösse eines einzelnen Bildes (y-Wert)

    Bitmap-Schriftart:
    this.load.bitmapFont(arg1, arg2, arg3);
    arg1: gleich wie vorher
    arg2: Pfad der Grafik der Schriftart
    arg3: Pfad der XML-Datei mit Informationen zur Anordnung der Buchstaben
    */

    // Dateien Generell
    this.load.spritesheet('player_1', 'assets/graphics/player/01.gif', 54, 72);
    this.load.image('blackscreen', 'assets/graphics/general/black.gif');

    // Datein level_1_1
    this.load.tilemap('1_1_map', 'assets/map/level_1_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('1_1_background', 'assets/graphics/level_1_1/background.gif');
    this.load.image('1_1_midground', 'assets/graphics/level_1_1/midground.gif');
    this.load.image('1_1_foreground', 'assets/graphics/level_1_1/foreground.gif');
    this.load.image('1_1_box', 'assets/graphics/level_1_1/box.gif');
    this.load.image('1_1_bridge', 'assets/graphics/level_1_1/bridge.gif');
    this.load.spritesheet('1_1_waterfall', 'assets/graphics/level_1_1/waterfall.png', 200, 240);
    this.load.spritesheet('1_1_water_splash', 'assets/graphics/level_1_1/water_splash.gif', 177, 50);
    this.load.spritesheet('1_1_water_foreground', 'assets/graphics/level_1_1/water_foreground.png', 1210, 25);
    this.load.spritesheet('1_1_door', 'assets/graphics/level_1_1/door.gif', 75, 106);
    this.load.spritesheet('1_1_button', 'assets/graphics/level_1_1/button.gif', 16, 16);

    // Dateien level_2_1
    this.load.tilemap('2_1_map', 'assets/map/level_2_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('2_1_background', 'assets/graphics/level_2_1/background.gif');
    this.load.image('2_1_midground', 'assets/graphics/level_2_1/midground.png');
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);
    this.load.spritesheet('2_1_water', 'assets/graphics/level_2_1/waterfall.png', 122, 310);
    this.load.spritesheet('2_1_key', 'assets/graphics/level_2_1/key.png', 24, 39);

    this.load.tilemap('l4_map', 'assets/map/l4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('l5_map', 'assets/map/l5.json', null, Phaser.Tilemap.TILED_JSON);

    // Dateien level_3_1
    this.load.tilemap('3_1_map', 'assets/map/level_3_1.json', null, Phaser.Tilemap.TILED_JSON);

    // Debug / Platzhaltergrafiken
    this.load.image('debug_box', 'assets/graphics/debug/debug_box.gif');
    this.load.image('debug10x10', 'assets/graphics/debug/tile10x10.gif');
    this.load.image('empty10x10', 'assets/graphics/debug/empty10x10.gif');
    this.load.image('debug_bridge', 'assets/graphics/debug/debug_bridge.gif');
    this.load.image('debug_key', 'assets/graphics/debug/debug_key.gif');
    this.load.image('debug_ball', 'assets/graphics/debug/debug_ball.gif');
    this.load.image('debug_enemy', 'assets/graphics/debug/debug_enemy.gif');
    this.load.image('debug_player', 'assets/graphics/debug/debug_player.gif');
    this.load.spritesheet('debug_door', 'assets/graphics/debug/debug_door.gif', 50, 80);
    this.load.spritesheet('debug_button', 'assets/graphics/debug/debug_button.gif', 20, 7);
    this.load.bitmapFont('debug_font', 'assets/font/debug/debug_font.png', 'assets/font/debug/debug_font.xml');
    this.load.tilemap('debug_map_box', 'assets/map/box.json', null, Phaser.Tilemap.TILED_JSON);

    // Tutorial
    this.load.image('tutorial_background', 'assets/graphics/tutorial/background.gif');
    this.load.image('tutorial_midground', 'assets/graphics/tutorial/midground.gif');
    this.load.image('tutorial_foreground', 'assets/graphics/tutorial/foreground.png');
    this.load.image('tutorial_michael', 'assets/graphics/tutorial/michael.gif');
    this.load.spritesheet('tutorial_speechbubbles', 'assets/graphics/tutorial/speechbubbles.png', 134, 82);
    this.load.tilemap('map_tutorial', 'assets/map/tutorial.json', null, Phaser.Tilemap.TILED_JSON);

    // Menu Dateien
    this.load.image('menu_screen', 'assets/graphics/main_menu/menu_screen.gif');
    this.load.spritesheet('button_start_game', 'assets/graphics/main_menu/button_start_game.gif', 108, 48);
    this.load.spritesheet('button_leaderboard', 'assets/graphics/main_menu/button_leaderboard.gif', 248, 36);

    // Leaderboard Dateien
    this.load.image('leaderboard_background', 'assets/graphics/leaderboard/leaderboard_background.gif');
    this.load.image('leaderboard_button_back', 'assets/graphics/leaderboard/leaderboard_button_back.gif');

    // Touch Eingabe
    this.load.image('joystick_1', 'assets/graphics/touch_controls/joystick_1.gif');
    this.load.image('joystick_2', 'assets/graphics/touch_controls/joystick_2.gif');

    // Keyboard Inputs
    controls = {
      right:  this.input.keyboard.addKey(Phaser.Keyboard.D),
      left:   this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:    this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      tut:    this.input.keyboard.addKey(Phaser.Keyboard.ZERO),
      lvl1:   this.input.keyboard.addKey(Phaser.Keyboard.ONE),
      lvl2:   this.input.keyboard.addKey(Phaser.Keyboard.TWO),
      lvl3:   this.input.keyboard.addKey(Phaser.Keyboard.THREE),
      shft:   this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      j_left: false,
      j_right:false,
      j_up:   false
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
  },
  create:function(){
    // Menu wird gestartet
    this.state.start('Level05');
  }
}
