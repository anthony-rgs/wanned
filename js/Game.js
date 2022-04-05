class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
  }

  draw() {
    this.ctx.font = '100px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'Antho le wanned',
      this.canvas.width / 2,
      this.canvas.height / 2,
    )
  }

  update() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.draw()
  }
}

export default Game
