let options = { scale: 3, position: "bottom-left" };

export function listenForOptions(canvas: HTMLCanvasElement) {
  chrome.storage.onChanged.addListener((changes) => {
    for (let key in changes) {
      options[key] = changes[key].newValue;
    }
    applyOptions(canvas);
  });
  chrome.storage.sync.get(options, (result) => {
    options = result as typeof options;
    applyOptions(canvas);
  });
}

function applyOptions(canvas: HTMLCanvasElement) {
  canvas.style.transform = `scale(${options.scale})`;
  if (options.position === "top-left") {
    canvas.style.top = "1rem";
    canvas.style.left = "1rem";
    canvas.style.bottom = "unset";
    canvas.style.right = "unset";
    canvas.style.transformOrigin = "0 0";
  } else if (options.position === "top-right") {
    canvas.style.top = "1rem";
    canvas.style.right = "1rem";
    canvas.style.bottom = "unset";
    canvas.style.left = "unset";
    canvas.style.transformOrigin = "100% 0";
  } else if (options.position === "bottom-left") {
    canvas.style.bottom = "1rem";
    canvas.style.left = "1rem";
    canvas.style.top = "unset";
    canvas.style.right = "unset";
    canvas.style.transformOrigin = "0 100%";
  } else if (options.position === "bottom-right") {
    canvas.style.bottom = "1rem";
    canvas.style.right = "1rem";
    canvas.style.top = "unset";
    canvas.style.left = "unset";
    canvas.style.transformOrigin = "100% 100%";
  }
}
