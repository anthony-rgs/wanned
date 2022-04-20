import * as map1Tiles from "./map-1/tiles.js";
import * as map2Tiles from "./map-2/tiles.js";

export default [
  {
    id: 'map-1',
    name: 'Map 1',
    src: '../../assets/images/map-1.png',
    tiles: map1Tiles,
    elements: ['baptiste', 'fabien', 'victor', 'arthur', 'anthony', 'thierry', 'monster'],
    size: { width: 700, height: 400 }
  },
  {
    id: 'map-2',
    name: 'Map 2',
    src: '../../assets/images/map-2.png',
    tiles: map2Tiles,
    elements: ['baptiste', 'brontis'],
    size: { width: 184, height: 142 }
  }
]
