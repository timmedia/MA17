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
