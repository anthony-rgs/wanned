import Element from './Element.js'
import Sound from './Sound.js'

class Sprite extends Element {
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
    speed = 4
  ) {
    super(name, game, variants, w, h, initialPosition)
    this.moveVariantsLength = 4
    this.fightVariantsLength = 4
    this._speed = speed
    this.walkAnimationSpeed = 1
    this.frame = 0
    this.currentDirection = 'up'
    this._lives = 3
    this.baseLives = this.lives
    this.hitting = false
    this.hitDelay = 500
    this.canHit = true
    this.stop = false
    this.isDead = false
    this.run = false
    this.inventory = []
  }

  get speed() {
    return this._speed * (this.run ? 1.75 : 1)
  }

  set speed(value) {
    this._speed = value
  }

  get lives() {
    return this._lives
  }

  set lives(value) {
    if (value - this._lives < 0) {
      if (this.game.mainCharacter === this) {
        document.querySelector('#fog').classList.add('damages')

        setTimeout(() => {
          document.querySelector('#fog').classList.remove('damages')
        }, 2000)
      }
    }

    if (value < 0) {
      this._lives = 0
    } else {
      this._lives = value
    }
  }

  get moveVariants() {
    const moveVariants = {}

    Object.entries(this.variants).forEach(([direction, variants]) => {
      moveVariants[direction] = variants.filter((variant) => {
        return variant.type === 'move'
      })
    })

    return moveVariants
  }

  get fightVariants() {
    const fightVariants = {}

    Object.entries(this.variants).forEach(([direction, variants]) => {
      fightVariants[direction] = variants.filter((variant) => {
        return variant.type === 'fight'
      })
    })

    return fightVariants
  }

  get currentVariant() {
    if (this.hitting) {
      return this.fightVariants[this.currentDirection][this.currentVariantIndex]
    } else {
      return this.moveVariants[this.currentDirection][this.currentVariantIndex]
    }
  }

  get currentVariantLength() {
    return this.moveVariantsLength - 1
  }

  animate(movement) {
    this.frame++

    if (
      (this.frame / (this.run ? 1.3 : 1.7)) % (10 / this.walkAnimationSpeed) ===
      0
    ) {
      if (this.currentVariantIndex < this.currentVariantLength) {
        this.currentVariantIndex++
      } else {
        this.currentVariantIndex = 0
      }
    }

    if ('x' in movement) {
      if (movement.x < 0) {
        this.left()
      } else if (movement.x > 0) {
        this.right()
      }
    } else if ('y' in movement) {
      if (movement.y < 0) {
        this.up()
      } else if (movement.y > 0) {
        this.down()
      }
    }
  }

  up() {
    this.currentDirection = 'up'
  }

  down() {
    this.currentDirection = 'down'
  }

  left() {
    this.currentDirection = 'left'
  }

  right() {
    this.currentDirection = 'right'
  }

  hit() {
    this.canHit = false
    this.hitting = true
    setTimeout(() => {
      this.canHit = true
    }, this.hitDelay)

    new Sound('../../assets/audios/sword.mp3', this.game.soundVolume).play()

    const interval = setInterval(() => {
      if (this.currentVariantIndex < this.fightVariantsLength - 1) {
        this.currentVariantIndex++
      } else {
        clearInterval(interval)
        this.currentVariantIndex = 0
        this.hitting = false
      }
    }, 100)
  }

  die() {
    this.stop = true
    this.isDead = true
    this?.disableAttack()
  }

  preload() {
    Object.entries(this.variants).forEach(([direction, variants]) => {
      variants.forEach((variant, i) => {
        const image = new Image()
        image.src = variant.image
        this.variants[direction][i] = { type: variant.type, image }
      })
    })
  }
}

export default Sprite
