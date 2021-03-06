import Sprite from '../../Sprite.js'
import wait from '../../../utils/wait.js'

class Fabien extends Sprite {
  constructor(game) {
    const initialPosition = { x: 100, y: 1008 }

    super(
      'fabien',
      game,
      Object.fromEntries(
        ['up', 'down', 'left', 'right'].map((direction) => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/fabien/' +
                  direction +
                  '/1.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/fabien/' +
                  direction +
                  '/2.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/fabien/' +
                  direction +
                  '/3.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/fabien/' +
                  direction +
                  '/4.png',
              },
            ],
          ]
        })
      ),
      30,
      30,
      initialPosition,
      0.25
    )

    this.stepCounter = 0
    this.walking = true
    this.startWalk()
  }

  startWalk() {
    this.walkTimeout = setTimeout(() => {
      this.game.move(this, {
        x:
          Math.floor(this.stepCounter / 48) % 2 === 0
            ? this.speed
            : -this.speed,
      })

      this.stepCounter += this.speed

      if (this.walking) {
        this.startWalk()
      }
    }, (1000 / this.game.capFps) * 2)
  }

  stopWalk() {
    clearTimeout(this.walkTimeout)
    this.walking = false
    this.currentDirection = 'down'
  }

  async _pullOverMovement() {
    if (!(86 - this.speed / 2 < this.x && this.x < 86 + this.speed / 2)) {
      this.game.move(this, { x: -this.speed })
      await wait((1000 / this.game.capFps) * 2)
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

export default Fabien
