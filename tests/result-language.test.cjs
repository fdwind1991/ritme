/* Timer UX and browser-language defaults. Run: node --test tests/*.test.cjs */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'app.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const start=source.indexOf('function preferredInterfaceLanguage(');
const end=source.indexOf('/* ======================== Interface languages',start);
assert.ok(start>=0&&end>start);
function setup(navigator,saved={}){
 const context=vm.createContext({navigator,LANGUAGES:['nl','en','de','fr','es','it'],readLocal:()=>saved,SETTINGS_KEY:'test'});
 vm.runInContext(source.slice(start,end)+';globalThis.output=settings;globalThis.detect=preferredInterfaceLanguage;',context);
 return context;
}
test('first supported preference wins, including regional/case variants',()=>{
 for(const [languages,expected] of [[['en-US'],'en'],[['en-GB'],'en'],[['nl-NL'],'nl'],[['nl-BE'],'nl'],[['DE-de'],'de'],[['fr-FR','nl-NL','en'],'nl'],[['es','de-AT'],'de'],[['en','nl'],'en'],[[' nl_NL '],'nl']]){
  const {output}=setup({languages});assert.equal(output.uiLanguage,expected);
  assert.equal(output.language,expected);assert.equal(output.standardLanguage,expected);
 }
});
test('unsupported or absent browser preferences fall back to English',()=>{
 for(const navigator of [undefined,{}, {languages:[]},{languages:['fr','it']},{languages:[null,42,'']}])assert.equal(setup(navigator).output.uiLanguage,'en');
});
test('navigator.language is used when the language list is absent or empty',()=>{
 for(const navigator of [{language:'nl-NL'},{languages:[],language:'de-DE'}])assert.equal(setup(navigator).output.uiLanguage,navigator.language.slice(0,2));
});
test('saved UI and word languages are independent and never overwritten by detection',()=>{
 const saved={uiLanguage:'de',language:'fr',standardLanguage:'it',duration:30,numbers:true,theme:'dark',keyboardLayout:'us'};
 const {output}=setup({languages:['en-US']},saved);
 for(const [key,value] of Object.entries(saved))assert.equal(output[key],value,key);
 assert.equal(setup({languages:['nl']},{language:'en'}).output.language,'en');
});
test('malformed or legacy settings do not prevent browser language defaults',()=>{
 for(const saved of [null,{},[],{uiLanguage:'unknown',language:'bogus'}]){
  const {output}=setup({languages:['nl-BE']},saved);assert.equal(output.uiLanguage,'nl');assert.equal(output.language,'nl');
 }
});
test('result focus is non-interactive, not the restart button',()=>{
 assert.match(html,/<section[^>]*id="results-view"[^>]*tabindex="-1"/);
 const result=source.slice(source.indexOf('function showResult('),source.indexOf('/* ======================= Indicative speed benchmarks'));
 assert.match(result,/\$\('results-view'\)\.focus/);
 assert.doesNotMatch(result,/\$\('again-btn'\)\.focus/);
});
test('result-region carry-over keys are prevented only on the region itself',()=>{
 let handler;const region={addEventListener:(_,fn)=>handler=fn};
 const a=source.indexOf("$('results-view').addEventListener('keydown',event=>{");
 const b=source.indexOf("$('typing-shell').addEventListener",a);assert.ok(a>=0&&b>a);
 vm.runInNewContext(source.slice(a,b),{$:()=>region});
 for(const key of [' ','Enter']){
  let prevented=false;handler({target:region,currentTarget:region,key,preventDefault:()=>prevented=true});assert.ok(prevented);
  prevented=false;handler({target:{tagName:'BUTTON'},currentTarget:region,key,preventDefault:()=>prevented=true});assert.equal(prevented,false);
 }
 for(const key of ['Tab','Escape','ArrowDown']){let prevented=false;handler({target:region,currentTarget:region,key,preventDefault:()=>prevented=true});assert.equal(prevented,false);}
});
