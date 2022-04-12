/**
 * switch theme procedure
 */
export const themeSwitch = (save = true) => {
  const items = document.querySelectorAll('.dark-theme');
  items.forEach(item => {
    item.classList.toggle('fair-theme');
  })

  if(save) {
    let isDarkTheme = loadFromLocalStorage();
    isDarkTheme = !isDarkTheme;
    saveToLocaleStorage(isDarkTheme);
  }
}

/**
 * save to local storage
 * @param {boolean} isDarkTheme is dark theme switched
 */
const saveToLocaleStorage = (isDarkTheme) => {
  localStorage.setItem('isDarkTheme', isDarkTheme);
}

/**
 * load from local storage from key "isDarkTheme"
 */
export const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('isDarkTheme');
  return savedData === 'true' || savedData === null;
}