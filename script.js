document.addEventListener("DOMContentLoaded", function () {

  /* =================================================
     AUTO THEME (SIANG / MALAM) â€” AMAN
  ================================================= */
/* =================================================
   ðŸŒ— AUTO DARK MODE (FINAL STABLE VERSION)
================================================= */

let manualOverride = false;
let overrideTimer = null;

function applyThemeByTime() {
  if (manualOverride) return;

  const hour = new Date().getHours();
  const icon = document.getElementById("darkIcon");

  const isNight = hour >= 18 || hour < 6;

  if (isNight) {
    document.body.classList.add("dark");
    if (icon) icon.textContent = "\u2600\uFE0F"; // ☀️
  } else {
    document.body.classList.remove("dark");
    if (icon) icon.textContent = "\uD83C\uDF19"; // 🌙
  }
}

/* Jalankan saat pertama load */
applyThemeByTime();

/* Update tiap 1 menit */
setInterval(applyThemeByTime, 60000);

/* Manual Toggle */
const darkToggle = document.getElementById("darkToggle");

darkToggle?.addEventListener("click", function () {
  manualOverride = true;

  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  const icon = document.getElementById("darkIcon");

  if (icon) icon.textContent = isDark ? "☀️" : "🌙";

  /* Kembali ke auto setelah 1 menit */
  clearTimeout(overrideTimer);
  overrideTimer = setTimeout(() => {
    manualOverride = false;
    applyThemeByTime();
  }, 60000); // 1 menit = 60000ms
});






  /* =================================================
     SLIDER PORTFOLIO
  ================================================= */
  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i]?.classList.add("active");
  }

  document.querySelector(".next")?.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  });

  document.querySelector(".prev")?.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  });

  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 4000);

  /* =================================================
     FADE IN ON SCROLL
  ================================================= */
  const fades = document.querySelectorAll(".fade");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  fades.forEach(el => observer.observe(el));

  /* =================================================
     CHAT SYSTEM
  ================================================= */
  const chatBox = document.getElementById("chatBox");
  const openChat = document.getElementById("openChat");
  const openChatFromCTA = document.getElementById("openChatFromCTA");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chatMessages");
  const userNameInput = document.getElementById("userName");
  const sendNameBtn = document.getElementById("sendName");
  const waLink = document.getElementById("waLink");

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 11) return "Selamat pagi";
    if (h < 17) return "Selamat siang";
    return "Selamat malam";
  }

  function addMessage(text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg bot";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

function openChatBox() {
  chatBox.style.display = "flex";
  chatMessages.innerHTML = "";

  addMessage(`👋 ${getGreeting()}!`);

  setTimeout(() => {
    const hour = new Date().getHours();

    if (hour < 8 || hour >= 18) {
      addMessage("Saat ini kami sedang offline 🙏 Pesan akan dibalas besok.");
    } else {
      addMessage("Kami online dan siap membantu 😊");
    }

  }, 700);
}

  openChat?.addEventListener("click", openChatBox);
  openChatFromCTA?.addEventListener("click", openChatBox);
  closeChat?.addEventListener("click", () => chatBox.style.display = "none");

sendNameBtn?.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  if (!name) return;

  addMessage(`Baik ${name}, silakan lanjut ke WhatsApp 🙏`);

  waLink.href =
    "https://wa.me/6285697321423?text=" +
    encodeURIComponent(`Halo, saya ${name}. Saya tertarik dan ingin bertanya.`);
});

  /* =================================================
     TESTIMONI LIGHTBOX
  ================================================= */
  const testiImgs = document.querySelectorAll(".testi-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  testiImgs.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox?.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
  
  
  /* =================================================
   ðŸŒž SUN FLARE HALUS
================================================= */
const sunFlare = document.createElement("div");
sky.appendChild(sunFlare);

Object.assign(sunFlare.style, {
  position: "absolute",
  width: "260px",
  height: "260px",
  borderRadius: "50%",
  pointerEvents: "none",
  mixBlendMode: "screen",
  opacity: "0",
  transition: "opacity 1.5s ease, transform 3s ease"
});

function updateSunFlare() {
  if (document.body.classList.contains("dark")) {
    sunFlare.style.opacity = "0";
    return;
  }

  sunFlare.style.left = celestial.style.left;
  sunFlare.style.top = celestial.style.top;

  sunFlare.style.background = `
    radial-gradient(
      circle,
      rgba(255,255,255,0.35) 0%,
      rgba(253,224,71,0.25) 35%,
      rgba(249,115,22,0.15) 55%,
      rgba(249,115,22,0.05) 70%,
      rgba(249,115,22,0) 85%
    )
  `;

  sunFlare.style.opacity = "1";
}

/* Gerak flare pelan */
let flareAngle = 0;
setInterval(() => {
  if (!document.body.classList.contains("dark")) {
    flareAngle += 0.2;
    sunFlare.style.transform =
      `translate(${Math.sin(flareAngle) * 6}px, ${Math.cos(flareAngle) * 6}px)`;
  }
}, 80);

/* Sinkron dengan tema */
updateSunFlare();
const flareObserver = new MutationObserver(updateSunFlare);
flareObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});

  /* =================================================
   ðŸ•’ TIME BASED SKY SYSTEM
================================================= */
function getTimePhase() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 10) return "morning";
  if (hour >= 10 && hour < 16) return "day";
  if (hour >= 16 && hour < 18.5) return "evening";
  return "night";
}

