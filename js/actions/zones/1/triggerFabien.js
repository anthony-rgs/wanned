import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default game =>
  new Action(async trigger => {
    game.fabien.stopWalk()

    await wait(1000)

    game.dialogBox.messages = [
      {
        text: 'Quel type de fibre optique HETIC utilise-t-elle ?',
        choices: [
          {
            text: 'FTTB',
            callback: async () => {
              game.dialogBox.messages.push({
                text: 'Ok merci de l\'info ! Tu peux passer.',
              })
              game.dialogBox.next()

              await wait(1000)
              await game.fabien.pullOver()

              await wait(1000)
              game.door1.open()

              game.dialogBox.next()

              trigger()
            },
          },
          {
            text: 'FTTH',
            callback: async () => {
              game.dialogBox.messages.push({
                text: 'Mmmh, je pense pas...',
              })
              game.dialogBox.next()
              await wait(3000)
              game.dialogBox.hide()
              game.fabien.startWalk()
              game.mainCharacter.lives -= 0.5
            },
          },
        ],
      },
    ]
    game.dialogBox.show()
  }, false)
