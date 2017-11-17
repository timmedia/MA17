function setupMobile () {

  var warningBox = document.getElementById('warningBox')
  warningBox.style.width = '100%'

  const doc = document

  game.mobileRunning = true

  var gameBox = doc.getElementById('gameBox')

  var totalWidth = doc.body.clientWidth
  var totalHeight = doc.body.clientHeight

  var dim = (totalHeight > totalWidth)? totalHeight : totalWidth

  function createButton(x, y, g) {
    let button = doc.createElement('div')
    let height = dim / 8
    button.style.width = ~~height + 'px'
    button.style.height = ~~height + 'px'
    button.style.opacity = 0
    button.style.position = 'absolute'
    button.style.background = 'url("assets/graphics/general/' + g + '.png")'
    button.style.backgroundSize = 'cover'
    button.style.bottom = (y * height + 20).toString() + 'px'
    button.style.left = ~~(height * x)  + 'px'
    button.pressed = false
    button.playerContext = null
    gameBox.append(button)
    return button
  }
  game.mobileControls = {}
  game.mobileControls.left = createButton(0.2, 0, 'left')
  game.mobileControls.right = createButton(1.5, 0, 'right')
  game.mobileControls.jump = createButton(5.5, 0, 'jump')
  game.mobileControls.shoot = createButton(5.5, 1.2, 'shoot')
  game.mobileControls.jump.addEventListener('mousedown', () => game.mobileJumpDown = true)
  game.mobileControls.jump.addEventListener('mouseup', () => game.mobileJumpDown = false)
  game.mobileControls.jump.addEventListener('touchstart', () => game.mobileJumpDown = true)
  game.mobileControls.jump.addEventListener('touchend', () => game.mobileJumpDown = false)
}
