var globalDebug = false


/*
Das 'BasicGameObject'-Objekt erbt alle Eigenschaften eines Phase-Sprite-Objekts
(Phaser.Sprite, parent Objekt) und ist die Vorlage (fast) aller Grafiken. Es
unterscheidet sich zum Phaser-Objekt bloss dadurch, dass der Ankerpunkt unten
links anstatt oben links ist und dass es dem Level direkt hinzugefügt wird.
*/
class BasicGameObject extends Phaser.Sprite {
  constructor(context, x, y, key, angle, frame) { // eigene Argumente
    super(context.game, x, y, key, angle, frame)  // Übernahme vom parent-Objekt
    this.anchor.setTo(0, 1)                       // Ankerpunk unten links
    context.game.add.existing(this)               // Hinzufügen in das Level
  }
}

/*
'DynamicGameObject' erbt alle Eigenschaften vom 'BasicGameObject', hat jedoch
eine aktivierte Physik ('arcade'-Physik-Engine). Zusätzliche Argumente sind
für Reibung (drag) und Rückprall (bounce).
*/
class DynamicGameObject extends BasicGameObject {
  constructor(context, x, y, key, angle, drag, bounce, frame) { // Argumente
    super(context, x, y, key, angle, frame)  // Übernahme vom parent-Objekt
    context.game.physics.arcade.enable(this) // Aktivierung Arcade-Physik
    this.body.drag.x = drag || 0             // Reibung, bei keiner Angabe = 0
    this.body.bounce.y = bounce || 0         // Aufprall, bei keiner Angabe = 0
  }
}

/*
Das 'StaticGameObject' erbt wiederum alle Eigenschaften vom 'DynamicGameObject',
hat jedoch bloss eine passive Physik, d.h. bewegt sich selber nicht (auch nicht
durch Gravitationskraft), kann aber Kollisionen mit anderen Objekten feststel-
len.
*/
class StaticGameObject extends DynamicGameObject {
  constructor(context, x, y, key, angle, frame) {       // eigene Argumente
    super(context, x, y, key, angle, null, null, frame) // parent-Objekt
    this.body.moves = false    // kann sich innerhalb einer Gruppe nicht bewegen
    this.body.immovable = true // Kollision mit Objekten bewirkt keine Bewegung
  }
}

/*
Das Spieler ('Player') Objekt ist wohl das komplexeste. Es stammt vom dynamisch-
en Objekt und kann sich dementsprechen bewegen. Zusätzlich wird in der 'update'-
Funktion (Methode des Objekts) die Position und Grafik berechnet. Diese wird au-
tomatisch von Phaser bei jedem Durchgang der Physikberechnung aufgerufen
*/
class Player extends DynamicGameObject {
  constructor(
    context,      // Übernahme Kontext des Levels
    x,            // Start x-Koordinate
    y,            // Start y-Koordnate
    key,          // key der Grafik
    walkSpeed,    // Laufgeschwindigkeit
    jumpSpeed,    // Sprungkraft
    cameraFollow, // Boolean: Soll Kamera den Spieler folgen?
    killOnExit,   // Boolean: Stribt Spieler beim Verlassen vom sichbaren Breich
    enableShoot,  // Boolean: kann der Spieler schiessen
    bounce        // (nicht verwendet) Aufprall
  ) {
    super(context, x, y, key, null, null, bounce)   // Parent-Objekt

    // Animationen: (name, Array frames ab spritesheet, Bilder/s., Wiederholen?)
    this.animations.add('idle', [10, 11, 12, 13], 5, true)
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)
    this.animations.add('jump_start', [14], 7, false)     // Beginn Sprung
    this.animations.add('jump_up', [15], 10, true)        // Bewegung nach oben
    this.animations.add('jump_top', [16], 5, false)       // oben angekommen
    this.animations.add('jump_down', [17], 10, true)      // Fall nach unten
    this.animations.add('jump_end', [18], 5, false)       // unten Angekommen
    this.animations.add('shoot', [19, 20, 21, 10], 8, false) // Schiessen

