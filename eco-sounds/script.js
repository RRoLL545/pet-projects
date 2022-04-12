import playback from './script/audio-controls.js';
import { preloadImages } from './script/images-controls.js';
import * as menu from './script/bird-menu-controls.js';
import { selfEstimation } from './script/self-estimation.js';

const playButtons = document.querySelectorAll('.audio-play');
playButtons.forEach( button => button.addEventListener('click', playback));

const birds = ['drozd', 'forest', 'javoronok', 'slavka', 'solovey', 'zarynka'];
birds.forEach(item => preloadImages(item));

const birdsMenu = document.querySelector('.bird-menu');
birdsMenu.addEventListener('click', menu.switchMenu );

const links = document.querySelector('.birds-list');
links.addEventListener('click', menu.closeMenu);

window.onload = selfEstimation();