class Sprite {
  constructor(
    name,
    variants,
    w,
    h,
    initialPosition = {
      x: 0,
      y: 0,
    },
    speed = 4,
  ) {
    this.name = name
    this.variants = variants
    this.variantsLength = 4
    this.walkAnimationSpeed = 1
    this.preload()
    this.width = w
    this.height = h
    this.position = initialPosition
    this.speed = speed
    this.frame = 0
    this.currentVariantIndex = 0
    this.currentVariant = this.variants.front[this.currentVariantIndex]
    this.currentDirection = 'forward'
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  set x(x) {
    this.position.x = x
  }

  set y(y) {
    this.position.y = y
  }

  draw(ctx, x, y) {
    if (this.currentVariant) {
      ctx.drawImage(
        this.currentVariant,
        x ?? this.x,
        y ?? this.y,
        this.width,
        this.height,
      )
    }
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
      if (movement.x > 0) {
        this.left()
      } else if (movement.x < 0) {
        this.right()
      }
    } else if ('y' in movement) {
      if (movement.y > 0) {
        this.forward()
      } else if (movement.y < 0) {
        this.backward()
      }
    }
  }

  forward() {
    this.currentVariant = this.variants.front[this.currentVariantIndex]
  }

  backward() {
    this.currentVariant = this.variants.back[this.currentVariantIndex]
  }

  left() {
    this.currentVariant = this.variants.left[this.currentVariantIndex]
  }

  right() {
    this.currentVariant = this.variants.right[this.currentVariantIndex]
  }

  preload() {
    Object.entries(this.variants).forEach(([direction, variants]) => {
      variants.forEach((variant, i) => {
        console.log(variant, direction, i)
        const img = new Image()
        img.src = variant
        console.log(img)
        this.variants[direction][i] = img
      })
    })
  }
}

export default Sprite
