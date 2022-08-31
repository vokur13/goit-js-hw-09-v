// const { formats } = require('flatpickr/dist/utils/formatting');
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmit);

let position = 0;

function onSubmit(e) {
  e.preventDefault();
  const delay = Number(refs.delay.value);
  createPromise(position, delay)
    .then(
      ({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        return { position, delay };
      },
      ({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        return { position, delay };
      }
    )
    .then(({ position, delay }) => {
      createPromiseSet(position, delay);
      return { position, delay };
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      position += 1;
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function createPromiseSet(position, delay) {
  return new Promise((resolve, reject) => {
    const step = Number(refs.step.value);
    const amount = Number(refs.amount.value);
    let intervalID = setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      position += 1;
      delay += step;

      if (shouldResolve) {
        resolve({ position, delay });
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        // Fulfill
      } else {
        reject({ position, delay });
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        // Reject
      }
      if (position === amount) {
        clearInterval(intervalID);
      }
    }, step);
  });
}

function onFulfill({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onReject({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
