import $ from 'jquery';

export function fetchItem() {
  console.log('[serviceActions] fetchItem');
  const url = '/ajax/item';

  return $.ajax(url, {
    method: 'GET'
  });

}

export function fetchSecondItem() {
  console.log('[serviceActions] fetchSecondItem');
  const url = '/ajax/second-item';

  return $.ajax(url, {
    method: 'GET'
  });
}
