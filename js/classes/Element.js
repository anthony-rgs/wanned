import Collision from "./Collision.js"

class Element {
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
  ) {
    this.name = name
    this.game = game
    this.variants = variants
    this.width = w
    this.height = h
    this.position = initialPosition
    this.currentVariantIndex = 0

    this.preload()
  }

  get currentVariant() {
    return this.variants[this.currentVariantIndex]
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

  get collisions() {
    return (this.currentVariant.collisions ?? []).map(
      (collision) => new Collision(
        (this.x + collision.startX),
        (this.y + collision.startY),
        (this.x + collision.endX),
        (this.y + collision.endY),
      )
    )
  }

  draw(ctx, x, y) {
    if (this.currentVariant) {
      ctx.drawImage(
        this.currentVariant.image,
        (x ?? this.x),
        (y ?? this.y),
        this.width,
        this.height,
      )
    }
  }

  preload() {
    Object.entries(this.variants).forEach(([direction, variant]) => {
      const image = new Image()
      image.src = variant.image

      this.variants[direction] = {image, collisions: variant.collisions}
    })
  }
}

export default Element
