// Semua teks ada di sini. Ubah nama/teks tanpa menyentuh logika animasi.
// Placeholder: {from} {to} {nick}; huruf besar ({TO}) = kapital semua.
export const CONFIG = {
  from: "Bakri",
  to: "Nisa",
  nick: "Nona",
  tagline: "A little program, a sincere apology.",
  themes: ["term", "term", "soft", "soft", "soft"],
  ui: {
    b1: "[ FORCE CONTINUE ]",
    b2: "[ VIEW ERROR DETAILS ]",
    b4: "[ ONE LAST COMMAND ]",
    open: "[ OPEN MESSAGE ]",
    notyet: "[ NOT YET ]",
    ready: "[ I'M READY ]",
    back: "[ BACK TO TERMINAL ]",
    close: "[ CLOSE THE SESSION ]",
    replay: "[ REPLAY EXPERIENCE ]",
    skipL: "[ SHOW ALL ]",
  },
  s1: {
    lines: [
      { t: "{FROM}@NYAPPT:~$ ./start_apology.sh", c: "cmd", type: 1, w: 0.5 },
      { t: "[ OK ] Initializing system...", c: "ok" },
      { t: "[ OK ] Establishing connection...", c: "ok" },
      { t: "[ OK ] Recipient identified: {TO}", c: "ok" },
      { t: "[WARN] Confidence level: 07%", c: "warn", s: "error" },
      { t: "[WARN] Preparing an important message...", c: "warn" },
    ],
    wait: "System is waiting...",
  },
  s2: {
    lines: [
      { t: "SCANNING BEHAVIOR...", c: "cmd", type: 1, w: 0.6 },
      { t: "[WARN] Error 001: Kurang peka.", c: "err", s: "error", w: 0.7 },
      {
        t: "[WARN] Error 002: Kurang Mendengarkan.",
        c: "err",
        s: "error",
        w: 0.7,
      },
      {
        t: "[WARN] Error 003: Terlalu sering bikin kesel.",
        c: "err",
        s: "error",
        w: 0.7,
      },
      { t: "[INFO] Developer has been notified.", w: 0.8 },
      { t: "Attempting to blame the Wi-Fi...", type: 1 },
      { t: "FAILED.", c: "err", s: "error" },
      { t: "Attempting to blame low battery...", type: 1 },
      { t: "FAILED.", c: "err", s: "error" },
      {
        t: "Conclusion: the problem cannot be fixed by restarting the router.",
        w: 0.9,
      },
      {
        t: "FATAL ERROR: Something important may have been left unsaid.",
        c: "err",
        s: "error",
        do: "glitch",
        w: 0.8,
      },
    ],
    end: "Maybe it's time to stop debugging the system and start debugging the person behind it.",
  },
  s3: {
    b1: "[ CONTINUE ]",
    b2: "[ GO BEYOND THE CODE ]",
    pages: [
      [
        "Haloo nisaaaaaa.",
        "Gimana uts nyaaa? semoga lancar dan dapat nilai bagus yaaaaaaa.",
        "Nisaaa, maaf yaaa, saya bikin nisa kesel terusss, kayak ada aja wee yang bikin nisa kesel dan marahhh, maaf ya cantikkk",
      ],
      [
        "Seperti yang saya bilangg, saya cinta dan sayang sama nisaaa .",
        "Aku ingin belajar memahami, mendengarkan, dan memperbaiki hal-hal yang memang perlu aku perbaiki.",
        {
          t: "Because a sincere apology should be more than a pretty interface.",
          c: "en",
        },
      ],
    ],
  },
  s4: {
    words: [
      "listening",
      "understanding",
      "attention",
      "consistency",
      "learning",
    ],
    lines: [
      "Maaf ya ini simple.",
      "Soalnya waktunya mepet kelas, ada ICT juga, tadi saya juga UTS.",
      "Aku minta maaf yaaaaaa, lagi-labi bikin nisa kesellll.",
      "Dan kalau Nisaaa masih butuh waktu, saya akan menghargai itu.",
      { t: "So, there's one last thing I'd like to tell you.", c: "en" },
    ],
  },
  s5: {
    prompt: [
      {
        t: "{FROM}@NYAPPT:~$ final_message --recipient {TO}",
        c: "cmd",
        type: 1,
        w: 0.8,
      },
      { t: "Do you want to read my last message?", c: "q" },
    ],
    noRush: "No rush. The message will be here whenever you're ready.",
    done: "SESSION COMPLETE.",
    quote:
      "Some things cannot be fixed with code. They have to be shown through actions.",
    thanks: "Thank you for being here.",
  },
  // Isi surat: satu string per paragraf.
  letter: [
    "{to},",
    "Nona Nisa sayangku cintakuuuuu.",
    "Aku mau minta maaf soal yang tadi siang yaaaaa.",
    "Aku minta maaf yaa, bikin kesel nisa tadii, marahhh, kurang dipahami, atau kecewa. aku mau ngasih tau, waktu nisa bilang yang pamflet tea, dan aku bilang yang mana.",
    "itu saya beneran lupaa, benerann, saya mikir keras pamflet yang manaa. Teruss kenapa tidak saya ubah yang pamflet kemarin itu, karena bener2 udah capek waktu nge desain tuhh, bukan saya tidak menghargai saran dari nisaaa.",
    "Jadiiii, aku mau minta maaf lagi yaaa, nisa cantikkk, sayangku cintaku duniaku.",
    "nisa nggak harus langsung membalas atau memaafkanku setelah membaca ini. Kalau nisaa masih butuh waktu, nggak apa-apa.",
    "Makasih sudah meluangkan waktu untuk membaca sampai sini.",
    "Maaf, ya, {nick}.",
    "Oh iyaa, aku diam dari siang bukan karena gak peduli ya, tapi karena bikin ini {nick}.",
    "— {from}",
  ],
};
export const fmt = (s, c = CONFIG) =>
  s.replace(/\{(\w+)\}/g, (_, k) => {
    const v = String(c[k.toLowerCase()] ?? "");
    return k === k.toUpperCase() ? v.toUpperCase() : v;
  });
