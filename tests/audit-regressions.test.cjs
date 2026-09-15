'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

test('audit storage handling keeps settings, history and records separate',()=>{
  assert.match(app,/const storageStatus\s*=\s*\{settings:true,history:true,records:true\}/);
  assert.match(app,/let historyDirty\s*=\s*false/);
  assert.match(app,/function persistHistory\(next\)/);
  assert.match(app,/event\.key===null/);
  assert.match(app,/const RECORDS_KEY\s*=\s*'folkert-type-records-v1'/);
});

test('audit prompt and overflow fixes preserve code lines and bound rendering',()=>{
  assert.match(app,/function updateAccessiblePrompt\(\)/);
  assert.match(app,/words\.map\(word=>word\.text\)\.join\('\\n'\)/);
  assert.match(app,/const visibleExtras=extraInput\.slice\(-256\)/);
  assert.match(css,/overflow-wrap:anywhere/);
  assert.match(css,/\.code-active \.typing-viewport \{ font-size:var\(--type-size\)/);
});

test('audit validation, backup choice and help tabs are explicit',()=>{
  assert.match(app,/Array\.isArray\(r\.practiceKeys\)/);
  assert.match(app,/globalThis\.confirm\?\./);
  assert.match(app,/backupHistory\(\).*version:4/s);
  assert.match(app,/ArrowRight|ArrowLeft/);
  assert.match(html,/aria-label="Helpsecties"/);
  assert.match(html,/data-help-tab="typing"[^>]*tabindex="0"/);
  assert.match(html,/data-help-tab="scores"[^>]*tabindex="-1"/);
});
