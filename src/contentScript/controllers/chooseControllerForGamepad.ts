import { DualShock } from "./DualShock";
import { SeriesXS } from "./SeriesXS";

export const chooseControllerForGamepad = (gamepad: Gamepad) => {
  if (gamepad.id.includes("Vendor: 054c")) {
    return DualShock;
  }

  return SeriesXS;
};
