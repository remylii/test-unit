import test from 'ava';
import ApproachRequest from '../src/actions/ApproachRequest';

test('ApproachRequest#fetchDeparture returns 0 status', async t => {
  const result = await ApproachRequest.fetchDeparture();

  t.is(result.status, 0);
});
