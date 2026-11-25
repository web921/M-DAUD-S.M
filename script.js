/* =====================================================================
   JasaDaud.online — script.js  (konten, portfolio, PWA)
   Tema: Living Sky & Deep Ocean. Engine langit & laut ada di sky.js.
   SEMUA DATA YANG BIASA DIEDIT ADA DI BLOK "CONFIG" DI BAWAH INI.
   ===================================================================== */

/* ============ KONFIGURASI — EDIT DI SINI ============ */
const CONFIG = {
  brand: "JasaDaud.online",
  name: "Daud",
  whatsapp: "6285697321423", // satu-satunya tempat nomor WhatsApp
  defaultMsg: "Halo Daud, saya tertarik dengan jasa pembuatan website/sistem. Saya ingin konsultasi mengenai kebutuhan project saya.",
  why: [
    ["bolt", "Cepat & Ringan", "Dibuat ringan agar cepat dibuka, bahkan di koneksi biasa dan perangkat lama."],
    ["phone", "Responsive HP & PC", "Tampilan rapi dan nyaman di HP, tablet, maupun desktop."],
    ["download", "Bisa Di-install (PWA)", "Pasang di layar utama HP seperti aplikasi, tanpa lewat toko aplikasi."],
    ["chat", "Konsultasi Gratis", "Ceritakan ide Anda lewat WhatsApp, lalu saya bantu rumuskan solusinya."]
  ],
  photo: "", // isi mis. "img/profile.jpg" untuk menampilkan foto sendiri di bagian Tentang (kosong = kartu brand)
  experience: "", // contoh: "Pengalaman 3 tahun membangun website & sistem untuk UMKM." (kosong = disembunyikan)
  // Kosongkan string jika belum ada; kartu kontak yang kosong otomatis tidak ditampilkan
  contacts: { email: "", instagram: "", facebook: "", github: "", website: "" },
  services: [
    { icon: "globe", title: "Website Bisnis", desc: "Website profesional untuk perusahaan, usaha, brand, toko, jasa, dan personal branding.", perks: ["Desain modern", "Responsive HP & desktop"] },
    { icon: "cart", title: "Website Katalog", desc: "Menampilkan produk, layanan, menu, portfolio, dan informasi bisnis.", perks: ["Mudah diperbarui", "Tombol pesan WhatsApp"] },
    { icon: "gear", title: "Sistem Informasi", desc: "Sistem berbasis web: administrasi, keuangan, monitoring, laporan, inventory, data pelanggan, dan operasional.", perks: ["Pekerjaan lebih terorganisir", "Sesuai alur kerja Anda"] },
    { icon: "chart", title: "Dashboard & Monitoring", desc: "Dashboard visual untuk memantau data, aktivitas, dan laporan secara terstruktur.", perks: ["Grafik jelas", "Data mudah dibaca"] },
    { icon: "gem", title: "Website Custom", desc: "Website dibuat berdasarkan kebutuhan dan permintaan khusus Anda.", perks: ["Fitur sesuai kebutuhan", "Fleksibel"] },
    { icon: "wrench", title: "Maintenance & Pengembangan", desc: "Perbaikan, update, penambahan fitur, dan optimasi website yang sudah ada.", perks: ["Website tetap terawat", "Fitur bisa ditambah"] }
  ],
  // Project nyata (screenshot di assets/projects/<slug>.webp). filter = kategori tombol filter.
  // Tambah project: salin satu blok, taruh screenshot 800x500 di assets/projects/.
  projects: [
    {"slug": "nabilove", "title": "Nabillove", "filter": "Booking", "cat": "Booking Platform", "img": "img/projects/nabilove.webp", "desc": "Platform booking talent digital dengan sistem chat, jadwal layanan, dan dashboard admin & talent terpisah.", "feat": ["Booking System", "Multi-Dashboard", "Live Chat"], "url": "https://nabilove.com/", "accent": "#E11D6B"},
    {"slug": "belajarbermain", "title": "Buku Belajar Anak", "filter": "Game", "cat": "Game Edukasi", "img": "img/projects/belajarbermain.webp", "desc": "Website game edukasi gratis untuk anak usia 3–8 tahun: 14 game mewarnai, berhitung, huruf, maze, puzzle & memori bersama maskot Dino. Bebas iklan dan bisa dimainkan offline.", "feat": ["14 Game Edukasi", "Bebas Iklan", "Bisa Offline"], "url": "https://belajarbermain.online/", "accent": "#84CC16"},
    {"slug": "bengkel", "title": "MOTOCARE MOTOR", "filter": "Booking", "cat": "Bengkel & Booking", "img": "img/projects/bengkel.webp", "desc": "Website bengkel motor dengan booking servis, antrean servis live, promo, katalog spare part, dan cek status booking.", "feat": ["Booking Servis", "Antrean Live", "Spare Part"], "url": "https://benyoriki.github.io/Bengkel/", "accent": "#F59E0B"},
    {"slug": "gym", "title": "Nama GYM", "filter": "Layanan", "cat": "Fitness & Membership", "img": "img/projects/gym.webp", "desc": "Website gym dengan paket membership dewasa & pelajar, personal training, promo, galeri, dan pembayaran QRIS dengan unggah bukti.", "feat": ["Membership", "Bayar QRIS", "Personal Training"], "url": "https://benyoriki.github.io/Gym/", "accent": "#F97316"},
    {"slug": "martabak", "title": "Martabak Mas Bejo", "filter": "E-Commerce", "cat": "Pesan Online", "img": "img/projects/martabak.webp", "desc": "Website pesan martabak manis & asin dengan menu favorit, keranjang, bayar QRIS atau di tempat, plus dashboard admin.", "feat": ["Pesan Online", "QRIS", "Admin Dashboard"], "url": "https://benyoriki.github.io/Martabak/", "accent": "#E11D2E"},
    {"slug": "barbershop", "title": "Barbershop Tanteh Susi", "filter": "Booking", "cat": "Booking & Antrean", "img": "img/projects/barbershop.webp", "desc": "Booking online dengan DP, antrean real-time, chatbot, galeri, plus dashboard admin lengkap dengan laporan keuangan.", "feat": ["Booking + DP", "Antrean Live", "Admin Dashboard"], "url": "https://benyoriki.github.io/Barbershop/", "accent": "#D4A24C"},
    {"slug": "tokobangunan", "title": "TOKO BANGUNAN", "filter": "E-Commerce", "cat": "Toko Bangunan", "img": "img/projects/tokobangunan.webp", "desc": "Toko bahan bangunan online dengan katalog, promo, stok terpantau, estimasi ongkir per zona, dan pesan via WhatsApp.", "feat": ["Katalog Produk", "Stok Live", "Estimasi Ongkir"], "url": "https://benyoriki.github.io/TokoBangunan/", "accent": "#0EA5E9"},
    {"slug": "spklu", "title": "EV Queue — Antrean SPKLU", "filter": "Aplikasi", "cat": "Aplikasi Web", "img": "img/projects/spklu.webp", "desc": "Sistem antrean SPKLU untuk mobil & motor listrik: ambil nomor dari HP, pantau giliran real-time, scan QR, dan notifikasi.", "feat": ["Antrean Real-time", "Scan QR", "Notifikasi"], "url": "https://benyoriki.github.io/SPKLU/#home", "accent": "#14B8A6"},
    {"slug": "toko-online", "title": "Toko Online Modern", "filter": "E-Commerce", "cat": "E-Commerce", "img": "img/projects/toko-online.webp", "desc": "E-commerce lengkap dengan katalog dinamis, cart system, dan stok real-time.", "feat": ["E-Commerce", "Cart", "Stok Live"], "url": "https://benyoriki.github.io/Toko-Online/", "accent": "#10B981"},
    {"slug": "kopdar", "title": "KOPDAR — Koperasi Darat", "filter": "E-Commerce", "cat": "E-Commerce & Kasir", "img": "img/projects/kopdar.webp", "desc": "Toko online minimarket dengan promo, filter produk, checkout ambil/antar, plus panel kasir, gudang, dan superadmin.", "feat": ["Toko Online", "Kasir & Gudang", "3 Level Admin"], "url": "https://benyoriki.github.io/Kopdar/", "accent": "#0F9D7F"},
    {"slug": "kontrakan", "title": "Cartok — Cari Kontrakan", "filter": "Layanan", "cat": "Marketplace", "img": "img/projects/kontrakan.webp", "desc": "Marketplace kontrakan & kos: pencarian filter, favorit, ketersediaan unit, verifikasi pemilik, dan dark mode.", "feat": ["Marketplace", "Verifikasi Pemilik", "Dark Mode"], "url": "https://benyoriki.github.io/Kontrakan/", "accent": "#F97316"},
    {"slug": "mbe", "title": "MBG Watch — Command Center", "filter": "Aplikasi", "cat": "Dashboard Monitoring", "img": "img/projects/mbe.webp", "desc": "Prototype command center: peta sebaran, early warning, risk score, monitoring CCTV, laporan, dan analitik real-time.", "feat": ["Dashboard", "Peta & Alert", "Analitik"], "url": "https://benyoriki.github.io/MBE/", "accent": "#3B82F6"},
    {"slug": "boxing", "title": "Duel Boxing Arena", "filter": "Aplikasi", "cat": "Sport App", "img": "img/projects/boxing.webp", "desc": "Aplikasi cari lawan & jadwalkan duel olahraga 1v1 dengan map arena, sistem rating, dan ranking pemain.", "feat": ["Map Arena", "Matchmaking", "Ranking"], "url": "https://benyoriki.github.io/boxing/", "accent": "#EF4444"},
    {"slug": "jasadaud", "title": "JasaDaud Online", "filter": "E-Commerce", "cat": "Jasa Digital", "img": "img/projects/jasadaud.webp", "desc": "Platform jasa digital dengan manajemen order real-time & dashboard admin.", "feat": ["Real-Time DB", "Firebase", "Dashboard"], "url": "https://jasadaud.online/", "accent": "#3B82F6"},
    {"slug": "travel", "title": "Gilang Trans", "filter": "Travel", "cat": "Travel & Transport", "img": "img/projects/travel.webp", "desc": "Website travel antar kota dengan pencarian rute, filter harga & fasilitas, dan booking cepat via WhatsApp.", "feat": ["Filter Rute", "Booking WA", "Admin Panel"], "url": "https://benyoriki.github.io/Travel/", "accent": "#F59E0B"},
    {"slug": "laundry", "title": "FreshWave Laundry", "filter": "Layanan", "cat": "Layanan Digital", "img": "img/projects/laundry.webp", "desc": "Laundry online dengan kalkulator harga otomatis, tracking pesanan real-time, dan cek jangkauan antar-jemput.", "feat": ["Kalkulator Harga", "Order Tracking", "GPS Check"], "url": "https://benyoriki.github.io/Laundry/", "accent": "#06B6D4"},
    {"slug": "pemancingan-gerry", "title": "Pemancingan Gerry", "filter": "Booking", "cat": "Booking & Wisata", "img": "img/projects/pemancingan-gerry.webp", "desc": "Website tempat pemancingan dengan booking kolam, galeri foto, harga paket, dan sistem event & lomba.", "feat": ["Booking Kolam", "Galeri Foto", "Event System"], "url": "https://benyoriki.github.io/Pemancingan-Gerry/", "accent": "#22C55E"},
    {"slug": "ebook", "title": "BukuNusa Digital", "filter": "E-Commerce", "cat": "E-Commerce & Konten", "img": "img/projects/ebook.webp", "desc": "Platform buku digital: katalog & kategori, baca bab pertama gratis, buka bab premium, serta halaman penulis.", "feat": ["Katalog Buku", "Bab Premium", "Profil Penulis"], "url": "https://benyoriki.github.io/ebook/#/", "accent": "#8B5CF6"},
    {"slug": "restoran", "title": "Ayam Kampung & Sambal Merintih", "filter": "Booking", "cat": "Restoran & Pesan Online", "img": "img/projects/restoran.webp", "desc": "Rumah makan dengan QR di setiap meja: pilih menu, bayar QRIS, makanan diantar ke meja. Lengkap dasbor kasir & owner.", "feat": ["QR Meja", "Bayar QRIS", "Dasbor Kasir"], "url": "https://benyoriki.github.io/Restoran/", "accent": "#DC2626"}
  ],
  hero: ["mbe", "nabilove", "belajarbermain"], // slug project untuk visual hero
  skills: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Firebase", "GitHub", "UI/UX Design", "Web Application", "Database", "API Integration"],
  points: ["Desain modern & responsive di HP maupun desktop", "Dibuat sesuai alur kerja bisnis Anda", "Konsultasi awal gratis via WhatsApp"],
  steps: [
    ["Konsultasi", "Diskusikan kebutuhan, ide, dan tujuan website atau sistem."],
    ["Perencanaan", "Menentukan konsep, fitur, desain, dan alur sistem."],
    ["Pengembangan", "Website atau sistem mulai dibuat sesuai kebutuhan."],
    ["Testing", "Pengujian tampilan, fitur, dan fungsi."],
    ["Delivery", "Website siap digunakan dan dipublikasikan."],
    ["Support", "Bantuan dan pengembangan lanjutan sesuai kesepakatan."]
  ]
};

