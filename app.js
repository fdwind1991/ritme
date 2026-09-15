/* Ritme · application logic. GPL-3.0; see LICENSE. Load data.js first. */
'use strict';
// Fail visibly on incomplete/mixed deployments instead of exposing raw i18n keys.
const APP_RELEASE = '3.2.4';
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

/* ======================== Data, entropy and storage ======================== */
const $ = (id) => document.getElementById(id);
const LEXICONS = RITME_DATA.lexicons;
const BUILD_ENTROPY = RITME_DATA.entropy;
const EXPANDED_LEXICONS = RITME_DATA.expandedLexicons;
const CODE_CORPORA = RITME_DATA.codeCorpora;
const CODE_LANGUAGES = Object.keys(CODE_CORPORA);
function isCode(config){return config?.mode==='code';}
function hasWordCorpus(config){return !!config && (config.mode==='words'||(config.mode==='practice'&&!guidedDrill(config)));}
function selectedWordCorpus(config){
  return !isStandard(config)&&config.wordCorpus==='expanded' ? EXPANDED_LEXICONS[config.language] : LEXICONS[config.language];
}
function corpusProfileSuffix(r){return r.wordCorpusVersion==='ritme-expanded-v1'?'|expanded-v1|'+(r.wordCorpusFingerprint||'unknown'):'';}
function corpusLabel(r){return translate(r.wordCorpusVersion==='ritme-expanded-v1'?'corpus.expanded':'corpus.basic');}
function codeName(language){return CODE_CORPORA[language]?.name || translate('code.label');}
function makeCodePrompt(config,count){
  const bank=CODE_CORPORA[config.language],lines=[];
  if(!bank?.snippets.length)throw new Error(translate('code.unavailable'));
  // Sample complete, source-attributed fragments, not mixed programming tokens.
  // New text is appended below the prompt; visible lines are never rewritten.
  while(lines.length<Math.min(count,24)){
    const snippet=bank.snippets[secureInt(bank.snippets.length)];
    lines.push(...snippet.text.split('\n'),'');
  }
  return lines;
}
const LANGUAGES = Object.keys(LEXICONS);
const PUNCTUATION = [',', '.', ':', ';']; // The four marks in the supplied screenshots.
const STANDARD_CORPORA={"nl":{"sha256":"e540d93a5b53af931121e51201a7d0e472ae4c510901759f44f89a8028df6f96","count":199},"en":{"sha256":"8642149a168fe15fa385b8eab47f64ade34cfb60553059e83e448ab54af9e3dc","count":200},"de":{"sha256":"1ece918c3f3cfdd8f4224fe9114672843bc9b464cea087ad7446f25a39a9b0af","count":200},"fr":{"sha256":"0ab9a649d4182777913cdae8f4d18fab303a3bc9d21ef6ce56efeb4be9088f4b","count":174},"es":{"sha256":"3ca3866b34723b99bfd97e0e413d3e5f8d343b455860d2c4e86331fb68c16835","count":197},"it":{"sha256":"e708b6dafe9b03b8c13350abd556472d7d7a62c84a0dfa9ed6784c73d907526e","count":199}};
const STORAGE_KEY = 'folkert-type-test-v1';
const SETTINGS_KEY = 'folkert-type-settings-v1';
let entropyCursor = 0;
/** Fresh independent cryptographic input; the public build salt is not a PRNG seed. */
function secureInt(max) {
  if (!Number.isSafeInteger(max) || max <= 0 || max > 0x100000000) throw new RangeError(translate("Ongeldig trekkingsbereik"));
  if (!globalThis.crypto?.getRandomValues) throw new Error(translate("Deze browser heeft geen Web Crypto. Open het bestand in een recente browser."));
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  let value;
  do {
    crypto.getRandomValues(buffer);
    value = (buffer[0] ^ BUILD_ENTROPY[entropyCursor++ % BUILD_ENTROPY.length]) >>> 0;
  } while (value >= limit);
  return value % max;
}
let storageAvailable = true;
function readLocal(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { storageAvailable = false; return fallback; }
}
function writeLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); storageAvailable=true; return true; }
  catch { storageAvailable = false; return false; }
}
/** Resolve the first supported browser preference, not a location or IP lookup.
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
const defaults = { duration:120, language:browserLanguage, numbers:false, punctuation:true, capitals:false, size:28, theme:'light', mode:'words', numberLength:'mixed', numberKeyboard:'row', uiLanguage:browserLanguage, practiceLesson:'adaptive', practiceKeyboard:true, practiceColors:true, practiceInfinite:false, practiceKeys:[], wordPractice:false, keyboardLayout:'us', standardTest:false, standardLanguage:browserLanguage, speedUnit:'wpm', wordCorpus:'expanded', codeLanguage:'python', codeInfinite:false, codeGuide:false };
const savedSettings = readLocal(SETTINGS_KEY, {});
const settings = {...defaults};
if (savedSettings && typeof savedSettings === 'object') {
  if (['nl','en','de'].includes(savedSettings.uiLanguage)) settings.uiLanguage=savedSettings.uiLanguage;
  if ([15,30,60,120].includes(savedSettings.duration)) settings.duration = savedSettings.duration;
  if ([...LANGUAGES,'random'].includes(savedSettings.language)) settings.language = savedSettings.language;
  if ([24,28,32,36].includes(savedSettings.size)) settings.size = savedSettings.size;
  if (['light','dark'].includes(savedSettings.theme)) settings.theme = savedSettings.theme;
  if (['words','numbers','practice','code'].includes(savedSettings.mode)) settings.mode = savedSettings.mode;
  if (['mixed','2','3','4','6'].includes(savedSettings.numberLength)) settings.numberLength = savedSettings.numberLength;
  if (['row','numpad'].includes(savedSettings.numberKeyboard)) settings.numberKeyboard = savedSettings.numberKeyboard;
  if (['words','adaptive','home','top','bottom','letters','shift','digits','weak'].includes(savedSettings.practiceLesson)) settings.practiceLesson=savedSettings.practiceLesson;
  if (Array.isArray(savedSettings.practiceKeys)) settings.practiceKeys=savedSettings.practiceKeys.filter(k=>typeof k==='string'&&/^[a-zà-ž]$/i.test(k)).slice(0,8);
  for (const key of ['numbers','punctuation','capitals','practiceKeyboard','practiceColors','practiceInfinite','standardTest','codeInfinite','codeGuide']) if (typeof savedSettings[key] === 'boolean') settings[key] = savedSettings[key];
}
if(['us','de','fr'].includes(savedSettings?.keyboardLayout))settings.keyboardLayout=savedSettings.keyboardLayout;
if(['wpm','cpm','kph'].includes(savedSettings?.speedUnit))settings.speedUnit=savedSettings.speedUnit;
settings.standardLanguage=LANGUAGES.includes(savedSettings?.standardLanguage)?savedSettings.standardLanguage:(LANGUAGES.includes(settings.language)?settings.language:'nl');
// Remember the Words submode independently of the currently selected main tab.
// Legacy settings with mode=practice open Words with practice already enabled.
settings.wordPractice = typeof savedSettings?.wordPractice === 'boolean'
  ? savedSettings.wordPractice : settings.mode === 'practice';
if(settings.mode === 'practice') {settings.wordPractice=true;settings.standardTest=false;}

/* ======================== Interface languages (NL / ENG / DE) =============
   A presentation-only setting. Test language, entropy, measurement, history
   schemas and CSV headers are intentionally independent of UI language.
   Only trusted, bundled help paragraphs use innerHTML; dynamic values are
   inserted as text or escaped by safeText(). The GPL text is not translated. */
if(['basic','expanded'].includes(savedSettings?.wordCorpus))settings.wordCorpus=savedSettings.wordCorpus;
if(CODE_LANGUAGES.includes(savedSettings?.codeLanguage))settings.codeLanguage=savedSettings.codeLanguage;
const INTERFACE_MESSAGES=RITME_DATA.messages;
function translate(key,values={}){
  const entry=INTERFACE_MESSAGES[key];
  const text=entry?.[settings.uiLanguage]??entry?.nl??key;
  return text.replace(/\{([a-zA-Z0-9_]+)\}/g,(match,name)=>Object.hasOwn(values,name)?String(values[name]):match);
}
function tp(key,count,values={}){return translate(key+(count===1?'.one':'.other'),{...values,count});}
function uiLocale(){return {nl:'nl-NL',en:'en-GB',de:'de-DE'}[settings.uiLanguage]||'nl-NL';}
function formatNumber(value,decimals=0){
  return Number(value).toLocaleString(uiLocale(),{minimumFractionDigits:decimals,maximumFractionDigits:decimals,useGrouping:false});
}
function languageName(code){return Object.hasOwn(LEXICONS,code)?translate('language.'+code):translate('Onbekende taal');}
function applyInterface(){
  document.documentElement.lang=settings.uiLanguage;
  document.title=translate('page.title');
  document.querySelector('meta[name="description"]').content=translate('page.description');
  // Translate whole help paragraphs before their leaf labels, preserving inline markup.
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=translate(el.dataset.i18nHtml);});
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=translate(el.dataset.i18n);});
  for(const attr of ['title','aria-label','placeholder','label']){
    document.querySelectorAll('[data-i18n-'+attr+']').forEach(el=>el.setAttribute(attr,translate(el.getAttribute('data-i18n-'+attr))));
  }
  $('ui-language').value=settings.uiLanguage;
  for(const id of ['language','custom-language']){
    for(const option of $(id).options)option.textContent=option.value==='random'?translate('Willekeurige taal'):languageName(option.value);
  }
  document.querySelectorAll('[data-language-source]').forEach(link=>{
    const code=link.dataset.languageSource;
    link.textContent=translate('source.items',{language:languageName(code),count:LEXICONS[code].words.length});
  });
  const highlighted=!$('results-view').hidden&&currentResult?speedBand(currentResult.wpm):null;
  $('benchmark-band-rows').innerHTML=SPEED_BANDS.map(b=>`<tr${b===highlighted?' class="is-current" aria-current="true"':''}><td>${safeText(translate(b.label))}</td><td>${bandRange(b)}</td><td>${bandRange(b,5)}</td></tr>`).join('');
  $('custom-count').textContent=translate('characters',{count:$('custom-text').value.length});
  applyAppearance();
}
function setInterfaceLanguage(language){
  if(!['nl','en','de'].includes(language)||language===settings.uiLanguage)return;
  settings.uiLanguage=language;persistSettings();
  const scrollY=window.scrollY;
  clearTimeout(toastTimer);$('toast').classList.remove('visible');
  applyInterface();
  if(session){
    updateControls();updatePersonalBest();
    $('accessible-prompt').textContent=translate('Over te typen: ')+session.words.slice(0,35).map(w=>w.text).join(' ');
  }
  if(!$('results-view').hidden&&currentResult)showResult(currentResult,true);
  if(!$('progress-view').hidden)renderHistory();
  // Do not restart the prompt, reset the clock, modify results, or steal focus.
  window.scrollTo({top:scrollY,behavior:'instant'});
}

const storedHistory = readLocal(STORAGE_KEY, []);
let history = Array.isArray(storedHistory) ? storedHistory.filter(validResult).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,100) : [];
function persistSettings(){ writeLocal(SETTINGS_KEY,settings); }
/** Capitalisation is a deterministic transform of a sampled dataset word.
 * Without punctuation: an independent 1-in-4 draw; only the initial letter changes.
 * With punctuation: first lexical word and the word after any generated mark.
 * State belongs to one prompt/session and survives lazy append boundaries.
 */
