import Sprite from '../../Sprite.js'

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
      1,
    )

    this.stepCounter = 0
    this.walking = true
    this.startWalk()
  }

  startWalk() {
    this.walkTimeout = setTimeout(() => {
      this.game.move(this, {
        y:
          Math.floor(this.stepCounter / 256) % 2 === 0
            ? this.speed
            : -this.speed,
      })

      this.stepCounter++

      if (this.walking) {
        this.startWalk()
      }
    }, 1000 / this.game.fps * 2)
  }

  stopWalk() {
    clearTimeout(this.walkTimeout)
    this.walking = false
    this.currentDirection = 'front'
  }
}

export default Thierry
