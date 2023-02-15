export class Keyboard {
  public static readonly state: Map<string, boolean> = new Map();

  public static init = () => {
    document.addEventListener("keydown", Keyboard.handleKeyDown);
    document.addEventListener("keyup", Keyboard.handleKeyUp);
  };

  private static handleKeyDown = (e: KeyboardEvent): void => {
    Keyboard.state.set(e.code, true);
  };

  private static handleKeyUp = (e: KeyboardEvent): void => {
    Keyboard.state.set(e.code, false);
  };
}