function uppercaseLetter(ch, language) {
  // The normal full-uppercase mapping of ß is SS. Use its single-letter capital
  // so an initial stays one letter, including in the guide and measurement.
  return ch === 'ß' ? 'ẞ' : ch.toLocaleUpperCase(language);
}
function applyWordCapitalization(text, language, options, state) {
  if (!options.capitals) return text;
  const chars = Array.from(text);
  const letterIndices = chars.flatMap((ch,i) =>
    /\p{L}/u.test(ch) && uppercaseLetter(ch,language) !== ch ? [i] : []);
  if (options.punctuation) {
    if (state.capitalizeNext && letterIndices.length) {
      const i = letterIndices[0];
      chars[i] = uppercaseLetter(chars[i],language);
      state.capitalizeNext = false;
    }
    // Numbers cannot take capitals: carry the pending initial to the next word.
    // Deliberately includes commas, colons and semicolons; this is a Shift drill,
    // not a grammar lesson. This also handles punctuation attached to a number.
    if (PUNCTUATION.includes(chars[chars.length-1])) state.capitalizeNext = true;
  } else if (letterIndices.length && secureInt(4) === 0) {
    const i = letterIndices[0]; // A capital never moves into the middle of a word.
    chars[i] = uppercaseLetter(chars[i],language);
  }
  return chars.join('');
}
function makeWords(language, count, options, practiceKeys=[], state={capitalizeNext:true}) {
  let corpus = selectedWordCorpus({...options,language}).words;
  if (practiceKeys.length) {
    const candidates = corpus.filter(word => practiceKeys.some(key => word.toLowerCase().includes(key)));
    if (candidates.length >= 5) corpus = candidates;
  }
  const output = [];
  for(let i=0; i<count; i++) {
    let item = options.numbers && secureInt(10) === 0 ? String(1+secureInt(999)) : corpus[secureInt(corpus.length)].toLowerCase();
    if (options.punctuation && secureInt(5) === 0) item += PUNCTUATION[secureInt(PUNCTUATION.length)];
    // Some existing dataset entries contain spaces: transform each actual word.
    for (const word of item.normalize('NFC').split(/\s+/)) {
      output.push(applyWordCapitalization(word,language,options,state));
    }
  }
  return output;
}
/** Uniform numeric mapping: choose a digit count, then an integer in its range. */
function makeNumbers(count, options) {
  const fixed=['2','3','4','6'].includes(options.numberLength)?Number(options.numberLength):null;
  return Array.from({length:count},()=>{
    const digits=fixed||2+secureInt(3),lower=10**(digits-1);
    return String(lower+secureInt(9*lower));
  });
}
function makePrompt(config,count,offset=0,state={capitalizeNext:offset===0}){
  return isCode(config)?makeCodePrompt(config,count):config.mode==='numbers'?makeNumbers(count,config):config.mode==='practice'?makePracticePrompt(config,count,offset,state):makeWords(config.language,count,config,config.practiceKeys||[],state);
}
function usesCapitalization(config){
  return config.capitals===true && (config.mode==='words' || (config.mode==='practice' && !guidedDrill(config)));
}
function isInfinitePractice(config){return (config?.mode==='practice' && config.practiceInfinite===true)||(isCode(config)&&config.codeInfinite===true);}
function elapsedClock(seconds){
  const n=Math.max(0,Math.floor(seconds)),s=String(n%60).padStart(2,'0'),m=Math.floor(n/60);
  return m<60?`${m}:${s}`:`${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}:${s}`;
}
function sessionLimit(){return isInfinitePractice(session?.config)?Infinity:(session?.config.duration??settings.duration);}
function fmtPercent(n) { return Number.isFinite(n) ? formatNumber(n,1)+'%' : '—'; }
function clock(seconds) { const n=Math.max(0,Math.ceil(seconds)); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`; }
function labelKey(key) { return key==='\n'?'Enter ↵':key === ' ' ? translate("Space") : key; }
function round(n,d=2) { return Number(n.toFixed(d)); }
function safeText(value) { return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ========================= Typing measurement engine =======================
   Text editing is word-aware. Individual press records are retained with a
   deletion timestamp so graphs reflect what was on screen at each instant.
   End-text accuracy and first-pass keystroke accuracy are intentionally distinct.
*/
class TypingSession {
  constructor(config, words, finite=false, promptState={capitalizeNext:true}) {
    this.config = {...config}; this.promptState=promptState; this.words=[]; this.index=0; this.finite=finite; this.generatedWordCount=0;
    this.presses=[]; this.errors=[]; this.omissions=[]; this.keys={}; this.pairs={}; this.samples=[];
    this.started=null; this.finished=false; this.interrupted=false; this.backspaces=0;
    // Unlimited practice keeps exact lifetime totals without retaining every key event.
    // No practice totals or temporary summaries are written to browser storage.
    this.practiceTotals=isInfinitePractice(config)?{correct:0,retained:0,missing:0,corrected:0,binIndex:0,binCount:0,binSum:0,binSquareSum:0}:null;
    this.addWords(words);
  }
  addWords(words) { this.generatedWordCount+=words.length; this.words.push(...words.map(text=>({text,chars:Array.from(text),input:[],space:null,omission:null,submitted:false}))); }
  get current(){ return this.words[this.index]; }
  get running(){ return this.started !== null && !this.finished; }
  elapsed(now=performance.now()){ return this.started===null ? 0 : Math.max(0,(now-this.started)/1000); }
  begin(now=performance.now()){ if(this.started===null) this.started=now; }
  recordKey(key, good){
    const k=this.keys[key] ||= {attempts:0,errors:0}; k.attempts++; if(!good) k.errors++;
  }
  addError(key, t){ const error={key,t,resolved:false}; this.errors.push(error); return this.errors.length-1; }
  insert(ch, now=performance.now()) {
    if(this.finished || !this.current) return false;
    if(ch===' ' && this.current.input.length===0) return false;
    this.begin(now); const t=this.elapsed(now); const w=this.current;
    if(ch===' ') {
      const missing=Math.max(0,w.chars.length-w.input.length);
      const good=missing===0; this.recordKey(' ',good);
      const record={ch:' ',t,good,matches:true,removedAt:null,errorId:good?null:this.addError(' ',t)};
      this.presses.push(record); w.space=record; w.submitted=true;
      if(missing) { w.omission={t,count:missing,removedAt:null};this.omissions.push(w.omission); }
      this.index++;
    } else {
      const expected=w.chars[w.input.length]; const good=ch===expected;
      this.recordKey(expected || ch,good);
      const previous=w.chars[w.input.length-1];
      if(previous&&expected&&/^\p{L}$/u.test(previous)&&/^\p{L}$/u.test(expected)){
        const pair=normalizedToken(previous+expected),bucket=this.pairs[pair]||={attempts:0,errors:0};
        bucket.attempts++;if(!good||!w.input.at(-1)?.matches)bucket.errors++;
      }
      const record={ch,t,good,matches:good,removedAt:null,errorId:good?null:this.addError(expected||ch,t)};
      w.input.push(record);this.presses.push(record);
    }
    this.recordPracticePress(t);
    return true;
  }
  removeRecord(record,t){
    record.removedAt=t;
    if(record.errorId!==null) this.errors[record.errorId].resolved=true;
  }
  erase(word=false,now=performance.now()) {
    if(!this.running || !this.current) return false;
    const t=this.elapsed(now);this.backspaces++;
    let w=this.current;
    if(!w.input.length && this.index>0) {
      this.index--;w=this.current;w.submitted=false;
      if(w.space){this.removeRecord(w.space,t);w.space=null;}
      if(w.omission){w.omission.removedAt=t;w.omission=null;}
      if(!word) return true;
    }
    if(!w.input.length)return false;
    do { this.removeRecord(w.input.pop(),t); } while(word && w.input.length);
    return true;
  }
  recordPracticePress(t){
    const totals=this.practiceTotals;if(!totals)return;
    // Match the timed-test bins: (n-1,n], with t=0 in the first bin.
    const bin=Math.max(0,Math.ceil(t)-1);
    if(bin>totals.binIndex){
      totals.binSum+=totals.binCount;totals.binSquareSum+=totals.binCount**2;
      totals.binIndex=bin;totals.binCount=0;
    }
    totals.binCount++;
  }
  practiceConsistency(t){
    const full=Math.floor(t),totals=this.practiceTotals;if(!totals||full<5)return null;
    const includeOpen=totals.binIndex<full;
    const sum=totals.binSum+(includeOpen?totals.binCount:0);
    const squares=totals.binSquareSum+(includeOpen?totals.binCount**2:0);
    const mean=sum/full,variance=Math.max(0,squares/full-mean**2);
    return mean?100/(1+Math.sqrt(variance)/mean):0;
  }
  archivePracticeRecords(retained,retainedOmissions){
    const totals=this.practiceTotals;if(!totals)return;
    const previousErrors=this.errors,nextErrors=[],nextPresses=[];
    for(const press of this.presses){
      const error=press.errorId===null?null:previousErrors[press.errorId];
      if(retained.has(press)){
        if(error){press.errorId=nextErrors.length;nextErrors.push(error);}
        nextPresses.push(press);
      }else{
        if(press.removedAt===null){totals.retained++;if(press.matches)totals.correct++;}
        if(error?.resolved)totals.corrected++;
      }
    }
    for(const omission of this.omissions){
      if(!retainedOmissions.has(omission)&&omission.removedAt===null)totals.missing+=omission.count;
    }
    this.presses=nextPresses;this.errors=nextErrors;
    this.omissions=this.omissions.filter(o=>retainedOmissions.has(o));
  }
  metric(t) {
    const alive=this.presses.filter(p=>p.t<=t && (p.removedAt===null || p.removedAt>t));
    const archived=this.practiceTotals;
    const correct=(archived?.correct||0)+alive.reduce((n,p)=>n+(p.matches?1:0),0);
    const retained=(archived?.retained||0)+alive.length;
    const missing=(archived?.missing||0)+this.omissions.reduce((n,o)=>n+(o.t<=t && (o.removedAt===null||o.removedAt>t) ? o.count : 0),0);
    const all=this.presses.filter(p=>p.t<=t);
    // For unlimited sessions metric() describes the current lifetime state;
    // keys includes attempts that have already left the editable backspace window.
    const counts=archived?Object.values(this.keys):null;
    const attempts=counts?counts.reduce((n,k)=>n+k.attempts,0):all.length;
    const good=counts?counts.reduce((n,k)=>n+k.attempts-k.errors,0):all.reduce((n,p)=>n+(p.good?1:0),0);
    const seconds=Math.max(t,.001);
    return {wpm:correct*12/seconds,raw:retained*12/seconds,cpm:correct*60/seconds,
      accuracy:retained+missing?correct/(retained+missing)*100:100,
      keystrokeAccuracy:attempts?good/attempts*100:100,
      typos:attempts-good,uncorrected:retained-correct+missing,
      corrected:(archived?.corrected||0)+this.errors.filter(e=>e.resolved).length,attempts,correct,retained,missing};
  }
  sample(t) {
    const window=Math.min(5,t), burstWindow=Math.min(1,t);
    const active=this.presses.filter(p=>p.t<=t && p.t>t-window && (p.removedAt===null||p.removedAt>t));
    // Include the very first press at t=0 in the first windows.
    if(t<=5) active.push(...this.presses.filter(p=>p.t===0 && !active.includes(p) && (p.removedAt===null||p.removedAt>t)));
    const bursts=this.presses.filter(p=>p.t<=t && (p.t>t-burstWindow || (t<=1 && p.t===0))).length;
    return {t:round(t,3),burst:round(bursts*12/Math.max(burstWindow,.001)),raw:round(active.length*12/Math.max(window,.001)),net:round(active.filter(p=>p.matches).length*12/Math.max(window,.001))};
  }
  captureSamples(until) {
    let next=this.samples.length ? Math.floor(this.samples[this.samples.length-1].t)+1 : 1;
    while(next<=until){this.samples.push(this.sample(next));next++;}
  }
  finish(t,reason='time') {
    const temporary=isInfinitePractice(this.config);
    if(!temporary){
      this.captureSamples(t);
      if(!this.samples.length || t-this.samples[this.samples.length-1].t>.04) this.samples.push(this.sample(t));
    }
    this.finished=true;
    const m=this.metric(t);let consistency=temporary?this.practiceConsistency(t):null;
    const full=Math.floor(t);
    if(!temporary&&full>=5){
      const bins=Array.from({length:full},()=>0);
      for(const p of this.presses) {
        // Bins are (n-1,n], with the first press at 0 included in bin zero.
        const i=Math.max(0,Math.ceil(p.t)-1);if(i<full)bins[i]++;
      }
      const mean=bins.reduce((a,b)=>a+b,0)/full;
      const variance=bins.reduce((n,v)=>n+(v-mean)**2,0)/full;
      consistency=mean ? 100/(1+Math.sqrt(variance)/mean) : 0;
    }
    return {version:1,id:String(Date.now())+'-'+String(performance.now()).replace('.',''),date:new Date().toISOString(),
      ...Object.fromEntries(Object.entries(m).map(([k,v])=>[k,round(v)])),
      duration:round(t,3),plannedDuration:temporary?null:this.config.duration,language:this.config.language,mode:this.config.mode,
      ...(temporary?{practiceInfinite:true,ephemeral:true}:{}),
      numbers:this.config.numbers,punctuation:this.config.punctuation,capitals:usesCapitalization(this.config),numberLength:this.config.numberLength,practiceKeys:this.config.practiceKeys||[],
      ...(this.config.mode==='numbers'?{numberKeyboard:this.config.numberKeyboard==='numpad'?'numpad':'row',numberAided:!!this.config.numberAided}:{}),
      ...(usesCapitalization(this.config)?{capitalPlacement:'initial'}:{}),
      ...(this.config.practiceGuideVersion===1?{practiceGuideVersion:1,practiceLesson:this.config.practiceLesson,practiceAided:!!this.config.practiceAided}:{}),
      reason,interrupted:this.interrupted,consistency:consistency===null?null:round(consistency),backspaces:this.backspaces,
      keyboardLayout:layoutId(this.config),
      ...(isStandard(this.config)?{standardVersion:this.config.standardVersion,corpusFingerprint:this.config.corpusFingerprint,scoringVersion:'ritme-output-v1'}:{}),
      ...(isAdaptive(this.config)?{adaptiveVersion:1,adaptiveFocus:[...(this.config.adaptiveFocus||[])]}:{}),
      ...(this.config.wordCorpusVersion?{wordCorpusVersion:this.config.wordCorpusVersion,wordCorpusFingerprint:this.config.wordCorpusFingerprint}:{}),
      pairs:structuredClone(this.pairs),keys:structuredClone(this.keys),errors:temporary?[]:this.errors.map(e=>({...e,t:round(e.t,3)})),samples:temporary?[]:this.samples.map(s=>({...s}))};
  }
}


/** Code mode is line-aware. Spaces are characters, Enter ends a logical line.
 * Display markers/line numbers are never counted. There is no evaluation,
 * auto-completion or auto-indentation. A premature Enter records omissions.
 */
class CodeTypingSession extends TypingSession {
  addWords(lines){
    for(const text of lines){
      this.words.push({text,chars:Array.from(text),input:[],space:null,omission:null,submitted:false,lineNumber:++this.generatedWordCount});
    }
  }
  insert(ch,now=performance.now()){
    if(this.finished||!this.current)return false;
    if(ch!=='\n'&&/[\u0000-\u001f\u007f]/.test(ch))return false;
    this.begin(now);const t=this.elapsed(now),w=this.current;
    if(ch==='\n'){
      const missing=Math.max(0,w.chars.length-w.input.length),good=missing===0;
      this.recordKey('\n',good);
      const press={ch,t,good,matches:true,removedAt:null,errorId:good?null:this.addError('\n',t)};
      this.presses.push(press);w.space=press;w.submitted=true;
      if(missing){w.omission={t,count:missing,removedAt:null};this.omissions.push(w.omission);}
      this.index++;
    }else{
      const expected=w.chars[w.input.length],good=ch===expected;
      this.recordKey(expected??ch,good);
      const press={ch,t,good,matches:good,removedAt:null,errorId:good?null:this.addError(expected??ch,t)};
      w.input.push(press);this.presses.push(press);
    }
    this.recordPracticePress(t);return true;
  }
  erase(word=false,now=performance.now()){
    if(!word||!this.current?.input.length)return super.erase(false,now);
    if(!this.running)return false;
    const t=this.elapsed(now),input=this.current.input;this.backspaces++;
    while(input.length&&input.at(-1).ch===' ')this.removeRecord(input.pop(),t);
    while(input.length&&input.at(-1).ch!==' ')this.removeRecord(input.pop(),t);
    return true;
  }
  finish(t,reason='time'){
    return {...super.finish(t,reason),codeVersion:'ritme-code-v1',
      codeCorpusFingerprint:this.config.codeCorpusFingerprint,codeAided:!!this.config.codeAided,
      ...(this.config.codeInfinite?{codeInfinite:true}:{}),scoringVersion:'ritme-code-output-v1'};
  }
}

/* ========================= App state and rendering ======================== */
let session=null, currentResult=null, customText='', practiceKeys=[...(settings.practiceKeys||[])], mode=settings.mode;
let progressMetric='wpm',progressFilterInitialized=false;
let nodes=[], timerHandle=null, lastUiTime=0, composing=false, confirmAction=null;
let toastTimer=null, reenterFocus=true;
const shownSeries={burst:true,raw:true,net:true,fixed:true,wrong:true};
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3200);}
function applyAppearance(){
  document.documentElement.dataset.theme=settings.theme;
  document.documentElement.style.setProperty('--type-size',settings.size+'px');
  $('theme-btn').setAttribute('aria-label',settings.theme==='light'?translate("Donkere weergave"):translate("Lichte weergave"));
  $('theme-btn').setAttribute('aria-pressed',String(settings.theme==='dark'));
  document.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.size)===settings.size)));
}
function updateControls(){
  const standard=standardActive();
  const running=!!session?.running,isNumbers=mode==='numbers',isCustom=mode==='custom',isPractice=mode==='practice',isDrill=isPractice&&!['words','weak','adaptive'].includes(settings.practiceLesson),isCodeMode=mode==='code',infinite=(isPractice&&settings.practiceInfinite)||(isCodeMode&&settings.codeInfinite);
  document.body.classList.toggle('practice-infinite',infinite);
  $('practice-infinite-btn').hidden=!(isPractice||isCodeMode);
  document.body.classList.toggle('code-active',isCodeMode);
  $('code-btn').setAttribute('aria-pressed',String(isCodeMode));
  $('code-settings').hidden=!isCodeMode;
  $('code-language').value=settings.codeLanguage;$('code-language').disabled=running;
  $('code-btn').disabled=running;
  $('code-tutorial-btn').hidden=!isCodeMode;$('code-tutorial-btn').disabled=running;
  $('practice-infinite-note').hidden=!infinite;
  document.querySelectorAll('[data-duration]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.duration==='infinite'?infinite:!infinite&&Number(b.dataset.duration)===(standard?60:settings.duration)));b.disabled=running||standard;if(b.dataset.duration!=='infinite')b.hidden=standard&&b.dataset.duration!=='60';});
  $('stop-btn').dataset.i18nTitle=infinite?'practice.infinite.stop':'Afronden met de verstreken tijd';
  $('stop-btn').title=translate($('stop-btn').dataset.i18nTitle);
  $('focus-note').dataset.i18n=infinite?'practice.infinite.focus':'De timer loopt door.';
  $('focus-note').textContent=translate($('focus-note').dataset.i18n);
  if(infinite)$('timer').setAttribute('aria-label',translate('practice.infinite.elapsed'));else $('timer').removeAttribute('aria-label');
  $('language').value=standard?settings.standardLanguage:settings.language;$('language').disabled=running;
  const random=$('language').querySelector('[value="random"]');if(random){random.hidden=standard;random.disabled=standard;}
  $('word-activity').value=standard?'standard':isPractice?(settings.practiceLesson==='adaptive'?'practice':'practice:'+settings.practiceLesson):'free';
  $('word-activity').dataset.active=String(standard||isPractice);
  $('word-activity-wrap').hidden=isNumbers||isCustom||isCodeMode;
  $('keyboard-layout').value=settings.keyboardLayout;$('keyboard-layout').disabled=running;
  $('words-btn').setAttribute('aria-pressed',String(mode==='words'||isPractice));
  $('numbers-btn').setAttribute('aria-pressed',String(isNumbers));$('custom-btn').setAttribute('aria-pressed',String(isCustom));
  $('mix-numbers-btn').setAttribute('aria-pressed',String(settings.numbers));
  $('punctuation-btn').setAttribute('aria-pressed',String(settings.punctuation));
  $('capitals-btn').setAttribute('aria-pressed',String(settings.capitals));
  $('capitals-btn').hidden=standard||isNumbers||isCustom||isCodeMode||isDrill;
  $('capitalization-hint').hidden=standard||!settings.capitals||isNumbers||isCustom||isCodeMode||isDrill;
  $('capitalization-hint').textContent=translate(settings.punctuation?'capitals.hint.punctuation':'capitals.hint.random');
  for(const id of ['words-btn','numbers-btn','word-activity','punctuation-btn','capitals-btn','mix-numbers-btn','custom-btn','number-length','number-keyboard'])$(id).disabled=running;
  $('language-wrap').hidden=isNumbers||isDrill||isCodeMode;$('number-settings').hidden=!isNumbers;$('number-length').value=settings.numberLength;$('number-keyboard').value=settings.numberKeyboard;
  // Practice-only options live under information; Free typing always exposes +123.
  const optionsInPractice=isPractice&&!isDrill;
  const optionHost=$(optionsInPractice?'practice-word-options':'word-options');
  for(const id of ['mix-numbers-btn','punctuation-btn','capitals-btn']){
    const control=$(id);if(control.parentElement!==optionHost)optionHost.append(control);
  }
  $('mix-numbers-btn').hidden=standard||isNumbers||isCustom||isCodeMode||isDrill||(isPractice&&isAdaptive(session?.config));
  $('punctuation-btn').hidden=standard||isNumbers||isCustom||isCodeMode||isDrill;
  $('word-options').hidden=mode!=='words'||standard;
  $('test-info-word-options').hidden=!optionsInPractice;
  const notes=[];
  if(!standard&&settings.language==='random'&&session&&!isNumbers&&!isDrill&&!isCodeMode)notes.push(resultLanguage(session.config));

  $('language-note').textContent=notes.join(' · ');$('language-note').hidden=!notes.length;
  $('stage-label').textContent=isNumbers?translate(isNumpad(session.config)?'numpad.stage':'Alleen cijfers · spatie tussen getallen'):isCustom?translate("Eigen tekst · ")+resultLanguage(session.config):resultLanguage(session.config)+' · '+(mode==='practice'?translate("gerichte oefening"):translate("losse woorden"));
  $('hint-main').textContent=isNumbers?translate("Typ de getallen over"):isCustom?translate("Typ je eigen tekst over"):translate("Begin met typen");
  if(isPractice)$('hint-main').textContent=translate(infinite?'practice.infinite.hint':'practice.hint');
  renderCoach();renderTestInfo();
  if(!running){
    $('timer').hidden=false;$('timer').textContent=infinite?'∞ 0:00':clock(standard?60:settings.duration);$('timer').classList.remove('warning');
    if(infinite){$('live-dot').hidden=false;$('live-wpm').hidden=false;renderLiveMetric(session.metric(0),0);}
  }else updateLive();
}
function createWordNode(word){
  const el=document.createElement('span');el.className='word'+(isCode(session?.config)?' code-line':'');
  if(isCode(session?.config)){
    el.dataset.line=String(word.lineNumber);
    const number=document.createElement('span');number.className='code-line-number';
    number.textContent=String(word.lineNumber);number.setAttribute('aria-hidden','true');el.append(number);
  }
  const chars=word.chars.map(ch=>{const s=document.createElement('span');s.className='char';s.textContent=ch;if(ch===' ')s.dataset.space='true';setFingerStyle(s,ch);el.append(s);return s;});
  const extras=document.createElement('span');extras.className='extras';el.append(extras);
  const gap=document.createElement('span');gap.className='gap';gap.textContent=isCode(session?.config)?'↵':' ';setFingerStyle(gap,isCode(session?.config)?'\n':' ');el.append(gap);
  return {el,chars,extras,gap};
}
function appendNodes(){
  const fragment=document.createDocumentFragment();
  while(nodes.length<session.words.length){const node=createWordNode(session.words[nodes.length]);nodes.push(node);fragment.append(node.el);}
  $('word-track').append(fragment);
}
function renderWord(index){
  if(index<0 || index>=nodes.length)return;
  const w=session.words[index],n=nodes[index];
  for(let i=0;i<n.chars.length;i++){
    let cl='char';const p=w.input[i];
    if(p)cl+=p.matches?' correct':' incorrect';
    else if(w.submitted)cl+=' missing';
    if(index===session.index && i===w.input.length)cl+=' current';
    n.chars[i].className=cl;
  }
  n.extras.replaceChildren();
  for(const p of w.input.slice(w.chars.length)){const s=document.createElement('span');s.className='extra';s.textContent=p.ch;n.extras.append(s);}
  n.gap.className='gap'+(w.submitted?(w.space?.good?' correct':' incorrect'):'')+(index===session.index && w.input.length>=w.chars.length?' current':'');
}
function syncCodeViewport(){
  const viewport=$('typing-viewport');
  if(!isCode(session?.config)){viewport.style.removeProperty('--code-viewport-height');return;}
  // The visual viewport shrinks for a phone's software keyboard, not only resize.
  const visual=window.visualViewport,rect=viewport.getBoundingClientRect();
  const bottom=(visual?.offsetTop||0)+(visual?.height||window.innerHeight);
  viewport.style.setProperty('--code-viewport-height',Math.max(100,Math.min(330,bottom-rect.top-16))+'px');
}
function scrollToCaret(){
  const node=nodes[session?.index];if(!node)return;
  const viewport=$('typing-viewport'),track=$('word-track'),code=isCode(session?.config);
  syncCodeViewport();
  const lh=parseFloat(getComputedStyle(viewport).lineHeight);
  const caret=code?node.el.querySelector('.current'):null;
  const offset=Math.max(0,(caret?caret.getBoundingClientRect().top-track.getBoundingClientRect().top:node.el.offsetTop)-lh);
  track.style.setProperty('--scroll-y',-offset+'px');
  if(caret){
    const bounds=viewport.getBoundingClientRect(),box=caret.getBoundingClientRect();
    const gutter=node.el.querySelector('.code-line-number')?.offsetWidth||36;
    // Native horizontal scrolling: source lines never visually become new lines.
    if(box.right>bounds.right-12)viewport.scrollLeft+=box.right-bounds.right+12;
    else if(box.left<bounds.left+gutter+8)viewport.scrollLeft=Math.max(0,viewport.scrollLeft+box.left-bounds.left-gutter-8);
    if(session.current.input.length===0)viewport.scrollLeft=0;
    // Anchor the native input close to the visible line for mobile focus handling.
    $('capture').style.top=Math.min(viewport.clientHeight-20,Math.max(0,node.el.offsetTop-offset))+'px';
    $('capture').style.left=Math.min(viewport.clientWidth-20,Math.max(0,gutter+8))+'px';
  }
}
function focusTyping(){if(!$('test-view').hidden && !document.querySelector('dialog[open]'))$('capture').focus({preventScroll:true});}
function newTest(){
  closeTestInfo();
  clearInterval(timerHandle);timerHandle=null;document.body.classList.remove('running');
  setView('test');$('focus-overlay').hidden=true;$('caps-warning').hidden=true;
  $('fatal-error').hidden=true;currentResult=null;$('capture').value='';
  $('typing-viewport').scrollLeft=0;$('capture').style.top='0px';$('capture').style.left='0px';
  $('word-track').replaceChildren();$('word-track').style.setProperty('--scroll-y','0px');nodes=[];
  $('test-time-fill').style.transform='scaleX(0)';
  try{
    if(mode==='custom'&&!customText)mode='words';
    if(mode==='practice'&&settings.practiceLesson==='weak'&&!practiceKeys.length)settings.practiceLesson='words';
    if(mode==='practice'&&settings.practiceLesson!=='weak')practiceKeys=[];
    resetCoach();useKeyboardLayout(settings);
    const standard=standardActive();
    const language=mode==='code'?settings.codeLanguage:mode==='numbers'?'none':standard?settings.standardLanguage:settings.language==='random'?LANGUAGES[secureInt(LANGUAGES.length)]:settings.language;
    const config={...settings,language,mode,practiceKeys:[...practiceKeys],numbers:mode==='numbers'||(mode!=='custom'&&settings.numbers),punctuation:mode!=='numbers'&&mode!=='custom'&&settings.punctuation,capitals:mode!=='numbers'&&mode!=='custom'&&settings.capitals};
    config.practiceInfinite=mode==='practice'&&settings.practiceInfinite;
    if(isCode(config))Object.assign(config,{numbers:false,punctuation:false,capitals:false,practiceKeys:[],
      codeInfinite:settings.codeInfinite,codeVersion:'ritme-code-v1',codeCorpusFingerprint:CODE_CORPORA[language].sha256,
      codeAided:settings.codeGuide&&!!(settings.practiceKeyboard||settings.practiceColors)});
    config.capitalPlacement='initial';
    if(standard){Object.assign(config,{duration:60,numbers:false,punctuation:false,capitals:false,practiceKeys:[],practiceInfinite:false,standardVersion:'ritme-standard-v1',corpusFingerprint:STANDARD_CORPORA[language].sha256,scoringVersion:'ritme-output-v1'});}
    if(isAdaptive(config))config.numbers=false;
    if(mode==='numbers'){config.numberKeyboard=settings.numberKeyboard;config.numberAided=isNumpad(config)&&!!(settings.practiceColors||settings.practiceKeyboard);}
    if(mode==='practice'){
      config.practiceGuideVersion=1;config.practiceLesson=settings.practiceLesson;config.practiceAided=!!(settings.practiceColors||settings.practiceKeyboard);
      if(guidedDrill(config)){config.numbers=false;config.punctuation=false;config.capitals=false;}
    }
    if(hasWordCorpus(config)&&!standard){
      const corpus=selectedWordCorpus(config);
      config.wordCorpusVersion=config.wordCorpus==='expanded'?'ritme-expanded-v1':'ritme-basic-v1';
      if(corpus.sha256)config.wordCorpusFingerprint=corpus.sha256;
    }
    const promptState={capitalizeNext:true};
    const words=mode==='custom'?customText.split(' '):makePrompt(config,isAdaptive(config)?48:180,0,promptState);
    session=new (isCode(config)?CodeTypingSession:TypingSession)(config,words,mode==='custom',promptState);appendNodes();renderWord(0);
    $('accessible-prompt').textContent=translate("Over te typen: ")+words.slice(0,35).join(' ');
    for(const id of ['live-dot','live-wpm','stop-btn'])$(id).hidden=true;
    if(['words','numbers','practice','code'].includes(mode)){settings.mode=mode;if(mode!=='numbers'&&mode!=='code')settings.wordPractice=mode==='practice';persistSettings();}
    updateControls();updatePersonalBest();window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(focusTyping);
  }catch(error){$('fatal-error').textContent=error.message;$('fatal-error').hidden=false;}
}
function askConfirm(title,message,buttonLabel,action){
  $('confirm-ok').classList.remove('destructive');confirmAction=action;$('confirm-title').textContent=title;$('confirm-message').textContent=message;$('confirm-ok').textContent=buttonLabel;openDialog('confirm-dialog');
}
function requestNewTest(action=newTest){
  if(session?.running&&!isInfinitePractice(session.config)){askConfirm(translate("Nieuwe test starten?"),translate("Je huidige test wordt afgebroken en niet opgeslagen. De timer loopt door totdat je een keuze maakt."),translate("Opnieuw beginnen"),action);}
  else action();
}
function renderLiveMetric(metric,t){
  const practice=session?.config.mode==='practice'||isCode(session?.config),wpm=t>=1?Math.round(metric.wpm):0;
  $('live-wpm').textContent=practice
    ?translate('practice.live.metrics',{wpm,accuracy:fmtPercent(metric.keystrokeAccuracy)})
    :wpm+' wpm';
  if(practice){
    $('live-wpm').title=translate('practice.live.explanation');
    $('live-wpm').setAttribute('aria-label',translate('practice.live.aria',{wpm,accuracy:fmtPercent(metric.keystrokeAccuracy)}));
  }else{
    $('live-wpm').removeAttribute('title');$('live-wpm').removeAttribute('aria-label');
  }
}
function updateLive(){
  if(!session?.running)return;
  const infinite=isInfinitePractice(session.config),limit=sessionLimit(),t=Math.min(session.elapsed(),limit);
  // Free practice keeps lifetime aggregates, not an unbounded per-second graph.
  if(!infinite)session.captureSamples(t);
  const metric=session.metric(t);
  $('timer').textContent=infinite?'∞ '+elapsedClock(t):clock(limit-t);
  $('timer').classList.toggle('warning',!infinite&&limit-t<=10);
  renderLiveMetric(metric,t);
  if(!infinite){
    $('test-time-fill').style.transform='scaleX('+Math.max(0,1-t/limit)+')';
    if(t>=limit)completeTest('time',limit);
  }
}
/** Keep free practice bounded even during long sessions. Retain a generous
 * backspace window and the unfinished prompt. Lifetime key counters and the
 * prompt generator state survive recycling. Retired text is counted once so
 * live and final feedback remain exact after many thousands of words. */
function compactInfinitePractice(){
  if(!isInfinitePractice(session?.config))return;
  let cut=0;
  if(session.index>96){
    cut=session.index-24;
    // Remove whole visual rows so wrapping does not jump during recycling.
    const top=nodes[cut]?.el.offsetTop;
    while(cut>0&&nodes[cut-1].el.offsetTop===top)cut--;
  }
  if(!cut&&session.presses.length<4096)return;
  if(cut){
    session.words.splice(0,cut);session.index-=cut;
    for(const node of nodes.splice(0,cut))node.el.remove();
  }
  const retained=new Set();
  for(const word of session.words){for(const press of word.input)retained.add(press);if(word.space)retained.add(word.space);}
  const retainedOmissions=new Set(session.words.filter(w=>w.omission).map(w=>w.omission));
  session.archivePracticeRecords(retained,retainedOmissions);
  if(cut){
    const track=$('word-track');track.classList.add('is-recycling');scrollToCaret();
    void track.offsetHeight;track.classList.remove('is-recycling');
    $('accessible-prompt').textContent=translate('Over te typen: ')+session.words.slice(session.index,session.index+35).map(w=>w.text).join(' ');
  }
}
function stopInfinitePractice(t=session?.elapsed()||0){
  if(!isInfinitePractice(session?.config)||session.finished)return;
  clearInterval(timerHandle);timerHandle=null;resetCoach();
  const result=session.finish(Math.max(t,.001),'practice');
  for(const dialog of document.querySelectorAll('dialog[open]'))dialog.close();
  // A summary is feedback, not a stored test. Never call writeLocal or touch history.
  showResult(result);
  $('announcer').textContent=translate('practice.summary.announce',{wpm:Math.round(result.wpm),accuracy:fmtPercent(result.keystrokeAccuracy)});
}
function startUi(){
  document.body.classList.add('running');for(const id of ['timer','live-dot','live-wpm','stop-btn'])$(id).hidden=false;
  updateControls();clearInterval(timerHandle);timerHandle=setInterval(updateLive,100);updateLive();
}
function insertText(text){
  if(!session || session.finished || $('test-view').hidden || document.querySelector('dialog[open]'))return;
  if(session.running && session.elapsed()>=sessionLimit()){completeTest('time',sessionLimit());return;}
  const oldIndex=session.index,wasRunning=session.running;
  const chars=Array.from(isCode(session.config)?text.normalize('NFC').replace(/\r\n?/g,'\n'):text.normalize('NFC').replace(/[\r\n\t]/g,' '));
  for(const ch of chars){
    if(/[\u0000-\u001f\u007f]/.test(ch)&&!(isCode(session.config)&&ch==='\n'))continue;
    if(session.running && session.elapsed()>=sessionLimit()){completeTest('time',sessionLimit());return;}
    if(!session.finite && session.index>=session.words.length-(isAdaptive(session.config)?12:25)){session.addWords(makePrompt(session.config,isAdaptive(session.config)?32:100,session.generatedWordCount,session.promptState));appendNodes();if(isAdaptive(session.config))updateAdaptiveInfo();}
    const expected=expectedPracticeChar();
    const accepted=session.insert(ch);if(accepted&&guideEnabled())coachFeedback(ch,ch===expected);
    const w=session.current;
    if(session.finite && (!w || (session.index===session.words.length-1 && w.input.length>=w.chars.length && w.input.every(p=>p.matches)))){
      if(!wasRunning)startUi();completeTest('text',Math.max(session.elapsed(),.1));return;
    }
  }
  if(!wasRunning && session.running)startUi();
  for(let i=oldIndex;i<=session.index;i++)renderWord(i);
  compactInfinitePractice();scrollToCaret();updateCoachTarget();
}
function eraseInput(word=false){
  if(!session?.running)return;
  if(session.elapsed()>=sessionLimit()){completeTest('time',sessionLimit());return;}
  const old=session.index;session.erase(word);renderWord(old);renderWord(session.index);compactInfinitePractice();scrollToCaret();$('coach-target-issue').textContent='';updateCoachTarget();
}
function completeTest(reason,t){
  if(!session || session.finished)return;
  // Unlimited sessions have a temporary summary, never a stored result.
  if(isInfinitePractice(session.config)){stopInfinitePractice(t);return;}
  clearInterval(timerHandle);timerHandle=null;document.body.classList.remove('running');
  const result=session.finish(Math.max(t,.001),reason);
  if(result.attempts){history.unshift(result);history=history.slice(0,100);if(!writeLocal(STORAGE_KEY,history))toast(translate("Opslag niet beschikbaar. Download een back-up via Voortgang → Beheer."));}
  for(const dialog of document.querySelectorAll('dialog[open]'))dialog.close();
  showResult(result);$('announcer').textContent=translate('result.announce',{wpm:Math.round(result.wpm),accuracy:formatNumber(result.accuracy,1)});
}
function resultModeLabel(r){if(isCode(r))return translate('code.label');if(isStandard(r))return translate('standard.heading');if(r.mode==='numbers'&&isNumpad(r))return translate('numpad.label');if(r.mode==='practice'&&r.practiceGuideVersion===1)return translate('practice.mode')+' · '+practiceLessonLabel(r.practiceLesson);return r.mode==='numbers'?translate("alleen cijfers"):r.mode==='custom'?translate("eigen tekst"):r.mode==='practice'?translate("gerichte oefening"):translate("woorden");}
function showResult(result,preserveView=false){
  currentResult=result;syncResultDeleteControl();if(!preserveView)setView('result');document.body.classList.remove('running');
  const temporary=isInfinitePractice(result)||result.ephemeral===true;
  const context=[resultLanguage(result),temporary?'∞ '+elapsedClock(result.duration):`${round(result.duration,1)}s`,resultModeLabel(result)];
  $('practice-session-note').hidden=!temporary;
  $('practice-session-detail').hidden=!temporary;
  if(temporary)$('practice-session-detail').textContent=translate('practice.summary.details',{attempts:formatNumber(result.attempts),correct:formatNumber(result.correct),backspaces:formatNumber(result.backspaces)});
  $('results-view').dataset.ephemeral=String(temporary);
  $('results-view').setAttribute('aria-label',translate(temporary?'practice.summary.title':'Testresultaat'));
  const speedLabel=$('result-speed-label');speedLabel.dataset.i18n=temporary?'practice.summary.wpm':'WPM';speedLabel.textContent=temporary?translate('practice.summary.wpm'):'WPM';
  const again=$('again-btn').querySelector('[data-i18n]');again.dataset.i18n=temporary?'practice.summary.again':'Nog een test';again.textContent=translate(again.dataset.i18n);
  if(hasWordCorpus(result)&&!isStandard(result))context.push(corpusLabel(result));
  if(isCode(result))context.push(translate(result.codeAided?'practice.result.aided':'practice.result.unaided'));
  if(result.keyboardLayout&&result.mode!=='numbers'&&!guidedDrill(result))context.push(layoutLabel(result));
  if(result.mode==='numbers')context.push((result.numberLength==='mixed'||!result.numberLength?'2–4':result.numberLength)+translate(" cijfers"));
  else if(result.numbers && result.mode!=='custom')context.push('+123');
  if(result.punctuation && result.mode!=='custom'&&result.mode!=='numbers')context.push(translate("leestekens"));
  if(usesCapitalization(result))context.push(translate(!result.punctuation&&result.capitalPlacement!=='initial'?'capitals.legacy':'capitals.label'));
  if(result.mode==='numbers'&&!isNumpad(result))context.push(numericLayoutLabel(result));
  if(isNumpad(result))context.push(translate(result.numberAided?'practice.result.aided':'practice.result.unaided'));
  if(result.reason==='manual')context.push(translate("verkort"));if(result.interrupted)context.push(translate("onderbroken"));
  $('result-context').innerHTML=context.map((text,i)=>`<span${i===0?' class="context-pill"':''}>${safeText(text)}</span>`).join('<span aria-hidden="true">·</span>');
  $('result-wpm').textContent=Math.round(result.wpm);$('result-accuracy').textContent=fmtPercent(result.accuracy);
  $('result-raw').textContent=Math.round(result.raw);$('result-consistency').textContent=result.consistency===null?'—':Math.round(result.consistency)+'%';
  $('result-cpm').textContent=Math.round(result.cpm);$('result-kph').textContent=resultKPH(result).toLocaleString(uiLocale());$('result-typos').textContent=result.typos;$('result-uncorrected').textContent=result.uncorrected;
  $('result-keystroke').textContent=fmtPercent(result.keystrokeAccuracy);$('result-corrections').textContent=translate('result.corrections',{corrected:result.corrected,typos:result.typos});
  $('chart-wrap').hidden=!result.samples.length;$('result-legend').hidden=!result.samples.length;$('result-chart-empty').hidden=temporary||!!result.samples.length;
  $('weak-spots').hidden=!!result.summaryOnly&&!Object.keys(result.keys).length;
  $('practice-result-note').hidden=result.practiceGuideVersion!==1;
  if(result.practiceGuideVersion===1)$('practice-result-note').textContent=translate(temporary?'practice.summary.note':'practice.result.note',{lesson:practiceLessonLabel(result.practiceLesson),guidance:translate(result.practiceAided?'practice.result.aided':'practice.result.unaided')});
  $('chart-tooltip').hidden=true;if(result.samples.length)drawChart(result);drawWeakSpots(result);resultInsight(result);
  renderBenchmark('result-benchmark',temporary?null:benchmarkModel(result),!preserveView);
  for(const id of ['result-back','result-history-btn','view-progress-btn','copy-btn'])$(id).hidden=temporary;
  // Do not persist weak-key targets derived from a private practice summary.
  if(temporary)$('training-note').hidden=true;
  // Focus a non-interactive result region. A trailing Space/Enter from typing
  // must not activate 'Another test' after the timer or last custom-text letter.
  if(!preserveView){window.scrollTo({top:0,behavior:'instant'});$('results-view').focus({preventScroll:true});}
}

/* ======================= Indicative speed benchmarks =======================
   Research anchor: Aalto / Cambridge, CHI 2018. Mean rounded to 52 WPM.
   The level names and cut-offs below are a product convention, not population
   percentiles or six scientifically validated categories. WPM and CPM share
   one scale (five correct output characters per standard word).
   This layer never rewrites test results, random generators or stored history. */
const SPEED_REFERENCE = Object.freeze({wpm:52, cpm:260, plotMax:140});
const SPEED_BANDS = Object.freeze([
  {min:0,   max:30,       label:'Rustig'},
  {min:30,  max:60,       label:'Gangbaar'},
  {min:60,  max:80,       label:'Vlot'},
  {min:80,  max:100,      label:'Snel'},
  {min:100, max:120,      label:'Zeer snel'},
  {min:120, max:Infinity, label:'Uitzonderlijk snel'}
].map(Object.freeze));
const BENCHMARK_MIN_HISTORY = 3;
const benchmarkViews = new Map();
const benchmarkNumber = n => Number(n).toLocaleString(uiLocale(),{maximumFractionDigits:2});
const benchmarkSpeed = n => `${benchmarkNumber(n)} WPM · ${benchmarkNumber(n*5)} CPM`;
function speedBand(wpm){
  return Number.isFinite(wpm)&&wpm>=0 ? SPEED_BANDS.find(b=>wpm>=b.min&&wpm<b.max) : null;
}
function bandRange(b,factor=1){
  if(!Number.isFinite(b.max))return benchmarkNumber(b.min*factor)+'+';
  if(b.min===0)return '< '+benchmarkNumber(b.max*factor);
  return benchmarkNumber(b.min*factor)+'–<'+benchmarkNumber(b.max*factor);
}
function showBenchmarkHelp(wpm=null){
  const current=speedBand(wpm);
  $('benchmark-band-rows').innerHTML=SPEED_BANDS.map(b=>`<tr${b===current?' class="is-current" aria-current="true"':''}><td>${safeText(translate(b.label))}</td><td>${bandRange(b)}</td><td>${bandRange(b,5)}</td></tr>`).join('');
  showHelp('scores');
  requestAnimationFrame(()=>{
    const heading=$('benchmark-help-heading');
    heading.scrollIntoView({block:'start',behavior:'instant'});
    heading.focus({preventScroll:true});
  });
}
function externalBenchmarkAllowed(r){
  return (r.mode||'words')==='words' && isCompleteResult(r) && Number.isFinite(r.wpm) && r.wpm>=0 && r.duration>=15;
}
function comparableExternalBenchmark(rows,comparable){
  return comparable && rows.length>0 && rows.every(externalBenchmarkAllowed);
}
function benchmarkModel(r){
  const base={wpm:r.wpm,kind:'unavailable',heading:translate("Tempo in perspectief"),title:translate("Geen benchmark"),note:''};
  if(!Number.isFinite(r.wpm)||r.wpm<0)return {...base,wpm:null,note:translate("Geen bruikbare snelheid beschikbaar.")};
  if(!isCompleteResult(r))return {...base,title:r.interrupted?translate("Test onderbroken"):translate("Verkorte test"),note:translate("Geen tempobeoordeling: rond een volledige test af zonder onderbreking.")};
  if(r.duration<15)return {...base,title:translate("Te korte meting"),note:translate("Minder dan 15 seconden: onvoldoende voor deze tempo-indicatie.")};
  if(isCode(r))return {...base,title:translate('code.label'),note:translate('code.benchmark')};
  if(r.mode==='custom')return {...base,title:translate("Eigen tekst"),note:translate("Teksten verschillen in moeilijkheid. Je snelheid blijft zichtbaar, maar krijgt geen algemeen tempolabel.")};
  if(isAdaptive(r))return {...base,title:translate('adaptive.noBenchmark'),note:translate('adaptive.noBenchmark.note')};
  if(r.mode==='numbers'||r.mode==='practice'){
    const previous=history.filter(x=>x.id!==r.id && isCompleteResult(x) && x.duration>=15 && profileKey(x)===profileKey(r) && new Date(x.date)<new Date(r.date) && Number.isFinite(x.wpm) && x.wpm>=0);
    const noun=r.mode==='numbers'?translate("cijferreeksen"):translate("gerichte oefeningen");
    if(previous.length<BENCHMARK_MIN_HISTORY)return {...base,heading:translate("Persoonlijke benchmark"),title:translate("Bouw je referentie op"),note:translate('benchmark.build',{count:previous.length,needed:BENCHMARK_MIN_HISTORY,noun})};
    const values=previous.map(x=>x.wpm),min=Math.min(...values),max=Math.max(...values),average=mean(values);
    return {...base,kind:'personal',heading:translate("Je eigen referentie"),title:r.wpm>max?translate("Boven je eerdere bereik"):r.wpm<min?translate("Onder je eerdere bereik"):translate("Binnen je eerdere bereik"),
      min,max,reference:average,next:null,count:values.length,
      note:translate('benchmark.range',{min:benchmarkNumber(min),max:benchmarkNumber(max),minCpm:benchmarkNumber(min*5),maxCpm:benchmarkNumber(max*5),count:values.length})};
  }
  const band=speedBand(r.wpm);
  let note=translate("Indicatieve eigen indeling; onderzoek met Engelse zinnen, niet deze test.");
  if(r.language!=='en')note+=translate(" Geen taalspecifieke norm.");
  if(r.numbers)note+=translate(" Woorden met cijfers zijn niet apart genormeerd.");
  if(usesCapitalization(r))note+=' '+translate('capitals.benchmark');
  if(r.duration<60)note+=translate(" Korte test: momentopname.");
  if(r.wpm>SPEED_REFERENCE.plotMax)note+=translate(" De schaal eindigt bij 140+ WPM / 700+ CPM.");
  return {...base,kind:'external',title:translate(band.label),band,reference:SPEED_REFERENCE.wpm,next:Number.isFinite(band.max)?band.max:null,note};
}
function renderBenchmark(id,model,animate=true){
  const host=$(id);if(!host)return;
  benchmarkViews.set(id,model);
  host.hidden=!model;
  if(!model){host.replaceChildren();return;}
  host.dataset.state=model.kind;
  const refLabel=model.kind==='personal'?translate("Eigen gemiddelde"):translate("Onderzoek · ≈");
  const meta=model.kind==='unavailable'?'':`<div class="benchmark-meta"><span class="benchmark-reference">${refLabel} ${safeText(benchmarkSpeed(model.reference))}</span>${model.next!==null?`<span class="benchmark-next">${safeText(translate('benchmark.next',{speed:benchmarkSpeed(model.next)}))}</span>`:model.kind==='external'?`<span>${translate('benchmark.top')}</span>`:''}</div>`;
  host.innerHTML=`<div class="benchmark-head"><h2>${safeText(model.heading)}</h2><button type="button" class="benchmark-help" aria-label="${safeText(translate('benchmark.helpAria'))}">${safeText(translate('benchmark.help'))} <span aria-hidden="true">↗</span></button></div><div class="benchmark-summary"><strong class="benchmark-level">${safeText(model.title)}</strong><span class="benchmark-score">${model.scoreLabel?safeText(model.scoreLabel)+' · ':''}${Number.isFinite(model.wpm)?safeText(benchmarkSpeed(model.wpm)):''}</span></div>${model.kind==='unavailable'?'':`<svg role="img" aria-label="${safeText(translate('benchmark.scaleAria'))}"></svg>`}${meta}<p class="benchmark-note">${safeText(model.note)}</p>`;
  host.querySelector('.benchmark-help').onclick=()=>showBenchmarkHelp(model.kind==='external'?model.wpm:null);
  if(model.kind!=='unavailable')drawBenchmarkRuler(host,model,animate);
}
function drawBenchmarkRuler(host,model,animate=true){
  const svg=host.querySelector('svg');if(!svg)return;
  const W=Math.max(245,Math.round(host.clientWidth||680)),H=66,L=W<400?31:38,R=18,pw=W-L-R;
  const max=model.kind==='external'?SPEED_REFERENCE.plotMax:Math.max(20,Math.ceil(Math.max(model.wpm,model.max)*1.15/10)*10);
  const x=v=>L+Math.max(0,Math.min(max,v))/max*pw;
  const n=v=>Number(v).toFixed(2);
  const ticks=model.kind==='external'?[0,30,60,80,100,120,140]:Array.from({length:5},(_,i)=>max*i/4);
  let out=`<title>${safeText(model.title)} · ${safeText(benchmarkSpeed(model.wpm))}</title><desc>${model.kind==='external'?translate("Zes indicatieve tempobanden. Een stippellijn markeert het onderzoeksreferentiepunt."):translate("Een lijn markeert het minimum en maximum van je eerdere vergelijkbare tests; de stippellijn is hun gemiddelde.")} ${translate('benchmark.units')} ${safeText(model.note)}</desc><text class="benchmark-unit" x="0" y="15">WPM</text><text class="benchmark-unit" x="0" y="59">CPM</text>`;
  if(model.kind==='external'){
    SPEED_BANDS.forEach(b=>{
      const active=b===model.band,a=x(b.min)+(b.min?2:0),z=x(Math.min(b.max,max))-2;
      out+=`<line class="benchmark-segment" x1="${n(a)}" x2="${n(z)}" y1="34" y2="34" stroke="${active?'var(--accent)':'var(--line)'}" stroke-width="${active?'2.4':'1.5'}"><title>${safeText(translate(b.label))} · ${safeText(bandRange(b))} WPM · ${safeText(bandRange(b,5))} CPM</title></line>`;
    });
  }else{
    out+=`<line x1="${L}" x2="${W-R}" y1="34" y2="34" stroke="var(--line)" stroke-width="1"/><line x1="${n(x(model.min))}" x2="${n(x(model.max))}" y1="34" y2="34" stroke="var(--muted)" stroke-width="2.5"><title>${translate('benchmark.previousRange')}</title></line>`;
    for(const v of [model.min,model.max])out+=`<line x1="${n(x(v))}" x2="${n(x(v))}" y1="30" y2="38" stroke="var(--muted)" stroke-width="1"/>`;
  }
  ticks.forEach((v,i)=>{
    const suffix=model.kind==='external'&&i===ticks.length-1?'+':'';
    const xx=x(v),anchor=i===0?'start':model.kind==='external'?'middle':i===ticks.length-1?'end':'middle';
    out+=`<line x1="${n(xx)}" x2="${n(xx)}" y1="30" y2="38" stroke="var(--line)" stroke-width="1"/><text class="benchmark-axis" x="${n(xx)}" y="15" text-anchor="${anchor}">${benchmarkNumber(v)}${suffix}</text><text class="benchmark-axis" x="${n(xx)}" y="59" text-anchor="${anchor}">${benchmarkNumber(v*5)}${suffix}</text>`;
  });
  out+=`<line x1="${n(x(model.reference))}" x2="${n(x(model.reference))}" y1="21" y2="47" stroke="var(--muted)" stroke-width="1" stroke-dasharray="2 3"><title>${model.kind==='personal'?translate("Eigen gemiddelde"):translate("Afgerond onderzoeksgemiddelde")}: ${safeText(benchmarkSpeed(model.reference))}</title></line>`;
  const px=x(model.wpm);
  out+=`<g${animate?' class="benchmark-pin"':''}><title>${model.scoreLabel?safeText(model.scoreLabel):translate("Deze test")}: ${safeText(benchmarkSpeed(model.wpm))}</title><path d="M${n(px-3)},22 L${n(px)},26 L${n(px+3)},22" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="${n(px)}" x2="${n(px)}" y1="26" y2="43" stroke="var(--accent)" stroke-width="1.2"/><circle cx="${n(px)}" cy="34" r="3" fill="var(--bg)" stroke="var(--accent)" stroke-width="1.6"/></g>`;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML=out;
}
function renderProgressBenchmark(rows,comparable){
  if(progressMetric!=='wpm'||!comparableExternalBenchmark(rows,comparable)){renderBenchmark('progress-benchmark',null);return;}
  const average=mean(rows.map(r=>r.wpm)),model=benchmarkModel({...rows[0],wpm:average});
  model.heading=translate("Gemiddeld tempo · deze selectie");model.scoreLabel=translate("Gemiddeld");
  model.note=tp('benchmark.comparable',rows.length)+model.note;
  renderBenchmark('progress-benchmark',model);
}

/* ==================== SVG chart, legend and hit-testing ==================== */
function drawChart(result){
  const svg=$('chart'), W=Math.max(250,Math.round($('chart-wrap').clientWidth||680)),H=W<520?205:228,L=W<520?29:38,R=14,T=10,B=28;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const plotW=W-L-R,plotH=H-T-B;
  const values=result.samples.flatMap(s=>[s.burst,s.raw+10,s.net]);
  const maximum=Math.max(60,...values),step=Math.max(12,Math.ceil(maximum/4/12)*12),maxY=step*4;
  const duration=Math.max(result.duration,1);const x=t=>L+Math.min(t,duration)/duration*plotW,y=v=>T+plotH-Math.min(v,maxY)/maxY*plotH;
  let out=`<title>${safeText(translate('chart.title',{seconds:formatNumber(result.duration,1)}))}</title><desc>${translate('chart.desc')}</desc>`;
  for(let i=0;i<=4;i++){const value=i*step,yy=y(value);out+=`<line class="chart-grid" x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}"/><text class="chart-label" x="${L-7}" y="${yy+3}" text-anchor="end">${value}</text>`;}
  const tick=duration<=15?3:duration<=30?5:duration<=60?10:15;
  const ticks=[];for(let t=0;t<duration;t+=tick)ticks.push(t);ticks.push(duration);
  for(const t of ticks){const xx=x(t);out+=`<line class="chart-xline" x1="${xx}" y1="${T}" x2="${xx}" y2="${H-B}"/><text class="chart-label" x="${xx}" y="${H-9}" text-anchor="middle">${Math.round(t)}</text>`;}
  const points=key=>result.samples.map(s=>`${x(s.t).toFixed(2)},${y(s[key]).toFixed(2)}`).join(' ');
  if(result.samples.length){
    const first=result.samples[0],last=result.samples[result.samples.length-1];
    out+=`<g data-layer="burst"><polygon points="${x(first.t)},${y(0)} ${points('burst')} ${x(last.t)},${y(0)}" fill="var(--burst)" fill-opacity=".11"/><polyline points="${points('burst')}" fill="none" stroke="var(--burst)" stroke-width=".9" stroke-linejoin="round"/></g>`;
    out+=`<g data-layer="raw"><polyline points="${points('raw')}" fill="none" stroke="var(--raw)" stroke-width="1.15" stroke-dasharray="5 3" stroke-linejoin="round"/></g>`;
    out+=`<g data-layer="net"><polyline points="${points('net')}" fill="none" stroke="var(--net)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  // Aggregate crossings by second, without inventing or duplicating error events.
  for(const resolved of [true,false]){
    const bins=new Map();for(const e of result.errors.filter(e=>e.resolved===resolved)){const b=Math.max(1,Math.ceil(e.t));bins.set(b,(bins.get(b)||0)+1);}
    out+=`<g data-layer="${resolved?'fixed':'wrong'}" fill="none" stroke="var(--${resolved?'fixed':'error'})" stroke-width="1.3">`;
    for(const [second,count] of bins){
      const sample=result.samples.reduce((best,s)=>Math.abs(s.t-second)<Math.abs(best.t-second)?s:best,result.samples[0]);
      if(!sample)continue;const xx=x(Math.min(second,duration)),yy=y(sample.raw+5+(resolved?0:9)),d=4.2;
      out+=`<path d="M${xx-d},${yy-d}L${xx+d},${yy+d}M${xx-d},${yy+d}L${xx+d},${yy-d}"/>`;
      if(count>1)out+=`<text x="${xx+5}" y="${yy+3}" font-family="var(--mono)" font-size="8" stroke="none" fill="var(--${resolved?'fixed':'error'})">${count}</text>`;
    }
    out+='</g>';
  }
  out+=`<line id="chart-cursor" x1="0" x2="0" y1="${T}" y2="${H-B}" stroke="var(--muted)" stroke-width=".7" stroke-dasharray="2 4" opacity="0"/>`;
  svg.innerHTML=out;
  for(const [name,visible] of Object.entries(shownSeries)){const layer=svg.querySelector(`[data-layer="${name}"]`);if(layer)layer.style.display=visible?'':'none';}
  svg.onpointermove=(event)=>{
    if(!result.samples.length)return;
    const rect=svg.getBoundingClientRect(),mx=(event.clientX-rect.left)/rect.width*W;
    const t=Math.max(0,Math.min(duration,(mx-L)/plotW*duration));
    const nearest=result.samples.reduce((a,b)=>Math.abs(b.t-t)<Math.abs(a.t-t)?b:a);
    const cursor=$('chart-cursor');cursor.setAttribute('x1',x(nearest.t));cursor.setAttribute('x2',x(nearest.t));cursor.setAttribute('opacity','.5');
    const tip=$('chart-tooltip');tip.innerHTML=`${round(nearest.t,1)}s &nbsp;·&nbsp; ${translate('Netto')} <b>${Math.round(nearest.net)}</b><br>${translate('Bruto')} ${Math.round(nearest.raw)} &nbsp; ${translate('Burst')} ${Math.round(nearest.burst)}`;tip.hidden=false;
    const px=(x(nearest.t)/W)*rect.width;tip.style.left=Math.max(8,Math.min(px+13,rect.width-184))+'px';
  };
  svg.onpointerleave=()=>{$('chart-tooltip').hidden=true;$('chart-cursor')?.setAttribute('opacity','0');};
}
const FINGER_LAYOUT=[
 ['Linker pink','`~1!qaz'],['Linker ringvinger','2@wsx'],['Linker middelv.','3#edc'],['Linker wijsvinger','4$5%rtfgvb'],
 ['Rechter wijsvinger','6^7&yuhjnm'],['Rechter middelv.','8*ik,<'],['Rechter ringvinger','9(ol.>'],['Rechter pink',"{}0)p;:/?[-_=+]'\"\\|"],['Duimen',' ']
];
function fingerFor(key,config=null){
  if(key==='\n')return 'practice.finger.rp';
  if(isNumpad(config)){
    if(key===' ')return 'numpad.separator'; // Enter and Space are equivalent; actual fingers are unknown.
    const entry=NUMPAD_CHARACTERS.get(key),finger=COACH_FINGERS.find(f=>f.id===entry?.key.finger);
    return finger?.name||translate("Overig / accent");
  }
  const finger=coachFingerFor(key,config||{keyboardLayout:'us'});
  return finger?.name||translate('Overig / accent');
}
function drawWeakSpots(result){
  for(const [id,key] of [['weak-finger-heading',isNumpad(result)?'numpad.fingerheading':'Vingers · QWERTY'],['weak-finger-map',isNumpad(result)?'numpad.fingermap':'Finger map: US QWERTY — theoretische toewijzing, niet je werkelijk gebruikte vingers.']]){$(id).dataset.i18n=key;$(id).textContent=translate(key);}
  if(!isNumpad(result)){
    $('weak-finger-heading').removeAttribute('data-i18n');$('weak-finger-map').removeAttribute('data-i18n');
    $('weak-finger-heading').textContent=translate('layout.fingers',{layout:layoutLabel(result)});
    $('weak-finger-map').textContent=translate('layout.fingermap',{layout:layoutLabel(result)});
  }
  const entries=Object.entries(result.keys).filter(([,v])=>v.errors>0).sort((a,b)=>b[1].errors-a[1].errors || a[0].localeCompare(b[0]));
  $('weak-columns').hidden=!entries.length;$('empty-weak').hidden=!!entries.length;$('weak-footnote').hidden=!entries.length;
  function bar(label,errors,attempts,max,finger=false){
    const percent=result.typos?Math.round(errors/result.typos*100):0;
    const errorRate=attempts?Math.round(errors/attempts*100):0;
    return `<div class="bar-row" title="${safeText(translate('weak.tooltip',{label,errors,attempts,errorRate,percent}))}"><span class="${finger?'finger-label':'bar-key'}">${safeText(label)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(2,errors/max*100)}%"></div></div><span class="bar-value">${errors} · ${percent}%</span></div>`;
  }
  $('key-bars').innerHTML=entries.slice(0,10).map(([key,v])=>bar(labelKey(key),v.errors,v.attempts,entries[0][1].errors)).join('');
  const fingers={};for(const [key,v] of Object.entries(result.keys)){const name=isNumpad(result)&&key===' '?'numpad.separator':fingerFor(key,result);const bucket=fingers[name] ||= {errors:0,attempts:0};bucket.errors+=v.errors;bucket.attempts+=v.attempts;}
  const sorted=Object.entries(fingers).filter(([,v])=>v.errors).sort((a,b)=>b[1].errors-a[1].errors);
  $('finger-bars').innerHTML=sorted.map(([name,v])=>bar(translate(name),v.errors,v.attempts,sorted[0][1].errors,true)).join('');
  const candidates=entries.filter(([key])=>/^[a-zà-ž]$/i.test(key)).slice(0,3).map(([key])=>key.toLowerCase());
  $('training-note').hidden=!candidates.length || result.mode==='custom' || result.mode==='numbers' || isCode(result);
  if(candidates.length){$('training-message').textContent=translate("Gericht oefenen met woorden met ")+candidates.join(' · ')+'.';$('training-btn').onclick=()=>{settings.language=result.language;settings.keyboardLayout=layoutId(result);settings.standardTest=false;mode='practice';practiceKeys=candidates;settings.practiceLesson='weak';settings.practiceKeys=[...candidates];persistSettings();newTest();};}
}

