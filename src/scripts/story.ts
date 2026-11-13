import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


function layoutCables() {
  const stage = document.querySelector('.ch4-stage');
  const svg = document.querySelector('.cluster-cables');
  if (!stage || !svg) return;
  const sr = stage.getBoundingClientRect();
  if (sr.width < 8 || sr.height < 8) return;
  svg.setAttribute('viewBox', '0 0 ' + sr.width + ' ' + sr.height);
  const cards = [...stage.querySelectorAll('.card')];
  const racks = [...stage.querySelectorAll('.cluster .rack')];
  const targets = [racks[1] || racks[0], racks[3] || racks[4], racks[6] || racks[7]];
  const paths = [...svg.querySelectorAll('path')];
  cards.forEach((card, i) => {
    if (!paths[i] || !targets[i]) return;
    const cr = card.getBoundingClientRect();
    const tr = targets[i].getBoundingClientRect();
    const x0 = cr.left + cr.width / 2 - sr.left;
    const y0 = cr.bottom - sr.top;
    const x1 = tr.left + tr.width / 2 - sr.left;
    const y1 = tr.top - sr.top + 1;
    const cy = y0 + Math.max(16, (y1 - y0) * 0.5);
    paths[i].setAttribute(
      'd',
      'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) +
        ' C ' + x0.toFixed(1) + ' ' + cy.toFixed(1) +
        ', ' + x1.toFixed(1) + ' ' + cy.toFixed(1) +
        ', ' + x1.toFixed(1) + ' ' + y1.toFixed(1),
    );
  });
}

function prng(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function walkTo(x0: number, y0: number, x1: number, y1: number, steps: number, seed: number, amp: number, yMin?: number, yMax?: number) {
  const rnd = prng(seed);
  const pts: number[][] = [];
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    const tt = i / steps;
    const x = x0 + (x1 - x0) * tt;
    const target = y0 + (y1 - y0) * tt;
    y = y + (target - y) * 0.32 + (rnd() - 0.47) * amp;
    if (yMin != null && yMax != null) y = Math.min(yMax, Math.max(yMin, y));
    pts.push([x, y]);
  }
  pts[0] = [x0, y0];
  pts[pts.length - 1] = [x1, y1];
  return 'M' + pts.map((pt) => pt[0].toFixed(1) + ' ' + pt[1].toFixed(1)).join(' L');
}

function hideStroke(sel: string) {
  document.querySelectorAll<SVGGeometryElement>(sel).forEach((el) => {
    const len = el.getTotalLength();
    el.style.strokeDasharray = String(len);
    el.style.strokeDashoffset = String(len);
  });
}

const matrix = document.querySelector('#ch2 .matrix');
const tilesG = document.querySelector('#ch2 .tiles');
const hits = new Set([
  '0,0', '1,1', '2,2', '3,3', '4,4', '5,5', '6,6', '7,5', '8,3', '9,7',
  '10,2', '11,6', '12,1', '13,4', '14,0', '15,7', '16,3', '17,5',
  '2,6', '4,1', '7,0', '9,2', '11,3', '13,7',
]);
if (matrix) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 18; c++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(20 + c * 22));
      rect.setAttribute('y', String(22 + r * 26));
      rect.setAttribute('width', '18');
      rect.setAttribute('height', '22');
      rect.setAttribute('class', hits.has(c + ',' + r) ? 'matrix-hit' : 'matrix-cell');
      matrix.appendChild(rect);
    }
  }
}
const tileEls: { el: SVGRectElement; r: number; c: number }[] = [];
if (tilesG) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 14; c++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(430 + c * 28));
      rect.setAttribute('y', String(36 + r * 32));
      rect.setAttribute('width', '24');
      rect.setAttribute('height', '26');
      rect.setAttribute('rx', '3');
      rect.setAttribute('class', 'tile');
      tilesG.appendChild(rect);
      tileEls.push({ el: rect, r, c });
    }
  }
}

function fillGrid(root: Element | null, x0: number, color: string) {
  if (!root) return;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const v = (i * 4 + j) % 5 === 0 ? 0.7 : 0.15 + ((i + j) % 3) * 0.12;
      r.setAttribute('x', String(x0 + j * 14));
      r.setAttribute('y', String(20 + i * 12));
      r.setAttribute('width', '12');
      r.setAttribute('height', '10');
      r.setAttribute('rx', '1');
      r.setAttribute('fill', color);
      r.setAttribute('opacity', String(v));
      root.appendChild(r);
    }
  }
}
fillGrid(document.querySelector('.sv-cpu'), 8, '#E8B04B');
fillGrid(document.querySelector('.sv-gpu'), 118, '#4FD1E8');

