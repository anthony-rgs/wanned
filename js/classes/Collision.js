import TilesUtils from "../utils/TilesUtils.js";

class Collision {
  constructor(startX, startY, endX, endY, parent = null, box = false) {
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
    this.parent = parent
    this.box = box
  }

  collide(elementX, elementY, elementWidth, elementHeight, character = true) {
    return (this.startX < elementX + elementWidth &&
        elementX < this.endX) &&
      (this.startY < elementY + elementHeight &&
        elementY < this.endY - (this.box || !character ? 0 : elementHeight))
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
