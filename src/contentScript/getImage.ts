const imageCache = new Map<string, HTMLImageElement>();
export const getImage = (url: string): HTMLImageElement => {
  let cacheImage = imageCache.get(url);
  if (cacheImage) {
    return cacheImage;
  }
  const image = new Image();
  image.src = chrome.runtime.getURL(url);
  imageCache.set(url, image);
  return image;
};