const FIN_X0 = 126;
const FIN_X1 = 292;
const FIN_Y_LEAD = 158;
const FIN_Y_MIN = FIN_Y_LEAD + 18; // 176, top of finance lane
const FIN_Y_MAX = 238; // bottom of finance lane
const finD = walkTo(FIN_X0, 230, FIN_X1, 188, 40, 11, 13, FIN_Y_MIN, FIN_Y_MAX);
document.querySelectorAll('.t-finance, .t-finance-glow').forEach((el) => {
  el.setAttribute('d', finD);
});

if (!reduceMotion) {
  hideStroke('.ch1-wire, .ch3-gold, .ch3-cyan, .ch3-sand, .t-gold, .t-cyan, .t-sand, .t-finance, .t-finance-glow');
}

const shrinkOrigin = { scale: 0, transformOrigin: '0px 0px' } as const;
const fullOrigin = { scale: 1, transformOrigin: '0px 0px' } as const;

function revealStatic() {
  document
    .querySelectorAll<HTMLElement>(
      '.ch1-wire, .ch3-gold, .ch3-cyan, .ch3-sand, .t-gold, .t-cyan, .t-sand, .t-finance, .t-finance-glow',
    )
    .forEach((el) => {
      el.style.strokeDasharray = 'none';
      el.style.strokeDashoffset = '0';
    });
  gsap.set('.intro-gold, .intro-gold-glow', { attr: { x2: 760 } });
  gsap.set('.intro-cyan, .intro-cyan-glow', { attr: { x2: 700 } });
  gsap.set(
    '.ch1-gate, .ch1-cnot, .ch1-aura, .ch1-state, .ch1-lead-label, .ch1-lead-ket, .ch1-caption-late, .ch3-cnot, .ch3-aura, .ch3-bell, .ch3-caption, .ch2-continue, .ch4-wires, .card, .cluster, .cluster-cables, .t-aura, .t-bell, .ch5-ugate, .t-finance, .t-finance-glow, .measure-me, #ch1 .bloch, #ch2 .bloch, #ch3 .bloch',
    { opacity: 1, y: 0, x: 0, scale: 1 },
  );
  gsap.set('.ch1-caption-early', { opacity: 0 });
  gsap.set('#ch5 .ch5-blochs', { opacity: 0 });
  gsap.set('#ch1 .arrow-sci, #ch1 .arrow-lead, #ch2 .arrow-sci, #ch2 .arrow-lead, #ch3 .arrow-sci, #ch3 .arrow-sw, #ch3 .arrow-lead', shrinkOrigin);
  gsap.set('#ch1 .arrow-sw, #ch2 .arrow-sw', fullOrigin);
  gsap.set('#amp-bars .bar-row[data-ket="1000"] .fill', { width: '44.7%' });
  gsap.set('#amp-bars .bar-row[data-ket="0100"] .fill', { width: '54.8%' });
  gsap.set('#amp-bars .bar-row[data-ket="0010"] .fill', { width: '59.2%' });
  gsap.set('#amp-bars .bar-row[data-ket="0001"] .fill', { width: '38.7%' });
  tileEls.forEach(({ el }) => {
    el.style.opacity = '1';
    el.classList.add('on');
  });
  layoutCables();
}

