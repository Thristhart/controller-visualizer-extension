const scaleInput = document.getElementById("scale") as HTMLInputElement;
const positionInput = document.getElementById("position") as HTMLSelectElement;

chrome.storage.sync.get(
  { scale: 2, position: "bottom-left" },
  function (result) {
    positionInput.value = result.position;
    scaleInput.value = result.scale;
  }
);

scaleInput.addEventListener("change", function () {
  chrome.storage.sync.set({
    scale: scaleInput.value,
  });
});
positionInput.addEventListener("change", function () {
  chrome.storage.sync.set({
    position: positionInput.value,
  });
});
