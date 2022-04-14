import Sprite from "../../classes/Sprite.js";

class Baptiste extends Sprite {
  constructor() {
    super(
      'baptiste',
      Object.fromEntries(['front', 'back', 'left', 'right'].map(direction => {
        return [
          direction,
          [
            { image: '../../assets/elements/sprites/baptiste/' + direction + '/1.png' },
            { image: '../../assets/elements/sprites/baptiste/' + direction + '/2.png' },
            { image: '../../assets/elements/sprites/baptiste/' + direction + '/3.png' },
            { image: '../../assets/elements/sprites/baptiste/' + direction + '/4.png' },
          ],
        ];
      })),
      30,
      30,
      { x: -640, y: -992 },
      2,
    )
  }
}

export default new Baptiste();