const STAGES = ['intro', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5'] as const;

const timelines: Partial<Record<(typeof STAGES)[number], gsap.core.Timeline>> = {};
const played = new Set<string>();

function finishChapter(id: string) {
  const tl = timelines[id as (typeof STAGES)[number]];
  played.add(id);
  if (tl) tl.progress(1);
  if (id === 'ch2') {
    tileEls.forEach(({ el }) => {
      el.style.opacity = '1';
      el.classList.add('on');
    });
  }
  if (id === 'ch4') layoutCables();
}

function playChapter(id: string) {
  if (played.has(id)) {
    finishChapter(id);
    return;
  }
  const tl = timelines[id as (typeof STAGES)[number]];
  if (!tl) {
    played.add(id);
    return;
  }
  played.add(id);
  tl.play(0);
}

function attachAutoplay(id: (typeof STAGES)[number], tl: gsap.core.Timeline) {
  timelines[id] = tl;
  tl.pause(0);
  ScrollTrigger.create({
    trigger: '#' + id,
    start: 'top 60%',
    onEnter: () => playChapter(id),
    onEnterBack: () => finishChapter(id),
    onLeave: () => finishChapter(id),
  });
}

if (!reduceMotion) {
  const introTl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  introTl.to('.intro-gold, .intro-gold-glow', { attr: { x2: 760 }, ease: 'none', duration: 2.2 }, 0);
  introTl.to('.intro-cyan, .intro-cyan-glow', { attr: { x2: 700 }, ease: 'none', duration: 2.0 }, 0.3);
  attachAutoplay('intro', introTl);

  gsap.set('.ch1-gate-h, #ch1 .bloch-sci, #ch1 .bloch-sw', { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' });
  gsap.set('#ch1 .arrow-sci, #ch1 .arrow-sw, #ch1 .arrow-lead', fullOrigin);
  gsap.set('#ch1 .bloch-lead, .ch1-lead-label, .ch1-lead-ket, .ch1-cnot, .ch1-aura, .ch1-state, .ch1-caption-late', { opacity: 0 });
  gsap.set('.ch1-caption-early', { opacity: 1 });
  const ch1 = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  ch1.to('.ch1-wire-early', { strokeDashoffset: 0, ease: 'none', duration: 0.85 }, 0)
    .to('.ch1-gate-h', { opacity: 1, scale: 1, duration: 0.4 }, 0.6)
    .to('#ch1 .bloch-sci, #ch1 .bloch-sw', { opacity: 1, scale: 1, duration: 0.4 }, 1.05)
    .to('.ch1-lead-label, .ch1-lead-ket, #ch1 .bloch-lead', { opacity: 1, duration: 0.35 }, 1.7)
    .to('.ch1-wire-lead', { strokeDashoffset: 0, ease: 'none', duration: 0.6 }, 1.8)
    .to('.ch1-cnot', { opacity: 1, duration: 0.4 }, 2.45)
    .to('#ch1 .arrow-sci, #ch1 .arrow-lead', { scale: 0, duration: 0.45, ease: 'power2.inOut', transformOrigin: '0px 0px' }, 2.55)
    .to('.ch1-aura, .ch1-state', { opacity: 1, duration: 0.4 }, 2.85)
    .to('.ch1-caption-early', { opacity: 0, duration: 0.3, ease: 'power1.out' }, 2.45)
    .to('.ch1-caption-late', { opacity: 1, duration: 0.35, ease: 'power1.out' }, 2.7);
  attachAutoplay('ch1', ch1);

  gsap.set('#ch2 .arrow-sci, #ch2 .arrow-lead', shrinkOrigin);
  gsap.set('#ch2 .arrow-sw', fullOrigin);
  gsap.set(tileEls.map((t) => t.el), { opacity: 0.25 });
  const ch2 = gsap.timeline({ paused: true });
  tileEls.forEach(({ el, r, c }) => {
    const t0 = (r + c) * 0.14;
    ch2.to(el, {
      opacity: 1,
      ease: 'power1.out',
      duration: 0.28,
      onUpdate: function () { if (this.progress() > 0.5) el.classList.add('on'); },
    }, t0);
  });
  attachAutoplay('ch2', ch2);

  gsap.set('.ch3-cnot, .ch3-aura, .ch3-bell, .ch3-caption', { opacity: 0 });
  gsap.set('#ch3 .bloch', { opacity: 1 });
  gsap.set('#ch3 .arrow-sci, #ch3 .arrow-lead', shrinkOrigin);
  gsap.set('#ch3 .arrow-sw', fullOrigin);
  const ch3 = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  ch3.to('.ch3-gold, .ch3-cyan, .ch3-sand', { strokeDashoffset: 0, ease: 'none', duration: 0.9 }, 0)
    .to('.ch3-cnot', { opacity: 1, duration: 0.4 }, 1.0)
    .to('#ch3 .arrow-sw', { scale: 0, duration: 0.5, ease: 'power2.inOut', transformOrigin: '0px 0px' }, 1.15)
    .to('.ch3-aura', { opacity: 1, duration: 0.5 }, 1.8)
    .to('.ch3-bell, .ch3-caption', { opacity: 1, duration: 0.45 }, 2.2);
  attachAutoplay('ch3', ch3);

  gsap.set('.card', { opacity: 0, y: 28, scale: 0.96 });
  gsap.set('.cluster', { opacity: 0, y: 12 });
  gsap.set('.cluster-cables, .ch4-wires', { opacity: 0 });
  const ch4 = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' }, onUpdate: layoutCables, onComplete: layoutCables });
  ch4.to('.ch4-wires', { opacity: 1, duration: 0.55, ease: 'none' }, 0)
    .to('.card', { opacity: 1, y: 0, scale: 1, stagger: 0.22, duration: 0.65 }, 0.4)
    .to('.cluster, .cluster-cables', { opacity: 1, y: 0, duration: 0.75, onUpdate: layoutCables }, 1.6);
  attachAutoplay('ch4', ch4);

  gsap.set('.t-aura, .t-bell, .ch5-ugate', { opacity: 0 });
  gsap.set('#amp-bars .fill', { width: '0%' });
  gsap.set('.measure-me', { opacity: 0, y: 8 });
  gsap.set('#ch5 .ch5-blochs', { opacity: 0 });
  const ch5 = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  ch5.to('.t-gold, .t-cyan, .t-sand', { strokeDashoffset: 0, ease: 'none', duration: 0.85 }, 0)
    .to('.t-finance, .t-finance-glow', { strokeDashoffset: 0, ease: 'none', duration: 1.2 }, 0.35)
    .to('.t-aura, .t-bell, .ch5-ugate', { opacity: 1, duration: 0.5 }, 1.0)
    .to('#amp-bars .bar-row[data-ket="1000"] .fill', { width: '44.7%', duration: 0.5 }, 1.55)
    .to('#amp-bars .bar-row[data-ket="0100"] .fill', { width: '54.8%', duration: 0.5 }, 1.75)
    .to('#amp-bars .bar-row[data-ket="0010"] .fill', { width: '59.2%', duration: 0.5 }, 1.95)
    .to('#amp-bars .bar-row[data-ket="0001"] .fill', { width: '38.7%', duration: 0.5 }, 2.15)
    .to('.measure-me', { opacity: 1, y: 0, duration: 0.5 }, 2.55);
  attachAutoplay('ch5', ch5);
} else {
  revealStatic();
  STAGES.forEach((id) => played.add(id));
}


function currentStageId(scrollY: number) {
  const marks = window.__marks;
  if (!marks) return STAGES[0];
  let current: (typeof STAGES)[number] = STAGES[0];
  for (const id of STAGES) {
    const m = marks[id];
    if (m && scrollY >= m.start - 1) current = id;
  }
  return current;
}

function setStoryBarCurrent(id: string) {
  document.querySelectorAll<HTMLElement>('.story-bar [data-stage]').forEach((btn) => {
    if (btn.dataset.stage === id) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });
}

function jumpToStage(id: string) {
  const idx = STAGES.indexOf(id as (typeof STAGES)[number]);
  if (idx > 0) {
    for (let i = 0; i < idx; i++) finishChapter(STAGES[i]);
  }
  const marks = window.__marks;
  const marked = marks?.[id]?.start;
  const el = document.getElementById(id);
  const top = typeof marked === 'number' ? marked : el ? el.getBoundingClientRect().top + window.scrollY : 0;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function setupStoryBar() {
  const bar = document.querySelector('.story-bar');
  if (!bar) return;
  bar.querySelectorAll<HTMLElement>('[data-stage]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.stage;
      if (id) jumpToStage(id);
    });
  });
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: () => setStoryBarCurrent(currentStageId(window.scrollY)),
  });
  setStoryBarCurrent(currentStageId(window.scrollY));
}

