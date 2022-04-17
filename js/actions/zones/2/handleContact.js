import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default game =>
  new Action(async trigger => {
    if (game.monster.hitting && !game.mainCharacter.safe) {
      game.mainCharacter.lives -= 0.5
      game.mainCharacter.safe = true
      setTimeout(() => {
        game.mainCharacter.safe = false
      }, 1000)
    }
  }, false)
