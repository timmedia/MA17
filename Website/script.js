function flicker(overlay) {
  let x = Math.random()
  if (x > 0.8) {
    overlay.style.opacity = 0.75
  } else {
    overlay.style.opacity = 1
  }
  setTimeout(flicker, Math.random() * 500, overlay)
}

let overlay = document.querySelector('.header-image-overlay')
flicker(overlay)
