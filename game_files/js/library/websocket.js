// Klasse mit allen benötigten Funktionen um eine WebSocket-Verbindung
// herzustellen. (nur für Arcade nötig)

class WebSocketConnection {
  // Server initialisieren
  constructor(port) {
    // neue Verbindung ab port
    this.server = new WebSocket('ws://localhost:' + port.toString())
    // Variable welche Anzahl Änderungen festhält (siehe unten)
    this.previousChangeCounter = 0
  }

  // Update-Funktion
  update(newStatus) {
    // Wurde etwas geändert (Vergleich Anzahl Änderungen)
    if (newStatus.info.changeCounter !== this.previousChangeCounter) {
      // Ja es gibt Änderungen, Status-JSON als String zum Server schicken
      this.server.send(JSON.stringify(newStatus.info))
      // Anzahl Änderungen aktualisieren
      this.previousChangeCounter = newStatus.info.changeCounter
    }
  }

  // Verbindung beenden, bewirkt serverseitig einen Shutdown der Arcade
  end() {
    this.server.close()
  }
}
