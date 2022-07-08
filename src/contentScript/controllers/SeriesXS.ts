import { getImage } from "../getImage";
import { ControllerDescription } from "./ControllerDescription";

export const SeriesXS: ControllerDescription = {
  backgroundImageUrl: "images/seriesXS/series-x-s-controller-base.png",
  basicButtons: {
    0: { x: 83, y: 29, imageUrl: "images/seriesXS/a.png" },
    1: { x: 91, y: 22, imageUrl: "images/seriesXS/b.png" },
    2: { x: 75, y: 22, imageUrl: "images/seriesXS/x.png" },
    3: { x: 83, y: 14, imageUrl: "images/seriesXS/y.png" },
    4: {
      x: 19,
      y: 3,
      imageUrl: "images/seriesXS/left-shoulder-press.png",
    },
    5: {
      x: 73,
      y: 3,
      imageUrl: "images/seriesXS/right-shoulder-press.png",
    },
    8: { x: 46, y: 22, imageUrl: "images/seriesXS/view.png" },
    9: { x: 62, y: 22, imageUrl: "images/seriesXS/menu.png" },
    12: {
      x: 33,
      y: 34,
      imageUrl: "images/seriesXS/dpad-up-press.png",
    },
    13: {
      x: 33,
      y: 34,
      imageUrl: "images/seriesXS/dpad-down-press.png",
    },
    14: {
      x: 33,
      y: 34,
      imageUrl: "images/seriesXS/dpad-left-press.png",
    },
    15: {
      x: 33,
      y: 34,
      imageUrl: "images/seriesXS/dpad-right-press.png",
    },
    16: { x: 80, y: 10, imageUrl: "images/seriesXS/nexus.png" },
  },
  drawAdvancedButtons(gamepad, context) {
    drawLeftTrigger(context, gamepad.buttons[6].value);
    drawRightTrigger(context, gamepad.buttons[7].value);
    drawLeftThumbstick(
      context,
      gamepad.axes[0],
      gamepad.axes[1],
      gamepad.buttons[10].pressed
    );
    drawRightThumbstick(
      context,
      gamepad.axes[2],
      gamepad.axes[3],
      gamepad.buttons[11].pressed
    );
  },
};
function drawLeftTrigger(context: CanvasRenderingContext2D, value: number) {
  if (value < 0.05) {
    return;
  }
  const ltImage = getImage("images/seriesXS/lt-press.png");
  const imagePortion = ltImage.height * value;
  context.drawImage(
    ltImage,
    0,
    ltImage.height - imagePortion,
    ltImage.width,
    imagePortion,
    0,
    ltImage.height - imagePortion,
    ltImage.width,
    imagePortion
  );
}
function drawRightTrigger(context: CanvasRenderingContext2D, value: number) {
  if (value < 0.05) {
    return;
  }
  const rtImage = getImage("images/seriesXS/rt-press.png");
  const imagePortion = rtImage.height * value;
  context.drawImage(
    rtImage,
    0,
    rtImage.height - imagePortion,
    rtImage.width,
    imagePortion,
    105,
    rtImage.height - imagePortion,
    rtImage.width,
    imagePortion
  );
}

const leftStickCenterPx = [27, 25] as const;
const rightStickCenterPx = [72, 42] as const;
const stickRadius = 5;
function drawLeftThumbstick(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  pressed: boolean
) {
  const thumbStickImage = getImage("images/seriesXS/thumbstick.png");
  const thumbStickPressImage = getImage("images/seriesXS/thumbstick-press.png");
  const leftStickX = Math.round(leftStickCenterPx[0] + stickRadius * x);
  const leftStickY = Math.round(leftStickCenterPx[1] + stickRadius * y);

  context.drawImage(
    pressed ? thumbStickPressImage : thumbStickImage,
    leftStickX - Math.floor(thumbStickImage.width / 2),
    leftStickY - Math.floor(thumbStickImage.height / 2),
    thumbStickImage.width,
    thumbStickImage.height
  );
}
function drawRightThumbstick(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  pressed: boolean
): void {
  const thumbStickImage = getImage("images/seriesXS/thumbstick.png");
  const thumbStickPressImage = getImage("images/seriesXS/thumbstick-press.png");
  const rightStickX = Math.round(rightStickCenterPx[0] + stickRadius * x);
  const rightStickY = Math.round(rightStickCenterPx[1] + stickRadius * y);

  context.drawImage(
    pressed ? thumbStickPressImage : thumbStickImage,
    rightStickX - Math.floor(thumbStickImage.width / 2),
    rightStickY - Math.floor(thumbStickImage.height / 2),
    thumbStickImage.width,
    thumbStickImage.height
  );
}
