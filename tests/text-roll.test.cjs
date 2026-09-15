'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const styles=fs.readFileSync(path.join(root,'styles.css'),'utf8');

test('new text sets roll into the typing viewport',()=>{
  assert.match(app,/function prepareTextRoll\(shouldAnimate\)/);
  assert.match(app,/current\.id='word-track-outgoing'/);
  assert.match(app,/incoming\.id='word-track'/);
  assert.match(app,/prepareTextRoll\(wasTypingView&&promptMode==='fresh'\)/);
  assert.match(styles,/\.word-track\.text-roll-out,\.word-track\.text-roll-in/);
  assert.match(styles,/@keyframes text-roll-out/);
  assert.match(styles,/@keyframes text-roll-in/);
});

test('text rolling respects reduced motion and cleans up old layers',()=>{
  assert.match(app,/prefers-reduced-motion: reduce/);
  assert.match(app,/textRollCleanup\?\.\(\)/);
  assert.match(app,/window\.setTimeout\(finish,520\)/);
  assert.match(styles,/text-roll-out \.42s/);
  assert.match(styles,/text-roll-in \.42s/);
});
