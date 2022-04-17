import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default game =>
  new Action(async trigger => {
    if (game.monster.hitting && !game.mainCharacter.safe) {
      if (game.mainCharacter.lives > 0) {
        game.mainCharacter.lives -= 0.5
        game.mainCharacter.safe = true
        setTimeout(() => {
          game.mainCharacter.safe = false
        }, 1000)
      } else {
        console.log('you loose')
      }
    } else if (game.mainCharacter.hitting && !game.monster.safe) {
      if (game.monster.lives > 0) {
        game.monster.lives -= 1
        game.monster.safe = true
        setTimeout(() => {
          game.monster.safe = false
        }, 1000)
      } else {
        game.monster.die()
      }
    }
  }, false)