/* ============================ Dialogs and history ========================== */
function openDialog(id){closeTestInfo();$('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');const d=$(id);if(!d.open)d.showModal();}
function showHelp(tab='typing'){selectHelpTab(tab);openDialog('help-dialog');}
function selectHelpTab(tab){document.querySelectorAll('[data-help-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.helpTab===tab)));for(const name of ['typing','scores','sources'])$('help-'+name).hidden=name!==tab;}

function downloadFile(text,name,type){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function exportHistory(){
  // CSV schema stays language-neutral/stable for round-trip compatibility.
  const header=['datum','taal','modus','duur_seconden','ingestelde_duur','WPM','raw_WPM','CPM','eindnauwkeurigheid_pct','aanslagnauwkeurigheid_pct','consistency_pct','typefouten','ongecorrigeerd','verwijderde_typefouten','getallen','leestekens','einde','onderbroken','cijferlengte','oefening','vingergids_versie','oefentoetsen','aanslaghulp','hoofdletters','cijfertoetsenbord','hoofdletterpositie','KPH','toetsindeling','standaard_versie','corpus_sha256','score_versie','adaptief_versie','woordenlijst_versie','woordenlijst_sha256','code_versie','code_sha256','code_aanslaghulp'];
  const rows=historySelection().map(r=>[r.date,r.language,r.mode,r.duration,r.plannedDuration,r.wpm,r.raw,r.cpm,r.accuracy,r.keystrokeAccuracy,r.consistency??'',r.typos,r.uncorrected,r.corrected,r.numbers,r.punctuation,r.reason,r.interrupted,r.mode==='numbers'?(r.numberLength||'mixed'):'',r.practiceLesson||'',r.practiceGuideVersion||'',(r.practiceKeys||[]).join('/'),r.practiceGuideVersion===1?String(!!r.practiceAided):r.mode==='numbers'?String(!!r.numberAided):'',usesCapitalization(r),r.mode==='numbers'?(r.numberKeyboard||'row'):'',usesCapitalization(r)?(r.capitalPlacement||'mixed'):'',resultKPH(r),r.keyboardLayout||'',r.standardVersion||'',r.corpusFingerprint||'',r.scoringVersion||'',r.adaptiveVersion||'',r.wordCorpusVersion||'',r.wordCorpusFingerprint||'',r.codeVersion||'',r.codeCorpusFingerprint||'',isCode(r)?String(!!r.codeAided):'']);
  const csv=[header,...rows].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\r\n');
  downloadFile('\ufeff'+csv,'typetest-geschiedenis-'+new Date().toISOString().slice(0,10)+'.csv','text/csv;charset=utf-8');
}
async function copyResult(){
  const r=currentResult;if(!r)return;
  let text=translate('result.copy',{language:resultLanguage(r),duration:formatNumber(r.duration,1),mode:resultModeLabel(r)+(usesCapitalization(r)?' · '+translate('capitals.label'):''),wpm:Math.round(r.wpm),accuracy:fmtPercent(r.accuracy),keystrokeAccuracy:fmtPercent(r.keystrokeAccuracy),typos:r.typos,uncorrected:r.uncorrected,raw:Math.round(r.raw),cpm:Math.round(r.cpm),consistency:r.consistency===null?'—':Math.round(r.consistency)+'%'});
  text+='\n'+resultKPH(r).toLocaleString(uiLocale())+' KPH';
  try {if(!navigator.clipboard?.writeText)throw new Error('fallback');await navigator.clipboard.writeText(text);toast(translate("Resultaat gekopieerd."));}
  catch {const el=document.createElement('textarea');el.value=text;el.style.position='fixed';el.style.top='-9999px';document.body.append(el);el.select();let ok=false;try{ok=document.execCommand('copy');}catch{}el.remove();if(ok)toast(translate("Resultaat gekopieerd."));else{downloadFile(text,'typetest-resultaat.txt','text/plain;charset=utf-8');toast(translate("Klembord niet beschikbaar; resultaat opgeslagen als tekstbestand."));}}
}

/* ===================== Comparable progress, local only ===================== */
function resultLanguage(r){if(isCode(r))return codeName(r.language);if(guidedDrill(r))return layoutLabel(r);return r.mode==='numbers'?translate("Getallen"):languageName(r.language);}
function isCompleteResult(r){return !isInfinitePractice(r)&&r.ephemeral!==true&&!r.interrupted && (r.reason==='time' || (r.mode==='custom' && r.reason==='text'));}
function profileKey(r){
  const m=r.mode||'words',duration=r.plannedDuration||Math.round(r.duration||settings.duration),layout=layoutId(r);
  const caseKey=usesCapitalization(r)?(!r.punctuation&&r.capitalPlacement==='initial'?'|capitals-initial':'|capitals-v1'):'';
  if(isCode(r))return ['code-v1',r.language,layout,duration,r.codeCorpusFingerprint||'unknown',Number(!!r.codeAided)].join('|');
  if(isStandard(r))return ['standard-v1',r.language,layout,r.corpusFingerprint,r.scoringVersion||'ritme-output-v1',60].join('|');
  if(m==='practice'&&r.practiceGuideVersion===1)return ['practice-v1',r.practiceLesson,guidedDrill(r)?'qwerty-us':r.language,duration,Number(!!r.numbers),Number(!!r.punctuation),(r.practiceKeys||[]).slice().sort().join(''),Number(!!r.practiceAided)].join('|')+caseKey+(layout==='us'?'':'|layout-'+layout)+(isAdaptive(r)?'|adaptive-v1':'')+corpusProfileSuffix(r);
  if(m==='numbers')return `numbers|${r.numberLength||'mixed'}|${duration}`+(isNumpad(r)?'|numpad|'+Number(!!r.numberAided):(layout==='us'?'':'|layout-'+layout));
  return [m,r.language,duration,m==='custom'?0:Number(!!r.numbers),m==='custom'?0:Number(!!r.punctuation),m==='practice'?(r.practiceKeys||[]).slice().sort().join(''):'' ].join('|')+caseKey+(layout==='us'?'':'|layout-'+layout)+corpusProfileSuffix(r);
}
function profileLabel(r){
  const d=(r.plannedDuration||Math.round(r.duration))+'s';
  if(r.mode==='numbers')return translate('profile.numbers',{digits:r.numberLength==='mixed'||!r.numberLength?'2–4':r.numberLength})+' · '+d+' · '+numericLayoutLabel(r)+(isNumpad(r)?' · '+translate(r.numberAided?'practice.result.aided':'practice.result.unaided'):'');
  let out=`${resultLanguage(r)} · ${resultModeLabel(r)} · ${d}`;
  if(r.mode!=='custom'&&!isCode(r)&&!guidedDrill(r))out+=r.punctuation?translate(" · leestekens"):translate(" · zonder leestekens");
  if(r.numbers && r.mode!=='numbers' && r.mode!=='custom')out+=' · +123';
  if(usesCapitalization(r))out+=' · '+translate(!r.punctuation&&r.capitalPlacement!=='initial'?'capitals.legacy':'capitals.label');
  if(r.mode==='practice'&&(r.practiceKeys||[]).length)out+=' · '+r.practiceKeys.join('/');
  if(r.mode!=='numbers')out+=' · '+layoutLabel(r);
  if(isStandard(r))out+=' · '+(r.corpusFingerprint||'').slice(0,8);
  if(hasWordCorpus(r)&&!isStandard(r))out+=' · '+corpusLabel(r);
  if(isCode(r))out+=' · '+translate(r.codeAided?'practice.result.aided':'practice.result.unaided');
  if(r.practiceGuideVersion===1)out+=' · '+translate(r.practiceAided?'practice.result.aided':'practice.result.unaided');
  return out;
}
function setView(name){
  closeTestInfo();
  $('test-view').hidden=name!=='test';$('results-view').hidden=name!=='result';$('progress-view').hidden=name!=='progress';
  $('test-nav-btn').setAttribute('aria-current',name==='progress'?'false':'page');
  $('history-btn').setAttribute('aria-current',name==='progress'?'page':'false');
  document.body.dataset.view=name;
  $('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');
  if(name!=='test'){$('capture').blur();document.body.classList.remove('running');}
}
function updatePersonalBest(){
  if(!session)return;
  if(isInfinitePractice(session.config)||isAdaptive(session.config)){$('personal-best').hidden=true;return;}
  const key=profileKey(session.config),candidates=history.filter(r=>isCompleteResult(r)&&profileKey(r)===key);
  $('personal-best').hidden=!candidates.length;
  if(candidates.length){$('pb-value').textContent=Math.round(Math.max(...candidates.map(r=>r.wpm)));$('pb-context').textContent=mode==='numbers'?translate('pb.numbers',{duration:session.config.duration}):`${resultLanguage(session.config)} · ${session.config.duration}s`;}
}
function refreshProfiles(){
  const select=$('history-filter'),previous=select.value,groups=new Map();
  for(const r of history){const key=profileKey(r);if(!groups.has(key))groups.set(key,{result:r,count:0});groups.get(key).count++;}
  select.replaceChildren();
  const all=document.createElement('option');all.value='all';all.textContent=translate("Alle tests")+(groups.size>1?translate(" · verschillende instellingen"):'');select.append(all);
  for(const [key,group] of groups){const opt=document.createElement('option');opt.value=key;opt.textContent=profileLabel(group.result)+` (${group.count})`;select.append(opt);}
  if(!progressFilterInitialized && history.length){
    const active=profileKey(currentResult||session?.config||{});
    select.value=groups.has(active)?active:profileKey(history.find(isCompleteResult)||history[0]);progressFilterInitialized=true;
  }else select.value=previous==='all'||groups.has(previous)?previous:'all';
}
function historySelection(){
  const filter=$('history-filter').value,period=$('progress-period').value;
  const since=period==='all'?-Infinity:Date.now()-Number(period)*86400000;
  return history.filter(r=>(filter==='all'||profileKey(r)===filter)&&new Date(r.date).getTime()>=since).sort((a,b)=>new Date(b.date)-new Date(a.date));
}
function metricValue(r){
  if(progressMetric==='wpm'){
    if(settings.speedUnit==='cpm')return Number.isFinite(r.cpm)?r.cpm:null;
    if(settings.speedUnit==='kph')return Number.isFinite(r.cpm)?r.cpm*60:null;
  }
  return Number.isFinite(r[progressMetric])?r[progressMetric]:null;
}
function metricDisplay(value){return Number.isFinite(value)?(progressMetric==='wpm'?String(Math.round(value)):formatNumber(value,1)):'—';}
function mean(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;}
function renderHistory(){
  refreshProfiles();
  const rows=historySelection(),eligible=rows.filter(isCompleteResult),plotted=eligible.filter(r=>metricValue(r)!==null);
  const values=plotted.map(metricValue),average=mean(values),best=values.length?Math.max(...values):null;
  const labels={wpm:[translate("Je snelheid in beeld"),translate("Correcte tekens, omgerekend naar woorden per minuut.")],keystrokeAccuracy:[translate("Minder corrigeren, meer flow"),translate("Aanslagnauwkeurigheid, dus inclusief herstelde fouten.")],consistency:[translate("Je ritme in beeld"),translate("Hoe gelijkmatig je typt tijdens een test.")]};
  $('speed-unit').value=settings.speedUnit;$('speed-unit-wrap').hidden=progressMetric!=='wpm';
  $('progress-chart-title').textContent=labels[progressMetric][0];$('progress-chart-subtitle').textContent=labels[progressMetric][1];
  $('history-last').textContent=metricDisplay(values[0]);$('history-median').textContent=metricDisplay(average);$('history-best').textContent=metricDisplay(best);$('history-count').textContent=eligible.length;
  document.querySelectorAll('.progress-unit').forEach(e=>e.textContent=progressMetric==='wpm'?speedUnit():'%');
  $('history-last-note').textContent=plotted.length?new Date(plotted[0].date).toLocaleDateString(uiLocale(),{day:'numeric',month:'short'}):translate("Nog geen meetpunten");
  $('history-best-note').textContent=values.length?translate("Binnen deze selectie"):translate("Nog geen meetpunten");
  const minutes=eligible.reduce((n,r)=>n+r.duration,0)/60;
  $('history-time-note').textContent=translate('practice.minutes.'+(Math.round(minutes)===1?'one':'other'),{count:minutes&&minutes<1?'< 1':Math.round(minutes)});
  const adaptive=plotted.some(isAdaptive);
  const comparable=new Set(plotted.map(profileKey)).size===1 && plotted[0]?.mode!=='custom'&&!adaptive;
  if(adaptive&&progressMetric==='wpm')$('history-best').textContent='—';
  renderProgressBenchmark(plotted,comparable);
  const excluded=rows.length-eligible.length;
  let explanation=translate("Grafiek en kerncijfers: volledige tests zonder onderbreking. Onder de grafiek staan ook verkorte of onderbroken tests.");
  if(excluded)explanation+=tp('progress.excluded',excluded);
  if(adaptive)explanation+=' '+translate('adaptive.progress.note');
  else if(plotted.length && !comparable)explanation+=translate(" Verschillende instellingen of eigen teksten: geen gezamenlijke trendlijn.");
  else if(plotted.length>0 && plotted.length<5)explanation+=translate(" Vanaf vijf vergelijkbare tests verschijnt je voortschrijdend gemiddelde.");
  if(plotted[0]?.mode==='numbers')explanation+=translate(" Bij getallen blijft 1 WPM gelijk aan 5 tekens, inclusief spaties.");
  $('progress-explanation').textContent=explanation;
  drawProgressChart(plotted.slice().reverse(),comparable);
  $('history-visible-count').textContent=`${rows.length} ${translate(rows.length===1?'test':'tests')}`;
  $('history-scroll').hidden=!rows.length;$('history-empty').hidden=!!rows.length;
  $('history-empty').textContent=history.length?translate("Geen tests voor deze selectie. Pas de instellingen of periode aan."):translate("Je afgeronde tests verschijnen hier vanzelf.");
  $('export-btn').disabled=!rows.length;$('backup-btn').disabled=!history.length;$('clear-history-btn').disabled=!history.length;
  $('storage-warning').hidden=storageAvailable;
  $('history-rows').replaceChildren();
  for(const r of rows){
    const tr=document.createElement('tr'),date=new Date(r.date);
    const dateLabel=date.toLocaleDateString(uiLocale(),{day:'numeric',month:'short'}),time=date.toLocaleTimeString(uiLocale(),{hour:'2-digit',minute:'2-digit'});
    let flags=`${Math.round(r.duration)}s`;
    if(hasWordCorpus(r)&&!isStandard(r))flags+=' · '+corpusLabel(r);
    if(r.mode!=='numbers'&&r.mode!=='custom'&&!isCode(r))flags+=r.punctuation?translate(" · leestekens"):translate(" · woorden");
    if(usesCapitalization(r))flags+=' · '+translate('capitals.label');
    if(r.reason==='manual')flags+=translate(" · verkort");if(r.interrupted)flags+=translate(" · onderbroken");
    if(r.summaryOnly)flags+=translate(" · geïmporteerd");
    const modeName=r.mode==='numbers'?translate('profile.numbers',{digits:r.numberLength==='mixed'||!r.numberLength?'2–4':r.numberLength}):`${resultLanguage(r)}${r.mode==='custom'?translate(" · tekst"):r.mode==='practice'?translate(" · oefening"):isCode(r)?' · '+translate('code.label'):''}`;
    tr.innerHTML=`<td class="history-date">${safeText(dateLabel)}<span>${safeText(time)}</span></td><td class="history-mode">${safeText(modeName)}<small>${safeText(flags)}</small></td><td class="num history-wpm">${Math.round(r.wpm)}</td><td class="num">${fmtPercent(r.accuracy)}</td><td class="num history-extra">${fmtPercent(r.keystrokeAccuracy)}</td><td></td>`;
    tr.title=profileLabel(r);
    const actions=document.createElement('div');actions.className='row-actions';
    const button=document.createElement('button');button.className='row-action';button.innerHTML='<span class="row-open-label">'+safeText(translate('history.open'))+'</span><span aria-hidden="true">↗</span>';button.setAttribute('aria-label',translate('history.viewAria',{date:dateLabel,time}));button.title=translate('Open resultaat');button.onclick=()=>openStoredResult(r);
    const remove=document.createElement('button');remove.className='row-action row-delete';remove.innerHTML=TRASH_ICON;remove.setAttribute('aria-label',translate('history.delete.aria',{date:date.toLocaleDateString(uiLocale(),{day:'numeric',month:'long',year:'numeric'}),time}));remove.title=translate('history.delete');remove.onclick=()=>requestDeleteResult(r);
    actions.append(button,remove);tr.lastElementChild.append(actions);$('history-rows').append(tr);
  }
}
const TRASH_ICON="<svg aria-hidden=\"true\" fill=\"none\" viewBox=\"0 0 20 20\"><path d=\"M3.5 5.5h13M7.5 5.5V3.5h5v2M5.5 5.5l.6 11h7.8l.6-11M8.3 8.5v5M11.7 8.5v5\" stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";
function sameStoredTest(a,b){
  return !!a&&!!b&&(a===b||(String(a.id??'')===String(b.id??'')&&a.date===b.date&&a.mode===b.mode&&a.duration===b.duration&&a.wpm===b.wpm));
}
function syncResultDeleteControl(){
  $('result-delete-btn').hidden=!currentResult||!history.some(r=>sameStoredTest(r,currentResult));
}
function requestDeleteResult(result){
  if(!history.some(r=>sameStoredTest(r,result))){toast(translate('history.delete.missing'));syncResultDeleteControl();return;}
  const date=new Date(result.date);
  askConfirm(translate('history.delete.title'),translate('history.delete.message',{
    date:date.toLocaleDateString(uiLocale(),{day:'numeric',month:'long',year:'numeric'}),
    time:date.toLocaleTimeString(uiLocale(),{hour:'2-digit',minute:'2-digit'}),wpm:Math.round(result.wpm),profile:profileLabel(result)
  }),translate('history.delete.confirm'),()=>deleteStoredResult(result));
  $('confirm-ok').classList.add('destructive');$('confirm-cancel').focus();
}
function deleteStoredResult(result){
  // Re-resolve after confirmation: another tab may already have deleted it.
  const index=history.findIndex(r=>sameStoredTest(r,result));
  if(index<0){toast(translate('history.delete.missing'));syncResultDeleteControl();return;}
  const next=history.slice();next.splice(index,1);
  if(!writeLocal(STORAGE_KEY,next)){
    $('storage-warning').hidden=false;toast(translate('history.delete.failed'));return;
  }
  history=next;
  if(sameStoredTest(currentResult,result)){
    currentResult=null;
    if(!$('results-view').hidden)setView('progress');
  }
  syncResultDeleteControl();renderHistory();updatePersonalBest();
  toast(translate('history.delete.done'));
  if(!$('progress-view').hidden)($('history-rows').querySelector('.row-action')||$('progress-title')).focus({preventScroll:true});
}
function openStoredResult(r){
  const action=()=>{if(session?.running){clearInterval(timerHandle);timerHandle=null;session.finished=true;resetCoach();}showResult(r);};
  if(session?.running&&!isInfinitePractice(session.config))askConfirm(translate("Huidige test afbreken?"),translate("Je lopende test wordt niet opgeslagen als je een eerder resultaat opent."),translate("Open resultaat"),action);else action();
}
function openHistory(){
  const action=()=>{if(session?.running){clearInterval(timerHandle);timerHandle=null;session.finished=true;resetCoach();}setView('progress');renderHistory();window.scrollTo({top:0,behavior:'instant'});$('progress-title').focus({preventScroll:true});};
  if(session?.running&&!isInfinitePractice(session.config))askConfirm(translate("Naar je voortgang?"),translate("Je huidige test wordt afgebroken en niet opgeslagen."),translate("Open voortgang"),action);else action();
}
function drawProgressChart(rows,comparable){
  const svg=$('progress-chart'),wrap=$('progress-plot-wrap'),empty=$('progress-empty'),tip=$('progress-tooltip');tip.hidden=true;
  wrap.hidden=!rows.length;empty.hidden=!!rows.length;$('progress-chart-footer').hidden=!rows.length;
  if(!rows.length){
    $('progress-empty-title').textContent=history.length?translate("Nog geen meetpunten in deze selectie."):translate("Je eerste lijn begint met één test.");
    $('progress-empty-copy').textContent=history.length?translate("Kies een andere periode of rond een volledige test af zonder onderbreking."):translate("Rond een test af. Je resultaat verschijnt hier automatisch, zonder account.");
    svg.replaceChildren();return;
  }
  const W=Math.max(280,Math.round(wrap.clientWidth||880)),H=W<520?205:240,L=progressMetric==='wpm'&&settings.speedUnit==='kph'?51:(W<520?31:43),R=15,T=16,B=32,pw=W-L-R,ph=H-T-B;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const values=rows.map(metricValue),percent=progressMetric!=='wpm';
  const showReference=!percent&&comparableExternalBenchmark(rows,comparable);
  const lo=percent?Math.max(0,Math.floor((Math.min(...values)-5)/5)*5):0;
  const hi=percent?100:Math.max(60*speedFactor(),Math.ceil(Math.max(...values)*1.14/(20*speedFactor()))*20*speedFactor());
  const x=i=>rows.length===1?L+pw/2:L+i/(rows.length-1)*pw;
  const y=v=>T+ph-(v-lo)/Math.max(hi-lo,1)*ph;
  const hasTrend=comparable&&rows.length>=5;
  const rolling=hasTrend?values.map((_,i)=>i<4?null:mean(values.slice(i-4,i+1))):[];
  const n=number=>Number(number).toFixed(2);
  let out=`<title>${safeText($('progress-chart-title').textContent)}</title><desc>${safeText(translate('progress.desc',{count:rows.length,trend:hasTrend?translate('Een tweede lijn toont het gemiddelde van de laatste vijf tests.') : ''}))}</desc><defs><linearGradient id="progress-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--net)" stop-opacity=".09"/><stop offset="100%" stop-color="var(--net)" stop-opacity="0"/></linearGradient></defs>`;
  for(let i=0;i<=4;i++){const val=lo+(hi-lo)*i/4,yy=y(val);out+=`<line x1="${L}" y1="${n(yy)}" x2="${W-R}" y2="${n(yy)}" stroke="var(--line)" stroke-width=".7"/><text class="chart-label" x="${L-10}" y="${n(yy+3.5)}" text-anchor="end">${Number.isInteger(val)?val:val.toFixed(1)}</text>`;}
  if(showReference)out+=`<line x1="${L}" x2="${W-R}" y1="${n(y(SPEED_REFERENCE.wpm*speedFactor()))}" y2="${n(y(SPEED_REFERENCE.wpm*speedFactor()))}" stroke="var(--muted)" stroke-width=".9" stroke-dasharray="3 5" opacity=".7"><title>${translate('progress.studyReference')}</title></line>`;
  const ticks=rows.length===1?[0]:[...new Set(Array.from({length:Math.min(6,rows.length)},(_,i)=>Math.round(i*(rows.length-1)/(Math.min(6,rows.length)-1))))];
  for(const i of ticks)out+=`<text class="chart-label" x="${n(x(i))}" y="${H-9}" text-anchor="middle">#${i+1}</text>`;
  if(rows.length>1){const pts=values.map((v,i)=>`${n(x(i))},${n(y(v))}`).join(' ');out+=`<polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-opacity=".32" stroke-width="1.25" stroke-linejoin="round"/>`;}
  if(hasTrend){const points=rolling.map((v,i)=>v===null?null:`${n(x(i))},${n(y(v))}`).filter(Boolean).join(' ');out+=`<polygon points="${n(x(4))},${n(y(lo))} ${points} ${n(x(rows.length-1))},${n(y(lo))}" fill="url(#progress-fill)"/><polyline points="${points}" fill="none" stroke="var(--net)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;if(rows.length===5)out+=`<circle cx="${n(x(4))}" cy="${n(y(rolling[4]))}" r="3" fill="var(--net)"/>`;}
  values.forEach((v,i)=>{const last=i===values.length-1;out+=`<g class="progress-dot" data-point="${i}" tabindex="0" role="button" aria-label="${safeText(translate('progress.pointAria',{date:new Date(rows[i].date).toLocaleString(uiLocale()),value:metricDisplay(v),unit:percent?translate('procent'):speedUnit()}))}"><circle cx="${n(x(i))}" cy="${n(y(v))}" r="12" fill="transparent" stroke="none"/><circle class="progress-marker" cx="${n(x(i))}" cy="${n(y(v))}" r="${last?4.5:3.1}" fill="${last?'var(--accent)':'var(--panel)'}" stroke="var(--accent)" stroke-width="1.5"/></g>`;});
  svg.innerHTML=out;
  $('progress-average-key').hidden=!hasTrend;
  $('progress-reference-key').hidden=!showReference;
  $('progress-reference-key').textContent=translate('speed.reference',{value:Math.round(SPEED_REFERENCE.wpm*speedFactor()).toLocaleString(uiLocale()),unit:speedUnit()});
  let delta=translate("Oud → nieuw · per test");
  if(comparable&&rows.length>=10){const recent=mean(values.slice(-5)),previous=mean(values.slice(-10,-5)),diff=recent-previous;delta=translate('progress.change',{change:(diff>0?'+':'')+formatNumber(diff,1),unit:percent?translate('procentpunt'):speedUnit()});}
  $('progress-delta').textContent=delta;
  function showPoint(i){
    const r=rows[i],rect=svg.getBoundingClientRect();
    tip.innerHTML=`<b>${safeText(metricDisplay(values[i]))}${percent?'%':' '+speedUnit()}</b><br>${safeText(new Date(r.date).toLocaleString(uiLocale(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}))}<br>${safeText(resultLanguage(r))} · ${round(r.duration,1)}s<br><span style="color:var(--muted)">${translate('progress.click')}</span>`;
    tip.hidden=false;const width=tip.offsetWidth;
    tip.style.left=Math.max(8,Math.min(x(i)/W*rect.width+12,rect.width-width-8))+'px';
    tip.style.top=Math.max(0,Math.min(y(values[i])/H*rect.height-45,rect.height-tip.offsetHeight))+'px';
  }
  for(const dot of svg.querySelectorAll('[data-point]')){
    const i=Number(dot.dataset.point);dot.onpointerenter=()=>showPoint(i);dot.onfocus=()=>showPoint(i);dot.onpointerleave=()=>{tip.hidden=true;};dot.onblur=()=>{tip.hidden=true;};dot.onclick=()=>openStoredResult(rows[i]);dot.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openStoredResult(rows[i]);}};
  }
  svg.onpointerleave=()=>{tip.hidden=true;};
}
/* Results are never inferred from screenshots or manufactured as demo data. */
function resultInsight(r){
  $('result-back').hidden=false;
  const badge=$('result-insight'),others=history.filter(x=>x.id!==r.id&&isCompleteResult(x)&&profileKey(x)===profileKey(r)&&new Date(x.date)<new Date(r.date));
  badge.hidden=true;
  if(!isCompleteResult(r)||!others.length||r.mode==='custom'||isAdaptive(r))return;
  const previousBest=Math.max(...others.map(x=>x.wpm));
  if(r.wpm>previousBest){badge.textContent=translate("Persoonlijk record · +")+formatNumber(r.wpm-previousBest,1)+' WPM';badge.hidden=false;}
  else if(others.length>=5){const change=r.wpm-mean(others.slice(0,5).map(x=>x.wpm));badge.textContent=(change>0?'+':'')+formatNumber(change,1)+translate(" WPM t.o.v. vorige 5");badge.hidden=false;}
}

/* ==================== Backups and legacy CSV migration ==================== */
function validResult(r){
  if(!r||typeof r!=='object'||isInfinitePractice(r)||r.ephemeral===true||r.version!==1||!Number.isFinite(r.wpm)||r.wpm<0||r.wpm>100000)return false;
  if(!Number.isFinite(r.duration)||r.duration<=0||r.duration>86400||!Number.isFinite(Date.parse(r.date)))return false;
  if(!['words','numbers','custom','practice','code'].includes(r.mode)||!(r.mode==='numbers'||(isCode(r)?CODE_LANGUAGES.includes(r.language):LANGUAGES.includes(r.language))))return false;
  if(isCode(r)&&(r.codeVersion!=='ritme-code-v1'||typeof r.codeCorpusFingerprint!=='string'||!/^[a-f0-9]{64}$/.test(r.codeCorpusFingerprint)||typeof r.codeAided!=='boolean'))return false;
  if(r.wordCorpusVersion!==undefined&&!['ritme-basic-v1','ritme-expanded-v1'].includes(r.wordCorpusVersion))return false;
  if(r.wordCorpusVersion==='ritme-expanded-v1'&&(!hasWordCorpus(r)||typeof r.wordCorpusFingerprint!=='string'||!/^[a-f0-9]{64}$/.test(r.wordCorpusFingerprint)))return false;
  if(r.keyboardLayout!==undefined&&!['us','de','fr'].includes(r.keyboardLayout))return false;
  if(r.standardVersion!==undefined&&(r.standardVersion!=='ritme-standard-v1'||r.mode!=='words'||r.plannedDuration!==60||r.numbers||r.punctuation||r.capitals||typeof r.corpusFingerprint!=='string'||!/^[a-f0-9]{64}$/.test(r.corpusFingerprint)))return false;
  if(r.standardVersion&&r.reason==='time'&&Math.abs(r.duration-60)>.01)return false;
  if(r.adaptiveVersion!==undefined&&(r.adaptiveVersion!==1||r.mode!=='practice'||r.practiceLesson!=='adaptive'))return false;
  if(r.capitals!==undefined&&typeof r.capitals!=='boolean')return false;
  if(r.capitalPlacement!==undefined&&!['initial','mixed'].includes(r.capitalPlacement))return false;
  if(r.numberKeyboard!==undefined&&!['row','numpad'].includes(r.numberKeyboard))return false;
  if(r.numberAided!==undefined&&typeof r.numberAided!=='boolean')return false;
  if(r.practiceGuideVersion!==undefined&&(r.practiceGuideVersion!==1||r.mode!=='practice'||!['words','adaptive','home','top','bottom','letters','shift','digits','weak'].includes(r.practiceLesson)||typeof r.practiceAided!=='boolean'))return false;
  for(const key of ['accuracy','keystrokeAccuracy'])if(!Number.isFinite(r[key])||r[key]<0||r[key]>100)return false;
  if(r.consistency!==null&&(!Number.isFinite(r.consistency)||r.consistency<0||r.consistency>100))return false;
  for(const key of ['raw','cpm','typos','uncorrected','corrected'])if(!Number.isFinite(r[key])||r[key]<0||r[key]>10000000)return false;
  return Array.isArray(r.samples)&&Array.isArray(r.errors)&&r.keys&&typeof r.keys==='object';
}
function cleanImportedResult(r){
  if(!validResult(r))return null;
  const out={version:1,id:String(r.id||('import-'+r.date+'-'+r.wpm)).slice(0,180),date:new Date(r.date).toISOString(),mode:r.mode,
    language:r.mode==='numbers'?'none':r.language,duration:r.duration,plannedDuration:Number.isFinite(r.plannedDuration)?r.plannedDuration:Math.round(r.duration),
    numbers:!!r.numbers,punctuation:r.mode==='numbers'?false:!!r.punctuation,capitals:usesCapitalization(r),numberLength:['mixed','2','3','4','6'].includes(r.numberLength)?r.numberLength:'mixed',
    reason:['time','text','manual'].includes(r.reason)?r.reason:'manual',interrupted:!!r.interrupted,consistency:r.consistency,
    summaryOnly:!!r.summaryOnly,practiceKeys:Array.isArray(r.practiceKeys)?r.practiceKeys.filter(k=>typeof k==='string'&&Array.from(k).length===1).slice(0,8):[],keys:{},samples:[],errors:[]};
  if(r.keyboardLayout)out.keyboardLayout=layoutId(r);
  if(r.wordCorpusVersion){out.wordCorpusVersion=r.wordCorpusVersion;if(r.wordCorpusFingerprint)out.wordCorpusFingerprint=r.wordCorpusFingerprint;}
  if(isCode(r)){out.codeVersion=r.codeVersion;out.codeCorpusFingerprint=r.codeCorpusFingerprint;out.codeAided=!!r.codeAided;out.scoringVersion='ritme-code-output-v1';out.numbers=false;out.punctuation=false;}
  if(isStandard(r)){out.standardVersion=r.standardVersion;out.corpusFingerprint=r.corpusFingerprint;out.scoringVersion='ritme-output-v1';}
  if(isAdaptive(r)){out.adaptiveVersion=1;out.adaptiveFocus=Array.isArray(r.adaptiveFocus)?r.adaptiveFocus.filter(k=>typeof k==='string'&&/^\p{L}{1,2}$/u.test(k)).slice(0,3):[];}
  out.pairs={};
  if(r.pairs&&typeof r.pairs==='object')for(const [key,data] of Object.entries(r.pairs).slice(0,2000))if(/^\p{L}{2}$/u.test(key)&&data&&Number.isFinite(data.attempts)&&data.attempts>=0&&Number.isFinite(data.errors)&&data.errors>=0&&data.errors<=data.attempts)out.pairs[key]={attempts:data.attempts,errors:data.errors};
  if(r.mode==='numbers'){out.numberKeyboard=isNumpad(r)?'numpad':'row';out.numberAided=isNumpad(r)&&!!r.numberAided;}
  if(usesCapitalization(r))out.capitalPlacement=r.capitalPlacement==='initial'?'initial':'mixed';
  if(r.practiceGuideVersion===1&&r.mode==='practice'&&['words','adaptive','home','top','bottom','letters','shift','digits','weak'].includes(r.practiceLesson)){out.practiceGuideVersion=1;out.practiceLesson=r.practiceLesson;out.practiceAided=!!r.practiceAided;}
  for(const key of ['wpm','raw','cpm','accuracy','keystrokeAccuracy','typos','uncorrected','corrected','attempts','correct','retained','missing','backspaces'])out[key]=Number.isFinite(r[key])&&r[key]>=0?r[key]:0;
  for(const [key,value] of Object.entries(r.keys).slice(0,300))if(Array.from(key).length<=3&&value&&Number.isFinite(value.attempts)&&Number.isFinite(value.errors)&&value.attempts>=0&&value.errors>=0&&value.errors<=value.attempts)out.keys[key]={attempts:value.attempts,errors:value.errors};
  out.samples=r.samples.slice(0,1000).filter(s=>s&&['t','burst','raw','net'].every(k=>Number.isFinite(s[k])&&s[k]>=0&&s[k]<1000000)&&s.t<=out.duration+.1).map(s=>({t:s.t,burst:s.burst,raw:s.raw,net:s.net}));
  out.errors=r.errors.slice(0,5000).filter(e=>e&&Number.isFinite(e.t)&&e.t>=0&&e.t<=out.duration+.1&&typeof e.key==='string'&&Array.from(e.key).length<=3).map(e=>({t:e.t,key:e.key,resolved:!!e.resolved}));
  if(!out.samples.length)out.summaryOnly=true;
  return out;
}
function parseCSV(text){
  text=text.replace(/^\uFEFF/,'');const firstLine=text.split(/\r?\n/,1)[0];const separator=firstLine.includes(';')?';':',';
  const rows=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(c===separator&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v.length))rows.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(quoted)throw new Error(translate("Ongeldig CSV-bestand: niet-afgesloten aanhalingstekens."));
  if(cell||row.length){row.push(cell);rows.push(row);}if(!rows.length)throw new Error(translate("Dit CSV-bestand is leeg."));
  const headers=rows.shift();if(!['datum','WPM','eindnauwkeurigheid_pct','aanslagnauwkeurigheid_pct'].every(h=>headers.includes(h)))throw new Error(translate("Gebruik een CSV-export uit deze typetest of de vorige versie."));
  const num=v=>v===''||v===undefined?NaN:Number(String(v).replace(',','.'));
  return rows.map(cells=>{
    const o=Object.fromEntries(headers.map((h,i)=>[h,cells[i]??'']));
    return {version:1,id:'csv-'+o.datum+'-'+o.WPM,date:o.datum,language:o.taal,mode:o.modus||'words',duration:num(o.duur_seconden),plannedDuration:num(o.ingestelde_duur),wpm:num(o.WPM),raw:num(o.raw_WPM),cpm:num(o.CPM),accuracy:num(o.eindnauwkeurigheid_pct),keystrokeAccuracy:num(o.aanslagnauwkeurigheid_pct),consistency:o.consistency_pct===''?null:num(o.consistency_pct),typos:num(o.typefouten),uncorrected:num(o.ongecorrigeerd),corrected:num(o.verwijderde_typefouten),numbers:o.getallen==='true',punctuation:o.leestekens==='true',capitals:o.hoofdletters==='true',capitalPlacement:o.hoofdletterpositie==='initial'?'initial':'mixed',numberKeyboard:o.cijfertoetsenbord==='numpad'?'numpad':'row',numberAided:o.cijfertoetsenbord==='numpad'&&o.aanslaghulp==='true',reason:o.einde||'time',interrupted:o.onderbroken==='true',numberLength:o.cijferlengte||'mixed',...(o.vingergids_versie==='1'?{practiceGuideVersion:1,practiceLesson:o.oefening,practiceAided:o.aanslaghulp==='true',practiceKeys:(o.oefentoetsen||'').split('/').filter(Boolean)}:{}),...(o.toetsindeling?{keyboardLayout:o.toetsindeling}:{}),...(o.standaard_versie?{standardVersion:o.standaard_versie,corpusFingerprint:o.corpus_sha256,scoringVersion:o.score_versie||'ritme-output-v1'}:{}),...(o.adaptief_versie?{adaptiveVersion:Number(o.adaptief_versie)}:{}),...(o.woordenlijst_versie?{wordCorpusVersion:o.woordenlijst_versie,wordCorpusFingerprint:o.woordenlijst_sha256||undefined}:{}),...(o.code_versie?{codeVersion:o.code_versie,codeCorpusFingerprint:o.code_sha256,codeAided:o.code_aanslaghulp==='true'}:{}),samples:[],errors:[],keys:{},summaryOnly:true};
  });
}
function backupHistory(){downloadFile(JSON.stringify({format:'ritme-backup',version:3,exportedAt:new Date().toISOString(),settings:{...settings},results:history},null,2),'ritme-backup-'+new Date().toISOString().slice(0,10)+'.json','application/json');$('manage-menu').open=false;}
async function importHistoryFile(file){
  if(!file)return;
  try{
    if(file.size>8*1024*1024)throw new Error(translate("Dit bestand is te groot. Kies een back-up van maximaal 8 MB."));
    const text=await file.text();let imported;
    if(file.name.toLowerCase().endsWith('.csv'))imported=parseCSV(text);
    else{const parsed=JSON.parse(text);imported=Array.isArray(parsed)?parsed:parsed.results||parsed.history;}
    if(!Array.isArray(imported)||imported.length>10000)throw new Error(translate("Geen geldige typetestgeschiedenis gevonden."));
    const cleaned=imported.map(cleanImportedResult).filter(Boolean);if(!cleaned.length)throw new Error(translate("Dit bestand bevat geen geldige testresultaten."));
    const signature=r=>[r.date,r.mode,r.duration,r.wpm,r.accuracy,profileKey(r),Number(usesCapitalization(r)),isNumpad(r)?'numpad':'row',isNumpad(r)?Number(!!r.numberAided):'',usesCapitalization(r)&&!r.punctuation?(r.capitalPlacement||'mixed'):''].join('|'),merged=new Map(history.map(r=>[signature(r),r]));let added=0;
    for(const r of cleaned){const key=signature(r),existing=merged.get(key);if(!existing){merged.set(key,r);added++;}else if(!existing.samples.length&&r.samples.length)merged.set(key,r);}
    history=[...merged.values()].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,100);
    const saved=writeLocal(STORAGE_KEY,history);progressFilterInitialized=false;renderHistory();updatePersonalBest();
    toast(tp('import.count',added)+(cleaned.length<imported.length?translate('import.skipped',{count:imported.length-cleaned.length}):'')+(saved?translate('Bestaande resultaten samengevoegd; de nieuwste 100 blijven bewaard.'):translate('Opslag niet beschikbaar: download een back-up vóór je sluit.')));
  }catch(error){toast(error instanceof SyntaxError?translate("Dit is geen geldig JSON-bestand. Kies een JSON-back-up of CSV-export."):error.message);}
  finally{$('import-file').value='';$('manage-menu').open=false;}
}

/* ======================= Optional touch-typing practice ====================
   US QWERTY, character lookup separate from physical KeyboardEvent.code.
   Physical key identifiers: https://www.w3.org/TR/uievents-code/
   Finger assignments are a teaching convention, NOT sensed finger usage.
   Colours are deliberately fixed (not random), including on the printed card.
   Motor drills are deterministic transforms of keyboard rows. Existing word
   practice still uses its original source datasets and secureInt unchanged. */
const PRACTICE_LESSONS=['words','adaptive','home','top','bottom','letters','shift','digits','weak'];
const COACH_FINGERS=[
 {id:'lp',code:'L5',name:'Linker pink',color:'#B54E48',colorName:'practice.color.coral'},
 {id:'lr',code:'L4',name:'Linker ringvinger',color:'#98600C',colorName:'practice.color.ochre'},
 {id:'lm',code:'L3',name:'Linker middelv.',color:'#67752A',colorName:'practice.color.olive'},
 {id:'li',code:'L2',name:'Linker wijsvinger',color:'#187968',colorName:'practice.color.teal'},
 {id:'ri',code:'R2',name:'Rechter wijsvinger',color:'#315EB5',colorName:'practice.color.blue'},
 {id:'rm',code:'R3',name:'Rechter middelv.',color:'#7950A1',colorName:'practice.color.violet'},
 {id:'rr',code:'R4',name:'Rechter ringvinger',color:'#A04387',colorName:'practice.color.magenta'},
 {id:'rp',code:'R5',name:'Rechter pink',color:'#A72C59',colorName:'practice.color.raspberry'},
 {id:'th',code:'T',name:'Duimen',color:'#697582',colorName:'practice.color.slate'}
];
// code, unshifted character/label, shifted character, width in key units, finger.
const US_COACH_ROWS=[
 [['Backquote','`','~'],...Array.from('1234567890').map((ch,i)=>['Digit'+ch,ch,'!@#$%^&*()'[i]]),['Minus','-','_'],['Equal','=','+'],['Backspace','⌫','',2,'rp']],
 [['Tab','⇥','',1.5,'lp'],...Array.from('qwertyuiop').map(ch=>['Key'+ch.toUpperCase(),ch,ch.toUpperCase()]),['BracketLeft','[','{'],['BracketRight',']','}'],['Backslash','\\','|',1.5]],
 [['CapsLock','⇪','',1.75,'lp'],...Array.from('asdfghjkl').map(ch=>['Key'+ch.toUpperCase(),ch,ch.toUpperCase()]),['Semicolon',';',':'],['Quote',"'",'"'],['Enter','↵','',2.25,'rp']],
 [['ShiftLeft','shift','',2.25,'lp'],...Array.from('zxcvbnm').map(ch=>['Key'+ch.toUpperCase(),ch,ch.toUpperCase()]),['Comma',',','<'],['Period','.','>'],['Slash','/','?'],['ShiftRight','shift','',2.75,'rp']],
 [['spacer-left','','',4.375],['Space',' ','',6.25,'th'],['spacer-right','','',4.375]]
];
/* Layout presets use physical W3C codes and conventional PC key legends.
 * Primary references: Microsoft kbdus, kbdgr, kbdfr (legacy AZERTY).
 * Language never selects a physical layout automatically. Composed/dead-key
 * accents stay input-compatible; unsupported sequences are never guessed. */
const KEYBOARD_IDS=['us','de','fr'];
const KEYBOARD_LABELS={us:'QWERTY · US',de:'QWERTZ · DE',fr:'AZERTY · FR'};
function layoutId(config){return ['us','de','fr'].includes(config?.keyboardLayout)?config.keyboardLayout:'us';}
function layoutLabel(config){return KEYBOARD_LABELS[layoutId(config)];}
function positionalFinger(code,plain,explicit){
 if(explicit)return explicit;
 if(code==='IntlBackslash')return 'lp';
 if(code==='AltRight')return 'th';
 const index=FINGER_LAYOUT.findIndex(([,chars])=>chars.includes(plain)&&plain.length===1);
 return index>=0?COACH_FINGERS[index].id:null;
}
function buildLayoutPreset(id){
 const rows=structuredClone(US_COACH_ROWS);
 const overrides=id==='de'?{
  Backquote:['^','°',{deadPlain:true}],Digit2:['2','"'],Digit3:['3','§'],Digit6:['6','&'],Digit7:['7','/',{altGr:'{'}],Digit8:['8','(',{altGr:'['}],Digit9:['9',')',{altGr:']'}],Digit0:['0','=',{altGr:'}'}],
  Minus:['ß','?',{altGr:'\\'}],Equal:['´','`',{deadPlain:true,deadShift:true}],KeyY:['z','Z'],KeyZ:['y','Y'],KeyQ:['q','Q',{altGr:'@'}],KeyE:['e','E',{altGr:'€'}],KeyM:['m','M',{altGr:'µ'}],
  BracketLeft:['ü','Ü'],BracketRight:['+','*',{altGr:'~'}],Backslash:['#',"'"],Semicolon:['ö','Ö'],Quote:['ä','Ä'],Comma:[',',';'],Period:['.',':'],Slash:['-','_']
 }:id==='fr'?{
  Backquote:['²',''],Digit1:['&','1'],Digit2:['é','2',{altGr:'~'}],Digit3:['"','3',{altGr:'#'}],Digit4:["'",'4',{altGr:'{'}],Digit5:['(','5',{altGr:'['}],Digit6:['-','6',{altGr:'|'}],Digit7:['è','7',{altGr:'`'}],Digit8:['_','8',{altGr:'\\'}],Digit9:['ç','9',{altGr:'^'}],Digit0:['à','0',{altGr:'@'}],
  Minus:[')','°',{altGr:']'}],Equal:['=','+',{altGr:'}'}],KeyQ:['a','A'],KeyW:['z','Z'],KeyA:['q','Q'],KeyZ:['w','W'],KeyE:['e','E',{altGr:'€'}],
  BracketLeft:['^','¨',{deadPlain:true,deadShift:true}],BracketRight:['$','£',{altGr:'¤'}],Semicolon:['m','M'],Quote:['ù','%'],Backslash:['*','µ'],KeyM:[',','?'],Comma:[';','.'],Period:[':','/'],Slash:['!','§']
 }:{};
 // Preserve the US physical-zone assignment BEFORE changing legends.
 for(const row of rows)for(const k of row){
   k[4]=positionalFinger(k[0],k[1],k[4]);
   const change=overrides[k[0]];if(change){k[1]=change[0];k[2]=change[1];k[5]=change[2]||{};}
 }
 if(id!=='us'){
   const slash=rows[1].find(k=>k[0]==='Backslash');rows[1]=rows[1].filter(k=>k[0]!=='Backslash');
   slash[3]=1;rows[1].push(['spacer-enter','','',1.5]);
   rows[2].splice(rows[2].length-1,0,slash);rows[2].at(-1)[3]=1.25;
   rows[3][0][3]=1.25;rows[3].splice(1,0,['IntlBackslash','<','>',1,'lp',id==='de'?{altGr:'|'}:{}]);
   rows[4]=[['spacer-left','','',4.375],['Space',' ','',6.25,'th'],['AltRight','alt gr','',1.25,'th'],['spacer-right','','',3.125]];
 }
 const keys=rows.flat().filter(k=>!k[0].startsWith('spacer')).map(k=>({code:k[0],plain:k[1],shift:k[2],units:k[3]||1,finger:k[4],...(k[5]||{})}));
 const characters=new Map();
 for(const key of keys){
   if(key.plain.length===1&&!key.deadPlain)characters.set(key.plain,{key,shift:false});
   if(key.shift&&!key.deadShift)characters.set(key.shift,{key,shift:true});
 }
 // Plain/Shift mappings take precedence over alternative AltGr routes.
 for(const key of keys)if(key.altGr&&!characters.has(key.altGr))characters.set(key.altGr,{key,shift:false,altGr:true});
 return {rows,keys,characters,byCode:new Map(keys.map(k=>[k.code,k]))};
}
const KEYBOARD_PRESETS=Object.fromEntries(KEYBOARD_IDS.map(id=>[id,buildLayoutPreset(id)]));
let COACH_ROWS,COACH_KEYS,COACH_KEY_BY_CODE,COACH_CHARACTERS;
function useKeyboardLayout(config){
 const preset=KEYBOARD_PRESETS[layoutId(config)];
 COACH_ROWS=preset.rows;COACH_KEYS=preset.keys;COACH_KEY_BY_CODE=preset.byCode;COACH_CHARACTERS=preset.characters;
}
function coachFingerFor(ch,config=session?.config||settings){
 const entry=KEYBOARD_PRESETS[layoutId(config)].characters.get(ch);
 return entry?COACH_FINGERS.find(f=>f.id===entry.key.finger)||null:null;
}
useKeyboardLayout(settings);

// Conventional right-hand keypad guidance. Operators are visible for orientation
// but are not part of the digit-only prompts. W3C KeyboardEvent.code names.
const NUMPAD_KEYS=[
 {code:'NumLock',plain:'num',column:'1',row:'1',unused:true},
 {code:'NumpadDivide',plain:'/',column:'2',row:'1',unused:true},
 {code:'NumpadMultiply',plain:'×',column:'3',row:'1',unused:true},
 {code:'NumpadSubtract',plain:'−',column:'4',row:'1',unused:true},
 ...['7','8','9','4','5','6','1','2','3'].map((ch,i)=>({code:'Numpad'+ch,plain:ch,column:String(i%3+1),row:String(Math.floor(i/3)+2),finger:['ri','rm','rr'][i%3]})),
 {code:'NumpadAdd',plain:'+',column:'4',row:'2 / span 2',unused:true},
 {code:'NumpadEnter',plain:'↵',column:'4',row:'4 / span 2',finger:'rp'},
 {code:'Numpad0',plain:'0',column:'1 / span 2',row:'5',finger:'th'},
 {code:'NumpadDecimal',plain:'·',column:'3',row:'5',unused:true}
];
const NUMPAD_CHARACTERS=new Map(NUMPAD_KEYS.filter(k=>/^[0-9]$/.test(k.plain)).map(key=>[key.plain,{key,shift:false}]));
NUMPAD_CHARACTERS.set(' ',{key:NUMPAD_KEYS.find(k=>k.code==='NumpadEnter'),shift:false});
function isNumpad(config){return config?.mode==='numbers'&&config.numberKeyboard==='numpad';}
function guideEnabled(){return mode==='practice'||isNumpad(session?.config)||(mode==='code'&&settings.codeGuide);}
function guideKeys(){return isNumpad(session?.config)?NUMPAD_KEYS:COACH_KEYS;}
function guideEntry(ch){if(ch==='\n')return {key:COACH_KEY_BY_CODE.get('Enter'),shift:false};return (isNumpad(session?.config)?NUMPAD_CHARACTERS:COACH_CHARACTERS).get(ch);}
function guideFingers(){return isNumpad(session?.config)?COACH_FINGERS.filter(f=>['ri','rm','rr','rp','th'].includes(f.id)):COACH_FINGERS;}
function guideLabel(key){return key.code==='NumpadEnter'?'Enter':key.code==='Space'?translate('Space'):key.plain;}
function guideFingerKeys(finger){return guideKeys().filter(k=>k.finger===finger.id&&!k.unused&&(k.code==='NumpadEnter'||(k.plain.length===1&&!['Backspace','Tab','CapsLock','Enter'].includes(k.code))));}
function numericLayoutLabel(r){return isNumpad(r)?translate('numpad.label'):translate('numpad.row')+' · '+layoutLabel(r);}


let coachSignature='',coachMessageTimeout=null,coachAnnounceTimeout=null;
function guidedDrill(config){return config.mode==='practice'&&config.practiceGuideVersion===1&&!['words','weak','adaptive'].includes(config.practiceLesson);}
function practiceLessonLabel(lesson){return translate('practice.lesson.'+(PRACTICE_LESSONS.includes(lesson)?lesson:'weak'));}
function drillAlphabet(lesson){
 if(lesson==='shift')return COACH_KEYS.filter(k=>k.shift&&!k.deadShift).map(k=>k.shift);
 if(lesson==='digits')return COACH_KEYS.filter(k=>/^Digit/.test(k.code)).map(k=>/^[0-9]$/.test(k.plain)?k.plain:k.shift).filter(k=>/^[0-9]$/.test(k));
 const rows=lesson==='home'?[2]:lesson==='top'?[1]:lesson==='bottom'?[3]:[1,2,3];
 return rows.flatMap(i=>COACH_ROWS[i].filter(k=>!k[5]?.deadPlain&&(/^\p{L}$/u.test(k[1])||(lesson==='home'&&k[0]==='Semicolon'))).map(k=>k[1]));
}
function makePracticePrompt(config,count,offset=0,state={capitalizeNext:offset===0}){
 if(isAdaptive(config))return makeAdaptiveWords(config,count,state);
 if(!guidedDrill(config))return makeWords(config.language,count,config,config.practiceKeys||[],state);
 const keys=drillAlphabet(config.practiceLesson),n=keys.length;
 // Repeated taps -> mirrored hands -> each ordered pair. No random option set.
 return Array.from({length:count},(_,j)=>{
   const step=(offset+j)%(n*(n+2));
   if(step<n)return keys[step].repeat(3);
   if(step<2*n){const i=step-n;return (keys[i]+keys[n-1-i]).repeat(2);}
   const pair=step-2*n;return (keys[Math.floor(pair/n)]+keys[pair%n]).repeat(2);
 });
}
function setFingerStyle(element,ch){
 const finger=isNumpad(session?.config)?COACH_FINGERS.find(f=>f.id===NUMPAD_CHARACTERS.get(ch)?.key.finger):coachFingerFor(ch);if(finger)element.dataset.finger=finger.id;
}
function fingerTitle(finger){return translate(isNumpad(session?.config)&&finger.id==='th'?'numpad.thumb':'practice.finger.'+finger.id);}
function buildCoachKeyboard(){
 const host=$('coach-keyboard');host.replaceChildren();host.classList.toggle('is-numpad',isNumpad(session?.config));
 if(isNumpad(session?.config)){
   for(const data of NUMPAD_KEYS){
     const key=document.createElement('span'),finger=COACH_FINGERS.find(f=>f.id===data.finger);
     key.className='coach-key'+(data.plain==='num'||data.code==='NumpadEnter'?' function-key':'')+(data.code==='Numpad5'?' home-anchor':'')+(data.unused?' is-unused':'');
     key.dataset.code=data.code;key.style.gridColumn=data.column;key.style.gridRow=data.row;
     if(finger)key.dataset.finger=finger.id;
     const symbol=document.createElement('span');symbol.className='key-symbol';symbol.textContent=data.code==='NumpadEnter'?'enter':data.plain;key.append(symbol);
     if(finger){const small=document.createElement('span');small.className='key-code';small.textContent=finger.code;key.append(small);}
     key.title=guideLabel(data)+(finger?' · '+fingerTitle(finger)+' · '+finger.code:'');host.append(key);
   }
   return;
 }
 for(const row of COACH_ROWS){
   const el=document.createElement('div');el.className='keyboard-row';
   for(const [code,label,shift,units=1] of row){
     const key=document.createElement('span');key.style.setProperty('--units',units);
     if(code.startsWith('spacer')){key.className='keyboard-spacer';el.append(key);continue;}
     const data=COACH_KEY_BY_CODE.get(code),finger=COACH_FINGERS.find(f=>f.id===data.finger);
     key.className='coach-key'+(units>1?' function-key':'')+(['KeyF','KeyJ'].includes(code)?' home-anchor':'');
     key.dataset.code=code;if(finger)key.dataset.finger=finger.id;
     const symbol=document.createElement('span');symbol.className='key-symbol';symbol.textContent=code==='Space'?translate('Space'):label;
     key.append(symbol);
     if(shift&&!/^[A-Z]$/.test(shift)){const s=document.createElement('span');s.className='key-shifted';s.textContent=shift;key.append(s);}
     if(finger){const small=document.createElement('span');small.className='key-code';small.textContent=finger.code;key.append(small);}
     key.title=(code==='Space'?translate('Space'):label)+(finger?' · '+fingerTitle(finger)+' · '+finger.code:'');
     el.append(key);
   }
   host.append(el);
 }
}
function buildFingerPalette(){
 $('finger-palette').innerHTML=guideFingers().map(f=>{
   const keys=guideFingerKeys(f).map(guideLabel).join(' ');
   return `<div class="finger-swatch" data-finger="${f.id}"><span class="finger-chip">${f.code}</span><div><b>${safeText(fingerTitle(f))}</b><small>${safeText(translate(f.colorName))} · ${f.color}</small><div class="swatch-keys">${safeText(keys)}</div></div></div>`;
 }).join('');
}
function renderCoach(){
 const enabled=guideEnabled(),numpad=isNumpad(session?.config);
 document.body.classList.toggle('numpad-active',numpad);
 document.body.classList.toggle('practice-active',enabled);
 document.body.classList.toggle('practice-colors',enabled&&settings.practiceColors);
 $('test-info-visuals').hidden=!enabled;$('practice-guide').hidden=!enabled;
 for(const [id,key] of [['practice-guide',numpad?'numpad.guide':'practice.guide'],['coach-layout',numpad?'numpad.layout':'practice.layout'],['coach-homehint',numpad?'numpad.homehint':'practice.homehint'],['coach-legend-note',numpad?'numpad.legend.note':'practice.legend.note']]){
   const el=$(id);if(id==='practice-guide'){el.dataset.i18nAriaLabel=key;el.setAttribute('aria-label',translate(key));}else{el.dataset.i18n=key;el.textContent=translate(key);}
 }
 const availableWeak=settings.practiceKeys||[],weak=$('practice-weak-option');weak.hidden=!availableWeak.length;weak.disabled=!availableWeak.length;
 weak.textContent=translate('activity.lesson.weak');
 for(const [id,key] of [['practice-keyboard-btn','practiceKeyboard'],['practice-colors-btn','practiceColors']])$(id).setAttribute('aria-pressed',String(settings[key]));
 $('coach-keyboard-wrap').hidden=!settings.practiceKeyboard;
 $('coach-target').hidden=!(settings.practiceKeyboard||settings.practiceColors);
 if(!(settings.practiceKeyboard||settings.practiceColors))$('coach-accessible').textContent='';
 $('practice-print-btn').disabled=!!session?.running;
 $('practice-result-note').hidden=true;
 const signature=settings.uiLanguage+'|'+(numpad?'numpad':layoutId(session?.config));
 if(coachSignature!==signature){buildCoachKeyboard();buildFingerPalette();coachSignature=signature;}
 if(!numpad){
   $('coach-layout').removeAttribute('data-i18n');$('coach-layout').textContent=layoutLabel(session?.config);
   $('practice-guide').setAttribute('aria-label',translate('layout.guide',{layout:layoutLabel(session?.config)}));
 }
 updateAdaptiveInfo();
 if(enabled)updateCoachTarget();
}
function expectedPracticeChar(){const w=session?.current;return w?(w.chars[w.input.length]??(isCode(session?.config)?'\n':' ')):null;}
function updateCoachTarget(){
 if(!guideEnabled()||!session||$('test-view').hidden||!(settings.practiceKeyboard||settings.practiceColors))return;
 const ch=expectedPracticeChar(),entry=guideEntry(ch),finger=entry?COACH_FINGERS.find(f=>f.id===entry.key.finger):null;
 const line=$('coach-target');line.removeAttribute('data-finger');if(finger)line.dataset.finger=finger.id;
 $('coach-target-key').textContent=ch===' '?translate(isNumpad(session.config)?'numpad.next':'Space'):(ch==='\n'?'Enter ↵':ch??'');
 $('coach-target-finger').textContent=finger?fingerTitle(finger)+' · '+finger.code:translate('practice.accent');
 let shiftKey=null;
 if(entry?.shift){shiftKey=entry.key.finger?.startsWith('l')?'ShiftRight':'ShiftLeft';}
 $('coach-target-shift').textContent=entry?.altGr?translate('layout.altgr'):shiftKey?translate(shiftKey==='ShiftLeft'?'practice.shift.left':'practice.shift.right'):'';
 for(const key of $('coach-keyboard').querySelectorAll('[data-code]'))key.classList.toggle('kb-next',key.dataset.code===entry?.key.code||key.dataset.code===shiftKey||(!!entry?.altGr&&key.dataset.code==='AltRight'));
 // Avoid per-keystroke screen-reader chatter; announce after a brief pause.
 clearTimeout(coachAnnounceTimeout);
 coachAnnounceTimeout=setTimeout(()=>{
   if(guideEnabled()&&!$('test-view').hidden&&(settings.practiceKeyboard||settings.practiceColors))$('coach-accessible').textContent=translate('practice.next')+' '+$('coach-target-key').textContent+' · '+$('coach-target-finger').textContent+' '+$('coach-target-shift').textContent;
 },650);
}
function coachFeedback(ch,good){
 if(!guideEnabled())return;
 if(!good){
   const entry=guideEntry(ch),el=entry?$('coach-keyboard').querySelector(`[data-code="${entry.key.code}"]`):null;
   if(el){el.classList.remove('kb-miss');void el.offsetWidth;el.classList.add('kb-miss');setTimeout(()=>el.classList.remove('kb-miss'),220);}
   $('coach-target-issue').textContent=translate('practice.repair');clearTimeout(coachMessageTimeout);
   coachMessageTimeout=setTimeout(()=>$('coach-target-issue').textContent='',1800);
 }else if(!session.current?.input.some(p=>!p.matches)){$('coach-target-issue').textContent='';}
}
function clearCoachKeys(){for(const key of $('coach-keyboard').querySelectorAll('.kb-down'))key.classList.remove('kb-down');}
function resetCoach(){clearCoachKeys();$('coach-layout-warning').hidden=true;$('coach-target-issue').textContent='';clearTimeout(coachMessageTimeout);}
function handleCoachKeydown(event){
 if(!guideEnabled()||event.isComposing||event.key==='Dead'||event.ctrlKey||event.metaKey||event.altKey)return;
 const code=(event.code||'').replace(/[^a-zA-Z0-9]/g,''),numpad=isNumpad(session?.config);
 const shownCode=numpad&&['Space','Enter'].includes(code)?'NumpadEnter':code;
 $('coach-keyboard').querySelector(`[data-code="${shownCode}"]`)?.classList.add('kb-down');
 if(numpad){
   const warning=$('coach-layout-warning');
   // Test the produced navigation key, not getModifierState('NumLock'), which
   // differs between OSes and keyboards (notably Mac keypads without Num Lock).
   const numLockOff=/^Numpad[0-9]$/.test(code)&&['Insert','End','ArrowDown','PageDown','ArrowLeft','Clear','ArrowRight','Home','ArrowUp','PageUp','Unidentified'].includes(event.key);
   if(numLockOff){event.preventDefault();warning.dataset.i18n='numpad.numlock';warning.textContent=translate('numpad.numlock');warning.hidden=false;}
   else if(/^Digit[0-9]$/.test(code)&&/^[0-9]$/.test(event.key)){warning.dataset.i18n='numpad.rowwarning';warning.textContent=translate('numpad.rowwarning');warning.hidden=false;}
   else if(/^Numpad[0-9]$/.test(code)&&/^[0-9]$/.test(event.key))warning.hidden=true;
   return;
 }
 // A different physical letter layout must not quietly receive QWERTY advice.
 const expected=COACH_KEY_BY_CODE.get(code);
 if(expected&&/^\p{L}$/u.test(event.key)&&/^\p{L}$/u.test(expected.plain)&&event.key.toLowerCase()!==expected.plain.toLowerCase()){
   $('coach-layout-warning').dataset.i18n='practice.layout.warning';$('coach-layout-warning').textContent=translate('practice.layout.warning');$('coach-layout-warning').hidden=false;
 }
}
function togglePracticeVisual(key){
 settings[key]=!settings[key];persistSettings();
 if(session?.config.mode==='practice')session.config.practiceAided=session.running?!!(session.config.practiceAided||settings.practiceKeyboard||settings.practiceColors):!!(settings.practiceKeyboard||settings.practiceColors);
 if(isCode(session?.config))session.config.codeAided=session.running?!!(session.config.codeAided||(settings.codeGuide&&(settings.practiceKeyboard||settings.practiceColors))):!!(settings.codeGuide&&(settings.practiceKeyboard||settings.practiceColors));
 if(isNumpad(session?.config))session.config.numberAided=session.running?!!(session.config.numberAided||settings.practiceKeyboard||settings.practiceColors):!!(settings.practiceKeyboard||settings.practiceColors);
 renderCoach();renderTestInfo();updatePersonalBest();if($('test-info-panel').hidden)focusTyping();
}
function startPractice(){settings.standardTest=false;mode='practice';practiceKeys=[...(settings.practiceKeys||[])];if(settings.practiceLesson==='weak'&&!practiceKeys.length)settings.practiceLesson='words';newTest();}
function printFingerCard(){
 if(session?.running)return;
 const sheet=$('finger-print');
 sheet.innerHTML=`<h1>ritme. / ${safeText(translate('practice.card'))}</h1><p>${safeText(translate(isNumpad(session?.config)?'numpad.print.intro':'practice.print.intro',{layout:layoutLabel(session?.config)}))}</p>`+
 guideFingers().map(f=>{
   const keys=guideFingerKeys(f);
   const labels=keys.map(guideLabel).join(' ');
   const stickers=keys.map(k=>`<span class="print-sticker">${safeText(k.code==='Space'?'␣':k.code==='NumpadEnter'?'↵':k.plain==='ß'?'ß':k.plain.toUpperCase())}</span>`).join('');
   return `<div class="print-finger-row" data-finger="${f.id}"><span class="finger-chip">${f.code}</span><div><b>${safeText(fingerTitle(f))}</b><small>${safeText(translate(f.colorName))} · ${f.color}</small><small>${safeText(labels)}</small></div><div class="print-stickers">${stickers}</div></div>`;
 }).join('')+`<p class="print-footnote">${safeText(translate(isNumpad(session?.config)?'numpad.print.note':'practice.print.note'))}</p><p>${safeText(translate('practice.limit'))}</p>`;
 if(typeof window.print!=='function'){toast(translate('practice.print.unavailable'));return;}
 document.body.classList.add('print-fingers');
 try{window.print();}catch{document.body.classList.remove('print-fingers');toast(translate('practice.print.unavailable'));}
}
window.addEventListener('afterprint',()=>document.body.classList.remove('print-fingers'));

/* ================== Versioned standard + adaptive practice =================
 * Standard v1 locks the task, not the sampled word order. Corpus fingerprints
 * travel with results. This is a personal protocol, NOT a validated norm.
 * Adaptive v1 is a local, inspectable heuristic, never a prediction of ability.
 */
function standardActive(){return mode==='words'&&settings.standardTest===true;}
function isStandard(config){return config?.mode==='words'&&config.standardVersion==='ritme-standard-v1';}
function isAdaptive(config){return config?.mode==='practice'&&config.practiceLesson==='adaptive';}
function speedFactor(){return {wpm:1,cpm:5,kph:300}[settings.speedUnit]||1;}
function speedUnit(){return (settings.speedUnit||'wpm').toUpperCase();}
function resultKPH(r){return Math.round((r.cpm||0)*60);}
function normalizedToken(token){return String(token).normalize('NFC').toLowerCase();}
function mergeEvidence(target,source,weight,minLength,maxLength){
 if(!source||typeof source!=='object')return;
 for(const [key,data] of Object.entries(source)){
   const token=normalizedToken(key),length=Array.from(token).length;
   if(length<minLength||length>maxLength||!/^\p{L}+$/u.test(token)||!data||!Number.isFinite(data.attempts)||!Number.isFinite(data.errors)||data.attempts<=0||data.errors<0||data.errors>data.attempts)continue;
   const entry=target.get(token)||{attempts:0,errors:0};entry.attempts+=data.attempts*weight;entry.errors+=data.errors*weight;target.set(token,entry);
 }
}
function adaptiveEvidence(config,live=null){
 const evidence=new Map();
 const rows=history.filter(r=>isCompleteResult(r)&&r.language===config.language&&layoutId(r)===layoutId(config)&&(r.mode==='words'||(r.mode==='practice'&&!guidedDrill(r)))).slice(0,20);
 rows.forEach((r,i)=>{const weight=Math.pow(.85,i);mergeEvidence(evidence,r.keys,weight,1,1);mergeEvidence(evidence,r.pairs,weight,2,2);});
 if(live){mergeEvidence(evidence,live.keys,2,1,1);mergeEvidence(evidence,live.pairs,2,2,2);}
 return {evidence,tests:rows.length};
}
function adaptivePlan(config,live=null){
 const {evidence,tests}=adaptiveEvidence(config,live);
 const corpus=selectedWordCorpus(config).words.map(w=>w.toLowerCase());
 const candidates=[];
 for(const [token,data] of evidence){
   const pair=Array.from(token).length===2,minimum=pair?8:20;
   // Exposure-aware; one accidental miss is not a diagnosis. Smooth small samples.
   if(data.attempts<minimum||data.errors<2)continue;
   const rate=(data.errors+.5)/(data.attempts+10);
   if(rate<.025)continue;
   const words=corpus.filter(w=>w.includes(token));if(!words.length)continue;
   const score=rate*Math.min(1,data.attempts/40);
   candidates.push({token,rate,attempts:data.attempts,score,words});
 }
 candidates.sort((a,b)=>b.score-a.score||a.token.localeCompare(b.token));
 const targets=[];
 for(const candidate of candidates){
   // Avoid spending every target on one letter and all its overlapping pairs.
   if(targets.some(t=>t.token.includes(candidate.token)||candidate.token.includes(t.token)))continue;
   targets.push(candidate);if(targets.length===3)break;
 }
 return {targets,tests};
}
function weightedAdaptiveTarget(targets){
 const weights=targets.map(t=>Math.max(1,Math.round(t.score*10000))),sum=weights.reduce((a,b)=>a+b,0);
 let draw=secureInt(sum);for(let i=0;i<targets.length;i++){draw-=weights[i];if(draw<0)return targets[i];}
 return targets.at(-1);
}
function makeAdaptiveWords(config,count,state){
 // Use live evidence only for THIS session; never leak the previous test's state.
 const live=session?.config===config?session:null,plan=adaptivePlan(config,live);
 config.adaptiveVersion=1;config.adaptiveFocus=plan.targets.map(t=>t.token);
 const corpus=selectedWordCorpus(config).words;
 const result=[];
 for(let i=0;i<count;i++){
   // Independent 2/3 focus chance, then weighted observed target -> dataset index.
   const pool=plan.targets.length&&secureInt(3)<2?weightedAdaptiveTarget(plan.targets).words:corpus;
   let item=pool[secureInt(pool.length)].toLowerCase();
   if(config.punctuation&&secureInt(5)===0)item+=PUNCTUATION[secureInt(PUNCTUATION.length)];
   for(const word of item.normalize('NFC').split(/\s+/))result.push(applyWordCapitalization(word,config.language,config,state));
 }
 return result;
}
function updateAdaptiveInfo(){
 if(!session)return;
 const enabled=isAdaptive(session.config);$('test-info-adaptive').hidden=!enabled;
 if(!enabled){$('practice-adaptive-option').textContent=translate('practice.lesson.adaptive');return;}
 const focus=session.config.adaptiveFocus||[],plan=adaptivePlan(session.config,session);
 $('adaptive-status').textContent=focus.length?translate('adaptive.focus',{keys:focus.join(' · ')}):translate('adaptive.cold');
 $('adaptive-detail').textContent=translate('adaptive.detail',{count:plan.tests});
 // Keep the activity selector short; changing focus is already shown under information.
 $('practice-adaptive-option').textContent=translate('activity.lesson.adaptive');
}

/* ============================== Event bindings ============================= */
for(const [code,data] of Object.entries(LEXICONS)){
  const option=document.createElement('option');option.value=code;option.textContent=languageName(code);$('language').append(option);
  $('custom-language').append(option.cloneNode(true));
  const link=document.createElement('a');link.href=data.source;link.target='_blank';link.rel='noopener noreferrer';link.dataset.languageSource=code;link.textContent=translate('source.items',{language:languageName(code),count:data.words.length});$('source-list').append(link);
}
const randomOption=document.createElement('option');randomOption.value='random';randomOption.textContent=translate("Willekeurige taal");$('language').append(randomOption);
for(const [lang,corpus] of Object.entries(EXPANDED_LEXICONS)){
 const a=document.createElement('a');a.href=corpus.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent=LEXICONS[lang].name+' · '+corpus.words.length+' · Faker / Monkeytype';$('extended-source-list').append(a);
}
$('license-text').textContent=RITME_DATA.license;
$('benchmark-band-rows').innerHTML=SPEED_BANDS.map(b=>`<tr><td>${safeText(translate(b.label))}</td><td>${bandRange(b)}</td><td>${bandRange(b,5)}</td></tr>`).join('');
$('language').addEventListener('change',()=>{if(standardActive())settings.standardLanguage=$('language').value;else settings.language=$('language').value;practiceKeys=[];if(mode==='practice'&&settings.practiceLesson==='weak'){settings.practiceLesson='words';settings.practiceKeys=[];}persistSettings();newTest();});
document.querySelectorAll('[data-duration]').forEach(b=>b.onclick=()=>{
  if(session?.running||standardActive())return;
  if(b.dataset.duration==='infinite'){
    if(!['practice','code'].includes(mode))return;
    if(mode==='code')settings.codeInfinite=true;else settings.practiceInfinite=true;
  }else{
    const duration=Number(b.dataset.duration);if(![15,30,60,120].includes(duration))return;
    settings.duration=duration;if(mode==='practice')settings.practiceInfinite=false;if(mode==='code')settings.codeInfinite=false;
  }
  persistSettings();newTest();
});
$('code-btn').onclick=()=>{if(session?.running)return;mode='code';practiceKeys=[];newTest();};
$('code-language').onchange=()=>{if(session?.running||!CODE_LANGUAGES.includes($('code-language').value))return;settings.codeLanguage=$('code-language').value;persistSettings();newTest();};
$('word-corpus').onchange=()=>{if(session?.running||standardActive())return;settings.wordCorpus=$('word-corpus').value==='basic'?'basic':'expanded';persistSettings();newTest();toggleTestInfo();};
$('code-guide-btn').onclick=()=>{settings.codeGuide=!settings.codeGuide;persistSettings();if(isCode(session?.config))session.config.codeAided=session.running?session.config.codeAided||(settings.codeGuide&&(settings.practiceKeyboard||settings.practiceColors)):settings.codeGuide&&(settings.practiceKeyboard||settings.practiceColors);renderCoach();renderTestInfo();updatePersonalBest();};
$('numbers-btn').onclick=()=>{mode='numbers';practiceKeys=[];newTest();};
$('mix-numbers-btn').onclick=()=>{settings.numbers=!settings.numbers;persistSettings();newTest();};
$('number-length').onchange=()=>{settings.numberLength=$('number-length').value;persistSettings();newTest();};
$('number-keyboard').onchange=()=>{if(session?.running)return;settings.numberKeyboard=$('number-keyboard').value==='numpad'?'numpad':'row';persistSettings();newTest();};
$('punctuation-btn').onclick=()=>{settings.punctuation=!settings.punctuation;persistSettings();newTest();};
$('capitals-btn').onclick=()=>{settings.capitals=!settings.capitals;persistSettings();newTest();};
$('words-btn').onclick=()=>{
  if(session?.running)return;
  if(settings.wordPractice)startPractice();
  else{mode='words';practiceKeys=[];newTest();}
};
for(const id of ['brand','reset-btn','again-btn','again-shortcut'])$(id).onclick=()=>requestNewTest();
$('stop-btn').onclick=()=>{if(session?.running)completeTest('manual',Math.min(session.elapsed(),sessionLimit()));};
$('help-btn').onclick=()=>showHelp();$('accuracy-help').onclick=()=>showHelp('scores');
function openFooterHelp(tab,anchorId){
  showHelp(tab);
  requestAnimationFrame(()=>{
    const dialog=$('help-dialog'),target=anchorId?$(anchorId):null;
    if(target)target.scrollIntoView({block:'start',behavior:'instant'});
    else dialog.scrollTo({top:0,behavior:'instant'});
  });
}
$('sources-btn').onclick=()=>openFooterHelp('sources','sources-title');
$('rules-btn').onclick=()=>openFooterHelp('scores');
$('privacy-btn').onclick=()=>openFooterHelp('sources','privacy-title');
$('history-btn').onclick=openHistory;$('result-history-btn').onclick=openHistory;$('history-filter').onchange=renderHistory;$('export-btn').onclick=exportHistory;
$('clear-history-btn').onclick=()=>{$('manage-menu').open=false;askConfirm(translate("Geschiedenis wissen?"),translate("Alle opgeslagen tests worden verwijderd. Je instellingen blijven behouden. Download eerst een JSON-back-up als je de resultaten wilt bewaren."),translate("Wis alle tests"),()=>{if(!writeLocal(STORAGE_KEY,[])){toast(translate('history.delete.allFailed'));return;}history=[];progressFilterInitialized=false;syncResultDeleteControl();renderHistory();updatePersonalBest();toast(translate("Geschiedenis gewist."));});};
$('copy-btn').onclick=copyResult;
$('credits-btn').onclick=()=>openFooterHelp('sources','credits-title');
$('result-delete-btn').onclick=()=>{if(currentResult)requestDeleteResult(currentResult);};
$('font-btn').onclick=()=>{const hidden=$('font-menu').hidden;$('font-menu').hidden=!hidden;$('font-btn').setAttribute('aria-expanded',String(hidden));};
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{settings.size=Number(b.dataset.size);applyAppearance();persistSettings();$('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');scrollToCaret();focusTyping();});
$('theme-btn').onclick=()=>{settings.theme=settings.theme==='light'?'dark':'light';applyAppearance();persistSettings();};
document.querySelectorAll('[data-help-tab]').forEach(b=>b.onclick=()=>selectHelpTab(b.dataset.helpTab));
document.querySelectorAll('[data-series]').forEach(b=>b.onclick=()=>{const name=b.dataset.series;shownSeries[name]=!shownSeries[name];b.setAttribute('aria-pressed',String(shownSeries[name]));const layer=$('chart').querySelector(`[data-layer="${name}"]`);if(layer)layer.style.display=shownSeries[name]?'':'none';});
for(const dialog of document.querySelectorAll('dialog')){
  dialog.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{if(dialog.id==='confirm-dialog' && !dialog.open)confirmAction=null;if(reenterFocus)requestAnimationFrame(focusTyping);reenterFocus=true;});
}
$('confirm-cancel').onclick=()=>$('confirm-dialog').close();
$('confirm-ok').onclick=()=>{const action=confirmAction;$('confirm-dialog').close();confirmAction=null;action?.();};
$('custom-btn').onclick=()=>{$('custom-language').value=settings.language==='random'?(session?.config.language||'nl'):settings.language;if(customText)$('custom-text').value=customText;$('custom-error').hidden=true;$('custom-count').textContent=translate('characters',{count:$('custom-text').value.length});openDialog('custom-dialog');};
$('custom-text').addEventListener('input',()=>{$('custom-count').textContent=translate('characters',{count:$('custom-text').value.length});$('custom-error').hidden=true;});
$('use-custom-btn').onclick=()=>{
  let text=$('custom-text').value.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim();
  if(Array.from(text).length<10){$('custom-error').textContent=translate("Voer minimaal 10 tekens in.");$('custom-error').hidden=false;return;}
  if(text.split(' ').some(w=>Array.from(w).length>30)){$('custom-error').textContent=translate("Een item is langer dan 30 tekens. Voeg daar een spatie toe voor goede weergave op kleine schermen.");$('custom-error').hidden=false;return;}
  customText=text;settings.language=$('custom-language').value;persistSettings();mode='custom';practiceKeys=[];$('custom-dialog').close();newTest();
};
// Absorb carry-over typing on the result region, but retain normal keyboard
// activation after the user tabs to a button. Escape stays an explicit restart.
$('results-view').addEventListener('keydown',event=>{
  if(event.target===event.currentTarget && (event.key===' '||event.key==='Enter'))event.preventDefault();
});
$('typing-shell').addEventListener('click',focusTyping);$('focus-btn').onclick=focusTyping;
$('capture').addEventListener('focus',()=>{$('focus-overlay').hidden=true;});
$('capture').addEventListener('blur',()=>{if(session?.running && !$('test-view').hidden)$('focus-overlay').hidden=false;});
$('capture').addEventListener('keydown',event=>{
  $('caps-warning').hidden=!event.getModifierState('CapsLock');handleCoachKeydown(event);
  if(event.isComposing || event.key==='Dead' || event.key==='Process')return;
  if(event.key==='Backspace'){event.preventDefault();eraseInput(event.ctrlKey||event.altKey||event.metaKey);return;}
  if(event.key==='Enter'){event.preventDefault();insertText(isCode(session?.config)?'\n':' ');return;}
  if(event.key==='Delete'){event.preventDefault();return;}
  // Prevent changing hidden-input selection or submitting keyboard shortcuts as text.
  if((event.ctrlKey||event.metaKey) && ['a','z','y','x'].includes(event.key.toLowerCase()))event.preventDefault();
});
$('capture').addEventListener('keyup',event=>{let code=(event.code||'').replace(/[^a-zA-Z0-9]/g,'');if(isNumpad(session?.config)&&['Space','Enter'].includes(code))code='NumpadEnter';$('coach-keyboard').querySelector(`[data-code="${code}"]`)?.classList.remove('kb-down');});
$('capture').addEventListener('blur',clearCoachKeys);
$('capture').addEventListener('beforeinput',event=>{
  if(composing||event.isComposing||!event.cancelable)return;
  if(['insertFromPaste','insertFromDrop','insertReplacementText'].includes(event.inputType)){event.preventDefault();toast(translate("Typ de tekst zelf; plakken en automatische vervanging zijn uitgeschakeld."));return;}
  if(event.inputType==='deleteContentBackward'){event.preventDefault();eraseInput();}
  if(event.inputType==='deleteWordBackward'){event.preventDefault();eraseInput(true);}
  if(event.inputType==='insertLineBreak'||event.inputType==='insertParagraph'){event.preventDefault();insertText(isCode(session?.config)?'\n':' ');}
});
$('capture').addEventListener('paste',event=>{event.preventDefault();toast(translate("Plakken is uitgeschakeld tijdens de typetest."));});
$('capture').addEventListener('drop',event=>event.preventDefault());
$('capture').addEventListener('compositionstart',()=>{composing=true;});
$('capture').addEventListener('compositionend',()=>{composing=false;const text=$('capture').value;$('capture').value='';if(text)insertText(text);});
$('capture').addEventListener('input',event=>{
  if(composing||event.isComposing)return;
  const text=$('capture').value;$('capture').value='';
  if(['insertFromPaste','insertFromDrop','insertReplacementText'].includes(event.inputType))return;
  if(event.inputType==='deleteContentBackward'){eraseInput();return;}
  if(event.inputType==='deleteWordBackward'){eraseInput(true);return;}
  if(text)insertText(text);
  else if(event.inputType==='insertLineBreak'||event.inputType==='insertParagraph')insertText(isCode(session?.config)?'\n':' ');
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    if(event.target===$('ui-language'))return;
    if(document.querySelector('dialog[open]'))return;
    event.preventDefault();
    if(!$('test-info-panel').hidden){closeTestInfo(true);return;}
    if(!$('font-menu').hidden){$('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');focusTyping();return;}
    requestNewTest();
  }
});
document.addEventListener('pointerdown',event=>{if(!$('font-menu').contains(event.target) && !$('font-btn').contains(event.target)){$('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');}});
let chartResizeFrame=null;
window.addEventListener('resize',()=>{
  if(!$('test-info-panel').hidden)positionTestInfo();
  if(!$('test-view').hidden)scrollToCaret();
  cancelAnimationFrame(chartResizeFrame);
  chartResizeFrame=requestAnimationFrame(()=>{
    if(!$('results-view').hidden&&currentResult?.samples.length)drawChart(currentResult);
    for(const [id,model] of benchmarkViews){const host=$(id);if(model&&model.kind!=='unavailable'&&host.getClientRects().length)drawBenchmarkRuler(host,model,false);}
    if(!$('progress-view').hidden){const rows=historySelection().filter(r=>isCompleteResult(r)&&metricValue(r)!==null).reverse();drawProgressChart(rows,new Set(rows.map(profileKey)).size===1&&rows[0]?.mode!=='custom'&&!rows.some(isAdaptive));}
  });
});
window.addEventListener('blur',()=>{clearCoachKeys();if(session?.running)session.interrupted=true;});
document.addEventListener('visibilitychange',()=>{if(document.hidden && session?.running)session.interrupted=true;else updateLive();});
$('test-nav-btn').onclick=()=>{if(!$('test-view').hidden)focusTyping();else newTest();};
for(const id of ['progress-new-btn','progress-empty-btn'])$(id).onclick=()=>newTest();
for(const id of ['view-progress-btn','result-back'])$(id).onclick=openHistory;
$('progress-period').onchange=renderHistory;
document.querySelectorAll('[data-metric]').forEach(b=>b.onclick=()=>{progressMetric=b.dataset.metric;document.querySelectorAll('[data-metric]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));renderHistory();});
$('backup-btn').onclick=backupHistory;$('import-btn').onclick=()=>{$('manage-menu').open=false;$('import-file').click();};
$('import-file').onchange=()=>importHistoryFile($('import-file').files[0]);
$('export-btn').onclick=()=>{exportHistory();$('manage-menu').open=false;};
document.addEventListener('pointerdown',event=>{if(!$('manage-menu').contains(event.target))$('manage-menu').open=false;});
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){const rows=readLocal(STORAGE_KEY,[]);if(Array.isArray(rows)){history=rows.filter(validResult).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,100);if(!$('progress-view').hidden)renderHistory();syncResultDeleteControl();updatePersonalBest();}}});
$('ui-language').addEventListener('change',()=>setInterfaceLanguage($('ui-language').value));
$('word-activity').onchange=()=>{
 if(session?.running)return;
 const activity=$('word-activity').value;
 const practice=activity==='practice'||activity.startsWith('practice:');
 const lesson=activity==='practice'?'adaptive':activity.split(':')[1];
 if(practice&&!['adaptive','words','home','top','bottom','letters','shift','digits','weak'].includes(lesson))return;
 settings.standardTest=activity==='standard';settings.wordPractice=practice;
 if(practice){settings.practiceLesson=lesson;startPractice();}
 else{mode='words';practiceKeys=[];newTest();}
 persistSettings();
};
$('keyboard-layout').onchange=()=>{
 if(session?.running)return;
 if(!['us','de','fr'].includes($('keyboard-layout').value))return;
 settings.keyboardLayout=$('keyboard-layout').value;persistSettings();newTest();toggleTestInfo();
};
$('speed-unit').onchange=()=>{if(['wpm','cpm','kph'].includes($('speed-unit').value)){settings.speedUnit=$('speed-unit').value;persistSettings();renderHistory();}};

