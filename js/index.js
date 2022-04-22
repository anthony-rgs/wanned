import Game from './classes/Game.js'
import Story from './classes/Story.js'
import Menu from './classes/Menu.js'

document.body.style.cursor = '../cursor.png'

window.debug = false
window.hasCollisions = true

const story = new Story(
  [
    {
      text: 'Il était une fois dans un Pays lointain, très lointain, une Principauté appelé Quimbroisie.',
      duration: 4000,
    },
    {
      text: 'Dans cette principauté régnait en despote un affreux personnage aussi médisant qu’arrogant dont la méchanceté n’égalait que sa médiocrité.',
      duration: 7000,
    },
    {
      text: 'Il était si gros qu’assis sur son trône seul son énorme tête restait visible aux yeux de ses sujets. Le ténébreux ***.',
      duration: 7000,
    },
    {
      text: 'Les vassaux de sa cour n’étaient pas particulièrement enthousiaste à l’idée de devoir supporter ce petit chef de pacotille. À la tête de cette révolte, le valeureux Pépin-trois-pomme! Aussi appelé “Baptiste”.',
      duration: 10000,
    },
    {
      text: 'Soutenue par le sorcier de la cour adepte de magie noir, le valeureux Tisbron, Pépin-trois-pomme va se faufiler à l’intérieur du donjon de l’affreux *** afin de lui couper son énorme tête.',
      duration: 9000,
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
