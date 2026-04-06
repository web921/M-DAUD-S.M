/* =====================================================
   M DAUD S.M — SCRIPT 2026
   All bugs fixed, modern features added
===================================================== */

(function () {
  "use strict";

  /* ================================================
     1. DOM READY
  ================================================ */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupTheme();
    setupSkyArc();      // ← sun/moon arc animation
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
    // Keep sky sync
    updateSkyElements(isDark);
  }

  function updateSkyElements(isDark) {
    // Handled purely via CSS body.dark class — nothing needed here
    // But we trigger shooting star in dark mode
    const shootingStar = document.getElementById("shootingStar");
    if (shootingStar) {
      shootingStar.style.display = isDark ? "block" : "none";
    }
  }

  function setupTheme() {
    // Load saved preference
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

    // Auto re-check every minute
    setInterval(applyThemeByTime, 60000);

    // Manual toggle
    const toggle = document.getElementById("darkToggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      manualOverride = true;
      clearTimeout(overrideTimer);

      const isDark = document.body.classList.toggle("dark");
      const icon = document.getElementById("darkIcon");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";

      // Persist preference
      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateSkyElements(isDark);

      // Auto-reset to time-based after 30 minutes
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
          if (window.scrollY > 20) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
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

    // Toggle
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on link click
    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC
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
     9. PORTFOLIO FILTER (WITH ANIMATION)
  ================================================ */
  function setupPortfolioFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".portfolio-card");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Active state
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        items.forEach(function (item, i) {
          const matches = filter === "all" || item.classList.contains(filter);

          // Animate out
          item.style.transition = "opacity 0.25s ease, transform 0.25s ease";
          item.style.opacity = "0";
          item.style.transform = "scale(0.92)";

          setTimeout(function () {
            item.style.display = matches ? "block" : "none";

            if (matches) {
              setTimeout(function () {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              }, 30 + i * 40);
            }
          }, 250);
        });
      });
    });
  }

  /* ================================================
     10. CHAT BOX SYSTEM
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

    let chatOpened = false;

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
          // Typing indicator
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
      if (chatOpened && chatBox.style.display === "flex") {
        chatBox.style.display = "none";
        return;
      }

      chatBox.style.display = "flex";
      chatMessages.innerHTML = "";

      if (waLink) waLink.style.display = "none";
      if (nameInputWrap) nameInputWrap.style.display = "flex";
      if (userNameInput) userNameInput.value = "";

      addMessage(getGreeting() + "! 👋 Saya Daud, Sales Executive kami.", "bot", 300)
        .then(function () {
          if (isOnline()) {
            return addMessage("Kami sedang online dan siap membantu Anda 😊", "bot", 200);
          } else {
            return addMessage("Saat ini kami offline 🙏 Pesan Anda akan kami balas segera setelah online.", "bot", 200);
          }
        })
        .then(function () {
          return addMessage("Boleh saya tahu nama Anda? 😊", "bot", 200);
        });

      chatOpened = true;
    }

    if (openChat) openChat.addEventListener("click", openChatBox);
    if (openChatFromCTA) openChatFromCTA.addEventListener("click", openChatBox);
    if (closeChat) closeChat.addEventListener("click", function () {
      chatBox.style.display = "none";
    });

    // Send name
    function handleSendName() {
      if (!userNameInput) return;
      const name = userNameInput.value.trim();
      if (!name) {
        userNameInput.classList.add("shake");
        setTimeout(function () { userNameInput.classList.remove("shake"); }, 500);
        return;
      }

      // Show user message
      const userMsg = document.createElement("div");
      userMsg.className = "chat-msg user";
      userMsg.textContent = name;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      if (nameInputWrap) nameInputWrap.style.display = "none";

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
     11. TESTIMONI SLIDER
  ================================================ */
  function setupTestimoni() {
    const slide = document.getElementById("testiSlide");
    const prevBtn = document.getElementById("testiPrev");
    const nextBtn = document.getElementById("testiNext");
    const dotsContainer = document.getElementById("testiDots");

    if (!slide) return;

    const imgs = slide.querySelectorAll(".testi-img");
    if (!imgs.length) return;

    const isMobile = function () { return window.innerWidth <= 480; };
    let perSlide = isMobile() ? 1 : (window.innerWidth <= 768 ? 2 : 4);
    let current = 0;
    let autoTimer;

    function totalSlides() {
      return Math.ceil(imgs.length / perSlide);
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
      const offset = current * (100 / perSlide) * perSlide;
      slide.style.transform = "translateX(-" + offset + "%)";
      updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      autoTimer = setInterval(next, 4000);
    }

    function stopAuto() { clearInterval(autoTimer); }

    if (prevBtn) prevBtn.addEventListener("click", function () { stopAuto(); prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopAuto(); next(); startAuto(); });

    // Touch swipe
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

    // Responsive rebuild
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
    startAuto();
  }

  /* ================================================
     12. LIGHTBOX (for sketchup images)
  ================================================ */
  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImg) return;

    // Attach to all lightbox-trigger images
    document.addEventListener("click", function (e) {
      const trigger = e.target.closest(".lightbox-trigger, .portfolio-card.sketchup");
      if (!trigger) return;

      let src = "";
      if (trigger.tagName === "IMG") {
        src = trigger.src;
      } else {
        const img = trigger.querySelector("img");
        if (img) src = img.src;
        else if (trigger.dataset.img) src = trigger.dataset.img;
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
      if (e.key === "Escape") closeLightbox();
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

    // Only activate on true pointer device
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    // Smooth ring follow
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    })();

    // Scale on hover
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

    // Hide when leaving window
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

    textEl.style.transition = "opacity 0.3s, transform 0.3s";
  }

  /* ================================================
     16. SUN / MOON ARC — Time-based position
  ================================================ */
  function setupSkyArc() {
    const sun  = document.getElementById("sunEl");
    const moon = document.getElementById("moonEl");
    if (!sun || !moon) return;

    /*
      Strategy:
      - Split 24 hours into DAY arc (06:00–18:00) and NIGHT arc (18:00–06:00).
      - Map current time to a 0–1 progress along its arc.
      - Arc path: parabola from left (5%) → top-center → right (95%), 
        with peak at ~top 10% of the hero.
      - Smoothly update position every 30 seconds.
      - On theme change, smoothly swap visibility.
    */

    function getArcPosition(progress) {
      // Normalized arc: x goes 5% → 95%, y follows an inverted parabola
      // progress: 0 = left horizon, 0.5 = top center, 1 = right horizon
      const xPct = 5 + progress * 90;          // 5% to 95%
      // parabola: y = A*(p-0.5)^2 + MIN_TOP
      // At p=0.5 → yPct = 8% (peak/high in sky)
      // At p=0   → yPct = 72% (horizon left)
      // At p=1   → yPct = 72% (horizon right)
      const A = (72 - 8) / (0.5 * 0.5);       // = 256
      const yPct = A * Math.pow(progress - 0.5, 2) + 8;
      return { x: xPct, y: yPct };
    }

    function getNow() { return new Date(); }

    function getProgress() {
      const now  = getNow();
      const h = now.getHours();
      const m = now.getMinutes();
      const totalMin = h * 60 + m;

      // DAY: 06:00 (360 min) → 18:00 (1080 min) = 720 min range
      // NIGHT: 18:00 (1080) → 30:00 next day (1800, i.e. 06:00+24h) = 720 min range

      const DAY_START  = 6  * 60;  // 360
      const DAY_END    = 18 * 60;  // 1080
      const NIGHT_END  = 30 * 60;  // 1800 (06:00 next day)

      const isDay = totalMin >= DAY_START && totalMin < DAY_END;

      let progress;
      if (isDay) {
        progress = (totalMin - DAY_START) / (DAY_END - DAY_START);
      } else {
        // Night: normalise night minutes (18:00 → 06:00 next day)
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

    // Run immediately, then every 30 seconds
    applyPosition();
    setInterval(applyPosition, 30000);

    // Also re-run on manual theme toggle so positions stay coherent
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
      container.appendChild(star);
    }
  }

  /* ================================================
     17. STATS SIMULATION (live-ish counter)
  ================================================ */
  function setupStatsSimulation() {
    const visitorEl = document.getElementById("visitorCount");
    const chatEl = document.getElementById("chatCount");
    if (!visitorEl && !chatEl) return;

    // Simulate organic visitor count
    let visitors = 1247;
    let chats = 89;

    function randomIncrement(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setInterval(function () {
      if (Math.random() > 0.6) {
        visitors += randomIncrement(1, 3);
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
        if (chatEl) {
          chatEl.textContent = chats;
        }
      }
    }, 15000);

    if (visitorEl) {
      visitorEl.style.transition = "transform 0.3s ease";
      visitorEl.textContent = visitors.toLocaleString("id-ID");
    }
    if (chatEl) chatEl.textContent = chats;
  }

})();