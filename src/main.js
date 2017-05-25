import $ from 'jquery';
import ApiClient from './jquery/ApiClient';

import MyAngelContainer from './components/MyAngelContainer';
import AngelSongContainer from './components/AngelSongContainer';
import { loadingComponent } from './components/loading';

$('.btn-fetch').on('click', event => {
  const first_elem = document.querySelector('#first'),
    second_elem = document.querySelector('#second'),
    third_elem = document.querySelector('#third');

  first_elem.innerHTML = 'first';
  second_elem.innerHTML = 'second';
  third_elem.innerHTML = 'third';

  ApiClient.getItem()
    .then((res) => {
      console.log('[main.then1] resolve');
      first_elem.innerHTML = MyAngelContainer.renderMyAngel(res);

      return ApiClient.getSecondItem();
    }, (res) => {
      console.log('[main.then1] reject');
      if (res.textStatus === 'abort') {
        first_elem.innerHTML = loadingComponent();
      } else {
        first_elem.innerHTML = MyAngelContainer.renderEmpty();
      }

      return Promise.reject(res);
    })
    .then((res) => {
      console.log('[main.then2] resolve');
      second_elem.innerHTML = AngelSongContainer.renderAngelSong(res);

      // return Promise.resolve();
    }, (res) => {
      console.log('[main.then2] reject');
      if (res.textStatus === 'abort') {
        second_elem.innerHTML = loadingComponent();
      } else {
        second_elem.innerHTML = AngelSongContainer.renderEmpty();
      }

      return Promise.reject(res);
    })
    .then((res) => {
      console.log('[main.then3] resolve');
      console.dir(res);
      third_elem.innerHTML = 'resolve';

    }, (res) => {
      console.log('[main.then3] reject');
      console.dir(res);
      third_elem.innerHTML = 'reject';

    });
});

$('.btn-when').on('click', event => {
  console.log('[.btn-when] click');

  const first_elem = document.querySelector('.when-first');
  const second_elem = document.querySelector('.when-second');
  const third_elem = document.querySelector('.when-third');

  first_elem.innerHTML = 'when-first';
  second_elem.innerHTML = 'when-second';
  third_elem.innerHTML = 'when-third';

  ApiClient.getBoth()
    .then((first_data, second_data) => {
      console.log('[main.when.then] resolve');
      console.dir(first_data);
      console.dir(second_data);

      first_elem.innerHTML = MyAngelContainer.renderMyAngel(first_data);
      second_elem.innerHTML = AngelSongContainer.renderAngelSong(second_data);

      return Promise.resolve();
    }, (reject_data) => {
      console.log('[main.when.then] reject');
      console.dir(reject_data);

      if (reject_data.textStatus === 'abort') {
        first_elem.innerHTML = loadingComponent();
        second_elem.innerHTML = loadingComponent();
      } else {
        first_elem.innerHTML = MyAngelContainer.renderEmpty();
        second_elem.innerHTML = AngelSongContainer.renderEmpty();
      }

      return Promise.reject();
    });
});

$('.btn-abort').on('click', event => {
  ApiClient.forceAbort();
});
