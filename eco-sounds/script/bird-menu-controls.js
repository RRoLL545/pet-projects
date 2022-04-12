/**
 * toggle menu "bird view" <=> "list view"
 */
 export const switchMenu = () => {
  const birdsList = document.querySelector('.birds-list');
  birdsList.classList.toggle('bird-menu-open');

  const birdsMenuIcon = document.querySelector('.bird-menu');
  birdsMenuIcon.classList.toggle('bird-menu-close');
  console.log('lol');
}

/**
 * close opened bird-menu
 */
export const closeMenu = () => {
  const birdsList = document.querySelector('.birds-list');
  birdsList.classList.remove('bird-menu-open');

  const birdsMenuIcon = document.querySelector('.bird-menu');
  birdsMenuIcon.classList.remove('bird-menu-close');
}