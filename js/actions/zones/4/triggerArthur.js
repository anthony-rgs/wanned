import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    game.arthur.stopWalk()
    game.disableMovements()

    // Easter egg
    const voice = new Audio('../../../../assets/audios/as-soon-as-we-get.mp3')
    voice.volume = 0.5

    window.addEventListener('keydown', (e) => {
      e.key === 'p' && voice.play()
    })

    if (
      game.mainCharacter.inventory.find((object) => object.name === 'key01') ===
      undefined
      ) {
        game.dialogBox.messages = [
          {
            text:'Arthur: Salut mec, j’ai trouvé pourquoi la wifi ne fonctionne pas, il y a quelqu’un dans le deuxième sous-sol qui prend toute la bande passante pour télécharger une quantité énorme de data. Si on ne fait rien l’école va déposer le bilan!'
          },
          {
          text: "Arthur: Mais la porte est fermée à clé et je ne sais pas comment l’ouvrir...",
        },
      ]

      game.dialogBox.show()
      await wait(5000)
      game.dialogBox.next()
      game.arthur.walking = true
      game.enableMovements()
      await wait(3000)
      game.dialogBox.next()
      game.arthur.startWalk()
      game.dialogBox.hide()
    } else {
      game.dialogBox.messages = [
        {
          text:'Arthur: Salut mec, j’ai trouvé pourquoi la wifi ne fonctionne pas, il y a quelqu’un dans le deuxième sous-sol qui prend toute la bande passante pour télécharger une quantité énorme de data. Si on ne fait rien l’école va déposer le bilan!',
          choices: []
        },
        {
          text: "Arthur: Juste derrière cette porte se trouve l’échelle pour y accéder, bonne chance!",
          choices: [
            {
              text: "Let's go !",
              callback: async () => {
                game.dialogBox.next()
                await wait(5000)
                await game.arthur.pullOver()
                await wait(3000)
                game.door4.open()
                trigger()
                game.dialogBox.hide()
                game.enableMovements()
              },
            },
          ],
        },
        {
          text: 'Arthur: Bonne chance camarade !',
        },
      
      ]
      game.dialogBox.show()
      await wait (3000)
      game.dialogBox.next()
    }
  }, false)
