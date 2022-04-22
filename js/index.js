import Game from './classes/Game.js'
import Story from './classes/Story.js'
import Menu from './classes/Menu.js'

document.body.style.cursor = '../cursor.png'

window.debug = false
window.hasCollisions = true

const story = new Story(
  [
    {
      text: 'A l’ecole du web, Hetic, a Montreuil, La Wifi ne fonctionne pas depuis maintenant 3 jours.',
      duration: 4000,
    },
    {
      text: 'Impossible pour les eleves d’ouvrir "vs code"?',
      duration: 3000,
    },
    {
      text: 'La direction ne sait pas ce qui se passe et meme la compta ne reçoit plus les mails, il faut faire quelque-chose.',
      duration: 7000,
    },
    {
      text: 'Nous allons suivre l’aventure d’un valeureux guerrier nomme Baptiste, arme de son fidele framework et de ses 5 compagnons: Fabien, Victor, Arthur, Thierry et Anthony.',
      duration: 10000,
    },
    {
      text: 'Il va se frayer un chemin a travers les sous-sols de l’ecole pour decouvrir la raison de cette panne...',
      duration: 7000,
    },
  ],
  3000
)

const storySection = document.querySelector('#story')
const fog = document.querySelector('#fog')
const light = document.querySelector('#light')
const cursor = document.querySelector('.cursor')

const moveCursor = (e) => {
  const mouseY = e.clientY
  const mouseX = e.clientX
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
}

window.addEventListener('load', () => {
  document.querySelector('#load').style.display = 'none'
})

window.addEventListener('mousemove', moveCursor)

story.disabled = localStorage.getItem('story-finish') !== null

if (story.disabled) {
  storySection.remove()
}

document.addEventListener('click', () => {
  story.skip()
})

document.addEventListener('keypress', (event) => {
  if (event.key === ' ' || event.onclick) {
    story.skip()
  }
})

story.start()

const wanned = new Game(document.querySelector('#wanned'))
window.g = wanned

story.onEnd(() => {
  fog.classList.remove('hidden')
  light.classList.remove('hidden')
  storySection.classList.add('hidden')

  setTimeout(() => {
    const menu = new Menu()

    menu.create()
    menu.quitButtonClicked()
    menu.yesButtonClicked()
    menu.noButtonClicked()
    menu.onStartClicked(() => {
      wanned.init()
    })

    storySection.remove()
    localStorage.setItem('story-finish', 'finished')
  }, 500)
})

window.addEventListener('resize', () => {
  if (wanned.map) {
    wanned.updateCanvas()
  }
})

const keyInfo = document.querySelector('#key-info')

keyInfo.addEventListener('set', (e) => {
  keyInfo.innerText = e.detail.action || ''
})
