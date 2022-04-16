import Element from "./Element.js"

class Sprite extends Element {
  constructor(
    name,
    game,
    variants,
    w,
    h,
    initialPosition = {
      x: 0,
      y: 0,
    },
    speed = 4,
  ) {
    super(name, game, variants, w, h, initialPosition)
    this.variantsLength = 4
    this.walkAnimationSpeed = 1
    this.speed = speed
    this.frame = 0
    this.currentDirection = 'front'
    this.lives = 3
    this.baseLives = this.lives
  }

  get currentVariant() {
    return this.variants[this.currentDirection][this.currentVariantIndex]
  }

  animate(movement) {
    this.frame++

    if (this.frame % (10 / this.walkAnimationSpeed) === 0) {
      if (this.currentVariantIndex < this.variantsLength - 1) {
        this.currentVariantIndex++
      } else {
        this.currentVariantIndex = 0
      }
    }

    if ('x' in movement) {
      if (movement.x < 0) {
        this.left()
      } else if (movement.x > 0) {
        this.right()
      }
    } else if ('y' in movement) {
      if (movement.y < 0) {
        this.front()
      } else if (movement.y > 0) {
        this.back()
      }
    }
  }

  front() {
    this.currentDirection = 'front'
  }

  back() {
    this.currentDirection = 'back'
  }

  left() {
    this.currentDirection = 'left'
  }

  right() {
    this.currentDirection = 'right'
  }

  preload() {
    Object.entries(this.variants).forEach(([direction, variants]) => {
      variants.forEach((variant, i) => {
        const image = new Image()
        image.src = variant.image
        this.variants[direction][i] = { image }
      })
    })
  }
}

export default Sprite
