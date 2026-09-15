/* Run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');

test('duration changes reuse the existing prompt without rolling it out',()=>{
  assert.match(app,/function promptShapeKey\(config\)/);
  assert.match(app,/function newTest\(\{promptMode='fresh'\}=\{\}\)/);
  assert.match(app,/prepareTextRoll\(wasTypingView&&promptMode==='fresh'\)/);
  assert.match(app,/canReusePrompt&&promptMode==='same'\s*\? previousWords/);
  assert.match(app,/persistSettings\(\);newTest\(\{promptMode:'same'\}\)/);
});

test('capital changes transform the existing prompt instead of sampling new words',()=>{
  assert.match(app,/function transformPromptCapitalization\(words,config\)/);
  assert.match(app,/if\(!usesCapitalization\(config\)\)return normalized/);
  assert.match(app,/canReusePrompt&&promptMode==='capitals'\s*\n?\s*\?/);
  assert.match(app,/newTest\(\{promptMode:'capitals'\}\)/);
  assert.match(app,/toLocaleLowerCase\(config\.language\)/);
});

test('structural setting changes continue to use a fresh prompt',()=>{
  assert.match(app,/language.*persistSettings\(\);newTest\(\);/s);
  assert.match(app,/punctuation.*persistSettings\(\);newTest\(\);/s);
  assert.match(app,/mix-numbers-btn.*persistSettings\(\);newTest\(\);/s);
});
