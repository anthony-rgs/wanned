class Sprite {
  constructor(variants, w, h) {
    this.variants = variants
    this.width = w
    this.height = h
    this.x = 0
    this.y = 0
    this.speed = 1
    this.image = new Image()
    this.variant = null
    this.setVariant(this.variants.forward)
  }

  setVariant(variant) {
    if (this.variant !== variant) {
      this.image.src = variant
      this.variant = variant
    }
  }

  draw(ctx, x, y) {
    this.x = x
    this.y = y
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  forward() {
    this.y -= this.speed
    this.setVariant(this.variants.forward)
  }

  backward() {
    this.y += this.speed
    this.setVariant(this.variants.backward)
  }

  left() {
    this.x -= this.speed
    this.setVariant(this.variants.left)
  }

  right() {
    this.x += this.speed
    this.setVariant(this.variants.right)
  }
}

export default Sprite
