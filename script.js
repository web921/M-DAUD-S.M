document.addEventListener("DOMContentLoaded", function () {

  /* ========= ELEMENT GLOBAL ========= */
  const chatBox = document.getElementById("chatBox");
  const openChat = document.getElementById("openChat");
  const openChatFromCTA = document.getElementById("openChatFromCTA");
  const chatMessages = document.getElementById("chatMessages");
  const userNameInput = document.getElementById("userName");
  const sendNameBtn = document.getElementById("sendName");
  const waLink = document.getElementById("waLink");
  const csStatus = document.getElementById("csStatus");
  const waText = document.getElementById("waText");

  /* ========= SLIDER ========= */
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i]?.classList.add("active");
  }

  document.querySelector(".next")?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  document.querySelector(".prev")?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);

  /* ========= DARK MODE ========= */
  const toggle = document.getElementById("darkToggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || (systemDark.matches ? "dark" : "light"));

  toggle?.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  /* ========= FADE IN ========= */
  const fades = document.querySelectorAll(".fade");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
  }, { threshold: 0.15 });
  fades.forEach(el => observer.observe(el));

  /* ========= PARALLAX ========= */
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    if (hero && window.innerWidth > 768) {
      hero.style.backgroundPositionY = window.scrollY * 0.4 + "px";
    }
  });

  /* ========= SPONSOR SOUND ========= */
  const icons = document.querySelectorAll(".sponsor-icons a");
  const clickSound = new Audio("audio/click.wav");
  clickSound.volume = 0.25;
  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

  /* ========= CHAT SYSTEM ========= */
  const typingSound = new Audio("audio/type.wav");
  typingSound.volume = 0.15;

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 11) return "Selamat pagi";
    if (h < 17) return "Selamat siang";
    return "Selamat malam";
  }

  function addTyping() {
    const t = document.createElement("div");
    t.className = "chat-msg typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(t);
    typingSound.play();
    return t;
  }

  function addMessage(text, delay = 800) {
    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const msg = document.createElement("div");
      msg.className = "chat-msg bot";
      msg.textContent = text;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, delay);
  }

  function openChatBox() {
    if (!chatBox) return;
    chatBox.style.display = "flex";
    chatMessages.innerHTML = "";

    const hour = new Date().getHours();
    addMessage(`👋 ${getGreeting()}!`);

    setTimeout(() => {
      if (hour < 8 || hour >= 18) {
        addMessage("Saat ini kami sedang offline 🙏\nPesan Anda akan kami balas secepatnya.");
      } else {
        addMessage("Kami sedang online dan siap membantu 😊");
      }
    }, 900);
  }

  openChat?.addEventListener("click", openChatBox);
  openChatFromCTA?.addEventListener("click", openChatBox);

  sendNameBtn?.addEventListener("click", () => {
    const name = userNameInput.value.trim();
    if (!name) return;

    addMessage(`Baik ${name}, silakan klik WhatsApp untuk lanjut 🙏`);
    waLink.href =
      "https://wa.me/6285697321423?text=" +
      encodeURIComponent(`Halo, saya ${name}. Saya tertarik dan ingin bertanya.`);
  });

  /* ========= AUTO OPEN (10 DETIK, 1x) ========= */
  setTimeout(() => {
    if (!localStorage.getItem("chatOpened")) {
      openChatBox();
      localStorage.setItem("chatOpened", "yes");
    }
  }, 10000);

  /* ========= CS STATUS ========= */
  function updateCSStatus() {
    if (!csStatus) return;
    const h = new Date().getHours();
    if (h >= 8 && h < 18) {
      csStatus.textContent = "● Online";
      csStatus.className = "online";
    } else {
      csStatus.textContent = "● Offline";
      csStatus.className = "offline";
    }
  }
  updateCSStatus();
  setInterval(updateCSStatus, 600000);

  /* ========= CTA TEXT ROTATE ========= */
  if (waText) {
    const texts = ["Chat WhatsApp", "Tanya Harga", "Konsultasi Gratis"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % texts.length;
      waText.style.animation = "none";
      waText.offsetHeight;
      waText.style.animation = null;
      waText.textContent = texts[i];
    }, 3000);
  }
  
  const closeChat = document.getElementById("closeChat");

if (closeChat && chatBox) {
  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  });
}


});
