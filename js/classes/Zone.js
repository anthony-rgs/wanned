import TilesUtils from "../utils/TilesUtils.js";

class Zone {
  constructor(x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }

  static makeZones(rawZones, builtZoneSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawZones, builtZoneSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)

    return TilesUtils.mapTilesToPositions(rawZones, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, 3, true)
      .map((position) => new Zone(
        position.startX,
        position.startY,
        position.width,
        position.height,
        position.tileId
      ))
  }
}

export default Zone
