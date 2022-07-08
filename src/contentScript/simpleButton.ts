import { getImage } from "./getImage";

export interface SimpleButtonDescription {
  readonly x: number;
  readonly y: number;
  readonly imageUrl: string;
}
/**
 * Draws the most simple button logic, when there's a button image that is either visible or not based on
 * an input being non-zero.
 */
export const drawSimpleButton = (
  context: CanvasRenderingContext2D,
  button: SimpleButtonDescription,
  buttonStatus: number
) => {
  if (buttonStatus) {
    const image = getImage(button.imageUrl);
    context.drawImage(image, button.x, button.y, image.width, image.height);
  }
};
