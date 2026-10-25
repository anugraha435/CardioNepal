/**
 * Test-set metrics reported in Chapter 4 of the thesis.
 *
 * No result values are bundled with this prototype. After completing Chapter 4, replace the
 * `null` entries below with the measured numbers (e.g. 0.874). Any metric left as `null` is
 * shown as "Not yet reported" in the Model & Data tab, so nothing is invented.
 *
 * Fill in `testSetSize`, `threshold` and `selectedModel` as well.
 */
export const REPORT = {
  testSetSize: 61,
  threshold: null,
  selectedModel: null,
  note: null // optional string shown under the tables, e.g. "95% bootstrap CIs in Table 4.2"
};

const empty = { rocAuc: null, prAuc: null, sensitivity: null, specificity: null, precision: null, f1: null, accuracy: null, brier: null, brierCalibrated: null };

export const METRICS = [
  { id: 'lr', name: 'Logistic Regression', ...empty },
  { id: 'dt', name: 'Decision Tree', ...empty },
  { id: 'rf', name: 'Random Forest', ...empty },
  { id: 'svm', name: 'Support Vector Machine', ...empty }
];
