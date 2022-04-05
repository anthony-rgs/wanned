import Sprite from './Sprite.js'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.brontis = null
    this.keys = [
      {
        key: 'w',
        pressed: false,
        action: 'forward',
      },
      {
        key: 'a',
        pressed: false,
        action: 'left',
      },
      {
        key: 's',
        pressed: false,
        action: 'backward',
      },
      {
        key: 'd',
        pressed: false,
        action: 'right',
      },
    ]
    this.init()
    this.render()
  }

  updateCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    this.brontis = new Sprite(
      {
        forward: '../../assets/sprites/brontis/forward.png',
        backward: '../../assets/sprites/brontis/backward.png',
        left: '../../assets/sprites/brontis/left.png',
        right: '../../assets/sprites/brontis/right.png',
      },
      80,
      80,
    )

    this.brontis.speed = 3

    window.addEventListener('keydown', e => {
      this.keys.map(k => {
        if (k.key === e.key) {
          console.log(this.findKey(e.key, 'key'))
          this.findKey(e.key, 'key').pressed = true
        }
      })
    })

    window.addEventListener('keyup', e => {
      this.findKey(e.key, 'key').pressed = false
    })
  }

  findKey(key, type) {
    return this.keys.find(k => k[type] === key)
  }

  draw() {
    if (this.findKey('forward', 'action').pressed) {
      this.brontis.forward()
    } else if (this.findKey('left', 'action').pressed) {
      this.brontis.left()
    } else if (this.findKey('backward', 'action').pressed) {
      this.brontis.backward()
    } else if (this.findKey('right', 'action').pressed) {
      this.brontis.right()
    }

    this.brontis.draw(this.ctx, this.brontis.x, this.brontis.y)
  }

  render() {
    window.requestAnimationFrame(() => this.render())
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
  }
}

export default Game
