import Action from '../../../classes/Action.js'
import triggerBubbles from './triggerBubbles.js'

export default (game) =>
  new Action(() => {
    if (game.thierryTriggered) {
      triggerBubbles(game)
      return
    } else {
      game.thierryTriggered = true
    }

    game.thierry.stopWalk()
    game.disableMovements()

    game.dialogBox.messages = [
      {
        text: 'Bonjour jeune homme, que faites-vous la ?',
        choices: [
          {
            text: 'Casse pas les couilles laisse passer stp',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: "Hop hop hop ! Pas de ca ici, bonjour d'abord. Pour passer tu vas devoir jouer a un petit jeu.",
        choices: [
          {
            text: 'Ok, dis-moi',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: 'Parfait, le but est simple : tu dois eclater 20 bulles pour passer. Compris ?',
        choices: [
          {
            text: "Let's go !",
            callback: () => {
              game.mainCharacter.stop = false
              game.dialogBox.hide()
              triggerBubbles(game)
            },
          },
        ],
      },
    ]

    game.dialogBox.show()
  }, false)
