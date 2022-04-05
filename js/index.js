import Game from './classes/Game.js'
import Story from './classes/Story.js'

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
      text: 'Les vassaux de sa cours n’étaient pas particulièrement enthousiaste à l’idée de devoir supporter ce petit chef de pacotille. À la tête de cette révolte, le valeureux Pépin-trois-pomme! Aussi appelé “Baptiste”.',
      duration: 10000,
    },
    {
      text: 'Soutenue par le sorcier de la cours adepte de magie noir, le valeureux Tisbron, Pépin-trois-pomme va se faufiler à l’intérieur du donjon de l’affreux *** afin de lui couper son énorme tête.',
      duration: 9000,
    },
  ],
  3000,
)

const wanned = new Game(document.querySelector('#wanned'))
const storySection = document.querySelector('#story')

story.onEnd(() => {
  wanned.draw()
  storySection.classList.add('hidden')
  setTimeout(() => {
    storySection.remove()
  }, 500)
})

window.addEventListener('resize', () => {
  wanned.updateCanvas()
})
