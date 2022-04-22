import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async () => {
    if (game.monster.hitting && !game.mainCharacter.safe) {
      new Audio('../../../../assets/audios/contact.mp3').play()

      game.mainCharacter.safe = true

      setTimeout(() => {
        game.mainCharacter.safe = false
      }, 1000)

      if (game.mainCharacter.lives > 0 && !game.mainCharacter.isDead) {
        game.mainCharacter.lives -= 0.5

        if (game.mainCharacter.lives <= 0) {
          game.mainCharacter.die()
        }
      } else {
        game.mainCharacter.die()
      }
    } else if (game.mainCharacter.hitting && !game.monster.safe) {
      new Audio('../../../../assets/audios/contact.mp3').play()

      game.monster.safe = true

      setTimeout(() => {
        game.monster.safe = false
      }, 1000)

      if (game.monster.lives > 0 && !game.monster.isDead) {
        game.monster.lives -= 1
      } else {
        game.fightSound.pause()
        game.ambianceSound.play()
        game.monster.die()
        await wait(1000)
        game.door2.open()
      }
    }
  }, false)
