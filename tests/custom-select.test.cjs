'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const styles=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

test('all select controls share the custom listbox implementation',()=>{
  const selectIds=[...html.matchAll(/<select[^>]+id="([^"]+)"/g)].map(match=>match[1]);
  assert.ok(selectIds.length>=10);
  assert.match(app,/document\.querySelectorAll\('select'\)/);
  assert.match(app,/wrapper\.className='custom-select'/);
  assert.match(app,/menu\.setAttribute\('role','listbox'\)/);
  assert.match(app,/trigger\.setAttribute\('aria-haspopup','listbox'\)/);
  assert.match(styles,/\.custom-select-menu\{/);
  assert.match(styles,/\.custom-select-option\[aria-selected="true"\]::before/);
});

test('custom selects support type-ahead and preserve native change events',()=>{
  assert.match(app,/function typeaheadCustomSelect\(select,key\)/);
  assert.match(app,/startsWith\(state\.typeahead\)/);
  assert.match(app,/setTimeout\(\(\)=>\{if\(state\.previewValue!==null\)commitCustomSelect\(select,state\.previewValue\);\},650\)/);
  assert.match(app,/if\(changed\)select\.dispatchEvent\(new Event\('change',\{bubbles:true\}\)\)/);
});

test('custom selects expose the expected keyboard interaction',()=>{
  assert.match(app,/event\.key==='ArrowDown'\|\|event\.key==='ArrowUp'/);
  assert.match(app,/event\.key==='Enter'\|\|event\.key===' '/);
  assert.match(app,/event\.key==='Escape'/);
  assert.match(app,/event\.key==='Tab'/);
});
