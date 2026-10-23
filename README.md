# NYAPPT — Not Your Average Apology Presentation
Vite + Vanilla JS + GSAP. Tanpa backend.

## Jalankan
    npm install
    npm run dev       # development
    npm run build     # hasil di dist/
    npm run preview

## Ganti lagu
Taruh file di `public/assets/audio/background.mp3` (nama harus sama). Tanpa file, web tetap jalan.

## Ganti teks / nama / surat
Semua di `src/scenes.js` (`from`, `to`, `nick`, narasi, log terminal, array `letter`).

## Deploy GitHub Pages
`vite.config.js` memakai `base: './'`, jadi `dist/` bisa langsung di-host.
Contoh cepat: `npm run build`, lalu push isi `dist/` ke branch `gh-pages`
(atau pakai GitHub Actions: build, lalu upload `dist` dengan actions/upload-pages-artifact + deploy-pages).

## Kontrol
Tab/Enter/Space untuk tombol. Esc atau tombol SKIP melewati animasi (tidak menghapus progres).
