/**
 * images cashing
 * @param {string} birdName - season name
 */
 export const preloadImages = (birdName) => {
  const img = new Image();
  img.src = `./assets/img/${birdName}.jpg`
}