darkToggle.addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;

  for (let i = 0; i < 3; i++) {
    const wave = document.createElement("span");
    wave.style.width = wave.style.height = size + "px";
    wave.style.left =
      e.clientX - rect.left - size / 2 + "px";
    wave.style.top =
      e.clientY - rect.top - size / 2 + "px";
    ripple.appendChild(wave);
  }

  this.appendChild(ripple);

  setTimeout(() => ripple.remove(), 1400);
});

/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  window.addEventListener("scroll", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
  });

  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });
}




/* ===== HERO TEXT WORD ANIMATION ===== */
const heroTitle = document.querySelector(".hero-split");

if (heroTitle) {
  const words = heroTitle.innerText.split(" ");
  heroTitle.innerHTML = words
    .map((word, i) =>
      `<span style="animation-delay:${i * 0.08}s">${word}&nbsp;</span>`
    )
    .join("");
}


/* ===== ACTIVE MENU UNDERLINE ===== */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-links a")
      .forEach(l => l.classList.remove("active"));

    link.classList.add("active");
  });
});


/* ===== HERO SUBTITLE AFTER TITLE ===== */
const subtitle = document.querySelector(".hero-subtitle");

if (subtitle) {
  const wordCount = heroTitle
    ? heroTitle.innerText.split(" ").length
    : 10;

  const delay = wordCount * 80 + 200;

  setTimeout(() => {
    subtitle.classList.add("show");
  }, delay);
}
  
  
  
  
  

});

/* =================================================
   ðŸŒž â†’ ðŸŒ™ SUN / MOON + SKY ANIMATION (PURE JS)
   - Sinkron dengan body.dark
   - Aman HP & PC
================================================= */

/* Buat elemen langit */
const sky = document.createElement("div");
sky.id = "sky-layer";
document.body.appendChild(sky);

/* Buat matahari / bulan */
const celestial = document.createElement("div");
celestial.id = "celestial-body";
sky.appendChild(celestial);

/* Style via JS (ANTI CSS CONFLICT) */
Object.assign(sky.style, {
  position: "fixed",
  inset: "0",
  zIndex: "-2",
  transition: "background 2s ease"
});

Object.assign(celestial.style, {
  position: "absolute",
  top: "15%",
  left: "-120px",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  transition: "all 2.5s ease"
});

