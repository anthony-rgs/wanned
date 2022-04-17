import Element from './Element.js'

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
    speed = 4,
  ) {
    super(name, game, variants, w, h, initialPosition)
    this.moveVariantsLength = 4
    this.fightVariantsLength = 4
    this.speed = speed
    this.walkAnimationSpeed = 1
    this.frame = 0
    this.currentDirection = 'front'
    this._lives = 3
    this.baseLives = this.lives
    this.hitting = false
    this.stop = false
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
      moveVariants[direction] = variants.filter(variant => {
        return variant.type === 'move'
      })
    })

    return moveVariants
  }

  get fightVariants() {
    const moveVariants = {}

    Object.entries(this.variants).forEach(([direction, variants]) => {
      moveVariants[direction] = variants.filter(variant => {
        return variant.type === 'fight'
      })
    })

    return moveVariants
  }

  get currentVariant() {
    if (this.hitting) {
      return this.fightVariants[this.currentDirection][this.currentVariantIndex]
    } else {
      return this.moveVariants[this.currentDirection][this.currentVariantIndex]
    }
  }

  animate(movement) {
    this.frame++

    if (this.frame % (10 / this.walkAnimationSpeed) === 0) {
      if (this.currentVariantIndex < this.moveVariantsLength - 1) {
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
        this.front()
      } else if (movement.y > 0) {
        this.back()
      }
    }
  }

  front() {
    this.currentDirection = 'front'
  }

  back() {
    this.currentDirection = 'back'
  }

  left() {
    this.currentDirection = 'left'
  }

  right() {
    this.currentDirection = 'right'
  }

  hit() {
    this.hitting = true

    new Audio('../../assets/audios/sword.mp3').play()

    const interval = setInterval(() => {
      if (this.currentVariantIndex < this.fightVariantsLength - 1) {
        this.currentVariantIndex++
      } else {
        clearInterval(interval)
        this.currentVariantIndex = 0
        this.hitting = false
      }
    }, 100)

    switch (this.currentDirection) {
      case 'front':
        break
      case 'back':
        break
      case 'left':
        break
      case 'right':
        break
      default:
        break
    }
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
