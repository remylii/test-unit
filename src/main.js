// import ApiClient from './lib/ApiClient';
//
// const elem = document.querySelector('#application');
// const first_elem = document.querySelector('#first');
// const second_elem = document.querySelector('#second');
//
// const btn = document.querySelector('#btn');
//
// btn.addEventListener('click', (event) => {
//   event.preventDefault();
//   console.log('click');
//   ApiClient.getItem()
//   .then(function(result) {
//
//     first_elem.innerHTML = result;
//   });
// }, false);

import $ from 'jquery';
import { getFirst, getSecond, forceAbort } from './jquery/ApiAction';

import ServiceDeliver from './jquery/ServiceDeliver';
$('.btn-inc').on('click', event => {
  document.querySelector('.dist-inc').innerHTML = ServiceDeliver.inc();
});

$('.btn-fetch').on('click', event => {
  getFirst()
  .then(result => {
    console.log('[main.then1] resolve');
    console.dir(result);

    return getSecond();
  }, (reject_result) => {
    console.log('[main.then1] reject');
    console.dir(reject_result);
  })
  .then(sec_item => {
    console.log('[main.then2] resolve');
    console.dir(sec_item);
  }, (sec_item_reject) => {
    console.log('[main.then2] reject');
    console.dir(sec_item_reject);

    return $.Deferred().reject();  // どうや
  })
  .then((three_resolve) => {
    console.log('[main.then3] resolve');
  }, (three_reject) => {
    console.log('[main.then3] reject');
  })
  .fail(fail_data => {
    console.log('[main.fail] fail');
    console.dir(fail_data);
  });
});


$('.btn-abort').on('click', event => {
  console.log('[.btn-abort] click');
  forceAbort();
});
