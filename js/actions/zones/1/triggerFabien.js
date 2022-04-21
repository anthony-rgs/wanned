import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action((trigger) => {
    game.disableMovements()
    game.fabien.stopWalk()

    game.dialogBox.messages = [
      {
        text: 'Fabien: Tu es là Baptiste! J’essaye d’ouvrir cette porte mais elle refuse de fonctionner sans la connexion, J\’ai besoin de me souvenir, elle est en FTTB ou en FTTH?',
        choices: [
          {
            text: 'FTTB',
            callback: async () => {
              game.dialogBox.messages.push({
                text: "Fabien: Merci ! Je vais pouvoir l’ouvrir maintenant.",
              })
              game.dialogBox.next()
              await wait(1000)
              await game.fabien.pullOver()
              await wait(1000)
              game.door1.open()
              game.dialogBox.next()
              game.enableMovements()

              trigger()
            },
          },
          {
            text: 'FTTH',
            callback: async () => {
              game.dialogBox.messages.push({
                text: 'Fabien: Nan....je crois pas que ça fonctionne...',
              })
              game.dialogBox.next()
              await wait(3000)
              game.dialogBox.hide()
              game.fabien.startWalk()
              game.mainCharacter.lives -= 0.5
              game.enableMovements()
            },
          },
        ],
      },
    ]
    game.dialogBox.show()
  }, false)