/* Update langit & benda langit */
function updateSky() {
  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    /* ðŸŒŒ LANGIT MALAM */
    sky.style.background =
      "radial-gradient(circle at top, #020617 0%, #000000 70%)";

/* ðŸŒ™ BULAN DENGAN TEKSTUR KAWAH */
celestial.style.background = `
  radial-gradient(circle at 35% 35%,
    #ffffff 0%,
    #f1f5f9 38%,
    #cbd5f5 55%,
    #020617 70%
  ),
  radial-gradient(circle at 25% 30%,
    rgba(0,0,0,0.18) 8%,
    transparent 9%
  ),
  radial-gradient(circle at 55% 45%,
    rgba(0,0,0,0.15) 10%,
    transparent 11%
  ),
  radial-gradient(circle at 40% 65%,
    rgba(0,0,0,0.12) 7%,
    transparent 8%
  )
`;

celestial.style.boxShadow = `
  0 0 25px rgba(226,232,240,0.35),
  0 0 60px rgba(148,163,184,0.25),
  inset -10px 0 14px rgba(0,0,0,0.35)
`;


    celestial.style.background = `
      radial-gradient(
        circle at 35% 35%,
        #ffffff 0%,
        #f1f5f9 40%,
        #cbd5f5 60%,
        #020617 72%
      )
    `;

    celestial.style.boxShadow = `
      0 0 25px rgba(226,232,240,0.35),
      0 0 60px rgba(148,163,184,0.25),
      inset -8px 0 12px rgba(0,0,0,0.25)
    `;
  } else {
    /* ðŸŒ¤ï¸ LANGIT SIANG */
    sky.style.background =
      "radial-gradient(circle at top, #93c5fd 0%, #e0f2fe 65%)";

    /* ðŸŒž MATAHARI REALISTIS */
    celestial.style.width = "130px";
    celestial.style.height = "130px";
    celestial.style.left = "12%";
    celestial.style.top = "12%";

    celestial.style.background = `
      radial-gradient(
        circle,
        #fff7cc 0%,
        #fde047 35%,
        #f59e0b 60%,
        #ea580c 72%
      )
    `;

    celestial.style.boxShadow = `
      0 0 35px rgba(253,224,71,0.9),
      0 0 80px rgba(251,191,36,0.6),
      0 0 120px rgba(249,115,22,0.45)
    `;
  }
}


/* Initial */
updateSky();

/* Observer untuk dark mode toggle */
const themeObserver = new MutationObserver(updateSky);
themeObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});

/* Sedikit gerak natural */
let angle = 0;
setInterval(() => {
  angle += 0.5;
  celestial.style.transform = `translateY(${Math.sin(angle * Math.PI / 180) * 6}px)`;
}, 60);


/* =================================================
   âœ¨ STARS (MALAM)
================================================= */
const starLayer = document.createElement("div");
sky.appendChild(starLayer);

Object.assign(starLayer.style, {
  position: "absolute",
  inset: "0",
  pointerEvents: "none"
});

function createStar() {
  const star = document.createElement("div");
  const size = Math.random() * 2 + 1;

  Object.assign(star.style, {
    position: "absolute",
    width: size + "px",
    height: size + "px",
    borderRadius: "50%",
    background: "white",
    top: Math.random() * 60 + "%",
    left: Math.random() * 100 + "%",
    opacity: "0",
    transition: "opacity 1.5s ease"
  });

  starLayer.appendChild(star);

  setTimeout(() => (star.style.opacity = "1"), 50);
}

function spawnStars() {
  starLayer.innerHTML = "";
  if (!document.body.classList.contains("dark")) return;

  let count = 0;
  const starInterval = setInterval(() => {
    createStar();
    count++;
    if (count > 40) clearInterval(starInterval);
  }, 120);
}

/* =================================================
   â˜ï¸ CLOUDS (SIANG)
================================================= */
const cloudLayer = document.createElement("div");
sky.appendChild(cloudLayer);

Object.assign(cloudLayer.style, {
  position: "absolute",
  inset: "0",
  pointerEvents: "none"
});

function createCloud() {
  const cloud = document.createElement("div");
  const size = Math.random() * 120 + 80;
  const top = Math.random() * 35 + 5;

  Object.assign(cloud.style, {
    position: "absolute",
    width: size + "px",
    height: size * 0.6 + "px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "50%",
    top: top + "%",
    left: "-200px",
    filter: "blur(1px)",
    transition: "transform 60s linear"
  });

  cloudLayer.appendChild(cloud);

  setTimeout(() => {
    cloud.style.transform = `translateX(${window.innerWidth + 400}px)`;
  }, 100);

  setTimeout(() => cloud.remove(), 65000);
}

function spawnClouds() {
  cloudLayer.innerHTML = "";
  if (document.body.classList.contains("dark")) return;

  createCloud();
  setInterval(createCloud, 15000);
}

/* =================================================
   ðŸŒ™ MOON PHASE (SABIT)
================================================= */
function applyMoonPhase() {
  if (!document.body.classList.contains("dark")) return;

  celestial.style.background =
    "radial-gradient(circle at 30% 50%, #f8fafc 45%, #020617 47%)";
  celestial.style.boxShadow =
    "0 0 35px rgba(226,232,240,0.5)";
}

