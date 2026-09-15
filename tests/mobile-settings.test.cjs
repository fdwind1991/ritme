'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const styles=fs.readFileSync(path.join(root,'styles.css'),'utf8');

test('mobile test settings use one accessible collapse',()=>{
  assert.match(html,/id="mobile-settings"/);
  assert.match(html,/id="mobile-settings-toggle"/);
  assert.match(html,/id="mobile-settings-content"/);
  assert.match(html,/aria-controls="mobile-settings-content" aria-expanded="false"/);
  assert.match(app,/mobile-settings-toggle'\)\.onclick/);
  assert.match(app,/settingsPanel\.classList\.toggle\('is-collapsed'\)/);
});

test('mobile settings collapse uses only a minimal arrow',()=>{
  assert.match(html,/class="control-group mobile-duration-group"/);
  assert.match(styles,/@media\(max-width:600px\)[\s\S]*\.mobile-settings-toggle::before/);
  assert.match(styles,/\.mobile-settings-content \.duration-group\s*\{\s*display:none;\s*\}/);
  assert.match(styles,/border-right:1px solid currentColor; border-bottom:1px solid currentColor/);
  assert.match(styles,/\.mobile-settings\.is-collapsed \.mobile-settings-content\s*\{\s*display:none;\s*\}/);
  assert.match(styles,/\.mobile-settings-content\s*\{\s*display:contents;\s*\}/);
});
