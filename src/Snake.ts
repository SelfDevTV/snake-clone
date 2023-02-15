import { Application, Sprite } from "pixi.js";
import { Direction } from "./Direction";
import { Tile } from "./Tile";

export class Snake {
  tiles: Tile[] = [];

  app: Application;
  moveSpeed: number = 50;

  direction: Direction = Direction.right;

  constructor(head: Tile, app: Application) {
    this.tiles.push(head);

    this.tiles.forEach((tile) => app.stage.addChild(tile));
    this.app = app;
  }

  setDirection = () => {
    const head = this.tiles.at(0);
    let prevDirection = head!.direction;

    // horizontal movement
    if (
      !(
        (this.direction === Direction.right &&
          head?.direction === Direction.left) ||
        (this.direction === Direction.left &&
          head?.direction === Direction.right) ||
        (this.direction === Direction.up &&
          head?.direction === Direction.down) ||
        (this.direction === Direction.down && head?.direction === Direction.up)
      )
    ) {
      head!.direction = this.direction;
    }

    this.tiles.forEach((tile, i) => {
      if (i !== 0) {
        const temp = tile.direction;
        tile.direction = prevDirection;
        prevDirection = temp;
      }
    });
  };

  checkCollision = (other: Sprite) => {
    let collided = false;
    for (let i = 0; i < this.tiles.length; i++) {
      const head = this.tiles[i];
      const rightmostLeft = head.x < other.x ? other.x : head.x;
      const leftmostRight =
        head.x + head.width > other.x + other.width
          ? other.x + other.width
          : head.x + head.width;

      if (leftmostRight <= rightmostLeft) {
        return false;
      }

      const bottommostTop = head.y < other.y ? other.y : head.y;
      const topmostBottom =
        head.y + head.height > other.y + other.height
          ? other.y + other.height
          : head.y + head.height;

      if (topmostBottom > bottommostTop) {
        collided = true;
        break;
      }
    }

    return collided;
  };

  collidedWithSelf = () => {
    const unique = this.tiles.filter((tile, i) => {
      return (
        this.tiles.findIndex(
          (item) => item.x === tile.x && item.y === tile.y
        ) === i
      );
    });
    return unique.length !== this.tiles.length;
  };

  eatFruit = () => {
    const newTile = Tile.from("italy.png") as Tile;
    newTile.width = 50;
    newTile.height = 50;
    const lastTile = this.tiles.at(-1);
    if (lastTile?.direction === Direction.right) {
      newTile.x = lastTile!.x - 50;
      newTile.y = lastTile!.y;
    } else if (lastTile?.direction === Direction.left) {
      newTile.x = lastTile!.x + 50;
      newTile.y = lastTile!.y;
    } else if (lastTile?.direction === Direction.up) {
      newTile.x = lastTile!.x;
      newTile.y = lastTile!.y + 50;
    } else {
      newTile.x = lastTile!.x;
      newTile.y = lastTile!.y - 50;
    }

    newTile.direction = lastTile!.direction;
    this.tiles.push(newTile);
    this.app.stage.addChild(newTile);
  };

  draw = () => {
    this.setDirection();

    this.tiles.forEach((tile) => {
      if (tile.x + tile.direction.x * this.moveSpeed > this.app.screen.width) {
        tile.x = 0;
      } else if (
        tile.y + tile.direction.y * this.moveSpeed >
        this.app.screen.height
      ) {
        tile.y = 0;
      } else if (tile.x + tile.direction.x * this.moveSpeed < 0) {
        tile.x = this.app.screen.width - 50;
      } else if (tile.y + tile.direction.y * this.moveSpeed < 0) {
        tile.y = this.app.screen.height - 50;
      } else {
        tile.x += tile.direction.x * this.moveSpeed;
        tile.y += tile.direction.y * this.moveSpeed;
      }
    });
  };
}
