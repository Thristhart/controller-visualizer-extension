import { chooseControllerForGamepad } from "./controllers/chooseControllerForGamepad";
import { getImage } from "./getImage";
import { listenForOptions } from "./listenForOptions";
import { createCanvas, drawController } from "./render";

function createContainer() {
  const container = document.createElement("div");
  container.id = `${chrome.runtime.id}-container`;
  container.style.position = "fixed";
  container.style.zIndex = "100000000";
  container.style.pointerEvents = "none";
  container.style.display = "grid";
  container.style.gridTemplateRows = "1fr";
  container.style.gridTemplateColumns = "repeat(4, auto)";
  container.style.alignItems = "center";
  container.style.gap = "8px";
  document.body.appendChild(container);
  return container;
}

function isValidGamepad(gamepad: Gamepad | null): gamepad is Gamepad {
  if (!gamepad) {
    return false;
  }
  // Filter out a variety of non-standard gamepads that we won't have a good visualization for
  return gamepad.axes.length >= 4 && gamepad.buttons.length >= 17;
}

function attachControllerVis() {
  if (
    "controllerVisualizerAnimationFrame" in self &&
    self.controllerVisualizerAnimationFrame !== undefined
  ) {
    cancelAnimationFrame(self.controllerVisualizerAnimationFrame);
    delete self.controllerVisualizerAnimationFrame;
    const container = document.getElementById(`${chrome.runtime.id}-container`);
    container?.parentElement?.removeChild(container);
    return;
  }

  const noGamepadImage = getImage("images/no-gamepad.png");

  const container = createContainer();

  const canvases: (readonly [HTMLCanvasElement, CanvasRenderingContext2D])[] = [
    createCanvas(),
  ];

  container.appendChild(canvases[0][0]);

  listenForOptions(container);

  function poll() {
    self.controllerVisualizerAnimationFrame = requestAnimationFrame(poll);

    const gamepads = navigator.getGamepads().filter(isValidGamepad);

    if (gamepads.length === 0) {
      const [canvas, context] = canvases[0];
      context.drawImage(noGamepadImage, 0, 0, canvas.width, canvas.height);
      return;
    }
    if (gamepads.length < canvases.length) {
      const removed = canvases.splice(
        gamepads.length,
        canvases.length - gamepads.length
      );
      removed.forEach(([canvas]) => {
        canvas.parentElement?.removeChild(canvas);
      });
    }
    if (gamepads.length > canvases.length) {
      const added = gamepads.slice(canvases.length, gamepads.length);
      added.forEach(() => {
        const [canvas, context] = createCanvas();
        canvases.push([canvas, context]);
        container.appendChild(canvas);
      });
    }

    for (const i in gamepads) {
      const gamepad = gamepads[i];
      if (!gamepad) {
        continue;
      }
      const [canvas, context] = canvases[i];
      drawController(
        context,
        canvas,
        gamepad,
        chooseControllerForGamepad(gamepad)
      );
    }
  }

  self.controllerVisualizerAnimationFrame = requestAnimationFrame(poll);
}

attachControllerVis();
