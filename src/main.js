import $ from 'jquery';
import ApiClient from './jquery/ApiClient';

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
      console.dir(res);
      first_elem.innerHTML = res.body.angel;

      return ApiClient.getSecondItem();
    }, (res) => {
      console.log('[main.then1] reject');
      console.dir(res);

      if (res.textStatus === 'abort') {
        first_elem.innerHTML = loadingComponent();
      } else {
        first_elem.innerHTML = res.body.angel;
      }
      return $.Deferred.promise().reject(res);
    })
    .then((res) => {
      console.log('[main.then2] resolve');
      console.dir(res);

      second_elem.innerHTML = res.body.record;
    }, (res) => {
      console.log('[main.then2] reject');
      console.dir(res);

      if (res.textStatus === 'abort') {
        second_elem.innerHTML = loadingComponent();
      } else {
        second_elem.innerHTML = res.body.record;
      }
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


$('.btn-abort').on('click', event => {
  ApiClient.forceAbort();
});
