Game.tutorial = function() {};

Game.tutorial.prototype = {
  create:function(){
    // Hintergrundbild
    this.background = this.add.sprite(0, 0, 'tutorial_background');

    // Level data ab JSON Datei
    this.map = this.add.tilemap('map_tutorial');

    // Debug-Grafik, Tilemaps dienen bloss zur Kollisionsbestimmung
    this.map.addTilesetImage('debug10x10', 'empty10x10');

    // Kollision mit Karte
    this.map.setCollisionBetween(0, 2);

    // Karte als Layer
    this.layer = this.map.createLayer('Tile Layer 1');

    // Hintergrundbild
    this.miground = this.add.sprite(0, 0, 'tutorial_midground');

    // Koordinaten der Türe ab JSON
    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, 'debug_door', 'up', true, function(){
        this.state.start('level_1_1');
      }, this);
    }, this);

    // Koordinaten der Kiste ab JSON
    this.map.objects['Object Layer Boxes'].forEach(function(box){
      this.box = new Box(box.x, box.y, '1_1_box', 5000, 0.5, this);
    }, this);

    // Knopf wird hinzugefügt
    this.button = new Button(790, 380, '1_1_button', 'left', this.buttonPress, this);

    // Schlüssel wird hinzugefügt, soll nicht von Anfang an sichtbar sein
    this.key = new Key(600, 155, '2_1_key', this.collectKey, this);
    this.key.visible = false;

    // Schlüssel soll nur einen Effekt haben, wenn er sichtbar ist
    this.key.processCallback = function() {
      if(this.key.visible) {return true;}
      else {return false;}
    }

    // Mentor
    this.michael = this.add.sprite(80, 440, 'tutorial_michael');
    this.michael.anchor.setTo(0.5, 1);

    // Spieler wird hinzugefügt
    this.player = new Player(200, 300, 'player_2_1', 300, -800, this);

    // Vordergrund
    this.foreground = this.add.sprite(0, 0, 'tutorial_foreground');

    // Gravitationskraft
    this.physics.arcade.gravity.y = 2000;
  },
  update:function(){
    // Kollision ohne Effekt
    this.physics.arcade.collide(this.player, [this.layer, this.box]);
    this.physics.arcade.collide(this.layer, this.box);

    // Knopfdruck soll Schlüssel erscheinen lassen
    this.physics.arcade.overlap(this.player, this.button, this.button.collideCallback, null, this);

    // Berühren des Schlüssels soll Türe öffnen (aber nur wenn Schlüssel sichtbar ist)
    this.physics.arcade.overlap(this.player, this.key, this.key.collideCallback, this.key.processCallback, this);

    // Kollision mit Türe, kann nur geöffnet werden wenn nicht verschlossen
    this.physics.arcade.overlap(this.player, this.door, this.door.collideCallback, this.door.processCallback, this);

    // Input wird abgefragt
    checkInput(this.player, controls);
  },
  buttonPress: function() {
    // Knopfdruck: Schlüssel soll sichtbar sein
    if(!this.key.visible) {
      this.key.visible = true;
    }
  },
  collectKey: function() {
    // Berühren des Schlüssels soll Türe öffnen und Schlüssel zerstören
    this.door.unlock();
    this.key.destroy();
  }
}
