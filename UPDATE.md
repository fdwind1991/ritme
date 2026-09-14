# Ritme 3.2 · code and expanded word lists

Replace **index.html, styles.css, app.js and data.js together**. Add the included
`licenses/` directory and replace `THIRD_PARTY_NOTICES.md`. Keep your own README.
No build step or runtime library is added. This archive does not change the
live site or push anything to GitHub.

## Code

Choose **Code**, then Python, HTML, CSS or JavaScript. The language selector is
independent of the NL / ENG / DE interface. The surface retains the existing
minimal styling, with line numbers and quiet whitespace markers.

- 28 short, source-attributed examples, sampled as complete fragments.
- Preserve case, symbols, every space and newlines. There is no code execution,
  autocomplete or autoindent. Use **Enter** for a newline and spaces for
  indentation. **Tab** remains ordinary keyboard navigation.
- Live average WPM and keystroke accuracy; time spent correcting or pausing is
  included. Timed sessions are saved using a separate code profile.
- **∞** has no time limit. Stop gives a temporary session overview; it never
  enters history, records or history exports.
- Optional keyboard guidance lives behind **ⓘ**. Aided sessions are compared
  separately. Code results are not compared against the prose typing benchmark.
- Code metadata survives JSON backup and CSV export/import. Existing modes and
  local-storage keys are preserved.

This is typing practice using published code fragments, not a programming
course. Snippets may recur; the bank is intentionally small and inspectable.

## Word lists

The default for free word tests and word practice is now **Expanded**. Under
**ⓘ → Word list** you can return to **Basic**. Extended words are from fixed
Faker 40.1.2 datasets combined with the original Monkeytype lists, normalized
and deduplicated. These are not certified frequency levels or school curricula.

| Language | Original items | Expanded words |
| --- | ---: | ---: |
| Nederlands | 199 | 1,058 |
| English | 200 | 974 |
| Deutsch | 200 | 578 |
| Français | 174 | 1,388 |
| Español | 197 | 1,025 |
| Italiano | 199 | 1,216 |
| **Total** | **1,169** | **6,239** |

**Standard v1 and its six original fingerprints are unchanged.** Expanded tests
have their own dataset version/fingerprint and progress group, so they do not
silently replace old baselines. Row drills do not receive word-list metadata.
The previous infinite-practice live feedback and temporary summaries remain.

## Checks

With Node.js already installed (no packages required):

```sh
node --check app.js
node --check data.js
node --test tests/*.test.cjs
```

19 engine/data tests pass, including line breaks, spaces, correction accounting,
long-session compaction, original Standard v1 hashes and corpus source metadata.
Python snippets were also parsed with Python's standard `ast` parser.

73 browser checks were performed in an isolated Chromium DOM fixture: all four
code choices, keyboard Enter events, JSON/CSV round-trips, existing timed modes,
infinite summaries, guidance, translations and 320/390/768/1440px layouts.
Local storage used an in-memory test adapter. These checks do not certify the
live deployment, native browser persistence, accessibility or every browser.

See **THIRD_PARTY_NOTICES.md** and **licenses/** for source terms.

Optional browser fixture: `tests/browser-fixture.py` requires Python Playwright and Chromium for development tests only. Set `CHROMIUM_PATH` to an existing Chromium executable, or use Playwright’s installed Chromium. It is not loaded by the app.
