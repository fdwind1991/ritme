/* UI structure and native input fallback regressions. No dependencies. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';globalThis.data=RITME_DATA;',ctx);
function inputFixture(code=true){
 const handlers={},typed=[],erased=[],capture={value:'',addEventListener:(type,fn)=>handlers[type]=fn};
 const context={composing:false,session:{config:{}},$:()=>capture,isCode:()=>code,insertText:x=>typed.push(x),eraseInput:x=>erased.push(!!x),toast:()=>{},translate:x=>x};
 const before=app.slice(app.indexOf("$('capture').addEventListener('beforeinput',"),app.indexOf("$('capture').addEventListener('paste',"));
 const input=app.slice(app.indexOf("$('capture').addEventListener('input',"),app.indexOf("document.addEventListener('keydown',event=>"));
 vm.runInNewContext(before+'\n'+input,context);
 return {handlers,typed,erased,capture};
}
test('one activity selector contains all exercises; legacy selector is removed',()=>{
 assert.equal((html.match(/id="word-activity"/g)||[]).length,1);
 assert.ok(!html.includes('id="practice-lesson"'));
 for(const value of ['free','standard','practice','practice:words','practice:home','practice:top','practice:bottom','practice:letters','practice:shift','practice:digits','practice:weak'])assert.ok(html.includes('value="'+value+'"'),value);
 assert.ok(html.includes('data-i18n-label="practice.mode"'));
 assert.ok(!app.includes("$('practice-lesson')"));
});
test('tutorial and compact labels are fully translated',()=>{
 for(const key of Object.keys(ctx.data.messages).filter(k=>k.startsWith('code.tutorial.')||k.startsWith('activity.lesson.')))
  for(const lang of ['nl','en','de'])assert.ok(ctx.data.messages[key][lang],key+' '+lang);
 assert.ok(html.includes('id="code-tutorial-dialog"'));
 assert.ok(app.includes("$('code-tutorial-example').textContent="));
});
test('cancelable mobile Enter is handled once without keydown',()=>{
 const f=inputFixture();let prevented=false;
 f.handlers.beforeinput({inputType:'insertLineBreak',cancelable:true,preventDefault:()=>prevented=true});
 assert.ok(prevented);assert.deepEqual(f.typed,['\n']);
});
test('noncancelable mobile Enter is handled only on input',()=>{
 const f=inputFixture();f.handlers.beforeinput({inputType:'insertParagraph',cancelable:false});
 assert.deepEqual(f.typed,[]);f.capture.value='\n';f.handlers.input({inputType:'insertParagraph'});
 assert.deepEqual(f.typed,['\n']);assert.equal(f.capture.value,'');
});
test('noncancelable mobile deletion falls back exactly once',()=>{
 const f=inputFixture();f.handlers.beforeinput({inputType:'deleteContentBackward',cancelable:false});
 assert.deepEqual(f.erased,[]);f.handlers.input({inputType:'deleteContentBackward'});
 assert.deepEqual(f.erased,[false]);
});
test('noncancelable automatic replacement is not accepted as typed text',()=>{
 const f=inputFixture();f.capture.value='autocorrect';f.handlers.input({inputType:'insertReplacementText'});
 assert.deepEqual(f.typed,[]);assert.equal(f.capture.value,'');
});
