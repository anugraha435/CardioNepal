/**
 * Held-out test-set metrics reported in Chapter 5 of the thesis (n = 61).
 * Generated from results.json of the research pipeline (run_experiment.py); values are rounded to 3 decimals.
 * Sensitivity, specificity, precision, F1 and accuracy are at each model's pre-specified threshold,
 * chosen from training data only. Brier is for the uncalibrated output ('n/a' for the SVM, which has none);
 * brierCalibrated is for the final probabilities.
 */
export const REPORT = {
  testSetSize: 61,
  threshold: 'Per model: LR 0.211, DT 0.276, RF 0.288, SVM 0.312',
  selectedModel: null, // no single model is declared best: confidence intervals overlap (thesis Section 5.2.4)
  note: 'Thresholds are the largest values giving at least 0.90 sensitivity in out-of-fold training predictions. With only 61 test patients the 95% confidence intervals are wide (see thesis Table 5.6 and Table 5.7), and the differences among LR, RF and SVM are not statistically distinguishable. These figures describe the benchmark models, not the illustrative score on the Assessment tab.'
};

export const METRICS = [
  { id: 'lr', name: 'Logistic Regression', rocAuc: 0.958, prAuc: 0.940, sensitivity: 1.000, specificity: 0.636, precision: 0.700, f1: 0.824, accuracy: 0.803, brier: 0.086, brierCalibrated: 0.086 },
  { id: 'dt', name: 'Decision Tree', rocAuc: 0.922, prAuc: 0.910, sensitivity: 0.964, specificity: 0.576, precision: 0.659, f1: 0.783, accuracy: 0.754, brier: 0.134, brierCalibrated: 0.129 },
  { id: 'rf', name: 'Random Forest', rocAuc: 0.953, prAuc: 0.937, sensitivity: 1.000, specificity: 0.636, precision: 0.700, f1: 0.824, accuracy: 0.803, brier: 0.100, brierCalibrated: 0.100 },
  { id: 'svm', name: 'Support Vector Machine', rocAuc: 0.960, prAuc: 0.949, sensitivity: 0.964, specificity: 0.667, precision: 0.711, f1: 0.818, accuracy: 0.803, brier: 'n/a (no probability output)', brierCalibrated: 0.084 }
];
