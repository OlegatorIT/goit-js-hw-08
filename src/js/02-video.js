import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
// const saveTime = localStorage.getItem(LOCALSTORAGE_KEY);

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    JSON.stringify(localStorage.setItem(LOCALSTORAGE_KEY, seconds));
    console.log(seconds);
  }, 1000)
);

// player.setCurrentTime(saveTime);
