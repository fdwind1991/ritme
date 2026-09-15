/* Run after editing app.js, data.js or styles.css. No dependencies. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),file=path.join(root,'index.html');
let html=fs.readFileSync(file,'utf8');
const checkOnly=process.argv.includes('--check');
for(const name of ['styles.css','polish.css','data.js','app.js','polish.js']) {
  const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
  const rx=new RegExp('((?:src|href)="\\./'+name.replace('.', '\\.')+')(?:\\?v=[^"\\s]*)?("[>\\s/])','g');
  let count=0;
  html=html.replace(rx,(_,prefix,end)=>{count++;return prefix+'?v='+hash+end;});
  if(count!==1)throw new Error('Expected one asset reference: '+name);
}
if(checkOnly){
  if(html!==fs.readFileSync(file,'utf8'))throw new Error('Asset hashes are stale; run node scripts/version-assets.cjs');
  console.log('Asset URLs match current content hashes.');
}else{
  fs.writeFileSync(file,html);
  console.log('Updated asset URLs to content hashes.');
}
