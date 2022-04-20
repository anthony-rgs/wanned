import TilesUtils from "../../utils/TilesUtils.js";
import Element from "./../Element.js";
import Zone from "../Zone.js";

class Key extends Element {
  constructor(game, startX, startY, width, height, id = 'key') {
    super(
      id,
      game,
      [
        {
          image: '../../assets/elements/key.png',
          collisions: []
        },
      ],
      width,
      height,
      {x: startX, y: startY}
    )
  }

  get zone() {
    return [
      new Zone(this.x - this.width, this.y - this.height, this.width * 3, this.height * 3)
    ]
  }

  static makeKeys(game, rawKeys, builtKeysSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom, idMaker) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawKeys, builtKeysSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)
    return TilesUtils.mapTilesToPositions(rawKeys, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, 6, false)
      .map((position, i) => new Key(
        game,
        position.startX,
        position.startY,
        position.width,
        position.height,
        i % 2 === 0 ? 'closed' : 'open',
        idMaker(position.tileId)
      ))
  }
}

export default Key
