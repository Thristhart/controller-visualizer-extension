import { ControllerDescription } from "./controllers/ControllerDescription";
import { getImage } from "./getImage";
import { drawSimpleButton } from "./simpleButton";

const defaultCanvasWidth = 115;
const defaultCanvasHeight = 83;

export function createCanvas() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error(
      "[controller-visualizer] Could not get 2d context for some reason"
    );
  }
  context.imageSmoothingEnabled = false;

  canvas.width = defaultCanvasWidth;
  canvas.height = defaultCanvasHeight;

  canvas.style.imageRendering = "pixelated";
  canvas.style.pointerEvents = "none";

  return [canvas, context] as const;
}

export function drawController(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  gamepad: Gamepad,
  description: ControllerDescription
) {
  context.imageSmoothingEnabled = false;

  const bg = getImage(description.backgroundImageUrl);

  canvas.width = bg.width || defaultCanvasWidth;
  canvas.height = bg.height || defaultCanvasWidth;

  context.drawImage(bg, 0, 0, canvas.width, canvas.height);

  for (const inputIndex in description.basicButtons) {
    const inputStatus = gamepad.buttons[inputIndex].value;
    drawSimpleButton(
      context,
      description.basicButtons[inputIndex],
      inputStatus
    );
  }
  description.drawAdvancedButtons(gamepad, context, canvas);
}
