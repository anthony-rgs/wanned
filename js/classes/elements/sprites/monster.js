import Sprite from '../../Sprite.js'
import Zone from '../../Zone.js'

class Monster extends Sprite {
  constructor(game) {
    super(
      'monster',
      game,
      Object.fromEntries(
        ['front', 'back', 'left', 'right'].map(direction => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/1.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/2.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/3.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/4.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/f-1.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/f-2.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/f-3.png',
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/baptiste/' +
                  direction +
                  '/f-4.png',
              },
            ],
          ]
        }),
      ),
      30,
      30,
      { x: 1200, y: 300 },
      0.4,
    )

    this.lives = 3
    this.stop = true
    this.safe = false
  }

  get zone() {
    return new Zone(this.x, this.y, this.width, this.height, 'monster')
  }

  handleAttack() {
    if (!this.stop) {
      setInterval(() => {
        if (Math.random() < 0.5) {
          this.hit()
        }
      }, 500)
    }
  }

  die() {
    this.stop = true
  }

  lead() {
    if (!this.stop) {
      this.game.move(this, {
        x: this.game.mainCharacter.x - this.x,
        y: this.game.mainCharacter.y - this.y,
      })
    }
  }
}

export default Monster
