class Sprite {
  constructor(name, variants, w, h, initialPosition, speed) {
    this.name = name
    this.variants = variants
    this.preload()
    this.width = w
    this.height = h
    this.position = initialPosition ?? {
      x: 0,
      y: 0,
    }
    this.speed = speed ?? 4
    this.image = new Image()
    this.variant = null
    this.setVariant(this.variants.backward)
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
    this.setVariant(this.variants.forward)
  }

  backward() {
    this.setVariant(this.variants.backward)
  }

  left() {
    this.setVariant(this.variants.left)
  }

  right() {
    this.setVariant(this.variants.right)
  }

  preload() {
    Object.values(this.variants).forEach(variant => {
      const img = new Image()
      img.src = variant
    })
  }
}

export default Sprite
