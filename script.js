/* =====================================================================
   M DAUD S.M — script.js  (konten, portfolio, chat, form, PWA)
   Engine langit & laut ada di sky.js.
   SEMUA DATA YANG BIASA DIEDIT ADA DI BLOK "CONFIG" DI BAWAH INI.
   ===================================================================== */

/* ============ KONFIGURASI — EDIT DI SINI ============ */
const CONFIG = {
  brand: "M DAUD S.M",
  role: "Sales Executive Marketing",
  whatsapp: "6285697321423",           // ← SATU-SATUNYA tempat nomor WhatsApp (format 62xxxxxxxxxx)
  phoneDisplay: "0856-9732-1423",      // tampilan nomor di bagian Kontak
  defaultMsg: "Halo Daud, saya tertarik ingin bertanya mengenai layanan Anda.",
  online: { from: 8, to: 18 },         // jam online (jam perangkat pengunjung)

  // Chat assistant menyimpan nama calon klien ke Firebase (data lama). Isi null untuk mematikan.
  firebase: {
    apiKey: "AIzaSyC4rhA-Kp9Cctb3bAoSfkYPSJxDXYCJcr8",
    authDomain: "jasadaud.firebaseapp.com",
    databaseURL: "https://jasadaud-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jasadaud",
    storageBucket: "jasadaud.firebasestorage.app",
    messagingSenderId: "260613263154",
    appId: "1:260613263154:web:76cdacc4fd55d32ad0d12b"
  },

  // Subjudul hero yang berganti + kartu layanan kaca di bawah judul
  rotate: [
    ["globe", "Website Profesional", "Website\nProfesional"],
    ["home", "Desain Rumah Modern", "Desain Rumah\nModern"],
    ["android", "Aplikasi Android", "Aplikasi\nAndroid"],
    ["chart", "Solusi Digital Bisnis", "Solusi Digital\nBisnis"],
    ["server", "Sistem Informasi Modern", "Sistem Informasi\nModern"]
  ],
  // Statistik hero (angka dari website lama). n = angka hitung-naik; text = teks tetap.
  stats: [
    { icon: "rocket", n: 100, suf: "+", label: "Proyek Selesai" },
    { icon: "bolt", text: "< 5 Menit", label: "Respon Cepat" },
    { icon: "users", n: 1.2, dec: 1, suf: " rb+", label: "Pengunjung" }
  ],

  why: [
    ["bolt", "Respon Cepat", "Balas pesan WhatsApp kurang dari 5 menit selama jam kerja."],
    ["phone", "Responsive HP & PC", "Tampilan rapi dan nyaman di HP, tablet, maupun desktop."],
    ["gauge", "Cepat & Ringan", "Dibuat ringan agar cepat dibuka, bahkan di koneksi biasa dan perangkat lama."],
    ["download", "Bisa Di-install (PWA)", "Pasang di layar utama HP seperti aplikasi, tanpa lewat toko aplikasi."],
    ["refresh", "Revisi Fleksibel", "Kami memastikan hasil akhir sesuai visi dan kebutuhan Anda."],
    ["chat", "Konsultasi GRATIS", "Diskusikan kebutuhan Anda tanpa biaya dan tanpa komitmen apa pun."]
  ],

  // price = harga "mulai dari" (kosongkan jika tidak ditampilkan). hot = kartu disorot.
  services: [
    { icon: "globe", title: "Website Profesional", rib: "⭐ Paling Diminati", hot: true, price: "Rp 200.000", desc: "Website untuk perusahaan, usaha, brand, toko, jasa, dan personal branding.", perks: ["1x Revisi Gratis", "Desain modern & responsive", "Gratis konsultasi struktur"], notes: ["Harga tergantung fitur & custom"], cross: ["Domain & hosting terpisah"] },
    { icon: "home", title: "Desain Rumah Modern", rib: "Best Value", price: "Rp 400.000", desc: "Desain rumah dan bangunan 3D yang rapi, realistis, dan siap dipresentasikan.", perks: ["2x Revisi Gratis", "File JPG, PNG & video preview", "Konsultasi konsep gratis"], notes: ["Harga menyesuaikan luas & detail desain"] },
    { icon: "android", title: "Aplikasi Android", rib: "🚀 Premium", price: "Rp 700.000", desc: "Aplikasi Android dengan tampilan modern dan ramah pengguna untuk bisnis & UMKM.", perks: ["2x Revisi Gratis", "UI modern & user friendly", "Konsultasi konsep aplikasi"], notes: ["Harga menyesuaikan fitur & database"], cross: ["Publish Play Store terpisah"] },
    { icon: "cart", title: "Website Katalog & Toko", desc: "Menampilkan produk, layanan, menu, portfolio, dan informasi bisnis.", perks: ["Mudah diperbarui", "Tombol pesan WhatsApp"] },
    { icon: "gear", title: "Sistem Informasi", desc: "Sistem berbasis web: administrasi, keuangan, monitoring, laporan, inventory, data pelanggan, dan operasional.", perks: ["Pekerjaan lebih terorganisir", "Sesuai alur kerja Anda"] },
    { icon: "chart", title: "Dashboard & Monitoring", desc: "Dashboard visual untuk memantau data, aktivitas, dan laporan secara terstruktur.", perks: ["Grafik jelas", "Data mudah dibaca"] },
    { icon: "gem", title: "Website Custom", desc: "Website dibuat berdasarkan kebutuhan dan permintaan khusus Anda.", perks: ["Fitur sesuai kebutuhan", "Fleksibel"] },
    { icon: "wrench", title: "Maintenance & Pengembangan", desc: "Perbaikan, update, penambahan fitur, dan optimasi website yang sudah ada.", perks: ["Website tetap terawat", "Fitur bisa ditambah"] }
  ],

  /* Portfolio.  kind: "site" (default) | "video" (yt = ID YouTube) | "img" (gambar desain)
     Tambah proyek: salin satu blok, taruh gambar 800x500 (.webp) di img/projects/.  */
  projects: [
    { title: "Es Teler Abah", filter: "Website", cat: "Website UMKM", img: "img/projects/esteler.webp", desc: "Website usaha Es Teler Abah.", feat: ["Website", "Live Preview"], url: "https://web189.github.io/EsTeler-Abah/", accent: "#f59e0b" },
    { kind: "img", title: "Kantin Depo Parung", filter: "SketchUp", cat: "Desain 3D · SketchUp", img: "img/projects/kantin-depo-parung.webp", desc: "Desain 3D kantin Depo Parung dengan visualisasi eksterior yang realistis.", feat: ["SketchUp", "Desain 3D"], accent: "#38bdf8" },
    { kind: "video", title: "App DMS", yt: "zOYAZK2-6Eg", filter: "Android", cat: "Aplikasi Android", desc: "Video demo aplikasi Android App DMS.", feat: ["Android", "Video Demo"], accent: "#22c55e" },
    { title: "Nabillove", filter: "Booking", cat: "Booking Platform", img: "img/projects/nabilove.webp", desc: "Platform booking talent digital dengan sistem chat, jadwal layanan, dan dashboard admin & talent terpisah.", feat: ["Booking System", "Multi-Dashboard", "Live Chat"], url: "https://nabilove.com/", accent: "#E11D6B" },
    { title: "Magic Ink Tattoo", filter: "Website", cat: "Website Studio", img: "img/projects/magicink.webp", desc: "Website studio tato temporer dengan tombol booking dan tampilan gelap yang elegan.", feat: ["Booking", "Dark UI"], url: "https://web189.github.io/Magic-Ink/", accent: "#8b5cf6" },
    { kind: "img", title: "Pt Lokon Prima", filter: "SketchUp", cat: "Desain 3D · SketchUp", img: "img/projects/lokon-prima.webp", desc: "Desain 3D Pt Lokon Prima dengan pencahayaan senja yang dramatis.", feat: ["SketchUp", "Desain 3D"], accent: "#f97316" },
    { title: "Street Food FM", filter: "Website", cat: "Website Kuliner", img: "img/projects/streetfood.webp", desc: "Website jajanan Street Food FM dengan bagian menu favorit.", feat: ["Menu Favorit", "Responsive"], url: "https://web189.github.io/Street-Food-FM/", accent: "#ef4444" },
    { title: "Happy Wedding", filter: "Website", cat: "Website Pernikahan", desc: "Website bertema pernikahan.", feat: ["Website", "Live Preview"], url: "https://web189.github.io/happy-wedding/", accent: "#ec4899" },
    { kind: "video", title: "App UMKM EsTeler", yt: "j1pTuWOuVaI", filter: "Android", cat: "Aplikasi Android", desc: "Video demo aplikasi Android untuk UMKM Es Teler.", feat: ["Android", "Video Demo"], accent: "#22c55e" },
    { kind: "video", title: "App ABC Mobile", yt: "fkrOpdnxXzg", filter: "Android", cat: "Aplikasi Android", desc: "Video demo aplikasi Android ABC Mobile.", feat: ["Android", "Video Demo"], accent: "#22c55e" },
    { kind: "img", title: "Workshop Pt JMTM", filter: "SketchUp", cat: "Desain 3D · SketchUp", img: "img/projects/workshop-jmtm.webp", desc: "Desain 3D workshop Pt JMTM.", feat: ["SketchUp", "Desain 3D"], accent: "#eab308" },
    { kind: "img", title: "Tank Solar Pt JMTM", filter: "SketchUp", cat: "Desain 3D · SketchUp", img: "img/projects/tank-solar-jmtm.webp", desc: "Desain 3D area tank solar Pt JMTM.", feat: ["SketchUp", "Desain 3D"], accent: "#06b6d4" },
    { title: "Buku Belajar Anak", filter: "Game", cat: "Game Edukasi", img: "img/projects/belajarbermain.webp", desc: "Website game edukasi gratis untuk anak usia 3–8 tahun: 14 game mewarnai, berhitung, huruf, maze, puzzle & memori bersama maskot Dino. Bebas iklan dan bisa dimainkan offline.", feat: ["14 Game Edukasi", "Bebas Iklan", "Bisa Offline"], url: "https://belajarbermain.online/", accent: "#84CC16" },
    { title: "MOTOCARE MOTOR", filter: "Booking", cat: "Bengkel & Booking", img: "img/projects/bengkel.webp", desc: "Website bengkel motor dengan booking servis, antrean servis live, promo, katalog spare part, dan cek status booking.", feat: ["Booking Servis", "Antrean Live", "Spare Part"], url: "https://benyoriki.github.io/Bengkel/", accent: "#F59E0B" },
    { title: "Nama GYM", filter: "Layanan", cat: "Fitness & Membership", img: "img/projects/gym.webp", desc: "Website gym dengan paket membership dewasa & pelajar, personal training, promo, galeri, dan pembayaran QRIS dengan unggah bukti.", feat: ["Membership", "Bayar QRIS", "Personal Training"], url: "https://benyoriki.github.io/Gym/", accent: "#F97316" },
    { title: "Martabak Mas Bejo", filter: "E-Commerce", cat: "Pesan Online", img: "img/projects/martabak.webp", desc: "Website pesan martabak manis & asin dengan menu favorit, keranjang, bayar QRIS atau di tempat, plus dashboard admin.", feat: ["Pesan Online", "QRIS", "Admin Dashboard"], url: "https://benyoriki.github.io/Martabak/", accent: "#E11D2E" },
    { title: "Barbershop Tanteh Susi", filter: "Booking", cat: "Booking & Antrean", img: "img/projects/barbershop.webp", desc: "Booking online dengan DP, antrean real-time, chatbot, galeri, plus dashboard admin lengkap dengan laporan keuangan.", feat: ["Booking + DP", "Antrean Live", "Admin Dashboard"], url: "https://benyoriki.github.io/Barbershop/", accent: "#D4A24C" },
    { title: "TOKO BANGUNAN", filter: "E-Commerce", cat: "Toko Bangunan", img: "img/projects/tokobangunan.webp", desc: "Toko bahan bangunan online dengan katalog, promo, stok terpantau, estimasi ongkir per zona, dan pesan via WhatsApp.", feat: ["Katalog Produk", "Stok Live", "Estimasi Ongkir"], url: "https://benyoriki.github.io/TokoBangunan/", accent: "#0EA5E9" },
    { title: "EV Queue — Antrean SPKLU", filter: "Aplikasi", cat: "Aplikasi Web", img: "img/projects/spklu.webp", desc: "Sistem antrean SPKLU untuk mobil & motor listrik: ambil nomor dari HP, pantau giliran real-time, scan QR, dan notifikasi.", feat: ["Antrean Real-time", "Scan QR", "Notifikasi"], url: "https://benyoriki.github.io/SPKLU/#home", accent: "#14B8A6" },
    { title: "Toko Online Modern", filter: "E-Commerce", cat: "E-Commerce", img: "img/projects/toko-online.webp", desc: "E-commerce lengkap dengan katalog dinamis, cart system, dan stok real-time.", feat: ["E-Commerce", "Cart", "Stok Live"], url: "https://benyoriki.github.io/Toko-Online/", accent: "#10B981" },
    { title: "KOPDAR — Koperasi Darat", filter: "E-Commerce", cat: "E-Commerce & Kasir", img: "img/projects/kopdar.webp", desc: "Toko online minimarket dengan promo, filter produk, checkout ambil/antar, plus panel kasir, gudang, dan superadmin.", feat: ["Toko Online", "Kasir & Gudang", "3 Level Admin"], url: "https://benyoriki.github.io/Kopdar/", accent: "#0F9D7F" },
    { title: "Cartok — Cari Kontrakan", filter: "Layanan", cat: "Marketplace", img: "img/projects/kontrakan.webp", desc: "Marketplace kontrakan & kos: pencarian filter, favorit, ketersediaan unit, verifikasi pemilik, dan dark mode.", feat: ["Marketplace", "Verifikasi Pemilik", "Dark Mode"], url: "https://benyoriki.github.io/Kontrakan/", accent: "#F97316" },
    { title: "MBG Watch — Command Center", filter: "Aplikasi", cat: "Dashboard Monitoring", img: "img/projects/mbe.webp", desc: "Prototype command center: peta sebaran, early warning, risk score, monitoring CCTV, laporan, dan analitik real-time.", feat: ["Dashboard", "Peta & Alert", "Analitik"], url: "https://benyoriki.github.io/MBE/", accent: "#3B82F6" },
    { title: "Duel Boxing Arena", filter: "Aplikasi", cat: "Sport App", img: "img/projects/boxing.webp", desc: "Aplikasi cari lawan & jadwalkan duel olahraga 1v1 dengan map arena, sistem rating, dan ranking pemain.", feat: ["Map Arena", "Matchmaking", "Ranking"], url: "https://benyoriki.github.io/boxing/", accent: "#EF4444" },
    { title: "JasaDaud Online", filter: "E-Commerce", cat: "Jasa Digital", img: "img/projects/jasadaud.webp", desc: "Platform jasa digital dengan manajemen order real-time & dashboard admin.", feat: ["Real-Time DB", "Firebase", "Dashboard"], url: "https://jasadaud.online/", accent: "#3B82F6" },
    { title: "Gilang Trans", filter: "Travel", cat: "Travel & Transport", img: "img/projects/travel.webp", desc: "Website travel antar kota dengan pencarian rute, filter harga & fasilitas, dan booking cepat via WhatsApp.", feat: ["Filter Rute", "Booking WA", "Admin Panel"], url: "https://benyoriki.github.io/Travel/", accent: "#F59E0B" },
    { title: "FreshWave Laundry", filter: "Layanan", cat: "Layanan Digital", img: "img/projects/laundry.webp", desc: "Laundry online dengan kalkulator harga otomatis, tracking pesanan real-time, dan cek jangkauan antar-jemput.", feat: ["Kalkulator Harga", "Order Tracking", "GPS Check"], url: "https://benyoriki.github.io/Laundry/", accent: "#06B6D4" },
    { title: "Pemancingan Gerry", filter: "Booking", cat: "Booking & Wisata", img: "img/projects/pemancingan-gerry.webp", desc: "Website tempat pemancingan dengan booking kolam, galeri foto, harga paket, dan sistem event & lomba.", feat: ["Booking Kolam", "Galeri Foto", "Event System"], url: "https://benyoriki.github.io/Pemancingan-Gerry/", accent: "#22C55E" },
    { title: "BukuNusa Digital", filter: "E-Commerce", cat: "E-Commerce & Konten", img: "img/projects/ebook.webp", desc: "Platform buku digital: katalog & kategori, baca bab pertama gratis, buka bab premium, serta halaman penulis.", feat: ["Katalog Buku", "Bab Premium", "Profil Penulis"], url: "https://benyoriki.github.io/ebook/#/", accent: "#8B5CF6" },
    { title: "Ayam Kampung & Sambal Merintih", filter: "Booking", cat: "Restoran & Pesan Online", img: "img/projects/restoran.webp", desc: "Rumah makan dengan QR di setiap meja: pilih menu, bayar QRIS, makanan diantar ke meja. Lengkap dasbor kasir & owner.", feat: ["QR Meja", "Bayar QRIS", "Dasbor Kasir"], url: "https://benyoriki.github.io/Restoran/", accent: "#DC2626" }
  ],
  filterOrder: ["Website", "Android", "SketchUp", "Booking", "E-Commerce", "Aplikasi", "Layanan", "Game", "Travel"],

  testi: ["img/testi/chat1.webp", "img/testi/chat2.webp", "img/testi/chat3.webp", "img/testi/chat4.webp"],
  skills: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Firebase", "GitHub", "UI/UX Design", "Android App", "SketchUp 3D", "Web Application", "Database", "API Integration"],
  points: ["Desain modern & responsive di HP maupun desktop", "Dibuat sesuai alur kerja dan kebutuhan bisnis Anda", "Harga transparan, semua biaya disepakati di awal", "Konsultasi awal gratis via WhatsApp"],
  experience: "",   // contoh: "Pengalaman 3 tahun membangun website & aplikasi untuk UMKM." (kosong = disembunyikan)
  steps: [
    ["Konsultasi", "Diskusikan kebutuhan, ide, dan tujuan website, aplikasi, atau desain Anda."],
    ["Perencanaan", "Menentukan konsep, fitur, desain, alur sistem, dan kesepakatan biaya."],
    ["Pengembangan", "Website, aplikasi, atau desain mulai dibuat sesuai kebutuhan."],
    ["Testing & Revisi", "Pengujian tampilan, fitur, dan fungsi, plus revisi sesuai paket."],
    ["Delivery", "Hasil siap digunakan dan dipublikasikan."],
    ["Support", "Bantuan dan pengembangan lanjutan sesuai kesepakatan."]
  ],
  // Media sosial (kosongkan url untuk menyembunyikan)
  social: [
    { name: "Instagram", img: "img/ig.png", url: "https://www.instagram.com/benyoriki?igsh=cGZkOXpuN2JyYjAy" },
    { name: "YouTube", img: "img/yt.png", url: "https://m.youtube.com/channel/UCc5tgrRwlCiE_VDRN5Qnjcw" },
    { name: "TikTok", img: "img/tiktok.png", url: "https://www.tiktok.com/@benyoriki" },
    { name: "Facebook", img: "img/fb.png", url: "https://www.facebook.com/benyo.hermawan" }
  ]
};

