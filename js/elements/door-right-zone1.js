import Element from "../classes/Element.js";
import Collision from "../classes/Collision.js";

class DoorRightZone1 extends Element {
  constructor() {
    super(
      'doorRightZone1',
      [
        {
          image: '../../assets/elements/door/door-right.png',
          collisions: [
            new Collision(0, 0, 32, 32),
          ]
        },
        {
          image: '../../assets/elements/door/door-right-opened.png',
          collisions: [
            // new Collision(20, 0, 32, 32),
          ]
        }
      ],
      30,
      30,
      {x: -134, y: -960},
    )
  }

  open() {
    this.currentVariantIndex = 1
  }

  close() {
    this.currentVariantIndex = 0
  }
}

export default new DoorRightZone1();
