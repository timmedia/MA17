Game.main_menu = function(){};

Game.main_menu.prototype = {
  init:function() {
    //game.state.start('tutorial');
  },
  create:function(){
    // Hintergrundbild
    this.add.sprite(0, 0, 'menu_screen');
    // Knöpfe werden hinzugefügt, sollen Spiel oder Scoreboard-State starten
    this.add.button(100, 250, 'button_start_game', function(){this.state.start('tutorial')}, this, 0,1,0);
    this.add.button(400, 250, 'button_leaderboard', function(){this.state.start('leaderboard')}, this, 0,1,0);
  }
}
