import './style.css';
import gsap from 'gsap';
import { CONFIG as C, fmt } from './scenes.js';
import * as audio from './audio.js';
import { newTL, killTL, skipCurrent, D, glitch } from './utils/animation.js';
import { revealLines, typeText } from './utils/typewriter.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const t = (s) => fmt(s, C), sc = $$('.scene'), prog = $('#prog');
let cur = 0, busy = false, p3 = 0; // busy = kunci interaksi selama transisi/animasi berjalan
const run = (tl) => { busy = true; tl.eventCallback('onComplete', () => { busy = false; }); return tl; };
const items = (a) => a.map((x) => (typeof x === 'string' ? { t: t(x) } : { ...x, t: t(x.t) }));
const hideActs = (a) => gsap.set(a, { autoAlpha: 0 });
const focus = (sel) => () => $(sel)?.focus({ preventScroll: true });
const showActs = (tl, a) => tl.to(a, { autoAlpha: 1, duration: D(0.6) }).add(() => a.querySelector('button')?.focus({ preventScroll: true }));
const setPb = (v) => { const r = Math.round(v); $('#pbf').style.transform = `scaleX(${r / 100})`; $('#pbt').textContent = r + '%'; };

// ---------- ENTER: tiap scene mengembalikan timeline (DOM disiapkan saat timeline mulai) ----------
function e1() {
  const s = sc[0], m = $('#m1'), a = $('.acts', s), pb = $('#pb'), o = { v: 0 }, tl = gsap.timeline();
  tl.add(() => { m.textContent = ''; o.v = 0; hideActs(a); gsap.set(pb, { autoAlpha: 0 }); setPb(0); });
  revealLines(tl, $('#l1'), items(C.s1.lines));
  tl.to(pb, { autoAlpha: 1, duration: D(0.3) });
  tl.to(o, { v: 99, duration: D(2.6), ease: 'power1.inOut', onUpdate: () => setPb(o.v) });
  tl.add(typeText(m, t(C.s1.wait)), '+=0.3');
  return showActs(tl, a);
}
function e2() {
  const s = sc[1], m = $('#m2'), a = $('.acts', s), tl = gsap.timeline();
  tl.add(() => { m.textContent = ''; hideActs(a); });
  revealLines(tl, $('#l2'), items(C.s2.lines));
  tl.add(typeText(m, t(C.s2.end)), '+=0.4');
  return showActs(tl, a);
}
function e3(i = 0) {
  const s = sc[2], box = $('.story', s), a = $('.acts', s), tl = gsap.timeline();
  tl.add(() => { p3 = i; $('#b3').textContent = t(i ? C.s3.b2 : C.s3.b1); gsap.set(box, { opacity: 1 }); hideActs(a); });
  revealLines(tl, box, items(C.s3.pages[i]), { dur: 1.3, gap: 1.6 });
  return showActs(tl, a);
}
function e4() {
  const s = sc[3], a = $('.acts', s), tl = gsap.timeline();
  tl.add(() => hideActs(a));
  tl.fromTo($$('.w', s), { opacity: 0, letterSpacing: '.7em' }, { opacity: 0.6, letterSpacing: '.14em', duration: D(1.6), stagger: D(1.1) }, 0);
  tl.fromTo($$('.net path', s), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: D(4), stagger: D(0.4) }, 0);
  revealLines(tl, $('.story', s), items(C.s4.lines), { dur: 1.3, gap: 1.5 });
  return showActs(tl, a);
}
function e5() {
  const pr = $('#pr'), a = $('#a5'), tl = gsap.timeline();
  tl.add(() => { ['#ny', '#letter', '#end'].forEach((x) => $(x).classList.add('gone')); pr.classList.remove('gone'); gsap.set(pr, { opacity: 1 }); hideActs(a); });
  revealLines(tl, $('.pl', pr), items(C.s5.prompt), { dur: 0.8 });
  return showActs(tl, a);
}
const ENTER = [e1, e2, e3, e4, e5];

// ---------- transisi antar scene ----------
function go(n, { style = 'fade', pre } = {}) {
  const from = sc[cur], to = sc[n], tl = run(newTL());
  if (pre) tl.add(pre);
  if (style === 'glitch') { tl.to(from, { opacity: 0.5, duration: D(0.4) }); tl.add(glitch(from.firstElementChild)); }
  tl.to(from, { opacity: 0, duration: D(0.8) });
  tl.add(() => {
    from.classList.remove('active'); gsap.set(from, { clearProps: 'all' });
    $$('.glitch').forEach((e) => e.classList.remove('glitch'));
    cur = n; document.body.dataset.theme = C.themes[n]; prog.textContent = `0${n + 1}/05`;
    to.classList.add('active'); audio.setLevel(n === 4 ? 0.15 : 0.25);
  });
  tl.fromTo(to, { opacity: 0 }, { opacity: 1, duration: D(0.9) });
  tl.add(ENTER[n]());
}
function reset() {
  killTL(); busy = false; $('#fatal').classList.add('gone');
  sc.forEach((s) => { s.classList.remove('active'); gsap.set(s, { clearProps: 'all' }); });
  cur = 0; sc[0].classList.add('active'); document.body.dataset.theme = 'term'; prog.textContent = '01/05';
  run(newTL()).add(e1());
}

