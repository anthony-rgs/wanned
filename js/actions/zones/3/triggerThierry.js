import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default game =>
  new Action(async trigger => {
    game.thierry.stopWalk()
    game.mainCharacter.stop = true

    await wait(1000)

    game.dialogBox.messages = [
      {
        text: 'Bonjour jeune homme, que faites-vous là ?',
        choices: [
          {
            text: 'Casse pas les couilles laisse passer stp',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: "Hop hop hop ! Pas de ça ici, bonjour d'abord. Pour passer tu vas devoir jouer à un petit jeu.",
        choices: [
          {
            text: 'Ok, dis-moi',
            callback: () => {
              game.dialogBox.next()
            },
          },
        ],
      },
      {
        text: "Le but : éclater le plus de bulles en 10s. Si tu en éclates plus que 40 tu passes, sinon c'est retour à la case départ. Compris ?",
        choices: [
          {
            text: "Let's go !",
            callback: () => {
              game.mainCharacter.stop = false
              game.dialogBox.hide()

              trigger()
              console.log('bubbles')
            },
          },
        ],
      },
    ]

    game.dialogBox.show()
  }, false)
