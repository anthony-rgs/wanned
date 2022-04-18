import Sprite from '../../Sprite.js'
import wait from '../../../utils/wait.js'

class Thierry extends Sprite {
  constructor(game) {
    const initialPosition = { x: 1400, y: 650 }

    super(
      'thierry',
      game,
      Object.fromEntries(
        ['front', 'back', 'left', 'right'].map(direction => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/thierry/' +
                  direction +
                  '/1.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/thierry/' +
                  direction +
                  '/2.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/thierry/' +
                  direction +
                  '/3.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/thierry/' +
                  direction +
                  '/4.png',
              },
            ],
          ]
        }),
      ),
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
        y:
          Math.floor(this.stepCounter / 50) % 2 === 0
            ? this.speed
            : -this.speed,
      })
      this.stepCounter++
    }, 100)
  }

  stopWalk() {
    clearInterval(this.walkInterval)
    this.currentDirection = 'front'
  }

  async _pullOverMovement() {
    if (!(86 - this.speed / 2 < this.x && this.x < 86 + this.speed / 2)) {
      this.game.move(this, { x: -this.speed })
      await wait(100)
      await this._pullOverMovement()
    } else {
      this.stopWalk()
    }
  }

  async pullOver() {
    this.stopWalk()
    await this._pullOverMovement()
  }
}

export default Thierry
