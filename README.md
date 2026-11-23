# M DAUD S.M — Living Sky & Deep Ocean (2026)

Website HTML + CSS + JavaScript murni (tanpa build), siap GitHub Pages, domain tetap `jasadaud.online` (file `CNAME`).

## 1. Perubahan utama
- **Langit & laut hidup** (`sky.js`): membaca jam perangkat pengunjung (`new Date()`), lalu menghitung fase (sunrise, pagi, siang, sore, sunset, twilight, malam), warna langit/laut/awan (interpolasi CSS variables), posisi matahari & bulan, bintang (canvas), bintang jatuh, awan bergerak, ombak berlapis SVG, pantulan cahaya di laut. Update tiap 30 detik, tanpa refresh. Makin scroll ke bawah, laut makin dalam dan gelap.
- Seluruh isi **RAJIB-DIGITAL-v6** diadaptasi ke identitas M DAUD S.M (layanan, keunggulan, portfolio + filter + preview, tentang, proses, FAQ, CTA, kontak, PWA) — tanpa branding Rajib.
- Dari website lama dipertahankan: kontak & nomor WhatsApp, harga layanan, 4 website + 3 video Android + 4 desain SketchUp, testimoni WhatsApp, chat assistant (+ simpan nama ke Firebase), media sosial, footer.
- **Dihapus**: toggle Light/Dark + localStorage tema; panel admin (password tertanam di JS & datanya hanya tersimpan di browser pengunjung, jadi tidak aman/tidak berguna); statistik "simulasi" (angka naik acak, rating 4.9, chat hari ini, slot tersisa) karena bukan data nyata; listener Firebase yang membaca seluruh data `leads` ke console; Font Awesome (diganti SVG inline); awan PNG 3000px (dioptimasi jadi webp).
- Statistik hero (100+, <5 menit, 1,2 rb+) memakai angka dari website lama; ubah di `CONFIG.stats`.

## 2. Struktur folder
```
M-DAUD-OCEAN-2026/
├─ index.html          halaman + SEO + dunia langit/laut (HTML)
├─ style.css           semua gaya
├─ sky.js              engine langit & laut (waktu real-time)
├─ script.js           CONFIG (data) + UI, portfolio, chat, form, PWA
├─ sw.js               service worker (cache)
├─ manifest.webmanifest
├─ CNAME               jasadaud.online
├─ icons/              favicon, ikon PWA
└─ img/                awan, avatar, sosmed, preview.jpg
   ├─ projects/        thumbnail portfolio (800x500 webp)
   ├─ testi/           screenshot testimoni
   └─ arsip/           gambar lama yang tidak dipakai di halaman (cadangan)
```

## 3. Ganti nomor WhatsApp
Buka `script.js`, bagian `CONFIG` paling atas:
`whatsapp: "6285697321423"` (format 62…, tanpa + / 0 di depan) dan `phoneDisplay: "0856-9732-1423"`. Satu tempat saja; semua tombol ikut berubah. Ubah juga `telephone` di JSON-LD `index.html` (cari `+6285697321423`).

## 4. Edit layanan & portfolio
Semua di `CONFIG` pada `script.js`:
- `services` — judul, harga (`price`), poin.
- `projects` — salin satu blok. Website: isi `url` + `img`. Video Android: `kind:"video"`, `yt:"ID_YOUTUBE"`. Desain gambar: `kind:"img"`. Taruh gambar 800x500 `.webp` di `img/projects/`.
- `filter` menentukan tombol kategori; urutan tombol di `filterOrder`.
- `testi`, `skills`, `steps`, `social`, `stats`, `rotate` (subjudul hero).
FAQ ada langsung di `index.html` (cari `id="faqlist"`).

## 5. Upload ke GitHub Pages
1. Upload SEMUA isi folder ini ke root repository (timpa file lama, hapus file lama yang tidak dipakai: `audio/`, `img/hasil*.jpg`, `img/cloud*.png`).
2. Settings → Pages → Deploy from branch → `main` / root. File `CNAME` menjaga domain `jasadaud.online`.
3. Buka lewat `http(s)://` (GitHub Pages atau server lokal Acode). Jangan dibuka sebagai `file://` karena awan memakai CSS mask yang butuh http.

## 6. Perbarui cache setelah update
1. `sw.js` → naikkan `VER` (mis. `daud-ocean-v2`).
2. `index.html` → naikkan `?v=1` pada `style.css`, `sky.js`, `script.js` (dan di daftar `CORE` pada `sw.js`).
3. Pengunjung mendapat versi baru pada kunjungan berikutnya (halaman memakai network-first).

## Pratinjau waktu (untuk uji desain)
Tambahkan `?jam=18:30` di URL, mis. `https://jasadaud.online/?jam=05:50`. Tanpa parameter, situs selalu memakai jam perangkat.

## Catatan keamanan
Chat menyimpan **nama** ke Firebase `leads`. Pastikan Rules Realtime Database melarang pembacaan publik (hanya `.write` untuk `leads`, `.read: false`). Isi `firebase: null` di CONFIG untuk mematikannya.
