import Sprite from '../../Sprite.js'
import Zone from '../../Zone.js'
import wait from '../../../utils/wait.js'

class Monster extends Sprite {
  constructor(game) {
    super(
      'monster',
      game,
      Object.fromEntries(
        ['up', 'down', 'left', 'right'].map((direction) => {
          return [
            direction,
            [
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/anthony/' +
                  direction +
                  '/1.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/anthony/' +
                  direction +
                  '/2.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/anthony/' +
                  direction +
                  '/3.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/anthony/' +
                  direction +
                  '/4.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/1.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/2.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/3.png'
              },
              {
                type: 'move',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/4.png'
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/f-1.png'
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/f-2.png'
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/f-3.png'
              },
              {
                type: 'fight',
                image:
                  '../../assets/elements/sprites/monster/' +
                  direction +
                  '/f-4.png'
              },
              ...Array(16)
                .fill(0)
                .map((_, index) => {
                  return {
                    type: 'transformation',
                    image: `../../assets/elements/sprites/monster/transformation/${
                      index + 1
                    }.png`
                  }
                }),
              ...Array(7)
                .fill(0)
                .map((_, index) => {
                  return {
                    type: 'death',
                    image: `../../assets/elements/sprites/monster/death/${
                      index + 1
                    }.png`
                  }
                })
            ]
          ]
        })
      ),
      30,
      30,
      { x: 1200, y: 300 },
      0.4
    )

    this.lives = 3
    this.stop = true
    this.safe = false
    this.interval = null
    this.isTransforming = false
    this.isDying = false

    setInterval(() => {
      this.lead()
    }, (1000 / this.game.capFps) * 1.3)
  }

  get y() {
    return this.position.y - this.height / 2
  }

  get zone() {
    return new Zone(this.x, this.y, this.width, this.height, 'monster')
  }

  get transformationVariants() {
    const transformationVariants = []

    Object.entries(this.variants).forEach(([_, variants]) => {
      transformationVariants.push(
        variants.filter((variant) => {
          return variant.type === 'transformation'
        })
      )
    })

    return transformationVariants
  }

  get deathVariants() {
    const deathVariants = []

    Object.entries(this.variants).forEach(([_, variants]) => {
      deathVariants.push(
        variants.filter((variant) => {
          return variant.type === 'death'
        })
      )
    })

    return deathVariants
  }

  get currentVariantLength() {
    if (this.isTransforming) {
      return 16
    }

    if (this.isDying) {
      return 7
    }

    return this.moveVariantsLength - 1
  }

  get currentVariant() {
    if (this.hitting) {
      return this.fightVariants[this.currentDirection][this.currentVariantIndex]
    } else if (this.isTransforming) {
      return this.transformationVariants[0][this.currentVariantIndex]
    } else if (this.isDying) {
      return this.deathVariants[0][this.currentVariantIndex]
    } else {
      return this.moveVariants[this.currentDirection][this.currentVariantIndex]
    }
  }

  draw(ctx, x, y) {
    const isAnthony =
      this.name === 'monster' &&
      this.currentDirection === 'up' &&
      this.currentVariant.image.src.includes('anthony')

    if (this.currentVariant) {
      ctx.drawImage(
        this.currentVariant.image,
        (x ?? this.x) +
        (this.isTransforming && this.currentVariantIndex >= 3
          ? this.width * 0.3
          : 0),
        (y ?? this.y) -
        (this.isTransforming
          ? this.currentVariantIndex < 3
            ? this.height / 2
            : (this.height / 1.6) * 0.4
          : isAnthony
            ? this.height / 2
            : 0),
        this.hitting
          ? this.width * 1.5
          : this.isTransforming
            ? this.currentVariantIndex < 3
              ? this.height * 2
              : this.height * 1.6
            : isAnthony
              ? this.width * 2
              : this.width,
        this.isTransforming
          ? this.currentVariantIndex < 3
            ? this.height * 2
            : this.height * 1.6
          : isAnthony
            ? this.height * 2
            : this.height
      )
    }
  }

  async transformAnimation() {
    this.stop = true
    this.isTransforming = true
    this.currentVariantIndex = 0
    this.safe = true

    const intervalCallback = () => {
      if (this.currentVariantIndex < 15) {
        this.currentVariantIndex++
      }
    }

    // 1 to 2
    let intervalDuration = 1500
    let interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 2)
    clearInterval(interval)
    // 3 to 6
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 3)
    clearInterval(interval)
    // 7
    intervalCallback()
    await wait(1250)
    // 8 to 9
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 2)
    clearInterval(interval)
    // 10 to 12
    intervalDuration = 500
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 3)
    clearInterval(interval)
    // 13 to 16
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 4 + 1000)
    clearInterval(interval)

    this.stop = false
    this.handleAttack()
    this.isTransforming = false
    this.currentVariantIndex = 0
    this.safe = false

    this.variants = Object.fromEntries(
      Object.entries(this.variants).map(([direction, variants]) => {
        return [
          direction,
          variants.filter((variant) => {
            return !variant.image.src.includes('anthony')
          })
        ]
      })
    )
  }

  async deadAnimation() {
    this.stop = true
    this.isDying = true
    this.currentVariantIndex = 0

    const intervalCallback = () => {
      if (this.currentVariantIndex < 6) {
        this.currentVariantIndex++
      }
    }

    // 1 to 7
    let intervalDuration = 100
    let interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 7 + 1000)
    clearInterval(interval)
  }

  disableAttack() {
    clearInterval(this.interval)
  }

  handleAttack() {
    this.interval = setInterval(() => {
      if (Math.random() < 0.5 && this.canHit) {
        this.hit()
      }
    }, 500)
  }

  lead() {
    if (!this.stop) {
      const x = this.game.mainCharacter?.x - this.x
      const y = this.game.mainCharacter?.y - this.y

      let movement = {}

      if (Math.abs(x) > 20) {
        movement.x = x
      }

      if (Math.abs(y) > 20) {
        movement.y = y
      }

      this.game.move(this, movement)
    }
  }
}

export default Monster
