document.addEventListener("DOMContentLoaded", function () {

  /* =================================================
     AUTO THEME (SIANG / MALAM) — AMAN
  ================================================= */
/* =================================================
   ?? AUTO DARK MODE (FINAL STABLE VERSION)
================================================= */

let manualOverride = false;
let overrideTimer = null;

function applyThemeByTime() {
  if (manualOverride) return;

  const hour = new Date().getHours();
  const darkToggle = document.getElementById("darkToggle");
  const icon = document.getElementById("darkIcon");

  const isNight = hour >= 18 || hour < 6;

  if (isNight) {
    document.body.classList.add("dark");
    if (icon) icon.textContent = "??";
  } else {
    document.body.classList.remove("dark");
    if (icon) icon.textContent = "??";
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

  if (icon) icon.textContent = isDark ? "??" : "??";

  /* Kembali ke auto setelah 1 menit */
  clearTimeout(overrideTimer);
  overrideTimer = setTimeout(() => {
    manualOverride = false;
    applyThemeByTime();
  }, 10000);
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
    addMessage(`?? ${getGreeting()}!`);
    setTimeout(() => {
      const hour = new Date().getHours();
      if (hour < 8 || hour >= 18) {
        addMessage("Saat ini kami sedang offline ?? Pesan akan dibalas besok.");
      } else {
        addMessage("Kami online dan siap membantu ??");
      }
    }, 700);
  }

  openChat?.addEventListener("click", openChatBox);
  openChatFromCTA?.addEventListener("click", openChatBox);
  closeChat?.addEventListener("click", () => chatBox.style.display = "none");

  sendNameBtn?.addEventListener("click", () => {
    const name = userNameInput.value.trim();
    if (!name) return;
    addMessage(`Baik ${name}, silakan lanjut ke WhatsApp ??`);
    waLink.href =
      "https://wa.me/6285697321423?text=" +
      encodeURIComponent(`Halo, saya ${name}. Saya tertarik dan ingin bertanya.`);
  });

});

/* =================================================
   ?? ? ?? SUN / MOON + SKY ANIMATION (PURE JS)
================================================= */

/* =================================================
   ? STARS (MALAM)
================================================= */

/* =================================================
   ?? CLOUDS (SIANG)
================================================= */

/* =================================================
   ?? MOON PHASE (SABIT)
================================================= */

/* =================================================
   ?? SYNC THEME
================================================= */

/* =================================================
   ?? SHOOTING STAR (MALAM)
================================================= */

/* =================================================
   ?? CLOUD PARALLAX (3 LAYER)
================================================= */

/* =================================================
   ?? MOON PHASE (BERDASARKAN TANGGAL)
================================================= */

/* =================================================
   ??? NIGHT FOG EFFECT
================================================= */

/* ===============================
   ???? HERO TEXT DAY & NIGHT
================================ */

/* ===============================
   CTA BUTTON TEXT ROTATOR
================================ */

(function () {

  const button = document.getElementById("openChatFromCTA");
  if (!button) return;

  const texts = [
    "?? Konsultasi Gratis",
    "?? Amankan Slot Anda",
    "?? Tanya Harga Sekarang",
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
