import Sprite from '../../Sprite.js'
import Zone from '../../Zone.js'

class Boss extends Sprite {
  constructor(game) {
    super(
      'boss',
      game,
      Object.fromEntries(
        ['up', 'down', 'left', 'right'].map((direction) => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/boss/' + direction + '/1.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/boss/' + direction + '/2.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/boss/' + direction + '/3.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/boss/' + direction + '/4.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/boss/' +
                  direction +
                  '/f-1.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/boss/' +
                  direction +
                  '/f-2.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/boss/' +
                  direction +
                  '/f-3.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/boss/' +
                  direction +
                  '/f-4.png',
              },
            ],
          ]
        })
      ),
      60,
      60,
      { x: 235, y: 50 },
      0.7
    )

    this.lives = 5
    this.stop = true
    this.safe = false
    this.interval = null
    this.currentDirection = 'down'

    setInterval(() => {
      this.lead()
    }, (1000 / this.game.capFps) * 2)
  }

  get zone() {
    return new Zone(this.x, this.y, this.width, this.height, 'boss')
  }

  disableAttack() {
    clearInterval(this.interval)
  }

  handleAttack() {
    this.interval = setInterval(() => {
      if (Math.random() < 0.5 && this.canHit) {
        this.hit()
      }
    }, 500)
  }

  lead() {
    if (!this.stop) {
      const x = this.game.mainCharacter?.x - this.x
      const y = this.game.mainCharacter?.y - this.y

      let movement = {}

      if (Math.abs(x) > 20) {
        movement.x = x
      }

      if (Math.abs(y) > 20) {
        movement.y = y
      }

      this.game.move(this, movement)
    }
  }
}

export default Boss
