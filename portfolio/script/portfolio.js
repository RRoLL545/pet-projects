/**
 * set images to gallery and activate clicked button
 * @param {*} e - event
 */
export const setImages = (e) => {
  const clickedButton = e.target;
  const seasonName = clickedButton.dataset.season;
  if (seasonName === undefined) return;
  const portfolioImgs = document.querySelectorAll('.photo-gallery-item');
  const seasonFilterButtons = document.querySelectorAll('.filter-season__button');
  
  portfolioImgs.forEach((item, key) => {
    item.src = `./assets/img/portfolio/${seasonName}/${key + 1}.jpg`;
  })

  seasonFilterButtons.forEach(item => {
    if (item.classList.contains('button-square_fair')) {
      switchClass(item, 'button-square_fair', 'button-square_dark');
    }
  });

  switchClass(clickedButton, 'button-square_dark', 'button-square_fair');
}

/**
 * removes className from DOM element and add another
 * @param {*} item - DOM element
 * @param {string} classRemove - className to remove
 * @param {string} classAdd - className to add
 */
export const switchClass = (item, classRemove, classAdd) => {
  item.classList.remove(classRemove);
  item.classList.add(classAdd);
}

/**
 * images cashing
 * @param {string} seasonName - season name
 * @param {number} count - images count
 */
export const preloadImages = (seasonName, count) => {
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = `./assets/img/portfolio/${seasonName}/${i}.jpg`;
  }
}