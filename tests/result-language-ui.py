"""Results stay visible after expiry, and first-visit language follows the browser.
Run: CHROMIUM_PATH=/usr/bin/chromium python tests/result-language-ui.py
Development only: Python Playwright + Chromium. Uses a local server and isolated
browser storage by default. RITME_DOM_FIXTURE=1 uses a DOM/storage test adapter.
RITME_TEST_URL can instead smoke-test a deployed site in an isolated browser.
"""
from pathlib import Path
import functools,http.server,threading,json,re,os
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
FIXTURE=os.environ.get('RITME_DOM_FIXTURE')=='1'
checks=[]
def check(name,ok):
 checks.append({'name':name,'passed':bool(ok)})
 assert ok,name
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
 def translate_path(self,path):
  if path.startswith('/ritme/'):path=path[len('/ritme'):]
  return super().translate_path(path)
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
BASE=os.environ.get('RITME_TEST_URL',f'http://127.0.0.1:{server.server_port}/ritme/')
SETTINGS='folkert-type-settings-v1';HISTORY='folkert-type-test-v1'
html=(ROOT/'index.html').read_text()
release=re.search(r'name="ritme-release" content="([^"]+)"',html)[1]
errors=[]
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH'),headless=True,args=['--no-sandbox'])
  def load(ctx,languages,values=None):
   page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
   init='Object.defineProperty(navigator,"languages",{value:'+json.dumps(languages)+',configurable:true});'
   if FIXTURE:
    markup=re.sub(r'<script[^>]*src=[^>]*></script>','',html)
    markup=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',markup)
    page.set_content(markup);page.evaluate(init)
    page.evaluate("""values=>{window.__fixtureStore=values;Object.defineProperty(window,'localStorage',{value:{getItem:k=>values[k]??null,setItem:(k,v)=>values[k]=String(v),removeItem:k=>delete values[k]}});} """,values or {})
    page.add_style_tag(content=(ROOT/'styles.css').read_text())
    for file in ['data.js','app.js']:page.add_script_tag(content=(ROOT/file).read_text())
   else:
    page.add_init_script(init)
    if values is not None:page.add_init_script('for(const [k,v] of Object.entries('+json.dumps(values)+'))localStorage.setItem(k,v);')
    page.goto(BASE)
   page.wait_for_function('typeof session!=="undefined"&&session')
   return page
  # First-visit defaults, regional tags and fallback preference order.
  for languages,expected in [(['en-US'],'en'),(['en-GB'],'en'),(['nl-NL'],'nl'),(['nl-BE'],'nl'),(['de-DE'],'de'),(['fr-FR'],'en'),(['fr-FR','nl-NL'],'nl')]:
   ctx=browser.new_context(locale=languages[0]);p=load(ctx,languages)
   got=p.evaluate('({ui:settings.uiLanguage,word:session.config.language,html:document.documentElement.lang,select:$("ui-language").value,saved:JSON.parse(localStorage.getItem(SETTINGS_KEY))})')
   check('first visit '+str(languages),all(got[k]==expected for k in ['ui','word','html','select']))
   check('preference stored before first keystroke '+str(languages),got['saved']['uiLanguage']==expected and got['saved']['language']==expected)
   p.close();ctx.close()
  # Saved interface does not override the separately saved test language.
  ctx=browser.new_context(locale='en-GB')
  p=load(ctx,['en-GB'],{SETTINGS:json.dumps({'uiLanguage':'nl','language':'fr','theme':'dark','duration':30})})
  check('saved settings win',p.evaluate("settings.uiLanguage==='nl'&&session.config.language==='fr'&&settings.theme==='dark'&&session.config.duration===30"))
  prompt=p.evaluate('session.words.map(w=>w.text).join(" ")')
  p.select_option('#ui-language','de')
  check('manual interface keeps test language and prompt',p.evaluate('session.config.language')=='fr' and p.evaluate('session.words.map(w=>w.text).join(" ")')==prompt)
  saved=p.evaluate('Object.fromEntries([SETTINGS_KEY,STORAGE_KEY].map(k=>[k,localStorage.getItem(k)]).filter(([k,v])=>v!==null))')
  p.close();p=load(ctx,['en-US'],saved if FIXTURE else None)
  check('manual preference survives reopen',p.evaluate("settings.uiLanguage==='de'&&session.config.language==='fr'"))
  p.close();ctx.close()
  # Real keyboard events, real timer callback with a virtual clock, real UI.
  ctx=browser.new_context(locale='nl-NL',viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
  p=load(ctx,['nl-NL']);check('current release',p.evaluate('APP_RELEASE')==release)
  p.clock.install()
  def ready(kind='words',duration=15):
   if p.locator('#results-view').is_visible():p.click('#again-btn')
   p.click('#words-btn');p.select_option('#word-activity','free')
   if kind=='practice':p.select_option('#word-activity','practice:home')
   elif kind=='standard':p.select_option('#word-activity','standard')
   elif kind=='numbers':p.click('#numbers-btn')
   elif kind=='code':p.click('#code-btn')
   if kind!='standard':p.click(f'[data-duration="{duration}"]')
   p.locator('#capture').focus();p.keyboard.type(p.evaluate('session.current.chars[0]'))
   return p.evaluate('history.length')
  def stable(name,count,temporary=False):
   check(name+' result visible',p.locator('#results-view').is_visible() and not p.locator('#test-view').is_visible())
   check(name+' non-action focus',p.evaluate("document.activeElement.id==='results-view'"))
   saved=p.evaluate('currentResult.id')
   p.keyboard.type('more words ');p.keyboard.press('Enter');p.keyboard.press('Space')
   check(name+' trailing input stays on result',p.evaluate('document.body.dataset.view')=='result' and p.evaluate('currentResult.id')==saved)
   check(name+' exactly one save or no ephemeral save',p.evaluate('history.length')==count+(0 if temporary else 1))
   p.evaluate('updateLive();updateLive();completeTest("time",session.config.duration)')
   check(name+' finish is idempotent',p.evaluate('history.length')==count+(0 if temporary else 1))
  for duration in [15,30,60,120]:
   count=ready(duration=duration);p.clock.fast_forward(duration*1000+50)
   stable('timer '+str(duration),count)
   check('duration '+str(duration),p.evaluate('currentResult.duration')==duration and p.evaluate('currentResult.reason')=='time')
  for kind in ['numbers','practice','standard','code']:
   count=ready(kind);p.clock.fast_forward((60 if kind=='standard' else 15)*1000+50);stable(kind,count)
  # A Space keydown before expiry, keyup after expiry used to click restart.
  count=ready();p.keyboard.down('Space');p.clock.fast_forward(15050);p.keyboard.up('Space');stable('held Space across timer boundary',count)
  # Starting a new test is still available via an explicit click or keyboard focus.
  p.locator('#again-btn').focus();p.keyboard.press('Enter')
  check('explicit restart keyboard activation',p.locator('#test-view').is_visible() and p.evaluate('!session.started&&!session.finished'))
  # Timer can also expire while a restart-confirmation dialog is open.
  count=ready();p.keyboard.press('Escape');check('restart confirmation opens',p.locator('#confirm-dialog').is_visible())
  p.clock.fast_forward(15050);p.wait_for_timeout(30);check('expiry closes confirmation',not p.locator('#confirm-dialog').is_visible());stable('confirmation expiry',count)
  # Completion of a custom text must not use a restart button as the input sink.
  p.click('#again-btn');p.click('#custom-btn');p.fill('#custom-text','this is a test');p.click('#use-custom-btn')
  count=p.evaluate('history.length');p.locator('#capture').focus();p.keyboard.type('this is a test');stable('custom text',count)
  # Manual stop retains saved results; infinite practice summaries remain private.
  count=ready();p.clock.fast_forward(1100);p.click('#stop-btn');stable('manual stop',count)
  for kind in ['practice','code']:
   ready(kind);p.click('#stop-btn');p.click('#again-btn');p.click('[data-duration="infinite"]')
   count=p.evaluate('history.length');p.locator('#capture').focus();p.keyboard.type('abc');p.clock.fast_forward(2200);p.click('#stop-btn');stable('infinite '+kind,count,True)
   check('ephemeral flag '+kind,p.evaluate('currentResult.ephemeral===true'))
  # Translating a summary must preserve it and leave storage untouched.
  result_id=p.evaluate('currentResult.id');count=p.evaluate('history.length');p.select_option('#ui-language','en')
  check('language change preserves result view',p.evaluate('currentResult.id')==result_id and p.locator('#results-view').is_visible() and p.evaluate('history.length')==count)
  p.click('#again-btn');check('explicit restart click',p.locator('#test-view').is_visible())
  # Native storage policy failures are handled without losing the timer/result UX.
  p.close();ctx.close()
  ctx=browser.new_context(locale='en-US');p=ctx.new_page()
  markup=re.sub(r'<script[^>]*src=[^>]*></script>','',html);markup=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',markup)
  p.set_content(markup);p.evaluate('Object.defineProperty(window,"localStorage",{get(){throw new Error("blocked storage")}})')
  for file in ['data.js','app.js']:p.add_script_tag(content=(ROOT/file).read_text())
  check('blocked storage does not prevent browser defaults',p.evaluate('settings.uiLanguage')=='en')
  p.close();ctx.close();browser.close()
 check('no JavaScript errors',not errors)
 print(json.dumps({'checks':len(checks),'passed':sum(c['passed'] for c in checks),'fixture':FIXTURE},indent=2))
finally:server.shutdown()