// ---------- surat ----------
function buildLetter() {
  const box = $('#lbody'); box.innerHTML = '';
  C.letter.forEach((p) => {
    const el = document.createElement('p');
    p.split(/(\s+)/).forEach((w) => { if (!w.trim()) return el.append(w); const sp = document.createElement('span'); sp.className = 'lw'; sp.textContent = t(w); el.append(sp); });
    box.append(el);
  });
}
function openLetter() {
  buildLetter();
  const pr = $('#pr'), ny = $('#ny'), L = $('#letter'), w = $$('.lw', L), fin = $('#fin'), sk = $('#skipL'), tl = run(newTL());
  tl.to([pr, ny], { opacity: 0, duration: D(0.6) });
  tl.add(() => { pr.classList.add('gone'); ny.classList.add('gone'); L.classList.remove('gone'); gsap.set(L, { opacity: 1 }); gsap.set(fin, { autoAlpha: 0 }); gsap.set(sk, { autoAlpha: 1 }); gsap.set(w, { opacity: 0 }); });
  tl.fromTo($('.card', L), { opacity: 0, scale: 0.92, rotation: -1.5 }, { opacity: 1, scale: 1, rotation: 0, duration: D(1.2), ease: 'power2.out' });
  tl.to(w, { opacity: 1, duration: D(0.4), stagger: D(0.1) });
  tl.to(sk, { autoAlpha: 0, duration: D(0.3) });
  tl.to(fin, { autoAlpha: 1, duration: D(0.8) }).add(focus('#close'));
}

// ---------- init: listener didaftarkan sekali saja ----------
const on = (id, fn) => $(id).addEventListener('click', () => { if (!busy) fn(); });
$$('[data-c]').forEach((e) => { e.textContent = t(e.dataset.c.split('.').reduce((o, k) => o[k], C)); });
on('#b1', () => { const o = { v: 99 }; go(1, { pre: gsap.timeline().add(glitch($('#s1 .term'))).to(o, { v: 100, duration: D(0.5), onUpdate: () => setPb(o.v) }) }); });
on('#b2', () => go(2, { style: 'glitch' }));
on('#b3', () => {
  if (p3 === 0) { const s = sc[2], tl = run(newTL()); tl.to($('.story', s), { opacity: 0, duration: D(0.9) }).to($('.acts', s), { autoAlpha: 0, duration: D(0.4) }, 0).add(e3(1)); }
  else go(3);
});
on('#b4', () => go(4));
on('#open', openLetter); on('#ready', openLetter);
on('#notyet', () => {
  const pr = $('#pr'), ny = $('#ny'), tl = run(newTL());
  tl.to(pr, { opacity: 0, duration: D(0.5) }).add(() => { pr.classList.add('gone'); ny.classList.remove('gone'); gsap.set(ny, { opacity: 0 }); })
    .to(ny, { opacity: 1, duration: D(0.8) }).add(focus('#ready'));
});
on('#back', () => {
  const pr = $('#pr'), ny = $('#ny'), tl = run(newTL());
  tl.to(ny, { opacity: 0, duration: D(0.5) }).add(() => { ny.classList.add('gone'); pr.classList.remove('gone'); gsap.set(pr, { opacity: 0 }); })
    .to(pr, { opacity: 1, duration: D(0.8) }).add(focus('#open'));
});
on('#close', () => {
  const L = $('#letter'), E = $('#end'), a = $('#aEnd'), tl = run(newTL());
  tl.to(L, { opacity: 0, duration: D(1.2) }).add(() => { L.classList.add('gone'); E.classList.remove('gone'); hideActs(a); })
    .fromTo(E, { opacity: 0 }, { opacity: 1, duration: D(1.2) }).to(a, { autoAlpha: 1, duration: D(0.6) }).add(focus('#replay'));
});
on('#replay', () => go(0));
$('#fatalBtn').addEventListener('click', reset);
addEventListener('error', () => $('#fatal').classList.remove('gone'));
$('#skip').addEventListener('click', () => skipCurrent());
addEventListener('keydown', (e) => { if (e.key === 'Escape') skipCurrent(); }); // aman: hanya melewati animasi
['pointerdown', 'keydown'].forEach((ev) => addEventListener(ev, audio.unlock, { once: true }));
document.addEventListener('click', (e) => { if (e.target.closest('.btn')) audio.sfx.click(); });
const mb = $('#mute'), paint = () => { mb.textContent = audio.isMuted() ? 'SOUND: OFF' : 'SOUND: ON'; mb.setAttribute('aria-pressed', String(audio.isMuted())); };
mb.addEventListener('click', () => { audio.setMuted(!audio.isMuted()); paint(); }); paint();
const fx = $('#fx'), N = (navigator.hardwareConcurrency || 4) < 4 ? 10 : 24;
for (let i = 0; i < N; i++) { const d = document.createElement('i'); d.style.cssText = `left:${Math.random() * 100}%;--s:${1 + Math.random() * 2}px;animation-duration:${14 + Math.random() * 16}s;animation-delay:-${Math.random() * 20}s`; fx.append(d); }
reset();
