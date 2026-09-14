/* Regression tests for practice feedback. Run: node --test tests/practice-feedback.test.cjs */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the actual engine class without a browser, generator or storage.
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = source.indexOf('class TypingSession {');
const end = source.indexOf('/* ========================= App state', start);
assert.ok(start >= 0 && end > start, 'Typing engine must be present');
const context = vm.createContext({
  performance, structuredClone, Date,
  round: (n, d = 2) => Number(n.toFixed(d)),
  isInfinitePractice: c => c?.mode === 'practice' && c.practiceInfinite === true,
  normalizedToken: s => s.toLowerCase().normalize('NFC'),
  usesCapitalization: c => !!c.capitals,
  layoutId: c => c.keyboardLayout || 'us',
  isStandard: () => false,
  isAdaptive: () => false
});
vm.runInContext(source.slice(start, end) + '\nglobalThis.Session = TypingSession;', context);
const Session = context.Session;
const config = infinite => ({
  mode: 'practice', language: 'nl', duration: 60, practiceInfinite: infinite,
  keyboardLayout: 'us', practiceGuideVersion: 1, practiceLesson: 'home', practiceAided: true
});
function closeEnough(a, b, key = '') {
  assert.ok(Math.abs(a - b) < 1e-7, `${key}: ${a} != ${b}`);
}
function compact(session, force = false) {
  const cut = session.index > 96 ? session.index - 24 : 0;
  if (!cut && !force && session.presses.length < 4096) return false;
  if (cut) { session.words.splice(0, cut); session.index -= cut; }
  const keep = new Set(), omissions = new Set();
  for (const word of session.words) {
    word.input.forEach(p => keep.add(p));
    if (word.space) keep.add(word.space);
    if (word.omission) omissions.add(word.omission);
  }
  session.archivePracticeRecords(keep, omissions);
  return true;
}

test('a corrected typo lowers first-pass accuracy, not final accuracy', () => {
  const s = new Session(config(true), ['asdf', 'jkl;']);
  s.insert('z', 1000); s.erase(false, 1050);
  [...'asdf '].forEach((c, i) => s.insert(c, 1100 + i * 100));
  const r = s.finish(60, 'practice');
  assert.equal(r.correct, 5); assert.equal(r.attempts, 6);
  assert.equal(r.wpm, 1); assert.equal(r.cpm, 5);
  assert.equal(r.accuracy, 100); assert.equal(r.keystrokeAccuracy, 83.33);
  assert.equal(r.typos, 1); assert.equal(r.corrected, 1); assert.equal(r.uncorrected, 0);
  assert.equal(r.ephemeral, true); assert.equal(r.practiceInfinite, true);
  assert.equal(r.plannedDuration, null); assert.equal(r.samples.length, 0);
});

test('omitted letters survive retirement of old words', () => {
  const s = new Session(config(true), ['asdf', 'jkl;']);
  [...'as '].forEach((c, i) => s.insert(c, 1000 + i * 100));
  const before = s.metric(60);
  s.words.splice(0, 1); s.index--;
  compact(s, true);
  const after = s.metric(60);
  for (const key of Object.keys(before)) closeEnough(before[key], after[key], key);
  assert.equal(after.missing, 2); assert.equal(after.correct, 3); assert.equal(after.accuracy, 60);
});

test('compaction does not count erased characters as retained output', () => {
  const s = new Session(config(true), ['asdf']);
  for (let i = 0; i < 4200; i++) {
    s.insert('z', 1000 + i * 20); s.erase(false, 1010 + i * 20);
  }
  compact(s, true);
  const m = s.metric(84);
  assert.equal(m.attempts, 4200); assert.equal(m.typos, 4200); assert.equal(m.corrected, 4200);
  assert.equal(m.retained, 0); assert.equal(m.wpm, 0); assert.equal(s.presses.length, 0);
});

test('long free practice matches an unpruned timed reference', () => {
  const words = Array.from({length: 2200}, () => 'asdf');
  const a = new Session(config(true), words), b = new Session(config(false), words);
  let now = 1000, archives = 0;
  const insert = c => {a.insert(c, now); b.insert(c, now); now += 70;};
  const erase = word => {a.erase(!!word, now); b.erase(!!word, now); now += 70;};
  for (let i = 0; i < 1800; i++) {
    if (i % 7 === 0) {insert('z'); erase(false);}
    const text = i % 11 === 0 ? 'as ' : i % 13 === 0 ? 'axdf ' : 'asdf ';
    for (const c of text) insert(c);
    if (compact(a)) archives++;
    const am = a.metric(a.elapsed(now)), bm = b.metric(b.elapsed(now));
    for (const key of Object.keys(am)) closeEnough(am[key], bm[key], key);
  }
  assert.ok(archives > 15); assert.ok(a.presses.length < 1000);
  const t = a.elapsed(now) + 300.45; // Include an idle interval and a partial bin.
  const ar = a.finish(t, 'practice'), br = b.finish(t, 'manual');
  for (const key of ['wpm','raw','cpm','accuracy','keystrokeAccuracy','typos','corrected','uncorrected','attempts','consistency']) {
    closeEnough(ar[key], br[key], key);
  }
  assert.equal(ar.samples.length, 0); assert.equal(ar.errors.length, 0);
  assert.ok(br.samples.length > 0); assert.equal(br.ephemeral, undefined);
});

test('very long idle periods need no per-second practice array', () => {
  const s = new Session(config(true), ['asdf']);
  s.insert('a', 1000);
  const r = s.finish(864000, 'practice');
  assert.equal(r.attempts, 1); assert.equal(r.correct, 1);
  assert.ok(Number.isFinite(r.consistency));
  assert.equal(s.samples.length, 0);
});
