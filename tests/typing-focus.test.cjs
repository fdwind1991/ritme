/* Run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');

test('typing restores textarea focus after accidental focus loss',()=>{
  assert.match(app,/function typingViewCanOwnFocus\(\)/);
  assert.match(app,/function scheduleTypingFocus\(\)/);
  assert.match(app,/document\.hasFocus\?\.\(\)===false/);
  assert.match(app,/typingViewCanOwnFocus\(\)&&!isTypingControl\(event\.relatedTarget\)/);
});

test('typing keeps the first key when focus is elsewhere',()=>{
  assert.match(app,/document\.addEventListener\('keydown',restoreTypingKey,true\)/);
  assert.match(app,/if\(event\.key==='Tab'&&isCode\(session\?\.config\)\)/);
  assert.match(app,/if\(event\.key==='Backspace'\)/);
  assert.match(app,/if\(event\.key\.length===1\)/);
  assert.match(app,/insertText\(event\.key\)/);
});

test('typing focus exceptions preserve intentional control and overlay interaction',()=>{
  assert.match(app,/button,a,input,select,textarea,summary,\[contenteditable="true"\],dialog,\.test-info-panel,\.custom-select-menu/);
  assert.match(app,/function typingKeyOwnedByControl\(event\)/);
  assert.match(app,/target\.closest\?\.\('dialog,\.test-info-panel,\.custom-select-menu,input,textarea,select,\[contenteditable="true"\]'\)/);
  assert.match(app,/if\(typingViewCanOwnFocus\(\)\)focusTyping\(\);/);
});
