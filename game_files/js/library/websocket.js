class WebSocketConnection {
  constructor(port) {
    this.server = new WebSocket('ws://localhost:' + port.toString())
    this.previousChangeCounter = 0
  }
  update(newStatus) {
    if (newStatus.info.changeCounter !== this.previousChangeCounter) {
      this.server.send(JSON.stringify(newStatus.info))
      this.previousChangeCounter = newStatus.info.changeCounter
    }
  }
}
