class Text {
  constructor(text, family, size, color) {
    this.text = text
    this.family = family
    this.size = size
    this.color = color
  }

  draw(ctx, x, y) {
    ctx.font = `${this.size}px ${this.family}`
    ctx.fillStyle = this.color
    ctx.fillText(this.text, x, y)
  }
}

export default Text
