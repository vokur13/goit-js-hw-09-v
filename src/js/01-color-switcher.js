const getColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
let timerId = null;
const interval = 1000;

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart() {
  refs.btnStart.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getColor();
  }, interval);
}

function onStop() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
}
