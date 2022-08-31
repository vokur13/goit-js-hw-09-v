import LodashThrottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', LodashThrottle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

getStorageOutput();

// function onInput(e) {
//   const key = e.target.name;
//   const value = e.target.value;
//   formData[key] = value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

// function onInput(e) {
//   const key = e.target.name;
//   const value = e.target.value;
//   if (key === 'email' || key === 'message') {
//     formData.email = refs.email.value;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
//     formData.message = refs.textarea.value;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
//   }
// }

function onInput(e) {
  const key = e.target.name;
  const value = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  for (const key in formData) {
    if (!formData.hasOwnProperty(key)) {
      formData[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      return;
    }
  }
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parseData = JSON.parse(savedData);
    parseData[key] = value;
    formData[key] = { ...parseData };
    console.log('parseData', parseData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    return;
  }

  //   if (!formData.hasOwnProperty([key])) {
  //     formData[key] = value;

  //   }

  return;
}
// ---------------------------
// for (const key in userDeveloper) {
//   if (userDeveloper.hasOwnProperty(key)) {
//     const element = userDeveloper[key];
//     console.log('element', element);
//   }
// }

// for (const key in userDeveloper) {
//   if (userDeveloper.hasOwnProperty(key)) {
//     console.log('key', key);
//   }
// //

//         //Object.keys повертає масив власних ключів

// const keys = Object.keys(userDeveloper);
// console.log('keys', keys);

// const value = Object.values(userDeveloper);
// console.log('value', value);

// for (const key of keys) {
//   console.log(userDeveloper[key]);
//   console.log(key);
// }

//         //

//         const name = 'mango';
//         const email = 'email@mail.com'
//         const user = { name, email }
//         console.log(user);

//         //
// ---------------------------

function getStorageOutput() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parseData = JSON.parse(savedData);
    if (parseData.hasOwnProperty('email')) {
      refs.email.value = parseData.email;
    }
    if (parseData.hasOwnProperty('message')) {
      refs.textarea.value = parseData.message;
    }
  }
}
function onFormSubmit(e) {
  e.preventDefault();
  const storedData = localStorage.getItem(STORAGE_KEY);
  const printData = JSON.parse(storedData);
  console.log(printData);
  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
}
