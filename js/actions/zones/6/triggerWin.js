import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) => {
  return new Action(async (trigger) => {
    game.mainCharacter.stop = true
    game.mainCharacter.isWalking = false
    game.ambianceSound.pause()

    game.dialogBox.messages = [
      {
        text: "Brontis: Arghhh tu m'as eu !",
      },
    ]

    game.dialogBox.show()
    await wait(3000)
    game.dialogBox.hide()
    trigger()
  }, false)
}
