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

    // Mentor
    this.michael = this.add.sprite(155, 440, 'tutorial_michael');
    this.michael.anchor.setTo(0.5, 1);

    // Anweisungen (erste Sprechblase, frame 0)
    this.speechbubble = this.add.sprite(257, 300, 'tutorial_speechbubbles');
    this.speechbubble.anchor.setTo(0.5, 0.5);
    this.speechbubble.frame = 0;
    this.speechbubble.scale.setTo(0, 0);
    this.speechbubble.busy = true;

    // Funktion um Sprechblase zu öffnen
    this.speechbubble.openBubble = function(n) {
      // n-tes frame der Spritesheet wird angezeigt
      this.speechbubble.frame = n;
      // Animation (vergrössert)
      this.add.tween(this.speechbubble.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.Out, true);
      // Nächste Animation soll nur nach dieser ablaufen
      this.speechbubble.busy = false;
    }

    // Funktion um Sprechblase zu schliessen
    this.speechbubble.closeBubble = function() {
      // Animation (verkleinert)
      this.add.tween(this.speechbubble.scale).to({x: 0, y: 0}, 200, Phaser.Easing.Quadratic.InOut, true);
    }

    // Koordinaten der Türe ab JSON
    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, '1_1_door', 'up', true, function(){
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

    // Spieler wird hinzugefügt
    this.player = new Player(300, 300, 'player_1', 300, -800, this);

    // Vordergrund
    this.foreground = this.add.sprite(0, 0, 'tutorial_foreground');

    // schwarzer Overlay
    this.blackscreen = this.add.sprite(0, 0, 'blackscreen');
    this.add.tween(this.blackscreen).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
    this.time.events.add(1500, this.speechbubble.openBubble, this, 0);

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

    checkInput(this.player, controls);

    this.michaelCheck();
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
  },
  michaelCheck: function() {
    // switch, welche Sprechblase gerade angezeigt wird
    switch (this.speechbubble.frame) {
      // erste Sprechblase (laufen)
      case 0:
        // Sprechblase soll weggehen wenn der Spieler läuft
        if (!this.speechbubble.busy && this.player.body.velocity.x != 0) {
          // Verzögerung von 2 Sekunden
          this.time.events.add(2000, this.speechbubble.closeBubble, this);
          this.speechbubble.busy = true;
          this.time.events.add(2500, this.speechbubble.openBubble, this, 1);
        }
        break;
      // zweite Sprechblase (springen)
      case 1:
        // Sprechblase soll beim Sprung verschwinden
        if (!this.speechbubble.busy && this.player.body.velocity.y != 0) {
          // Verzögerung
          this.time.events.add(1000, this.speechbubble.closeBubble, this);
          this.speechbubble.busy = true;
          this.time.events.add(500, this.speechbubble.openBubble, this, 2);
        }
        break;
      // Dritte Sprechblase (Türe berühren)
      case 2:
        if (!this.speechbubble.busy) {
          // Kollisionscheck: Berührung der Türe
          this.physics.arcade.overlap(this.player, this.door, function(){
            // Türe wurde berührt
            this.time.events.add(2000, this.speechbubble.closeBubble, this);
            this.speechbubble.busy = true;
            this.time.events.add(2500, this.speechbubble.openBubble, this, 3);
          }, null, this);
        }
        break;
      // Vierte Sprechblase (Knopf drücken)
      case 3:
        if (!this.speechbubble.busy) {
          // Kollisionscheck: Berührung Knopf
          this.physics.arcade.overlap(this.player, this.button, function(){
            // Knopf wurde gedrückt
            this.speechbubble.closeBubble.call(this);
            this.speechbubble.busy = true;
            this.time.events.add(500, this.speechbubble.openBubble, this, 4);
          }, null, this);
        }
        break;
      default:
        break;
    }
  }
}
