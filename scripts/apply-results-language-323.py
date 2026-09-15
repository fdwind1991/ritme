from pathlib import Path
import json,re,subprocess,hashlib
root=Path.cwd()
p=root/'app.js';text=p.read_text()
text=text.replace("const APP_RELEASE = '3.2.2';", "const APP_RELEASE = '3.2.3';",1)
needle='const defaults = { duration:120,'
assert text.count(needle)==1
helper='''/** Resolve the first supported browser preference, not a location or IP lookup.
 * Used only as defaults. Valid saved interface and test languages win below.
 */
function preferredInterfaceLanguage(browser=globalThis.navigator){
  const preferences=Array.isArray(browser?.languages)&&browser.languages.length
    ? browser.languages : [browser?.language];
  for(const tag of preferences){
    if(typeof tag!=='string')continue;
    const language=tag.trim().toLowerCase().split(/[-_]/)[0];
    if(['nl','en','de'].includes(language))return language;
  }
  return 'en';
}
const browserLanguage=preferredInterfaceLanguage();
'''
text=text.replace(needle,helper+needle,1)
a=text.index('const defaults =');b=text.index('\nconst savedSettings',a)
old=text[a:b]
new=old.replace("language:'nl'","language:browserLanguage").replace("uiLanguage:'nl'","uiLanguage:browserLanguage").replace("standardLanguage:'nl'","standardLanguage:browserLanguage")
text=text[:a]+new+text[b:]
needle="if(!preserveView){window.scrollTo({top:0,behavior:'instant'});$('again-btn').focus({preventScroll:true});}"
assert text.count(needle)==1
text=text.replace(needle,"""// Focus a non-interactive result region. A trailing Space/Enter from typing
  // must not activate 'Another test' after the timer or last custom-text letter.
  if(!preserveView){window.scrollTo({top:0,behavior:'instant'});$('results-view').focus({preventScroll:true});}""",1)
needle="$('typing-shell').addEventListener('click',focusTyping);"
assert text.count(needle)==1
text=text.replace(needle,"""// Absorb carry-over typing on the result region, but retain normal keyboard
// activation after the user tabs to a button. Escape stays an explicit restart.
$('results-view').addEventListener('keydown',event=>{
  if(event.target===event.currentTarget && (event.key===' '||event.key==='Enter'))event.preventDefault();
});
"""+needle,1)
p.write_text(text)
p=root/'index.html';text=p.read_text().replace('v3.2.2','v3.2.3').replace('content="3.2.2"','content="3.2.3"')
assert text.count('hidden="" id="results-view">')==1
text=text.replace('hidden="" id="results-view">','hidden="" id="results-view" tabindex="-1">',1)
p.write_text(text)
p=root/'data.js';text=p.read_text().replace('"release": "3.2.2"','"release": "3.2.3"',1)
pattern=r'("help.interface.copy": )\{.*?\n    \}'
match=re.search(pattern,text,re.S);assert match
translations={
 'nl':'Bij je eerste bezoek volgt de interface de eerste ondersteunde browsertaal (NL / ENG / DE); anders wordt Engels gebruikt. De eerste woordtest begint in dezelfde taal. Je voorkeuren worden lokaal onthouden. Met NL / ENG / DE rechtsboven wijzig je daarna alleen de interface, zonder je testtaal, lopende test of resultaten te veranderen. Een opgeslagen keuze gaat altijd voor de browsertaal. De CSV-kolomnamen blijven voor uitwisselbaarheid hetzelfde in alle interfacetalen.',
 'en':'On your first visit, the interface follows the first supported browser language (NL / ENG / DE), with English as the fallback. Your first word test starts in the same language. Preferences are saved locally. NL / ENG / DE in the top right then changes only the interface, without changing the test language, an ongoing test or results. A saved choice always takes precedence over the browser language. CSV column names remain the same across interface languages for compatibility.',
 'de':'Beim ersten Besuch folgt die Oberfläche der ersten unterstützten Browsersprache (NL / ENG / DE); sonst wird Englisch verwendet. Der erste Worttest beginnt in derselben Sprache. Deine Einstellungen werden lokal gespeichert. NL / ENG / DE oben rechts ändert danach nur die Oberfläche, nicht die Testsprache, einen laufenden Test oder die Ergebnisse. Eine gespeicherte Auswahl hat immer Vorrang vor der Browsersprache. CSV-Spaltennamen bleiben in allen Oberflächensprachen gleich, damit Dateien kompatibel bleiben.'
}
replacement=json.dumps(translations,ensure_ascii=False,indent=2).replace('\n','\n    ')
text=text[:match.start()]+match.group(1)+replacement+text[match.end():]
p.write_text(text)
p=root/'tests/mobile-ui.py';text=p.read_text();assert "APP_RELEASE==='3.2.2'" in text
text=text.replace("APP_RELEASE==='3.2.2'", "APP_RELEASE===document.querySelector('meta[name=ritme-release]').content",1);p.write_text(text)
p=root/'tests/browser-fixture.py';text=p.read_text();needle="page=browser.new_page(viewport={'width':1440,'height':1000})";assert needle in text
text=text.replace(needle,"page=browser.new_page(locale='nl-NL',viewport={'width':1440,'height':1000})",1);p.write_text(text)
subprocess.run(['node','scripts/version-assets.cjs'],check=True)
expected={'app.js':'7813406844e2155881df4ce578db64dac6decc17947d176e133f38b84f7dd0de','data.js':'bb879d42abb510e611fd57a8c2315acf1b1df8a2deb97f3f98e93fb80969b984','index.html':'193dc0457576d6e92b5238d422bd633d88d3df146362d65d9f86de6574b5de10','tests/mobile-ui.py':'1cb294de01b5995c1448b7fdba6ab03a6229046a0f7fda7b4fa3e8b2d6815a55','tests/browser-fixture.py':'6fda35eb1e0852b8a3bd11a3cee2e3a662b9d791e05e12654bd42ae54d324652'}
for name,digest in expected.items():
 assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
print('Exact locally tested source verified.')
