/* =====================================================================
   M DAUD S.M — sky.js  ·  Engine "Living Sky & Deep Ocean"
   ---------------------------------------------------------------------
   - Membaca jam LOKAL perangkat (new Date()) → fase langit, posisi
     matahari/bulan, warna langit & laut (interpolasi, bukan ganti class).
   - Update tiap 30 detik + saat tab aktif lagi. Tanpa refresh halaman.
   - Bintang = canvas ringan (berhenti saat siang / tab tidak aktif).
   - Pratinjau waktu (untuk uji desain): tambahkan  ?jam=18:30  di URL.
   ===================================================================== */
(function () {
  'use strict';
  if (window.LivingSky) return;

  var root = document.documentElement, RS = root.style;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(pointer: coarse)').matches;
  var cores = navigator.hardwareConcurrency || 8, mem = navigator.deviceMemory || 8;
  var lite = (coarse && cores <= 4) || mem <= 2;
  if (lite) root.classList.add('lite');

  /* ---------- util ---------- */
  var clamp = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var smooth = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var C = function (h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; };
  var mix = function (a, b, k) {
    if (typeof a === 'number') return lerp(a, b, k);
    var o = [], i; for (i = 0; i < a.length; i++) o.push(lerp(a[i], b[i], k)); return o;
  };
  var rgb = function (c) { return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')'; };
  var trip = function (c) { return Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]); };
  var hex = function (c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); };

  /* ---------- palet per jam (keyframe) ----------
     st/sm/sl/sh = langit atas/tengah/bawah/horizon · o0..o4 = laut dari permukaan ke dasar
     ch/cl = awan terang/gelap · co = opasitas awan · tn = tint kaca · fm = busa · gl = cahaya horizon */
  function K(h, st, sm, sl, sh, o0, o1, o2, o3, o4, ch, cl, co, tn, fm, gl, gop) {
    return { h: h, st: C(st), sm: C(sm), sl: C(sl), sh: C(sh), o0: C(o0), o1: C(o1), o2: C(o2), o3: C(o3), o4: C(o4),
      ch: C(ch), cl: C(cl), co: co, tn: tn, fm: fm, gl: gl, gop: gop };
  }
  var NIGHT = ['#030918', '#081a45', '#102a64', '#1a3b82', '#142f6a', '#0a2050', '#061336', '#030a1c', '#010309', '#9fb2e0', '#34457a', .34, [4, 10, 30], [170, 196, 255], [120, 150, 230], .10];
  var N0 = K.apply(null, [0].concat(NIGHT)), N1 = K.apply(null, [4.5].concat(NIGHT)), N2 = K.apply(null, [19.9].concat(NIGHT)), N3 = K.apply(null, [24].concat(NIGHT));
  var STOPS = [
    N0, N1,
    K(5.2, '#0a1840', '#1c2f6e', '#5a4f8f', '#d98a72', '#7a5f8f', '#2a3a78', '#122052', '#07102c', '#020512', '#d9b4cf', '#6a5a98', .55, [14, 18, 52], [230, 180, 200], [255, 150, 110], .45),   // fajar
    K(5.9, '#1f4f9c', '#5088c8', '#f2a47c', '#ffcb8c', '#eaa583', '#3f80b2', '#1d5088', '#0b2853', '#030d22', '#ffe3c8', '#e8a2a0', .88, [22, 40, 92], [255, 216, 176], [255, 172, 96], .75),   // sunrise
    K(6.9, '#2a78d0', '#62a8ec', '#bfe0fa', '#ffe6b8', '#86d4e2', '#22a0c6', '#0f64a8', '#0a3a74', '#031530', '#ffffff', '#d4e6f8', .95, [10, 46, 104], [255, 255, 255], [255, 236, 190], .42),  // pagi awal
    K(8.6, '#1b6fd6', '#4a9aef', '#9fd0f8', '#cfeaff', '#58c8de', '#169cc4', '#0d62a6', '#082f6a', '#020f28', '#ffffff', '#dae9f9', .96, [8, 44, 102], [255, 255, 255], [255, 244, 214], .26),     // pagi
    K(12, '#1565c8', '#3b8fe6', '#8ec6f5', '#c9e6ff', '#4fd2e4', '#10a4ca', '#0b5fa8', '#072c66', '#020d26', '#ffffff', '#dbe9f8', .97, [8, 42, 98], [255, 255, 255], [255, 246, 220], .20),        // siang
    K(15, '#1966c6', '#4796e0', '#a6cdee', '#f0e0b8', '#58c2d0', '#139ec2', '#0c5fa4', '#082c64', '#020d26', '#fffaf0', '#e4e6ee', .95, [10, 42, 96], [255, 252, 240], [255, 232, 170], .30),        // sore awal
    K(16.6, '#2a62b4', '#5a96d4', '#e4d09c', '#ffd68a', '#d8c48e', '#2c92b6', '#14609a', '#0a2f62', '#030f26', '#fff1d2', '#e6caa4', .92, [18, 44, 92], [255, 226, 170], [255, 206, 122], .55),     // biru keemasan
    K(17.6, '#34407f', '#a24f90', '#f08c5c', '#ffb04a', '#efa066', '#4c4a9e', '#28296c', '#10143a', '#04061a', '#ffc8a0', '#c4709c', .90, [38, 22, 70], [255, 190, 150], [255, 140, 62], .85),       // sunset
    K(18.4, '#161d52', '#3a2f7a', '#a14f86', '#f08a6a', '#8c5088', '#2d2f78', '#171a50', '#0a0d2c', '#03040f', '#c9a0c4', '#5c4a8c', .62, [26, 16, 60], [215, 155, 190], [235, 125, 120], .60),      // senja
    K(19.1, '#0a1238', '#1a2468', '#3b3a86', '#8a5090', '#3a3a86', '#1b2060', '#0d1240', '#060822', '#020309', '#8a90c8', '#3a4278', .45, [10, 14, 45], [150, 170, 240], [160, 110, 190], .28),       // twilight
    N2, N3
  ];

  function palette(t) {
    var i = 0; while (i < STOPS.length - 2 && t >= STOPS[i + 1].h) i++;
    var a = STOPS[i], b = STOPS[i + 1];
    var k = smooth(a.h, b.h, t), o = {}, key;
    for (key in a) if (key !== 'h') o[key] = mix(a[key], b[key], k);
    return o;
  }

  /* ---------- astronomi sederhana ----------
     Menghadap ke laut utara (mis. Teluk Jakarta): matahari terbit di KANAN, terbenam di KIRI. */
  var RISE = 5.6, SET = 18.25, M_RISE = 18.2, M_LEN = 6.0 + 24 - 18.2;
  var sunAlt = function (t) { return Math.sin(Math.PI * clamp((t - RISE) / (SET - RISE), -0.3, 1.3)); };
  var sunU = function (t) { return clamp((t - RISE) / (SET - RISE), 0, 1); };
  function moonU(t) { return ((t - M_RISE + 24) % 24) / M_LEN; }
  var moonAlt = function (u) { return Math.sin(Math.PI * clamp(u, -0.3, 1.3)); };

  function phaseName(t) {
    if (t >= 5 && t < 7) return 'Matahari terbit';
    if (t >= 7 && t < 10) return 'Pagi';
    if (t >= 10 && t < 15) return 'Siang';
    if (t >= 15 && t < 17) return 'Sore';
    if (t >= 17 && t < 18.5) return 'Matahari terbenam';
    if (t >= 18.5 && t < 19) return 'Senja';
    return 'Malam';
  }
  function tzLabel() {
    try {
      var z = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var m = { 'Asia/Jakarta': 'WIB', 'Asia/Pontianak': 'WIB', 'Asia/Makassar': 'WITA', 'Asia/Jayapura': 'WIT' };
      if (m[z]) return m[z];
      var p = new Intl.DateTimeFormat('id-ID', { timeZoneName: 'short' }).formatToParts(new Date()).filter(function (x) { return x.type === 'timeZoneName'; })[0];
      return p ? p.value : z;
    } catch (e) { return ''; }
  }

  /* waktu: jam perangkat; ?jam=HH:MM hanya untuk pratinjau desain */
  var FORCE = null;
  try {
    var q = new URLSearchParams(location.search).get('jam');
    if (q) { var pm = q.replace(',', '.').split(':'); FORCE = pm.length > 1 ? (+pm[0] + (+pm[1]) / 60) : +pm[0]; if (isNaN(FORCE)) FORCE = null; }
  } catch (e) {}
  function nowHours() {
    if (FORCE !== null) return ((FORCE % 24) + 24) % 24;
    var d = new Date(); return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  }

  /* ---------- elemen ---------- */
  var scene = $('scene'), sunEl = $('sun'), moonEl = $('moon'), cloudsEl = $('clouds'), wavesEl = $('waves');
  var gSun = $('glintSun'), gMoon = $('glintMoon'), shade = $('shade'), shoot = $('shoot'), cvs = $('stars');
  var metaTheme = document.querySelector('meta[name=theme-color]');
  if (!scene || !sunEl) return;
  var ctx = cvs && cvs.getContext ? cvs.getContext('2d') : null;

  var W = 0, H = 0, hz = 0, seaH = 0, apexY = 96, lastW = 0, lastH = 0;
  var starA = 0, tr = 0, stars = [], cw = 0, chh = 0;
  var rnd = function () { return Math.random(); };

  /* ---------- layout & pembangunan elemen (sekali / saat resize) ---------- */
  function layout() {
    W = innerWidth; H = innerHeight; lastW = W; lastH = H;
    var small = W < 700;
    hz = Math.round(H * (small ? 0.39 : 0.46));
    seaH = Math.round(H * 2.4);
    apexY = Math.max(98, hz * 0.27);
    RS.setProperty('--hz', hz + 'px'); RS.setProperty('--sea-h', seaH + 'px'); RS.setProperty('--vh', H + 'px');
    buildStars(); buildGlints();
  }

  function buildStars() {
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
    cw = W; chh = hz;
    cvs.width = Math.round(cw * dpr); cvs.height = Math.round(chh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = clamp(Math.round(cw * chh / (lite ? 14000 : 8200)), 55, lite ? 110 : 230), i, cols = ['255,255,255', '200,220,255', '255,236,205'];
    stars = [];
    for (i = 0; i < n; i++) {
      var y = Math.pow(rnd(), 1.25) * chh, big = rnd() > 0.93;
      stars.push({ x: rnd() * cw, y: y, r: big ? 1.2 + rnd() * .7 : .35 + rnd() * .75, b: .45 + rnd() * .55,
        sp: .0008 + rnd() * .0026, ph: rnd() * 6.28, ext: 1 - 0.88 * Math.pow(y / chh, 2.4), c: cols[(rnd() * 3) | 0], big: big });
    }
    drawStars(0);
  }
  function drawStars(ts) {
    if (!ctx) return;
    ctx.clearRect(0, 0, cw, chh);
    if (starA < 0.01) return;
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], tw = reduce ? 1 : .55 + .45 * Math.sin(ts * s.sp + s.ph), a = s.b * tw * starA * s.ext;
      if (a < .02) continue;
      ctx.fillStyle = 'rgba(' + s.c + ',' + a.toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      if (s.big) { ctx.fillStyle = 'rgba(' + s.c + ',' + (a * .22).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.4, 0, 6.2832); ctx.fill(); }
    }
  }

  var raf = 0, lastTs = 0;
  function loop(ts) { raf = requestAnimationFrame(loop); if (ts - lastTs < 50) return; lastTs = ts; drawStars(ts); }
  function syncLoop() {
    var run = !reduce && starA > 0.01 && !document.hidden && tr < hz;
    if (run && !raf) raf = requestAnimationFrame(loop);
    else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function buildGlints() {
    var n = W < 700 ? 15 : lite ? 12 : 24, maxW = clamp(W * 0.22, 110, 330);
    [gSun, gMoon].forEach(function (el) {
      if (!el) return; el.textContent = '';
      var frag = document.createDocumentFragment(), i;
      for (i = 0; i < n; i++) {
        var f = (i + .5) / n, b = document.createElement('b'), du = 2 + rnd() * 3.4;
        b.style.cssText = '--y:' + (Math.pow(f, 1.55) * 100).toFixed(1) + '%;--w:' + (lerp(maxW * .1, maxW, Math.pow(f, .9)) * (.6 + .6 * rnd())).toFixed(1) +
          ';--h:' + lerp(1.6, 5.2, f).toFixed(1) + ';--j:' + ((rnd() - .5) * maxW * .2).toFixed(1) + ';--f:' + (1 - Math.pow(f, 1.3) * .85).toFixed(2) +
          ';--du:' + du.toFixed(2) + 's;--de:' + (-rnd() * du).toFixed(2) + 's';
        frag.appendChild(b);
      }
      el.appendChild(frag);
    });
  }

  function buildWaves() {
    var L = [ // top(vh), tinggi(vh), periode, amplitudo, detik, arah, opasitas
      [.006, .05, 144, 3, 64, 'normal', .55], [.03, .06, 180, 4, 50, 'reverse', .6], [.07, .08, 240, 5, 42, 'normal', .65],
      [.12, .10, 360, 7, 34, 'reverse', .7], [.19, .13, 360, 9, 27, 'normal', .75], [.28, .16, 720, 12, 22, 'reverse', .8], [.40, .20, 720, 15, 18, 'normal', .85]];
    if (lite || innerWidth < 700) L = innerWidth < 700 && !lite ? L.filter(function (_, i) { return i !== 1 && i !== 4; }) : [L[0], L[2], L[4], L[6]];
    wavesEl.innerHTML = L.map(function (w) {
      var P = w[2], A = w[3], d = 'M0 50', x;
      for (x = 0; x < 1440; x += P) d += 'Q' + (x + P / 4) + ' ' + (50 - A * 2) + ' ' + (x + P / 2) + ' 50T' + (x + P) + ' 50';
      return '<svg class="wave" viewBox="0 0 1440 100" preserveAspectRatio="none" style="top:calc(var(--vh)*' + w[0] + ');height:calc(var(--vh)*' + w[1] +
        ');--sp:' + w[4] + 's;--dir:' + w[5] + ';opacity:' + w[6] + '"><path class="f" d="' + d + 'V100H0Z"/><path class="l" d="' + d + '"/></svg>';
    }).join('');
  }

  function buildClouds() {
    var CL = [ // img, lebar(vw), top(%), durasi(s), opasitas, posisi awal(0..1)
      [3, 46, 8, 210, .95, .05], [1, 34, 30, 260, .85, .3], [2, 28, 52, 320, .7, .55], [1, 22, 68, 400, .55, .8],
      [3, 26, 18, 300, .8, .2], [2, 40, 40, 240, .7, .65], [1, 18, 80, 480, .45, .45]];
    var AR = { 1: 2.564, 2: 1.933, 3: 1.634 }, small = innerWidth < 700, k = small ? 1.75 : 1;
    if (lite) CL = CL.slice(0, 5);
    cloudsEl.innerHTML = CL.map(function (c) {
      return '<i class="cloud" style="--img:url(img/cloud' + c[0] + '.webp);--ar:' + AR[c[0]] + ';--w:' + (c[1] * k).toFixed(0) + ';--t:' + c[2] + ';--o:' + c[4] +
        ';--du:' + c[3] + 's;--de:-' + (c[3] * c[5]).toFixed(0) + 's;--x0:' + Math.round(lerp(-25, 95, c[5])) + '"></i>';
    }).join('');
  }

  /* ---------- update utama ---------- */
  var first = true, infoEl = $('skyInfo');
  function update() {
    var t = nowHours(), alt = sunAlt(t), p = palette(t);

    RS.setProperty('--sky-top', rgb(p.st)); RS.setProperty('--sky-mid', rgb(p.sm)); RS.setProperty('--sky-low', rgb(p.sl)); RS.setProperty('--sky-hz', rgb(p.sh));
    RS.setProperty('--oc-0', rgb(p.o0)); RS.setProperty('--oc-1', rgb(p.o1)); RS.setProperty('--oc-2', rgb(p.o2)); RS.setProperty('--oc-3', rgb(p.o3)); RS.setProperty('--oc-4', rgb(p.o4));
    RS.setProperty('--cloud-hi', rgb(p.ch)); RS.setProperty('--cloud-lo', rgb(p.cl)); RS.setProperty('--cloud-op', p.co.toFixed(3));
    RS.setProperty('--tint', trip(p.tn)); RS.setProperty('--foam', trip(p.fm)); RS.setProperty('--glow', trip(p.gl));
    RS.setProperty('--glow-op', (p.gop * (0.35 + 0.65 * smooth(-0.35, -0.02, alt))).toFixed(3));
    if (metaTheme) metaTheme.setAttribute('content', hex(p.st));

    /* matahari */
    var u = sunU(t), sx = W * lerp(.88, .12, u), sy = hz - alt * (hz - apexY);
    var warm = 1 - smooth(0, .55, alt), sunOp = smooth(-0.32, -0.04, alt);
    RS.setProperty('--sun-c', rgb(mix(C('#fff3c2'), C('#ff7f33'), warm)));
    sunEl.style.transform = 'translate3d(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px,0) scale(' + (1 + .4 * warm).toFixed(3) + ')';
    sunEl.style.opacity = sunOp.toFixed(3);

    /* bulan: hanya malam, tidak pernah bareng matahari terang */
    var mu = moonU(t), ma = moonAlt(mu), nightK = smooth(0.02, -0.16, alt), moonOp = nightK * smooth(-0.06, 0.1, ma);
    var mx = W * lerp(.88, .12, clamp(mu, 0, 1)), my = hz - ma * (hz - apexY - 26);
    moonEl.style.transform = 'translate3d(' + mx.toFixed(1) + 'px,' + my.toFixed(1) + 'px,0) scale(' + (1 + .22 * (1 - clamp(ma, 0, 1))).toFixed(3) + ')';
    moonEl.style.opacity = moonOp.toFixed(3);

    /* cahaya horizon mengikuti benda langit utama */
    RS.setProperty('--lx', lerp(sx, mx, nightK).toFixed(0) + 'px');

    /* pantulan di laut */
    var lenSun = (0.62 + 0.38 * warm) * Math.max(220, H * .52);
    gSun.style.height = lenSun.toFixed(0) + 'px';
    gSun.style.transform = 'translate3d(' + sx.toFixed(1) + 'px,0,0)';
    gSun.style.opacity = (0.95 * smooth(-0.03, 0.1, alt)).toFixed(3);
    gSun.style.setProperty('--gc', trip(mix([255, 240, 208], [255, 160, 84], warm)));
    gMoon.style.height = Math.max(200, H * .42).toFixed(0) + 'px';
    gMoon.style.transform = 'translate3d(' + mx.toFixed(1) + 'px,0,0)';
    gMoon.style.opacity = (0.8 * moonOp).toFixed(3);

    /* bintang */
    starA = smooth(-0.02, -0.22, alt);
    RS.setProperty('--star-op', starA.toFixed(3));
    if (reduce || first) drawStars(performance.now());
    syncLoop();

    if (infoEl) {
      var h = Math.floor(t), m = Math.floor((t - h) * 60);
      infoEl.textContent = (FORCE !== null ? 'Pratinjau waktu: ' : 'Langit & laut mengikuti jam perangkat Anda: ') +
        ('0' + h).slice(-2) + '.' + ('0' + m).slice(-2) + ' ' + tzLabel() + ' · ' + phaseName(t);
    }
    root.dataset.phase = phaseName(t);
    first = false;
  }

  /* ---------- scroll: laut makin dalam, langit naik pelan (parallax) ---------- */
  var ticking = false, K_PAR = 0.7;
  function apply() {
    ticking = false;
    var y = window.pageYOffset || 0, maxTr = Math.max(0, hz + seaH - H);
    tr = Math.min(y * K_PAR, maxTr);
    scene.style.transform = 'translate3d(0,' + (-tr).toFixed(1) + 'px,0)';
    shade.style.opacity = Math.min(0.66, (y / (H * 1.15)) * 0.7).toFixed(3);
    syncLoop();
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }

  /* ---------- bintang jatuh ---------- */
  var shootTm = 0;
  function fire() {
    if (!shoot || !shoot.animate) return;
    var x = W * (.45 + rnd() * .5), y = hz * (.06 + rnd() * .3), dx = -(260 + rnd() * 200), ang = 18 + rnd() * 14;
    var dy = -dx * Math.tan(ang * Math.PI / 180);
    shoot.animate([
      { opacity: 0, transform: 'translate3d(' + x + 'px,' + y + 'px,0) rotate(' + (-ang) + 'deg) scaleX(.2)' },
      { opacity: 1, offset: .18 },
      { opacity: 0, transform: 'translate3d(' + (x + dx) + 'px,' + (y + dy) + 'px,0) rotate(' + (-ang) + 'deg) scaleX(1)' }
    ], { duration: 1000 + rnd() * 600, easing: 'ease-out' });
  }
  function scheduleShoot() {
    clearTimeout(shootTm);
    shootTm = setTimeout(function () {
      if (starA > 0.7 && !document.hidden && !reduce && tr < hz * .6) fire();
      scheduleShoot();
    }, 7000 + rnd() * 13000);
  }

  /* ---------- siklus hidup ---------- */
  var timer = 0;
  function init() {
    root.classList.add('notrans');
    layout(); buildWaves(); buildClouds(); update(); apply();
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('notrans'); }); });
    timer = setInterval(function () { if (!document.hidden) update(); }, 30000);
    if (!reduce) scheduleShoot();
    addEventListener('scroll', onScroll, { passive: true });
    var rt = 0;
    addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (innerWidth === lastW && Math.abs(innerHeight - lastH) < lastH * 0.12) return; // abaikan bar alamat HP
        root.classList.add('notrans'); layout(); buildClouds(); update(); apply();
        requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('notrans'); }); });
      }, 180);
    });
    document.addEventListener('visibilitychange', function () {
      root.classList.toggle('paused', document.hidden);
      if (!document.hidden) { update(); apply(); } else syncLoop();
    });
    addEventListener('pageshow', function () { update(); });
  }

  window.LivingSky = { update: update, phase: function () { return phaseName(nowHours()); }, hours: nowHours };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
