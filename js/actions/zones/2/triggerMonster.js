import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action((trigger) => {
    game.mainCharacter.stop = true
    game.mainCharacter.isWalking = false
    game.ambianceSound.pause()

    game.dialogBox.messages = [
      {
        text: 'Attention ! Vous rentrez dans une zone de combat.',
        choices: [
          {
            text: 'Suivant',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: 'Êtes-vous prêt à vous battre ?',
        choices: [
          {
            text: 'Oui',
            callback: async () => {
              game.dialogBox.next()
              await wait(2000)
              game.fightSound.play()
              game.dialogBox.hide()
              game.mainCharacter.stop = false
              await game.monster.transformAnimation()
              trigger()
            },
          },
        ],
      },
      {
        text: 'Bonne chance !',
      },
    ]

    game.dialogBox.show()
  }, false)
