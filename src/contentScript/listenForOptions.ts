let options = { scale: 3, position: "bottom-left" };

export function listenForOptions(container: HTMLDivElement) {
  chrome.storage.onChanged.addListener((changes) => {
    for (let key in changes) {
      options[key] = changes[key].newValue;
    }
    applyOptions(container);
  });
  chrome.storage.sync.get(options, (result) => {
    options = result as typeof options;
    applyOptions(container);
  });
}

function applyOptions(container: HTMLDivElement) {
  container.style.transform = `scale(${options.scale})`;
  if (options.position === "top-left") {
    container.style.top = "1rem";
    container.style.left = "1rem";
    container.style.bottom = "unset";
    container.style.right = "unset";
    container.style.transformOrigin = "0 0";
  } else if (options.position === "top-right") {
    container.style.top = "1rem";
    container.style.right = "1rem";
    container.style.bottom = "unset";
    container.style.left = "unset";
    container.style.transformOrigin = "100% 0";
  } else if (options.position === "bottom-left") {
    container.style.bottom = "1rem";
    container.style.left = "1rem";
    container.style.top = "unset";
    container.style.right = "unset";
    container.style.transformOrigin = "0 100%";
  } else if (options.position === "bottom-right") {
    container.style.bottom = "1rem";
    container.style.right = "1rem";
    container.style.top = "unset";
    container.style.left = "unset";
    container.style.transformOrigin = "100% 100%";
  }
}
