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
  assert.match(app,/function updateAccessiblePrompt\(force=false\)/);
  assert.match(app,/words\.map\(word=>word\.text\)\.join\('\\n'\)/);
  assert.match(app,/const MAX_VISIBLE_EXTRAS\s*=\s*256/);
  assert.match(app,/const visibleExtras=extraInput\.slice\(-MAX_VISIBLE_EXTRAS\)/);
  assert.match(app,/let accessiblePromptStart=-1/);
  assert.match(app,/if\(!session\|\|\(!force&&accessiblePromptStart===session\.index\)\)return/);
  assert.match(css,/overflow-wrap:anywhere/);
  assert.match(css,/\.word-track \{ position:relative; width:100%; min-width:0;/);
  assert.match(css,/\.word \{ display:inline-block; max-width:100%; max-inline-size:100%;/);
  assert.match(css,/\.code-active \.typing-viewport \{ font-size:var\(--type-size\)/);
  assert.match(css,/\.code-active \.typing-viewport \{ height:var\(--code-viewport-height,330px\); overflow-x:hidden;/);
  assert.match(css,/\.code-active \.word-track \{ width:100%; min-width:0;/);
  assert.match(css,/\.code-active \.code-line \{ box-sizing:border-box; width:100%; white-space:pre-wrap;/);
  assert.doesNotMatch(css,/\.code-active \.typing-viewport \{[^}]*overflow-x:auto/);
});

test('audit validation, backup choice and help tabs are explicit',()=>{
  assert.match(app,/Array\.isArray\(r\.practiceKeys\)/);
  assert.match(app,/globalThis\.confirm\?\./);
  assert.match(app,/backupHistory\(\).*version:4/s);
  assert.match(app,/ArrowRight|ArrowLeft/);
  assert.match(html,/aria-label="Helpsecties"/);
  assert.match(html,/aria-live="polite"[^>]*id="accessible-prompt"/);
  assert.match(html,/data-help-tab="typing"[^>]*tabindex="0"/);
  assert.match(html,/data-help-tab="scores"[^>]*tabindex="-1"/);
});

test('audit layout keeps mobile-only duration controls out of desktop flow',()=>{
  assert.match(html,/class="control-group mobile-duration-group"/);
  assert.match(css,/\.control-group\.mobile-duration-group\s*\{\s*display:none;\s*\}/);
  assert.match(css,/\.control-group\.mobile-duration-group\s*\{\s*display:flex;[\s\S]*?width:100%/);
});

test('audit overlays stay above content and communicate disabled actions',()=>{
  assert.match(css,/\.manage-menu\s*\{[^}]*z-index:2000;/s);
  assert.match(css,/\.manage-popover\s*\{[^}]*z-index:2147483000;/s);
  assert.match(css,/\.custom-select-menu\s*\{[^}]*z-index:2147483647;/s);
  assert.match(css,/\.manage-popover button:disabled\s*\{[^}]*opacity:\.72;/s);
  assert.match(css,/dialog::backdrop\s*\{[^}]*#352a2152;/s);
});

test('audit result explains sparse rhythm samples and compacts mobile detail',()=>{
  assert.match(html,/data-i18n="result\.sparse\.note"[^>]*id="result-sample-note"/);
  assert.match(app,/result-sample-note.*Number\(result\.attempts\|\|0\)<20/s);
  assert.match(app,/weak-spots'\)\.open=!\(window\.matchMedia\?\./);
});

test('audit document declares a local favicon',()=>{
  assert.match(html,/<link rel="icon" href="\.\/favicon\.svg" type="image\/svg\+xml"\/>/);
  assert.match(fs.readFileSync(path.join(root,'favicon.svg'),'utf8'),/<svg[\s\S]*viewBox="0 0 32 32"/);
});