$('practice-keyboard-btn').onclick=()=>togglePracticeVisual('practiceKeyboard');
$('practice-colors-btn').onclick=()=>togglePracticeVisual('practiceColors');
$('coach-keyboard').onclick=focusTyping;
$('practice-print-btn').onclick=printFingerCard;

/* ==================== Contextual test information ==========================
   A non-modal disclosure: accessible by click, touch and keyboard. Escape only
   closes it; never restart or pause a test while reading. No hidden focus trap. */
function renderTestInfo(){
  if(!session)return;
  const config=session.config,practice=mode==='practice',numbers=mode==='numbers';
  const infinite=isInfinitePractice(config),guide=guideEnabled();
  const context=[resultLanguage(config)];
  if(practice)context.push(translate('practice.mode'),practiceLessonLabel(config.practiceLesson));
  else if(numbers)context.push(numericLayoutLabel(config));
  else if(mode==='custom')context.push(translate('Eigen tekst'));
  context.push(infinite?'∞':config.duration+'s');if(isStandard(config))context.push(translate('standard.heading'));
  $('test-info-context').textContent=context.join(' · ');
  const intro=isCode(config)?'code.info':mode==='custom'?'test.info.custom':numbers?(isNumpad(config)?'test.info.numpad':'test.info.numbers'):practice?'test.info.practice':'test.info.words';
  $('test-info-intro').textContent=translate(intro);
  $('test-info-drill').hidden=!guidedDrill(config);
  $('test-info-feedback').hidden=!(practice||isCode(config));
  renderContentInfo(config);
  $('test-info-capitals').hidden=!usesCapitalization(config);
  $('test-info-guidance').hidden=!guide;
  $('test-info-time').hidden=infinite;
  $('test-info-standard').hidden=!isStandard(config);
  $('test-info-layout').hidden=isNumpad(config);
  if(isStandard(config))$('standard-corpus').textContent=translate('standard.corpus',{language:resultLanguage(config),count:STANDARD_CORPORA[config.language].count,hash:config.corpusFingerprint.slice(0,12)});
  updateAdaptiveInfo();
  if(!$('test-info-panel').hidden)requestAnimationFrame(positionTestInfo);
}