/* =================================================
   ðŸ” SYNC THEME
================================================= */
function syncEffects() {
  if (document.body.classList.contains("dark")) {
    spawnStars();
    applyMoonPhase();
    cloudLayer.innerHTML = "";
  } else {
    starLayer.innerHTML = "";
    spawnClouds();
  }
}

syncEffects();

/* Observe dark mode change */
const fxObserver = new MutationObserver(syncEffects);
fxObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});

/* =================================================
   ðŸŒ  SHOOTING STAR (MALAM)
================================================= */
function spawnShootingStar() {
  if (!document.body.classList.contains("dark")) return;

  const star = document.createElement("div");
  sky.appendChild(star);

  Object.assign(star.style, {
    position: "absolute",
    top: Math.random() * 40 + "%",
    left: Math.random() * 60 + "%",
    width: "120px",
    height: "2px",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0), white)",
    opacity: "0.9",
    transform: "rotate(-20deg)",
    zIndex: "2",
    transition: "transform 1s linear, opacity 1s linear"
  });

  setTimeout(() => {
    star.style.transform =
      "translate(300px, 120px) rotate(-20deg)";
    star.style.opacity = "0";
  }, 50);

  setTimeout(() => star.remove(), 1200);
}

/* Random tiap 10â€“25 detik */
setInterval(() => {
  if (Math.random() > 0.6) spawnShootingStar();
}, 12000);

/* =================================================
   â˜ï¸ CLOUD PARALLAX (3 LAYER)
================================================= */
const cloudLayers = [];

for (let i = 0; i < 3; i++) {
  const layer = document.createElement("div");
  sky.appendChild(layer);
  cloudLayers.push(layer);

  Object.assign(layer.style, {
    position: "absolute",
    inset: "0",
    pointerEvents: "none"
  });
}

function createCloud(layer, speed, sizeMul) {
  const cloud = document.createElement("div");
  const size = (Math.random() * 120 + 80) * sizeMul;

  Object.assign(cloud.style, {
    position: "absolute",
    width: size + "px",
    height: size * 0.6 + "px",
    background: "rgba(255,255,255,0.75)",
    borderRadius: "50%",
    top: Math.random() * 35 + "%",
    left: "-250px",
    filter: "blur(1px)",
    transition: `transform ${speed}s linear`
  });

  layer.appendChild(cloud);

  setTimeout(() => {
    cloud.style.transform =
      `translateX(${window.innerWidth + 500}px)`;
  }, 100);

  setTimeout(() => cloud.remove(), speed * 1000);
}

function spawnParallaxClouds() {
  if (document.body.classList.contains("dark")) {
    cloudLayers.forEach(l => (l.innerHTML = ""));
    return;
  }

  cloudLayers.forEach((layer, i) => {
    setInterval(() => {
      createCloud(layer, 70 - i * 20, 1 - i * 0.2);
    }, 14000 + i * 5000);
  });
}

spawnParallaxClouds();

/* =================================================
   ðŸŒ™ MOON PHASE (BERDASARKAN TANGGAL)
================================================= */
function applyMoonPhaseByDate() {
  if (!document.body.classList.contains("dark")) return;

  const day = new Date().getDate();
  const phase = day / 31;

  let lightPos = "35%";

  if (phase < 0.25) lightPos = "20%";      // sabit awal
  else if (phase < 0.5) lightPos = "35%";  // setengah
  else if (phase < 0.75) lightPos = "55%"; // cembung
  else lightPos = "50%";                   // purnama

  celestial.style.background = `
    radial-gradient(
      circle at ${lightPos} 35%,
      #ffffff 0%,
      #f1f5f9 40%,
      #cbd5f5 60%,
      #020617 72%
    )
  `;
}


/* Jalankan */
applyMoonPhaseByDate();

/* Update saat mode berubah */
const moonObserver = new MutationObserver(applyMoonPhaseByDate);
moonObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});



/* =================================================
   ðŸŒ«ï¸ NIGHT FOG EFFECT
================================================= */
const fogLayer = document.createElement("div");
sky.appendChild(fogLayer);

