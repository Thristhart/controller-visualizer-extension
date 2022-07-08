import { SimpleButtonDescription } from "../simpleButton";

export interface ControllerDescription {
  readonly backgroundImageUrl: string;
  readonly basicButtons: Record<number, SimpleButtonDescription>;
  readonly drawAdvancedButtons: (
    gamepad: Gamepad,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => void;
}
