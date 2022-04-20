import Collision from './Collision.js'
import generateElementId from '../utils/generateElementId.js'

class Element {
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
  ) {
    this.name = name
    this.id = generateElementId()
    this.game = game
    this.variants = variants
    this.width = w
    this.height = h
    this.position = initialPosition
    this.currentVariantIndex = 0
    this.hitting = false

    this.preload()
  }

  get currentVariant() {
    return this.variants[this.currentVariantIndex]
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

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  set x(x) {
    this.position.x = x
  }

  set y(y) {
    this.position.y = y
  }

  get currentZone() {
    return this.game.zoneTriggerings.find((zoneTriggering) => {
      return this.game.checkInZone(
        this.position.x,
        this.position.y,
        this.width,
        this.height,
        zoneTriggering.zones
      )
    })
  }

  get collisions() {
    return (this.currentVariant?.collisions ?? []).map(
      collision =>
        new Collision(
          this.x + collision.startX,
          this.y + collision.startY,
          this.x + collision.endX,
          this.y + collision.endY,
          this,
          collision.box,
        ),
    )
  }

  draw(ctx, x, y) {
    if (this.currentVariant) {
      ctx.drawImage(
        this.currentVariant.image,
        x ?? this.x,
        y ?? this.y,
        this.hitting ? this.width * 1.5 : this.width,
        this.height,
      )
    }
  }

  preload() {
    Object.entries(this.variants).forEach(([direction, variant]) => {
      const image = new Image()
      image.src = variant.image

      this.variants[direction] = { image, collisions: variant.collisions }
    })
  }
}

export default Element
