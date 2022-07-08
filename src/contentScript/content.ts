import { SeriesXS } from "./controllers/SeriesXS";
import { getImage } from "./getImage";
import { listenForOptions } from "./listenForOptions";
import { createCanvas, drawController } from "./render";

function attachControllerVis() {
  if (
    "controllerVisualizerAnimationFrame" in self &&
    self.controllerVisualizerAnimationFrame !== undefined
  ) {
    cancelAnimationFrame(self.controllerVisualizerAnimationFrame);
    delete self.controllerVisualizerAnimationFrame;
    const canvas = document.getElementById(`${chrome.runtime.id}-canvas`);
    canvas?.parentElement?.removeChild(canvas);
    return;
  }

  const noGamepadImage = getImage("images/no-gamepad.png");

  const [canvas, context] = createCanvas();

  listenForOptions(canvas);

  function poll() {
    self.controllerVisualizerAnimationFrame = requestAnimationFrame(poll);
    if (!context) {
      throw new Error(
        "[controller-visualizer] Lost 2d context for some reason"
      );
    }

    const gamepads = navigator.getGamepads().filter((gamepad) => gamepad);

    if (gamepads.length === 0) {
      context.drawImage(noGamepadImage, 0, 0, canvas.width, canvas.height);
      return;
    }

    for (const gamepad of gamepads) {
      if (!gamepad) {
        continue;
      }
      drawController(context, canvas, gamepad, SeriesXS);
    }
  }

  self.controllerVisualizerAnimationFrame = requestAnimationFrame(poll);
}

attachControllerVis();