const headerEl = document.querySelector('.site-header');
ScrollTrigger.create({
  trigger: '#intro',
  start: 'top top',
  end: 'bottom top',
  onLeave: () => headerEl && headerEl.classList.add('is-past-hero'),
  onEnter: () => headerEl && headerEl.classList.remove('is-past-hero'),
  onEnterBack: () => headerEl && headerEl.classList.remove('is-past-hero'),
  onLeaveBack: () => headerEl && headerEl.classList.add('is-past-hero'),
});

const fill = document.getElementById('progress-fill');
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (self) => {
    if (fill) fill.style.width = (self.progress * 100).toFixed(2) + '%';
  },
});

const OUTCOMES = [
  { ket: '|1000\u27e9', bits: [1, 0, 0, 0] as const, p: 0.2 },
  { ket: '|0100\u27e9', bits: [0, 1, 0, 0] as const, p: 0.3 },
  { ket: '|0010\u27e9', bits: [0, 0, 1, 0] as const, p: 0.35 },
  { ket: '|0001\u27e9', bits: [0, 0, 0, 1] as const, p: 0.15 },
];

function sampleOutcome() {
  const r = Math.random();
  let acc = 0;
  for (const outcome of OUTCOMES) {
    acc += outcome.p;
    if (r < acc) return outcome;
  }
  return OUTCOMES[OUTCOMES.length - 1];
}

