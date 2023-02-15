import { Application } from "pixi.js";
import { Direction } from "./Direction";
import { Tile } from "./Tile";

export class Snake {
  tiles: Tile[] = [];

  app: Application;
  moveSpeed: number = 50;

  direction: Direction = Direction.right();

  constructor(head: Tile, app: Application) {
    this.tiles.push(head);

    this.tiles.forEach((tile) => app.stage.addChild(tile));
    this.app = app;
  }

  setDirection = () => {
    const head = this.tiles.at(-1);
    let prevDirection = head!.direction;
    head!.direction = this.direction;

    this.tiles.forEach((tile, i) => {
      if (i !== this.tiles.length - 1) {
        tile.direction = prevDirection;
        prevDirection = tile.direction;
      }
    });
  };

  eatFruit = () => {
    const newTile = Tile.from("worm.png") as Tile;
    newTile.width = 50;
    newTile.height = 50;
    const lastTile = this.tiles.at(-1);
    newTile.x = lastTile!.x - 50;
    newTile.direction = lastTile!.direction;
    this.tiles.push(newTile);
    this.app.stage.addChild(newTile);
  };

  draw = () => {
    this.setDirection();

    this.tiles
      .slice()
      .reverse()
      .forEach((tile) => {
        tile.x += tile.direction.x * this.moveSpeed;
        tile.y += tile.direction.y * this.moveSpeed;
      });
  };
}
