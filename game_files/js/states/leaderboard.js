/*
Das High-score System läuft über Google Firebase
der Code wurde grossteils von der Dokumentation übernommen und modifiziert
https://firebase.google.com/docs/database/web/read-and-write
*/

class Leaderboard extends Phaser.State {
  create() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDip3wz7_-m13S1-i-sOLOS6PBlanqSrj4",
      authDomain: "mission-reset.firebaseapp.com",
      projectId: "mission-reset"
    }
    firebase.initializeApp(config)
    this.database = firebase.firestore()
    this.path = this.database.doc('scoring/highscores')
    this.path.get().then(entry => {
      let data = entry.data()
    })
  }
  update() {
    self = this
  }
}

// Anzeigetext anfangs leer
var board = ['', ''];

Game.leaderboard = function() {};

Game.leaderboard.prototype = {
  init: function() {

    // Firebase soll nur gestartet werden, falls es noch nicht läuft
    if (!firebaseStarted) {

      // Firebase Login-Daten
      var config = {
        apiKey: 'AIzaSyDQUGKLU4HZAL0YTwEUejABnW-BaWklVzQ',
        authDomain: 'ma17-df8f1.firebaseapp.com',
        databaseURL: 'https://ma17-df8f1.firebaseio.com',
        projectId: 'ma17-df8f1',
        storageBucket: 'ma17-df8f1.appspot.com',
        messagingSenderId: '420780087481'
      };

      // Firebase wird initialisiert, login mit config-Daten
      firebase.initializeApp(config);

      // Firebase soll nur 1x starten
      firebaseStarted = true;
    }
  },
  create: function() {
    // Hintergrundbild
    this.add.sprite(0, 0, 'leaderboard_background');

    // Zurück-Knopf
    this.add.button(640, 140, 'leaderboard_button_back', function(){this.state.start('main_menu')}, this, 0, 1, 0);

    // 'lvl' kann später genutzt werden um die Highscores für bestimmte Levels anzuzeigen
    var lvl = 'total';

    // Eintragspositionen
    this.text_row1 = this.add.bitmapText(200, 200, 'debug_font','',24);
    this.text_row2 = this.add.bitmapText(300, 200, 'debug_font','',24);

    // Daten werden abgerufen und beim Eintreffen wird die 'writeScore'-Funktion gestartet (ansynchron)
    var data = firebase.database().ref(lvl);
    data.on('value', this.writeScore);
  },
  update: function() {
    // Anzeige der Einträge
    this.text_row1.setText(board[0]);
    this.text_row2.setText(board[1]);
  },
  writeScore: function(snapshot) {
    // Abspeicherung der eingetroffenen Einträge
    let s = snapshot.val();

    // Reset bisheriger Einträge (sonst würden die neuen bloss unten hinzugefügt werden)
    board = ['', ''];

    // Einzelner Eintrag hinzugefügt, jeweils auf eine neue Zeile
    for (var i in s) {
      board[0] += s[i][0].toUpperCase() + '\n';
      board[1] += s[i][1].toUpperCase() + '\n';
    }
  }
}
