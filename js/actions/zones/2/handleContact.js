import Action from '../../../classes/Action.js'

export default game =>
  new Action(() => {
    if (game.monster.hitting && !game.mainCharacter.safe) {
      new Audio('../../../../assets/audios/contact.mp3').play()
      if (game.mainCharacter.lives > 0) {
        game.mainCharacter.lives -= 0.5

        if (game.mainCharacter.lives <= 0) {
          console.log('you loose')
        }

        game.mainCharacter.safe = true
        setTimeout(() => {
          game.mainCharacter.safe = false
        }, 1000)
      } else {
        console.log('you loose')
      }
    } else if (game.mainCharacter.hitting && !game.monster.safe) {
      new Audio('../../../../assets/audios/contact.mp3').play()
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
