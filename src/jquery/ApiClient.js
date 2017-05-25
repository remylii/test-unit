import $ from 'jquery';
import { fetchItem, fetchSecondItem } from './serviceActions';

import { showMyAngel, notFoundMyAngel } from '../components/show-my-angel';
import { showAngelSong, notFoundAngelSong } from '../components/angel-song';
import { loadingComponent } from '../components/loading';

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

  /**
   * @name send
   * @return {object} useful_data - {textStatus: string, body: any}
   */
  static send(textStatus, data = null) {
    let useful_data = {
      textStatus: textStatus,
      body: null
    };

    return Object.assign(useful_data, {
      body: data
    });
  }

  /**
   * @return {object} response - {textStatus: string, body: any}
   */
  static getItem() {
    validateXHR(GET_ITEM);

    return $.Deferred((defer) => {
      console.group('[ApiClient getItem]');
      xhr[GET_ITEM] = fetchItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getItem] resolve');

          let body = { angel: null };
          if (res.status === 0) {
            body = {
              angel: showMyAngel(res.response)
            };
          }

          defer.resolve( this.send(textStatus, body) );
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getItem] reject');
          console.log(textStatus);

          let body = { angel: null };
          if (textStatus === 'abort') {
            body = {
              angel: loadingComponent()
            };
          } else {
            body = {
              angel: notFoundMyAngel()
            };
          }

          defer.reject( this.send(textStatus, body) );
        })
        .always(() => {
          console.log('[ApiClient getItem] always');
          console.groupEnd('[ApiClient getItem]');
          xhr[GET_ITEM] = null;
        });

    }).promise();
  }

  /**
   * @return {object} response - {textStatus: string, body: any}
   */
  static getSecondItem() {
    validateXHR(GET_SECOND_ITEM);

    return $.Deferred((defer) => {
      console.group('[ApiClient getSecondItem]');
      xhr[GET_SECOND_ITEM] = fetchSecondItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getSecondItem] resolve');

          let body = { record: null };
          if (res.status === 0) {
            body = {
              record: showAngelSong(res.response)
            }
          }

          defer.resolve( this.send(textStatus, body) );
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getSecondItem] reject');
          console.log(textStatus);

          let body = { record: null };
          if (textStatus === 'abort') {
            body = {
              record: loadingComponent()
            };
          } else {
            body = {
              record: notFoundAngelSong()
            };
          }

          defer.reject( this.send(textStatus, body) );
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
