class Menu extends Phaser.State {
  create() {
    let background = this.add.sprite(0, 0, 'Menu Background')
    this.lights = this.add.sprite(174, 308, 'Menu Lights')
    this.michael = this.add.sprite(310, 318, 'Menu Michael')
    this.michael.animations.add('idle', [0, 1, 2, 3], 2, true)
    this.michael.animations.play('idle')
    let vignette = this.add.sprite(0, 0, 'Menu Vignette')

    this.buttonPlay = this.add.button(108, 93, 'Menu Play')
  }
  update() {
  }
}

Game.main_menu = function(){};

Game.main_menu.prototype = {
  init:function() {
    //game.state.start('tutorial');
  },
  create:function(){
    // Hintergrundbild
    this.add.sprite(0, 0, 'menu_screen');
    // Wasserfall
    this.water = this.add.sprite(120, 0, '1_1_waterfall');
    this.water.animations.add('running_down', [0,1,2,3], 10, true);
    this.water.animations.play('running_down');
    // Knöpfe werden hinzugefügt, sollen Spiel oder Scoreboard-State starten
    this.add.button(170, 350, 'button_start_game', function(){this.state.start('tutorial')}, this, 1,0,1);
    this.add.button(420, 360, 'button_leaderboard', function(){this.state.start('leaderboard')}, this, 1,0,1);

    // schwarzer Overlay
    this.blackscreen = this.add.sprite(0, 0, 'blackscreen');
    this.add.tween(this.blackscreen).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
  }
}
