import $ from 'jquery';

let xhr = null;
function validateXHR() {
  console.log('[validateXHR]');
  if (xhr) {
    if (0 < xhr.readyState && xhr.readyState < 4) {
      console.log('  > abort!');
      xhr.abort();
    }
  }
}

export function forceAbort() {
  if (xhr) {
    console.log('Abort!');
    xhr.abort();
  } else {
    console.log('A..あれ');
  }
}

export function getFirst() {
  console.group('[ApiAction] getFirst()');
  validateXHR();

  let opt = {
    url: '/ajax/item',
    method: 'GET'
  };

  return $.Deferred((defer) => {

    xhr = $.ajax(opt)
      .done((res, textStatus, jqXHR) => {
        console.log('[in defer] done');
        let useful_data = {
          'idol': 'null',
          'name': 'null',
          'age': 0
        };

        if (res.status === 0) {
          useful_data = {
            'idol': res.response.name,
            'name': '双葉 杏',
            'age': 17
          };
          defer.resolve(useful_data);
        } else {
          defer.reject(useful_data);
        }
      })
      .fail((jqXHR, textStatus, err) => {
        console.log('[in defer] fail');
        defer.reject({'abababa_msg': 'abababababa'});
      })
      .always(() => {
        console.log('[in defer] always');
        console.groupEnd('[ApiAction] getFirst()');
        xhr = null;
      });

  }).promise();
}

export function getSecond() {
  console.group('[ApiClient] getSecond()');
  validateXHR();

  let opt = {
    url: '/ajax/second-item',
    method: 'GET'
  };

  return $.Deferred((defer) => {

    xhr = $.ajax(opt)
      .done((res, textStatus, jqXHR) => {

        console.log('[in defer] done');
        let useful_data = {
          'cd_title': 'unknown',
          'cd_category': 'unknown'
        };
        if (res.status === 0) {
          useful_data = {
            'cd_title': res.response.title,
            'cd_category': res.response.category
          };

          defer.resolve(useful_data);
        } else {
          defer.reject(useful_data);
        }
      })
      .fail((jqXHR, textStatus, err) => {
        console.log('[in defer] fail');

        let reject_data = {
          textStatus: textStatus
        };
        if (textStatus !== 'abort') {
          reject_data = Object.assign(reject_data, {
            'cd_title': 'わかんない',
            'cd_category': '不明'
          });
        }

        defer.reject(reject_data);
      })
      .always(() => {
        console.log('[in defer] always');
        console.groupEnd('[ApiClient] getSecond()');
        xhr = null;
      });

  }).promise();

}

export function getThree() {
  validateXHR();
}
