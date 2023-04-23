import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
  player.setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
}

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    JSON.stringify(localStorage.setItem(LOCALSTORAGE_KEY, seconds));
  }, 1000)
);
