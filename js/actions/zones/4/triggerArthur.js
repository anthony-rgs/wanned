import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    game.arthur.stopWalk()

    // Easter egg
    const voice = new Audio('../../../../assets/audios/as-soon-as-we-get.mp3')
    voice.volume = 0.5

    window.addEventListener('keydown', (e) => {
      e.key === 'p' && voice.play()
    })

    game.dialogBox.messages = [
      {
        text: "Bonjour, vous voici à l'étape finale. Vous devez battre le maître Tisbron !",
        choices: [
          {
            text: "Let's go !",
            callback: async () => {
              game.dialogBox.next()
              await wait(1000)
              await game.arthur.pullOver()
              await wait(1000)
              game.door4.open()
              trigger()
              game.dialogBox.hide()
            },
          },
        ],
      },
      {
        text: 'Bonne chance camarade !',
      },
    ]

    game.dialogBox.show()
  }, false)