function renderContentInfo(config){
  const word=hasWordCorpus(config),standard=isStandard(config);
  $('test-info-corpus').hidden=!word;
  $('word-corpus').value=standard?'basic':settings.wordCorpus;$('word-corpus').disabled=standard||!!session?.running;
  if(word){const corpus=selectedWordCorpus(config);$('corpus-detail').textContent=translate(standard?'corpus.standard':'corpus.detail',{count:formatNumber(corpus.words.length)});}
  $('test-info-code').hidden=!isCode(config);
  if(isCode(config)){
    $('code-guide-btn').setAttribute('aria-pressed',String(settings.codeGuide));
    $('code-detail').textContent=translate('code.detail',{count:CODE_CORPORA[config.language].snippets.length});
    $('code-source-links').replaceChildren();
    for(const url of new Set(CODE_CORPORA[config.language].snippets.map(s=>s.source))){
      const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=url.includes('python.org')?'Python documentation':url.split('/').at(-1).replaceAll('_',' ');$('code-source-links').append(a);
    }
  }
}

function positionTestInfo(){
  const panel=$('test-info-panel');if(panel.hidden)return;
  const icon=$('test-info-btn').getBoundingClientRect();
  const viewport=window.visualViewport;
  const leftEdge=viewport?.offsetLeft||0,topEdge=viewport?.offsetTop||0;
  const width=viewport?.width||document.documentElement.clientWidth,height=viewport?.height||window.innerHeight;
  panel.style.width=Math.min(360,Math.max(200,width-24))+'px';
  const panelWidth=panel.getBoundingClientRect().width;
  const left=Math.max(leftEdge+12,Math.min(icon.right-panelWidth,leftEdge+width-panelWidth-12));
  const roomBelow=topEdge+height-icon.bottom-22;
  panel.style.maxHeight=Math.min(470,Math.max(140,height-24))+'px';
  const desired=Math.min(panel.scrollHeight+2,470,height-24);
  let top=icon.bottom+8;
  if(roomBelow<Math.min(desired,180))top=Math.max(topEdge+12,icon.top-desired-8);
  else panel.style.maxHeight=Math.min(470,roomBelow)+'px';
  // view-in uses a transform animation: some browsers retain a fixed-position
  // containing block even once it settles. Account for its actual origin.
  panel.style.left='0px';panel.style.top='0px';
  const origin=panel.getBoundingClientRect();
  panel.style.left=(left-origin.left)+'px';panel.style.top=(Math.max(topEdge+12,top)-origin.top)+'px';
}
function closeTestInfo(returnFocus=false){
  const panel=$('test-info-panel');if(!panel||panel.hidden)return;
  panel.hidden=true;$('test-info-btn').setAttribute('aria-expanded','false');
  if(returnFocus&&!$('test-view').hidden)$('test-info-btn').focus({preventScroll:true});
}
function toggleTestInfo(){
  if(!$('test-info-panel').hidden){closeTestInfo();return;}
  $('font-menu').hidden=true;$('font-btn').setAttribute('aria-expanded','false');
  renderTestInfo();$('test-info-panel').hidden=false;
  $('test-info-btn').setAttribute('aria-expanded','true');positionTestInfo();
  $('test-info-panel').focus({preventScroll:true});
}
$('test-info-btn').onclick=toggleTestInfo;
$('test-info-close').onclick=()=>closeTestInfo(true);
document.addEventListener('pointerdown',event=>{
  if(!$('test-info-panel').contains(event.target)&&!$('test-info-btn').contains(event.target))closeTestInfo();
});
document.addEventListener('focusin',event=>{
  if(!$('test-info-panel').contains(event.target)&&!$('test-info-btn').contains(event.target))closeTestInfo();
});
window.addEventListener('scroll',()=>{if(!$('test-info-panel').hidden)positionTestInfo();},{passive:true});
window.visualViewport?.addEventListener('resize',()=>{
  if(!$('test-info-panel').hidden)positionTestInfo();
  if(!$('test-view').hidden)requestAnimationFrame(scrollToCaret);
});


// An on-demand reading tutorial. Opening/closing it never creates a test result.
$('code-tutorial-btn').onclick=()=>{
  if(!isCode(session?.config)||session.running)return;
  $('code-tutorial-example').textContent=session.words.slice(0,3).map(w=>w.text.replaceAll(' ','·')+'↵').join('\n');
  openDialog('code-tutorial-dialog');
  $('code-tutorial-dialog').scrollTop=0;
};

applyInterface();newTest();
