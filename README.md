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
* **Model performance tables are empty on purpose.** No results were supplied. Enter your measured Chapter 4 values in
  `src/data/metrics.js` (and set `REPORT.selectedModel`, `threshold`, `note`); the tab updates automatically and any
  value left as `null` is shown as "Not yet reported".
* No network calls, cookies, local storage or analytics are used; inputs stay in browser memory.
