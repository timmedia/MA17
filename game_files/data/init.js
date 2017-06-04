// globale Variablen
var game;
var controls;
var checkInput;
var score;
var firebaseStarted = false;
var fullscreen;

function init() {
  // Kontextmenu (Rechtsklick, btw. langer Druck auf Mobilgeräten) wird deaktiviert
  // Lösung von: http://stackoverflow.com/q/3413683/
  window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
  };

  // Neues Spiel-Objekt ab Vorlage von Phaser
  game = new Phaser.Game(800, 450, Phaser.CANVAS, '', null, false, false);

  // Alle States werden hinzugefügt & die erste gestartet
  game.state.add('startup', Game.startup);
  game.state.add('preload', Game.preload);
  game.state.add('leaderboard', Game.leaderboard);
  game.state.add('main_menu', Game.main_menu);
  game.state.add('tutorial', Game.tutorial);
  game.state.add('level_1_1', Game.level_1_1);
  game.state.add('level_2_1', Game.level_2_1);
  game.state.add('level_3_1', Game.level_3_1);
  game.state.add('concept_1', Game.concept_1);
  game.state.add('concept_2', Game.concept_2);
  game.state.start('startup');
}
