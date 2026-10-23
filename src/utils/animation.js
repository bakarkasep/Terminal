import gsap from 'gsap';
const mq = matchMedia('(prefers-reduced-motion: reduce)');
export const rm = () => mq.matches;
export const D = (x) => (mq.matches ? x * 0.35 : x); // durasi dipersingkat saat reduced motion
let cur = null; // satu timeline aktif pada satu waktu
export const newTL = () => { cur?.kill(); return (cur = gsap.timeline()); };
export const killTL = () => { cur?.kill(); cur = null; };
export const skipCurrent = () => { if (cur) cur.progress(1); }; // selesaikan semua ke keadaan akhir
export function glitch(el, s = 0.45) {
  const tl = gsap.timeline();
  if (mq.matches || !el) return tl;
  return tl.add(() => el.classList.add('glitch')).add(() => el.classList.remove('glitch'), `+=${s}`);
}
