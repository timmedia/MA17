var game;
var controls;
var checkInput;
var score;

function init() {
  // Disable the context menu on mobile browsers
  // Adapted from: http://stackoverflow.com/questions/3413683/disabling-the-context-menu-on-long-taps-on-android
  window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
  };

  game = new Phaser.Game(800, 450, Phaser.CANVAS, "", null, false, false);
  game.state.add('startup', Game.startup);
  game.state.add('preload', Game.preload);
  game.state.add('leaderboard', Game.leaderboard);
  game.state.add('main_menu', Game.main_menu);
  game.state.add('level_1_1', Game.level_1_1);
  game.state.add('level_2_1', Game.level_2_1);

  game.state.start('startup');
}
