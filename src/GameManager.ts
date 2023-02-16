import { Application, Sprite, Text } from "pixi.js";
import { Direction } from "./Direction";
import { Snake } from "./Snake";

export class GameManager {
  score: number = 0;
  fruitImg: string;
  fruit?: Sprite;
  app: Application;
  snake: Snake;
  gameOver: boolean = false;
  gameText: Text;

  constructor(fruitImg: string, app: Application, snake: Snake) {
    this.fruitImg = fruitImg;
    this.app = app;
    this.snake = snake;
    this.init();
    this.gameText = new Text(this.score, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });
    this.app.stage.addChild(this.gameText);
  }

  init = () => {
    this.spawnFruit();
  };

  renderText = () => {
    if (this.gameOver) {
      this.gameText.text = "Game Over";
      return;
    }
    this.gameText.text = this.score;
  };

  spawnFruit = () => {
    const fruit = Sprite.from(this.fruitImg);
    fruit.width = 50;
    fruit.height = 50;

    const width = Math.round(this.app.screen.width / 50);
    const height = Math.round(this.app.screen.height / 50);
    const randomPositionX = Math.floor(Math.random() * width);
    const randomPositionY = Math.floor(Math.random() * height);

    fruit.x = randomPositionX * 50;
    fruit.y = randomPositionY * 50;

    if (this.snake.checkCollision(fruit)) {
      console.log("positive");
      this.spawnFruit();
    }

    this.app.stage.removeChild(this.fruit!);
    this.fruit = fruit;
    this.app.stage.addChild(fruit);
  };

  update = () => {
    // move snake

    if (this.gameOver) {
      this.renderText();
      return;
    }
    this.snake.draw();

    //check collision with self

    // check collision with fruit
    const fruitColl = this.snake.checkCollision(this.fruit!);

    if (fruitColl) {
      console.log("collision");
      this.snake.eatFruit();
      this.spawnFruit();
      this.score++;
      this.renderText();
      return;
    }

    const selfColl = this.snake.collidedWithSelf();

    if (selfColl) {
      this.gameOver = true;
      this.snake.direction = Direction.stop;
    }
  };
}
