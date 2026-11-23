/* =====================================================================
   JasaDaud.online — deep.js  ·  Kehidupan laut dalam (canvas ringan)
   ---------------------------------------------------------------------
   Satu <canvas id="deep"> menggambar: monster laut (leviathan) yang berenang
   di kedalaman dengan gerak tubuh bergelombang, kawanan ikan, salju laut
   (marine snow), plankton bercahaya, dan gelembung dari dasar laut.
   - Monster TIDAK pernah naik ke permukaan; ia hanya berenang di kedalaman.
   - Berhenti otomatis saat tab tidak aktif / pengguna memilih "reduce motion".
   - HP lemah (lite): jumlah partikel & FPS dikurangi.
   - State (terang-gelap, kedalaman scroll) dibaca dari window.DeepState (sky.js).
   ===================================================================== */
(function () {
  'use strict';
  var cv = document.getElementById('deep');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(pointer: coarse)').matches;
  var cores = navigator.hardwareConcurrency || 8, mem = navigator.deviceMemory || 8;
  var lite = (coarse && cores <= 4) || mem <= 2;
  var ST = window.DeepState = window.DeepState || { nk: .8, day: 0, p: 0, vis: true };
  var TAU = Math.PI * 2, rnd = Math.random;
  var clamp = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var sm = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  var W = 0, H = 0, dpr = 1, small = false;
  var snow = [], fish = [], bubbles = [], plank = [];
  var mon = { on: false };

  /* ---------- ukuran & isi ---------- */
  function size() {
    W = cv.clientWidth || innerWidth; H = cv.clientHeight || innerHeight; small = W < 700;
    dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }
  function build() {
    var i, nS = lite ? 22 : small ? 38 : 70, nP = lite ? 6 : small ? 12 : 22;
    snow = []; plank = []; fish = [];
    for (i = 0; i < nS; i++) {
      var z = rnd();                       // 0 = jauh, 1 = dekat
      snow.push({ x: rnd() * W, y: rnd() * H, z: z, r: .5 + z * 1.7, vy: 3 + z * 9, ph: rnd() * TAU, a: .12 + z * .32 });
    }
    for (i = 0; i < nP; i++) plank.push({ x: rnd() * W, y: rnd() * H, ph: rnd() * TAU, sp: .6 + rnd() * 1.4, r: .8 + rnd() * 1.2, vx: (rnd() - .5) * 5, vy: (rnd() - .5) * 3 });
    /* dua kawanan ikan: satu di lapisan atas, satu di tengah (arah berlawanan) */
    school(lite ? 8 : small ? 12 : 20, .2, 1, 0);
    if (!lite) school(small ? 9 : 14, .5, -1, .5);
    spawnMon(true);
  }
  function school(n, yy, dir, off) {
    var cx = { n: n, dir: dir, y0: H * yy, ya: H * .05, spd: 24 + rnd() * 12, t: off, f: [] }, i;
    for (i = 0; i < n; i++) cx.f.push({ ox: (rnd() - .5) * 150, oy: (rnd() - .5) * 70, ph: rnd() * TAU, s: 8 + rnd() * 6, sp: 5 + rnd() * 3 });
    fish.push(cx);
  }

  /* ---------- MONSTER: tulang punggung bergelombang + kepala + sirip ---------- */
  var NS = 30;
  function spawnMon(initial) {
    var base = small ? W * 1.15 : Math.min(W * .8, 1180);
    mon.sc = .88 + rnd() * .24; mon.L = base * mon.sc;
    mon.dur = (small ? 78 : 100) + rnd() * 25;
    mon.u = initial ? .34 : 0;
    mon.y0 = H * (.3 + rnd() * .3); mon.ya = H * (.025 + rnd() * .03); mon.yph = rnd() * TAU;
    mon.dir = initial ? 1 : (rnd() < .5 ? 1 : -1);
    mon.on = true; mon.wait = 0; mon.ph = rnd() * TAU;
  }
  var sxA = new Float32Array(NS), syA = new Float32Array(NS), nxA = new Float32Array(NS), nyA = new Float32Array(NS), wA = new Float32Array(NS);

  function drawMon(time, k) {
    var L = mon.L, Wm = L * .058, i, s, u = mon.u;
    var hx = lerp(-.12 * L, W + 1.12 * L, u);
    var cy = mon.y0 + mon.ya * Math.sin(u * TAU * 1.25 + mon.yph);
    var slope = mon.ya * Math.cos(u * TAU * 1.25 + mon.yph) * TAU * 1.25 / (W + 1.24 * L);
    var ang = Math.atan(slope);
    var wph = time * 1.15 + mon.ph;
    /* tulang punggung (lokal: kepala di (0,0), badan memanjang ke -x) */
    for (i = 0; i < NS; i++) {
      s = i / (NS - 1);
      var amp = L * .062 * (.16 + .84 * Math.pow(s, 1.15));
      syA[i] = amp * Math.sin(wph - s * 5.6);
      sxA[i] = -s * L;
    }
    for (i = 0; i < NS; i++) {
      var a = Math.max(0, i - 1), b = Math.min(NS - 1, i + 1), tx = sxA[b] - sxA[a], ty = syA[b] - syA[a], l = Math.hypot(tx, ty) || 1;
      tx /= l; ty /= l; nxA[i] = -ty; nyA[i] = tx;          // normal mengarah ke atas (y negatif)
      s = i / (NS - 1);
      wA[i] = Wm * (.5 + .5 * sm(0, .2, s)) * Math.pow(1 - s * .985, .78) * (1 + .05 * Math.sin(s * 18 - wph));
    }
    ctx.save();
    ctx.translate(mon.dir < 0 ? W - hx : hx, cy); ctx.scale(mon.dir, 1); ctx.rotate(ang);
    var topLit = k.rim;

    /* sirip jauh (di belakang badan) */
    fin(.27, -1, L * .1, wph + 1.2, .55, k, true); fin(.56, -1, L * .07, wph + .3, .55, k, true);

    /* badan */
    var g = ctx.createLinearGradient(0, -Wm * 1.2, 0, Wm * 1.4);
    g.addColorStop(0, 'rgba(2,7,18,' + k.a + ')'); g.addColorStop(.55, 'rgba(2,6,15,' + k.a + ')'); g.addColorStop(1, 'rgba(10,30,58,' + (k.a * .95) + ')');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(sxA[0] + nxA[0] * wA[0], syA[0] + nyA[0] * wA[0]);
    for (i = 1; i < NS; i++) ctx.lineTo(sxA[i] + nxA[i] * wA[i], syA[i] + nyA[i] * wA[i]);
    for (i = NS - 1; i >= 0; i--) ctx.lineTo(sxA[i] - nxA[i] * wA[i] * .9, syA[i] - nyA[i] * wA[i] * .9);
    ctx.closePath(); ctx.fill();

    /* duri punggung */
    ctx.beginPath();
    for (i = 3; i < NS - 2; i += 1) {
      s = i / (NS - 1); if (s > .86) break;
      var bx = sxA[i] + nxA[i] * wA[i] * .96, by = syA[i] + nyA[i] * wA[i] * .96, hh = wA[i] * (.5 + .45 * Math.sin(i * 1.7)) * (1.1 - s * .4);
      ctx.moveTo(bx + L * .012, by); ctx.lineTo(bx + nxA[i] * hh + L * .02, by + nyA[i] * hh); ctx.lineTo(bx - L * .014, by);
    }
    ctx.fillStyle = 'rgba(2,7,18,' + k.a + ')'; ctx.fill();

    /* cahaya tepi atas (rim light) */
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(sxA[1] + nxA[1] * wA[1], syA[1] + nyA[1] * wA[1]);
    for (i = 2; i < NS - 1; i++) ctx.lineTo(sxA[i] + nxA[i] * wA[i], syA[i] + nyA[i] * wA[i]);
    ctx.strokeStyle = 'rgba(120,215,255,' + (topLit * .1).toFixed(3) + ')'; ctx.lineWidth = Wm * .22; ctx.stroke();
    ctx.strokeStyle = 'rgba(150,230,255,' + (topLit * .42).toFixed(3) + ')'; ctx.lineWidth = 1.3; ctx.stroke();

    /* rusuk / sisik samar */
    ctx.strokeStyle = 'rgba(90,170,230,' + (k.rim * .1).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath();
    for (i = 4; i < NS - 5; i += 2) { ctx.moveTo(sxA[i] + nxA[i] * wA[i] * .8, syA[i] + nyA[i] * wA[i] * .8); ctx.lineTo(sxA[i] - nxA[i] * wA[i] * .6, syA[i] - nyA[i] * wA[i] * .6); }
    ctx.stroke();

    /* titik bioluminescent di sisi perut */
    for (i = 3; i < NS - 3; i += 2) {
      var pulse = .35 + .65 * Math.max(0, Math.sin(time * 1.4 - i * .55 + mon.ph));
      var dx = sxA[i] - nxA[i] * wA[i] * .5, dy = syA[i] - nyA[i] * wA[i] * .5, al = k.bio * pulse;
      ctx.fillStyle = 'rgba(80,235,255,' + (al * .13).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(dx, dy, 6.5, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(170,250,255,' + al.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(dx, dy, 1.5, 0, TAU); ctx.fill();
    }

    /* ekor (sirip vertikal) */
    var e = NS - 1, ex = sxA[e], ey = syA[e], tnx = nxA[e], tny = nyA[e], tl = L * .095, tx2 = sxA[e] - sxA[e - 2], ty2 = syA[e] - syA[e - 2], tlen = Math.hypot(tx2, ty2) || 1; tx2 /= tlen; ty2 /= tlen;
    ctx.fillStyle = 'rgba(3,9,22,' + k.a + ')';
    ctx.beginPath();
    ctx.moveTo(ex - tx2 * L * .035, ey - ty2 * L * .035);
    ctx.quadraticCurveTo(ex + tnx * tl * .6 + tx2 * tl * .2, ey + tny * tl * .6 + ty2 * tl * .2, ex + tnx * tl + tx2 * tl * .85, ey + tny * tl + ty2 * tl * .85);
    ctx.quadraticCurveTo(ex + tx2 * tl * .35, ey + ty2 * tl * .35, ex - tnx * tl * .75 + tx2 * tl * .7, ey - tny * tl * .75 + ty2 * tl * .7);
    ctx.quadraticCurveTo(ex - tnx * tl * .4 + tx2 * tl * .1, ey - tny * tl * .4 + ty2 * tl * .1, ex - tx2 * L * .035, ey - ty2 * L * .035);
    ctx.fill();
    ctx.strokeStyle = 'rgba(130,220,255,' + (topLit * .3).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.stroke();

    /* sirip dekat */
    fin(.27, 1, L * .11, wph, 1, k, false); fin(.56, 1, L * .075, wph - .9, 1, k, false);

    head(time, k);
    ctx.restore();
  }

  function fin(s, side, len, ph, alpha, k, far) {
    var idx = Math.round(s * (NS - 1)), x = sxA[idx], y = syA[idx] - nyA[idx] * wA[idx] * .72;
    var sw = .5 * Math.sin(ph * 1.0) + .25;                   // sudut kepakan
    var ex = x - len * (.5 + sw * .25), ey = y + len * (.72 - sw * .12);
    ctx.fillStyle = far ? 'rgba(2,8,20,' + (k.a * .8).toFixed(3) + ')' : 'rgba(3,10,24,' + k.a + ')';
    ctx.beginPath(); ctx.moveTo(x + len * .16, y);
    ctx.quadraticCurveTo(x + len * .02, y + len * .6, ex, ey);
    ctx.quadraticCurveTo(x - len * .5, y + len * .3, x - len * .34, y - len * .02);
    ctx.closePath(); ctx.fill();
    if (!far) { ctx.strokeStyle = 'rgba(130,220,255,' + (k.rim * .22).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.stroke(); }
  }

  function head(time, k) {
    var L = mon.L, Lh = L * .15, Hh = L * .088;
    var fx = -(sxA[1] - sxA[0]), fy = -(syA[1] - syA[0]), fa = Math.atan2(fy, fx);
    var mouth = .09 + .07 * Math.sin(time * .8 + mon.ph);
    ctx.save(); ctx.translate(sxA[0], syA[0]); ctx.rotate(fa);
    /* leher -> kepala (menyatu dengan badan) */
    var w0 = wA[0];
    ctx.fillStyle = 'rgba(2,7,18,' + k.a + ')';
    ctx.beginPath();
    ctx.moveTo(-Lh * .7, -w0 * .98);
    ctx.bezierCurveTo(-Lh * .2, -w0 * 1.1, Lh * .04, -Hh * .8, Lh * .32, -Hh * .78);
    ctx.bezierCurveTo(Lh * .5, -Hh * .76, Lh * .6, -Hh * .42, Lh * .78, -Hh * .3);       // dahi -> moncong
    ctx.bezierCurveTo(Lh * .9, -Hh * .24, Lh * 1.0, -Hh * .18, Lh * 1.08, -Hh * .08);
    ctx.lineTo(Lh * 1.04, Hh * .04);
    ctx.lineTo(Lh * .34, Hh * .08);                                                      // garis mulut
    ctx.lineTo(-Lh * .7, w0 * .9);
    ctx.closePath(); ctx.fill();
    /* rahang bawah (membuka-menutup) */
    ctx.save(); ctx.translate(Lh * .34, Hh * .08); ctx.rotate(mouth);
    ctx.fillStyle = 'rgba(3,9,22,' + k.a + ')';
    ctx.beginPath();
    ctx.moveTo(-Lh * 1.04, -Hh * .02); ctx.lineTo(Lh * .62, -Hh * .04);
    ctx.bezierCurveTo(Lh * .7, Hh * .08, Lh * .6, Hh * .22, Lh * .46, Hh * .3);
    ctx.bezierCurveTo(Lh * .2, Hh * .5, -Lh * .5, Hh * .5, -Lh * 1.04, w0 * .85);
    ctx.closePath(); ctx.fill();
    /* gigi */
    ctx.fillStyle = 'rgba(200,235,255,' + (k.rim * .5).toFixed(3) + ')';
    ctx.beginPath();
    for (var t = 0; t < 7; t++) { var gx = Lh * (.02 + t * .085); ctx.moveTo(gx, -Hh * .04); ctx.lineTo(gx + Lh * .03, -Hh * .04 - Hh * (.17 + (t % 2) * .05)); ctx.lineTo(gx + Lh * .06, -Hh * .04); }
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(200,235,255,' + (k.rim * .45).toFixed(3) + ')';
    ctx.beginPath();
    for (var t2 = 0; t2 < 6; t2++) { var gx2 = Lh * (.42 + t2 * .095); ctx.moveTo(gx2, Hh * .05); ctx.lineTo(gx2 + Lh * .03, Hh * .05 + Hh * (.15 + (t2 % 2) * .06)); ctx.lineTo(gx2 + Lh * .06, Hh * .05); }
    ctx.fill();
    /* rim light kepala */
    ctx.strokeStyle = 'rgba(150,230,255,' + (k.rim * .4).toFixed(3) + ')'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-Lh * .4, -w0 * 1.04); ctx.bezierCurveTo(-Lh * .2, -w0 * 1.1, Lh * .04, -Hh * .8, Lh * .32, -Hh * .78); ctx.bezierCurveTo(Lh * .5, -Hh * .76, Lh * .6, -Hh * .42, Lh * .78, -Hh * .3); ctx.bezierCurveTo(Lh * .9, -Hh * .24, Lh * 1.0, -Hh * .18, Lh * 1.08, -Hh * .08); ctx.stroke();
    /* mata menyala */
    var ep = .7 + .3 * Math.sin(time * 1.7 + mon.ph), ex = Lh * .5, ey = -Hh * .36, ea = k.eye * ep;
    ctx.fillStyle = 'rgba(60,220,255,' + (ea * .09).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(ex, ey, Hh * .62, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(90,235,255,' + (ea * .3).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(ex, ey, Hh * .3, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(215,255,255,' + Math.min(1, ea * 1.15).toFixed(3) + ')'; ctx.beginPath(); ctx.ellipse(ex, ey, Hh * .17, Hh * .1, -.2, 0, TAU); ctx.fill();
    ctx.restore();
  }

  /* ---------- ikan ---------- */
  function drawFish(time, dt, k) {
    for (var si = 0; si < fish.length; si++) {
      var sc = fish[si], span = W + 320;
      sc.t += dt * sc.spd * .0028;                                  // progres 0..1 (tanpa dt tetap)
      if (sc.t > 1) { sc.t = 0; sc.y0 = H * (.12 + rnd() * .5); sc.dir = rnd() < .5 ? 1 : -1; }
      var cx = sc.dir > 0 ? -160 + sc.t * span : W + 160 - sc.t * span;
      var cy = sc.y0 + Math.sin(time * .35 + si) * sc.ya;
      var depth = 1 - sm(0, 1, cy / H) * .5;
      for (var i = 0; i < sc.n; i++) {
        var f = sc.f[i], x = cx + f.ox + Math.sin(time * .9 + f.ph) * 9, y = cy + f.oy + Math.cos(time * 1.15 + f.ph * 1.3) * 6;
        var vx = sc.dir * 26 + Math.cos(time * .9 + f.ph) * 9 * .9, vy = -Math.sin(time * 1.15 + f.ph * 1.3) * 6 * 1.15;
        var ang = Math.atan2(vy, vx), flash = .5 + .5 * Math.sin(time * .8 + f.ph * 2 + ang * 3);
        var a = k.fish * depth * (.35 + .65 * flash);
        if (a < .02) continue;
        var s = f.s, tw = Math.sin(time * f.sp * 2 + f.ph) * .5;
        ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
        ctx.fillStyle = 'rgba(130,185,235,' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(s, 0); ctx.quadraticCurveTo(s * .2, -s * .38, -s * .5, -s * .08 + tw);
        ctx.lineTo(-s * .95, -s * .34 + tw * 2); ctx.lineTo(-s * .85, tw); ctx.lineTo(-s * .95, s * .34 + tw * 2); ctx.lineTo(-s * .5, s * .08 + tw);
        ctx.quadraticCurveTo(s * .2, s * .38, s, 0); ctx.fill();
        ctx.restore();
      }
    }
  }

  /* ---------- salju laut, plankton, gelembung ---------- */
  function drawSnow(time, dt, k) {
    var i, p;
    for (i = 0; i < snow.length; i++) {
      p = snow[i]; p.y += p.vy * dt; p.x += Math.sin(time * .4 + p.ph) * (4 + p.z * 8) * dt;
      if (p.y > H + 4) { p.y = -4; p.x = rnd() * W; }
      if (p.x < -4) p.x = W + 4; else if (p.x > W + 4) p.x = -4;
      ctx.fillStyle = 'rgba(190,225,255,' + (p.a * k.snow).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
    }
    for (i = 0; i < plank.length; i++) {
      p = plank[i]; p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < -6) p.x = W + 6; else if (p.x > W + 6) p.x = -6; if (p.y < -6) p.y = H + 6; else if (p.y > H + 6) p.y = -6;
      var tw = Math.max(0, Math.sin(time * p.sp + p.ph)); tw *= tw; var a = tw * k.bio;
      if (a < .03) continue;
      ctx.fillStyle = 'rgba(70,235,255,' + (a * .12).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(170,255,255,' + Math.min(1, a).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
    }
  }
  function drawBubbles(time, dt, k) {
    var sb = ST.sb || 0;
    if (sb > .35 && bubbles.length < (lite ? 6 : 12) && rnd() < dt * 2.2) {
      var vx = W * (small ? .22 : .3) + (rnd() - .5) * 40;
      bubbles.push({ x: vx, y: H - H * (small ? .2 : .26) * sb, r: 1.5 + rnd() * 3, ph: rnd() * TAU, v: 22 + rnd() * 22 });
    }
    ctx.lineWidth = 1;
    for (var i = bubbles.length - 1; i >= 0; i--) {
      var b = bubbles[i]; b.y -= b.v * dt; b.x += Math.sin(time * 2 + b.ph) * 8 * dt; b.r += dt * .35;
      if (b.y < -10) { bubbles.splice(i, 1); continue; }
      ctx.strokeStyle = 'rgba(200,240,255,' + (.32 * k.snow).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,' + (.35 * k.snow).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(b.x - b.r * .3, b.y - b.r * .3, b.r * .25, 0, TAU); ctx.fill();
    }
  }

  /* ---------- loop ---------- */
  var raf = 0, last = 0, T = 0, FRAME = lite ? 50 : 33;
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (ts - last < FRAME) return;
    var dt = Math.min(.1, (ts - last) / 1000); last = ts; T += dt;
    render(T, dt);
  }
  function render(time, dt) {
    var nk = ST.nk == null ? .8 : ST.nk, day = ST.day || 0, p = ST.p || 0;
    /* faktor kecerahan: malam = siluet jelas, siang = samar (tertutup air) */
    var k = {
      a: (.5 + .46 * nk).toFixed(3),
      rim: .45 + .55 * nk,
      bio: .35 + .65 * nk,
      eye: .55 + .45 * nk,
      fish: (.34 + .22 * nk) * (1 - .35 * p),
      snow: .55 + .45 * nk
    };
    ctx.clearRect(0, 0, W, H);
    drawSnow(time, dt, k);
    drawFish(time, dt, k);
    if (mon.on) {
      mon.u += dt / mon.dur;
      if (mon.u >= 1) { mon.on = false; mon.wait = 6 + rnd() * 10; }
      else { ctx.globalAlpha = sm(0, .05, mon.u) * (1 - sm(.97, 1, mon.u)); drawMon(time, k); ctx.globalAlpha = 1; }
    } else { mon.wait -= dt; if (mon.wait <= 0) spawnMon(false); }
    drawBubbles(time, dt, k);
  }
  function run() { return !document.hidden && ST.vis !== false && !reduce; }
  function sync() {
    if (run() && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!run() && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  document.addEventListener('visibilitychange', sync);
  ST.sync = sync;
  var rt = 0, lw = 0;
  addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (innerWidth === lw) return; lw = innerWidth; size(); }, 200); });
  lw = innerWidth; size();
  if (reduce) { mon.u = .45; render(2, .03); }       // pose diam satu kali
  sync();
  ST.render = render; ST.mon = mon;
})();
