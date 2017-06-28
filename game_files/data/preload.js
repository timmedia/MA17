Game.preload = function() {};

Game.preload.prototype = {
  preload:function(){
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
    this.load.spritesheet('1_1_button', 'assets/graphics/level_1_1/button.gif', 16, 9);

    // Dateien level_2_1
    this.load.tilemap('2_1_map', 'assets/map/level_2_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('2_1_background', 'assets/graphics/level_2_1/background.gif');
    this.load.image('2_1_midground', 'assets/graphics/level_2_1/midground.png');
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);
    this.load.spritesheet('2_1_water', 'assets/graphics/level_2_1/waterfall.png', 122, 310);
    this.load.spritesheet('2_1_key', 'assets/graphics/level_2_1/key.png', 24, 39);

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
      shft:   this.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    }

    // Globale Funktion: Input-Abfrage ist in jedem Level gleich
    checkInput = function(p, ctrl) {

      // benötigte Variablen
      var grounded;
      var rightDown = ctrl.right.isDown;
      var leftDown  = ctrl.left.isDown;
      var gravitySwitched;
      if (p.jumpSpeed < 0) {
        gravitySwitched = 1;
      }
      else {
        gravitySwitched = -1;
      }

      // Sprung entweder mit Leertaste oder mit 'W'
      var upDown    = ctrl.up1.isDown || ctrl.up2.isDown;

      // Cheats: Mit '1' '2' und '0s' lassen sich Levels starten
      if(ctrl.lvl1.isDown) {
        game.state.start('level_1_1');
      }
      else if(ctrl.lvl2.isDown) {
        game.state.start('level_2_1');
      }
      else if(ctrl.lvl3.isDown) {
        game.state.start('level_3_1');
      }
      else if(ctrl.tut.isDown) {
        game.state.start('tutorial');
      }

      // Bestimmung ob der Spieler den Boden berührt
      // (wenn die Sprungkraft negativ ist, zeigt die Gravitation nach unten, vice-verse)
      if(gravitySwitched === 1) {
        // Gravitation nach unten
        grounded = p.body.blocked.down || p.body.touching.down;
      }
      else {
        // Gravitation nach oben
        grounded = p.body.blocked.up || p.body.touching.up;
      }

      // Laufrichtung & Animation
      // Spieler soll sich nur bewegen wenn entweder die Taste nach links oder nach rechts gedrückt ist
      if(rightDown && !leftDown) {
        // Spieler bewegt sich nach rechts
        p.body.velocity.x = p.walkSpeed;
        p.animations.play('walk');
        p.scale.x = gravitySwitched;
        p.body.setSize(54, 72, 0, 0);
      }
      else if(leftDown && !rightDown) {
        // Spieler bewegt sich nach links
        p.body.velocity.x = -p.walkSpeed;
        p.animations.play('walk');
        p.scale.x = -gravitySwitched;
        p.body.setSize(54, 72, 0, 0);
      }
      else {
        // Spieler steht still
        p.body.velocity.x = 0;
        // Stillstand-Animation soll nur spielen wenn der Charakter den Boden berührt
        if(grounded){p.animations.play('idle');}
        p.body.setSize(26, 72, 14, 0);
      }

      if(grounded) {
        // Spieler kann nur vom Boden springen
        if(upDown){
          p.body.velocity.y = p.jumpSpeed;
        }
      }
      else {
        // Falls er nicht am Boden ist, muss die Sprung-Animation gespielt werden
        p.animations.play('jump');
        p.body.setSize(54, 72, 0, 0);
        // Spieler darf eine gewisse Geschwindigkeit nicht überschreiten (Probleme mit der Physik)
        if(p.body.velocity.y > p.maxFallingSpeed) {
          p.body.velocity.y = p.maxFallingSpeed;
        }
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
  },
  create:function(){
    // Menu wird gestartet
    this.state.start('main_menu');
  }
}
