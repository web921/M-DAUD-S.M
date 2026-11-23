# JasaDaud.online — Living Sky & Deep Ocean

Isi website sama dengan RAJIB-DIGITAL-v6 (menu, hero, layanan, 19 portfolio, tentang, proses, FAQ, CTA, kontak, footer). Tampilan & konsep tetap langit/laut hidup (`sky.js`) mengikuti jam perangkat.

- Semua data (brand, WhatsApp, layanan, portfolio, skills, langkah) ada di `CONFIG` paling atas `script.js`. Nomor WhatsApp: `whatsapp` (+ `telephone` di JSON-LD `index.html`).
- FAQ ada di `index.html` (`id="faqlist"`) dan JSON-LD FAQ.
- Domain tetap `jasadaud.online` (file `CNAME`, canonical, og:url).
- Upload SEMUA isi folder ke root repo; hapus file lama (`img/testi`, `img/arsip`, dll).
- Setelah update: naikkan `VER` di `sw.js` dan `?v=` di `index.html` (sekarang v11).
- Uji waktu: `?jam=18:30` atau `?jam=05:00&speed=3600`.


## Ocean Mystery 2026
Lapisan `.depths` (index.html, style.css, sky.js): siluet Titanic SVG, leviathan, terumbu, ikan, partikel (6-18), sinar cahaya. Visibilitas `--deep-op` otomatis mengikuti jam (pagi samar, malam jelas). Parallax lembut via `data-k`.


## v8 — Siluet terlihat
Titanic: muncul di horizon (langit) dan sebagai bayangan di dasar laut (`.wreck`). Leviathan: bayangan raksasa berenang (`.levi`) + monster yang muncul ke permukaan tiap ±64 detik (`.nwrap`). Lapisan `#abyss` menempel ke layar setelah horizon lewat sehingga selalu terlihat saat scroll. Tambahan: burung camar (siang), kabut horizon, awan kembali melintasi langit (bug keyframes `drift` diperbaiki).


## v9 — Laut dalam hidup
- **Monster baru** (`deep.js`): leviathan/ular laut digambar di canvas dengan tulang punggung bergelombang (tubuh meliuk seperti berenang), kepala bertaring, mata menyala, duri punggung, sirip, ekor, dan titik bioluminescent. Monster **hanya berenang di kedalaman**, tidak pernah naik ke permukaan (monster `.nwrap` yang lama dihapus). Arah renang bergantian kiri/kanan.
- **Laut dalam**: caustics (`img/caustic.webp`), berkas cahaya bergoyang, kawanan ikan, 3 ubur-ubur bercahaya, salju laut, plankton menyala, gelembung dari dasar laut, vignette.
- **Dasar laut + bangkai Titanic**: naik dari bawah layar saat scroll mendekati akhir halaman. Indikator kedalaman 0–3.800 m di sisi kanan (PC ≥1200px).
- **Tampilan**: hero PC dua kolom, bulan lebih detail, kaca dengan kilau tepi, mockup melayang pelan. Di HP, blur kaca dimatikan agar ringan.
- **Ringan**: satu canvas ±30 FPS (20 FPS di HP lemah), berhenti saat tab tidak aktif / `prefers-reduced-motion`; mode `lite` otomatis mengurangi ikan, partikel & ubur-ubur.


## v10
- **Loading screen 4 detik** (inline di `index.html`, id `#loader`): kapal Titanic di permukaan, layar "menyelam" ke dasar laut, logo berdenyut, penghitung kedalaman 0 → 3.800 m, bar progres, lalu memudar. Ubah durasi lewat variabel `D` pada skrip loader dan durasi animasi `3.9s/3.5s` di CSS `#ld-css`.
- **Preview WhatsApp**: `img/preview-v3.jpg` (poster, < 300 KB) + judul & deskripsi baru di meta og/twitter. Jika preview lama masih muncul di WhatsApp, kirim link dengan tambahan `?v=3` (cache WhatsApp per-URL).
- **Foto profil** bagian Tentang: `img/daud.webp` (sudah diolah: nuansa biru laut, cahaya tepi cyan, memudar ke kedalaman) di kartu `.pcard`.

## v11
- Preview WhatsApp: `img/preview-v3.jpg` (1200×630). Kirim link dengan `?v=3` jika preview lama masih tersangkut di cache WhatsApp.
- Musik: playlist `audio/lagu_01.mp3` → `audio/lagu_02.mp3` otomatis berpindah, lalu kembali ke lagu_01. Setiap halaman dimuat ulang (atau musik dihentikan lalu diputar lagi) selalu mulai dari lagu_01. Browser mewajibkan satu ketukan pada tombol musik untuk memulai suara.

## v12
- Kartu foto "Tentang" diperbaiki: foto diolah ulang (halo putih di tepi rambut hilang, cahaya tepi lebih halus), lingkaran cahaya di belakang kepala, lantai cahaya, nama + status "Siap menerima project", statistik kaca, badge "19 proyek nyata" di tepi atas kartu.

## v14
- Loading screen dibuat jauh lebih halus: seluruh animasi hanya memakai transform/opacity (GPU), tanpa blur/blend berat; isi website disembunyikan selama loading agar tidak membebani HP; garis sambungan gelombang dihilangkan; teks kedalaman diperbarui hemat.
