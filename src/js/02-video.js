import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const saveTime = localStorage.getItem(LOCALSTORAGE_KEY);

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds);
  }, 1000)
);

player.setCurrentTime(saveTime);

const savedVolume = JSON.parse(localStorage.getItem('volume'));
if (savedVolume !== null) {
  player.setVolume(savedVolume.volume);
}

player.on('volumechange', volume => {
  localStorage.setItem('volume', JSON.stringify(volume));
});
