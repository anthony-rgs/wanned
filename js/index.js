import Game from './classes/Game.js'

const wanned = new Game(document.querySelector('#wanned'))

wanned.draw()

window.addEventListener('resize', () => {
  wanned.updateCanvas()
})
