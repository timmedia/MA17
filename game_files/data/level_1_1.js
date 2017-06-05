/*
Beschreibung einiger Funktionen mit vielleicht weniger offensichtlichen Argumenten:
(Kann auch unter http://phaserchains.boniatillo.com/ nachgeschlagen werden.)

Hinzufügen einer Grafik: this.add.sprite(arg1, arg2, arg3)
arg1: X-Koordinate der Grafik
arg2: Y-Koordinate der Grafik
arg3: Name der Grafik (key mit der sie in preload.js definiert wurde)

Festpunkt der Grafik 'BeispielGrafik': this.BeispielGrafik.anchor.setTo(arg1, arg3)
(Dieser Punkt der Grafik wird an den oben bestimmten Koordinaten gesetzt, default (0, 0).)
arg1: X-Koordinate (% vom Sprite)
arg2: Y-Koordinate (% vom Sprite)
Bsp: mitte (0.5, 0.5); oben links (0, 0); unten rechts (1, 1)

Grösse der Welt limitieren: this.world.setBounds(arg1, arg2, arg3, arg4)
arg1: X offset (Pixel)
arg2: Y offset (Pixel)
arg3: Grösse X-Richtung (Pixel)
arg4: Grösse Y-Richtung (Pixel)

Tilemap-Grafik von 'BeispielMap': this.BeispielMap.addTilesetImage(arg1, arg2)
(Grafik der Blöcke, es muss eine gesetzt werden)
arg1: Name der in 'Tiled' verwendeten Grafik (steht in der Karten-JSON)
arg2: Name (key) der im Proload geladenen Grafik ('empty10x10' ist eine leere Grafik)

Kollision mit Tilemap aktivieren: this.BeispielMap.setCollision(arg1)
arg1: Index der verwendeten Grafik in 'Tiled' (hier 1)

Hitbox bestimmen (verkleinern/vergrössern): this.BeispielGrafik.body.setSize(arg1, arg2, arg3, arg4)
arg1: Breite (Pixel)
arg2: Höhe (Pixel)
arg3: Offset X-Richtung (von links)
arg4: Offset Y-Richtung (von oben)

Animation hinzufügen: this.BeispielGrafik.animations.add(arg1, arg2, arg3, arg4)
arg1: Name (key) der Animation
arg2: Index-Zahlen der Frames von der Spritesheet & Reihenfolge der Bilder (Array)
arg3: Animationsgeschwindigkeit (frames per second)
arg4: Loop (ja/nein, true/false)

Tween-Animation: this.add.tween(arg1).to(arg2, arg3, arg4, arg5);
(Verändert einen Wert über eine bestimmte Zeit, ähnlich wie Keyframes)
arg1: Objekt andem etwas geändert werden soll
arg2: veränderbare Variable & Endwert ({variable: Wert})
arg3: Länge (Zeit [ms])
arg3: Art des Überganges
arg5: Autostart (ja/nein, true/false)

Funktion später ausführen: this.time.events.add(arg1, arg2, arg3);
arg1: Wartezeit [ms]
arg2: Funktion welche ausgeführt werden soll
arg3: Kontext in dem die Funktion ausgeführt wird

Funktion nach Animation: this.BeispielGrafik.animations.currentAnim.onComplete.add(arg1, arg2);
arg1: Funktion welche ausgeführt werden soll
arg2: Kontext in dem die Funktion ausgeführt wird

Funktion nach Verlassen der Canvas: this.BeispielGrafik.events.onOutOfBounds.add(arg1, arg2);
(Diese Funktion wird ausgeführt wenn die 'BeispielGrafik' das sichtbare Feld verlässt.)
(Erfordert this.BeispielGrafik.checkWorldBounds = true;)
arg1: Funktion
arg2: Kontext der Funktion

Kollisionscheck: this.physics.arcade.collide(arg1, arg2, arg3, arg4, arg5);
(Testet ob sich zwei Objekte berühren.)
arg1: Objekt 1 (Variable / Gruppe / Tilemap / Array mit mehreren Objekten)
arg2: Objekt 2 (gleich wie arg1)
arg3 (optional): Funktion welche bei Kollision aufgerufen werden soll
arg4 (optional): Funktion welche zuerst aufgerufen wird, kann zusätzliche Checks durchführen, Kollision passiert nur bei return von 'true'
arg5: Kontext der Funktionen

Kollisionscheck: this.physics.arcade.overlap(arg1, arg2, arg3, arg4, arg5);
(Gleich wie .collide, bloss dass hier sich die Objekte überlagern dürfen)

*/

