import Sprite from '../../Sprite.js'

class Baptiste extends Sprite {
  constructor(game) {
    super(
      'baptiste',
      game,
      Object.fromEntries(
        ['up', 'down', 'left', 'right'].map((direction) => {
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
        })
      ),
      30,
      30,
      { x: 640, y: 992 },
      // 1.25
      10
    )
    this.safe = false
  }
}

export default Baptiste
