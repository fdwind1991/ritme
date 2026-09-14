from pathlib import Path
import hashlib, re
root=Path.cwd()
expected={'index.html':'29e6891d7cd31d56e8cbff6e236653a9444e262c','app.js':'2a2aff9c7038d9f35265431d127455b1513b8163','data.js':'feff1029b4b4799bc225bcafc1cc58d1218b7d50','styles.css':'6322a211f4955127d063afc2c61a802ecaba4c74'}
for name,sha in expected.items():
    b=(root/name).read_bytes()
    assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==sha, 'Unexpected starting file: '+name

def replace(s,old,new):
    assert s.count(old)==1, 'Expected one occurrence: '+old[:70]
    return s.replace(old,new,1)

html=(root/'index.html').read_text()
html=replace(html,'editie v3.2 ·','editie v3.2.1 ·')
# Stable visible glyphs; full translated names remain available to assistive technology.
buttons={
'words-btn':('Abc','Woorden','Woorden'),
'numbers-btn':('123','Getallen','Alleen getallen, zonder woorden of leestekens'),
'code-btn':('&lt; /&gt;','code.label','code.language'),
'custom-btn':('custom','Eigen tekst','Typ een eigen passage over')}
for id,(text,label,title) in buttons.items():
    pattern=r'<button\b[^>]*\bid="'+id+r'"[^>]*>.*?</button>'
    found=re.findall(pattern,html,re.S);assert len(found)==1
    fallback={'code.label':'Code','code.language':'Codetaal'}.get(label,label)
    tip={'code.language':'Code'}.get(title,title)
    pressed='true' if id=='words-btn' else 'false'
    html=re.sub(pattern,f'<button type="button" id="{id}" aria-pressed="{pressed}" aria-label="{fallback}" data-i18n-aria-label="{label}" title="{tip}" data-i18n-title="{title}">{text}</button>',html,flags=re.S)
# Resolve subdirectory assets correctly even on hosts serving /ritme without a redirect.
# This only changes asset resolution, never origin, history keys or the current URL.
route='''<script id="asset-base">
(() => {
  const {protocol, pathname} = window.location;
  if (/^https?:$/.test(protocol) && !pathname.endsWith('/') && !pathname.split('/').pop().includes('.')) {
    const base = document.createElement('base');
    base.href = pathname + '/';
    document.head.append(base);
  }
})();
</script>
'''
html=replace(html,'<link rel="stylesheet" href="./styles.css"/>', '<meta name="ritme-release" content="3.2.1"/>\n'+route+'<link rel="stylesheet" href="./styles.css"/>')
(root/'index.html').write_text(html)

css=(root/'styles.css').read_text()
css += '''
/* Compact content tabs. Full names are in translated titles/accessible labels. */
.mode-group { flex-wrap:nowrap; }
.mode-group button { text-transform:none; white-space:nowrap; min-width:42px; }
@media(max-width:600px) {
  .mode-group { gap:5px; }
  .mode-group button { min-width:44px; min-height:36px; font-size:11px; padding-inline:9px; }
}
'''
(root/'styles.css').write_text(css)

data=(root/'data.js').read_text()
data=replace(data,'const RITME_DATA = {','const RITME_DATA = {\n  "release": "3.2.1",')
(root/'data.js').write_text(data)

