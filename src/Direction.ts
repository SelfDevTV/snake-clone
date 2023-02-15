export class Direction {
  x: number;
  y: number;
  speed: number;

  constructor(x?: number, y?: number, speed?: number) {
    this.speed = speed || 1;
    this.x = (x && x * this.speed) || 0;
    this.y = (y && y * this.speed) || 0;
  }

  static left = (speed: number = 1) => {
    return new Direction(-1, 0, speed);
  };

  static right = (speed: number = 1) => {
    return new Direction(1, 0, speed);
  };

  static up = (speed: number = 1) => {
    return new Direction(0, -1, speed);
  };

  static down = (speed: number = 1) => {
    return new Direction(0, 1, speed);
  };

  static stop = () => {
    return new Direction(0, 0);
  };

  setSpeed = (speed: number) => {
    this.speed = speed;
  };
}
