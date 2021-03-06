import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'
import triggerMonster from './triggerTransformation.js'

export default (game) =>
  new Action(async (trigger) => {
    game.mainCharacter.stop = true
    game.mainCharacter.isWalking = false
    game.ambianceSound.pause()

    game.dialogBox.messages = [
      {
        text: 'Anthony: Baptiste, tu tombes bien! Je viens d’investir tout mon argent dans mon wallet MetaMask! Qu...',
      },
      {
        text: "Anthony: Qu’est-ce qu'il m’arrive! J'ai l'impression de mourir!",
      },
      {
        text: '???: EUUUUUUUUAAAAARRRRLGH!',
      },
    ]

    game.dialogBox.show()
    await wait(3000)
    game.dialogBox.next()
    await wait(3000)
    game.dialogBox.next()
    await wait(3000)
    game.dialogBox.next()
    game.fightSound.play()
    game.dialogBox.hide()
    game.mainCharacter.stop = false
    triggerMonster(game).trigger()
    trigger()
  }, false)
