import { showMyAngel, notFoundMyAngel } from '../components/show-my-angel';

let headers = new Headers();
headers.append('Content-Type', 'application/json');

class ApiClient {
  static getItem() {
    const url = '/ajax/item';
    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      let html = '';
      if (response.ok) {
        html = response.json().then(ret => {
          if (ret.status === 0) {
            return showMyAngel(ret.response);
          } else {
            return 'unko';
          }
        });

      } else {
        console.log('Network response was not ok.');
        html = notFoundMyAngel();
      }

      return html;
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      console.dir(error);
    });
  }
}


export default ApiClient;