Object.assign(fogLayer.style, {
  position: "absolute",
  inset: "0",
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: "1"
});

function createFog() {
  const fog = document.createElement("div");

  const size = Math.random() * 600 + 400;
  const top = Math.random() * 60;

  Object.assign(fog.style, {
    position: "absolute",
    width: size + "px",
    height: size * 0.4 + "px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.12), rgba(255,255,255,0))",
    top: top + "%",
    left: "-700px",
    filter: "blur(30px)",
    opacity: "0.7",
    transition: "transform 90s linear"
  });

  fogLayer.appendChild(fog);

  setTimeout(() => {
    fog.style.transform =
      `translateX(${window.innerWidth + 900}px)`;
  }, 100);

  setTimeout(() => fog.remove(), 92000);
}

function handleFog() {
  fogLayer.innerHTML = "";

  if (!document.body.classList.contains("dark")) return;

  createFog();
  setInterval(createFog, 25000);
}

handleFog();

const fogObserver = new MutationObserver(handleFog);
fogObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"]
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".cloud").forEach((cloud, i) => {
    cloud.style.transform =
      `translateX(${window.scrollY * (0.15 + i * 0.05)}px)`;
  });
});

/* ===============================
   â˜ï¸ CLOUD PARALLAX PREMIUM
================================ */
window.addEventListener("scroll", () => {
  const clouds = document.querySelectorAll(".cloud");
  clouds.forEach((cloud, i) => {
    const speed = 0.15 + i * 0.08;
    cloud.style.transform =
      `translateX(${window.scrollY * speed}px)`;
  });
});

/* â˜€ï¸ SUN PARALLAX */
window.addEventListener("scroll", () => {
  const sun = document.querySelector(".sun");
  if (!sun) return;

  sun.style.transform =
    `translateX(${window.scrollY * 0.05}px)`;
});

/* ===============================
   ðŸŒ™ REAL MOON PHASE BY DATE
================================ */
function setMoonPhase() {
  const moon = document.querySelector(".moon");
  if (!moon) return;

  const now = new Date();
  const day = now.getDate(); // 1â€“31
  const phase = day / 31;

  let lightX = "30%";

  if (phase < 0.25) lightX = "20%";       // sabit awal
  else if (phase < 0.5) lightX = "35%";   // setengah
  else if (phase < 0.75) lightX = "55%";  // cembung
  else lightX = "50%";                    // purnama

  moon.style.background = `
    radial-gradient(
      circle at ${lightX} 40%,
      #ffffff 0%,
      #f1f5f9 45%,
      #cbd5f5 65%,
      #020617 78%
    )
  `;
}

setMoonPhase();

/* ===============================
   ðŸŒžðŸŒ™ HERO TEXT DAY & NIGHT
================================ */
function updateHeroText() {
  const title = document.getElementById("heroTitle");
  const desc = document.getElementById("heroDesc");
  if (!title || !desc) return;

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;

  if (isNight) {
    title.innerHTML = "Bangun Bisnis Digital Anda Tanpa Ribet";
    desc.innerHTML = `
      Website &bull; Aplikasi &bull; Desain &bull; Video Editing<br>
      Kami siap bantu Anda, bahkan di luar jam kerja
    `;
    document.body.classList.add("night-text");
  } else {
    title.innerHTML = "Bantu Bisnis Anda Terlihat Profesional & Dipercaya";
    desc.innerHTML = `
      Desain Rumah &bull; Website &bull; Aplikasi Android &bull; Video Editing<br>
      Solusi digital lengkap dengan respon cepat & konsultasi gratis
    `;
    document.body.classList.remove("night-text");
  }
}

updateHeroText();
setInterval(updateHeroText, 60000); // update tiap 1 menit



/* ===============================
   CTA BUTTON TEXT ROTATOR
================================ */

(function () {

  const button = document.getElementById("openChatFromCTA");
  if (!button) return;

  const texts = [
    "?? Konsultasi Gratis",
    "?? Amankan Slot Anda",
    "? Tanya Harga Sekarang",
    "?? Mulai Project Hari Ini",
    "?? Mulai Dari 100 Ribuan"
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % texts.length;

    button.style.opacity = "0";

    setTimeout(() => {
      button.innerHTML = texts[index];
      button.style.opacity = "1";
    }, 300);

  }, 3000);

})();







