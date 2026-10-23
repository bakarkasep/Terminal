import gsap from 'gsap';
import { D, glitch } from './animation.js';
import { sfx } from '../audio.js';
// Typing sebagai tween GSAP: bisa di-skip (progress(1)) tanpa setTimeout/setInterval.
export function typeText(el, text, { cps = 38, onTick } = {}) {
  const o = { n: 0 };
  return gsap.to(o, {
    n: text.length, duration: D(text.length / cps), ease: 'none',
    onStart() { el._k = -1; },
    onUpdate() { const k = Math.round(o.n); if (el._k !== k) { el._k = k; el.textContent = text.slice(0, k); if (onTick && k % 3 === 0) onTick(); } },
    onComplete() { el.textContent = text; }
  });
}
// Menambahkan baris ke timeline. Elemen baru dipasang saat timeline mulai (bukan saat dibangun).
export function revealLines(tl, parent, list, o = {}) {
  const els = [];
  list.forEach((it) => {
    const p = document.createElement('p'); p.className = `ln ${it.c || ''}`; els.push(p);
    if (it.s) tl.add(() => sfx[it.s]());
    if (it.do === 'glitch') tl.add(glitch(parent.closest('.term') || parent));
    if (it.type) tl.add(typeText(p, it.t, { onTick: () => sfx.key() }));
    else { p.textContent = it.t; tl.fromTo(p, { opacity: 0, y: o.dur ? 14 : 6 }, { opacity: 1, y: 0, duration: D(o.dur ?? 0.3), ease: 'power2.out' }); }
    tl.to({}, { duration: D(it.w ?? o.gap ?? 0.35) });
  });
  tl.add(() => parent.replaceChildren(...els), 0);
}
