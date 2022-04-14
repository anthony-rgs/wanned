import Element from "../classes/Element.js"
import Collision from "../classes/Collision.js"

class DoorLeftZone1 extends Element {
  constructor(game) {
    super(
      'doorLeftZone1',
      game,
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
      {x: -112, y: -1000},
    )
  }

  open() {
    this.currentVariantIndex = 1
  }

  close() {
    this.currentVariantIndex = 0
  }
}

export default DoorLeftZone1
