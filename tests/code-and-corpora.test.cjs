/* Run with Node.js: node --test tests/*.test.cjs. No npm packages required. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),src=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx=vm.createContext({performance,structuredClone,Date,
 round:(n,d=2)=>Number(n.toFixed(d)),normalizedToken:s=>s.normalize('NFC').toLowerCase(),
 isInfinitePractice:c=>(c.mode==='practice'&&c.practiceInfinite)||(c.mode==='code'&&c.codeInfinite),
 usesCapitalization:()=>false,layoutId:c=>c.keyboardLayout||'us',isStandard:()=>false,isAdaptive:()=>false});
const start=src.indexOf('class TypingSession {'),end=src.indexOf('/* ========================= App state',start);
vm.runInContext(src.slice(start,end)+'\nglobalThis.CodeSession=CodeTypingSession;',ctx);
const Session=ctx.CodeSession;
const config=(infinite=false)=>({mode:'code',language:'python',duration:60,codeInfinite:infinite,codeCorpusFingerprint:'c'.repeat(64),codeAided:false,keyboardLayout:'us'});
function run(lines,text,infinite=false){const s=new Session(config(infinite),lines);let t=0;for(const ch of text){s.insert(ch,t);t+=100;}return s;}
const dataCtx=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+'\nglobalThis.data=RITME_DATA;',dataCtx);const data=dataCtx.data;
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
test('code preserves multiple spaces, newline and blank lines',()=>{
 const text='if x:\n    y = 2\n\n';const s=run(['if x:','    y = 2','','end'],text);
 assert.equal(s.index,3);const m=s.metric(10);assert.equal(m.attempts,text.length);assert.equal(m.correct,text.length);assert.equal(m.accuracy,100);assert.equal(m.wpm,text.length*1.2);
});
test('leading spaces are accepted instead of discarded',()=>{
 const s=run(['  x'], '  ');assert.equal(s.current.input.length,2);assert.equal(s.metric(1).correct,2);
});
test('early Enter records missing code characters; Backspace can restore line',()=>{
 const s=run(['abc','def'],'a\n');assert.equal(s.metric(1).missing,2);s.erase(false,1100);
 assert.equal(s.index,0);assert.equal(s.metric(1.2).missing,0);s.insert('b',1300);s.insert('c',1400);s.insert('\n',1500);
 assert.equal(s.metric(2).accuracy,100);assert.equal(s.metric(2).typos,1);
});
test('typo correction restores output accuracy but not first-pass accuracy',()=>{
 const s=run(['Foo'],'f');s.erase(false,100);s.insert('F',200);s.insert('o',300);s.insert('o',400);
 const m=s.metric(1);assert.equal(m.accuracy,100);assert.equal(m.keystrokeAccuracy,75);assert.equal(m.corrected,1);
});
test('Ctrl+Backspace removes a code token, not the full line',()=>{
 const s=run(['const result = value;'],'const result');s.erase(true,1500);assert.equal(s.current.input.map(x=>x.ch).join(''),'const ');
});
test('code is case sensitive and punctuation is not transformed',()=>{
 const s=run(['<div id="a">'],'<div id="a">');assert.equal(s.metric(2).accuracy,100);assert.equal(s.current.text,'<div id="a">');
});
test('code summary carries language, protocol and content fingerprint',()=>{
 const s=run(['x'],'x');const r=s.finish(60);assert.equal(r.codeVersion,'ritme-code-v1');assert.equal(r.codeCorpusFingerprint,'c'.repeat(64));assert.equal(r.language,'python');assert.equal(r.scoringVersion,'ritme-code-output-v1');
});
test('infinite code summary is ephemeral and has no per-second history',()=>{
 const s=run(['x'],'x',true);const r=s.finish(5000,'practice');assert.equal(r.ephemeral,true);assert.equal(r.codeInfinite,true);assert.equal(r.samples.length,0);assert.equal(r.plannedDuration,null);
});
test('infinite code compaction does not change lifetime totals',()=>{
 const text='  return value;\n';const lines=Array(400).fill('  return value;');const full=new Session(config(),lines),compact=new Session(config(true),lines);
 let time=0;
 for(let i=0;i<250;i++){
  for(const ch of text){full.insert(ch,time);compact.insert(ch,time);time+=10;}
  if(compact.index>60){const cut=compact.index-20;compact.words.splice(0,cut);compact.index-=cut;const keep=new Set(),omissions=new Set();for(const w of compact.words){for(const p of w.input)keep.add(p);if(w.space)keep.add(w.space);if(w.omission)omissions.add(w.omission);}compact.archivePracticeRecords(keep,omissions);}
 }
 const a=full.metric(time/1000),b=compact.metric(time/1000);for(const key of Object.keys(a))assert.ok(Math.abs(a[key]-b[key])<1e-8,key);
});
test('control characters are rejected instead of becoming invisible input',()=>{
 const s=new Session(config(),['x']);assert.equal(s.insert('\t',0),false);assert.equal(s.insert('\r',0),false);assert.equal(s.started,null);
});
test('coding mode maps Tab to four-space indentation',()=>{
 assert.match(src,/const CODE_TAB\s*=\s*' '\.repeat\(4\)/);
 assert.match(src,/event\.key==='Tab'&&isCode\(session\?\.config\)\)\{event\.preventDefault\(\);insertText\(CODE_TAB\);return;\}/);
});
test('Standard v1 original word-list hashes remain unchanged',()=>{
 const fingerprints=JSON.parse(src.match(/const STANDARD_CORPORA=(\{[^;]+\});/)[1]);
 for(const [lang,corpus] of Object.entries(data.lexicons)){assert.equal(sha(corpus.words.join('\n')),fingerprints[lang].sha256,lang);assert.equal(corpus.words.length,fingerprints[lang].count,lang);}
});
test('all six expanded lists are bigger, NFC-normalized and deduplicated',()=>{
 assert.equal(Object.keys(data.expandedLexicons).length,6);
 for(const [lang,corpus] of Object.entries(data.expandedLexicons)){
  assert.ok(corpus.words.length>data.lexicons[lang].words.length*2,lang);
  assert.equal(new Set(corpus.words).size,corpus.words.length,lang);
  assert.ok(corpus.words.every(w=>w===w.normalize('NFC')&&w===w.toLowerCase()&&/^\p{L}[\p{L}\p{M}]*$/u.test(w)),lang);
  assert.equal(sha(corpus.words.join('\n')),corpus.sha256,lang);
 }
});
test('all code fragments have content fingerprints and source/license metadata',()=>{
 assert.equal(Object.keys(data.codeCorpora).length,4);
 for(const [language,bank] of Object.entries(data.codeCorpora)){
  assert.ok(bank.snippets.length>=6);
  assert.equal(sha(bank.snippets.map(x=>x.text).join('\n\n')),bank.sha256);
  for(const snippet of bank.snippets){assert.equal(sha(snippet.text),snippet.sha256);assert.ok(snippet.source.startsWith('https://'));assert.ok(snippet.license);assert.ok(!snippet.text.includes('\t'));if(language==='javascript')assert.doesNotThrow(()=>new vm.Script(snippet.text));}
 }
});
test('no Math.random or runtime evaluation was introduced in application logic',()=>{
 assert.ok(!/Math\.random\s*\(/.test(src));assert.ok(!/\beval\s*\(|new\s+Function\s*\(/.test(src));
});
