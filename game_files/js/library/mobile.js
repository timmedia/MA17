function setupMobile () {

  const doc = document
  let totalWidth = doc.body.clientWidth

  function createButton(x, y) {
    let button = doc.createElement('div')
    let height = ~~(totalWidth / 10) + 'px'
    button.style.width = height
    button.style.height = height
    button.style.background = 'red'
    button.style.position = 'fixed'
    button.style.bottom = '0px'
    return button
  }

  let gameBox = doc.getElementById('gameBox')
  let jumpButton = createButton(100, 100)
  gameBox.append(jumpButton)
}
