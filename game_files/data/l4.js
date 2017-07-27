Game.l4 = function() {};

Game.l4.prototype.create = function() {
  LoadMapData(this, 'l4_map');
  this.world.setBounds(0, 0, 800, 2000);
  this.physics.arcade.gravity.y = 1300;

  this.player = new Player(this, 200, 300, 'player_1', 300, -600);
  this.camera.follow(this.player);                                          // Kamera soll Spieler folgen
  this.player.checkWorldBounds = true;
  this.player.events.onOutOfBounds.add(function() {
    if (this.player.y > 0) {this.killPlayer();}
  }, this);

  LevelFade(this);
}

Game.l4.prototype.update = function() {
    this.physics.arcade.collide(this.layer, this.player);
}

Game.l4.prototype.killPlayer = function() {
  this.state.restart();
}
