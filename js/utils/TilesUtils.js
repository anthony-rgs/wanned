class TilesUtils {
  static calculateTileSize(rawTiles, builtTileSize, mapWidth, mapHeight, realMapWidth, realMapHeight, mapZoom) {
    const numberOfTilesByColumn = Math.ceil(mapWidth / builtTileSize)
    const numberOfTilesByRow = Math.ceil(mapHeight / builtTileSize)

    const realTileWidth = (realMapWidth / numberOfTilesByColumn) * mapZoom
    const realTileHeight = (realMapHeight / numberOfTilesByRow) * mapZoom

    return {
      realTileWidth,
      realTileHeight,
      numberOfTilesByColumn,
      numberOfTilesByRow
    }
  }

  static mapTilesToPositions(tiles, numberOfTilesByColumn, numberOfTilesByRow, realTileWidth, realTileHeight, elementTypeId, allowElementDuplicate = false) {
    const positions = []

    let yErrorCorrections = {}
    const tilesBrowsed = []

    tiles.forEach((tile, i) => {
      const x = i % numberOfTilesByColumn
      let y = Math.floor(i / numberOfTilesByRow) + (yErrorCorrections[x] || 0)

      if (y % 2 === 1) {
        yErrorCorrections[x] = (yErrorCorrections[x] ?? 0) + 1
        y++
      }

      if (x >= numberOfTilesByRow ? 1 : 0) {
        y -= 2;
      }

      if ((elementTypeId && tile.toString()[0] === elementTypeId.toString() && !tilesBrowsed.includes(tile)) ||
        (!elementTypeId && tile !== 0)) {
        if (elementTypeId && !allowElementDuplicate) {
          tilesBrowsed.push(tile)
        }

        const startX = x * realTileWidth
        const startY = y * (realTileHeight / 2)

        positions.push({
          startX,
          startY,
          endX: startX + realTileWidth,
          endY: startY + realTileHeight,
          width: realTileWidth,
          height: realTileHeight,
          tileId: tile.toString().substring(1)
        })
      }
    })

    return positions
  }
}

export default TilesUtils
