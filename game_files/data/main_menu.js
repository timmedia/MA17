Game.main_menu = function(){};

Game.main_menu.prototype = {
  create:function(){
    this.add.sprite(0, 0, 'menu_screen');
    //(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group)
    this.add.button(100, 250, 'button_start_game', function(){this.state.start('level_2_1')}, this, 0,1,0);
    this.add.button(400, 250, 'button_leaderboard', function(){this.state.start('leaderboard')}, this, 0,1,0);
    this.game.debug.text('etst', 200, 200);
  }
}