    // Festpunkt mittig (damit Spieglung bei Richtungswechsel klappt)
    this.anchor.setTo(0.5, 0.5)
    this.body.setSize(25, 72, 17, 0)  // Hitbox (Kollisionsgrösse) verkleinert

    this.jumpSpeed = jumpSpeed || 0   // Sprungkraft, bei keiner Angabe: = 0
    this.walkSpeed = walkSpeed || 50  // Laufgeschwindigkeit, keine Angabe: = 50

    this.hp = 9                       // Health points (Anz. Herzen, 0-9)

    this.killPlayer = context.killPlayer // Funktion vom Level lokal übernommen
    // Phys. max. Geschwindigkeit (Phaser), zu hohe Geschwindigkeiten vermeiden

    this.body.maxVelocity.x = this.walkSpeed * 2

    context.collideLayerList.push(this) // Spieler soll mit Welt kollidieren

    if (cameraFollow) {
      // Kamera soll Spieler folgen
      context.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    }

    if (killOnExit) {
      // Spieler soll beim Verlassen der Karte (unten) sterben
      this.checkWorldBounds = true // Kollision mit Weltrand wird überprüft
      this.events.onOutOfBounds.add(() => {
        // Spieler ist nun ausserhalb der Karte
        if (this.y > 0) context.killPlayer() // Spieler ist unterhalb der Karte
      })
    }

    if (enableShoot) {
      this.enableShoot = true  // Spieler darf schiessen
      this.setupShoot(context) // Schiessmechanismus wir initialisiert
    }

    // Variablen für Laufmechanismus
    this.mu = 35  // Widerstandskoeffiziente, hier keine Phys. Grösse
    this.wind = 0 // Basis-Geschwindigkeit in x-Richtung

    // Nutzereingabe, wird die 'rechts'/'links'-Taste betätigt soll die dazuge-
    // hörige Funktion aufgerufen werden (this.pressRight / this.pressLeft)
    controls.right.onDown.add(this.pressRight, this)
    controls.left.onDown.add(this.pressLeft, this)

