import Text from './Text.js'
import Collision from './Collision.js'
import Zone from './Zone.js'
import Action from './Action.js'
import Sprite from './Sprite.js'
import DisplayedKey from './DisplayedKey.js'
import BubbleMaker from './BubbleMaker.js'
import EndScreen from './EndScreen.js'
import Sound from './Sound.js'

import Baptiste from './elements/sprites/Baptiste.js'
import Fabien from './elements/sprites/Fabien.js'
import Thierry from './elements/sprites/Thierry.js'
import Victor from './elements/sprites/Victor.js'
import Arthur from './elements/sprites/Arthur.js'
import Door from './elements/Door.js'
import MovableRock from './elements/MovableRock.js'
import Monster from './elements/sprites/Monster.js'
import Boss from './elements/sprites/Boss.js'
import Spikes from './elements/Spikes.js'
import Key from './elements/Key.js'

import HUD from './HUD.js'
import TextDialog from './TextDialog.js'

import triggerFabien from '../actions/zones/1/triggerFabien.js'
import triggerMonster from '../actions/zones/2/triggerMonster.js'
import handleContactWithMonster from '../actions/zones/2/handleContactWithMonster.js'
import triggerThierry from '../actions/zones/3/triggerThierry.js'
import triggerVictor from '../actions/zones/4/triggerVictor.js'
import triggerArthur from '../actions/zones/4/triggerArthur.js'
import triggerMap2 from '../actions/zones/5/triggerMap2.js'
import triggerBoss from '../actions/zones/6/triggerBoss.js'
import handleContactWithBoss from '../actions/zones/6/handleContactWithBoss.js'

import keyboardKeys from '../../assets/resources/keyboardKeys.js'
import maps from '../../assets/resources/maps.js'

