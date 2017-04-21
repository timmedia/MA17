/*
Highscore runs over Google Firebase, allws real time updates
https://firebase.google.com/docs/database/web/read-and-write
*/

Game.leaderboard = function() {};

Game.leaderboard.prototype = {
  init:function() {
    var config = {
                    apiKey: "AIzaSyCONHLqCYwZfZJQC8TWJjZUiNkAV_p-o1g",
                    authDomain: "pullback-f63ee.firebaseapp.com",
                    databaseURL: "https://pullback-f63ee.firebaseio.com",
                    storageBucket: "pullback-f63ee.appspot.com",
                    messagingSenderId: "243864016362"
                };
    firebase.initializeApp(config);
  },
  preload:function() {
    this.x = firebase.database().ref('scores/level_2').once('value').then(function(snapshot) {
    return snapshot.val();
    });
  },
  create:function() {

  },
  update:function() {

  }
}