    // Falls der Spieler schiessen kann, soll die Schiess-Taste überprüft wer-
    // den und falls betätig 'this-shoot' aufgerufen werden
    if (enableShoot) controls.shift.onDown.add(this.shoot, this)
  }
  // Spieler soll sich nach rechts bewegen
  pressRight() {
    this.body.acceleration.x += 2000       // Beschleunigung +2000 Pixel/s^2
    if (this.body.acceleration.x > 2000) {
      this.body.acceleration.x = 2000      // soll 2000 nicht übersteigen
    }
    // Sprungkraft < 0 heisst Schwerkraft ist nach unten
    // Sprungkraft > 0 heisst Schwerkraft nach oben, Spieler ist um 180° gedreht
    this.scale.x = (this.jumpSpeed < 0)? 1 : -1
  }
  // Spieler soll sich nach links bewegen
  pressLeft() {
    this.body.acceleration.x -= 2000        // Beschleunigung -2000 Pixel/s^2
    if (this.body.acceleration.x < -2000) {
      this.body.acceleration.x = -2000      // soll max -2000 sein
    }
    // Richtung der Schwerkraft, gleich wie bei pressRight()
    this.scale.x = (this.jumpSpeed < 0)? -1 : 1
  }
  // Update-Funktion, wird in jedem Physik-Durchgang durchlaufen
  update() {
    if (this.hp < 0) {  // Hat der Spieler noch Herzen?
      this.killPlayer() // Nein, Spieler stirbt
      return            // Rest ist egal
    }
    // Falls Sprungkraft > 0, ist Schwerkraft nach oben
    const gravitySwitched = this.jumpSpeed > 0
    // Je nach dem in welche Richtung die Schwerkraft zeigt, muss auf eine ande-
    // re Weise überprüft werden, ob der Spieler am Boden ist
    const grounded = gravitySwitched
      ? this.body.blocked.up || this.body.touching.up     // Kollision oben
      : this.body.blocked.down || this.body.touching.down // Kollision unten

    /* BEWEGUNGS-LOGIK */
    if (controls.right.isDown) {                    // Spieler nach rechts
      if (this.body.velocity.x > this.walkSpeed) {  // Maximalgschw. erreicht?
        this.body.acceleration.x = 0                // Ja, Beschleunigung = 0
      } else if (Math.abs(this.body.velocity.x) < 0.5 * this.walkSpeed
                 && controls.right.duration > 300) {
        // Taste schon 300ms unten und Geschw. < 1/2 eigentliche Geschw.
        // Geschwindigkeit = eigentliche Geschwindigkeit
        this.body.velocity.x = this.walkSpeed
      }
    } else if (controls.left.isDown) {              // Spieler nach links
      if (this.body.velocity.x < -this.walkSpeed) { // Maximalgschw. erreicht?
        this.body.acceleration.x = 0                // Ja, Beschleunigung = 0
      } else if (Math.abs(this.body.velocity.x) < 0.5 * this.walkSpeed
                 && controls.left.duration > 300) {
        // Taste schon 300ms unten und Geschw. < 1/2 eigentliche Geschw.
        // Geschwindigkeit = eigentliche Geschwindigkeit
        this.body.velocity.x = -this.walkSpeed
      }
    } else if (!controls.right.isDown && !controls.left.isDown) {
      // Links und rechts nicht unten
      if (this.body.velocity.x != 0) {  // Ist Geschwindigkeit nicht 0?
        if (this.wind === 0) {          // Falls Wind nicht aktiviert ist
          // Beschleunigung soll reduziert werden
          this.body.acceleration.x = -this.mu * this.body.velocity.x
        } else {                                      // Wind ist aktiviert
          if (this.wind / this.body.velocity.x < 0) {
            // Wind ist in entgegengesetzte Richtung von Spieler
            // Beschleunigung wird reduziert, Windbeschleunigung jedoch addiert
            this.body.acceleration.x = -this.mu * this.body.velocity.x + this.wind
          } else { // Wind in gleiche Richtung als Bewegung von Spieler
            this.body.acceleration.x = this.wind // Beschleunigung = Windstärke
          }
        }
      } else {                               // Spieler bewegt sich nicht
        this.body.acceleration.x = this.wind // Beschleunigung = Windstärke
      }
    }

    /* ANIMATION & SPRUNG */

    // Position im Vergleich zum vorherigen Durchgang
    var delta_x = Math.round(this.body.position.x - this.body.prev.x)
    var delta_y = Math.round(this.body.position.y - this.body.prev.y)

    if (grounded) {                                     // Spieler ist am Boden
      if (controls.up1.isDown || controls.up2.isDown) { // Sprungtaste betätigt
        if (Math.round(this.body.velocity.x) != 0) {    // Spieler bewegt sich
          this.animations.play('jump_up')               // Sprunganimation
          this.body.velocity.y = this.jumpSpeed         // Bewegung nach oben
        } else {                                        // keine Bewegung
          // Zuerst wird eine Sprunganfanggrafik angezeigt, Spieler bleibt am
          // Boden, danach wird zu einer Sprunggrafik gewechselt und die Gesch-
          // windigkeit nach oben gesetzt.
          this.animations.play('jump_start')
          this.animations.currentAnim.onComplete.add(() => {
            this.animations.play('jump_up')
            this.body.velocity.y = this.jumpSpeed
          })
        }
      } else if (controls.right.isDown || controls.left.isDown) {
        this.animations.play('walk') // Spieler läuft, Laufanimation
      } else { // Spieler springt und läuft nicht
        if (delta_x === 0) {
          // keine horizontale Bewegung, nach jetziger Animation soll steh-
          // Grafik zu sehen sein
          this.animations.currentAnim.onComplete.add(() => {
            this.animations.play('idle')
          })
        } else {
          // falls der Spieler sich zuvor noch horizontal bewegte, soll dirket
          // die steh-Grafik angezeigt werden (Laufanimation soll nicht zuende
          // gespielt werden)
          this.animations.play('idle')
        }
      }
      if (delta_y > 0) {                 // Spieler bewegte sich noch vertikal
        this.animations.play('jump_end') // Landungsgrafik
      }
    } else {                             // Spieler ist nicht am Boden
      if (delta_y === 0) {               // Steht still in der Luft
        this.animations.play('jump_top') // Höhepunkt-grafik
      } else if (delta_y > 0) {          // bewegt sich vertikal
        this.animations.currentAnim.onComplete.add(() => {
          this.animations.play('jump_down') // Fall-Grafik nach jetziger Grafik
        })
      }
    }
  }
  // Funktion um Spiler eine gewisse Amzahl Herzen zu schaden
  damage(player, hp) {
    player.hp -= hp || 5 // HP reduziert: keine Angabe: 2.5 Herzen
    player.tint = 0xFF0000         // rote Tönung
    this.add.tween(player).to(     // Tönung geht während 250ms wieder weg
      {tint: 0xFFFFFF}, 250, Phaser.Easing.Cubic.Out, true
    )
    this.camera.shake(0.01, 200, null, Phaser.Camera.SHAKE_HORIZONTAL, false)
  }
  // Schiess-Fuktion, Idee von https://www.codecaptain.io/blog/game-development/
  // shooting-bullets-using-phaser-groups/518
  setupShoot(context) {
    // Es werden 20 Schussobjekte generiert, somit müssen während dem Spielen
    // keine Grafiken mehr hinzugefügt werden
    this.bullets = context.game.add.group() // Phaser-Objektgruppe
    this.bullets.enableBody = true          // Physik soll aktiviert sein
    this.bullets.createMultiple(20, 'General Fireball') // Grafik der Schüsse
    // Es soll überprüft werden, ob sie den sichtbaren Bereich verlassen
    this.bullets.setAll('checkWorldBounds', true)
    // Alle Schussobjekte sollen beim Verlassen des sichtbaren Bereichts deakti-
    // viert werden
    this.bullets.callAll(
      'events.onOutOfBounds.add', 'events.onOutOfBounds', (bullet) => {
        bullet.kill()
      }
    )
    this.bullets.setAll('body.allowGravity', false) // Schwerkraft deaktiviert
  }
  // Schuss-Funktion
  shoot() {
    // Kugel aus Objektgruppe
    var bullet = this.bullets.getFirstExists(false)
    // Animation, hiernach soll Kugel (200ms verzögert) erscheinen
    this.animations.play('shoot')
    setTimeout(() => {
      // Falls Kugel vorhaden (sind 20 schon auf dem Feld gibt es keine mehr)
      if (bullet) {
        // Position von Kugel leicht von Spielerkoordinaten versetzt
        bullet.reset(this.position.x + 10, this.position.y - 20)
        // Geschwindigkeit ist die des Spielers + 500 in Laufrichtung
        // this.scale.x sagt aus, in welche Richtung der Spieler sich bewegt
        bullet.body.velocity.x = this.body.velocity.x + this.scale.x * 500
      }
    }, 200)
  }
}

