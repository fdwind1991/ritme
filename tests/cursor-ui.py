"""Real-server Chromium checks for the shared presentation cursor.
Run: CHROMIUM_PATH=/usr/bin/chromium python tests/cursor-ui.py
Requires Playwright. Uses only isolated browser contexts, never user storage.
Pass --offline for injected markup/assets with an in-memory storage fixture.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json, os, threading, re, sys
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
checks = []
def check(name, condition, detail=None):
    checks.append({'name': name, 'passed': bool(condition), 'detail': detail})
    assert condition, (name, detail)
GEOMETRY = """() => {
 const t = document.querySelector('#word-track .current');
 const c = document.querySelector('#word-track .polish-caret');
 if (!t || !c) return null;
 const a=t.getBoundingClientRect(),b=c.getBoundingClientRect();
 return {x:b.x,y:b.y,tx:a.x,ty:a.bottom+1,width:b.width,tw:a.width,
  hidden:c.hidden,color:getComputedStyle(c).color,
  targetColor:getComputedStyle(t,'::after').backgroundColor,
  old:getComputedStyle(t,'::after').visibility,
  animations:c.getAnimations().map(a=>a.transitionProperty)};
}"""
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), headless=True, args=['--no-sandbox'])
    page = browser.new_page(locale='nl-NL', viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append(m.text) if m.type=='warning' and 'Ritme' in m.text else None)
    if '--offline' in sys.argv:
        html = re.sub(r'<script[^>]*src=[^>]*></script>', '', (ROOT/'index.html').read_text())
        html = re.sub(r'<link[^>]*rel="stylesheet"[^>]*>', '', html)
        page.set_content(html)
        page.evaluate("() => {const store=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)}})}")
        for name in ['styles.css','polish.css']:
            page.add_style_tag(content=(ROOT/name).read_text())
        for name in ['data.js','app.js','polish.js']:
            page.add_script_tag(content=(ROOT/name).read_text())
        check('Offline markup and assets initialise',page.evaluate('!!window.RitmePolish'))
    else:
        response=page.goto(f'http://127.0.0.1:{server.server_port}/', wait_until='networkidle', timeout=10000)
        check('Actual HTTP assets load',response.status==200)
    page.wait_for_timeout(300)
    def aligned(name, settle=160):
        page.wait_for_timeout(settle)
        g=page.evaluate(GEOMETRY)
        check(name, g and not g['hidden'] and abs(g['x']-g['tx'])<0.8 and abs(g['y']-g['ty'])<0.8 and abs(g['width']-g['tw'])<0.8,g)
    aligned('Initial cursor lines up')
    check('Old underline suppressed only after initialisation',page.evaluate(GEOMETRY)['old']=='hidden')
    page.evaluate("mode='custom';customText='aaaa bbbb cccc dddd '.repeat(25).trim();newTest()")
    aligned('New prompt snaps to first letter',330)
    page.evaluate("window.savedCaret=document.querySelector('.polish-caret')")
    before=page.evaluate(GEOMETRY)
    page.keyboard.type('a')
    page.wait_for_timeout(30)
    moving=page.evaluate(GEOMETRY)
    check('Forward movement interpolates between letters',before['x'] < moving['x'] < moving['tx'],moving)
    aligned('Forward motion reaches correct target')
    check('Cursor DOM element survives input',page.evaluate("savedCaret===document.querySelector('.polish-caret')"))
    before=page.evaluate(GEOMETRY)
    page.keyboard.press('Backspace')
    page.wait_for_timeout(30)
    moving=page.evaluate(GEOMETRY)
    check('Backspace interpolates backwards',moving['tx'] < moving['x'] < before['x'],moving)
    aligned('Backspace reaches correct target')
    page.keyboard.type('aaaa')
    aligned('End-of-word space target')
    page.keyboard.type(' ')
    aligned('Across space to next word')
    page.keyboard.type('bbbbxx')
    aligned('Extra characters keep cursor at shifted gap')
    page.keyboard.press('Control+Backspace')
    aligned('Delete-word cursor')
    # Fast native keyboard input, then a visual line break and scrolling.
    page.evaluate("newTest()")
    page.wait_for_timeout(330)
    prompt=page.evaluate('session.words.map(w=>w.text).join(" ")')
    page.keyboard.type(prompt[:130],delay=1)
    aligned('Fast input and multiple wraps',300)
    check('Input is never delayed by animation',page.evaluate('session.metric(60).attempts')==130,page.evaluate('session.metric(60).attempts'))
    check('Only one shared underline',page.locator('.polish-caret').count()==1)
    # Reflow through every supported font size and a narrow window.
    for size in [24,28,32,36]:
        page.evaluate('size=>{settings.size=size;applyAppearance();scrollToCaret()}',size)
        aligned('Font size '+str(size))
    page.set_viewport_size({'width':375,'height':812})
    aligned('Mobile reflow',300)
    # Current engine's code lines include real newlines, indentation and extras.
    page.evaluate("mode='code';settings.codeLanguage='python';settings.codeInfinite=true;newTest()")
    aligned('Code begins after line-number gutter',330)
    first=page.evaluate('session.current.text')
    page.keyboard.type(first)
    aligned('Code end-of-line target')
    page.keyboard.press('Enter')
    aligned('Code newline, no cross-screen sweep',250)
    page.keyboard.press('Backspace')
    aligned('Backspace to previous code line',250)
    # Force a very long source line using the existing session class (not evaluated).
    page.evaluate("""() => {
     session=new CodeTypingSession({...session.config},['x = '+ 'value + '.repeat(20)+'0','    print(x)',''],false);
     nodes=[];$('word-track').replaceChildren();appendNodes();renderWord(0);scrollToCaret();focusTyping();
    }""")
    aligned('New code track restores shared underline')
    line=page.evaluate('session.current.text')
    page.keyboard.type(line[:85])
    aligned('Long code line follows horizontal scrolling')
    check('Code viewport scrolled horizontally',page.evaluate("$('typing-viewport').scrollLeft>0"))
    page.evaluate("$('typing-viewport').scrollLeft-=20")
    aligned('Manual horizontal scroll carries the underline')
    # Finger color and theme are taken from the existing underline styles.
    page.evaluate("mode='practice';settings.practiceLesson='home';settings.practiceInfinite=true;newTest()")
    aligned('Practice cursor',330)
    check('Practice cursor preserves finger color',page.evaluate(GEOMETRY)['color']==page.evaluate(GEOMETRY)['targetColor'])
    for theme in ['dark','light']:
        page.evaluate('theme=>{settings.theme=theme;applyAppearance()}',theme)
        aligned(theme+' theme',300)
        check(theme+' cursor color matches original',page.evaluate(GEOMETRY)['color']==page.evaluate(GEOMETRY)['targetColor'])
    # Reduced-motion toggle takes effect in the existing session.
    page.emulate_media(reduced_motion='reduce')
    page.wait_for_timeout(50)
    page.keyboard.type(page.evaluate('session.current.chars[session.current.input.length]'))
    aligned('Reduced-motion target',40)
    check('Reduced-motion has no transition',page.evaluate("getComputedStyle(document.querySelector('.polish-caret')).transitionDuration==='0s'"))
    check('Reduced-motion has no blink',page.evaluate("getComputedStyle(document.querySelector('.polish-caret'),'::before').animationName==='none'"))
    page.emulate_media(reduced_motion='no-preference')
    page.wait_for_timeout(50)
    # Recycle long, non-persisted practice tracks.
    page.evaluate("insertText(session.words.slice(session.index,session.index+110).map(w=>w.text).join(' ')+' ')")
    aligned('Infinite practice recycled rows',300)
    check('Recycling does not duplicate cursor',page.locator('.polish-caret').count()==1)
    page.evaluate('stopInfinitePractice(60)')
    check('Result screen has no visible typing cursor',not page.locator('.polish-caret').is_visible())
    check('Result focus remains non-interactive',page.evaluate("document.activeElement.id==='results-view'"))
    page.keyboard.press('Enter');page.keyboard.press('Space')
    check('Trailing keys do not restart',page.locator('#results-view').is_visible())
    page.evaluate('newTest()');aligned('Restart after results',300)
    page.evaluate("openDialog('help-dialog')")
    check('Help still opens',page.locator('#help-dialog').is_visible())
    page.keyboard.press('Escape');page.wait_for_timeout(200)
    check('Help still closes',not page.locator('#help-dialog').is_visible())
    aligned('Cursor retained after modal')
    check('No JavaScript errors or enhancement warnings',not errors,errors)
    browser.close()
server.shutdown()
print(json.dumps({'passed':len(checks),'checks':checks},indent=2))
