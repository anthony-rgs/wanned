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
                    image: `../../assets/elements/sprites/monster/transformation/${index + 1}.png`
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
    this.transformed = false
    this.isTransforming = false

    setInterval(() => {
      this.lead()
    }, 1000 / this.game.fps)
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
      transformationVariants.push(variants.filter((variant) => {
        return variant.type === 'transformation'
      }))
    })

    return transformationVariants
  }

  get currentVariantLength() {
    if (this.isTransforming) {
      return 16
    }

    return this.moveVariantsLength - 1
  }

  get currentVariant() {
    if (this.hitting) {
      return this.fightVariants[this.currentDirection][this.currentVariantIndex]
    } else if (this.isTransforming) {
      return this.transformationVariants[0][this.currentVariantIndex]
    } else {
      return this.moveVariants[this.currentDirection][this.currentVariantIndex]
    }
  }

  draw(ctx, x, y) {
    const isAnthony = this.name === 'monster' && this.currentDirection === 'up' && this.currentVariant.image.src.includes('anthony')

    if (this.currentVariant) {
      ctx.drawImage(
        this.currentVariant.image,
        x ?? this.x,
        this.isTransforming && this.currentVariantIndex === 6 ? (y ?? this.y) + (this.height / 5) * 4 : (y ?? this.y) - (isAnthony ? this.height / 2 : 0),
        (this.hitting ? this.width * 1.5 : this.isTransforming ? this.width * 1.8 : isAnthony ? this.width * 2 : this.width),
        this.isTransforming && this.currentVariantIndex === 6 ? this.height / 5 : (isAnthony ? this.height * 2 : this.height)
      )
    }
  }

  async transform() {
    this.stop = true
    this.isTransforming = true
    this.currentVariantIndex = 0

    const intervalCallback = () => {
      this.currentVariantIndex++
    }

    // 1 à 2
    let intervalDuration = 1500
    let interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 2)
    clearInterval(interval)
    // 3 à 6
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 3)
    clearInterval(interval)
    // 7
    intervalCallback()
    await wait(1250)
    // 8 à 9
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 2)
    clearInterval(interval)
    // 10 à 12
    intervalDuration = 500
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 3)
    clearInterval(interval)
    // 13 à 16
    intervalDuration = 100
    interval = setInterval(intervalCallback, intervalDuration)
    await wait(intervalDuration * 4)
    clearInterval(interval)
    await wait(1000)

    this.stop = false
    this.handleAttack()
    this.isTransforming = false
    this.currentVariantIndex = 0

    this.variants = Object.fromEntries(Object.entries(this.variants).map(([direction, variants]) => {
      return [
        direction,
        variants.filter((variant) => {
          return !variant.image.src.includes('anthony')
        })
      ]
    }))
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
      this.game.move(this, {
        x: this.game.mainCharacter.x - this.x,
        y: this.game.mainCharacter.y - this.y
      })
    }
  }
}

export default Monster
