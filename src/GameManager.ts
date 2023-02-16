import { Application, Text } from "pixi.js";
import { Direction } from "./Direction";
import { Snake } from "./Snake";
import { Tile } from "./Tile";

export class GameManager {
  score: number = 0;
  fruitImg: string;
  fruitImgs: string[] = ["germany.png", "italy.png"];
  fruit?: Tile;
  app: Application;
  snake: Snake;
  gameOver: boolean = false;
  gameText: Text;

  constructor(fruitImg: string, app: Application, snake: Snake) {
    this.fruitImg = fruitImg;
    this.app = app;
    this.snake = snake;

    this.gameText = new Text("Score: " + this.score, {
      fontFamily: "Arial",
      fontSize: 40,
      fill: 0xff1010,

      align: "center",
    });
    this.gameText.x = 15;
    this.gameText.y = 15;
    this.app.stage.addChild(this.gameText);
    this.init();
  }

  init = () => {
    this.app.stage.addChild(this.gameText);
  };

  renderText = () => {
    if (this.gameOver) {
      this.gameText.text = "Game Over. Score: " + this.score;
      return;
    }
    this.gameText.text = "Score: " + this.score;
  };

  spawnFruit = () => {
    const randomIndex = Math.round(Math.random() * (this.fruitImgs.length - 1));
    const fruit = Tile.from(this.fruitImgs[randomIndex]) as Tile;
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
      return;
    }

    this.fruit = fruit;
    this.app.stage.addChild(this.fruit);
  };

  resetGame = () => {
    this.gameOver = false;
    this.score = 0;
    this.snake.reset();
    this.app.stage.removeChild(this.fruit!);
    this.spawnFruit();
    this.init();
  };

  update = () => {
    // move snake
    this.renderText();
    if (this.gameOver) {
      const btn = document.querySelector<HTMLElement>(".btn-1");
      btn!.style.opacity = "1";
      btn?.addEventListener("click", () => {
        this.resetGame();
        btn!.style.opacity = "0";
      });

      return;
    }
    this.snake.draw();

    //check collision with self

    // check collision with fruit
    const fruitColl = this.snake.checkCollision(this.fruit!);

    if (fruitColl) {
      console.log("collision");
      this.snake.eatFruit(this.fruit!);
      this.spawnFruit();
      this.score++;

      return;
    }

    const selfColl = this.snake.collidedWithSelf();

    if (selfColl) {
      this.gameOver = true;
      this.snake.direction = Direction.stop;
    }
  };
}
