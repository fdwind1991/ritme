/* Run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const css=fs.readFileSync(path.join(__dirname,'..','polish.css'),'utf8');
const modal=css.slice(css.indexOf('/* Shared custom scrollbars'));
test('modal scrollbars reuse theme tokens without changing the page palette',()=>{
  assert.match(modal,/:where\(html, body, dialog, dialog \*, \.history-scroll, \.license-text, \.test-info-panel, \.custom-select-menu, textarea\) \{\s*scrollbar-width:thin;\s*scrollbar-color:var\(--muted\) var\(--bg\);/);
  assert.doesNotMatch(modal,/--[a-z-]+\s*:/);
  assert.doesNotMatch(modal,/#(?:[0-9a-f]{3,8})\b/i);
  assert.doesNotMatch(modal,/scrollbar-width:none|overflow(?:-y)?:hidden/);
});
test('modal scrollbars preserve native scrolling and platform accessibility',()=>{
  assert.match(modal,/:where\(html, \.history-scroll, \.license-text, dialog, \.test-info-panel\) \{\s*scrollbar-gutter:stable;\s*overscroll-behavior:contain;\s*\}/);
  assert.match(modal,/@supports selector\(::-webkit-scrollbar\)/);
  assert.match(modal,/:where\(html, body, dialog, dialog \*, \.history-scroll, \.license-text, \.test-info-panel, \.custom-select-menu, textarea\)::-webkit-scrollbar-thumb/);
  assert.match(modal,/border:2px solid var\(--bg\);\s*border-radius:999px/);
  assert.match(modal,/@media \(pointer:coarse\)/);
  assert.match(modal,/@media \(forced-colors:active\)\s*\{\s*:where\(html, body, dialog, dialog \*, \.history-scroll, \.license-text, \.test-info-panel, \.custom-select-menu, textarea\) \{/);
});

test('all visible scroll surfaces share the custom scrollbar treatment',()=>{
  for(const selector of ['\.history-scroll', '\.license-text', '\.custom-select-menu', 'textarea']) {
    assert.match(modal,new RegExp(selector));
  }
  assert.match(modal,/::-webkit-scrollbar-thumb:hover\s*\{\s*background:var\(--accent\);\s*\}/);
});

test('overlay chrome uses a complete border on Manage and About this test',()=>{
  const styles=fs.readFileSync(path.join(__dirname,'..','styles.css'),'utf8');
  assert.match(styles,/\.manage-popover\s*\{[^}]*border:1px solid var\(--line\);/s);
  assert.match(styles,/\.test-info-panel\s*\{[^}]*scrollbar-gutter:stable;/s);
});
