import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action((trigger) => {
    game.disableMovements()

    game.dialogBox.messages = [
      {
        text: 'Victor: Salut mec, j’ai achete des packs de 16 aux Franprix, t’en veux une?',
        choices: [
          {
            text: 'Ben ouais!',
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
            text: "Non c'est bon merci!",
            callback: () => {
              game.dialogBox.hide()
              game.enableMovements()
            },
          },
        ],
      },
      {
        text: 'Victor: Regale-toi!',
      },
    ]

    game.dialogBox.show()
  }, false)