class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')

    this.bubblesGame = null
    this.bubblesTriggered = false

    this.endScreen = null

    this._currentMapIndex = 0
    this.mapZoom = 3
    this.mapSpeed = 5

    this.speedMeasure = 10

    this.fps = 0
    this.capFps = 120
    this.frame = 0

    this.soundVolume = 0.1
    this.audioSound()
    this.mute()

    this.startTime = Date.now()

    this.ambianceSound = new Sound(
      '../../assets/audios/ambiance.mp3',
      this.soundVolume / 3
    )
    this.fightSound = new Sound(
      '../../assets/audios/fight.mp3',
      this.soundVolume / 3
    )
    this.rockSound = new Sound('../../assets/audios/rock.mp3', this.soundVolume)

    this.movementsEnabled = true

    this.thierryTriggered = false

    this.baptisteHud = new HUD(
      '../../assets/images/hud/baptiste-head.png',
      3,
      10,
      document.querySelector('#wanned')
    )

    this.dialogBox = new TextDialog()

    document.addEventListener('map-changed', (e) => {
      if (e.detail.mapIndex === 0) {
      } else if (e.detail.mapIndex === 1) {
        this.mainCharacter.position = { x: 256, y: 352 }
      }

      this.showMap()
    })

    this._lastZoneTriggered = null

    this._elements = [
      new Fabien(this),
      new Baptiste(this),
      new Monster(this),
      new Thierry(this),
      new Victor(this),
      new Arthur(this),
      new Boss(this),
    ]

    this.displayKeys()
  }

  get initialized() {
    return (
      this.mapDoors &&
      this.movableRocks &&
      this.spikes &&
      this.mapKeys &&
      this._elements
    )
  }

  get currentMapIndex() {
    return this._currentMapIndex
  }

  set currentMapIndex(index) {
    this._currentMapIndex = index
    document.dispatchEvent(
      new CustomEvent('map-changed', {
        detail: { map: this.currentMap, mapIndex: this.currentMapIndex },
      })
    )
  }

  get currentMap() {
    return maps[this.currentMapIndex]
  }

  get mapWidth() {
    return this.currentMap?.size.width ?? 700
  }

  get mapHeight() {
    return this.currentMap?.size.height ?? 400
  }

  get elements() {
    return this.initialized
      ? [
          ...this.mapDoors,
          ...this.movableRocks,
          ...this.spikes,
          ...this.mapKeys,
          ...this._elements
            .filter((element) =>
              this.currentMap.elements.includes(element.name)
            )
            .sort((a, b) => a.y - b.y),
        ]
      : []
  }

  get baptiste() {
    return this.findSprite('baptiste')
  }

  get fabien() {
    return this.findSprite('fabien')
  }

  get thierry() {
    return this.findSprite('thierry')
  }

  get victor() {
    return this.findSprite('victor')
  }

  get arthur() {
    return this.findSprite('arthur')
  }

  get door1() {
    return this.findSprite('door01')
  }

  get door2() {
    return this.findSprite('door02')
  }

  get door3() {
    return this.findSprite('door03')
  }

  get door4() {
    return this.findSprite('door04')
  }

  get upKey() {
    return this.findKey('Avancer', 'action')
  }

  get downKey() {
    return this.findKey('Reculer', 'action')
  }

  get leftKey() {
    return this.findKey('Aller à gauche', 'action')
  }

  get rightKey() {
    return this.findKey('Aller à droite', 'action')
  }

  get hitKey() {
    return this.findKey('Frapper', 'action')
  }

  get fullScreenKey() {
    return this.findKey('Mode plein écran', 'action')
  }

  get runKey() {
    return this.findKey('Courrir', 'action')
  }

  get mainCharacter() {
    return this.baptiste
  }

  get monster() {
    return this.findSprite('monster')
  }

  get boss() {
    return this.findSprite('boss')
  }

  get zoneTriggerings() {
    let activeMovableRocksZones = []
    let activeSpikesZones = []

    if (this.currentMapIndex === 0) {
      activeMovableRocksZones = this.movableRocks
        .map((rock) =>
          rock.movableZones
            .filter((zone) => {
              const zonePosition = zone.id.split('-')[1]

              return (
                (this.upKey.pressed && zonePosition === 'bottom') ||
                (this.downKey.pressed && zonePosition === 'top') ||
                (this.rightKey.pressed && zonePosition === 'left') ||
                (this.leftKey.pressed && zonePosition === 'right')
              )
            })
            .map((zone) => ({ zone, rock }))
        )
        .flat()

      activeSpikesZones = this.spikes
        .filter((spike) => spike.state === 'open')
        .map((spikes) => ({ zone: spikes.spikesZones, spikes }))
    }

    return [
      ...this._zoneTriggerings,
      ...activeMovableRocksZones
        .map(({ zone, rock }) => ({
          zones: [zone],
          action: new Action(() => {
            const zonePosition = zone.id.split('-')[1]
            const speed = this.mainCharacter.speed / 2
            this.rockSound.play()

            if (zonePosition === 'bottom' && this.upKey.pressed) {
              this.move(rock, { y: -speed }, speed)
            } else if (zonePosition === 'top' && this.downKey.pressed) {
              this.move(rock, { y: speed }, speed)
            } else if (zonePosition === 'left' && this.rightKey.pressed) {
              this.move(rock, { x: speed }, speed)
            } else if (zonePosition === 'right' && this.leftKey.pressed) {
              this.move(rock, { x: -speed }, speed)
            }
          }),
        }))
        .flat(),
      ...activeSpikesZones.map(({ spikes, zone }) => ({
        zones: zone,
        action: spikes.action,
      })),
      this.monster
        ? {
            zones: [this.monster.zone],
            action: handleContactWithMonster(this),
          }
        : {},
      this.boss
        ? {
            zones: [this.boss.zone],
            action: handleContactWithBoss(this),
          }
        : {},
      ...this.mapKeys
        .map((key) => ({
          zones: key.zone,
          action: new Action(() => {
            new Sound('../../assets/audios/key.mp3', this.soundVolume).play()

            this.mapKeys = this.mapKeys.filter((mapKey) => mapKey !== key)
            this.mainCharacter.inventory.push(key)
          }),
        }))
        .flat(),
    ].filter((zoneTriggering) => zoneTriggering.zones && zoneTriggering.action)
  }

  get collisions() {
    if (this.mapCollisions) {
      return [
        ...this.mapCollisions,
        ...this.elements.map((element) => element.collisions).flat(),
      ].filter((collision) => collision)
    } else {
      return []
    }
  }

  init() {
    window.addEventListener('keydown', (e) => {
      const key = document.querySelector(`[data-key="${e.key}"]`)

      key?.classList.add('active')

      if (e.key === this.fullScreenKey.key) {
        document.body.requestFullscreen().then()
      }

      keyboardKeys.map((k) => {
        if (k.key === e.key) {
          this.findKey(e.key, 'key').pressed = true
        }
      })
    })

    window.addEventListener('keyup', (e) => {
      const key = document.querySelector(`[data-key="${e.key}"]`)

      key?.classList.remove('active')

      keyboardKeys.map((k) => {
        if (k.key === e.key) {
          this.findKey(e.key, 'key').pressed = false
        }
      })
    })

    this.showMap()

    setInterval(() => {
      const lastZone = this._lastZoneTriggered
      const currentZone = this.mainCharacter.currentZone
      this._lastZoneTriggered = currentZone

      if (currentZone && currentZone !== lastZone) {
        currentZone.action.trigger()
      }
    }, 100)

    this.ambianceSound.play()
  }

  showMap() {
    this.map = new Image()
    this.map.src = this.currentMap.src
    this.fpsCounter = new Text(this.fps, 'Museo', 16, 'white', 30, 30)

    this.map.addEventListener('load', () => {
      this.ctx.drawImage(this.map, 0, 0)
      this.makeDoors()
      this.makeCollisions()
      this.makeZoneTriggerings()
      this.makeMovableRocks()
      this.makeSpikes()
      this.makeKeys()

      setInterval(() => {
        this.render()
      }, 1000 / this.capFps)
    })
  }

  makeCollisions() {
    this.mapCollisions = Collision.makeCollisions(
      this.currentMap.tiles.collisions,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom
    )
  }

  makeDoors() {
    this.mapDoors = Door.makeDoors(
      this,
      this.currentMap.tiles.doors,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `door${i}`
    )
  }

  makeZoneTriggerings() {
    const zones = Zone.makeZones(
      this.currentMap.tiles.zones,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom
    )

    this._zoneTriggerings = [
      {
        zones: zones.filter((zone) => zone.id === '01'),
        action: triggerFabien(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '02'),
        action: triggerMonster(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '03'),
        action: triggerThierry(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '04'),
        action: triggerVictor(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '05'),
        action: triggerArthur(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '06'),
        action: triggerMap2(this),
      },
      {
        zones: zones.filter((zone) => zone.id === '07'),
        action: triggerBoss(this),
      },
    ]
  }

  makeMovableRocks() {
    this.movableRocks = MovableRock.makeMovableRocks(
      this,
      this.currentMap.tiles.movableRocks,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `movableRock${i}`
    )
  }

  makeSpikes() {
    this.spikes = Spikes.makeSpikes(
      this,
      this.currentMap.tiles.spikes,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `spike${i}`
    )
  }

  makeKeys() {
    this.mapKeys = Key.makeKeys(
      this,
      this.currentMap.tiles.keys,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `key${i}`
    )
  }

  makeBubbles() {
    this.bubblesGame = new BubbleMaker(this)
    return this.bubblesGame
  }

  retry() {
    console.log(this.baptiste)
    this.bubblesGame = null
    this.bubblesTriggered = false
    this.endScreen = null
    this.currentMapIndex = 0
    this.speedMeasure = 10
    this.movementsEnabled = true
    this.thierryTriggered = false
    this.startTime = Date.now()
    this.dialogBox = new TextDialog()
    this._lastZoneTriggered = null
    this.elements.forEach((element) => {
      if (element instanceof Sprite) {
        element.inventory = []
      }
    })
    this.baptiste.lives = 3
    this.baptiste.position = { x: 640, y: 992 }
    this.baptiste.currentDirection = 'up'
    this.enableMovements()
    console.log(this.baptiste)
  }

  updateCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.makeCollisions()
  }

  findSprite(name) {
    return this.elements.find((element) => element.name === name)
  }

  findKey(key, type) {
    return keyboardKeys.find((k) => k[type] === key)
  }

  triggerGameOver() {
    if (this.endScreen === null) {
      this.endScreen = new EndScreen('Game Over', this)
      this.disableMovements()
    }
  }

  checkCollisions(element) {
    if (window.debug && !window.hasCollisions) return false

    return this.collisions
      .filter(
        (collision) =>
          collision.parent === null || element.id !== collision.parent?.id
      )
      .some((collision) =>
        collision.collide(
          element.position.x,
          element.position.y,
          element.width,
          element.height,
          element instanceof Sprite
        )
      )
  }

  checkInZone(elementX, elementY, elementWidth, elementHeight, zones) {
    for (let i = 0; i < zones.length; i++) {
      const zone = zones[i]

      if (
        elementX + elementWidth >= zone.x &&
        elementX <= zone.x + zone.width &&
        elementY + elementHeight >= zone.y &&
        elementY <= zone.y + zone.height
      ) {
        return true
      }
    }
    return false
  }

  enableMovements() {
    this.movementsEnabled = true
  }

  disableMovements() {
    this.movementsEnabled = false
  }

  move(element, movement, speed = element.speed) {
    if (element !== this.mainCharacter || this.movementsEnabled) {
      const { x, y } = element.position

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

      if (element.animate) {
        if (this.mainCharacter) {
          if (this.mainCharacter.isWalking) {
            this.mainCharacter.walkingSound.play()
          } else {
            this.mainCharacter.walkingSound.pause()
          }
        }

        element.animate(movement)
      }

      if (this.checkCollisions(element)) {
        element.position.x = x
        element.position.y = y
      }
    }
  }

  displayKeys() {
    const arrowKeysBottomWrapper = document.createElement('div')
    const controlsContainer = document.querySelector('#controls-container')
    controlsContainer.appendChild(arrowKeysBottomWrapper)

    keyboardKeys.forEach((key) => {
      if (key.key.includes('Arrow')) {
        if (key.key !== 'ArrowUp') {
          new DisplayedKey(key, arrowKeysBottomWrapper)
        } else {
          new DisplayedKey(key)
        }
      } else if (key.action === 'Mode plein écran') {
        new DisplayedKey(key).onClick(() =>
          window.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: this.fullScreenKey.key,
            })
          )
        )
      } else {
        new DisplayedKey(key)
      }
    })
  }

  draw() {
    if (
      !this.mainCharacter.hitting &&
      !this.hitKey.pressed &&
      !this.mainCharacter.stop
    ) {
      if (this.upKey.pressed) {
        this.mainCharacter.isWalking = true
        this.move(this.mainCharacter, { y: -this.mapSpeed })
      } else if (this.leftKey.pressed) {
        this.mainCharacter.isWalking = true
        this.move(this.mainCharacter, { x: -this.mapSpeed })
      } else if (this.downKey.pressed) {
        this.mainCharacter.isWalking = true
        this.move(this.mainCharacter, { y: this.mapSpeed })
      } else if (this.rightKey.pressed) {
        this.mainCharacter.isWalking = true
        this.move(this.mainCharacter, { x: this.mapSpeed })
      } else if (
        !this.upKey.pressed &&
        !this.downKey.pressed &&
        !this.leftKey.pressed &&
        !this.rightKey.pressed
      ) {
        this.mainCharacter.currentVariantIndex = 0
        this.mainCharacter.isWalking = false
        this.rockSound.pause()
        this.rockSound.reset()
      }
    }

    if (
      this.runKey.pressed &&
      this.speedMeasure > 0 &&
      (this.upKey.pressed ||
        this.downKey.pressed ||
        this.leftKey.pressed ||
        this.rightKey.pressed)
    ) {
      this.mainCharacter.run = true
      this.speedMeasure -= 0.05
    } else {
      this.mainCharacter.run = false

      if (this.speedMeasure < 10) {
        this.speedMeasure += 0.01
      }
    }

    if (this.hitKey.pressed && this.mainCharacter.canHit) {
      this.mainCharacter.hit()
    }

    this.ctx.drawImage(
      this.map,
      -this.mainCharacter.x + this.canvas.width / 2,
      -this.mainCharacter.y + this.canvas.height / 2,
      this.mapWidth * this.mapZoom,
      this.mapHeight * this.mapZoom
    )

    this.elements.forEach((element) => {
      element.draw(
        this.ctx,
        element === this.mainCharacter
          ? this.canvas.width / 2
          : element.x - this.mainCharacter.x + this.canvas.width / 2,
        element === this.mainCharacter
          ? this.canvas.height / 2
          : element.y - this.mainCharacter.y + this.canvas.height / 2
      )
    })

    if (window.debug) {
      this.ctx.fillStyle = '#33d1d4aa'
      this.collisions?.forEach((collision) => {
        this.ctx.fillRect(
          collision.startX - this.mainCharacter.x + this.canvas.width / 2,
          collision.startY - this.mainCharacter.y + this.canvas.height / 2,
          collision.endX - collision.startX,
          collision.endY - collision.startY
        )
      })
      this.ctx.fillStyle = 'rgba(212,51,51,0.67)'
      this.zoneTriggerings
        ?.map((zoneTriggering) => zoneTriggering.zones)
        .flat()
        .forEach((zone) => {
          this.ctx.fillRect(
            zone.x - this.mainCharacter.x + this.canvas.width / 2,
            zone.y - this.mainCharacter.y + this.canvas.height / 2,
            zone.width,
            zone.height
          )
        })
    }
  }

  audioSound() {
    const audio = document.createElement('div')
    audio.classList.add('audio')
    document.body.insertBefore(audio, this.canvas)
    for (let i = 0; i < 5; i++) {
      const soundBar = document.createElement('div')
      soundBar.classList.add('bar')
      audio.appendChild(soundBar)
    }
  }

  mute() {
    const defaultSoundVolume = this.soundVolume
    const audio = document.querySelector('.audio')
    const bar = document.querySelectorAll('.bar')
    audio.addEventListener('click', () => {
      if (bar[0].classList.contains('hide')) {
        for (let i = 0; i < bar.length; i++) {
          bar[i].classList.remove('hide')
        }
        this.soundVolume = defaultSoundVolume
      } else {
        for (let i = 0; i < bar.length; i++) {
          bar[i].classList.add('hide')
        }
        this.soundVolume = 0
      }
    })
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()

    this.baptisteHud.baseLives = this.baptiste.baseLives
    this.baptisteHud.lives = this.baptiste.lives
    this.baptisteHud.speedMeasure = this.speedMeasure

    if (this.baptiste.lives <= 0) {
      this.triggerGameOver()
    }

    this.frame++
    const time = Date.now()

    if (time - this.startTime > 1000) {
      this.fps = Math.round(this.frame / ((time - this.startTime) / 1000))
      this.startTime = time
      this.frame = 0
      this.fpsCounter.text = this.fps
    }
  }
}

export default Game
