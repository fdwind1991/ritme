/* Run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const css=fs.readFileSync(path.join(__dirname,'..','polish.css'),'utf8');
const modal=css.slice(css.indexOf('/* Native modal scrollbars'));
test('modal scrollbars reuse theme tokens without changing the page palette',()=>{
  assert.match(modal,/dialog, dialog \*\s*\{\s*scrollbar-width:thin;\s*scrollbar-color:var\(--muted\) var\(--bg\);/);
  assert.doesNotMatch(modal,/--[a-z-]+\s*:/);
  assert.doesNotMatch(modal,/#(?:[0-9a-f]{3,8})\b/i);
  assert.doesNotMatch(modal,/scrollbar-width:none|overflow(?:-y)?:hidden/);
});
test('modal scrollbars preserve native scrolling and platform accessibility',()=>{
  assert.match(modal,/scrollbar-gutter:stable; overscroll-behavior:contain/);
  assert.match(modal,/@supports not \(scrollbar-color:auto\)/);
  assert.match(modal,/dialog::-webkit-scrollbar-thumb, dialog ::-webkit-scrollbar-thumb/);
  assert.match(modal,/@media \(pointer:coarse\)/);
  assert.match(modal,/@media \(forced-colors:active\)\s*\{\s*dialog, dialog \* \{ scrollbar-color:auto; scrollbar-width:auto; \}/);
});
