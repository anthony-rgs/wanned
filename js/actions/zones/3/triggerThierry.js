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
        text: 'Thierry: Je crois avoir trouvé la raison pour laquelle Anthony est devenu monstrueux!',
        choices: [
          {
            text: 'Vas-y, dit-moi',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: "Thierry: En investissant tout son argent bêtement dans un cryptoWallet il est devenu complètement wanned!",
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
        text: 'Thierry: Si on arrive à éclater les bulles spéculatives avant qu’elles submergent les sous-sol, on pourra sortir d’ici vivant et peut-être fixer la wifi.',
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