/* ============ PWA: service worker + install ============ */
let deferredInstall = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; document.dispatchEvent(new Event("pwa-ready")); });
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

/* ============ UTIL & IKON ============ */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const S = (p, f) => `<svg viewBox="0 0 24 24" ${f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${p}</svg>`;
const ICON = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
  android: '<path d="M5 18V11a7 7 0 0 1 14 0v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/><path d="M8.5 3.5L10 6M15.5 3.5L14 6M9 12h.01M15 12h.01"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  cart: '<path d="M3 4h2l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  gem: '<path d="M6 4h12l4 6-10 11L2 10z"/>', wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>', pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/>', code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>', rocket: '<path d="M12 3c4 2 6 6 5 11l-5 4-5-4c-1-5 1-9 5-11z"/><circle cx="12" cy="10" r="1.5"/><path d="M8 18l-2 3M16 18l2 3"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
  download: '<path d="M12 3v11M7 10l5 5 5-5M5 20h14"/>', gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5.2a3 3 0 0 1 0 5.6M18 14.4c2 .7 3 2.6 3 5.6"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', chev: '<path d="M6 9l6 6 6-6"/>', up: '<path d="M12 19V5M5 12l7-7 7 7"/>', down: '<path d="M12 5v14M5 12l7 7 7-7"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>', check: '<path d="M5 13l4 4L19 7"/>', cross: '<path d="M6 6l12 12M18 6L6 18"/>', ext: '<path d="M7 17L17 7M8 7h9v9"/>',
  play: '<path d="M7 4l13 8-13 8z"/>', img: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>', zoom: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M11 8v6M8 11h6"/>'
};
const WA_PATH = '<path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10.1 9 9.6 7.8 9.4 7.3c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5 1.1 1.1-3.4-.2-.3C3.5 14.5 3 13.3 3 12c0-4.4 3.6-8 9-8s9 3.6 9 8-4.6 9-9 9z"/>';
const ico = n => n === "whatsapp" ? S(WA_PATH, 1) : S(ICON[n] || "");
const STEPI = ["chat", "pencil", "code", "checkc", "rocket", "headset"];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waLink = m => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m || CONFIG.defaultMsg)}`;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fillIcons = r => $$("[data-icon]:empty", r).forEach(el => el.innerHTML = ico(el.dataset.icon));
const P = CONFIG.projects;
const hostOf = u => { try { const x = new URL(u); return x.host + x.pathname.replace(/\/$/, ""); } catch (e) { return u; } };
const ytThumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytWatch = id => `https://www.youtube.com/watch?v=${id}`;
const isOnline = () => { const h = new Date().getHours(); return h >= CONFIG.online.from && h < CONFIG.online.to; };
const openDlg = d => { if (d.open) return; d.showModal ? d.showModal() : d.setAttribute("open", ""); };

