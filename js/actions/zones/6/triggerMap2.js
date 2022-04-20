import Action from '../../../classes/Action.js'
import wait from '../../../utils/wait.js'

export default (game) =>
  new Action(async (trigger) => {
    const fog = document.querySelector('#fog')

    game.disableMovements()
    fog.classList.add('fade-in')
    await wait(1000)
    game.currentMapIndex = 1
    await wait(1000)
    fog.classList.remove('fade-in')
    fog.classList.add('fade-out')
    await wait(1000)
    game.enableMovements()
  }, false)
