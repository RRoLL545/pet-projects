/**
 * audio to play
 */
const audio = new Audio();

/**
 * is audio track being playing
 */
let isPlay = false;

/**
 * current audio which is being playing
 */
let birdSing = 'forest';

/**
 * main play/pause button
 */
const playButtonMain = document.querySelector('.main-play-button');

/**
 * main tag as DOM element
 */
const main = document.querySelector('.main');

/**
 * playback procedure
 * @param {event} e 
 */
const playback = (e) => {
  /**
   * clicked button
   */
  const clickedButton = e.target;

  /**
   * requested track to play - from data-bird
   */
  const trackName = `${clickedButton.dataset.bird}`;

  if (trackName === 'current') {
    if (isPlay) {
      pause();
      isPlay = !isPlay;
    } else {
      play(`./assets/audio/${birdSing}.mp3`);
      isPlay = !isPlay;
    }
    clickedButton.classList.toggle('active');
  } else {
    if (birdSing !== trackName) {
      birdSing = trackName;
      play(`./assets/audio/${trackName}.mp3`);
      isPlay = true;
      main.style.backgroundImage = `url('./assets/img/${trackName}.jpg')`;
      removeActiveClass();
      clickedButton.classList.toggle('active');
      playButtonMain.classList.add('active');
    } else {
      return;
    }
  }
}

export default playback;

/**
 * play audio track from given url 
 * @param {string} audioURL - url of audio file
 */
const play = (audioURL) => {
  audio.src = audioURL;
  audio.currentTime = 0;
  audio.play();
}

/**
 * pause playing audio track
 */
const pause = () => {
  audio.pause();
}

/**
 * remove active class from all elements which have it
 */
const removeActiveClass = () => {
  const nodeElem = document.querySelectorAll('.active');
  nodeElem.forEach(node => node.classList.toggle('active'));
}