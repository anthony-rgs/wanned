import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'
import triggerWin from './triggerWin.js'
import Sound from '../../../classes/Sound.js'

export default (game) =>
  new Action(async () => {
    if (game.boss.hitting && !game.mainCharacter.safe) {
      new Sound(
        '../../../../assets/audios/contact.mp3',
        game.soundVolume
      ).play()

      game.mainCharacter.safe = true

      setTimeout(() => {
        game.mainCharacter.safe = false
      }, 1000)

      if (game.mainCharacter.lives >= 0 && !game.mainCharacter.isDead) {
        game.mainCharacter.lives -= 1

        if (game.mainCharacter.lives <= 0) {
          game.mainCharacter.die()
        }
      }
    } else if (game.mainCharacter.hitting && !game.boss.safe) {
      new Sound(
        '../../../../assets/audios/contact.mp3',
        game.soundVolume
      ).play()

      game.boss.safe = true

      setTimeout(() => {
        game.boss.safe = false
      }, 1000)

      if (game.boss.lives >= 0 && !game.boss.isDead) {
        game.boss.lives -= 1

        if (game.boss.lives <= 0) {
          game.fightSound.pause()
          game.ambianceSound.play()
          game.boss.die()
          await wait(1000)
          triggerWin(game).trigger()
        }
      }
    }
  }, false)
