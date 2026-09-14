/* Deployment regressions: run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';globalThis.data=RITME_DATA;',ctx);
test('all local assets use current content hashes, relative paths and defer order',()=>{
  const assets=[...html.matchAll(/(?:src|href)="(\.\/(?:app\.js|data\.js|styles\.css)(?:\?[^" ]*)?)"/g)].map(m=>m[1]);
  assert.equal(assets.length,3);
  for(const name of ['styles.css','data.js','app.js']) {
    const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
    assert.ok(assets.includes('./'+name+'?v='+hash),name);
  }
  assert.ok(html.indexOf('src="./data.js?')<html.indexOf('src="./app.js?'));
  for(const name of ['data','app'])assert.match(html,new RegExp('<script src="\\./'+name+'\\.js\\?v=[a-f0-9]+" defer></script>'));
  assert.ok(fs.existsSync(path.join(root,'.nojekyll')));
});
test('compact labels are stable, translated full names remain accessible',()=>{
  for(const [id,text] of Object.entries({'words-btn':'Abc','numbers-btn':'123','code-btn':'&lt; /&gt;','custom-btn':'custom'})) {
    const button=html.match(new RegExp('<button[^>]*id="'+id+'"[^>]*>.*?</button>'))[0];
    assert.ok(button.endsWith('>'+text+'</button>'));assert.ok(!/data-i18n=/.test(button));
    const key=button.match(/data-i18n-aria-label="([^"]+)"/)[1];
    for(const lang of ['nl','en','de'])assert.ok(ctx.data.messages[key][lang]);
  }
});
test('data, app and document releases match and all code translations exist',()=>{
  assert.equal(ctx.data.release,html.match(/name="ritme-release" content="([^"]+)"/)[1]);
  assert.equal(ctx.data.release,app.match(/const APP_RELEASE = '([^']+)'/)[1]);
  for(const m of html.matchAll(/data-i18n(?:-html|-title|-aria-label|-placeholder)?="(code\.[^"]+)"/g))
    for(const lang of ['nl','en','de'])assert.ok(ctx.data.messages[m[1]]?.[lang],m[1]+' '+lang);
});
test('directory routes work at root, project path and local file paths',()=>{
  const source=html.match(/<script id="asset-base">([\s\S]*?)<\/script>/)[1];
  for(const url of ['https://example.test/ritme','https://example.test/ritme/','https://example.test/ritme/index.html','https://example.test/','file:///tmp/ritme/index.html']) {
    let base=null;const loc=new URL(url);
    vm.runInNewContext(source,{window:{location:loc},document:{createElement:()=>({}),head:{append:x=>{base=x.href;}}}});
    const resolved=new URL('./data.js?v=test',base?new URL(base,loc):loc);
    const expected=url.startsWith('file:')?'/tmp/ritme/data.js':loc.pathname==='/'?'/data.js':'/ritme/data.js';
    assert.equal(resolved.pathname,expected,url);assert.equal(resolved.origin,loc.origin);
  }
});
