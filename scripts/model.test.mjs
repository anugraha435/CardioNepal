import { FEATURES, REFERENCE_PROFILE, EXAMPLES, validate, score, BASE_LOGIT } from '../src/lib/model.js';
import assert from 'node:assert/strict';
const ref = score(REFERENCE_PROFILE);
assert.ok(Math.abs(ref.logit - BASE_LOGIT) < 1e-9, 'reference profile returns base value');
assert.ok(Math.abs(ref.baseProbability - 139 / 303) < 1e-9);
for (const ex of EXAMPLES) {
  const v = validate(ex.values); assert.ok(v.valid, ex.id + ' valid');
  const s = score(ex.values);
  const sum = s.contributions.reduce((a, c) => a + c.contribution, 0);
  assert.ok(Math.abs(s.baseLogit + sum - s.logit) < 1e-9, 'additivity');
  console.log(ex.id, s.probability.toFixed(3));
}
assert.ok(!validate({ ...REFERENCE_PROFILE, age: '17' }).valid);
assert.ok(!validate({ ...REFERENCE_PROFILE, ca: '1.5' }).valid);
assert.ok(!validate({ ...REFERENCE_PROFILE, chol: '' }).valid);
assert.ok(validate({ ...REFERENCE_PROFILE, age: '90' }).warnings.age);
assert.equal(FEATURES.length, 13);
console.log('model tests passed');
