function setupMobile () {

  const doc = document

  game.mobileRunning = true

  var gameBox = doc.getElementById('gameBox')

  let totalWidth = doc.body.clientWidth

  function createButton(x, y, g) {
    let button = doc.createElement('div')
    let height = totalWidth / 8
    button.style.width = ~~height + 'px'
    button.style.height = ~~height + 'px'
    button.style.opacity = 0
    button.style.position = 'absolute'
    button.style.background = 'url("assets/graphics/general/' + g + '.png")'
    button.style.backgroundSize = 'cover'
    button.style.top = ~~(height * y)  + 'px'
    button.style.left = ~~(height * x)  + 'px'
    button.pressed = false
    button.playerContext = null
    gameBox.append(button)
    return button
  }
  game.mobileControls = {}
  game.mobileControls.left = createButton(0.2, 3.5, 'left')
  game.mobileControls.right = createButton(1.5, 3.5, 'right')
  game.mobileControls.jump = createButton(6.6, 3.5, 'jump')
  game.mobileControls.shoot = createButton(6.6, 2, 'shoot')
  game.mobileControls.jump.addEventListener('mousedown', () => game.mobileJumpDown = true)
  game.mobileControls.jump.addEventListener('mouseup', () => game.mobileJumpDown = false)
  game.mobileControls.jump.addEventListener('touchstart', () => game.mobileJumpDown = true)
  game.mobileControls.jump.addEventListener('touchend', () => game.mobileJumpDown = false)
}
