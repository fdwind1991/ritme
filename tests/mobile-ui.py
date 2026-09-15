"""UI regressions in Chromium. Default: real local files and browser storage.
Set RITME_DOM_FIXTURE=1 for a network-free DOM fixture with simulated storage.
Run: CHROMIUM_PATH=/usr/bin/chromium python tests/mobile-ui.py
Requires Python Playwright for development only. No external network calls.
"""
from pathlib import Path
import os,json,re,threading,http.server,functools
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('RITME_CHECKS_DIR','/mnt/data/ritme-mobile-checks'));OUT.mkdir(parents=True,exist_ok=True)
FIXTURE=os.environ.get("RITME_DOM_FIXTURE")=="1"
checks=[]
def check(name,ok,details=None):
    checks.append({'name':name,'passed':bool(ok),'details':details})
    assert ok,(name,details)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
    def translate_path(self,path):
        self.path=path
        if path.startswith('/ritme/'):
            path=path[len('/ritme'):]
        return super().translate_path(path)
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{server.server_address[1]}/ritme/'
try:
 with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH'),headless=True,args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,device_scale_factor=2)
    errors=[];failed=[]
    def load(previous=None):
      values={};viewport={'width':390,'height':844}
      if previous:
        viewport=previous.viewport_size
        if FIXTURE: values=previous.evaluate('window.__fixtureStore||{}')
        previous.close()
      target=context.new_page();target.set_viewport_size(viewport)
      target.on('pageerror',lambda e:errors.append(str(e)))
      target.on('requestfailed',lambda r:failed.append(r.url))
      if FIXTURE:
        html=re.sub(r'<script[^>]*src=[^>]*></script>','',(ROOT/'index.html').read_text())
        html=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',html)
        target.set_content(html)
        target.add_style_tag(content=(ROOT/'styles.css').read_text())
        target.evaluate("""values=>{window.__fixtureStore=values;Object.defineProperty(window,'localStorage',{value:{getItem:k=>values[k]||null,setItem:(k,v)=>values[k]=String(v),removeItem:k=>delete values[k],clear:()=>Object.keys(values).forEach(k=>delete values[k])}});} """,values)
        target.add_script_tag(content=(ROOT/'data.js').read_text())
        target.add_script_tag(content=(ROOT/'app.js').read_text())
      else: target.goto(base)
      target.wait_for_function('typeof session!=="undefined" && !!session');target.wait_for_timeout(250)
      return target
    page=load()
    check('Current release loads real CSS and scripts',page.evaluate("APP_RELEASE===document.querySelector('meta[name=ritme-release]').content&&RITME_DATA.release===APP_RELEASE&&!$('fatal-error').hidden===false"))
    for lang in ['nl','en','de']:
      page.select_option('#ui-language',lang)
      check('Exercise optgroup '+lang,page.locator('#word-activity optgroup').get_attribute('label')==page.evaluate("translate('practice.mode')"))
      for width in [320,390,768,1440]:
        page.set_viewport_size({'width':width,'height':844})
        page.select_option('#word-activity','free')
        check(f'+123 visible in free mode {lang}/{width}',page.locator('#mix-numbers-btn').is_visible())
        page.click('#mix-numbers-btn');check(f'+123 enables numbers {lang}/{width}',page.evaluate('settings.numbers&&session.config.numbers'))
        page.click('#mix-numbers-btn')
        page.select_option('#word-activity','practice')
        check(f'Adaptive selected {lang}/{width}',page.evaluate("mode==='practice'&&session.config.practiceLesson==='adaptive'"))
        check(f'No extra practice rows {lang}/{width}',page.locator('.control-deck > .practice-settings').count()==0 and not page.locator('#practice-keyboard-btn').is_visible())
        check(f'No page overflow {lang}/{width}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        height=page.locator('.control-deck').bounding_box()['height']
        check(f'Compact controls {lang}/{width}',height<145,height)
        if lang=='nl' and width==390:page.wait_for_timeout(300);page.screenshot(path=str(OUT/'practice-mobile.png'),full_page=True)
        if lang=='nl' and width==1440:page.screenshot(path=str(OUT/'practice-desktop.png'),full_page=True)
    page.set_viewport_size({'width':390,'height':844});page.select_option('#ui-language','nl')
    page.click('#test-info-btn')
    check('Practice options available under information',page.locator('#practice-keyboard-btn').is_visible() and page.locator('#punctuation-btn').is_visible())
    prompt=page.evaluate('session.words.map(w=>w.text).join(" ")')
    page.click('#practice-colors-btn')
    check('Color toggle keeps popover open',page.locator('#test-info-panel').is_visible())
    check('Color toggle does not regenerate prompt',page.evaluate('session.words.map(w=>w.text).join(" ")')==prompt)
    page.click('#practice-colors-btn');page.click('#test-info-close')
    for lesson in ['words','home','top','bottom','letters','shift','digits']:
      page.select_option('#word-activity','practice:'+lesson)
      check('Select lesson '+lesson,page.evaluate('session.config.practiceLesson')==lesson)
      check('No hidden selection failure '+lesson,not page.locator('#fatal-error').is_visible())
    page.select_option('#word-activity','free');page.click('#mix-numbers-btn');page.wait_for_timeout(300)
    page.screenshot(path=str(OUT/'free-mobile.png'),full_page=True)
    # Deterministic number-selection stub, not a statistical test.
    generated=page.evaluate("""(()=>{const old=secureInt;try{secureInt=n=>0;return makeWords('nl',2,{numbers:true,punctuation:false,capitals:false});}finally{secureInt=old;}})()""")
    check('Mixed number generation remains active',generated==['1','1'],generated)
    page=load(page)
    check('Settings preserve +123 across page recreation',page.evaluate("mode==='words'&&settings.numbers&&session.config.numbers") and page.locator('#mix-numbers-btn').is_visible())
    page.select_option('#word-activity','standard')
    check('Standard still excludes number mixing',page.evaluate('session.config.duration===60&&!session.config.numbers&&isStandard(session.config)'))
    check('Standard hides mix toggle',not page.locator('#mix-numbers-btn').is_visible())
    page.select_option('#word-activity','free')
    check('Back to free restores mixed numbers',page.evaluate('settings.numbers&&session.config.numbers'))
    page.click('#code-btn')
    for lang in ['nl','en','de']:
      page.select_option('#ui-language',lang)
      before=page.evaluate('history.length')
      page.click('#code-tutorial-btn');check('Tutorial opens '+lang,page.locator('#code-tutorial-dialog').is_visible())
      check('Tutorial translated '+lang,page.locator('#code-tutorial-title').inner_text()==page.evaluate("translate('code.tutorial.title')"))
      check('Tutorial is inert text '+lang,page.locator('#code-tutorial-example').locator('script,input,button,div').count()==0)
      check('Tutorial does not start or save a test '+lang,page.evaluate('!session.running&&history.length')==before)
      page.locator('#code-tutorial-dialog [data-close]').last.click()
      check('Tutorial closes without restarting '+lang,page.evaluate('!session.running&&history.length')==before)
    page.select_option('#ui-language','nl')
    for language in ['python','html','css','javascript']:
      page.select_option('#code-language',language)
      for width in [320,390,768,1440]:
        page.set_viewport_size({'width':width,'height':844});page.wait_for_timeout(70)
        check(f'Code wraps inside viewport {language}/{width}',page.evaluate("[...$('word-track').children].every(el=>getComputedStyle(el).whiteSpace==='pre-wrap'"))
        check(f'Code contained in viewport {language}/{width}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
    # Fixed long line fixture: no application source/corpora or scores changed.
    page.set_viewport_size({'width':390,'height':844});page.select_option('#code-language','python')
    page.evaluate("""()=>{settings.codeInfinite=true;newTest();session.words=[];session.generatedWordCount=0;session.index=0;
      session.addWords(['print("A source line remains a single line even when the mobile screen is narrow.")','    return value;','','done()']);
      nodes=[];$('word-track').replaceChildren();appendNodes();for(let i=0;i<nodes.length;i++)renderWord(i);scrollToCaret();} """)
    check('Long line wraps inside viewport',page.evaluate('Math.abs(nodes[0].chars[0].getBoundingClientRect().top-nodes[0].chars.at(-1).getBoundingClientRect().top)>1'))
    check('Horizontal scrolling unavailable',page.evaluate("$('typing-viewport').scrollWidth<=$('typing-viewport').clientWidth"))
    page.screenshot(path=str(OUT/'code-mobile.png'),full_page=True)
    page.locator('#capture').focus();text=page.evaluate('session.current.text');page.keyboard.type(text)
    check('Caret remains inside viewport',page.evaluate("(()=>{const a=$('typing-viewport').getBoundingClientRect(),b=nodes[session.index].gap.getBoundingClientRect();return b.left>=a.left&&b.right<=a.right;})()"))
    check('Code remains at horizontal origin',page.evaluate("$('typing-viewport').scrollLeft===0"))
    page.keyboard.press('Enter');check('Physical Enter once',page.evaluate('session.index===1'))
    check('Enter keeps horizontal origin',page.evaluate("$('typing-viewport').scrollLeft===0"))
    page.keyboard.type('    ');check('Indent spaces each counted',page.evaluate('session.current.input.length===4'))
    page.keyboard.type('return value;');page.keyboard.press('Enter');page.keyboard.press('Enter')
    check('Blank line advances once',page.evaluate('session.index===3'))
    page.keyboard.press('Backspace');check('Backspace restores previous newline',page.evaluate('session.index===2'))
    # Touch-only input event path with no keydown.
    page.evaluate("$('capture').dispatchEvent(new InputEvent('beforeinput',{inputType:'insertLineBreak',bubbles:true,cancelable:true}))")
    check('Mobile beforeinput Enter once',page.evaluate('session.index===3'))
    # Non-cancelable beforeinput must not insert twice when input then follows.
    page.evaluate("""()=>{const el=$('capture');el.dispatchEvent(new InputEvent('beforeinput',{inputType:'insertParagraph',bubbles:true,cancelable:false}));el.value='\\n';el.dispatchEvent(new InputEvent('input',{inputType:'insertParagraph',bubbles:true}));}""")
    check('Non-cancelable mobile newline counted once',page.evaluate('session.index===4'))
    page.locator('#capture').focus();page.keyboard.type('x')
    count=page.evaluate('session.current.input.length')
    page.evaluate("""()=>{const el=$('capture');el.dispatchEvent(new InputEvent('beforeinput',{inputType:'deleteContentBackward',bubbles:true,cancelable:false}));el.dispatchEvent(new InputEvent('input',{inputType:'deleteContentBackward',bubbles:true}));}""")
    check('Non-cancelable mobile deletion once',page.evaluate('session.current.input.length')==count-1)
    before=page.evaluate('history.length');page.click('#stop-btn')
    check('Infinite result remains temporary',page.evaluate('currentResult.ephemeral&&history.length')==before)
    page=load(page)
    check('No infinite test in storage after page recreation',page.evaluate('history.length')==before)
    # Shrinking viewport simulates limited room; this is not a native iOS keyboard test.
    page.set_viewport_size({'width':390,'height':420});page.wait_for_timeout(120)
    height=page.locator('#typing-viewport').bounding_box()['height']
    check('Code editor adapts to short viewport',100<=height<330,height)
    page.set_viewport_size({'width':1440,'height':900});page.wait_for_timeout(150)
    page.screenshot(path=str(OUT/'code-desktop.png'),full_page=True)
    page.click('#code-tutorial-btn');page.wait_for_timeout(300);page.screenshot(path=str(OUT/'tutorial-desktop.png'),full_page=True)
    page.locator('#code-tutorial-dialog [data-close]').last.click()
    check('No JS runtime errors',not errors,errors);check('No failed app requests',not failed,failed)
    browser.close()
finally:
 server.shutdown();server.server_close()
 (OUT/'results.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
print(f'{len(checks)} Chromium checks passed; DOM fixture={FIXTURE}. Screenshots/report: {OUT}')
