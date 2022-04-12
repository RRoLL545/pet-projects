import * as burger from "./script/burger-menu.js";
import * as portfolio from "./script/portfolio.js";
import * as langSwitch from "./script/lang-switch.js";
import * as setTheme from "./script/theme-switch.js";
import { selfEstimation } from "./script/self-estimation.js";

/*Burger-menu*/
const burgerMenu = document.querySelector('.burger-icon');
burgerMenu.addEventListener('click', burger.switchMenu );

const links = document.querySelector('.navigation-list');
links.addEventListener('click', burger.closeMenu);


/*Portfolio images*/
const seasonFilter = document.querySelector('.filter-season');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const imgCount = 6;

seasonFilter.addEventListener('click', portfolio.setImages);

seasons.forEach(seasonName => portfolio.preloadImages(seasonName, imgCount));

/*i18n*/
const langSwitchBtn = document.querySelectorAll('.lang-switch__button');
langSwitchBtn.forEach(btn => btn.addEventListener('click', langSwitch.getLang));


/*Theme switch*/
const themeBtn = document.querySelector('.theme-switch-button');
themeBtn.addEventListener('click', setTheme.themeSwitch);

const themeData = setTheme.loadFromLocalStorage();
if (!themeData) setTheme.themeSwitch(false);


/*Self estimation*/
window.onload = selfEstimation();