import Sprite from './Sprite.js'
import Text from './Text.js'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.brontis = null
    this.map = null
    this.mapCoords = {
      x: 0,
      y: 0,
    }
    this.mapZoom = 3
    this.mapSpeed = 5
    this.fps = 0
    this.startTime = Date.now()
    this.frame = 0
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

    this.map = new Image()
    this.map.src = '../../assets/images/map.png'

    this.map.addEventListener('load', () => {
      this.ctx.drawImage(this.map, 0, 0)
    })

    this.fpsCounter = new Text(this.fps, 'Museo', 16, 'white', 30, 30)

    window.addEventListener('keydown', e => {
      this.keys.map(k => {
        if (k.key === e.key) {
          this.findKey(e.key, 'key').pressed = true
        }
      })
    })

    window.addEventListener('keyup', e => {
      this.keys.map(k => {
        if (k.key === e.key) {
          this.findKey(e.key, 'key').pressed = false
        }
      })
    })
  }

  findKey(key, type) {
    return this.keys.find(k => k[type] === key)
  }

  draw() {
    if (this.findKey('forward', 'action').pressed) {
      this.mapCoords.y += this.mapSpeed
      this.brontis.forward()
    } else if (this.findKey('left', 'action').pressed) {
      this.mapCoords.x += this.mapSpeed
      this.brontis.left()
    } else if (this.findKey('backward', 'action').pressed) {
      this.mapCoords.y -= this.mapSpeed
      this.brontis.backward()
    } else if (this.findKey('right', 'action').pressed) {
      this.mapCoords.x -= this.mapSpeed
      this.brontis.right()
    }
    this.ctx.drawImage(
      this.map,
      this.mapCoords.x,
      this.mapCoords.y,
      1700 * this.mapZoom,
      this.canvas.height * this.mapZoom,
    )
    this.brontis.draw(
      this.ctx,
      this.canvas.width / 2 - this.brontis.width / 2,
      this.canvas.height / 2 - this.brontis.height / 2,
    )
    this.fpsCounter.draw(this.ctx, this.canvas.width - 40, 30)
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()

    this.frame++
    const time = Date.now()

    if (time - this.startTime > 1000) {
      this.fps = Math.round(this.frame / ((time - this.startTime) / 1000))
      this.startTime = time
      this.frame = 0
      this.fpsCounter.text = this.fps
    }

    window.requestAnimationFrame(() => this.render())
  }
}

export default Game
