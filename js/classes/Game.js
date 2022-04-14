import Text from './Text.js'
import Collision from './Collision.js'
import mapCollisions from '../../assets/resources/mapCollisions.js'
import Baptiste from "../elements/sprites/baptiste.js"
import Fabien from "../elements/sprites/fabien.js"
import DoorLeftZone1 from "../elements/door-left-zone1.js"
import DoorRightZone1 from "../elements/door-right-zone1.js"
import Action from "./Action.js"
import wait from "../utils/wait.js"
import HUD from "./HUD.js"

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
    this.mapCollisions = null
    this.frame = 0
    this.baptisteHud = new HUD('../../assets/images/hud/baptiste-head.png', 3, document.querySelector('canvas'))
    this.keys = [
      {
        key: 'ArrowUp',
        pressed: false,
        action: 'forward',
      },
      {
        key: 'ArrowLeft',
        pressed: false,
        action: 'left',
      },
      {
        key: 'ArrowDown',
        pressed: false,
        action: 'backward',
      },
      {
        key: 'ArrowRight',
        pressed: false,
        action: 'right',
      },
    ]
    this.elements = [
      new DoorLeftZone1(this),
      new DoorRightZone1(this),
      new Fabien(this),
      new Baptiste(this)
    ]
    this.zoneTriggerings = [
      {
        zone: {x: 96, y: 1024, width: 64, height: 64},
        action: new Action(async () => {
          this.fabien.stopWalk()
          await wait(1000)
          await this.fabien.pullOver()
          this.doorLeftZone1.open()
          this.doorRightZone1.open()
        }, true)
      }
    ]
    this.init()
  }

  init() {
    this.map = new Image()
    this.map.src = '../../assets/images/map.png'

    this.map.addEventListener('load', () => {
      this.ctx.drawImage(this.map, 0, 0)
      this.makeCollisions()
      this.render()
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

  currentZone(element) {
    return this.zoneTriggerings.find(zoneTriggering => {
      return this.checkInZone(
        -element.position.x,
        -element.position.y,
        element.width,
        element.height,
        zoneTriggering.zone,
      )
    })
  }

  get collisions() {
    if (this.mapCollisions) {
      return [...this.mapCollisions, ...this.elements.map(element => element.collisions).flat()].filter(collision => collision)
    } else {
      return []
    }
  }

  makeCollisions() {
    this.mapCollisions = Collision.makeCollisions(
      mapCollisions,
      16 * this.mapZoom,
      this.map.width,
      this.map.height,
      (numberOfCollisionsByColumn, numberOfCollisionsByRow) => {
        const realCollisionXSize =
          (this.mapWidth / numberOfCollisionsByColumn) * this.mapZoom
        const realCollisionYSize =
          (this.mapHeight / numberOfCollisionsByRow) * this.mapZoom
        return {realCollisionXSize, realCollisionYSize}
      },
    )
  }

  updateCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.makeCollisions()
  }

  findSprite(name) {
    return this.elements.find(element => element.name === name)
  }

  get baptiste() {
    return this.findSprite('baptiste')
  }

  get fabien() {
    return this.findSprite('fabien')
  }

  get doorLeftZone1() {
    return this.findSprite('doorLeftZone1')
  }

  get doorRightZone1() {
    return this.findSprite('doorRightZone1')
  }

  get mainCharacter() {
    return this.baptiste
  }

  findKey(key, type) {
    return this.keys.find(k => k[type] === key)
  }

  checkCollisions(elementX, elementY, elementWidth, elementHeight) {
    return this.collisions.some(collision => collision.collide(elementX, elementY, elementWidth, elementHeight))
  }

  checkInZone(elementX, elementY, elementWidth, elementHeight, zoneCoordinates) {
    return (
      elementX >= zoneCoordinates.x &&
      elementX + elementWidth <= zoneCoordinates.x + zoneCoordinates.width &&
      elementY >= zoneCoordinates.y &&
      elementY + elementHeight <= zoneCoordinates.y + zoneCoordinates.height
    )
  }

  move(element, movement) {
    const {x, y} = element.position
    const {speed} = element

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

    element.animate(movement)

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
    }

    const currentZone = this.currentZone(element)
    if (currentZone) {
      currentZone.action.trigger()
    }
  }

  draw() {
    if (this.findKey('forward', 'action').pressed) {
      this.move(this.mainCharacter, {y: this.mapSpeed})
    } else if (this.findKey('left', 'action').pressed) {
      this.move(this.mainCharacter, {x: this.mapSpeed})
    } else if (this.findKey('backward', 'action').pressed) {
      this.move(this.mainCharacter, {y: -this.mapSpeed})
    } else if (this.findKey('right', 'action').pressed) {
      this.move(this.mainCharacter, {x: -this.mapSpeed})
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
        element === this.mainCharacter ? this.canvas.width / 2 : this.mainCharacter.x - element.x + this.canvas.width / 2,
        element === this.mainCharacter ? this.canvas.height / 2 : this.mainCharacter.y - element.y + this.canvas.height / 2,
      )
    })
    this.fpsCounter.draw(this.ctx, this.canvas.width - 40, 30)

    if (window.debug) {
      this.ctx.fillStyle = '#33d1d4aa'
      this.collisions?.forEach(collision => {
        this.ctx.fillRect(
          collision.startX + this.mainCharacter.x + this.canvas.width / 2,
          collision.startY + this.mainCharacter.y + this.canvas.height / 2,
          collision.endX - collision.startX,
          collision.endY - collision.startY,
        )
      })
      this.ctx.fillStyle = 'rgba(212,51,51,0.67)'
      this.zoneTriggerings?.forEach(zoneTriggering => {
        const zone = zoneTriggering.zone
        this.ctx.fillRect(
          zone.x + this.mainCharacter.x + this.canvas.width / 2,
          zone.y + this.mainCharacter.y + this.canvas.height / 2,
          zone.width,
          zone.height,
        )
      })
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()

    this.baptisteHud.baseLives = this.baptiste.baseLives
    this.baptisteHud.lives = this.baptiste.lives

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
