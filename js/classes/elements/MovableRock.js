import TilesUtils from "../../utils/TilesUtils.js";
import Collision from "./../Collision.js";
import Element from "./../Element.js";
import Zone from "../Zone.js";

class MovableRock extends Element {
  constructor(game, startX, startY, width, height, id = 'movable-rock') {
    super(
      id,
      game,
      [
        {
          image: '../../assets/elements/movable-rock.png',
          collisions: [
            new Collision(width * 0.25, height * 0.25, width * 0.75, height * 0.75, null, true),
          ]
        }
      ],
      width,
      height,
      {x: startX, y: startY}
    )
  }

  get movableZones() {
    return [
      new Zone(this.x + this.width * 0.2, this.y - this.height * 0.1, this.width * 0.6, this.height * 0.2, this.name + '-top'),
      new Zone(this.x + this.width * 0.2, this.y + this.height * 0.9, this.width * 0.6, this.height * 0.2, this.name + '-bottom'),
      new Zone(this.x - this.width * 0.1, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.6, this.name + '-left'),
      new Zone(this.x + this.width * 0.9, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.6, this.name + '-right'),
    ]
  }

  static makeMovableRocks(game, rawMovableRocks, builtMovableRockSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom, idMaker) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawMovableRocks, builtMovableRockSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)
    return TilesUtils.mapTilesToPositions(rawMovableRocks, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, 4, true)
      .map((position) => new MovableRock(
        game,
        position.startX,
        position.startY,
        position.width,
        position.height,
        idMaker(position.tileId)
      ))
  }
}

export default MovableRock
