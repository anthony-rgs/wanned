import Element from "../classes/Element.js";
import Collision from "../classes/Collision.js";

export default new Element(
  'doorLeftZone1',
  [
    {
      image: '../../assets/sprites/door/door-left.png',
      collisions: [
        new Collision(0, 0, 32, 32),
      ]
    },
    {
      image: '../../assets/sprites/door/door-left-opened.png',
      collisions: [
        // new Collision(0, 0, 12, 32),
      ]
    }
  ],
  30,
  30,
  {x: -112, y: -960},
)
