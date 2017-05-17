/*
Das High-score System läuft über Google Firebase, der Code wurde grossteils von der Dokumentation übernommen und verändert.
https://firebase.google.com/docs/database/web/read-and-write
*/
var board = ['', ''];
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
    this.textPositions = [[10, 20], [10, 40], [10, 50], [10, 50], [10, 60], [100, 20], [100, 30], [100, 40], [100, 50], [100, 60]];
  },
  create:function() {
    // Hintergrundbild
    this.add.sprite(0, 0, 'leaderboard_background');
    // Zurück Knopf
    this.add.button(640, 140, 'leaderboard_button_back', function(){this.state.start('main_menu')}, this, 0,1,0);
    // 'lvl' kann später genutzt werden um die Highscores für bestimmte Levels anzuzeigen
    var lvl = 'total';
    this.text_row1 = this.add.bitmapText(200, 200, 'debug_font','',24);
    this.text_row2 = this.add.bitmapText(300, 200, 'debug_font','',24);
    // Daten werden geladen und beim 'Eintreffen' einzeln zurückgegeben
    var data = firebase.database().ref(lvl);
    data.on('value', this.writeScore);

  },
  update:function() {
    this.text_row1.setText(board[0]);
    this.text_row2.setText(board[1]);
  },
  writeScore:function(snapshot){
    let s = snapshot.val();
    board = ['', ''];
    for (var i in s) {
      // Einzelner Eintrag wird gerendert
      console.log(s[i]);
      board[0] += s[i][0].toUpperCase() + '\n';
      board[1] += s[i][1].toUpperCase() + '\n';
    }
  }
}
