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
    this.image = new Image()
    this.variant = null
    this.frame = 0
    this.currentVariant = 0
    this.setVariant(this.variants.front[0])
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

  setVariant(variant) {
    if (this.variant !== variant) {
      this.image.src = variant
      this.variant = variant
    }
  }

  draw(ctx, x, y) {
    ctx.drawImage(this.image, x ?? this.x, y ?? this.y, this.width, this.height)
  }

  animate(movement) {
    this.frame++

    if (this.frame % (10 / this.walkAnimationSpeed) === 0) {
      if (this.currentVariant < this.variantsLength - 1) {
        this.currentVariant++
      } else {
        this.currentVariant = 0
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
    this.setVariant(this.variants.front[this.currentVariant])
  }

  backward() {
    this.setVariant(this.variants.back[this.currentVariant])
  }

  left() {
    this.setVariant(this.variants.left[this.currentVariant])
  }

  right() {
    this.setVariant(this.variants.right[this.currentVariant])
  }

  preload() {
    Object.values(this.variants).forEach(variant => {
      const img = new Image()
      img.src = variant
    })
  }
}

export default Sprite
