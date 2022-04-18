import Action from '../../../classes/Action.js'

export default (game) =>
  new Action((trigger) => {
    if (game.bubblesTriggered) {
      return
    } else {
      game.bubblesTriggered = true
    }

    game.makeBubbles().onEnd(() => {
      game.door3.open()
      game.thierry.startWalk()
      trigger()
    })
  }, false).trigger()
