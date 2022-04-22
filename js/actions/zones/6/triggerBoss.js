import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    game.mainCharacter.stop = true
    game.mainCharacter.isWalking = false
    game.ambianceSound.pause()

    game.dialogBox.messages = [
      {
        text: 'Brontis: Salut gamin, alors comme ca tu as decouvert la raison de la panne....',
      },
      {
        text: 'Soyons bien clair, tu ne m’empecheras pas de telecharger l’integral d’Evangelion en 8k.',
      },
      {
        text: 'Tu crois vraiment pouvoir me stopper?',
      },
      {
        text: 'Tres bien, mets toi en garde pepin-trois-pomme.',
      },
    ]

    game.dialogBox.show()
    await wait(3000)
    game.dialogBox.next()
    await wait(3000)
    game.dialogBox.next()
    await wait(3000)
    game.dialogBox.next()
    await wait(3000)
    game.dialogBox.hide()
    game.mainCharacter.stop = false
    game.fightSound.play()
    game.boss.stop = false
    game.boss.handleAttack()
    trigger()
  }, false)
