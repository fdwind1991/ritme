/* Optional presentation layer: node --test tests/*.test.cjs */
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=read('index.html'),css=read('polish.css'),js=read('polish.js');
test('presentation assets are relative, ordered and content-versioned',()=>{
  for(const name of ['styles.css','polish.css','data.js','app.js','polish.js']){
    const hash=crypto.createHash('sha256').update(read(name)).digest('hex').slice(0,12);
    assert.ok(html.includes('./'+name+'?v='+hash),name);
    assert.ok(read('scripts/version-assets.cjs').includes("'"+name+"'"));
  }
  assert.ok(html.indexOf('href="./styles.css?')<html.indexOf('href="./polish.css?'));
  assert.ok(html.indexOf('src="./app.js?')<html.indexOf('src="./polish.js?'));
  assert.match(html,/<script src="\.\/polish\.js\?v=[a-f0-9]+" defer><\/script>/);
});
test('polish does not redefine the palette or contrast tokens',()=>{
  assert.doesNotMatch(css,/--(?:bg|surface|ink|strong|muted|faint|line|accent|typed|error|bar|net|burst)\s*:/);
  assert.doesNotMatch(css,/#(?:[0-9a-f]{3,8})\b/i);
});
test('motion has native and JavaScript reduced-motion paths',()=>{
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/animation:none!important; transition:none!important/);
  assert.match(js,/reduced\.matches/);assert.match(js,/animation\.cancel\(\)/);
  assert.match(js,/function animateStroke\(/);assert.match(js,/strokeDashoffset/);
  assert.match(css,/overlay \.14s allow-discrete/);
});
test('presentation cannot write scores, settings or generate prompts',()=>{
  assert.doesNotMatch(js,/localStorage|writeLocal\(|persistSettings\(|makePrompt\(|secureInt\(|Math\.random|new TypingSession/);
  assert.doesNotMatch(js,/history\.(?:push|pop|shift|unshift|splice)\(/);
  assert.doesNotMatch(js,/session\.[a-zA-Z]+\s*=/);
});
test('size menu is anchored, and all interface languages have summary copy',()=>{
  assert.match(css,/\.polish-ready \.font-menu\s*\{\s*position:fixed; right:auto/);
  assert.match(js,/fontButton\.getBoundingClientRect\(\)/);
  for(const lang of ['nl','en','de'])assert.match(js,new RegExp(lang+': \\{ accuracy:'));
  assert.match(js,/summary\.textContent = summaryText\(r\)/);
});
