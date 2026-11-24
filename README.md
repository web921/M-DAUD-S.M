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

## v15 — Optimasi performa (tampilan tetap)
- Animasi CSS aktif turun dari 106 menjadi ±17–30 saat scroll (langit, permukaan laut, dasar laut, kartu foto dijeda saat tidak terlihat; set kilau matahari/bulan yang tidak dipakai dijeda).
- Canvas laut dalam: partikel digambar per kelompok, ikan tanpa save/restore, resolusi lebih hemat, FPS canvas turun otomatis jika perangkat lambat.
- Governor otomatis: jika FPS nyata < 38 (atau mode Hemat Data), website pindah ke mode ringan (`html.lite`) tanpa mengubah desain utama.
- Gambar awan 1100px → 800px (−100 KB), cover art di dalam mp3 dibuang (−0,3 MB), font Google dimuat tanpa memblokir render, bagian bawah halaman dirender saat mendekat (`content-visibility`), blur kaca 14px → 10px, lagu berikutnya di-preload saat musik diputar.

## v16
- Hewan laut dikurangi: ikan 1 kawanan kecil, ubur-ubur 1 (HP) / 2 (PC), rumput laut & burung lebih sedikit, monster muncul jarang (jeda 30–60 dtk), partikel -45%, canvas 25 FPS.
- Suasana lebih nyata: vinyet sinematik lembut + butiran halus statis (`img/grain.webp`), tanpa animasi tambahan.

## v17
- Tampilan mockup 3 jendela di hero dihapus; hero kini satu kolom, rata tengah (HP & PC).
- Tekstur air baru: `img/caustic-v2.webp` (jaring cahaya caustics seamless 512px, ±49 KB), dua lapis bergerak berlawanan arah dengan skala berbeda; tetap hanya 2 animasi transform.

## v18 — Polish tampilan (tetap ringan)
- Kartu (keunggulan, layanan, proses, portfolio, kontak) kini kaca bening berwarna: tepi menyala per-kartu (cyan/ungu/hijau/kuning/merah muda/biru), sorot sudut, ikon berwarna, bayangan lembut.
- Judul `em` lebih cerah (cyan → biru → ungu); eyebrow bertitik cahaya; garis cahaya kecil di bawah judul seksi.
- Cahaya warna statis di belakang tiap seksi (memecah latar gelap polos) — tanpa animasi.
- Grid keunggulan: 2×2 di HP, 4 sejajar ≥860px (tidak ada lagi kartu yatim 3+1 di tablet / mode desktop HP).
- Hero: pita layanan berjalan (1 animasi transform, otomatis berhenti saat tidak terlihat), badge & statistik lebih jelas.
- Tombol musik/WhatsApp/ke-atas di HP diperkecil agar tidak menutup teks.
- Tidak ada gambar, font, atau library baru. Versi cache dinaikkan ke v18.

## v19
- Tulisan berjalan di hero dihapus.
- Hewan laut (ikan, ubur-ubur, monster) TIDAK tampil di permukaan/hero; muncul perlahan setelah scroll turun ke kedalaman (`--cr` / `DeepState.cr` dari sky.js). Marine snow di permukaan juga dikurangi.
- Monster lebih nyata: tepi lembut seperti air keruh, punggung diterangi cahaya permukaan & perut gelap, rim light halus; kabut air biru bertingkat di kedalaman.

## v20 — permukaan
- Horizon dihitung dari posisi judul hero (tepat di bawah judul) sehingga garis laut tidak memotong tulisan; dihitung ulang setelah font termuat.
- Kapal horizon lebih kecil dan pucat berkabut (tidak lagi menabrak judul).
- Pola jaring cahaya (caustics) & berkas sinar disembunyikan di permukaan, muncul bertahap saat menyelam (`--cr`).
- Pantulan langit di air dekat horizon (gradasi statis).

## v21 — Scroll mulus & hewan laut dikurangi
- **Parallax langit/laut kini dijalankan browser** (CSS scroll-timeline, di compositor) — tidak lagi dikejar JavaScript tiap frame, jadi tidak patah-patah. Browser lama otomatis memakai cara JS yang lama (hasil posisi identik, sudah diuji).
- **Hewan laut dikurangi**: ubur-ubur 3 → 1 (hanya PC, tidak ada di HP); burung 3 → 2 (HP: 1); rumput laut 5 → 3 (HP: 2); titik cahaya dasar laut 6 → 4 (HP: 3); ikan 10 → 6 (HP: 4); monster raksasa hanya di PC dan muncul tiap ±70–130 detik (di HP dimatikan; atur lewat `SHOW_MONSTER_MOBILE` di atas `deep.js`).
- **Partikel**: salju laut 38 → 24 (HP: 12), plankton 9 → 6 (HP: 3); kanvas HP 20 FPS; tubuh monster 30 → 22 ruas.
- **Penyebab patah-patah diperbaiki**: variabel CSS `--cr/--dv` tidak lagi diubah saat scroll (memicu hitung ulang seluruh lapisan laut) — opasitas diatur langsung; blur pada navbar/tombol menu di HP dihapus; `content-visibility` dihapus (hitch saat bagian bawah dirender); filter drop-shadow pada ubur-ubur & rumput laut dihapus; caustics 2 lapis → 1 lapis di HP; berkas sinar 4 → 2 di HP; awan HP 7 → 5; kilau matahari/bulan HP 15 → 9.
- Cache dinaikkan ke v21 (`?v=21`, `sw.js`).
