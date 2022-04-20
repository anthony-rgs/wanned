import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    game.arthur.stopWalk()

    // Easter egg
    const voice = new Audio('../../../../assets/audios/as-soon-as-we-get.mp3')
    voice.volume = 0.5

    window.addEventListener('keydown', (e) => {
      e.key === 'p' && voice.play()
    })

    if (game.mainCharacter.inventory.find((object) => object.name === 'key01') === undefined) {
      game.dialogBox.messages = [
        {
          text: 'Salut ! On dirait que tu n\'a pas la clé pour ouvrir la porte. Je ne l\'ai pas trouvée non plus...'
        }
      ]

      game.dialogBox.show()
      await wait(5000)
      game.dialogBox.next()
      game.arthur.walking = true
      game.arthur.startWalk()
    } else {
      game.dialogBox.messages = [
        {
          text: 'Bonjour, vous voici à l\'étape finale. Vous devez battre le maître Tisbron !',
          choices: [
            {
              text: 'Let\'s go !',
              callback: async () => {
                game.dialogBox.next()
                await wait(1000)
                await game.arthur.pullOver()
                await wait(1000)
                game.door4.open()
                trigger()
                game.dialogBox.hide()
              }
            }
          ]
        },
        {
          text: 'Bonne chance camarade !'
        }
      ]

      game.dialogBox.show()
    }
  }, false)
