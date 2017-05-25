import $ from 'jquery';
import { fetchItem, fetchSecondItem } from './serviceActions';

import { showMyAngel, notFoundMyAngel } from '../components/show-my-angel';
import { showAngelSong, notFoundAngelSong } from '../components/angel-song';

const GET_ITEM = 'GET_ITEM';
const GET_SECOND_ITEM = 'GET_SECOND_ITEM';

let xhr = {
  'GET_ITEM': null,
  'GET_SECOND_ITEM': null
};

function validateXHR(key) {
  console.log('[validateXHR]');
  const target = xhr[key];

  if (target) {
    console.dir(target);
    if (0 < target.readyState && target.readyState < 4) {
      console.log('  > abort!');
      target.abort();
    }
  }
}

class ApiClient {
  static forceAbort() {
    console.log('[ApiClient] forceAbort');
    for (let k in xhr) {
      if (xhr[k]) {
        xhr[k].abort();
        console.log(' > abort!!');
      }
    }
  }

  static getItem() {
    validateXHR(GET_ITEM);

    return $.Deferred((defer) => {
      console.group('[ApiClient getItem]');
      xhr[GET_ITEM] = fetchItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getItem] resolve');

          // 加工データ
          let useful_data = {
            textStatus: textStatus,
            body: null
          };

          if (res.status === 0) {
            useful_data = Object.assign(useful_data, {
              body: {
                angel: showMyAngel(res.response)
              }
            });
          }

          defer.resolve(useful_data);
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getItem] reject');
          console.log(textStatus);

          let useful_data = { textStatus: textStatus, body: null };
          if (textStatus !== 'abort') {
            useful_data = Object.assign(useful_data, {
              body: {
                angel: notFoundMyAngel()
              }
            });
          }

          defer.reject({ textStatus: textStatus });
        })
        .always(() => {
          console.log('[ApiClient getItem] always');
          console.groupEnd('[ApiClient getItem]');
          xhr[GET_ITEM] = null;
        });

    }).promise();
  }

  /**
   * @return {object}
   */
  static getSecondItem() {
    validateXHR(GET_SECOND_ITEM);

    return $.Deferred((defer) => {
      console.group('[ApiClient getSecondItem]');
      xhr[GET_SECOND_ITEM] = fetchSecondItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getSecondItem] resolve');

          // 加工データ
          let useful_data = {
            textStatus: textStatus,
            body: null
          };

          if (res.status === 0) {
            useful_data = Object.assign(useful_data, {
              body: {
                record: showAngelSong(res.response)
              }
            });
          }

          defer.resolve(useful_data);
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getSecondItem] reject');
          console.log(textStatus);

          let useful_data = { textStatus: textStatus, body: null };
          if (textStatus !== 'abort') {
            useful_data = Object.assign({
              body: {
                record: notFoundAngelSong()
              }
            });
          }

          defer.reject(useful_data);
        })
        .always(() => {
          console.log('[ApiClient getSecondItem] always');
          console.groupEnd('[ApiClient getSecondItem]');
          xhr[GET_SECOND_ITEM] = null;
        });

    }).promise();
  }
}

export default ApiClient;
