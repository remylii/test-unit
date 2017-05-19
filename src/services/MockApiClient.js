const LATENCY = 200;

export default class MockApiClient {
  static request(response) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response);
      }, LATENCY);
    });
  }

  // wait
  static wait() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, LATENCY);
    });
  }

  // fetchDeparture
  static fetchDepartureData() {
    const data = require('./departure_data');
    return this.request(data);
  }
}
