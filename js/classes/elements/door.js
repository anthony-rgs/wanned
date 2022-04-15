import TilesUtils from "../../utils/TilesUtils.js";
import Collision from "./../Collision.js";
import Element from "./../Element.js";

class Door extends Element {
  constructor(game, startX, startY, width, height, id = 'door') {
    super(
      id,
      game,
      [
        {
          image: '../../assets/elements/door/door-closed.png',
          collisions: [
            new Collision(0, 0, width, height),
          ]
        },
        {
          image: '../../assets/elements/door/door-opened.png',
          collisions: []
        }
      ],
      width,
      height,
      {x: startX, y: startY}
    )
  }

  open() {
    this.currentVariantIndex = 1;
  }

  close() {
    this.currentVariantIndex = 0;
  }

  static makeDoors(game, rawDoors, builtDoorSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom, idMaker) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawDoors, builtDoorSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)

    return TilesUtils.mapTilesToPositions(rawDoors, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, 2)
      .map((position) => new Door(
        game,
        -position.startX,
        -position.startY,
        position.width * 2,
        position.height,
        idMaker(position.tileId)
      ))
  }
}

export default Door
