import Text from "./Text.js";
import Collision from "./Collision.js";
import mapCollisions from "../../assets/resources/mapCollisions.js";
import Baptiste from "./elements/sprites/baptiste.js";
import Fabien from "./elements/sprites/fabien.js";
import HUD from "./HUD.js";
import TextDialog from "./TextDialog.js";
import action1 from "../actions/zone-1/action-1.js";
import Door from "./elements/door.js";
import mapDoors from "../../assets/resources/mapDoors.js";
import Zone from "./Zone.js";
import mapZones from "../../assets/resources/mapZones.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.mapZoom = 3;
    this.mapWidth = 700;
    this.mapHeight = 400;
    this.mapSpeed = 5;
    this.fps = 0;
    this.startTime = Date.now();
    this.mapCollisions = [];
    this.mapDoors = [];
    this.frame = 0;
    this.baptisteHud = new HUD(
      "../../assets/images/hud/baptiste-head.png",
      3,
      document.querySelector("canvas")
    );
    this.keys = [
      {
        key: "ArrowUp",
        pressed: false,
        action: "front",
      },
      {
        key: "ArrowLeft",
        pressed: false,
        action: "left",
      },
      {
        key: "ArrowDown",
        pressed: false,
        action: "back",
      },
      {
        key: "ArrowRight",
        pressed: false,
        action: "right",
      },
    ];
    this._elements = [
      new Fabien(this),
      new Baptiste(this),
    ];
    this.dialogBox = new TextDialog();
    this._lastZone = null;
    this.zoneTriggerings = [];
    this.init();
  }

  get elements() {
    return [...this.mapDoors, ...this._elements];
  }

  init() {
    this.map = new Image();
    this.map.src = "../../assets/images/map.png";

    this.map.addEventListener("load", () => {
      this.ctx.drawImage(this.map, 0, 0);
      this.makeDoors();
      this.makeCollisions();
      this.makeZoneTriggerings();
      this.render();
    });

    this.fpsCounter = new Text(this.fps, "Museo", 16, "white", 30, 30);

    window.addEventListener("keydown", (e) => {
      this.keys.map((k) => {
        if (k.key === e.key) {
          this.findKey(e.key, "key").pressed = true;
        }
      });
    });

    window.addEventListener("keyup", (e) => {
      this.keys.map((k) => {
        if (k.key === e.key) {
          this.findKey(e.key, "key").pressed = false;
        }
      });
    });

    setInterval(() => {
      const lastZone = this._lastZone;
      const currentZone = this.currentZone(this.mainCharacter);
      this._lastZone = currentZone;

      if (currentZone && currentZone !== lastZone) {
        currentZone.action.trigger();
      }
    }, 100)
  }

  currentZone(element) {
    return this.zoneTriggerings.find((zoneTriggering) => {
      return this.checkInZone(
        -element.position.x,
        -element.position.y,
        element.width,
        element.height,
        zoneTriggering.zones
      );
    });
  }

  get collisions() {
    if (this.mapCollisions) {
      return [
        ...this.mapCollisions,
        ...this.elements.map((element) => element.collisions).flat(),
      ].filter((collision) => collision);
    } else {
      return [];
    }
  }

  makeCollisions() {
    this.mapCollisions = Collision.makeCollisions(
      mapCollisions,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom
    );
  }

  makeDoors() {
    this.mapDoors = Door.makeDoors(
      this,
      mapDoors,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `door${i}`
    )
  }

  makeZoneTriggerings() {
    const zones = Zone.makeZones(
      mapZones,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom
    )

    this.zoneTriggerings = [
      {
        zones: zones.filter(zone => zone.id === '01'),
        action: action1(this),
      },
    ];
  }

  updateCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.makeCollisions();
  }

  findSprite(name) {
    return this.elements.find((element) => element.name === name);
  }

  get baptiste() {
    return this.findSprite("baptiste");
  }

  get fabien() {
    return this.findSprite("fabien");
  }

  get door1() {
    return this.findSprite("door01");
  }

  get mainCharacter() {
    return this.baptiste;
  }

  findKey(key, type) {
    return this.keys.find((k) => k[type] === key);
  }

  checkCollisions(elementX, elementY, elementWidth, elementHeight) {
    return this.collisions.some((collision) =>
      collision.collide(elementX, elementY, elementWidth, elementHeight)
    );
  }

  checkInZone(
    elementX,
    elementY,
    elementWidth,
    elementHeight,
    zones
  ) {
    for (let i = 0; i < zones.length; i++) {
      const zone = zones[i];
      if (
        elementX + elementWidth > zone.x &&
        elementX < zone.x + zone.width &&
        elementY + elementHeight > zone.y &&
        elementY < zone.y + zone.height
      ) {
        return true;
      }
    }
    return false;
    // return (
    //   elementX >= zoneCoordinates.x &&
    //   elementX + elementWidth <= zoneCoordinates.x + zoneCoordinates.width &&
    //   elementY >= zoneCoordinates.y &&
    //   elementY + elementHeight <= zoneCoordinates.y + zoneCoordinates.height
    // );
  }

  move(element, movement) {
    const {x, y} = element.position;
    const {speed} = element;

    if (movement.x) {
      if (movement.x < 0) {
        element.position.x -= speed;
      } else {
        element.position.x += speed;
      }
    }

    if (movement.y) {
      if (movement.y < 0) {
        element.position.y -= speed;
      } else {
        element.position.y += speed;
      }
    }

    element.animate(movement);

    if (
      this.checkCollisions(
        -element.position.x,
        -element.position.y,
        element.width,
        element.height
      )
    ) {
      element.position.x = x;
      element.position.y = y;
    }
  }

  draw() {
    const frontKey = this.findKey("front", "action");
    const backKey = this.findKey("back", "action");
    const leftKey = this.findKey("left", "action");
    const rightKey = this.findKey("right", "action");

    if (frontKey.pressed) {
      this.move(this.mainCharacter, {y: this.mapSpeed});
    } else if (leftKey.pressed) {
      this.move(this.mainCharacter, {x: this.mapSpeed});
    } else if (backKey.pressed) {
      this.move(this.mainCharacter, {y: -this.mapSpeed});
    } else if (rightKey.pressed) {
      this.move(this.mainCharacter, {x: -this.mapSpeed});
    } else if (
      !frontKey.pressed &&
      !backKey.pressed &&
      !leftKey.pressed &&
      !rightKey.pressed
    ) {
      this.mainCharacter.currentVariantIndex = 0;
    }

    this.ctx.drawImage(
      this.map,
      this.mainCharacter.x + this.canvas.width / 2,
      this.mainCharacter.y + this.canvas.height / 2,
      this.mapWidth * this.mapZoom,
      this.mapHeight * this.mapZoom
    );

    this.elements.forEach((element) => {
      element.draw(
        this.ctx,
        element === this.mainCharacter
          ? this.canvas.width / 2
          : this.mainCharacter.x - element.x + this.canvas.width / 2,
        element === this.mainCharacter
          ? this.canvas.height / 2
          : this.mainCharacter.y - element.y + this.canvas.height / 2
      );
    });
    this.fpsCounter.draw(this.ctx, this.canvas.width - 40, 30);

    if (window.debug) {
      this.ctx.fillStyle = "#33d1d4aa";
      this.collisions?.forEach((collision) => {
        this.ctx.fillRect(
          collision.startX + this.mainCharacter.x + this.canvas.width / 2,
          collision.startY + this.mainCharacter.y + this.canvas.height / 2,
          collision.endX - collision.startX,
          collision.endY - collision.startY
        );
      });
      this.ctx.fillStyle = "rgba(212,51,51,0.67)";
      this.zoneTriggerings?.map(zoneTriggering => zoneTriggering.zones).flat().forEach((zone) => {
        this.ctx.fillRect(
          zone.x + this.mainCharacter.x + this.canvas.width / 2,
          zone.y + this.mainCharacter.y + this.canvas.height / 2,
          zone.width,
          zone.height
        );
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();

    this.baptisteHud.baseLives = this.baptiste.baseLives;
    this.baptisteHud.lives = this.baptiste.lives;

    this.frame++;
    const time = Date.now();

    if (time - this.startTime > 1000) {
      this.fps = Math.round(this.frame / ((time - this.startTime) / 1000));
      this.startTime = time;
      this.frame = 0;
      this.fpsCounter.text = this.fps;
    }

    window.requestAnimationFrame(() => this.render());
  }
}

export default Game;
