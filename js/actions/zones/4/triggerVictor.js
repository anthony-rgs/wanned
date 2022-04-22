import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'
import Sound from '../../../classes/Sound.js'

export default (game) =>
  new Action((trigger) => {
    game.disableMovements()
    game.ambianceSound.pause()
    new Sound('../../../../assets/audios/vico.mp3', game.soundVolume).play()

    // Easter egg
    const voice = new Sound(
      '../../../../assets/audios/monique.mp3',
      game.soundVolume
    )

    const playSound = (e) => {
      e.key === 'p' && voice.play()
    }

    window.addEventListener('keydown', playSound)

    game.dialogBox.messages = [
      {
        text: 'Victor: Salut mec, j’ai achete des packs de 16 aux Franprix, t’en veux une?',
        choices: [
          {
            text: 'Ben ouais!',
            callback: async () => {
              game.dialogBox.next()
              if (game.mainCharacter.lives <= 2) {
                game.mainCharacter.lives += 1
              }

              await wait(2000)

              window.removeEventListener('keydown', playSound)

              game.dialogBox.hide()
              game.enableMovements()
              trigger()
            },
          },
          {
            text: "Non c'est bon merci!",
            callback: () => {
              game.dialogBox.hide()
              game.enableMovements()
              game.ambianceSound.play()
              window.removeEventListener('keydown', playSound)
            },
          },
        ],
      },
      {
        text: 'Victor: Regale-toi!',
      },
    ]

    game.dialogBox.show()
  }, false)
