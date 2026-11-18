import test from 'node:test';
import assert from 'node:assert/strict';
import { electricField, inductionCirculation, magneticCirculation, waveValue, wavelength } from '../src/physics.js';
test('positive and negative point charges produce outward and inward fields', () => {
  assert.deepEqual(electricField(2, 0, [{x:0,y:0,q:1}]), [0.25, 0]);
  assert.deepEqual(electricField(2, 0, [{x:0,y:0,q:-1}]), [-0.25, 0]);
});
test('Coulomb field obeys inverse square scaling and superposition', () => {
  const charges = [{x:-1,y:0,q:1},{x:1,y:0,q:-1}];
  assert.deepEqual(electricField(0,0,charges), [2,0]);
  assert.equal(electricField(2,0,[{x:0,y:0,q:1}])[0] / electricField(1,0,[{x:0,y:0,q:1}])[0], 0.25);
});
test('Faraday circulation opposes flux change and vanishes for steady flux', () => {
  assert.equal(inductionCirculation(2), -2);
  assert.equal(inductionCirculation(-2), 2);
  assert.ok(inductionCirculation(0) === 0);
});
test('conduction and displacement contributions have matching circulation signs', () => {
  assert.equal(magneticCirculation(1,0), magneticCirculation(0,1));
  assert.equal(magneticCirculation(1,-1), 0);
});
test('wave translates in +x with constant speed as frequency changes', () => {
  for (const f of [0.5,1,2]) {
    assert.ok(Math.abs(waveValue(0.4,0.2,f) - waveValue(0.2,0,f)) < 1e-10);
    assert.equal(f * wavelength(f), 1);
  }
});
