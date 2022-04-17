import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default game =>
  new Action(async trigger => {
    game.mainCharacter.stop = true

    game.dialogBox.messages = [
      {
        text: 'Attention ! Vous rentrez dans une zone de combat.',
        choices: [
          {
            text: 'Suivant',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: 'Êtes-vous prêt à vous battre ?',
        choices: [
          {
            text: 'Oui',
            callback: async () => {
              game.dialogBox.next()

              await wait(2000)

              game.dialogBox.hide()

              game.mainCharacter.stop = false
            },
          },
        ],
      },
      {
        text: 'Bonne chance !',
      },
    ]

    game.dialogBox.show()
  }, false)
