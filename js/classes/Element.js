class Element {
  constructor(
    name,
    variants,
    w,
    h,
    initialPosition = {
      x: 0,
      y: 0,
    },
  ) {
    this.name = name
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

  preload() {
    Object.entries(this.variants).forEach(([direction, variants]) => {
      variants.forEach((variant, i) => {
        const img = new Image()
        img.src = variant
        this.variants[direction][i] = img
      })
    })
  }
}

export default Element
