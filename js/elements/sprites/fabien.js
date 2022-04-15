import Sprite from "../../classes/Sprite.js"
import wait from "../../utils/wait.js";

class Fabien extends Sprite {
  constructor(game) {
    const initialPosition = {x: -148, y: -1008}

    super(
      'fabien',
      game,
      Object.fromEntries(['front', 'back', 'left', 'right'].map(direction => {
        return [
          direction,
          [
            {image: '../../assets/elements/sprites/fabien/' + direction + '/1.png'},
            {image: '../../assets/elements/sprites/fabien/' + direction + '/2.png'},
            {image: '../../assets/elements/sprites/fabien/' + direction + '/3.png'},
            {image: '../../assets/elements/sprites/fabien/' + direction + '/4.png'},
          ],
        ]
      })),
      30,
      30,
      initialPosition,
      2,
    )

    this.stepCounter = 0
    this.startWalk()
  }

  startWalk() {
    this.walkInterval = setInterval(() => {
      this.game.move(this, {
        x: (Math.floor(this.stepCounter / 25)) % 2 === 0 ? this.speed : -this.speed,
      })
      this.stepCounter++
    }, 100)
  }

  stopWalk() {
    clearInterval(this.walkInterval)
    this.currentDirection = 'front'
  }

  async _pullOverMovement() {
    if (!(-86 - this.speed / 2 < this.x && this.x < -86 + this.speed / 2)) {
      this.game.move(this, {x: this.speed})
      await wait(100)
      await this._pullOverMovement();
    } else {
      this.stopWalk()
    }
  }

  async pullOver() {
    this.stopWalk()
    await this._pullOverMovement()
  }
}

export default Fabien