/*
Eine Kiste ist ein dynamisches Objekt, welches jedoch mit den Welträndern koll-
idieren soll.
*/
class Box extends DynamicGameObject {
  constructor(context, x, y, key, drag, bounce) { // Argumente
    super(context, x, y, key, null, drag, bounce) // Parent-Objekt
    this.body.collideWorldBounds = true           // Kollision mit Weltränder
  }
}

/*
Ein Knopf soll bei einer Berührung mit dem Sieler eine Funktion ausführen. Diese
wird als Argument (callback) bestimmt.
*/
class Button extends StaticGameObject {
  constructor(context, x, y, key, angle, callback) { // Argumente
    super(context, x, y, key, angle)                 // Parent-Objekt
    this.body.setSize(24, 24, -4, -4)                // Physikalische Grösse
    this.callback = callback                         // Callback abgespeichert
    this.animations.add('u', [0], 1, false)          // Grafik falls Knopf oben
    this.animations.add('d', [1], 0.5, false)        // Grafik für Knopf unten
    this.animations.play('u')                        // Standardgemäss oben
    this.up = true                                   // Knopf ist oben
    this.update = () => { // Wird in jedem Physik-Durchlauf aufgerufen
      // Überprüfen, ob Spieler Knopf berührt
      context.physics.arcade.overlap(
        this, context.player, this.callback, this.processCallback, context
      )
    }
  }
  // Funktion um Status des Knopfes zu ändern
  switchState(self) {
    if (self.up) {
      self.up = false
      self.animations.play('d')
    } else {
      self.up = true
      self.animations.play('u')
    }
  }
  // Funktion wird ausgeführt bei Berührung mit Knopf
  processCallback(self) {
    if (self.up) { // Knopf ist oben, kann gedrückt werden
      // Status ändern, Knopf bleibt so lange unten wie Animation dauert
      self.switchState(self)
      self.animations.currentAnim.onComplete.add(self.switchState, this)
      return true  // Callback Funktion darf ausgeführt werden
    } else {       // Knopf ist unten
      return false // Callback Funktion darf nicht ausgeführt werden
    }
  }
}

