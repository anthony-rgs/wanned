import Element from "../classes/Element.js";
import Collision from "../classes/Collision.js";

class DoorLeftZone1 extends Element {
  constructor() {
    super(
      'doorLeftZone1',
      [
        {
          image: '../../assets/elements/door/door-left.png',
          collisions: [
            new Collision(0, 0, 32, 32),
          ]
        },
        {
          image: '../../assets/elements/door/door-left-opened.png',
          collisions: []
        }
      ],
      30,
      30,
      {x: -112, y: -960},
    )
  }
}

export default new DoorLeftZone1();
