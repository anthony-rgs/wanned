import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'
import Sound from '../../../classes/Sound.js'

export default (game) =>
  new Action(async () => {
    if (game.monster.hitting && !game.mainCharacter.safe) {
      new Sound(
        '../../../../assets/audios/contact.mp3',
        game.soundVolume
      ).play()

      game.mainCharacter.safe = true

      setTimeout(() => {
        game.mainCharacter.safe = false
      }, 1000)

      if (game.mainCharacter.lives >= 0 && !game.mainCharacter.isDead) {
        if (game.mainCharacter.lives <= 0) {
          game.mainCharacter.die()
        } else {
          game.mainCharacter.lives -= 0.5
        }
      }
    } else if (game.mainCharacter.hitting && !game.monster.safe) {
      new Sound(
        '../../../../assets/audios/contact.mp3',
        game.soundVolume
      ).play()

      game.monster.safe = true

      setTimeout(() => {
        game.monster.safe = false
      }, 1000)

      if (game.monster.lives >= 0 && !game.monster.isDead) {
        if (game.monster.lives <= 0) {
          game.fightSound.pause()
          game.ambianceSound.play()
          game.monster.die()
          await wait(1000)
          game.door2.open()
        } else {
          game.monster.lives -= 1
        }
      }
    }
  }, false)
