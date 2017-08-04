// globale Variablen
var controls;
var checkInput;
var checkTime;
var score;
var firebaseStarted = false;
var fullscreen;

function init() {
  // Kontextmenu (Rechtsklick, btw. langer Druck auf Mobilgeräten) wird deaktiviert
  // Lösung von: http://stackoverflow.com/q/3413683/
  window.oncontextmenu = function (event) {
     event.preventDefault()
     event.stopPropagation()
     return false
  }

  // Neues Spiel-Objekt ab Vorlage von Phaser
  window.game = new Game()

  // Alle States werden hinzugefügt & die erste gestartet
  // Game.state.add('Startup', Startup);
  // Game.state.add('Preload', Preload);
  // Game.state.add('leaderboard', Game.leaderboard);
  // Game.state.add('main_menu', Game.main_menu);
  // Game.state.add('tutorial', Game.tutorial);
  // Game.state.add('Tutorial', Tutorial);
  // // game.state.add('level_2_1', Game.level_2_1);
  // Game.state.add('level_3_1', Game.level_3_1);
  // Game.state.add('concept_1', Game.concept_1);
  // Game.state.add('concept_2', Game.concept_2);
  // Game.state.add('Level01', Level01);
  // Game.state.add('Level02', Level02);
  // Game.state.add('Level03', Level03);
  // Game.state.add('Level05', Level05);
  // Game.state.start('Startup');
}

class Game extends Phaser.Game {
  constructor() {
    super(800, 480, Phaser.Canvas, null, null, null, false)
    this.state.add('Startup', Startup, true)
    this.state.add('Preload', Preload)
    this.state.add('Level01', Level01)
    this.state.add('Level02', Level02)
    this.state.add('Level03', Level03)
    this.state.add('Level05', Level05)
    this.state.start('Startup')
  }
}
