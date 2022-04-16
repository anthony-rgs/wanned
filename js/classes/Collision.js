import TilesUtils from "../utils/TilesUtils.js";

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
        elementY <= this.endY - elementHeight)
  }

  static makeCollisions(rawCollisions, builtCollisionSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawCollisions, builtCollisionSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)

    return TilesUtils.mapTilesToPositions(rawCollisions, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight)
      .map(position => new Collision(
        position.startX,
        position.startY,
        position.endX,
        position.endY
      ))
  }
}

export default Collision
