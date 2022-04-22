import Action from '../../../classes/Action.js'

export default (game) =>
  new Action(async (trigger) => {
    await game.monster.transformAnimation()
    trigger()
  }, false)
