'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const data=fs.readFileSync(path.join(root,'data.js'),'utf8');

test('indicative bands are available for every complete mode',()=>{
  assert.match(app,/function benchmarkBandsAllowed\(r\)\{\s*return isCompleteResult\(r\)/);
  assert.match(app,/function comparableBandBenchmark\(rows,comparable\)/);
  assert.match(app,/return \{\.\.\.base,kind:'bands',title:translate\(band\.label\)/);
  assert.doesNotMatch(app,/if\(isCode\(r\)\)return \{\.\.\.base/);
  assert.doesNotMatch(app,/if\(r\.mode==='custom'\)return \{\.\.\.base/);
  assert.doesNotMatch(app,/if\(isAdaptive\(r\)\)return \{\.\.\.base/);
  assert.doesNotMatch(app,/if\(r\.mode==='numbers'\|\|r\.mode==='practice'\)\{/);
});

test('progress bands use one comparable profile without requiring word mode',()=>{
  assert.match(app,/const benchmarkComparable=new Set\(plotted\.map\(profileKey\)\)\.size===1/);
  assert.match(app,/renderProgressBenchmark\(plotted,benchmarkComparable\)/);
  assert.match(app,/if\(progressMetric!=='wpm'\|\|!comparableBandBenchmark\(rows,comparable\)\)/);
  assert.match(data,/"benchmark\.indicative"/);
  assert.match(data,/"benchmark\.comparable\.mode\.one"/);
});

test('progress speed subtitle follows the selected unit',()=>{
  assert.match(app,/settings\.speedUnit==='cpm'\s*\n\s*\?translate\('progress\.speed\.subtitle\.cpm'\)/);
  assert.match(app,/settings\.speedUnit==='kph'\s*\n\s*\?translate\('progress\.speed\.subtitle\.kph'\)/);
  assert.match(data,/"progress\.speed\.subtitle\.cpm"/);
  assert.match(data,/"progress\.speed\.subtitle\.kph"/);
});
