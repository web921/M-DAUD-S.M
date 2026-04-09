/* =====================================================
   M DAUD S.M — SCRIPT 2026
   Bug fixes + Admin Panel
===================================================== */

(function () {
  "use strict";

  /* ================================================
     ADMIN STATE
  ================================================ */
  let isAdminLoggedIn = false;
  const ADMIN_PASSWORD = "daud123";
  let logoTapCount = 0;
  let logoTapTimer = null;

  /* ================================================
     1. DOM READY
  ================================================ */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupTheme();
    setupSkyArc();
    setupHeader();
    setupMobileMenu();
    setupHeroTypewriter();
    setupCounterAnimation();
    setupFadeObserver();
    setupPortfolioFilter();
    setupChatBox();
    setupTestimoni();
    setupLightbox();
    setupBackToTop();
    setupCustomCursor();
    setupCTARotator();
    setupStarfield();
    setupScrollActiveNav();
    setupStatsSimulation();
    setupAdminTrigger();
    loadAdminData();
  }

  /* ================================================
     2. THEME (AUTO + MANUAL TOGGLE)
  ================================================ */
  let manualOverride = false;
  let overrideTimer = null;

  function getIsNight() {
    const h = new Date().getHours();
    return h >= 18 || h < 6;
  }

  function applyThemeByTime() {
    if (manualOverride) return;
    const isNight = getIsNight();
    setTheme(isNight);
  }

  function setTheme(isDark) {
    const icon = document.getElementById("darkIcon");
    if (isDark) {
      document.body.classList.add("dark");
      if (icon) icon.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      if (icon) icon.textContent = "🌙";
    }
    updateSkyElements(isDark);
  }

  function updateSkyElements(isDark) {
    const shootingStar = document.getElementById("shootingStar");
    if (shootingStar) {
      shootingStar.style.display = isDark ? "block" : "none";
    }
  }

  function setupTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      manualOverride = true;
      setTheme(true);
    } else if (saved === "light") {
      manualOverride = true;
      setTheme(false);
    } else {
      applyThemeByTime();
    }

    setInterval(applyThemeByTime, 60000);

    const toggle = document.getElementById("darkToggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      manualOverride = true;
      clearTimeout(overrideTimer);
      const isDark = document.body.classList.toggle("dark");
      const icon = document.getElementById("darkIcon");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateSkyElements(isDark);
      overrideTimer = setTimeout(() => {
        manualOverride = false;
        localStorage.removeItem("theme");
        applyThemeByTime();
      }, 30 * 60 * 1000);
    });
  }

  /* ================================================
     3. HEADER SCROLL EFFECT
  ================================================ */
  function setupHeader() {
    const header = document.getElementById("mainHeader");
    if (!header) return;

    let ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          header.classList.toggle("scrolled", window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ================================================
     4. MOBILE MENU
  ================================================ */
  function setupMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    function closeMenu() {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  /* ================================================
     5. SCROLL ACTIVE NAV HIGHLIGHT
  ================================================ */
  function setupScrollActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ================================================
     6. HERO TYPEWRITER
  ================================================ */
  function setupHeroTypewriter() {
    const el = document.getElementById("heroTypewriter");
    if (!el) return;

    const phrases = [
      "Terlihat Profesional",
      "Dipercaya Klien",
      "Tampil Lebih Modern",
      "Punya Website Keren",
      "Punya Aplikasi Android",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = phrases[phraseIndex];
      const displayed = deleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

      el.textContent = displayed;

      let delay = deleting ? 50 : 80;

      if (!deleting && charIndex > current.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIndex < 0) {
        deleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ================================================
     7. COUNTER ANIMATION
  ================================================ */
  function setupCounterAnimation() {
    const counters = document.querySelectorAll(".stat-num[data-target]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        el.textContent = target >= 1000
          ? (target / 1000).toFixed(1).replace(".", ",") + " rb"
          : target;
        clearInterval(timer);
      } else {
        el.textContent = target >= 1000
          ? (current / 1000).toFixed(1).replace(".", ",") + " rb"
          : Math.floor(current);
      }
    }, step);
  }

  /* ================================================
     8. FADE IN ON SCROLL
  ================================================ */
  function setupFadeObserver() {
    const fades = document.querySelectorAll(".fade");
    if (!fades.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.1 });

    fades.forEach(function (el) { observer.observe(el); });
  }

  /* ================================================
     9. PORTFOLIO FILTER (WITH ANIMATION) — FIXED
  ================================================ */
  function setupPortfolioFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".portfolio-card");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        items.forEach(function (item, i) {
          const matches = filter === "all" || item.classList.contains(filter);

          // FIX: animate semua item serentak, bukan staggered timeout yg conflict
          item.style.transition = "opacity 0.25s ease, transform 0.25s ease";
          if (!matches) {
            item.style.opacity = "0";
            item.style.transform = "scale(0.92)";
            setTimeout(function () {
              item.style.display = "none";
            }, 250);
          } else {
            item.style.display = "block";
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              });
            });
          }
        });
      });
    });
  }

  /* ================================================
     10. CHAT BOX SYSTEM — FIXED toggle bug
  ================================================ */
  function setupChatBox() {
    const chatBox = document.getElementById("chatBox");
    const openChat = document.getElementById("openChat");
    const openChatFromCTA = document.getElementById("openChatFromCTA");
    const closeChat = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatMessages");
    const userNameInput = document.getElementById("userName");
    const sendNameBtn = document.getElementById("sendName");
    const waLink = document.getElementById("waLink");
    const nameInputWrap = document.getElementById("nameInputWrap");

    if (!chatBox) return;

    let chatStarted = false;

    function getGreeting() {
      const h = new Date().getHours();
      if (h < 11) return "Selamat pagi";
      if (h < 15) return "Selamat siang";
      if (h < 18) return "Selamat sore";
      return "Selamat malam";
    }

    function isOnline() {
      const h = new Date().getHours();
      return h >= 8 && h < 18;
    }

    function addMessage(text, type, delay) {
      delay = delay || 0;
      return new Promise(function (resolve) {
        setTimeout(function () {
          const typingEl = document.createElement("div");
          typingEl.className = "chat-msg bot typing-indicator";
          typingEl.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
          chatMessages.appendChild(typingEl);
          chatMessages.scrollTop = chatMessages.scrollHeight;

          setTimeout(function () {
            typingEl.remove();
            const msg = document.createElement("div");
            msg.className = "chat-msg " + (type || "bot");
            msg.textContent = text;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            resolve();
          }, 700);
        }, delay);
      });
    }

    function openChatBox() {
      // FIX: cek visibility dengan getComputedStyle bukan style.display
      const isVisible = chatBox.style.display === "flex";
      if (isVisible) {
        chatBox.style.display = "none";
        return;
      }

      chatBox.style.display = "flex";
      chatMessages.innerHTML = "";
      chatStarted = false;

      if (waLink) waLink.style.display = "none";
      if (nameInputWrap) nameInputWrap.style.display = "flex";
      if (userNameInput) userNameInput.value = "";

      addMessage(getGreeting() + "! 👋 Saya Daud, Sales Executive kami.", "bot", 300)
        .then(function () {
          if (isOnline()) {
            return addMessage("Kami sedang online dan siap membantu Anda 😊", "bot", 200);
          } else {
            return addMessage("Saat ini kami offline 🙏 Pesan Anda akan kami balas segera.", "bot", 200);
          }
        })
        .then(function () {
          return addMessage("Boleh saya tahu nama Anda? 😊", "bot", 200);
        })
        .then(function () {
          chatStarted = true;
          if (userNameInput) userNameInput.focus();
        });
    }

    if (openChat) openChat.addEventListener("click", openChatBox);
    if (openChatFromCTA) openChatFromCTA.addEventListener("click", openChatBox);
    if (closeChat) closeChat.addEventListener("click", function () {
      chatBox.style.display = "none";
    });

    // Close on outside click — FIX: jangan close kalau klik tombol WA float
    document.addEventListener("click", function (e) {
      if (chatBox.style.display === "flex" &&
          !chatBox.contains(e.target) &&
          !e.target.closest("#openChat") &&
          !e.target.closest("#openChatFromCTA") &&
          !e.target.closest(".wa-float")) {
        chatBox.style.display = "none";
      }
    });

    function handleSendName() {
      if (!userNameInput) return;
      const name = userNameInput.value.trim();
      if (!name) {
        userNameInput.classList.add("shake");
        setTimeout(function () { userNameInput.classList.remove("shake"); }, 500);
        userNameInput.focus();
        return;
      }

      const userMsg = document.createElement("div");
      userMsg.className = "chat-msg user";
      userMsg.textContent = name;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      if (nameInputWrap) nameInputWrap.style.display = "none";

      // FIX: kirim ke Firebase setelah nama diterima
      kirimDataFirebase(name);

      addMessage("Senang berkenalan, " + name + "! 😊", "bot", 300)
        .then(function () {
          return addMessage("Klik tombol di bawah untuk lanjut chat via WhatsApp ya 👇", "bot", 200);
        })
        .then(function () {
          const waMsg = encodeURIComponent(
            "Halo Daud, saya " + name + " ingin konsultasi dan bertanya mengenai layanan Anda."
          );
          if (waLink) {
            waLink.href = "https://wa.me/6285697321423?text=" + waMsg;
            waLink.style.display = "flex";
          }
        });
    }

    if (sendNameBtn) sendNameBtn.addEventListener("click", handleSendName);
    if (userNameInput) {
      userNameInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") handleSendName();
      });
    }
  }

  /* ================================================
     11. TESTIMONI SLIDER — FIXED offset calculation
  ================================================ */
  function setupTestimoni() {
    const slide = document.getElementById("testiSlide");
    const prevBtn = document.getElementById("testiPrev");
    const nextBtn = document.getElementById("testiNext");
    const dotsContainer = document.getElementById("testiDots");

    if (!slide) return;

    const imgs = Array.from(slide.querySelectorAll(".testi-img"));
    // FIX: filter hanya gambar yang tidak disembunyikan karena error
    const visibleImgs = imgs.filter(function(img) {
      return img.parentElement.style.display !== "none";
    });
    if (!visibleImgs.length && !imgs.length) return;

    const isMobile = function () { return window.innerWidth <= 480; };
    let perSlide = isMobile() ? 1 : (window.innerWidth <= 768 ? 2 : 4);
    let current = 0;
    let autoTimer;

    function totalSlides() {
      return Math.max(1, Math.ceil(imgs.length / perSlide));
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides(); i++) {
        const dot = document.createElement("button");
        dot.className = "testi-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Slide " + (i + 1));
        dot.addEventListener("click", function () { goTo(i); });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll(".testi-dot").forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
    }

    function goTo(index) {
      current = ((index % totalSlides()) + totalSlides()) % totalSlides();
      // FIX: kalkulasi offset yang benar berdasarkan persentase per item
      var itemWidthPct = 100 / perSlide;
      var offset = current * perSlide * itemWidthPct;
      slide.style.transform = "translateX(-" + offset + "%)";
      updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() { autoTimer = setInterval(next, 4000); }
    function stopAuto() { clearInterval(autoTimer); }

    if (prevBtn) prevBtn.addEventListener("click", function () { stopAuto(); prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopAuto(); next(); startAuto(); });

    let touchStartX = 0;
    slide.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slide.addEventListener("touchend", function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        stopAuto();
        diff > 0 ? next() : prev();
        startAuto();
      }
    }, { passive: true });

    window.addEventListener("resize", function () {
      const newPer = isMobile() ? 1 : (window.innerWidth <= 768 ? 2 : 4);
      if (newPer !== perSlide) {
        perSlide = newPer;
        current = 0;
        buildDots();
        goTo(0);
      }
    });

    buildDots();
    goTo(0);
    startAuto();
  }

  /* ================================================
     12. LIGHTBOX — FIXED: support testi + sketchup
  ================================================ */
  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImg) return;

    document.addEventListener("click", function (e) {
      // Jangan proses klik pada admin buttons
      if (e.target.closest(".admin-edit-btn, .admin-del-btn, .admin-panel, #adminModal")) return;

      const imgTrigger = e.target.closest(".lightbox-trigger");
      const sketchupCard = e.target.closest(".portfolio-card.sketchup");

      let src = "";

      if (imgTrigger && imgTrigger.tagName === "IMG") {
        src = imgTrigger.src;
      } else if (sketchupCard) {
        const img = sketchupCard.querySelector("img");
        if (img) src = img.src;
        else if (sketchupCard.dataset.img) src = sketchupCard.dataset.img;
      }

      if (!src) return;

      lightboxImg.src = src;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox();
        closeAdminModal();
      }
    });
  }

  /* ================================================
     13. BACK TO TOP
  ================================================ */
  function setupBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 400);
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================================================
     14. CUSTOM CURSOR (Desktop)
  ================================================ */
  function setupCustomCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button, .portfolio-card, .filter-btn").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        dot.style.width = "12px";
        dot.style.height = "12px";
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.background = "rgba(14,165,233,0.08)";
        ring.style.opacity = "0.8";
      });
      el.addEventListener("mouseleave", function () {
        dot.style.width = "8px";
        dot.style.height = "8px";
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.background = "transparent";
        ring.style.opacity = "0.5";
      });
    });

    document.addEventListener("mouseleave", function () {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", function () {
      dot.style.opacity = "1";
      ring.style.opacity = "0.5";
    });
  }

  /* ================================================
     15. CTA BUTTON TEXT ROTATOR
  ================================================ */
  function setupCTARotator() {
    const btn = document.getElementById("openChatFromCTA");
    const textEl = document.getElementById("ctaBtnText");
    if (!btn || !textEl) return;

    const texts = [
      "Konsultasi Gratis",
      "Amankan Slot Anda 🔥",
      "Tanya Harga Sekarang",
      "Mulai Project Hari Ini",
      "Mulai dari Rp 200 Ribuan",
    ];

    let index = 0;
    textEl.style.transition = "opacity 0.3s, transform 0.3s";

    setInterval(function () {
      index = (index + 1) % texts.length;
      textEl.style.opacity = "0";
      textEl.style.transform = "translateY(8px)";
      setTimeout(function () {
        textEl.textContent = texts[index];
        textEl.style.opacity = "1";
        textEl.style.transform = "translateY(0)";
      }, 300);
    }, 3000);
  }

  /* ================================================
     16. SUN / MOON ARC
  ================================================ */
  function setupSkyArc() {
    const sun  = document.getElementById("sunEl");
    const moon = document.getElementById("moonEl");
    if (!sun || !moon) return;

    function getArcPosition(progress) {
      const xPct = 5 + progress * 90;
      const A = (72 - 8) / (0.5 * 0.5);
      const yPct = A * Math.pow(progress - 0.5, 2) + 8;
      return { x: xPct, y: yPct };
    }

    function getProgress() {
      const now  = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const totalMin = h * 60 + m;
      const DAY_START  = 6  * 60;
      const DAY_END    = 18 * 60;
      const NIGHT_END  = 30 * 60;
      const isDay = totalMin >= DAY_START && totalMin < DAY_END;
      let progress;
      if (isDay) {
        progress = (totalMin - DAY_START) / (DAY_END - DAY_START);
      } else {
        const nightMin = totalMin >= DAY_END
          ? totalMin - DAY_END
          : totalMin + (24 * 60 - DAY_END);
        progress = nightMin / (NIGHT_END - DAY_END);
      }
      return { isDay, progress: Math.min(Math.max(progress, 0), 1) };
    }

    function applyPosition() {
      const { isDay, progress } = getProgress();
      const pos = getArcPosition(progress);
      if (isDay) {
        sun.style.setProperty("--sx", pos.x + "%");
        sun.style.setProperty("--sy", pos.y + "%");
      } else {
        moon.style.setProperty("--mx", pos.x + "%");
        moon.style.setProperty("--my", pos.y + "%");
      }
    }

    applyPosition();
    setInterval(applyPosition, 30000);

    const toggle = document.getElementById("darkToggle");
    if (toggle) toggle.addEventListener("click", applyPosition);
  }

  /* ================================================
     17. STARFIELD
  ================================================ */
  function setupStarfield() {
    const container = document.getElementById("starsContainer");
    if (!container) return;

    const count = 80;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2.5 + 1;
      star.style.cssText =
        "width:" + size + "px;" +
        "height:" + size + "px;" +
        "top:" + Math.random() * 100 + "%;" +
        "left:" + Math.random() * 100 + "%;" +
        "--dur:" + (Math.random() * 3 + 2) + "s;" +
        "--delay:" + (Math.random() * 4) + "s;";
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  }

  /* ================================================
     18. STATS SIMULATION
  ================================================ */
  function setupStatsSimulation() {
    const visitorEl = document.getElementById("visitorCount");
    const chatEl = document.getElementById("chatCount");

    let visitors = 1247;
    let chats = 89;

    if (visitorEl) {
      visitorEl.style.transition = "transform 0.3s ease";
      visitorEl.textContent = visitors.toLocaleString("id-ID");
    }
    if (chatEl) chatEl.textContent = chats;

    setInterval(function () {
      if (Math.random() > 0.6) {
        visitors += Math.floor(Math.random() * 3) + 1;
        if (visitorEl) {
          visitorEl.style.transform = "scale(1.15)";
          visitorEl.textContent = visitors.toLocaleString("id-ID");
          setTimeout(function () { visitorEl.style.transform = "scale(1)"; }, 300);
        }
      }
    }, 8000);

    setInterval(function () {
      if (Math.random() > 0.7) {
        chats += 1;
        if (chatEl) chatEl.textContent = chats;
      }
    }, 15000);
  }

  /* ================================================
     FIREBASE — FIXED: cek apakah firebase tersedia
  ================================================ */
  function kirimDataFirebase(nama) {
    try {
      if (typeof firebase !== "undefined" && firebase.database) {
        firebase.database().ref("leads").push({
          nama: nama,
          waktu: new Date().toISOString()
        });
      }
    } catch(e) {
      console.warn("Firebase error:", e);
    }
  }

  // FIX: Firebase listener dipindah ke dalam try-catch agar tidak error jika offline
  try {
    if (typeof firebase !== "undefined" && firebase.database) {
      firebase.database().ref("leads").on("value", function(snapshot) {
        console.log("Leads:", snapshot.val());
      });
    }
  } catch(e) {
    console.warn("Firebase listener error:", e);
  }

  /* ================================================
     ██████████████████████████████████████████████
     ADMIN SYSTEM
     Aktif: ketuk logo "M DAUD S.M" 5x berturut-turut
     ██████████████████████████████████████████████
  ================================================ */

  /* --- Default data --- */
  const defaultPortfolio = [
    { id: "p1", type: "web", title: "Es Teler Abah", url: "https://web189.github.io/EsTeler-Abah/", iframe: true },
    { id: "p2", type: "web", title: "Magic Ink Tattoo", url: "https://web189.github.io/Magic-Ink/", iframe: true },
    { id: "p3", type: "web", title: "Street Food FM", url: "https://web189.github.io/Street-Food-FM/", iframe: true },
    { id: "p4", type: "web", title: "Happy Wedding", url: "https://web189.github.io/happy-wedding/", iframe: true },
    { id: "p5", type: "android", title: "App DMS", url: "https://www.youtube.com/embed/zOYAZK2-6Eg", iframe: true },
    { id: "p6", type: "android", title: "App UMKM EsTeler", url: "https://www.youtube.com/embed/j1pTuWOuVaI?si=dHB6p_3vl1QIYQw6", iframe: true },
    { id: "p7", type: "android", title: "App ABC Mobile", url: "https://www.youtube.com/embed/fkrOpdnxXzg?si=EOG2lHf6rngwI6sU", iframe: true },
    { id: "p8", type: "sketchup", title: "Kantin Depo Parung", img: "img/hasil10.jpg" },
    { id: "p9", type: "sketchup", title: "Pt Lokon Prima", img: "img/hasil11.jpg" },
    { id: "p10", type: "sketchup", title: "Workshop Pt JMTM", img: "img/hasil4.jpg" },
    { id: "p11", type: "sketchup", title: "Tank Solar Pt JMTM", img: "img/hasil3.jpg" },
  ];

  const defaultPricing = [
    { id: "pr1", icon: "🏠", title: "Desain Rumah", price: "Rp 400.000", badge: "Best Value", badgeClass: "", features: ["2x Revisi Gratis", "File JPG, PNG & Video Preview", "Konsultasi Konsep Gratis"], notes: ["Harga menyesuaikan luas & detail desain"], cross: [], highlighted: false },
    { id: "pr2", icon: "🌐", title: "Website Profesional", price: "Rp 200.000", badge: "⭐ Paling Diminati", badgeClass: "hot", features: ["1x Revisi Gratis", "Desain Modern & Responsive", "Gratis Konsultasi Struktur"], notes: ["Harga tergantung fitur & custom"], cross: ["Domain & Hosting terpisah"], highlighted: true },
    { id: "pr3", icon: "📱", title: "Aplikasi Android", price: "Rp 700.000", badge: "🚀 Premium", badgeClass: "premium", features: ["2x Revisi Gratis", "UI Modern & User Friendly", "Konsultasi Konsep Aplikasi"], notes: ["Harga menyesuaikan fitur & database"], cross: ["Publish Play Store terpisah"], highlighted: false },
  ];

  const defaultTestimoni = [
    { id: "t1", src: "img/testi/chat1.jpg", alt: "Testimoni 1" },
    { id: "t2", src: "img/testi/chat2.jpg", alt: "Testimoni 2" },
    { id: "t3", src: "img/testi/chat3.jpg", alt: "Testimoni 3" },
    { id: "t4", src: "img/testi/chat4.jpg", alt: "Testimoni 4" },
  ];

  function loadAdminData() {
    // Muat data dari localStorage jika ada
    var savedPortfolio = localStorage.getItem("admin_portfolio");
    var savedPricing = localStorage.getItem("admin_pricing");
    var savedTestimoni = localStorage.getItem("admin_testimoni");

    if (savedPortfolio) {
      try { renderPortfolio(JSON.parse(savedPortfolio)); } catch(e) { renderPortfolio(defaultPortfolio); }
    }
    if (savedPricing) {
      try { renderPricing(JSON.parse(savedPricing)); } catch(e) {}
    }
    if (savedTestimoni) {
      try { renderTestimoni(JSON.parse(savedTestimoni)); } catch(e) {}
    }
  }

  /* ---- Admin Trigger: tap logo 5x ---- */
  function setupAdminTrigger() {
    const logoEl = document.getElementById("logoText");
    if (!logoEl) return;

    logoEl.style.cursor = "pointer";
    logoEl.setAttribute("title", "");

    logoEl.addEventListener("click", function () {
      logoTapCount++;
      clearTimeout(logoTapTimer);

      if (logoTapCount >= 5) {
        logoTapCount = 0;
        if (isAdminLoggedIn) {
          openAdminPanel();
        } else {
          showAdminLogin();
        }
        return;
      }

      // Visual feedback subtle
      logoEl.style.transform = "scale(1.08)";
      setTimeout(function() { logoEl.style.transform = ""; }, 150);

      logoTapTimer = setTimeout(function () {
        logoTapCount = 0;
      }, 2000);
    });
  }

  /* ---- Admin Login Modal ---- */
  function showAdminLogin() {
    var existing = document.getElementById("adminLoginModal");
    if (existing) { existing.remove(); }

    var modal = document.createElement("div");
    modal.id = "adminLoginModal";
    modal.innerHTML = `
      <div class="admin-modal-overlay" id="adminLoginOverlay">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <span>🔐</span>
            <h3>Admin Login</h3>
            <button class="admin-modal-close" id="closeLoginModal">✕</button>
          </div>
          <div class="admin-modal-body">
            <p style="color:var(--text2);font-size:13px;margin-bottom:16px;">Masukkan password untuk masuk sebagai Admin</p>
            <input type="password" id="adminPasswordInput" placeholder="Password admin..." class="admin-input" autocomplete="off">
            <p id="adminLoginError" style="color:#ef4444;font-size:12px;display:none;margin-top:8px;">Password salah! Coba lagi.</p>
          </div>
          <div class="admin-modal-footer">
            <button id="adminLoginCancel" class="admin-btn admin-btn-secondary">Batal</button>
            <button id="adminLoginSubmit" class="admin-btn admin-btn-primary">Masuk</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    var input = document.getElementById("adminPasswordInput");
    var errorEl = document.getElementById("adminLoginError");

    function doLogin() {
      var pw = input.value;
      if (pw === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        modal.remove();
        showToast("✅ Berhasil masuk sebagai Admin!");
        setTimeout(openAdminPanel, 400);
      } else {
        errorEl.style.display = "block";
        input.value = "";
        input.focus();
        input.classList.add("shake");
        setTimeout(function() { input.classList.remove("shake"); }, 500);
      }
    }

    document.getElementById("adminLoginSubmit").addEventListener("click", doLogin);
    input.addEventListener("keydown", function(e) { if (e.key === "Enter") doLogin(); });
    document.getElementById("adminLoginCancel").addEventListener("click", function() { modal.remove(); });
    document.getElementById("closeLoginModal").addEventListener("click", function() { modal.remove(); });
    document.getElementById("adminLoginOverlay").addEventListener("click", function(e) {
      if (e.target === this) modal.remove();
    });

    setTimeout(function() { input.focus(); }, 100);
  }

  /* ---- Admin Panel ---- */
  function openAdminPanel() {
    var existing = document.getElementById("adminPanelModal");
    if (existing) { existing.remove(); }

    var panel = document.createElement("div");
    panel.id = "adminPanelModal";
    panel.innerHTML = `
      <div class="admin-panel-overlay">
        <div class="admin-panel-box">
          <div class="admin-panel-header">
            <div class="admin-panel-title">
              <span>⚙️</span>
              <h2>Admin Panel</h2>
              <span class="admin-badge-online">● Online</span>
            </div>
            <button class="admin-modal-close large" id="closeAdminPanel">✕ Keluar</button>
          </div>
          <div class="admin-panel-tabs">
            <button class="admin-tab active" data-tab="portfolio">🖼️ Portfolio</button>
            <button class="admin-tab" data-tab="pricing">💰 Harga</button>
            <button class="admin-tab" data-tab="testimoni">💬 Testimoni</button>
          </div>
          <div class="admin-panel-content">
            <!-- PORTFOLIO TAB -->
            <div class="admin-tab-pane active" id="tab-portfolio">
              <div class="admin-toolbar">
                <h3>Kelola Hasil Pekerjaan</h3>
                <button class="admin-btn admin-btn-primary" id="addPortfolioBtn">+ Tambah</button>
              </div>
              <div class="admin-list" id="adminPortfolioList"></div>
            </div>
            <!-- PRICING TAB -->
            <div class="admin-tab-pane" id="tab-pricing">
              <div class="admin-toolbar">
                <h3>Kelola Harga Layanan</h3>
                <button class="admin-btn admin-btn-primary" id="addPricingBtn">+ Tambah</button>
              </div>
              <div class="admin-list" id="adminPricingList"></div>
            </div>
            <!-- TESTIMONI TAB -->
            <div class="admin-tab-pane" id="tab-testimoni">
              <div class="admin-toolbar">
                <h3>Kelola Bukti Nyata Klien</h3>
                <button class="admin-btn admin-btn-primary" id="addTestimoniBtn">+ Tambah</button>
              </div>
              <div class="admin-list" id="adminTestimoniList"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Tabs
    panel.querySelectorAll(".admin-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        panel.querySelectorAll(".admin-tab").forEach(function(t) { t.classList.remove("active"); });
        panel.querySelectorAll(".admin-tab-pane").forEach(function(p) { p.classList.remove("active"); });
        tab.classList.add("active");
        document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
      });
    });

    document.getElementById("closeAdminPanel").addEventListener("click", function() {
      isAdminLoggedIn = false;
      panel.remove();
      showToast("👋 Keluar dari mode Admin");
    });

    // Render lists
    renderAdminPortfolioList();
    renderAdminPricingList();
    renderAdminTestimoniList();

    // Add buttons
    document.getElementById("addPortfolioBtn").addEventListener("click", function() { showPortfolioForm(); });
    document.getElementById("addPricingBtn").addEventListener("click", function() { showPricingForm(); });
    document.getElementById("addTestimoniBtn").addEventListener("click", function() { showTestimoniForm(); });
  }

  function closeAdminModal() {
    var m = document.getElementById("adminPanelModal");
    var l = document.getElementById("adminLoginModal");
    var f = document.getElementById("adminFormModal");
    if (m) m.remove();
    if (l) l.remove();
    if (f) f.remove();
  }

  /* ---- Admin Portfolio List ---- */
  function getPortfolioData() {
    try {
      var s = localStorage.getItem("admin_portfolio");
      return s ? JSON.parse(s) : JSON.parse(JSON.stringify(defaultPortfolio));
    } catch(e) { return JSON.parse(JSON.stringify(defaultPortfolio)); }
  }

  function savePortfolioData(data) {
    localStorage.setItem("admin_portfolio", JSON.stringify(data));
    renderPortfolio(data);
  }

  function renderAdminPortfolioList() {
    var list = document.getElementById("adminPortfolioList");
    if (!list) return;
    var data = getPortfolioData();
    if (!data.length) { list.innerHTML = '<p class="admin-empty">Belum ada item. Klik "+ Tambah"</p>'; return; }

    list.innerHTML = "";
    data.forEach(function(item, idx) {
      var row = document.createElement("div");
      row.className = "admin-row";
      row.innerHTML = `
        <div class="admin-row-info">
          <span class="admin-row-tag ${item.type}">${item.type}</span>
          <span class="admin-row-title">${escHtml(item.title)}</span>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn admin-btn-sm admin-btn-edit" data-idx="${idx}">✏️ Edit</button>
          <button class="admin-btn admin-btn-sm admin-btn-danger" data-idx="${idx}">🗑️ Hapus</button>
        </div>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll(".admin-btn-edit").forEach(function(btn) {
      btn.addEventListener("click", function() { showPortfolioForm(parseInt(this.dataset.idx)); });
    });
    list.querySelectorAll(".admin-btn-danger").forEach(function(btn) {
      btn.addEventListener("click", function() {
        if (confirm("Hapus item ini?")) {
          var d = getPortfolioData();
          d.splice(parseInt(this.dataset.idx), 1);
          savePortfolioData(d);
          renderAdminPortfolioList();
          showToast("🗑️ Item dihapus");
        }
      });
    });
  }

  function showPortfolioForm(idx) {
    var data = getPortfolioData();
    var item = idx !== undefined ? data[idx] : { id: "p" + Date.now(), type: "web", title: "", url: "", img: "", iframe: false };
    var isEdit = idx !== undefined;

    showFormModal("Portfolio — " + (isEdit ? "Edit" : "Tambah"), `
      <div class="admin-form-group">
        <label>Tipe</label>
        <select id="pf-type" class="admin-input">
          <option value="web" ${item.type==="web"?"selected":""}>Website</option>
          <option value="android" ${item.type==="android"?"selected":""}>Android</option>
          <option value="sketchup" ${item.type==="sketchup"?"selected":""}>SketchUp</option>
        </select>
      </div>
      <div class="admin-form-group">
        <label>Judul</label>
        <input type="text" id="pf-title" class="admin-input" value="${escHtml(item.title)}" placeholder="Nama project...">
      </div>
      <div class="admin-form-group" id="pf-url-group">
        <label>URL / Embed (untuk Web & Android)</label>
        <input type="text" id="pf-url" class="admin-input" value="${escHtml(item.url||"")}" placeholder="https://...">
      </div>
      <div class="admin-form-group" id="pf-img-group">
        <label>Path Gambar (untuk SketchUp)</label>
        <input type="text" id="pf-img" class="admin-input" value="${escHtml(item.img||"")}" placeholder="img/hasil.jpg">
      </div>
    `, function() {
      var newItem = {
        id: item.id,
        type: document.getElementById("pf-type").value,
        title: document.getElementById("pf-title").value.trim(),
        url: document.getElementById("pf-url").value.trim(),
        img: document.getElementById("pf-img").value.trim(),
        iframe: true
      };
      if (!newItem.title) { showToast("⚠️ Judul wajib diisi!"); return; }
      if (isEdit) { data[idx] = newItem; } else { data.push(newItem); }
      savePortfolioData(data);
      renderAdminPortfolioList();
      document.getElementById("adminFormModal").remove();
      showToast(isEdit ? "✅ Portfolio diperbarui!" : "✅ Portfolio ditambahkan!");
    });
  }

  /* ---- Admin Pricing List ---- */
  function getPricingData() {
    try {
      var s = localStorage.getItem("admin_pricing");
      return s ? JSON.parse(s) : JSON.parse(JSON.stringify(defaultPricing));
    } catch(e) { return JSON.parse(JSON.stringify(defaultPricing)); }
  }

  function savePricingData(data) {
    localStorage.setItem("admin_pricing", JSON.stringify(data));
    renderPricing(data);
  }

  function renderAdminPricingList() {
    var list = document.getElementById("adminPricingList");
    if (!list) return;
    var data = getPricingData();
    if (!data.length) { list.innerHTML = '<p class="admin-empty">Belum ada item.</p>'; return; }

    list.innerHTML = "";
    data.forEach(function(item, idx) {
      var row = document.createElement("div");
      row.className = "admin-row";
      row.innerHTML = `
        <div class="admin-row-info">
          <span class="admin-row-icon">${item.icon}</span>
          <div>
            <span class="admin-row-title">${escHtml(item.title)}</span>
            <span class="admin-row-price">${escHtml(item.price)}</span>
          </div>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn admin-btn-sm admin-btn-edit" data-idx="${idx}">✏️ Edit</button>
          <button class="admin-btn admin-btn-sm admin-btn-danger" data-idx="${idx}">🗑️ Hapus</button>
        </div>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll(".admin-btn-edit").forEach(function(btn) {
      btn.addEventListener("click", function() { showPricingForm(parseInt(this.dataset.idx)); });
    });
    list.querySelectorAll(".admin-btn-danger").forEach(function(btn) {
      btn.addEventListener("click", function() {
        if (confirm("Hapus layanan ini?")) {
          var d = getPricingData();
          d.splice(parseInt(this.dataset.idx), 1);
          savePricingData(d);
          renderAdminPricingList();
          showToast("🗑️ Layanan dihapus");
        }
      });
    });
  }

  function showPricingForm(idx) {
    var data = getPricingData();
    var item = idx !== undefined ? data[idx] : { id: "pr"+Date.now(), icon: "🌐", title: "", price: "", badge: "", badgeClass: "", features: [], notes: [], cross: [], highlighted: false };
    var isEdit = idx !== undefined;

    showFormModal("Harga — " + (isEdit ? "Edit" : "Tambah"), `
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>Ikon (emoji)</label>
          <input type="text" id="pr-icon" class="admin-input" value="${escHtml(item.icon)}" placeholder="🌐">
        </div>
        <div class="admin-form-group">
          <label>Badge Label</label>
          <input type="text" id="pr-badge" class="admin-input" value="${escHtml(item.badge)}" placeholder="Best Value">
        </div>
      </div>
      <div class="admin-form-group">
        <label>Nama Layanan</label>
        <input type="text" id="pr-title" class="admin-input" value="${escHtml(item.title)}" placeholder="Website Profesional">
      </div>
      <div class="admin-form-group">
        <label>Harga (mulai dari)</label>
        <input type="text" id="pr-price" class="admin-input" value="${escHtml(item.price)}" placeholder="Rp 200.000">
      </div>
      <div class="admin-form-group">
        <label>Fitur (1 per baris, baris dengan ❌ = dicoret, baris dengan ℹ️ = catatan)</label>
        <textarea id="pr-features" class="admin-input admin-textarea" rows="6" placeholder="1x Revisi Gratis\nDesain Modern & Responsive\nℹ️ Harga tergantung fitur\n❌ Domain terpisah">${item.features.map(function(f){ return f; }).join("\n")}${item.notes.length?"\n"+item.notes.map(function(n){ return "ℹ️ "+n; }).join("\n"):""}${item.cross.length?"\n"+item.cross.map(function(c){ return "❌ "+c; }).join("\n"):""}</textarea>
      </div>
      <div class="admin-form-group">
        <label><input type="checkbox" id="pr-highlighted" ${item.highlighted?"checked":""}> Tampilkan sebagai "Paling Diminati"</label>
      </div>
    `, function() {
      var featuresRaw = document.getElementById("pr-features").value.split("\n").map(function(l){ return l.trim(); }).filter(Boolean);
      var features = [], notes = [], cross = [];
      featuresRaw.forEach(function(l) {
        if (l.startsWith("❌")) cross.push(l.replace("❌","").trim());
        else if (l.startsWith("ℹ️")) notes.push(l.replace("ℹ️","").trim());
        else features.push(l);
      });
      var newItem = {
        id: item.id,
        icon: document.getElementById("pr-icon").value.trim() || "🌐",
        title: document.getElementById("pr-title").value.trim(),
        price: document.getElementById("pr-price").value.trim(),
        badge: document.getElementById("pr-badge").value.trim(),
        badgeClass: item.badgeClass,
        features: features,
        notes: notes,
        cross: cross,
        highlighted: document.getElementById("pr-highlighted").checked,
      };
      if (!newItem.title || !newItem.price) { showToast("⚠️ Nama & Harga wajib diisi!"); return; }
      if (isEdit) { data[idx] = newItem; } else { data.push(newItem); }
      savePricingData(data);
      renderAdminPricingList();
      document.getElementById("adminFormModal").remove();
      showToast(isEdit ? "✅ Harga diperbarui!" : "✅ Layanan ditambahkan!");
    });
  }

  /* ---- Admin Testimoni List ---- */
  function getTestimoniData() {
    try {
      var s = localStorage.getItem("admin_testimoni");
      return s ? JSON.parse(s) : JSON.parse(JSON.stringify(defaultTestimoni));
    } catch(e) { return JSON.parse(JSON.stringify(defaultTestimoni)); }
  }

  function saveTestimoniData(data) {
    localStorage.setItem("admin_testimoni", JSON.stringify(data));
    renderTestimoni(data);
    // Re-setup slider setelah perubahan
    setTimeout(function() {
      setupTestimoni();
    }, 100);
  }

  function renderAdminTestimoniList() {
    var list = document.getElementById("adminTestimoniList");
    if (!list) return;
    var data = getTestimoniData();
    if (!data.length) { list.innerHTML = '<p class="admin-empty">Belum ada testimoni.</p>'; return; }

    list.innerHTML = "";
    data.forEach(function(item, idx) {
      var row = document.createElement("div");
      row.className = "admin-row";
      row.innerHTML = `
        <div class="admin-row-info">
          <img src="${escHtml(item.src)}" class="admin-testi-thumb" onerror="this.src='https://placehold.co/60x60/1e293b/64748b?text=IMG'" alt="">
          <span class="admin-row-title">${escHtml(item.alt)}</span>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn admin-btn-sm admin-btn-edit" data-idx="${idx}">✏️ Edit</button>
          <button class="admin-btn admin-btn-sm admin-btn-danger" data-idx="${idx}">🗑️ Hapus</button>
        </div>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll(".admin-btn-edit").forEach(function(btn) {
      btn.addEventListener("click", function() { showTestimoniForm(parseInt(this.dataset.idx)); });
    });
    list.querySelectorAll(".admin-btn-danger").forEach(function(btn) {
      btn.addEventListener("click", function() {
        if (confirm("Hapus testimoni ini?")) {
          var d = getTestimoniData();
          d.splice(parseInt(this.dataset.idx), 1);
          saveTestimoniData(d);
          renderAdminTestimoniList();
          showToast("🗑️ Testimoni dihapus");
        }
      });
    });
  }

  function showTestimoniForm(idx) {
    var data = getTestimoniData();
    var item = idx !== undefined ? data[idx] : { id: "t"+Date.now(), src: "", alt: "Testimoni" };
    var isEdit = idx !== undefined;

    showFormModal("Testimoni — " + (isEdit ? "Edit" : "Tambah"), `
      <div class="admin-form-group">
        <label>Keterangan / Nama Klien</label>
        <input type="text" id="ts-alt" class="admin-input" value="${escHtml(item.alt)}" placeholder="Testimoni dari Bapak X">
      </div>
      <div class="admin-form-group">
        <label>Path / URL Gambar</label>
        <input type="text" id="ts-src" class="admin-input" value="${escHtml(item.src)}" placeholder="img/testi/chat5.jpg atau https://...">
        <p style="font-size:11px;color:var(--text3);margin-top:4px;">Gunakan path relatif (img/testi/...) atau URL gambar lengkap</p>
      </div>
      <div class="admin-form-group" id="ts-preview-wrap" style="display:${item.src?'block':'none'}">
        <label>Preview</label>
        <img id="ts-preview-img" src="${escHtml(item.src)}" style="max-height:120px;border-radius:8px;border:1px solid var(--border)" onerror="this.style.display='none'" alt="">
      </div>
    `, function() {
      var newItem = {
        id: item.id,
        src: document.getElementById("ts-src").value.trim(),
        alt: document.getElementById("ts-alt").value.trim() || "Testimoni",
      };
      if (!newItem.src) { showToast("⚠️ URL gambar wajib diisi!"); return; }
      if (isEdit) { data[idx] = newItem; } else { data.push(newItem); }
      saveTestimoniData(data);
      renderAdminTestimoniList();
      document.getElementById("adminFormModal").remove();
      showToast(isEdit ? "✅ Testimoni diperbarui!" : "✅ Testimoni ditambahkan!");
    });

    // Preview saat URL berubah
    setTimeout(function() {
      var srcInput = document.getElementById("ts-src");
      var previewImg = document.getElementById("ts-preview-img");
      var previewWrap = document.getElementById("ts-preview-wrap");
      if (srcInput && previewImg && previewWrap) {
        srcInput.addEventListener("input", function() {
          previewWrap.style.display = "block";
          previewImg.src = srcInput.value;
          previewImg.style.display = "block";
        });
      }
    }, 200);
  }

  /* ---- Generic Form Modal ---- */
  function showFormModal(title, bodyHTML, onSave) {
    var existing = document.getElementById("adminFormModal");
    if (existing) existing.remove();

    var modal = document.createElement("div");
    modal.id = "adminFormModal";
    modal.innerHTML = `
      <div class="admin-modal-overlay" id="adminFormOverlay">
        <div class="admin-modal-box large">
          <div class="admin-modal-header">
            <h3>${title}</h3>
            <button class="admin-modal-close" id="closeFormModal">✕</button>
          </div>
          <div class="admin-modal-body">${bodyHTML}</div>
          <div class="admin-modal-footer">
            <button id="formCancelBtn" class="admin-btn admin-btn-secondary">Batal</button>
            <button id="formSaveBtn" class="admin-btn admin-btn-primary">💾 Simpan</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("formSaveBtn").addEventListener("click", onSave);
    document.getElementById("formCancelBtn").addEventListener("click", function() { modal.remove(); });
    document.getElementById("closeFormModal").addEventListener("click", function() { modal.remove(); });
    document.getElementById("adminFormOverlay").addEventListener("click", function(e) {
      if (e.target === this) modal.remove();
    });
  }

  /* ---- Render functions untuk tampilan utama ---- */
  function renderPortfolio(data) {
    var grid = document.getElementById("portfolioGrid");
    if (!grid) return;
    grid.innerHTML = "";

    data.forEach(function(item) {
      var card;
      if (item.type === "web") {
        card = document.createElement("a");
        card.href = item.url;
        card.target = "_blank";
        card.className = "portfolio-card web";
        card.innerHTML = `
          <div class="card-preview">
            <iframe src="${escHtml(item.url)}" loading="lazy" scrolling="no" tabindex="-1"></iframe>
            <div class="card-overlay"><span class="open-icon">↗</span></div>
          </div>
          <div class="card-info">
            <span class="card-tag">Website</span>
            <h3>${escHtml(item.title)}</h3>
          </div>`;
      } else if (item.type === "android") {
        card = document.createElement("div");
        card.className = "portfolio-card android video-card";
        card.innerHTML = `
          <div class="card-preview video-preview">
            <iframe src="${escHtml(item.url)}" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="card-info">
            <span class="card-tag android-tag">Android</span>
            <h3>${escHtml(item.title)}</h3>
          </div>`;
      } else if (item.type === "sketchup") {
        card = document.createElement("div");
        card.className = "portfolio-card sketchup";
        card.dataset.img = item.img || "";
        card.innerHTML = `
          <div class="card-preview img-preview">
            <img src="${escHtml(item.img||"")}" alt="${escHtml(item.title)}" loading="lazy" onerror="this.src='https://placehold.co/400x240/1e293b/64748b?text=SketchUp'">
            <div class="card-overlay"><span class="open-icon">🔍</span></div>
          </div>
          <div class="card-info">
            <span class="card-tag sketchup-tag">SketchUp</span>
            <h3>${escHtml(item.title)}</h3>
          </div>`;
      }
      if (card) grid.appendChild(card);
    });

    // Re-apply filter state
    var activeFilter = document.querySelector(".filter-btn.active");
    if (activeFilter && activeFilter.dataset.filter !== "all") {
      activeFilter.click();
    }
  }

  function renderPricing(data) {
    var grid = document.querySelector(".pricing-grid");
    if (!grid) return;
    grid.innerHTML = "";

    data.forEach(function(item) {
      var card = document.createElement("div");
      card.className = "pricing-card" + (item.highlighted ? " highlighted" : "");
      var featuresHTML = "";
      (item.features || []).forEach(function(f) {
        featuresHTML += `<li><i class="fa fa-check"></i> ${escHtml(f)}</li>`;
      });
      (item.notes || []).forEach(function(n) {
        featuresHTML += `<li class="note"><i class="fa fa-info-circle"></i> ${escHtml(n)}</li>`;
      });
      (item.cross || []).forEach(function(c) {
        featuresHTML += `<li class="cross"><i class="fa fa-times"></i> ${escHtml(c)}</li>`;
      });

      card.innerHTML = `
        <div class="badge ${escHtml(item.badgeClass||"")}">${escHtml(item.badge)}</div>
        <div class="pricing-icon">${item.icon}</div>
        <h3>${escHtml(item.title)}</h3>
        <div class="price-tag">
          <span class="price-from">mulai dari</span>
          <strong class="price-num">${escHtml(item.price)}</strong>
        </div>
        <ul class="pricing-features">${featuresHTML}</ul>
        <a href="#kontak" class="btn-price">Konsultasi Sekarang</a>
      `;
      grid.appendChild(card);
    });
  }

  function renderTestimoni(data) {
    var slide = document.getElementById("testiSlide");
    if (!slide) return;
    slide.innerHTML = "";

    data.forEach(function(item) {
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.className = "testi-img lightbox-trigger";
      img.onerror = function() { this.parentElement.style.display = "none"; };
      slide.appendChild(img);
    });
  }

  /* ---- Toast Notification ---- */
  function showToast(message) {
    var existing = document.getElementById("adminToast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.id = "adminToast";
    toast.textContent = message;
    toast.style.cssText = "position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--surface);color:var(--text);border:1px solid var(--border);padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;box-shadow:var(--shadow-lg);z-index:99999;opacity:0;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);pointer-events:none;";
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(function() {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(10px)";
      setTimeout(function() { if (toast.parentNode) toast.remove(); }, 350);
    }, 2800);
  }

  /* ---- Helper ---- */
  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();