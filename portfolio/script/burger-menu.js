/**
 * toggle menu "burger view" <=> "list view"
 */
 export const switchMenu = () => {
  const navigationList = document.querySelector('.navigation-list');
  navigationList.classList.toggle('burger-menu-open');

  const burgerMenuIcon = document.querySelector('.burger-icon');
  burgerMenuIcon.classList.toggle('burger-icon-close');
}

/**
 * close opened burger-menu
 */
export const closeMenu = () => {
  const navigationList = document.querySelector('.navigation-list');
  navigationList.classList.remove('burger-menu-open');

  const burgerMenuIcon = document.querySelector('.burger-icon');
  burgerMenuIcon.classList.remove('burger-icon-close');
}