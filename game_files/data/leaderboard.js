/*
Das High-score System läuft über Google Firebase, der Code wurde grossteils von der Dokumentation übernommen und verändert.
https://firebase.google.com/docs/database/web/read-and-write
*/
var board;
Game.leaderboard = function() {};

Game.leaderboard.prototype = {
  init:function() {
    // Firebase Login-Daten
    if (!firebaseStarted) {
      var config = {
        apiKey: "AIzaSyDQUGKLU4HZAL0YTwEUejABnW-BaWklVzQ",
        authDomain: "ma17-df8f1.firebaseapp.com",
        databaseURL: "https://ma17-df8f1.firebaseio.com",
        projectId: "ma17-df8f1",
        storageBucket: "ma17-df8f1.appspot.com",
        messagingSenderId: "420780087481"
      };
      // Firebase wird initialisiert
      firebase.initializeApp(config);
      firebaseStarted = true;
    }
  },
  create:function() {
    // Hintergrundbild
    this.add.sprite(0, 0, 'leaderboard_background');
    // Zurück Knopf
    this.add.button(640, 140, 'leaderboard_button_back', function(){this.state.start('main_menu')}, this, 0,1,0);
    // 'lvl' kann später genutzt werden um die Highscores für bestimmte Levels anzuzeigen
    var lvl = 'total';
    // Daten werden geladen und beim 'Eintreffen' einzeln zurückgegeben
    var data = firebase.database().ref(lvl);
    data.on('value', function(snapshot){
      board = snapshot.val();
      for (var i in board) {
        // Einzelner Eintrag wird gerendert
        console.log(board[i]);
      }
    });
  }
}
