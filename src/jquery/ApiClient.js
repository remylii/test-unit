import $ from 'jquery';
import { fetchItem, fetchSecondItem } from './serviceActions';

const GET_ITEM = 'GET_ITEM';
const GET_SECOND_ITEM = 'GET_SECOND_ITEM';

let xhr = {
  'GET_ITEM': null,
  'GET_SECOND_ITEM': null
};

function validateXHR(key) {
  console.log('[validateXHR] :' + key);
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
   * @name rejectData
   * @var {string} textStatus
   * @return {object} reject_data - { status: number, textStatus: string, error: string }
   */
  static rejectData(textStatus, code = -1, err = '') {
    let reject_data = {
      status: -1,
      textStatus: '',
      error: ''
    };

    return Object.assign(reject_data, {
      status: code,
      textStatus: textStatus,
      error: err
    });
  }

  /**
   * @return {object} response - {}
   */
  static getItem() {
    validateXHR(GET_ITEM);

    return $.Deferred((defer) => {
      console.log('[ApiClient getItem]');
      xhr[GET_ITEM] = fetchItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getItem] resolve');

          let resolve_data = null;
          if (res.status === 0) {
            resolve_data = res.response;
          } else {

            defer.reject(textStatus, res.status, 'apiステータスエラー');
          }
          defer.resolve( resolve_data );
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getItem] reject');
          console.log(textStatus);

          defer.reject(this.rejectData(textStatus));
        })
        .always(() => {
          console.log('[ApiClient getItem] always');
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
      console.log('[ApiClient getSecondItem]');
      xhr[GET_SECOND_ITEM] = fetchSecondItem()
        .done((res, textStatus, jqXHR) => {
          console.log('[ApiClient getSecondItem] resolve');

          let resolve_data = null;
          if (res.status === 0) {
            resolve_data = res.response;
          } else {
            defer.reject(this.rejectData(textStatus, res.status, 'api error'));
          }

          defer.resolve(resolve_data);
        })
        .fail((jqXHR, textStatus, err) => {
          console.log('[ApiClient getSecondItem] reject');
          console.log(textStatus);

          defer.reject(this.rejectData(textStatus));
        })
        .always(() => {
          console.log('[ApiClient getSecondItem] always');
          xhr[GET_SECOND_ITEM] = null;
        });

    }).promise();
  }

  /**
   * when使う
   */
  static getBoth() {
    return $.Deferred((defer) => {
      $.when(this.getItem(), this.getSecondItem())
        .done((v1, v2) => {
          console.dir('[ApiClient getBoth] done');

          defer.resolve(v1, v2);
        })
        .fail((reject_data) => {
          console.log('[ApiClient getBoth] fail');

          defer.reject(reject_data);
        })
        .always(() => {
          console.log('[ApiClient getBoth] always');
        });
    }).promise();
  }
}

export default ApiClient;
