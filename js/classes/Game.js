import Sprite from './Sprite.js'
import Text from './Text.js'
import Collision from './Collision.js'
import collisions from '../../assets/resources/collisions.js'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.map = null
    this.mapZoom = 3
    this.mapWidth = 700
    this.mapHeight = 400
    this.mapSpeed = 5
    this.fps = 0
    this.startTime = Date.now()
    this.collisions = null
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
    this.elements = []
    this.init()
    this.render()
  }

  makeCollisions() {
    // FIXME: remove "realCollisionSize" parameter (61 here) and align correctly the collisions with the map
    this.collisions = Collision.makeCollisions(
      collisions,
      16 * this.mapZoom,
      61,
      this.map.width,
      this.map.height,
    )
  }

  updateCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.makeCollisions()
  }

  init() {
    this.elements.push(
      new Sprite(
        'brontis',
        {
          forward: '../../assets/sprites/brontis/forward.png',
          backward: '../../assets/sprites/brontis/backward.png',
          left: '../../assets/sprites/brontis/left.png',
          right: '../../assets/sprites/brontis/right.png',
        },
        30,
        30,
        { x: 0, y: 0 },
      ),
    )

    this.map = new Image()
    this.map.src = '../../assets/images/map.png'

    this.map.addEventListener('load', () => {
      this.ctx.drawImage(this.map, 0, 0)
    })

    this.makeCollisions()

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

  findSprite(name) {
    return this.elements.find(element => element.name === name)
  }

  get brontis() {
    return this.findSprite('brontis')
  }

  get mainCharacter() {
    return this.brontis
  }

  findKey(key, type) {
    return this.keys.find(k => k[type] === key)
  }

  checkCollisions(elementX, elementY, elementWidth, elementHeight) {
    return this.collisions.some(collision =>
      collision.collide(elementX, elementY, elementWidth, elementHeight),
    )
  }

  move(element, movement) {
    const { x, y } = element.position
    const { speed } = element

    if (movement.x) {
      if (movement.x < 0) {
        element.position.x -= speed
      } else {
        element.position.x += speed
      }
    }

    if (movement.y) {
      if (movement.y < 0) {
        element.position.y -= speed
      } else {
        element.position.y += speed
      }
    }

    if (
      this.checkCollisions(
        -element.position.x,
        -element.position.y,
        element.width,
        element.height,
      )
    ) {
      element.position.x = x
      element.position.y = y
    } else {
      element.animate(movement)
    }
  }

  draw() {
    if (this.findKey('forward', 'action').pressed) {
      this.move(this.mainCharacter, { y: this.mapSpeed })
    } else if (this.findKey('left', 'action').pressed) {
      this.move(this.mainCharacter, { x: this.mapSpeed })
    } else if (this.findKey('backward', 'action').pressed) {
      this.move(this.mainCharacter, { y: -this.mapSpeed })
    } else if (this.findKey('right', 'action').pressed) {
      this.move(this.mainCharacter, { x: -this.mapSpeed })
    }
    this.ctx.drawImage(
      this.map,
      this.mainCharacter.x + this.canvas.width / 2,
      this.mainCharacter.y + this.canvas.height / 2,
      this.mapWidth * this.mapZoom,
      this.mapHeight * this.mapZoom,
    )
    this.elements.forEach(element => {
      element.draw(
        this.ctx,
        element === this.mainCharacter ? this.canvas.width / 2 : element.x,
        element === this.mainCharacter ? this.canvas.height / 2 : element.y,
      )
    })
    this.fpsCounter.draw(this.ctx, this.canvas.width - 40, 30)

    if (window.debug) {
      this.ctx.fillStyle = '#33d1d4aa'
      this.collisions.forEach(collision => {
        this.ctx.fillRect(
          collision.startX + this.mainCharacter.x + this.canvas.width / 2,
          collision.startY + this.mainCharacter.y + this.canvas.height / 2,
          collision.endX - collision.startX,
          collision.endY - collision.startY,
        )
      })
    }
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