function setProductArrow(sel: string, bit: number) {
  gsap.set(sel, { scale: 1, rotation: bit ? 180 : 0, transformOrigin: '0px 0px' });
}

function collapseTo(outcome: (typeof OUTCOMES)[number]) {
  (['1000', '0100', '0010', '0001'] as const).forEach((k) => {
    const on = outcome.ket.includes(k);
    const row = document.querySelector(`#amp-bars .bar-row[data-ket="${k}"]`);
    if (!row) return;
    const fillEl = row.querySelector('.fill');
    const val = row.querySelector('.val');
    gsap.to(fillEl, { width: on ? '100%' : '0%', duration: 0.45 });
    if (val) val.textContent = on ? '1.000' : '0.000';
  });
  const norm = document.querySelector('.norm');
  if (norm) norm.textContent = outcome.ket + '  (product state)';
  const note = document.getElementById('collapsed-note');
  if (note) note.textContent = 'Collapsed to ' + outcome.ket + '.';
  const btn = document.getElementById('measure-btn');
  if (btn) btn.textContent = 'Click again to re-prepare';

  gsap.to('#ch5 .ch5-blochs', { opacity: 1, duration: 0.35 });
  gsap.to('.t-aura', { opacity: 0.12, duration: 0.4 });
  gsap.to('.t-bell', { opacity: 0.35, duration: 0.4 });
  setProductArrow('#ch5 .arrow-sci', outcome.bits[0]);
  setProductArrow('#ch5 .arrow-sw', outcome.bits[1]);
  setProductArrow('#ch5 .arrow-lead', outcome.bits[2]);
  setProductArrow('#ch5 .arrow-fin', outcome.bits[3]);
}

function reprepareAndSample() {
  gsap.set('#amp-bars .bar-row[data-ket="1000"] .fill', { width: '44.7%' });
  gsap.set('#amp-bars .bar-row[data-ket="0100"] .fill', { width: '54.8%' });
  gsap.set('#amp-bars .bar-row[data-ket="0010"] .fill', { width: '59.2%' });
  gsap.set('#amp-bars .bar-row[data-ket="0001"] .fill', { width: '38.7%' });
  collapseTo(sampleOutcome());
}

const measureBtn = document.getElementById('measure-btn');
let hasMeasured = false;
measureBtn?.addEventListener('click', () => {
  if (!hasMeasured) {
    hasMeasured = true;
    collapseTo(sampleOutcome());
  } else {
    reprepareAndSample();
  }
});


function applyCompactCircuits() {
  const narrow = window.matchMedia('(max-width: 720px)').matches;
  document.querySelectorAll<SVGSVGElement>('body.story .stage svg').forEach((svg) => {
    if (svg.closest('.card') || svg.closest('.viz')) return;
    if (!svg.dataset.vb) svg.dataset.vb = svg.getAttribute('viewBox') || '';
    svg.querySelectorAll('text').forEach((node) => {
      const el = node as SVGTextElement;
      if (!el.dataset.fs) el.dataset.fs = el.getAttribute('font-size') || '15';
      const base = parseFloat(el.dataset.fs);
      el.setAttribute('font-size', String(narrow ? Math.round(base * 1.4) : base));
    });
    const skip = svg.classList.contains('ch2-continue')
      || svg.classList.contains('ch4-wires')
      || svg.classList.contains('cluster-cables')
      || svg.classList.contains('cluster')
      || svg.id === 'today-svg';
    if (skip || !narrow) {
      svg.setAttribute('viewBox', svg.dataset.vb);
      return;
    }
    const parts = svg.dataset.vb.trim().split(/[\s,]+/).map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return;
    const [x, y, w, h] = parts;
    if (w <= 640) {
      svg.setAttribute('viewBox', svg.dataset.vb);
      return;
    }
    svg.setAttribute('viewBox', `${x} ${y} 640 ${h}`);
  });
}

window.addEventListener('resize', () => {
  layoutCables();
  applyCompactCircuits();
});
layoutCables();
applyCompactCircuits();

function collectMarks() {
  const marks: NonNullable<Window['__marks']> = {};
  document.querySelectorAll('.intro, .chapter').forEach((el) => {
    if (!el.id) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const height = (el as HTMLElement).offsetHeight;
    marks[el.id] = { start: top, end: top + height, mid: top + height * 0.35 };
  });
  window.__marks = marks;
  window.__ready = true;
  layoutCables();
  applyCompactCircuits();
}

ScrollTrigger.addEventListener('refresh', collectMarks);
ScrollTrigger.refresh();
collectMarks();
setupStoryBar();
