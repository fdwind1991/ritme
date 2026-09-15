/* Ritme · optional presentation layer, GPL-3.0. Load after app.js.
   Deliberately separate from timing, input, randomness, scores and storage.
   The legacy app exposes global render functions: decorate those functions,
   preserving arguments/return values and running the original first. The two
   completion guards only identify a freshly finished test for a one-time PR.
   A failed enhancement must never stop the underlying typing engine. */
(() => {
  'use strict';
  if (typeof session === 'undefined' || !session || window.RitmePolish) return;
  const byId = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  const pendingPoints = new Set();
  let finishing = 0, recordTimer = null;
  const messages = {
    nl: { accuracy:'aanslagnauwkeurigheid', clean:'Geen typefouten geregistreerd.', most:'Meeste fouten: {key} ({errors} van {total}).', keyNote:'Dit is het aandeel in je fouten, niet de foutkans per toets of een meting van je gebruikte vingers.', chartHelp:'Gebruik de pijltjestoetsen om meetpunten te bekijken. Home en End gaan naar het eerste en laatste punt.', time:'seconden', net:'Netto', raw:'Bruto' },
    en: { accuracy:'keystroke accuracy', clean:'No typing errors recorded.', most:'Most errors: {key} ({errors} of {total}).', keyNote:'This is a share of errors, not the error rate per key or a measurement of the fingers you used.', chartHelp:'Use the arrow keys to inspect samples. Home and End select the first and last sample.', time:'seconds', net:'Net', raw:'Raw' },
    de: { accuracy:'Anschlaggenauigkeit', clean:'Keine Tippfehler erfasst.', most:'Meiste Fehler: {key} ({errors} von {total}).', keyNote:'Dies ist ein Anteil an den Fehlern, keine Fehlerrate pro Taste oder Messung der verwendeten Finger.', chartHelp:'Mit den Pfeiltasten Messpunkte anzeigen. Pos1 und Ende wählen den ersten und letzten Punkt.', time:'Sekunden', net:'Netto', raw:'Brutto' }
  };
  const words = () => messages[settings.uiLanguage] || messages.en;
  function safely(action) {
    try { return action(); }
    catch (error) { console.warn('Ritme presentation:', error); }
  }
  function after(name, effect) {
    const original = window[name];
    if (typeof original !== 'function') return;
    window[name] = function (...args) {
      const result = original.apply(this, args);
      safely(() => effect(...args));
      return result;
    };
  }
  function animate(element, frames, options = {}) {
    if (!element || reduced.matches || typeof element.animate !== 'function' || !element.getClientRects().length) return;
    const animation = element.animate(frames, { duration:180, easing:'cubic-bezier(.22,.61,.36,1)', fill:'backwards', ...options });
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    return animation;
  }
  function animateStroke(element, duration, delay = 0) {
    if (!element || reduced.matches) return;
    let length;
    try { length = element.getTotalLength(); }
    catch { return; }
    if (!Number.isFinite(length) || length <= 0) return;
    const cleanup = () => { element.style.removeProperty('stroke-dasharray'); element.style.removeProperty('stroke-dashoffset'); };
    element.style.strokeDasharray = String(length);
    element.style.strokeDashoffset = String(length);
    const animation = animate(element,[{strokeDashoffset:length},{strokeDashoffset:0}],{duration,delay,easing:'cubic-bezier(.22,.61,.36,1)'});
    if (animation) animation.finished.then(cleanup,cleanup); else cleanup();
  }
  function animateChartInk(svg, lineSelector, areaSelector, duration = 620) {
    if (!svg || reduced.matches) return;
    [...svg.querySelectorAll(lineSelector)].forEach((line,index) => animateStroke(line,duration,index*85));
    const area = svg.querySelector(areaSelector);
    if (area) animate(area,[{opacity:0},{opacity:1}],{duration:420,delay:100});
  }
  function cancelAnimations() {
    for (const animation of animations) animation.cancel();
    animations.clear();
  }
  const reduceChanged = () => { if (reduced.matches) cancelAnimations(); };
  if (reduced.addEventListener) reduced.addEventListener('change', reduceChanged);
  else reduced.addListener(reduceChanged);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimations(); });

  // Keep the options slot even when the engine hides/moves its controls.
  const options = byId('word-options');
  const slot = document.createElement('div'); slot.className = 'polish-options-slot';
  options.replaceWith(slot); slot.append(options);

  // Anchor to Aa, not to the viewport's right edge (header has a max-width).
  const fontButton = byId('font-btn'), fontMenu = byId('font-menu');
  fontButton.setAttribute('aria-controls', 'font-menu');
  fontMenu.setAttribute('role', 'group');
  function positionFontMenu() {
    if (fontMenu.hidden) return;
    const rect = fontButton.getBoundingClientRect(), vv = window.visualViewport;
    const leftEdge = vv?.offsetLeft || 0, topEdge = vv?.offsetTop || 0;
    const width = vv?.width || document.documentElement.clientWidth;
    const height = vv?.height || innerHeight;
    if (rect.bottom < topEdge || rect.top > topEdge+height) { closeFontMenu(); return; }
    const left = Math.max(leftEdge+12, Math.min(rect.left+rect.width/2-fontMenu.offsetWidth/2, leftEdge+width-fontMenu.offsetWidth-12));
    let top = rect.bottom+8;
    if (top+fontMenu.offsetHeight > topEdge+height-12) top = Math.max(topEdge+12, rect.top-fontMenu.offsetHeight-8);
    fontMenu.style.setProperty('--font-menu-left', left+'px');
    fontMenu.style.setProperty('--font-menu-top', top+'px');
  }
  new MutationObserver(positionFontMenu).observe(fontMenu, { attributes:true, attributeFilter:['hidden'] });
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(positionFontMenu);
    observer.observe(document.querySelector('.topbar')); observer.observe(fontButton);
  }
  window.addEventListener('resize', positionFontMenu, { passive:true });
  window.addEventListener('scroll', positionFontMenu, { passive:true });
  window.visualViewport?.addEventListener('resize', positionFontMenu, { passive:true });
  window.visualViewport?.addEventListener('scroll', positionFontMenu, { passive:true });
  function closeFontMenu(returnFocus = false) {
    fontMenu.hidden = true; fontButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) fontButton.focus({ preventScroll:true });
  }
  document.addEventListener('focusin', event => {
    if (!fontMenu.hidden && !fontMenu.contains(event.target) && event.target !== fontButton) closeFontMenu();
  });
  document.addEventListener('keydown', event => {
    const inMenu = fontMenu.contains(event.target);
    if (event.target === fontButton && event.key === 'ArrowDown') {
      event.preventDefault(); event.stopImmediatePropagation();
      fontMenu.hidden = false; fontButton.setAttribute('aria-expanded', 'true'); positionFontMenu();
      fontMenu.querySelector('[aria-pressed="true"]')?.focus();
    } else if (!fontMenu.hidden && event.key === 'Escape') {
      event.preventDefault(); event.stopImmediatePropagation(); closeFontMenu(true);
    } else if (inMenu && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      const buttons = [...fontMenu.querySelectorAll('[data-size]')], index = buttons.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 : (index+(event.key === 'ArrowRight' ? 1 : -1)+buttons.length)%buttons.length;
      buttons[next].focus();
    }
  }, true);

  byId('theme-btn').innerHTML = '<span class="theme-symbol" aria-hidden="true"><svg class="theme-moon" fill="none" viewBox="0 0 20 20"><path d="M16.8 11.7A7 7 0 0 1 8.3 3.2 7 7 0 1 0 16.8 11.7Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.2"/></svg><svg class="theme-sun" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" stroke="currentColor" stroke-linecap="round" stroke-width="1.2"/></svg></span>';

  function summaryText(r) {
    if (!r || !Number.isFinite(r.wpm)) return '';
    const text = words();
    const parts = [formatNumber(Math.round(r.wpm))+' WPM'];
    if (Number.isFinite(r.keystrokeAccuracy)) parts.push(formatNumber(r.keystrokeAccuracy,1)+'% '+text.accuracy);
    let ending = '';
    const keys = Object.entries(r.keys || {}).filter(([,v]) => Number.isFinite(v?.errors) && v.errors > 0)
      .sort((a,b) => b[1].errors-a[1].errors || a[0].localeCompare(b[0]));
    if (r.attempts > 0 && r.typos === 0) ending = text.clean;
    else if (keys.length && Number.isFinite(r.typos) && r.typos >= keys[0][1].errors) {
      const [key, stats] = keys[0];
      ending = text.most.replace('{key}', labelKey(key)).replace('{errors}', formatNumber(stats.errors)).replace('{total}', formatNumber(r.typos));
    }
    return parts.join(' · ')+'.'+(ending ? ' '+ending : '');
  }
  function isNewRecord(r) {
    if (!isCompleteResult(r) || r.mode === 'custom' || isAdaptive(r)) return false;
    const peers = history.filter(x => !sameStoredTest(x,r) && isCompleteResult(x) && profileKey(x) === profileKey(r) && new Date(x.date) < new Date(r.date));
    return peers.length > 0 && r.wpm > Math.max(...peers.map(x => x.wpm));
  }
  let summary = byId('result-summary');
  if (!summary) {
    summary = document.createElement('p'); summary.id = 'result-summary'; summary.className = 'result-summary'; summary.hidden = true;
    byId('result-benchmark').before(summary);
  }
  function clearRecord() {
    clearTimeout(recordTimer); recordTimer = null; byId('results-view').classList.remove('polish-record');
  }
  function presentResult(r, preserveView = false) {
    summary.textContent = summaryText(r); summary.hidden = !summary.textContent;
    summary.title = words().keyNote;
    if (preserveView) return;
    clearRecord(); cancelAnimations();
    const reveal = [
      ['.result-heading,.result-topline,.hero-stats,.secondary-stats,.mini-accuracy,.practice-result-note,.practice-session-note,.practice-session-detail,#result-summary',0,170],
      ['#result-benchmark,#chart-wrap,#result-legend,#result-chart-empty,.result-actions',90,220],
      ['#weak-spots,#training-note',180,220]
    ];
    for (const [selector,delay,duration] of reveal) {
      for (const element of byId('results-view').querySelectorAll(selector)) animate(element, [{ opacity:0, transform:'translateY(2px)' }, { opacity:1, transform:'none' }], { delay,duration });
    }
    if (finishing && isCompleteResult(r)) {
      pendingPoints.add(r.id);
      if (isNewRecord(r) && !reduced.matches) {
        byId('results-view').classList.add('polish-record'); recordTimer = setTimeout(clearRecord,600);
      }
    }
  }
  // Completion guards neither inspect/alter input nor change result values.
  for (const name of ['completeTest','stopInfinitePractice']) {
    const original = window[name];
    window[name] = function (...args) {
      finishing++;
      try { return original.apply(this,args); }
      finally { finishing--; }
    };
  }
  after('showResult',presentResult);
  after('setView', name => { if (name !== 'result') { cancelAnimations(); clearRecord(); } });

  // Extend the existing result cursor/tooltip with a small point and keyboard
  // inspection. SVG positions are read from the renderer, never recalculated.
  const svgNS = 'http://www.w3.org/2000/svg';
  const hint = document.createElement('span'); hint.id = 'chart-keyboard-hint'; hint.className = 'screen-reader-only';
  const readout = document.createElement('span'); readout.className = 'screen-reader-only'; readout.setAttribute('aria-live','polite'); readout.setAttribute('aria-atomic','true');
  byId('chart-wrap').append(hint,readout);
  function enhanceChart(r) {
    const svg = byId('chart'), line = svg.querySelector('[data-layer="net"] polyline');
    svg.setAttribute('tabindex','0'); svg.setAttribute('aria-describedby',hint.id); hint.textContent = words().chartHelp; readout.textContent = '';
    if (!line || !r.samples.length) return;
    const points = Array.from(line.points, point => ({ x:point.x, y:point.y }));
    const point = document.createElementNS(svgNS,'circle'); point.setAttribute('class','result-point'); point.setAttribute('r','3.2'); point.setAttribute('opacity','0'); point.setAttribute('aria-hidden','true'); svg.append(point);
    const pointerMove = svg.onpointermove, pointerLeave = svg.onpointerleave;
    let selected = 0;
    function syncPoint() {
      const cursor = byId('chart-cursor'); if (!cursor) return;
      const x = Number(cursor.getAttribute('x1'));
      selected = points.reduce((best,p,i) => Math.abs(p.x-x) < Math.abs(points[best].x-x) ? i : best,0);
      point.setAttribute('cx',points[selected].x); point.setAttribute('cy',points[selected].y);
      point.setAttribute('opacity',shownSeries.net ? '1' : '0');
    }
    function showSample(index, announce = false) {
      selected = Math.max(0,Math.min(points.length-1,index));
      const rect = svg.getBoundingClientRect(), width = svg.viewBox.baseVal.width;
      pointerMove?.({ clientX:rect.left+points[selected].x/width*rect.width }); syncPoint();
      if (announce) {
        const sample = r.samples[selected], text = words();
        readout.textContent = formatNumber(sample.t,1)+' '+text.time+' · '+text.net+' '+formatNumber(Math.round(sample.net))+' WPM · '+text.raw+' '+formatNumber(Math.round(sample.raw))+' WPM';
      }
    }
    svg.onpointermove = event => { pointerMove?.(event); syncPoint(); };
    svg.onpointerleave = event => {
      if (document.activeElement === svg) return;
      pointerLeave?.(event); point.setAttribute('opacity','0');
    };
    svg.onfocus = () => showSample(selected,true);
    svg.onblur = () => { pointerLeave?.(); point.setAttribute('opacity','0'); readout.textContent = ''; };
    svg.onkeydown = event => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
      event.preventDefault();
      showSample(event.key === 'Home' ? 0 : event.key === 'End' ? points.length-1 : selected+(['ArrowRight','ArrowUp'].includes(event.key) ? 1 : -1),true);
    };
  }
  after('drawChart',enhanceChart);
  after('drawChart',() => requestAnimationFrame(() => animateChartInk(byId('chart'),'.chart-series','.chart-area',540)));
  document.querySelector('[data-series="net"]').addEventListener('click',() => {
    const point = byId('chart').querySelector('.result-point');
    if (point && !shownSeries.net) point.setAttribute('opacity','0');
  });
  after('drawProgressChart',rows => {
    if (byId('progress-view').hidden) return;
    animateChartInk(byId('progress-chart'),'.progress-series','.progress-area',680);
    rows.forEach((r,index) => {
      if (!pendingPoints.has(r.id)) return;
      const marker = byId('progress-chart').querySelector('[data-point="'+index+'"] .progress-marker');
      if (!marker) return;
      animate(marker,[{ opacity:0 },{ opacity:1 }],{ duration:220 }); pendingPoints.delete(r.id);
    });
  });
  // A single underline survives character changes. Moving each letter's own
  // ::after cannot interpolate between two different elements. Keep the cursor
  // inside the track so native horizontal and animated vertical scrolling carry
  // it with the text. This layer only reads geometry; input stays synchronous.
  safely(() => {
    const track = byId('word-track'), viewport = byId('typing-viewport');
    const caret = document.createElement('span');
    caret.className = 'polish-caret'; caret.setAttribute('aria-hidden','true'); caret.hidden = true;
    let frame = 0, snap = true, previous = null;
    function fallback() {
      caret.hidden = true; track.classList.remove('polish-caret-ready'); previous = null;
    }
    function updateCaret() {
      frame = 0;
      try {
        const target = track.querySelector('.current');
        if (byId('test-view').hidden || document.hidden || !target || !target.getClientRects().length) { fallback(); return; }
        const box = target.getBoundingClientRect(), origin = track.getBoundingClientRect();
        const x = box.left-origin.left, y = box.bottom-origin.top+1, width = box.width;
        if (![x,y,width].every(Number.isFinite) || width <= 0) { fallback(); return; }
        const first = track.querySelector('.word');
        // New prompts, reflow and recycled rows must never sweep across the
        // screen. A real line break resets horizontally; the track still scrolls.
        const jump = snap || reduced.matches || !previous || previous.first !== first || Math.abs(previous.y-y) > 1;
        if (caret.parentNode !== track) track.append(caret);
        caret.hidden = false;
        if (jump) caret.style.transition = 'none';
        caret.style.width = width+'px';
        caret.style.color = getComputedStyle(target,'::after').backgroundColor;
        caret.style.transform = `translate3d(${x}px,${y}px,0)`;
        if (jump) { void caret.offsetWidth; caret.style.removeProperty('transition'); }
        track.classList.add('polish-caret-ready');
        previous = { x,y,first }; snap = false;
      } catch (error) { fallback(); console.warn('Ritme cursor:',error); }
    }
    function queueCaret(reset = false) {
      snap = snap || reset;
      if (!frame) frame = requestAnimationFrame(updateCaret);
    }
    // Run once after the engine has finished each input/layout update, not on
    // every character mutation or timer tick. Multiple changes share one frame.
    after('scrollToCaret',() => queueCaret());
    after('newTest',() => { fallback(); queueCaret(true); });
    after('setView',() => { fallback(); queueCaret(true); });
    after('applyAppearance',() => queueCaret(true));
    if (window.ResizeObserver) new ResizeObserver(() => queueCaret(true)).observe(viewport);
    window.addEventListener('resize',() => queueCaret(true),{ passive:true });
    document.addEventListener('visibilitychange',() => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; fallback(); }
      else queueCaret(true);
    });
    const motionChanged = () => queueCaret(true);
    if (reduced.addEventListener) reduced.addEventListener('change',motionChanged);
    else reduced.addListener(motionChanged);
    document.fonts?.ready.then(() => queueCaret(true));
    queueCaret(true);
  });
  document.body.classList.add('polish-ready');
  // Read-only presentation helpers for regression checks; no session controls.
  window.RitmePolish = Object.freeze({ summaryText,isNewRecord,positionFontMenu });
})();
