# CardioNepal

Client-side educational prototype for a thesis on explainable classification of heart-disease status
(UCI Heart Disease, Cleveland subset). **Not for clinical use.**

## Run
```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # serve the production build
npm test           # checks the scoring function (additivity, validation)
```

## Important
* The score is a **hand-specified illustrative formula** (`src/lib/model.js`). Its weights are not estimated from data and
  are not exported from a trained model. Edit `FEATURES[].f` there only if you intend to change the demonstration.
* **Model performance tables hold measured values.** The numbers in `src/data/metrics.js` come from the research pipeline (`run_experiment.py`, thesis Chapter 5) and are rounded to three decimals. They describe the benchmark models on 61 held-out patients, not the illustrative score on the Assessment tab. The SVM has no uncalibrated probability, so that cell reads "Not yet reported".
* No network calls, cookies, local storage or analytics are used; inputs stay in browser memory.
