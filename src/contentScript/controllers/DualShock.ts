import { getImage } from "../getImage";
import { ControllerDescription } from "./ControllerDescription";

export const DualShock: ControllerDescription = {
  backgroundImageUrl: "images/dualShock/dual-shock-controller-base.png",

  basicButtons: {
    0: { x: 90, y: 38, imageUrl: "images/dualShock/x.png" },
    1: { x: 97, y: 31, imageUrl: "images/dualShock/circle.png" },
    2: { x: 83, y: 31, imageUrl: "images/dualShock/square.png" },
    3: { x: 90, y: 24, imageUrl: "images/dualShock/triangle.png" },
    4: {
      x: 15,
      y: 14,
      imageUrl: "images/dualShock/left-shoulder.png",
    },
    5: {
      x: 85,
      y: 14,
      imageUrl: "images/dualShock/right-shoulder.png",
    },
    8: { x: 35, y: 18, imageUrl: "images/dualShock/share.png" },
    9: { x: 77, y: 18, imageUrl: "images/dualShock/options.png" },
    12: {
      x: 20,
      y: 25,
      imageUrl: "images/dualShock/dpad-up.png",
    },
    13: {
      x: 20,
      y: 37,
      imageUrl: "images/dualShock/dpad-down.png",
    },
    14: {
      x: 13,
      y: 32,
      imageUrl: "images/dualShock/dpad-left.png",
    },
    15: {
      x: 25,
      y: 32,
      imageUrl: "images/dualShock/dpad-right.png",
    },
    16: { x: 55, y: 49, imageUrl: "images/dualShock/ps.png" },
    17: { x: 42, y: 19, imageUrl: "images/dualShock/touchpad.png" },
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
  const ltImage = getImage("images/dualShock/lt-press.png");
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
  const rtImage = getImage("images/dualShock/rt-press.png");
  const imagePortion = rtImage.height * value;
  context.drawImage(
    rtImage,
    0,
    rtImage.height - imagePortion,
    rtImage.width,
    imagePortion,
    107,
    rtImage.height - imagePortion,
    rtImage.width,
    imagePortion
  );
}

const leftStickCenterPx = [41, 50] as const;
const rightStickCenterPx = [75, 50] as const;
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
