import { Application, Sprite, Ticker } from "pixi.js";
import { Direction } from "./Direction";
import { Keyboard } from "./Keyboard";
import { Snake } from "./Snake";
import { Tile } from "./Tile";

const app = new Application();

document.body.appendChild(app.view as unknown as Node);

const wormHead = Tile.from("./worm.png") as Tile;
wormHead.direction = Direction.right();
wormHead.width = 50;
wormHead.height = 50;

const snake = new Snake(wormHead, app);

snake.eatFruit();
snake.eatFruit();
snake.eatFruit();

Keyboard.init();
console.log(Keyboard.state);

let counter = 0;

Ticker.shared.add((delta) => {
  counter += delta;
  if (Math.floor(counter) >= 50) {
    snake.draw();
    counter = 0;
  }

  if (Keyboard.state.get("KeyD")) {
    snake.direction = Direction.right();
  } else if (Keyboard.state.get("KeyW")) {
    snake.direction = Direction.up();
  } else if (Keyboard.state.get("KeyA")) {
    snake.direction = Direction.left();
  } else if (Keyboard.state.get("KeyS")) {
    snake.direction = Direction.down();
  }
});
