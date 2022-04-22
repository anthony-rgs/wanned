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
        text: 'Thierry: Je crois avoir trouve la raison pour laquelle Anthony est devenu monstrueux!',
        choices: [
          {
            text: 'Vas-y, dis-moi',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: 'Thierry: En investissant tout son argent betement dans un crypto wallet il est devenu completement wanned!',
        choices: [
          {
            text: 'Oh le gros wanned',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: 'Thierry: Si on arrive a eclater les bulles speculatives avant qu’elles submergent les sous-sol, on pourra sortir d’ici vivant et peut-etre fixer la wifi.',
        choices: [
          {
            text: "Ok let's go !",
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
