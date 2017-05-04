/*
Highscore runs over Google Firebase, allws real time updates
https://firebase.google.com/docs/database/web/read-and-write
*/
var board;
Game.leaderboard = function() {};

Game.leaderboard.prototype = {
  init:function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDQUGKLU4HZAL0YTwEUejABnW-BaWklVzQ",
      authDomain: "ma17-df8f1.firebaseapp.com",
      databaseURL: "https://ma17-df8f1.firebaseio.com",
      projectId: "ma17-df8f1",
      storageBucket: "ma17-df8f1.appspot.com",
      messagingSenderId: "420780087481"
    };
    firebase.initializeApp(config);
  },
  preload:function() {

    var lvl = 'level_1_1';

    var data = firebase.database().ref(lvl);
    data.on('value', function(snapshot){
      board = snapshot.val();
      console.log(lvl);
      for (var i in board) {
        console.log(board[i][0], board[i][1]);
      }
    });


  },
  create:function() {
    this.add.sprite(0, 0, 'leaderboard_background')

  }
}
