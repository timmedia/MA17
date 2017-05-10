Game.preload = function() {
  this.preload_graphic = null;
};

Game.preload.prototype = {
  preload:function(){
    // Ladebalken wird bestimmt und angezeigt
    this.preload_graphic = this.add.sprite(0, 0, 'preload_graphic');
    this.load.setPreloadSprite(this.preload_graphic);

    // Datein für level_1_1 werden geladen
    this.load.tilemap('map_1_1', 'assets/map/level_1_1.csv');
    this.load.spritesheet('water_1', 'assets/graphics/water_1.gif', 150, 250);
    this.load.image('background_1_1', 'assets/graphics/background_1_1.gif');
    //this.load.spritesheet('player_1_1', 'assets/graphics/player_1_1.gif', 40, 80);
    this.load.spritesheet('bridge_1', 'assets/graphics/debug/bridge_1.gif', 150, 150);

    // Dateien level_2_1
    this.load.tilemap('map_2_1', 'assets/map/level_2_1.csv');
    this.load.spritesheet('player_2_1', 'assets/graphics/level_2_1/player_2_1.gif', 40, 68);

    // Debug/Platzhaltergrafiken
    this.load.image('box_1', 'assets/graphics/debug/box.gif');
    this.load.spritesheet('button_1', 'assets/graphics/debug/button.gif', 20, 7);
    this.load.image('debug10x10', 'assets/graphics/debug/tile10x10.gif');
    this.load.spritesheet('debug_door', 'assets/graphics/debug/door.gif', 50, 80);

    // Menu Dateien
    this.load.image('menu_screen', 'assets/graphics/main_menu/menu_screen.gif');
    this.load.spritesheet('button_start_game', 'assets/graphics/main_menu/button_start_game.gif', 300, 60);
    this.load.spritesheet('button_leaderboard', 'assets/graphics/main_menu/button_leaderboard.gif', 300, 60);

    // Leaderboard Dateien
    this.load.image('leaderboard_background', 'assets/graphics/leaderboard/leaderboard_background.gif');
    this.load.image('leaderboard_button_back', 'assets/graphics/leaderboard/leaderboard_button_back.gif');

    // Globale variable: Keyboard Inputss
    controls = {
      right:this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up1:  this.input.keyboard.addKey(Phaser.Keyboard.W),
      up2:  this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

    // Globale Funktion: Keyboard inout ist in jedem Level gleich
    checkInput = function(p, ctrl) {
      var grounded;
      var rightDown = ctrl.right.isDown;
      var leftDown  = ctrl.left.isDown;
      var upDown    = ctrl.up1.isDown || ctrl.up2.isDown;

      // Bestimmung in welcher Richtung die Gravitationskrafe ist (Anhand von Sprungkraft)
      if(p.jumpSpeed < 0){
        grounded = p.body.blocked.down || p.body.touching.down;
      }
      else {
        grounded = p.body.blocked.up || p.body.touching.up;
      }

      // Laufrichtung & Animation
      if(rightDown && !leftDown) {
        p.body.velocity.x = p.walkSpeed;
        p.animations.play('walk');
      }
      else if(leftDown && !rightDown) {
        p.body.velocity.x = -p.walkSpeed;
        p.animations.play('walk');
      }
      else {
        p.body.velocity.x = 0;
        if(grounded){p.animations.play('idle');}
      }

      // Spieler kann nur vom Boden springen
      if(grounded) {
        if(upDown){
          p.body.velocity.y = p.jumpSpeed;
        }
      }
      else {
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
