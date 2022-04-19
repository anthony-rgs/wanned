import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    game.arthur.stopWalk()

    new Audio('../../../../assets/audios/as-soon-as-we-get.mp3').play()
  }, false)
