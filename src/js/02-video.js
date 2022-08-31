import VimeoPlayer from '@vimeo/player';
import LodashThrottle from 'lodash.throttle';

const VIMEO_PLAYER_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

player.on('play', onPlay);
player.on('timeupdate', LodashThrottle(onTimeUpdate, 1000));

function onPlay(data) {
  // data is an object containing properties specific to that event
  console.log('played the video!');
}

function onTimeUpdate(e) {
  const playbackPosition = e.seconds;
  localStorage.setItem(VIMEO_PLAYER_STORAGE_KEY, playbackPosition);
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem(VIMEO_PLAYER_STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
