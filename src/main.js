import ApiClient from './lib/ApiClient';

const elem = document.querySelector('#application');
const first_elem = document.querySelector('#first');
const second_elem = document.querySelector('#second');

const btn = document.querySelector('#btn');

btn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('click');
  ApiClient.getItem()
  .then(function(result) {

    first_elem.innerHTML = result;
  });
}, false);