/*
Tür-Objekt, hat Physik, kann sich nicht bewegen (StaticGameObject). Sie kann
verschlossen, zu und offen sein.
*/
class Door extends StaticGameObject {
  constructor(context, x, y, key, angle, locked, callback) { // Argumente
    super(context, x, y, key, angle)                         // Parent-Objekt
    this.endCallback = callback                  // Callback abgespeichert
    this.animations.add('locked', [0], 1, false) // Verschlossen-Grafik
    this.animations.add('closed', [1], 1, false) // Zu (nicht verschlossen)
    this.animations.add('open', [2], 1, false)   // Offen-Grafik
    this.animations.add('opening', [5, 4, 3, 2], 10, false) // Türe geht auf
    this.animations.add('closing', [2, 3, 4, 5], 10, false) // Türe geht zu
    // Ankerpunkt damit das Laden ab JSON richtig klappt
    this.anchor.setTo(0.5, 1)
    this.locked = locked                               // Status
    this.animations.play(locked ? 'locked' : 'closed') // Grafik nach status
  }
  // Türe verschliessen
  lock() {
    this.locked = true
    this.animations.play('locked')
  }
  // Türe entsperren
  unlock() {
    this.locked = false
    this.animations.play('closed')
  }
  // Türe kann nur geöffnet werden falls nicht abgeschlossen
  processCallback(self) {
    return !self.locked
  }
  // Türe öffnen
  callback(self) {
    self.animations.play('opening')
    self.locked = true // Animation soll nur 1x gespielt werden
    // Nach Animation soll Callback-Funktion ausgeführt werden
    self.animations.currentAnim.onComplete.add(self.endCallback, this)
  }
}

/*
Das Schlüssel-Objekt hat wie die Türe auch eine Callback Funktion. Irgendetwas
soll passieren wenn er eingesammelt wird.
*/
class Key extends StaticGameObject {
  constructor(context, x, y, key, angle, visible, callback) { // Argumente
    super(context, x, y, key, angle)                      // Parent-Objekt
    this.animations.add('shining', [0, 1, 2, 3], 5, true) // Animation
    this.animations.play('shining')                       // Animation abspielen
    this.visible = visible                                // Sichtbarkeit
    this.callback = callback                              // Callback lokal
    // Update-Funktion: Überprüfen ob Spieler Schlüsse berührt
    this.update = () => {
      context.physics.arcade.overlap(
        context.player, this, this.callback, this.processCallback, context
      )
    }
  }
  // Kann nur eingesammelt werden falls sichtbar
  processCallback(self) {
    return self.visible
  }
}
