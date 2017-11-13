function setupMobile () {

  const doc = document
  let totalWidth = doc.body.clientWidth

  function createButton(x, y) {
    let button = doc.createElement('div')
    let height = totalWidth / 6
    button.style.width = ~~height + 'px'
    button.style.height = ~~height + 'px'
    button.style.background = 'red'
    button.style.position = 'absolute'
    button.style.top = ~~(height * 2.5)  + 'px'
    button.style.left = ~~(height * 5)  + 'px'
    button.startCallback = function () {console.log('hey')}
    button.endCallback = function () {}
    button.playerContext = null
    return button
  }

  let gameBox = doc.getElementById('gameBox')
  let jumpButton = createButton(100, 100)

  game.mobileControls = [jumpButton]

  // Knopf unten
  jumpButton.addEventListener('touchstart', () => {
    game.mobileControls[0].startCallback()
  })
  jumpButton.addEventListener('mousedown', jumpButton.startCallback)

  // Knopf wieder oben
  jumpButton.addEventListener('touchend', jumpButton.endCallback)
  jumpButton.addEventListener('mouseup', jumpButton.endCallback)



  gameBox.append(jumpButton)
}