app=(root/'app.js').read_text()
guard='''
// Fail visibly on incomplete/mixed deployments instead of exposing raw i18n keys.
const APP_RELEASE = '3.2.1';
if (typeof RITME_DATA === 'undefined' || RITME_DATA.release !== APP_RELEASE ||
    !RITME_DATA.codeCorpora?.python || !RITME_DATA.expandedLexicons?.nl ||
    !RITME_DATA.messages?.['code.label']?.nl) {
  const lang = document.documentElement.lang;
  const text = {
    nl: ['De appbestanden zijn niet volledig bijgewerkt. Herlaad de pagina; je voortgang blijft bewaard.', 'Herlaad'],
    en: ['The app files are not fully updated. Reload the page; your progress is kept.', 'Reload'],
    de: ['Die App-Dateien sind nicht vollstaendig aktualisiert. Lade die Seite neu; dein Fortschritt bleibt erhalten.', 'Neu laden']
  }[lang] || ['Please reload the page. Your progress is kept.', 'Reload'];
  const box = document.getElementById('fatal-error');
  if (box) {
    box.hidden = false; box.setAttribute('role', 'alert'); box.textContent = text[0] + ' ';
    const retry = document.createElement('button'); retry.type = 'button'; retry.textContent = text[1];
    retry.onclick = () => { const url = new URL(location.href); url.searchParams.set('v', APP_RELEASE); location.replace(url.href); };
    box.append(retry);
  }
  throw new Error('Ritme asset version mismatch. Reload without clearing browser storage.');
}
'''
app=replace(app,"'use strict';","'use strict';"+guard)
(root/'app.js').write_text(app)
(root/'.nojekyll').write_text('')
(root/'scripts').mkdir(exist_ok=True)
(root/'scripts/version-assets.cjs').write_text('''/* Run after editing app.js, data.js or styles.css. No dependencies. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),file=path.join(root,'index.html');
let html=fs.readFileSync(file,'utf8');
for(const name of ['styles.css','data.js','app.js']) {
  const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
  const rx=new RegExp('((?:src|href)="\\\\./'+name.replace('.', '\\\\.')+')(?:\\\\?v=[^"\\\\s]*)?("[>\\\\s/])','g');
  let count=0;
  html=html.replace(rx,(_,prefix,end)=>{count++;return prefix+'?v='+hash+end;});
  if(count!==1)throw new Error('Expected one asset reference: '+name);
}
fs.writeFileSync(file,html);
console.log('Updated asset URLs to content hashes.');
''')
(root/'tests/deployment.test.cjs').write_text('''/* Deployment regressions: run with node --test tests/*.test.cjs. */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';globalThis.data=RITME_DATA;',ctx);
test('all local assets use current content hashes, relative paths and defer order',()=>{
  const assets=[...html.matchAll(/(?:src|href)="(\\.\\/(?:app\\.js|data\\.js|styles\\.css)(?:\\?[^" ]*)?)"/g)].map(m=>m[1]);
  assert.equal(assets.length,3);
  for(const name of ['styles.css','data.js','app.js']) {
    const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
    assert.ok(assets.includes('./'+name+'?v='+hash),name);
  }
  assert.ok(html.indexOf('src="./data.js?')<html.indexOf('src="./app.js?'));
  for(const name of ['data','app'])assert.match(html,new RegExp('<script src="\\\\./'+name+'\\\\.js\\\\?v=[a-f0-9]+" defer></script>'));
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
  for(const m of html.matchAll(/data-i18n(?:-html|-title|-aria-label|-placeholder)?="(code\\.[^"]+)"/g))
    for(const lang of ['nl','en','de'])assert.ok(ctx.data.messages[m[1]]?.[lang],m[1]+' '+lang);
});
test('directory routes work at root, project path and local file paths',()=>{
  const source=html.match(/<script id="asset-base">([\\s\\S]*?)<\\/script>/)[1];
  for(const url of ['https://example.test/ritme','https://example.test/ritme/','https://example.test/ritme/index.html','https://example.test/','file:///tmp/ritme/index.html']) {
    let base=null;const loc=new URL(url);
    vm.runInNewContext(source,{window:{location:loc},document:{createElement:()=>({}),head:{append:x=>{base=x.href;}}}});
    const resolved=new URL('./data.js?v=test',base?new URL(base,loc):loc);
    const expected=url.startsWith('file:')?'/tmp/ritme/data.js':loc.pathname==='/'?'/data.js':'/ritme/data.js';
    assert.equal(resolved.pathname,expected,url);assert.equal(resolved.origin,loc.origin);
  }
});
''')
import subprocess
subprocess.run(['node','scripts/version-assets.cjs'],check=True)
print('Applied 3.2.1 cache/route fix and compact tabs.')
