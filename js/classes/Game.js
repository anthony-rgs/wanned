import Text from "./Text.js";
import Collision from "./Collision.js";
import mapCollisions from "../../assets/resources/mapCollisions.js";
import Baptiste from "./elements/sprites/baptiste.js";
import Fabien from "./elements/sprites/fabien.js";
import HUD from "./HUD.js";
import TextDialog from "./TextDialog.js";
import triggerTalk from "../actions/zones/1/triggerTalk.js";
import triggerFight from "../actions/zones/2/triggerFight.js";
import Door from "./elements/door.js";
import mapDoors from "../../assets/resources/mapDoors.js";
import Zone from "./Zone.js";
import mapZones from "../../assets/resources/mapZones.js";
import MovableRock from "./elements/movableRock.js";
import mapMovableRocks from "../../assets/resources/mapMovableRocks.js";
import Action from "./Action.js";
import Sprite from "./Sprite.js";
import Key from "./Key.js";
import Monster from "./elements/sprites/monster.js";
import handleContact from "../actions/zones/2/handleContact.js";
import mapSpikes from "../../assets/resources/mapSpikes.js";
import Spikes from "./elements/spikes.js";
import BubbleMaker from "./BubbleMaker.js";

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
    this.hasCollisions = true;
    this.startTime = Date.now();
    this.mapCollisions = [];
    this.mapDoors = [];
    this.movableRocks = [];
    this.spikes = [];
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
        action: "Avancer",
      },
      {
        key: "ArrowLeft",
        pressed: false,
        action: "Aller à gauche",
      },
      {
        key: "ArrowDown",
        pressed: false,
        action: "Reculer",
      },
      {
        key: "ArrowRight",
        pressed: false,
        action: "Aller à droite",
      },
      {
        key: "f",
        pressed: false,
        action: "Hit",
      },
    ];
    this._elements = [new Fabien(this), new Baptiste(this), new Monster(this)];
    this.dialogBox = new TextDialog();
    this._lastZone = null;
    this._zoneTriggerings = [];
    this.bubble = null;
    this.init();
    this.displayKeys();
  }

  gameBubble() {
    this.bubble = new BubbleMaker();
  }

  get elements() {
    return [
      ...this.mapDoors,
      ...this.movableRocks,
      ...this.spikes,
      ...this._elements.sort((a, b) => a.y - b.y),
    ];
  }

  init() {
    this.map = new Image();
    this.map.src = "../../assets/images/map.png";

    this.fpsCounter = new Text(this.fps, "Museo", 16, "white", 30, 30);

    this.map.addEventListener("load", () => {
      this.ctx.drawImage(this.map, 0, 0);
      this.makeDoors();
      this.makeCollisions();
      this.makeZoneTriggerings();
      this.makeMovableRocks();
      this.makeSpikes();
      this.render();
    });

    window.addEventListener("keydown", (e) => {
      const key = document.querySelector(`#${e.key}`);

      key?.classList.add("active");

      this.keys.map((k) => {
        if (k.key === e.key) {
          this.findKey(e.key, "key").pressed = true;
        }
      });

      if (e.key === "f" && !this.mainCharacter.hitting) {
        this.mainCharacter.hit();
      }
    });

    window.addEventListener("keyup", (e) => {
      const key = document.querySelector(`#${e.key}`);

      key?.classList.remove("active");

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
    }, 100);
  }

  currentZone(element) {
    return this.zoneTriggerings.find((zoneTriggering) => {
      return this.checkInZone(
        element.position.x,
        element.position.y,
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
    );
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
    );

    this._zoneTriggerings = [
      {
        zones: zones.filter((zone) => zone.id === "01"),
        action: triggerTalk(this),
      },
      {
        zones: zones.filter((zone) => zone.id === "02"),
        action: triggerFight(this),
      },
    ];
  }

  makeMovableRocks() {
    this.movableRocks = MovableRock.makeMovableRocks(
      this,
      mapMovableRocks,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `movableRock${i}`
    );
  }

  makeSpikes() {
    this.spikes = Spikes.makeSpikes(
      this,
      mapSpikes,
      16,
      this.map.width,
      this.map.height,
      this.mapWidth,
      this.mapHeight,
      this.mapZoom,
      (i) => `spike${i}`
    );
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

  get monster() {
    return this.findSprite("monster");
  }

  get zoneTriggerings() {
    const activeMovableRocksZones = this.movableRocks
      .map((rock) =>
        rock.movableZones
          .filter((zone) => {
            const zonePosition = zone.id.split("-")[1];

            return (
              (this.findKey("Avancer", "action").pressed &&
                zonePosition === "bottom") ||
              (this.findKey("Reculer", "action").pressed &&
                zonePosition === "top") ||
              (this.findKey("Aller à droite", "action").pressed &&
                zonePosition === "left") ||
              (this.findKey("Aller à gauche", "action").pressed &&
                zonePosition === "right")
            );
          })
          .map((zone) => ({ zone, rock }))
      )
      .flat();

    const activeSpikesZones = this.spikes
      .filter((spike) => spike.state === "open")
      .map((spikes) => ({ zone: spikes.spikesZones, spikes }));

    return [
      ...this._zoneTriggerings,
      ...activeMovableRocksZones
        .map(({ zone, rock }) => ({
          zones: [zone],
          action: new Action(() => {
            const zonePosition = zone.id.split("-")[1];
            const speed = this.mainCharacter.speed / 2;

            if (
              zonePosition === "bottom" &&
              this.findKey("Avancer", "action").pressed
            ) {
              this.move(rock, { y: -speed }, speed);
            } else if (
              zonePosition === "top" &&
              this.findKey("Reculer", "action").pressed
            ) {
              this.move(rock, { y: speed }, speed);
            } else if (
              zonePosition === "left" &&
              this.findKey("Aller à droite", "action").pressed
            ) {
              this.move(rock, { x: speed }, speed);
            } else if (
              zonePosition === "right" &&
              this.findKey("Aller à gauche", "action").pressed
            ) {
              this.move(rock, { x: -speed }, speed);
            }
          }),
        }))
        .flat(),
      ...activeSpikesZones.map(({ spikes, zone }) => ({
        zones: zone,
        action: spikes.action,
      })),
      {
        zones: [this.monster.zone],
        action: handleContact(this),
      },
    ];
  }

  findKey(key, type) {
    return this.keys.find((k) => k[type] === key);
  }

  checkCollisions(element) {
    if (!this.hasCollisions) return false;

    return this.collisions
      .filter(
        (collision) =>
          collision.parent === null || element.id !== collision.parent?.id
      )
      .some((collision) =>
        collision.collide(
          element.position.x,
          element.position.y,
          element.width,
          element.height,
          element instanceof Sprite
        )
      );
  }

  checkInZone(elementX, elementY, elementWidth, elementHeight, zones) {
    for (let i = 0; i < zones.length; i++) {
      const zone = zones[i];

      if (
        elementX + elementWidth >= zone.x &&
        elementX <= zone.x + zone.width &&
        elementY + elementHeight >= zone.y &&
        elementY <= zone.y + zone.height
      ) {
        return true;
      }
    }
    return false;
  }

  move(element, movement, speed = element.speed) {
    const { x, y } = element.position;

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

    if (element.animate) {
      element.animate(movement);
    }

    if (this.checkCollisions(element)) {
      element.position.x = x;
      element.position.y = y;
    }
  }

  displayKeys() {
    const arrowKeysBottomWrapper = document.createElement("div");
    const controlsContainer = document.querySelector("#controls-container");
    controlsContainer.appendChild(arrowKeysBottomWrapper);

    this.keys.forEach((key) => {
      if (key.key.includes("Arrow")) {
        if (key.key !== "ArrowUp") {
          new Key(key, arrowKeysBottomWrapper);
        } else {
          new Key(key);
        }
      } else {
        new Key(key);
      }
    });
  }

  draw() {
    const frontKey = this.findKey("Avancer", "action");
    const backKey = this.findKey("Reculer", "action");
    const leftKey = this.findKey("Aller à gauche", "action");
    const rightKey = this.findKey("Aller à droite", "action");
    const hitKey = this.findKey("Hit", "action");

    if (
      !this.mainCharacter.hitting &&
      !hitKey.pressed &&
      !this.mainCharacter.stop
    ) {
      if (frontKey.pressed) {
        this.move(this.mainCharacter, { y: -this.mapSpeed });
      } else if (leftKey.pressed) {
        this.move(this.mainCharacter, { x: -this.mapSpeed });
      } else if (backKey.pressed) {
        this.move(this.mainCharacter, { y: this.mapSpeed });
      } else if (rightKey.pressed) {
        this.move(this.mainCharacter, { x: this.mapSpeed });
      } else if (
        !frontKey.pressed &&
        !backKey.pressed &&
        !leftKey.pressed &&
        !rightKey.pressed
      ) {
        this.mainCharacter.currentVariantIndex = 0;
      }
    }

    this.monster.lead();

    this.ctx.drawImage(
      this.map,
      -this.mainCharacter.x + this.canvas.width / 2,
      -this.mainCharacter.y + this.canvas.height / 2,
      this.mapWidth * this.mapZoom,
      this.mapHeight * this.mapZoom
    );

    this.elements.forEach((element) => {
      element.draw(
        this.ctx,
        element === this.mainCharacter
          ? this.canvas.width / 2
          : element.x - this.mainCharacter.x + this.canvas.width / 2,
        element === this.mainCharacter
          ? this.canvas.height / 2
          : element.y - this.mainCharacter.y + this.canvas.height / 2
      );
    });
    this.fpsCounter.draw(this.ctx, this.canvas.width - 40, 30);

    if (window.debug) {
      this.ctx.fillStyle = "#33d1d4aa";
      this.collisions?.forEach((collision) => {
        this.ctx.fillRect(
          collision.startX - this.mainCharacter.x + this.canvas.width / 2,
          collision.startY - this.mainCharacter.y + this.canvas.height / 2,
          collision.endX - collision.startX,
          collision.endY - collision.startY
        );
      });
      this.ctx.fillStyle = "rgba(212,51,51,0.67)";
      this.zoneTriggerings
        ?.map((zoneTriggering) => zoneTriggering.zones)
        .flat()
        .forEach((zone) => {
          this.ctx.fillRect(
            zone.x - this.mainCharacter.x + this.canvas.width / 2,
            zone.y - this.mainCharacter.y + this.canvas.height / 2,
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
