import Sprite from "../../classes/Sprite.js";

export default new Sprite(
  'baptiste',
  Object.fromEntries(['front', 'back', 'left', 'right'].map(direction => {
    return [
      direction,
      [
        { image: '../../assets/sprites/baptiste/' + direction + '/1.png' },
        { image: '../../assets/sprites/baptiste/' + direction + '/2.png' },
        { image: '../../assets/sprites/baptiste/' + direction + '/3.png' },
        { image: '../../assets/sprites/baptiste/' + direction + '/4.png' },
      ],
    ];
  })),
  30,
  30,
  { x: -640, y: -992 },
  2,
)
