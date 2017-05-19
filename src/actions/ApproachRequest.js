// @flow
import MockApiClient from '../services/MockApiClient';

export default class ApproachRequest {
  static fetchDeparture() {
    return MockApiClient.fetchDepartureData().then(res => {

      return res;
    });
  }
}
