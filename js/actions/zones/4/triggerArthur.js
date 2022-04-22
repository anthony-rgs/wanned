import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'
import Sound from '../../../classes/Sound.js'

export default (game) =>
  new Action(async (trigger) => {
    game.arthur.stopWalk()
    game.disableMovements()

    // Easter egg
    const voice = new Sound(
      '../../../../assets/audios/as-soon-as-we-get.mp3',
      game.soundVolume
    )

    window.addEventListener('keydown', (e) => {
      e.key === 'p' && voice.play()
    })

    if (
      game.mainCharacter.inventory.find((object) => object.name === 'key01') ===
      undefined
    ) {
      game.dialogBox.messages = [
        {
          text: 'Arthur: Salut mec, j’ai trouve pourquoi la wifi ne fonctionne pas, il y a quelqu’un dans le deuxieme sous-sol qui prend toute la bande passante pour telecharger une quantite enorme de data. Si on ne fait rien l’ecole va deposer le bilan!',
        },
        {
          text: 'Arthur: Mais la porte est fermee a cle et je ne sais pas comment l’ouvrir...',
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
          text: 'Arthur: Salut mec, j’ai trouve pourquoi la wifi ne fonctionne pas, il y a quelqu’un dans le deuxieme sous-sol qui prend toute la bande passante pour telecharger une quantite enorme de data. Si on ne fait rien l’ecole va deposer le bilan!',
          choices: [],
        },
        {
          text: 'Arthur: Juste derriere cette porte se trouve l’echelle pour y acceder, bonne chance!',
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
      await wait(3000)
      game.dialogBox.next()
    }
  }, false)
