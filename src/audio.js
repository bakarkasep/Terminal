import gsap from 'gsap';
// Satu elemen musik untuk seluruh sesi + SFX sintetis (tanpa file). Aman jika mp3 tidak ada.
let bg = null, ctx = null, started = false, level = 0.25, muted = false;
try { muted = sessionStorage.getItem('nyappt-muted') === '1'; } catch {}
export const isMuted = () => muted;
export function unlock() {
  if (started) return; started = true;
  try { bg = new Audio(import.meta.env.BASE_URL + 'assets/audio/background.mp3'); bg.loop = true; bg.volume = level; bg.muted = muted; bg.play().catch(() => {}); } catch {}
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); ctx.resume?.(); } catch {}
}
export function setMuted(m) {
  muted = m; try { sessionStorage.setItem('nyappt-muted', m ? '1' : '0'); } catch {}
  if (bg) { bg.muted = m; if (!m) bg.play().catch(() => {}); } else if (!m) unlock();
}
export function setLevel(v) { level = v; if (bg) gsap.to(bg, { volume: v, duration: 2 }); }
function tone(f, d, type = 'square', v = 0.03) {
  if (muted || !ctx) return;
  try {
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d);
  } catch {}
}
export const sfx = {
  key: () => tone(900 + Math.random() * 300, 0.03, 'square', 0.01),
  ok: () => tone(660, 0.08, 'sine', 0.04),
  error: () => tone(170, 0.16, 'sawtooth', 0.025),
  click: () => tone(520, 0.05, 'triangle', 0.04)
};
