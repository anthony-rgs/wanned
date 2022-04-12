class Collision {
  constructor(startX, startY, endX, endY) {
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
  }

  collide(elementX, elementY, elementWidth, elementHeight) {
    return (this.startX <= elementX + elementWidth &&
        elementX <= this.endX) &&
      (this.startY <= elementY + elementHeight &&
        elementY <= this.endY)
  }

  static makeCollisions(rawCollisions, builtCollisionSize, mapWidth, mapHeight, calculateRealCollisionSize) {
    const collisions = []

    const numberOfCollisionsByColumn = Math.ceil(mapWidth / builtCollisionSize)
    const numberOfCollisionsByRow = Math.ceil(mapHeight / builtCollisionSize)

    const {
      realCollisionXSize,
      realCollisionYSize
    } = calculateRealCollisionSize(numberOfCollisionsByColumn, numberOfCollisionsByRow)

    let yErrorCorrections = {}

    rawCollisions.forEach((rawCollision, i) => {
      const x = i % numberOfCollisionsByColumn
      let y = Math.floor(i / numberOfCollisionsByRow) + (yErrorCorrections[x] || 0)

      if (y % 2 === 1) {
        yErrorCorrections[x] = (yErrorCorrections[x] ?? 0) + 1
        y++
      }

      const startX = x * realCollisionXSize
      const startY = y * (realCollisionYSize / 2)

      if (rawCollision !== 0) {
        collisions.push(new Collision(startX, startY, startX + realCollisionXSize, startY + realCollisionYSize))
      }
    })

    return collisions
  }
}

export default Collision