function init() {
  const root = document.documentElement;

  /* WhatsApp: semua elemen [data-wa] */
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- HERO ---------- */
  $("#hchips").innerHTML = CONFIG.rotate.map((r, i) => `<li${i ? "" : ' class="on"'}><span data-icon="${r[0]}"></span><span>${esc(r[2]).replace("\n", "<br>")}</span></li>`).join("");
  $("#hstats").innerHTML = CONFIG.stats.map(s => `<li><span data-icon="${s.icon}"></span><div><b${s.n != null ? ` data-n="${s.n}" data-dec="${s.dec || 0}" data-suf="${esc(s.suf || "")}"` : ""}>${s.n != null ? (0).toFixed(s.dec || 0).replace(".", ",") + esc(s.suf || "") : esc(s.text)}</b><span class="l">${esc(s.label)}</span></div></li>`).join("");
  const rt = $("#rotTx"), chips = $$("#hchips li"); let ri = 0, rtimer = 0;
  const setRot = i => { rt.classList.add("out"); setTimeout(() => { rt.textContent = CONFIG.rotate[i][1]; rt.classList.remove("out"); chips.forEach((c, k) => c.classList.toggle("on", k === i)); }, reduce ? 0 : 420); };
  const startRot = () => { clearInterval(rtimer); if (!reduce) rtimer = setInterval(() => { if (!document.hidden) { ri = (ri + 1) % CONFIG.rotate.length; setRot(ri); } }, 2800); };
  chips.forEach((c, i) => c.addEventListener("click", () => { ri = i; setRot(i); startRot(); }));
  rt.textContent = CONFIG.rotate[0][1]; startRot();
  const countUp = () => $$("#hstats b[data-n]").forEach(b => {
    const n = +b.dataset.n, dec = +b.dataset.dec, suf = b.dataset.suf, fmt = v => v.toFixed(dec).replace(".", ",") + suf;
    if (reduce) { b.textContent = fmt(n); return; }
    const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 1400); b.textContent = fmt(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
  });
  setTimeout(countUp, 450);

  /* ---------- MARQUEE ---------- */
  const cats = CONFIG.filterOrder.filter(f => P.some(p => p.filter === f));
  const mq = [...CONFIG.skills, ...cats];
  $("#track").innerHTML = [0, 1].map(() => `<span>${mq.map(esc).join("</span><span>")}</span>`).join("");

  /* ---------- KEUNGGULAN ---------- */
  $("#why").innerHTML = CONFIG.why.map((w, i) => `<li class="gc spot rv" style="--d:${(i % 3) * .06}s"><span class="ic">${ico(w[0])}</span><h3>${esc(w[1])}</h3><p>${esc(w[2])}</p></li>`).join("");

  /* ---------- LAYANAN ---------- */
  $("#svc").innerHTML = CONFIG.services.map((s, i) => `<article class="gc spot rv${s.hot ? " hot" : ""}" style="--d:${(i % 4) * .06}s">${s.rib ? `<span class="rib${s.hot ? " hotr" : ""}">${esc(s.rib)}</span>` : ""}<div class="ic">${ico(s.icon)}</div><div class="tx"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>${s.price ? `<div class="price"><small>mulai dari</small><b>${esc(s.price)}</b></div>` : ""}<ul>${s.perks.map(p => `<li>${ico("check")}${esc(p)}</li>`).join("")}${(s.notes || []).map(p => `<li class="nt">${ico("info")}${esc(p)}</li>`).join("")}${(s.cross || []).map(p => `<li class="no">${ico("cross")}${esc(p)}</li>`).join("")}</ul><a class="lnk" target="_blank" rel="noopener" href="${waLink(`Halo Daud, saya tertarik dengan layanan ${s.title}. Boleh konsultasi?`)}">Konsultasi via WhatsApp ${ico("arrow")}</a></article>`).join("");

  /* ---------- PORTFOLIO ---------- */
  const kindOf = p => p.kind || "site";
  const barOf = p => kindOf(p) === "video" ? "youtube.com · video demo" : kindOf(p) === "img" ? "Desain 3D · SketchUp" : hostOf(p.url);
  const thumbOf = p => kindOf(p) === "video" ? ytThumb(p.yt) : p.img;
  const phHtml = p => `<div class="ph" style="--accent:${p.accent}">${esc(p.title)}</div>`;
  const imgHtml = (p, alt, lazy = true) => thumbOf(p) ? `<img src="${esc(thumbOf(p))}" alt="${esc(alt)}" width="800" height="500" ${lazy ? 'loading="lazy"' : ""} decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:this.dataset.t}))" data-t="${esc(p.title)}">` : phHtml(p);
  const waAsk = p => waLink(`Halo Daud, saya tertarik membuat yang mirip "${p.title}". Boleh konsultasi?`);
  const filters = ["Semua", ...cats];
  const count = f => f === "Semua" ? P.length : P.filter(p => p.filter === f).length;
  $("#flt").innerHTML = filters.map((f, i) => `<button class="chip${i ? "" : " on"}" type="button" aria-pressed="${!i}" data-f="${esc(f)}">${esc(f)}<b>${count(f)}</b></button>`).join("");
  $("#grid").innerHTML = P.map((p, i) => {
    const k = kindOf(p);
    const second = k === "video" ? `<a class="btn sm ghost" href="${ytWatch(p.yt)}" target="_blank" rel="noopener">${ico("ext")}YouTube</a>` : k === "img" ? `<button class="btn sm ghost" type="button" data-zoom="${i}">${ico("zoom")}Perbesar</button>` : `<a class="btn sm ghost" href="${esc(p.url)}" target="_blank" rel="noopener">${ico("ext")}Buka Website</a>`;
    return `<article class="gc spot proj" data-f="${esc(p.filter)}" style="--accent:${p.accent}"><div class="shotw"><div class="sbar"><s></s><s></s><s></s><span>${esc(barOf(p))}</span></div><button class="shot" type="button" data-i="${i}" aria-label="Lihat detail ${esc(p.title)}">${imgHtml(p, "Tampilan " + p.title)}${k === "video" ? `<span class="playb">${ico("play")}</span>` : ""}</button></div><div class="pb"><div class="pcat"><i></i>${esc(p.cat)}</div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="chips">${p.feat.map(t => `<span>${esc(t)}</span>`).join("")}</div><div class="pact"><button class="btn sm wa" type="button" data-i="${i}">${ico(k === "video" ? "play" : k === "img" ? "img" : "play")}${k === "site" ? "Preview" : k === "video" ? "Putar" : "Lihat"}</button>${second}</div><a class="pwa" target="_blank" rel="noopener" href="${waAsk(p)}"><span>Mau seperti ini?</span><b>Chat Sekarang →</b></a></div></article>`;
  }).join("");
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
  const closeShot = () => { $("#dshot").innerHTML = ""; };
  const shotHtml = p => thumbOf(p) ? `<img src="${esc(thumbOf(p))}" alt="${esc(p.title)}" width="800" height="500" style="${kindOf(p) === "img" ? "object-fit:contain;background:#020816" : ""}">` : phHtml(p);
  function openP(i) {
    cur = i; live = false; const p = P[i], k = kindOf(p);
    dlg.style.setProperty("--accent", p.accent);
    $("#dl").textContent = p.cat; $("#dt").textContent = p.title; $("#dd").textContent = p.desc;
    $("#dchips").innerHTML = p.feat.map(t => `<span>${esc(t)}</span>`).join("");
    const ask = `<a class="btn sm wa" target="_blank" rel="noopener" href="${waAsk(p)}">${ico("whatsapp")}Mau seperti ini?</a>`;
    if (k === "video") {
      $("#dshot").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(p.yt)}?rel=0" title="Video ${esc(p.title)}" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      $("#dbtn").innerHTML = `<a class="btn sm ghost" href="${ytWatch(p.yt)}" target="_blank" rel="noopener">${ico("ext")}Buka di YouTube</a>${ask}`;
    } else if (k === "img") {
      $("#dshot").innerHTML = shotHtml(p);
      $("#dbtn").innerHTML = ask;
    } else {
      $("#dshot").innerHTML = shotHtml(p);
      $("#dbtn").innerHTML = `<button class="btn sm pri" type="button" id="dlive">${ico("play")}Preview Langsung</button><a class="btn sm ghost" href="${esc(p.url)}" target="_blank" rel="noopener">${ico("ext")}Buka Website</a>${ask}`;
      $("#dlive").onclick = () => {
        live = !live; const b = $("#dlive");
        $("#dshot").innerHTML = live ? `<iframe src="${esc(p.url)}" title="Preview ${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer"></iframe>` : shotHtml(p);
        b.innerHTML = live ? ico("img") + "Lihat Gambar" : ico("play") + "Preview Langsung";
      };
    }
    openDlg(dlg); dlg.scrollTop = 0;
  }
  const step = d => { const m = matches(), k = m.indexOf(cur); openP(m[(k + d + m.length) % m.length]); };
  $("#grid").addEventListener("click", e => {
    const z = e.target.closest("[data-zoom]"); if (z) { openLb(P[+z.dataset.zoom].img, P[+z.dataset.zoom].title); return; }
    const b = e.target.closest("[data-i]"); if (b) openP(+b.dataset.i);
  });
  $("#dprev").onclick = () => step(-1); $("#dnext").onclick = () => step(1);
  $("#dx").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", closeShot);
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });

  /* lightbox */
  const lb = $("#lb");
  function openLb(src, alt) { $("#lbi").src = src; $("#lbi").alt = alt || ""; openDlg(lb); }
  $("#lbx").onclick = () => lb.close();
  lb.addEventListener("click", e => { if (e.target === lb || e.target.id === "lbi") lb.close(); });
  lb.addEventListener("close", () => { $("#lbi").removeAttribute("src"); });

  /* ---------- TESTIMONI ---------- */
  const ts = $("#tscroll");
  ts.innerHTML = CONFIG.testi.map((src, i) => `<div class="timg"><img src="${esc(src)}" alt="Testimoni klien ${i + 1}" width="640" height="1373" loading="lazy" decoding="async" data-lb="${esc(src)}"></div>`).join("");
  ts.addEventListener("click", e => { const im = e.target.closest("[data-lb]"); if (im) openLb(im.dataset.lb, im.alt); });
  const syncT = () => $(".testi").classList.toggle("noscroll", ts.scrollWidth <= ts.clientWidth + 4);
  $("#tprev").onclick = () => ts.scrollBy({ left: -ts.clientWidth * .8, behavior: reduce ? "auto" : "smooth" });
  $("#tnext").onclick = () => ts.scrollBy({ left: ts.clientWidth * .8, behavior: reduce ? "auto" : "smooth" });
  syncT(); addEventListener("resize", syncT); addEventListener("load", syncT);

  /* ---------- TENTANG ---------- */
  $("#bmini").innerHTML = [[CONFIG.stats[0].n + "+", "Proyek"], [CONFIG.services.length, "Layanan"], ["< 5", "Menit respon"]].map(s => `<li><b>${s[0]}</b>${s[1]}</li>`).join("");
  if (CONFIG.experience) { $("#exp").textContent = CONFIG.experience; $("#exp").hidden = false; }
  $("#points").innerHTML = CONFIG.points.map(t => `<li>${ico("check")}${esc(t)}</li>`).join("");
  $("#skills").innerHTML = CONFIG.skills.map(s => `<li>${esc(s)}</li>`).join("");

  /* ---------- PROSES ---------- */
  $("#steps").innerHTML = CONFIG.steps.map((s, i) => `<li class="gc spot rv" style="--d:${(i % 3) * .08}s"><span class="num">0${i + 1}</span><span class="ic">${ico(STEPI[i])}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></li>`).join("");
  $$("#faqlist details").forEach(d => d.addEventListener("toggle", () => { if (d.open) $$("#faqlist details").forEach(o => o !== d && (o.open = false)); }));

  /* ---------- KONTAK ---------- */
  $("#cphone").textContent = "📱 " + CONFIG.phoneDisplay;
  const socials = CONFIG.social.filter(s => s.url);
  $("#soc").innerHTML = socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}"><img src="${esc(s.img)}" alt="" width="28" height="28" loading="lazy"></a>`).join("");
  $("#soc").parentElement.hidden = !socials.length;
  $("#fnav").innerHTML = $$("#menu > a:not(.menu-cta)").map(a => `<a href="${a.getAttribute("href")}">${a.textContent}</a>`).join("");
  $("#fsoc").innerHTML = `<a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${esc(CONFIG.phoneDisplay)}</a>` + socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("");
  $("#yr").textContent = new Date().getFullYear();
  const syncOnline = () => { const on = isOnline(); $(".conl span").textContent = on ? "Online sekarang (08.00 – 18.00)" : "Offline · online setiap hari 08.00 – 18.00"; $(".od").classList.toggle("off", !on); $(".csdot").style.background = on ? "#4ade80" : "#94a3b8"; const c = $("#csst"); c.textContent = on ? "● Online" : "● Offline"; c.classList.toggle("off", !on); };
  syncOnline(); setInterval(syncOnline, 60000);

  /* formulir konsultasi → WhatsApp */
  $("#kform").addEventListener("submit", e => {
    e.preventDefault();
    const nama = $("#fName").value.trim(), need = $("#fNeed").value, msg = $("#fMsg").value.trim(), err = $("#fErr");
    if (!nama) { err.textContent = "Mohon isi nama Anda terlebih dahulu."; err.hidden = false; $("#fName").focus(); return; }
    err.hidden = true;
    const text = `Halo Daud, saya ${nama}.\nSaya ingin konsultasi: ${need}.` + (msg ? `\n\n${msg}` : "");
    window.open(waLink(text), "_blank", "noopener");
  });

  fillIcons(document);

  /* ---------- NAVBAR ---------- */
  const menu = $("#menu"), burger = $("#burger"), nav = $("#nav");
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Buka menu"); };
  burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu"); };
  menu.addEventListener("click", e => e.target.closest("a") && closeMenu());
  document.addEventListener("click", e => { if (menu.classList.contains("open") && !e.target.closest("#menu,#burger")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeMenu(); closeChat(); } });

  const top = $("#top"), prog = $("#prog"); let tk = false;
  top.onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  const onScroll = () => { tk = false; const y = scrollY; top.classList.toggle("show", y > 700); nav.classList.toggle("stuck", y > 20);
    const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`; };
  addEventListener("scroll", () => { if (!tk) { tk = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();

  /* reveal + menu aktif */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1, rootMargin: "0px 0px -5% 0px" }) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  if ("IntersectionObserver" in window) {
    const links = $$("#menu a[href^='#']:not(.dd-m a)");
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
  const instBtns = $$("#inst,#inst2"), ios = $("#ios");
  const canInstall = () => !standalone && (deferredInstall || isIOS);
  const syncInstall = () => instBtns.forEach(b => b.hidden = !canInstall());
  async function doInstall() {
    if (deferredInstall) { deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (e) {} deferredInstall = null; syncInstall(); }
    else if (isIOS) openDlg(ios);
  }
  instBtns.forEach(b => b.addEventListener("click", doInstall));
  $("#iosx").onclick = () => ios.close(); ios.addEventListener("click", e => { if (e.target === ios) ios.close(); });
  document.addEventListener("pwa-ready", syncInstall);
  addEventListener("appinstalled", () => { deferredInstall = null; syncInstall(); });
  syncInstall();

  /* ---------- CHAT ASSISTANT ---------- */
  const chat = $("#chat"), cb = $("#chatB"), cname = $("#chatName"), cform = $("#chatIn"), copts = $("#chatOpts"), cwa = $("#chatWa");
  let userName = "", chatSeq = 0;
  const greet = () => { const h = new Date().getHours(); return h < 11 ? "Selamat pagi" : h < 15 ? "Selamat siang" : h < 18 ? "Selamat sore" : "Selamat malam"; };
  const scrollChat = () => { cb.scrollTop = cb.scrollHeight; };
  function say(text, type = "bot", delay = 0, seq = chatSeq) {
    return new Promise(res => setTimeout(() => {
      if (seq !== chatSeq) return res(false);
      if (type === "user") { const m = document.createElement("div"); m.className = "msg user"; m.textContent = text; cb.appendChild(m); scrollChat(); return res(true); }
      const t = document.createElement("div"); t.className = "msg bot typing"; t.innerHTML = "<i></i><i></i><i></i>"; cb.appendChild(t); scrollChat();
      setTimeout(() => { t.remove(); if (seq !== chatSeq) return res(false); const m = document.createElement("div"); m.className = "msg bot"; m.textContent = text; cb.appendChild(m); scrollChat(); res(true); }, reduce ? 50 : 650);
    }, reduce ? 0 : delay));
  }
  async function openChat() {
    if (!chat.hidden) { closeChat(); return; }
    const seq = ++chatSeq; chat.hidden = false; cb.innerHTML = ""; copts.hidden = true; cwa.hidden = true; cform.hidden = false; cname.value = ""; userName = "";
    let ok = await say(`${greet()}! 👋 Saya Daud, Sales Executive kami.`, "bot", 250, seq); if (!ok) return;
    ok = await say(isOnline() ? "Kami sedang online dan siap membantu Anda 😊" : "Saat ini kami offline 🙏 Pesan Anda akan kami balas segera.", "bot", 200, seq); if (!ok) return;
    ok = await say("Boleh saya tahu nama Anda? 😊", "bot", 200, seq); if (!ok) return;
    cname.focus({ preventScroll: true });
  }
  function closeChat() { if (!chat.hidden) { chat.hidden = true; chatSeq++; } }
  ["#heroChat", "#ctaChat"].forEach(s => $(s).addEventListener("click", e => { e.stopPropagation(); openChat(); }));
  $("#chatX").onclick = closeChat;
  document.addEventListener("click", e => { if (!chat.hidden && !chat.contains(e.target) && !e.target.closest("#heroChat,#ctaChat,.fab")) closeChat(); });

  let fbp = null;
  function loadFirebase() {
    if (!CONFIG.firebase) return Promise.reject();
    if (fbp) return fbp;
    const add = src => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    fbp = add("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js").then(() => add("https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"))
      .then(() => { if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase); return firebase; });
    return fbp;
  }
  const saveLead = nama => { try { loadFirebase().then(fb => fb.database().ref("leads").push({ nama, waktu: new Date().toISOString() })).catch(() => {}); } catch (e) {} };

  cform.addEventListener("submit", async e => {
    e.preventDefault();
    const name = cname.value.trim();
    if (!name) { cname.classList.add("shake"); setTimeout(() => cname.classList.remove("shake"), 450); cname.focus(); return; }
    const seq = chatSeq; userName = name; cform.hidden = true;
    await say(name, "user", 0, seq); saveLead(name);
    let ok = await say(`Senang berkenalan, ${name}! 😊`, "bot", 250, seq); if (!ok) return;
    ok = await say("Anda tertarik dengan layanan yang mana?", "bot", 200, seq); if (!ok) return;
    const topics = ["Website Profesional", "Desain Rumah Modern", "Aplikasi Android", "Sistem Informasi", "Lainnya"];
    copts.innerHTML = topics.map(t => `<button type="button">${esc(t)}</button>`).join(""); copts.hidden = false; scrollChat();
  });
  copts.addEventListener("click", async e => {
    const b = e.target.closest("button"); if (!b) return;
    const topic = b.textContent, seq = chatSeq; copts.hidden = true;
    await say(topic, "user", 0, seq);
    const ok = await say("Siap! Klik tombol di bawah untuk lanjut chat via WhatsApp ya 👇", "bot", 250, seq); if (!ok) return;
    cwa.href = waLink(`Halo Daud, saya ${userName} ingin konsultasi mengenai ${topic}.`); cwa.hidden = false; scrollChat();
  });

  /* ---------- FOOTER: tombol tambahan sudah di-handle; tahan fungsi lama ---------- */
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
