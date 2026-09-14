# Ritme

A minimal, privacy-first typing trainer focused on accuracy, rhythm and deliberate practice.

Ritme started from the simplicity of traditional typing tests and expands on it with adaptive practice, keyboard guidance, multilingual typing, numpad training and local progress tracking — without turning the interface into a dashboard.

**No account. No tracking. No backend. No build step.**

---

## Features

- Timed typing tests: 15s, 30s, 60s and 120s
- Standardized 60-second benchmark mode
- Word tests in multiple languages
- Numbers-only and numpad training
- Capitalization and punctuation practice
- Custom text mode
- Adaptive practice based on weak keys and letter combinations
- On-screen keyboard guidance
- Finger-color training
- QWERTY, QWERTZ and AZERTY layouts
- WPM, CPM, KPH and accuracy metrics
- Keystroke accuracy separate from final-text accuracy
- Consistency and error analysis
- Personal benchmarks and progress charts
- Unlimited practice mode without saving a score
- NL / ENG / DE interface
- Light and dark mode
- JSON backup and CSV export
- Fully local browser storage

---

## Philosophy

Most typing tests answer one question:

> How fast can you type?

Ritme is built around a broader one:

> How well do you type, where do you lose speed, and how can you improve?

The interface deliberately stays minimal. Advanced functionality only appears when it is relevant.

**Accuracy first. Speed follows.**

---

## Screenshots

_Add screenshots here._

Suggested:

```text
screenshots/
├── typing.png
├── results.png
├── practice.png
└── progress.png
```

---

## Run locally

Ritme uses plain HTML, CSS and JavaScript.

No npm install, package manager or build process is required.

```bash
git clone https://github.com/fdwind1991/ritme.git
cd ritme
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly, although a local web server provides more predictable browser-storage behaviour.

---

## Project structure

```text
.
├── index.html
├── styles.css
├── app.js
├── data.js
├── LICENSE
├── THIRD_PARTY_NOTICES.md
├── README.md
```

### `index.html`
Application structure, dialogs and accessible markup.

### `styles.css`
The complete visual system, responsive layout, themes and animations.

### `app.js`
Typing engine, scoring, practice logic, charts, progress tracking and local storage.

### `data.js`
Translations, language datasets and embedded application data.

---

## Privacy

Ritme is designed to work without a backend.

- No analytics
- No trackers
- No account
- No external fonts
- No typing data sent to a server
- No full custom text stored in history

Settings, scores and aggregated typing statistics are stored locally in your browser.

History can be exported as JSON or CSV and individual tests can be removed at any time.

When hosted through GitHub Pages, GitHub may process ordinary web requests according to its own privacy policy.

---

## Progress & backups

Typing history is stored in the browser.

To move your progress between browsers or installations:

**Progress → Manage → Download backup · JSON**

Then import that file in the new installation.

JSON preserves more detailed test data than CSV.

---

## Standard mode

Ritme includes a versioned **Standard · 60s** mode intended for more consistent comparisons over time.

Standard mode fixes relevant test parameters so results from the same protocol version remain comparable.

Changes that materially affect the protocol should therefore be introduced as a new version rather than silently changing the existing one.

---

## Adaptive practice

Adaptive practice uses your typing history to identify weaker keys and letter combinations.

Practice material is then weighted toward those patterns while still drawing from the existing language datasets.

As performance improves, that weighting decreases.

The goal is not simply to generate harder text, but to spend more practice time where it is useful.

---

## Keyboard training

Ritme supports:

- US QWERTY
- German QWERTZ
- French AZERTY
- Numeric keypad training

Practice mode can display:

- the next key
- suggested finger
- opposite-hand Shift usage
- finger colors
- an on-screen keyboard

Finger assignments are instructional recommendations; Ritme cannot determine which physical finger you actually used.

---

## Scoring

Ritme separates two forms of accuracy.

### Final accuracy

Measures the correctness of the text that remains after corrections.

### Keystroke accuracy

Includes mistakes that were later corrected.

This makes it possible to distinguish:

> “I finished with perfect text”

from:

> “I typed it cleanly the first time.”

Ritme also reports WPM, CPM, KPH, raw speed, consistency, corrected errors and remaining errors.

Benchmarks are indicative and should not be interpreted as certified skill levels or population percentiles.

---

## Languages

### Interface

- Nederlands
- English
- Deutsch

### Typing datasets

Ritme contains multiple language datasets independent of the selected interface language.

---

## Credits

Concept and visual foundation:

[TypeSpeedTest.com](https://www.typespeedtest.com/)

Ritme is an independent implementation created to explore broader typing-test and training functionality.

It is **not affiliated with, sponsored by, maintained by or officially endorsed by TypeSpeedTest.com**.

Language datasets originate from the Monkeytype project. See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for attribution and source information.

---

## License

Ritme is distributed under the **GNU General Public License v3.0**.

See [`LICENSE`](LICENSE) for the full license text.

---

## Contributing

Issues and pull requests are welcome.

When changing scoring, standardized tests or typing datasets, please document changes carefully so existing result comparisons remain meaningful.
