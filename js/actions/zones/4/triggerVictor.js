import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action((trigger) => {
    game.disableMovements()

    game.dialogBox.messages = [
      {
        text: 'Bonjour jeune homme, un petit remontant ?',
        choices: [
          {
            text: 'Allez ! Pourquoi pas',
            callback: async () => {
              game.dialogBox.next()
              if (game.mainCharacter.lives <= 2) {
                game.mainCharacter.lives += 1
              }

              await wait(2000)

              game.dialogBox.hide()
              game.enableMovements()
              trigger()
            },
          },
          {
            text: 'Nan merci ca va',
            callback: () => {
              game.dialogBox.hide()
              game.enableMovements()
            },
          },
        ],
      },
      {
        text: 'Et voila un peu de vie pour vous. Bonne continuation !',
      },
    ]

    game.dialogBox.show()
  }, false)
