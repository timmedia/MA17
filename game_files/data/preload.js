Game.preload = function() {};

Game.preload.prototype = {
  preload:function(){
    // Ladebalken wird bestimmt und angezeigt
    this.preload_graphic = this.add.sprite(0, 0, 'preload_graphic');
    this.load.setPreloadSprite(this.preload_graphic);

    // Datein für level_1_1 werden geladen
    this.load.tilemap('map_1_1', 'assets/map/level_1_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('water_1', 'assets/graphics/water_1.gif', 150, 250);
    this.load.image('1_1_background', 'assets/graphics/level_1_1/background.gif');
    this.load.image('1_1_midground', 'assets/graphics/level_1_1/midground.gif');
    this.load.image('1_1_foreground', 'assets/graphics/level_1_1/foreground.gif');
    this.load.image('1_1_box', 'assets/graphics/level_1_1/box.gif');
    this.load.image('1_1_bridge', 'assets/graphics/level_1_1/bridge.gif');
    this.load.spritesheet('1_1_water_splash', 'assets/graphics/level_1_1/water_splash.gif', 177, 50);
    this.load.spritesheet('1_1_water_foreground', 'assets/graphics/level_1_1/water_foreground.png', 1210, 25);
    this.load.spritesheet('1_1_door', 'assets/graphics/level_1_1/door.gif', 75, 107);

    // Dateien level_2_1
    this.load.tilemap('map_2_1', 'assets/map/level_2_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);
    this.load.spritesheet('water_2_1', 'assets/graphics/level_2_1/water_2_1.gif', 61, 312);

    // Debug/Platzhaltergrafiken
    this.load.image('debug_box', 'assets/graphics/debug/debug_box.gif');
    this.load.spritesheet('debug_button', 'assets/graphics/debug/debug_button.gif', 20, 7);
    this.load.image('debug10x10', 'assets/graphics/debug/tile10x10.gif');
    this.load.image('empty10x10', 'assets/graphics/debug/empty10x10.gif');
    this.load.spritesheet('debug_door', 'assets/graphics/debug/debug_door.gif', 50, 80);
    this.load.image('debug_bridge', 'assets/graphics/debug/debug_bridge.gif');
    this.load.image('debug_key', 'assets/graphics/debug/debug_key.gif');
    this.load.bitmapFont('debug_font', 'assets/font/debug/debug_font.png', 'assets/font/debug/debug_font.xml');

    // Menu Dateien
    this.load.image('menu_screen', 'assets/graphics/main_menu/menu_screen.gif');
    this.load.spritesheet('button_start_game', 'assets/graphics/main_menu/button_start_game.gif', 300, 60);
    this.load.spritesheet('button_leaderboard', 'assets/graphics/main_menu/button_leaderboard.gif', 300, 60);

    // Tutorial-Welt Dateien
    this.load.tilemap('map_tutorial', 'assets/map/tutorial.json', null, Phaser.Tilemap.TILED_JSON);

    // Leaderboard Dateien
    this.load.image('leaderboard_background', 'assets/graphics/leaderboard/leaderboard_background.gif');
    this.load.image('leaderboard_button_back', 'assets/graphics/leaderboard/leaderboard_button_back.gif');

    // Keyboard Inputs
    controls = {
      right:  this.input.keyboard.addKey(Phaser.Keyboard.D),
      left:   this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:    this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:    this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      lvl1:   this.input.keyboard.addKey(Phaser.Keyboard.ONE),
      lvl2:   this.input.keyboard.addKey(Phaser.Keyboard.TWO),
      lvl3:   this.input.keyboard.addKey(Phaser.Keyboard.THREE)
    }

    // Globale Funktion: Input-Abfrage ist in jedem Level gleich
    checkInput = function(p, ctrl) {
      // benötigte Variablen
      var grounded;
      var rightDown = ctrl.right.isDown;
      var leftDown  = ctrl.left.isDown;
      // Sprung entweder mit Leertaste oder mit 'W'
      var upDown    = ctrl.up1.isDown || ctrl.up2.isDown;

      // Cheats: Mit '1' und '2' lassen sich Levels starten
      if(ctrl.lvl1.isDown) {
        game.state.start('level_1_1');
      }
      else if(ctrl.lvl2.isDown){
        game.state.start('level_2_1');
      }

      // Bestimmung in welche Richtung die Gravitationskraft zeigt (Anhand von Sprungkraft)
      if(p.jumpSpeed < 0) {
        grounded = p.body.blocked.down || p.body.touching.down;
      }
      else {
        grounded = p.body.blocked.up || p.body.touching.up;
      }

      // Laufrichtung & Animation
      if(rightDown && !leftDown) {
        if(p.body.velocity.x < p.walkSpeed){
          p.body.velocity.x += 15;
        }
        p.animations.play('walk');
      }
      else if(leftDown && !rightDown) {
        if(p.body.velocity.x > -p.walkSpeed){
          p.body.velocity.x -= 15;
        }
        p.animations.play('walk');
      }
      else {
        p.body.velocity.x = 0;
        if(grounded){p.animations.play('idle');}
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
        // Spieler darf eine gewisse Geschwindigkeit nicht überschreiten (Probleme mit der Physik)
        if(p.body.velocity.y > p.maxFallingSpeed) {
          p.body.velocity.y = p.maxFallingSpeed;
        }
      }
    }
  },
  create:function(){
    // Menu wird gestartet
    this.state.start('main_menu');
  }
}
