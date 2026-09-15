"""Offline DOM fixture checks. No network, deployment, or native storage claims."""
from pathlib import Path
import re,json,os
from playwright.sync_api import sync_playwright
import tempfile
root=Path(__file__).resolve().parents[1]
checks=Path(tempfile.mkdtemp(prefix='ritme-browser-checks-'))
results=[]
def check(name, condition, detail=None):
    results.append({'name':name,'passed':bool(condition),'detail':detail})
    assert condition,(name,detail)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH'),headless=True,args=['--no-sandbox'])
    page=browser.new_page(locale='nl-NL',viewport={'width':1440,'height':1000})
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    html=re.sub(r'<script[^>]*src=[^>]*></script>','',(root/'index.html').read_text())
    html=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',html)
    page.set_content(html)
    page.add_style_tag(content=(root/'styles.css').read_text())
    page.evaluate("""() => {const store=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}});} """)
    page.add_script_tag(content=(root/'data.js').read_text())
    page.add_script_tag(content=(root/'app.js').read_text())
    page.wait_for_timeout(100)
    check('Initialises extended Dutch word test',page.evaluate("session.config.wordCorpusVersion==='ritme-expanded-v1'&&session.config.language==='nl'"))
    check('No fatal startup message',not page.locator('#fatal-error').is_visible())
    # Capture files in memory, not browser downloads. Scope is unchanged runtime exports.
    page.evaluate("downloadFile=(text,name,type)=>{window.lastDownload={text,name,type};}")
    for language in ['python','html','css','javascript']:
        page.evaluate("""lang=>{mode='code';settings.codeLanguage=lang;settings.codeInfinite=false;settings.codeGuide=false;newTest();}""",language)
        check(language+' initialises',page.evaluate("session.config.language===settings.codeLanguage&&!$('fatal-error').hidden===false"))
        # Actual keyboard events preserve case, symbols and spaces.
        page.locator('#capture').focus()
        first=page.evaluate('session.current.text')
        page.keyboard.type(first,delay=0);page.keyboard.press('Enter')
        check(language+' Enter advances exactly one line',page.evaluate('session.index===1'))
        check(language+' exact code characters',page.evaluate("session.metric(10).correct")==len(first)+1, {'typed':len(first)+1})
        check(language+' not evaluated as HTML',page.locator('#word-track ul,#word-track script,#word-track input,#word-track details,#word-track style').count()==0)
        # Complete against explicit elapsed time for deterministic scored fixture.
        page.evaluate("completeTest('time',60)")
        check(language+' stores a valid versioned result',page.evaluate("validResult(currentResult)&&profileKey(currentResult).startsWith('code-v1|')"))
        check(language+' has no prose benchmark',page.evaluate("$('result-benchmark').textContent.includes(translate('code.benchmark'))"))
        page.evaluate("exportHistory()")
        check(language+' CSV keeps profile',page.evaluate("parseCSV(window.lastDownload.text).some(r=>validResult(r)&&profileKey(cleanImportedResult(r))===profileKey(currentResult))"))
        page.evaluate("backupHistory()")
        check(language+' JSON keeps profile',page.evaluate("JSON.parse(window.lastDownload.text).results.some(r=>validResult(r)&&profileKey(cleanImportedResult(r))===profileKey(currentResult))"))
    # Row drills must not carry a word-corpus identity and must survive reload.
    for lesson in ['home','top','bottom','letters','shift','digits','adaptive','words']:
        page.evaluate("""lesson=>{mode='practice';settings.practiceInfinite=false;settings.practiceLesson=lesson;settings.wordCorpus='expanded';newTest();insertText(session.current.text+' ');completeTest('time',60);}""",lesson)
        check('Practice '+lesson+' persists valid result',page.evaluate("!!validResult(currentResult)"),page.evaluate("({mode:currentResult.mode,corpus:currentResult.wordCorpusVersion,lesson:currentResult.practiceLesson})"))
    page.evaluate("mode='words';settings.standardTest=true;newTest()")
    check('Standard v1 remains fixed base protocol',page.evaluate("isStandard(session.config)&&selectedWordCorpus(session.config)===LEXICONS[session.config.language]&&!session.config.wordCorpusVersion&&session.config.duration===60"))
    check('Corpus selector locked in standard',page.locator('#word-corpus').is_disabled())
    page.evaluate("insertText(session.current.text+' ');completeTest('time',60)")
    check('Standard result valid',page.evaluate('!!validResult(currentResult)'))
    page.evaluate("mode='words';settings.standardTest=false;settings.wordCorpus='basic';newTest();insertText(session.current.text+' ');completeTest('time',60)")
    check('Old base histories keep same profile',page.evaluate("(()=>{const r={...currentResult};delete r.wordCorpusVersion;delete r.wordCorpusFingerprint;return profileKey(r)===profileKey(currentResult);})()"))
    for keyboard in ['row','numpad']:
        page.evaluate("""keyboard=>{mode='numbers';settings.numberKeyboard=keyboard;newTest();insertText(session.current.text+' ');completeTest('time',60);}""",keyboard)
        check('Numbers '+keyboard+' persists valid result',page.evaluate('!!validResult(currentResult)'))
    page.evaluate("mode='custom';customText='Hi there';newTest();insertText('Hi there')")
    check('Custom text still finishes',page.evaluate("currentResult?.mode==='custom'&&!!validResult(currentResult)"))
    # Guidance/state/translation test with an infinite code session.
    page.evaluate("mode='code';settings.codeLanguage='python';settings.codeInfinite=true;newTest()")
    before=page.evaluate('history.length')
    page.locator('#test-info-btn').click();page.locator('#code-guide-btn').click()
    check('Optional code guide opens',page.locator('#practice-guide').is_visible())
    page.locator('#test-info-close').click()
    page.locator('#capture').focus();page.keyboard.type(page.evaluate('session.current.text'))
    check('Enter guidance at end of line',page.locator('#coach-target-key').inner_text()=='Enter ↵')
    check('Enter key highlighted',page.locator('#coach-keyboard [data-code="Enter"]').evaluate("el=>el.classList.contains('kb-next')"))
    for language in ['en','de','nl']:
        index=page.evaluate('session.index');prompt=page.evaluate('session.words.map(w=>w.text).join("\\n")')
        page.locator('#ui-language').select_option(language)
        check('UI '+language+' does not change code',page.evaluate('session.index')==index and page.evaluate('session.words.map(w=>w.text).join("\\n")')==prompt)
    page.locator('#capture').focus();page.keyboard.press('Enter')
    page.evaluate('updateLive()')
    check('Code has live WPM and first-pass accuracy', 'WPM' in page.locator('#live-wpm').inner_text().upper() and '%' in page.locator('#live-wpm').inner_text())
    page.locator('#stop-btn').click()
    check('Code infinite summary remains temporary',page.evaluate('currentResult.ephemeral===true&&!validResult(currentResult)&&history.length')==before)
    # Physical code scrolling and recycling stay bounded after many submitted lines.
    page.evaluate("newTest();for(let i=0;i<130;i++)insertText(session.current.text+'\\n')")
    check('Live code recycling keeps current index bounded',page.evaluate('session.index<97&&nodes.length===session.words.length'))
    check('Line numbers survive recycling',page.evaluate('session.current.lineNumber===131'))
    page.evaluate("completeTest('manual',120)")
    check('Long code summary still not saved',page.evaluate('currentResult.ephemeral===true&&history.length')==before)
    page.evaluate("settings.codeGuide=false;mode='code';newTest()")
    # RTL not offered; all supported UI strings and viewport widths.
    for lang in ['nl','en','de']:
        page.locator('#ui-language').select_option(lang)
        for width in [320,390,768,1440]:
            page.set_viewport_size({'width':width,'height':960})
            page.wait_for_timeout(80)
            check(f'No horizontal page overflow {lang}/{width}',page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'))
    page.set_viewport_size({'width':1440,'height':1000})
    page.locator('#ui-language').select_option('nl')
    page.screenshot(path=str(checks/'code-desktop.png'),full_page=True)
    page.locator('#theme-btn').click()
    page.screenshot(path=str(checks/'code-dark.png'),full_page=True)
    page.set_viewport_size({'width':320,'height':900})
    page.locator('#ui-language').select_option('de')
    page.screenshot(path=str(checks/'code-320.png'),full_page=True)
    check('No JavaScript page errors',not errors,errors)
    browser.close()
(checks/'browser-results.json').write_text(json.dumps(results,indent=2))
print(f'{len(results)} browser fixture checks passed. Artifacts: {checks}')