/* ============ PWA: service worker + prompt install ============ */
let deferredInstall = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; document.dispatchEvent(new Event("pwa-ready")); });
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

/* ============ UTIL & IKON ============ */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const S = (p, f) => `<svg viewBox="0 0 24 24" ${f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${p}</svg>`;
const ICON = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  cart: '<path d="M3 4h2l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>', gem: '<path d="M6 4h12l4 6-10 11L2 10z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>', pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/>', code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>', rocket: '<path d="M12 3c4 2 6 6 5 11l-5 4-5-4c-1-5 1-9 5-11z"/><circle cx="12" cy="10" r="1.5"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z"/>', wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', chev: '<path d="M6 9l6 6 6-6"/>', up: '<path d="M12 19V5M5 12l7-7 7 7"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 13l4 4L19 7"/>', ext: '<path d="M7 17L17 7M8 7h9v9"/>', play: '<path d="M7 4l13 8-13 8z"/>', img: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>', download: '<path d="M12 3v11M7 10l5 5 5-5M5 20h14"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'
};
const WA_PATH = '<path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10.1 9 9.6 7.8 9.4 7.3c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5 1.1 1.1-3.4-.2-.3C3.5 14.5 3 13.3 3 12c0-4.4 3.6-8 9-8s9 3.6 9 8-4.6 9-9 9z"/>';
const ico = n => n === "whatsapp" ? S(WA_PATH, 1) : S(ICON[n] || "");
const STEPI = ["chat", "pencil", "code", "checkc", "rocket", "headset"];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = m => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m || CONFIG.defaultMsg)}`;
const P = CONFIG.projects;
const hostOf = u => { try { const x = new URL(u); return x.host + x.pathname.replace(/\/$/, ""); } catch (e) { return u; } };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fillIcons = r => $$("[data-icon]:empty", r).forEach(el => el.innerHTML = ico(el.dataset.icon));
const openDlg = d => { if (d.open) return; d.showModal ? d.showModal() : d.setAttribute("open", ""); };

function init() {
  const root = document.documentElement;

  /* WhatsApp: semua elemen [data-wa] */
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- HERO: statistik + visual dari screenshot nyata ---------- */
  const cats = [...new Set(P.map(p => p.filter))];
  $("#stats").innerHTML = [[P.length + "+", "Proyek nyata"], [cats.length, "Kategori proyek"], ["100%", "Responsive HP & PC"]].map(s => `<li><b>${s[0]}</b><span class="l">${s[1]}</span></li>`).join("");
  /* kata berganti di judul hero */
  const rot = $$("#rot span"); let ri = 0;
  if (rot.length > 1 && !reduce) setInterval(() => { if (document.hidden) return; rot[ri].classList.remove("on"); ri = (ri + 1) % rot.length; rot[ri].classList.add("on"); }, 2600);

  /* hitung naik pada statistik */
  setTimeout(() => $$("#stats b").forEach(b => {
    const m = b.textContent.match(/^(\d+)(.*)$/); if (!m || reduce) return;
    const n = +m[1], t0 = performance.now();
    (function f(t) { const k = Math.min(1, (t - t0) / 1200); b.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + m[2]; if (k < 1) requestAnimationFrame(f); })(t0);
  }), 500);

  /* ---------- KEUNGGULAN ---------- */
  $("#why").innerHTML = CONFIG.why.map((w, i) => `<li class="gc spot rv" style="--d:${i * .06}s"><span class="ic">${ico(w[0])}</span><h3>${esc(w[1])}</h3><p>${esc(w[2])}</p></li>`).join("");

  /* ---------- LAYANAN ---------- */
  $("#svc").innerHTML = CONFIG.services.map((s, i) => `<article class="gc spot rv" style="--d:${(i % 3) * .06}s"><div class="ic">${ico(s.icon)}</div><div class="tx"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div><ul>${s.perks.map(p => `<li>${ico("check")}${esc(p)}</li>`).join("")}</ul><a class="lnk" target="_blank" rel="noopener" href="${waLink(`Halo Daud, saya tertarik dengan jasa ${s.title}. Boleh konsultasi?`)}">Konsultasi via WhatsApp ${ico("arrow")}</a></article>`).join("");

  /* ---------- PORTFOLIO ---------- */
  const filters = ["Semua", ...cats];
  const count = f => f === "Semua" ? P.length : P.filter(p => p.filter === f).length;
  $("#flt").innerHTML = filters.map((f, i) => `<button class="chip${i ? "" : " on"}" type="button" aria-pressed="${!i}" data-f="${esc(f)}">${esc(f)}<b>${count(f)}</b></button>`).join("");
  $("#grid").innerHTML = P.map((p, i) => `<article class="gc spot proj" data-f="${esc(p.filter)}" style="--accent:${p.accent}"><div class="shotw"><div class="sbar"><s></s><s></s><s></s><span>${esc(hostOf(p.url))}</span></div><button class="shot" type="button" data-i="${i}" aria-label="Lihat detail ${esc(p.title)}"><img src="${esc(p.img)}" alt="Screenshot website ${esc(p.title)}" width="800" height="500" loading="lazy" decoding="async"></button></div><div class="pb"><div class="pcat"><i></i>${esc(p.cat)}</div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="chips">${p.feat.map(t => `<span>${esc(t)}</span>`).join("")}</div><div class="pact"><button class="btn sm wa" type="button" data-i="${i}">${ico("play")}Preview</button><a class="btn sm ghost" href="${esc(p.url)}" target="_blank" rel="noopener">${ico("ext")}Buka Website</a></div><a class="pwa" target="_blank" rel="noopener" href="${waLink(`Halo Daud, saya tertarik bikin website mirip ${p.title}. Boleh konsultasi?`)}"><span>Mau seperti ini?</span><b>Chat Sekarang →</b></a></div></article>`).join("");
  const cards = $$("#grid .proj"), LIMIT = 6;
  let flt = "Semua", expanded = false, firstR = true;
  const matches = () => P.map((p, i) => i).filter(i => flt === "Semua" || P[i].filter === flt);
  function render() {
    const m = matches(), shown = new Set(expanded ? m : m.slice(0, LIMIT));
    cards.forEach((c, i) => {
      const show = shown.has(i), was = !c.hidden; c.hidden = !show; c.classList.remove("in-anim");
      if (show && !was && !firstR && !reduce) { c.style.animationDelay = ([...shown].indexOf(i) * .05) + "s"; void c.offsetWidth; c.classList.add("in-anim"); }
    });
    $("#moreWrap").hidden = m.length <= LIMIT;
    $("#moreBtn").setAttribute("aria-expanded", expanded); $("#moreBtn").classList.toggle("open", expanded);
    $("#moreTx").textContent = expanded ? "Tampilkan Lebih Sedikit" : `Lihat Semua ${m.length} Proyek`;
    firstR = false;
  }
  $("#flt").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#flt button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
    flt = b.dataset.f; expanded = false; render();
  });
  $("#moreBtn").onclick = () => { expanded = !expanded; render(); if (!expanded) $("#flt").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); };
  render();

  /* modal detail proyek */
  const dlg = $("#dlg"); let cur = 0, live = false;
  const shotHtml = p => `<img id="di" src="${esc(p.img)}" alt="Screenshot website ${esc(p.title)}" width="800" height="500">`;
  function openP(i) {
    cur = i; live = false; const p = P[i];
    $("#dshot").innerHTML = shotHtml(p);
    dlg.style.setProperty("--accent", p.accent);
    $("#dl").textContent = p.cat; $("#dt").textContent = p.title; $("#dd").textContent = p.desc;
    $("#dchips").innerHTML = p.feat.map(t => `<span>${esc(t)}</span>`).join("");
    $("#dbtn").innerHTML = `<button class="btn sm wa" type="button" id="dlive">${ico("play")}Preview Langsung</button><a class="btn sm ghost" href="${esc(p.url)}" target="_blank" rel="noopener">${ico("ext")}Buka Website</a><a class="btn sm ghost" target="_blank" rel="noopener" href="${waLink(`Halo Daud, saya tertarik bikin website mirip ${p.title}. Boleh konsultasi?`)}">${ico("whatsapp")}Mau seperti ini?</a>`;
    $("#dlive").onclick = () => {
      live = !live; const b = $("#dlive");
      $("#dshot").innerHTML = live ? `<iframe src="${esc(p.url)}" title="Preview ${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer"></iframe>` : shotHtml(p);
      b.innerHTML = live ? ico("img") + "Lihat Screenshot" : ico("play") + "Preview Langsung";
    };
    openDlg(dlg); dlg.scrollTop = 0;
  }
  const step = d => { const m = matches(), k = m.indexOf(cur); openP(m[(k + d + m.length) % m.length]); };
  $("#grid").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) openP(+b.dataset.i); });
  $("#dprev").onclick = () => step(-1); $("#dnext").onclick = () => step(1);
  $("#dx").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { $("#dshot").innerHTML = ""; });
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });

  /* ---------- TENTANG ---------- */
  if (CONFIG.experience) { $("#exp").textContent = CONFIG.experience; $("#exp").hidden = false; }
  $("#points").innerHTML = CONFIG.points.map(t => `<li>${ico("check")}${esc(t)}</li>`).join("");
  $("#skills").innerHTML = CONFIG.skills.map(s => `<li>${esc(s)}</li>`).join("");
  $(".pbadge b").textContent = P.length;
  if (CONFIG.photo) $("#photo .bcard").outerHTML = `<img class="pimg" src="${esc(CONFIG.photo)}" alt="Foto profil ${esc(CONFIG.name)}" width="400" height="400" loading="lazy">`;


  /* ---------- hemat CPU: animasi dijeda saat elemen di luar layar ---------- */
  if ("IntersectionObserver" in window) {
    const ag = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("inv", !e.isIntersecting)), { rootMargin: "80px 0px" });
    $$(".pcard, .cta, .faqcta, .photo, .hstats").forEach(el => ag.observe(el));
  }

  /* ---------- PROSES + FAQ ---------- */
  $("#steps").innerHTML = CONFIG.steps.map((s, i) => `<li class="gc spot rv" style="--d:${(i % 3) * .08}s"><span class="num">0${i + 1}</span><span class="ic">${ico(STEPI[i])}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></li>`).join("");
  $$("#faqlist details").forEach(d => d.addEventListener("toggle", () => { if (d.open) $$("#faqlist details").forEach(o => o !== d && (o.open = false)); }));

  /* ---------- KONTAK (hanya yang terisi) + FOOTER ---------- */
  const c = CONFIG.contacts;
  const hrefs = { email: v => "mailto:" + v, instagram: v => "https://instagram.com/" + v.replace("@", ""), facebook: v => v, github: v => "https://github.com/" + v, website: v => v };
  const cIcon = { WhatsApp: "whatsapp", Email: "mail", Instagram: "instagram", Facebook: "facebook", Github: "github", Website: "globe" };
  const all = [["WhatsApp", "+" + CONFIG.whatsapp, waLink()], ...["email", "instagram", "facebook", "github", "website"].map(k => [k[0].toUpperCase() + k.slice(1), c[k], c[k] && hrefs[k](c[k])])];
  const items2 = all.filter(i => i[2]);
  $("#contacts").innerHTML = items2.map(([n, v, h], i) => `<a class="ct gc spot rv" style="--d:${i * .06}s" href="${esc(h)}" target="_blank" rel="noopener"><span class="ic">${ico(cIcon[n])}</span><span class="ctx"><small>${n}</small><b>${esc(v)}</b></span>${n === "WhatsApp" ? `<span class="btn sm wa go">Chat Sekarang ${ico("arrow")}</span>` : ""}</a>`).join("");
  $("#fnav").innerHTML = $$("#menu > a:not(.menu-cta)").map(a => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
  $("#fsoc").innerHTML = items2.map(i => `<a href="${esc(i[2])}" target="_blank" rel="noopener">${i[0]}</a>`).join("");
  $("#yr").textContent = new Date().getFullYear();

  fillIcons(document);

  /* ---------- NAVBAR ---------- */
  const menu = $("#menu"), burger = $("#burger"), nav = $("#nav");
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Buka menu"); };
  burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu"); };
  menu.addEventListener("click", e => e.target.closest("a") && closeMenu());
  document.addEventListener("click", e => { if (menu.classList.contains("open") && !e.target.closest("#menu,#burger")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  const top = $("#top"), prog = $("#prog"); let tk = false;
  top.onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  const onScroll = () => { tk = false; const y = scrollY; top.classList.toggle("show", y > 700); nav.classList.toggle("stuck", y > 20);
    const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`; };
  addEventListener("scroll", () => { if (!tk) { tk = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();

  /* reveal + menu aktif */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px 28% 0px" }   /* v23: tampil SEBELUM masuk layar -> tidak ada kotak kosong/berkedip saat scroll cepat */) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  if ("IntersectionObserver" in window) {
    const links = $$("#menu a[href^='#']");
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(a => { const s = $(a.getAttribute("href")); s && so.observe(s); });
    $$("#menu > a[href='#home']")[0].classList.add("on");
  }

  /* spotlight kartu (hanya mouse) */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) document.addEventListener("pointermove", e => {
    const el = e.target.closest && e.target.closest(".spot"); if (!el) return; const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px"); el.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  /* ---------- PWA install ---------- */
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const instBtns = $$("#inst,#inst2"), ib = $("#ib"), ios = $("#ios"), ins = $("#ins");
  const canInstall = () => !standalone;
  const syncInstall = () => instBtns.forEach(b => b.hidden = !canInstall());
  async function doInstall() {
    if (deferredInstall) { deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (e) {} deferredInstall = null; syncInstall(); ib.hidden = true; }
    else if (isIOS) { ib.hidden = true; openDlg(ios); }
    else { ib.hidden = true; openDlg(ins); }
  }
  instBtns.concat([$("#ibgo")]).forEach(b => b.addEventListener("click", doInstall));
  let seen = 0; try { seen = +localStorage.getItem("ibx") || 0; } catch (e) {}
  const maybeBanner = () => { if (!canInstall() || !(deferredInstall || isIOS) || Date.now() - seen < 7 * 864e5) return; ib.hidden = false; };
  $("#ibx").onclick = () => { ib.hidden = true; try { localStorage.setItem("ibx", Date.now()); } catch (e) {} };
  $("#iosx").onclick = () => ios.close(); ios.addEventListener("click", e => { if (e.target === ios) ios.close(); });
  $("#insx").onclick = () => ins.close(); ins.addEventListener("click", e => { if (e.target === ins) ins.close(); });
  if (isIOS) $("#ibgo").textContent = "Cara Install";
  document.addEventListener("pwa-ready", () => { syncInstall(); setTimeout(maybeBanner, 6000); });
  addEventListener("appinstalled", () => { deferredInstall = null; syncInstall(); ib.hidden = true; });

  /* ---------- Musik latar (play / stop) ---------- */
  const bgm = $("#bgm"), mus = $("#mus");
  if (bgm && mus) {
    bgm.volume = .6;
    /* Playlist: selalu mulai dari lagu_01 saat halaman dimuat; lagu_01 -> lagu_02 otomatis, lalu kembali ke lagu_01 */
    const LIST = ["audio/lagu_01.mp3", "audio/lagu_02.mp3"]; let ti = 0, nx = null;
    const load = i => { ti = i; bgm.src = LIST[ti]; };
    load(0);
    bgm.addEventListener("ended", () => { load((ti + 1) % LIST.length); bgm.play().catch(() => {}); });
    const setOn = on => { mus.classList.toggle("on", on); mus.setAttribute("aria-pressed", on); const t = on ? "Hentikan musik" : "Putar musik"; mus.setAttribute("aria-label", t); mus.title = t; };
    mus.addEventListener("click", () => {
      if (bgm.paused) { bgm.play().then(() => { setOn(true); if (!nx) { nx = new Audio(); nx.preload = "auto"; nx.src = LIST[1]; } }).catch(() => setOn(false)); }
      else { bgm.pause(); setOn(false); load(0); }
    });
  }
  syncInstall(); if (isIOS) setTimeout(maybeBanner, 9000); else if (deferredInstall) setTimeout(maybeBanner, 6000);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
