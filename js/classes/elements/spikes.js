import TilesUtils from "../../utils/TilesUtils.js";
import Element from "./../Element.js";
import Zone from "../Zone.js";
import Action from "../Action.js";

class Spikes extends Element {
  constructor(game, startX, startY, width, height, initialState, id = 'spike', intervalDuration = 2000) {
    super(
      id,
      game,
      [
        {
          image: '../../assets/elements/spikes/spikes-closed.png',
          collisions: []
        },
        {
          image: '../../assets/elements/spikes/spikes-opened.png',
          collisions: []
        }
      ],
      width,
      height,
      {x: startX, y: startY}
    )

    this.state = initialState
    this.intervalDuration = intervalDuration
    this.lastIntervalTriggered = 0

    this.actionActivated = true
    this.action = new Action(async () => {
      if (this.actionActivated) {
        game.mainCharacter.lives -= 1

        const mainCharacterSpeed = game.mainCharacter.speed
        game.mainCharacter.speed = 0

        setInterval(() => {
          game.mainCharacter.speed = mainCharacterSpeed
        }, this.remainingTime)

        this.actionActivated = false
      }

      setInterval(() => {
        this.actionActivated = true
      }, this.remainingTime)
    }, true)

    if (this.state === 'open') {
      this.open()
    } else {
      this.close()
    }

    setInterval(() => {
      this.toggle()
      this.lastIntervalTriggered = 0
    }, this.intervalDuration)

    setInterval(() => {
      this.lastIntervalTriggered += 50
    }, 50)
  }

  get remainingTime() {
    return this.intervalDuration - this.lastIntervalTriggered
  }

  open() {
    this.currentVariantIndex = 1
    this.state = 'open'
  }

  close() {
    this.currentVariantIndex = 0
    this.state = 'closed'
  }

  toggle() {
    if (this.currentVariantIndex === 0) {
      this.open()
    } else {
      this.close()
    }
  }

  get spikesZones() {
    return [
      new Zone(this.x, this.y, this.width, this.height)
    ]
  }

  static makeSpikes(game, rawSpikes, builtSpikesSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom, idMaker) {
    const {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    } = TilesUtils.calculateTileSize(rawSpikes, builtSpikesSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom)
    return TilesUtils.mapTilesToPositions(rawSpikes, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, 5, false)
      .map((position, i) => new Spikes(
        game,
        position.startX,
        position.startY,
        position.width * 2,
        position.height * 4,
        i % 2 === 0 ? 'closed' : 'open',
        idMaker(position.tileId)
      ))
  }
}

export default Spikes
