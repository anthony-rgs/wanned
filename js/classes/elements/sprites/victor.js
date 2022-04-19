import Sprite from '../../Sprite.js'

class Victor extends Sprite {
  constructor(game) {
    const initialPosition = { x: 1970, y: 1040 }

    super(
      'victor',
      game,
      Object.fromEntries(
        ['up', 'down', 'left', 'right'].map((direction) => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/victor/' +
                  direction +
                  '/1.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/victor/' +
                  direction +
                  '/2.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/victor/' +
                  direction +
                  '/3.png',
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/victor/' +
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
      1
    )

    setInterval(() => {
      this.lookSomewhere()
    }, 2000)
  }

  lookSomewhere() {
    const directions = ['left', 'up', 'down']

    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)]

    this.currentDirection = randomDirection
  }
}

export default Victor