// level_1_1 state als leere Funktion
Game.level_1_1 = function() {};

// Prototyp der Funktion wird definiert
Game.level_1_1.prototype = {
  create: function() {
    // Hintergrund
    this.background = this.add.sprite(0, 0, '1_1_background');

    // Weltgrösse wird beschränkt
    this.world.setBounds(0, 0, 1200, 450);

    // Level data ab JSON Datei, leere Grafik, soll mit Objekten kollidieren
    this.map = this.add.tilemap('1_1_map');
    this.map.addTilesetImage('debug10x10', 'empty10x10');
    this.map.setCollision(1);

    // Tilemap als Layer (für Kollisionsüberprüfung)
    this.layer = this.map.createLayer('Tile Layer 1');

    // Mittelgrund
    this.midground = this.add.sprite(0, 0, '1_1_midground');

    // Gravitationskraft
    this.physics.arcade.gravity.y = 2000;

    // Überall wo in der JSON-Datei eine Box plaziert wurde, soll ein Box-Objekt hin
    // Lösung von: https://gist.github.com/jdfight/9646833f9bbdcb1104db
    this.boxes = this.game.add.group();
    this.map.objects['Object Layer Boxes'].forEach(function(box){
      this.boxes.add(new Box(box.x, box.y, '1_1_box', 5000, 0.5, this));
    }, this);

    this.map.objects['Object Layer Door'].forEach(function(door){
      this.door = new Door(door.x, door.y, '1_1_door', 'up', false, this.startNextLevel, this);
    }, this);

    // Wasserfall, Sprite wird hinzugefügt, Festpunkt in der Mitte
    this.water = this.add.sprite(495, 120, '1_1_waterfall');
    this.water.anchor.setTo(0.5, 0.5);

    // Wasserfall Animationen
    this.water.animations.add('running_down', [0,1,2,3], 10, true);
    this.water.animations.add('transition', [4,5,6,7], 10, false);
    this.water.animations.add('running_up', [8,9,10,11], 10, true);
    this.water.animations.play('running_down');

    // Wasserfall: Physik wird aktiviert, jedoch ohne Bewegung, Hitbox verkleinert
    this.physics.arcade.enable(this.water);
    this.water.body.moves = false;
    this.water.body.setSize(150, 240, 25, 0);

    // Sprite der Brücke, Festpunkt
    this.bridge = this.add.sprite(420, 120, '1_1_bridge');
    this.bridge.anchor.setTo(0, 1);

    // Brücke: Physik aktiviert, kann sich nicht bewegen, Hitbox gesetzt (funktioniert noch nicht 100%)
    this.physics.arcade.enable(this.bridge);
    this.bridge.body.moves = false;
    this.bridge.body.setSize(10, 150, -10, 0);

    // Brücke ist nicht unten (wird später benötigt)
    this.bridge.down = false;

    // Platschen des Wassers, soll nur sichtbar sein wenn die Brücke unten ist -> standargemäss nicht
    this.water_splash = this.add.sprite(405, 70, '1_1_water_splash');
    this.water_splash.animations.add('splash', [0,1,2,3], 10, true);
    this.water_splash.visible = false;

    // Funktion, welche aktiviert wird, wenn die Brücke nach oben/untern klappt
    this.bridge.switch = function() {
      // Brücke geht rauf/runter
      if(this.bridge.down) {
        // Animation der Brücke nach oben
        this.add.tween(this.bridge).to({angle: 0}, 500, Phaser.Easing.Cubic.Out, true);
        // Platschen des Wasser soll aufhören & nicht sichtbar sein
        this.water_splash.animations.stop();
        this.water_splash.visible = false;
        this.bridge.down = false;
        // Andere Animation des Wasserfalls
        this.water.animations.play('running_down');
        // Hitboxen verändert
        this.water.body.setSize(150, 240, 25, 0);
        this.bridge.body.setSize(10, 150, -10, 0);
      }
      else {
        // Brücke geht nach unten; wenn sie unten ist (nach 500ms), soll das Platschen erscheinen
        this.add.tween(this.bridge).to({angle: 90}, 500, Phaser.Easing.Cubic.Out,true);
        this.time.events.add(500, function(){this.water_splash.animations.play('splash'); this.water_splash.visible = true;}, this);
        this.bridge.down = true;
        this.water.animations.play('transition');
        // Nach dem Übergang soll normale Animation wieder spielen
        this.water.animations.currentAnim.onComplete.add(function(){this.water.animations.play('running_up')}, this);
        this.water.body.setSize(150, 100, 25, 0);
        this.bridge.body.setSize(150, 150, 0, 20);
      }
    }

    // Knopfdruck lässt die Brücke fallen/nach oben gehen
    this.button = new Button(350, 120, '1_1_button', 'down', this.bridge.switch, this);

    //Spieler wird hinzugefügt
    this.player = new Player(100, 300, 'player_1', 300, -800, this);

    // Wenn der Spieler das Sichtbare Spielfeld verlässt (und y-Koord. > 0: nicht oben, nur unten) wird das Level neu gestartet
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(function(){if(this.player.y > 0) {this.killPlayer();}}, this);

    // Vordergrund (Wasser), animiert
    this.water_foreground = this.add.sprite(0, 450, '1_1_water_foreground');
    this.water_foreground.animations.add('moving', [0,1,2,3,4,5], 5, true);
    this.water_foreground.animations.play('moving');
    this.water_foreground.anchor.setTo(0, 1);

    // Vordergrund (Kabel in der Luft)
    this.foreground = this.add.sprite(0, 0, '1_1_foreground');

    // Kamera folgt dem Spieler
    this.camera.follow(this.player);

    // schwarzer Overlay
    this.blackscreen = this.add.sprite(0, 0, 'blackscreen');
    this.add.tween(this.blackscreen).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true);
  },
  update:function(){
    // Kollisionsbestimmung zwischen Objekten (ohne Auswirkung)
    this.physics.arcade.collide(this.player, [this.layer, this.boxes, this.bridge]);
    this.physics.arcade.collide(this.boxes, [this.boxes, this.layer]);

    // Beim berühren des Wassers stirbt der Spieler
    this.physics.arcade.collide(this.player, this.water, this.killPlayer, null, this);

    // Knopfdruck soll Brücke bewegen
    this.physics.arcade.overlap(this.player, this.button, this.button.collideCallback, null, this);

    // Türe soll nächstes Level starten
    this.physics.arcade.overlap(this.player, this.door, this.door.collideCallback, null, this);

    // Hintergrund bewegt sich weniger schnell, Vordergrund schneller (in jeweils entgegengesetzte Richtung)
    this.background.x = parseInt(-this.world.x/3);
    this.foreground.x = parseInt(this.world.x/3);

    // Input wird abgefragt
    checkInput(this.player, controls);
  },
  killPlayer: function() {
    // Tod des Spielers bewirkt Neustart des Levels
    this.state.start('level_1_1');
  },
  startNextLevel: function() {
    // nächstes Level
    this.state.start('level_2_1');
  }
}
