* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
}

body {
    background: #f5f7fa;
    color: #333;
}

/* ================= HEADER ================= */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

header .logo {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

header nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

header nav a {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  transition: opacity 0.25s ease;
}

header nav a:hover {
  opacity: 1;
}

/* ===== MOBILE HEADER ===== */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 10px;
    padding: 12px 5%;
  }

  header nav {
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
  }

  header nav a {
    font-size: 13px;
  }
}


header .logo {
    font-size: 20px;
    font-weight: bold;
}

header nav a {
    color: white;
    margin-left: 20px;
    text-decoration: none;
}

/* ===== NAV STRUCTURE ===== */
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links {
  display: flex;
  gap: 18px;
}


/* ===== HAMBURGER BUTTON ===== */
.hamburger {
  display: none;
  font-size: 22px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* ===== MOBILE MENU ===== */
@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    background: rgba(15, 23, 42, 0.97);
    backdrop-filter: blur(14px);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;

    padding: 22px 0;
    text-align: center;

    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.35s ease;

    z-index: 9999; /* ?? PENTING */
  }

  .nav-links.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-links a {
    color: #f8fafc;       /* ?? PAKSA PUTIH */
    font-size: 15px;
    font-weight: 500;
  }
}

header {
  position: sticky;
  top: 0;
  z-index: 1000;
}


/* ===== HERO TEXT ANIMATION ===== */
.hero-animate {
  opacity: 0;
  transform: translateY(16px);
  animation: heroFade 0.9s ease forwards;
}

.hero-animate.delay-1 {
  animation-delay: 0.25s;
}

@keyframes heroFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



/* Hero */
.hero {
  background: linear-gradient(
    to bottom,
    #60a5fa 0%,
    #93c5fd 45%,
    #e0f2fe 100%
  );
}


.hero h1 {
    font-size: 40px;
}

.hero p {
    margin: 15px 0 25px;
    font-size: 18px;
}

.btn-wa {
    background: #25D366;
    color: white;
    padding: 12px 25px;
    text-decoration: none;
    border-radius: 30px;
    font-weight: bold;
    display: inline-block;
}

/* Services */
.services {
    padding: 60px 8%;
    text-align: center;
}

.services h2 {
    margin-bottom: 30px;
}

.service-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    font-size: 18px;
}

/* Portfolio */
.portfolio {
    padding: 60px 8%;
    background: #e5e7eb;
    text-align: center;
}

.slider {
    position: relative;
    max-width: 800px;
    margin: auto;
}

.slide {
    display: none;
    width: 100%;
    border-radius: 15px;
}

.slide.active {
    display: block;
}

.slider button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    font-size: 25px;
    padding: 8px 12px;
    cursor: pointer;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

/* Contact */
.contact {
    padding: 60px 8%;
    text-align: center;
}

/* Footer */
footer {
    background: #0f172a;
    color: white;
    text-align: center;
    padding: 15px;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 28px;
    }

    header nav a {
        margin-left: 10px;
        font-size: 14px;
    }
}

.slide {
    display: none;
    width: 100%;
    height: auto;
    max-height: 80vh;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.slide.active {
    display: block;
}


@media (max-width: 768px) {
    .slide {
        height: 220px;
    }
}

.slider {
    position: relative;
    max-width: 900px;
    margin: auto;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .slide {
    max-height: 240px;
    object-fit: cover;
  }
}

.wa-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25D366;
  color: white;
  padding: 14px 18px;
  border-radius: 50px;
  font-weight: bold;
  z-index: 999;
}

section {
  max-width: 1200px;
  margin: auto;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

/* Dark Mode Button */
.dark-toggle {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

/* ================= DARK MODE ================= */
body.dark {
  background: #020617;
  color: #e5e7eb;
}

body.dark header,
body.dark footer {
  background: #020617;
}

body.dark .card,
body.dark .contact,
body.dark .services {
  background: #020617;
}

body.dark .portfolio {
  background: #020617;
}

body.dark a {
  color: #93c5fd;
}


* {
  transition: 
    background-color 0.35s ease,
    color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

/* ================= PREMIUM DARK MODE ================= */
body.dark {
  background: #020617;           /* navy dark */
  color: #e5e7eb;                /* soft white */
}

/* Header & Footer */
body.dark header,
body.dark footer {
  background: #020617;
  border-bottom: 1px solid #1e293b;
}

/* Section */
body.dark .services,
body.dark .contact,
body.dark .portfolio {
  background: #020617;
}

/* Card */
body.dark .card {
  background: #020617;
  border: 1px solid #1e293b;
  box-shadow: 0 0 0 rgba(0,0,0,0);
}

/* Hero */
body.dark .hero {
  background: linear-gradient(135deg, #020617, #020617);
}

/* Text accent */
body.dark h1,
body.dark h2 {
  color: #f8fafc;
}

/* Link */
body.dark a {
  color: #93c5fd;
}

/* Button WA */
body.dark .btn-wa {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 8px 20px rgba(34,197,94,0.35);
}

@media (max-width: 768px) {

  body.dark {
    background: #020617;
  }

  body.dark .hero h1 {
    font-size: 26px;
    line-height: 1.3;
  }

  body.dark .hero p {
    font-size: 15px;
    color: #cbd5f5;
  }

  body.dark .card {
    padding: 20px;
    font-size: 16px;
  }

  body.dark header nav a {
    color: #e5e7eb;
  }

  body.dark .slider button {
    background: rgba(15,23,42,0.85);
  }
}

body.dark .card:hover {
  border-color: #38bdf8;
  box-shadow: 0 0 20px rgba(56,189,248,0.15);
}

.fade {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.fade.show {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 769px) {
  .hero {
    background-attachment: fixed;
  }
}

/* Sponsor */
.sponsor {
  padding: 40px 8%;
  text-align: center;
  background: #f8fafc;
}

.sponsor-title {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.sponsor-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.sponsor-logo {
  width: 70px;
  opacity: 0.85;
}

.sponsor-social a {
  margin: 0 8px;
  font-size: 14px;
  text-decoration: none;
  color: #2563eb;
}

/* Dark Mode */
body.dark .sponsor {
  background: #020617;
}

body.dark .sponsor-title {
  color: #94a3b8;
}

body.dark .sponsor-social a {
  color: #93c5fd;
}

/* Mobile */
@media (max-width: 768px) {
  .sponsor-social a {
    display: inline-block;
    margin: 6px;
  }
}

/* ================= SPONSOR ICON ================= */
.sponsor {
  padding: 40px 8%;
  text-align: center;
  background: #f8fafc;
}

.sponsor-title {
  font-size: 13px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 18px;
}

.sponsor-icons {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.sponsor-icons img {
  width: 42px;
  height: 42px;
  opacity: 0.85;
  transition: all 0.35s ease;
}

/* Hover Glow */
.sponsor-icons a:hover img {
  opacity: 1;
  transform: translateY(-4px) scale(1.05);
  filter: drop-shadow(0 0 10px rgba(59,130,246,0.45));
}

/* Dark Mode */
body.dark .sponsor {
  background: #020617;
}

body.dark .sponsor-title {
  color: #94a3b8;
}

/* Mobile */
@media (max-width: 768px) {
  .sponsor-icons img {
    width: 38px;
    height: 38px;
  }
}

/* Glow per platform */
.icon img {
  transition: all 0.35s ease;
}

/* Instagram */
.icon.ig:hover img {
  filter: drop-shadow(0 0 12px rgba(236,72,153,0.7));
}

/* YouTube */
.icon.yt:hover img {
  filter: drop-shadow(0 0 12px rgba(239,68,68,0.7));
}

/* TikTok */
.icon.tt:hover img {
  filter: drop-shadow(0 0 12px rgba(34,211,238,0.7));
}

/* Facebook */
.icon.fb:hover img {
  filter: drop-shadow(0 0 12px rgba(59,130,246,0.7));
}

.sponsor-icons a {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s ease;
}

.sponsor.show .sponsor-icons a {
  opacity: 1;
  transform: translateY(0);
}

/* Delay satu-satu */
.sponsor.show .sponsor-icons a:nth-child(1) { transition-delay: 0.1s; }
.sponsor.show .sponsor-icons a:nth-child(2) { transition-delay: 0.25s; }
.sponsor.show .sponsor-icons a:nth-child(3) { transition-delay: 0.4s; }
.sponsor.show .sponsor-icons a:nth-child(4) { transition-delay: 0.55s; }


/* ================= TOOLTIP ================= */
.icon {
  position: relative;
}

.icon::after {
  content: attr(aria-label);
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  background: #020617;
  color: #f8fafc;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.25s ease;
}

/* Show tooltip */
.icon:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Light mode */
body:not(.dark) .icon::after {
  background: #0f172a;
  color: #f8fafc;
}

body:not(.dark) .icon.ig:hover img {
  filter: drop-shadow(0 0 10px rgba(236,72,153,0.5));
}

body:not(.dark) .icon.yt:hover img {
  filter: drop-shadow(0 0 10px rgba(239,68,68,0.5));
}

body:not(.dark) .icon.tt:hover img {
  filter: drop-shadow(0 0 10px rgba(34,211,238,0.5));
}

body:not(.dark) .icon.fb:hover img {
  filter: drop-shadow(0 0 10px rgba(59,130,246,0.5));
}

body.dark .icon.ig:hover img {
  filter: drop-shadow(0 0 14px rgba(236,72,153,0.7));
}

body.dark .icon.yt:hover img {
  filter: drop-shadow(0 0 14px rgba(239,68,68,0.7));
}

body.dark .icon.tt:hover img {
  filter: drop-shadow(0 0 14px rgba(34,211,238,0.7));
}

body.dark .icon.fb:hover img {
  filter: drop-shadow(0 0 14px rgba(59,130,246,0.7));
}

@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

.sponsor-icons a {
  animation: float 4s ease-in-out infinite;
}

/* Delay beda-beda */
.sponsor-icons a:nth-child(1) { animation-delay: 0s; }
.sponsor-icons a:nth-child(2) { animation-delay: 0.6s; }
.sponsor-icons a:nth-child(3) { animation-delay: 1.2s; }
.sponsor-icons a:nth-child(4) { animation-delay: 1.8s; }

/* Hover stop floating */
.sponsor-icons a:hover {
  animation-play-state: paused;
}

/* ================= GLASS EFFECT ================= */
.sponsor {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255,255,255,0.35);
}

/* Dark Mode Glass */
body.dark .sponsor {
  background: rgba(2, 6, 23, 0.7);
  border-top: 1px solid rgba(148,163,184,0.15);
}

/* ================= SCROLL INDICATOR ================= */
#scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, #2563eb, #22c55e);
  z-index: 9999;
  transition: width 0.1s ease;
}

/* Dark mode */
body.dark #scroll-indicator {
  background: linear-gradient(90deg, #38bdf8, #22c55e);
}

/* ================= CHAT BOX ================= */
.chat-trigger {
  padding: 12px 24px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  font-weight: 600;
}

.chat-box {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 300px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  display: none;
  flex-direction: column;
  z-index: 9999;
}

body.dark .chat-box {
  background: rgba(15,23,42,0.85);
  color: #fff;
}

.chat-header {
  padding: 12px 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.chat-body {
  padding: 16px;
  font-size: 14px;
}

.bot-msg {
  background: #e5e7eb;
  padding: 10px 12px;
  border-radius: 12px;
}

body.dark .bot-msg {
  background: #1e293b;
}

.chat-footer {
  padding: 12px;
  text-align: center;
}

.chat-wa {
  display: inline-block;
  padding: 10px 16px;
  background: #22c55e;
  color: #fff;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
}

.chat-body {
  padding: 16px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  background: #e5e7eb;
  opacity: 0;
  transform: translateY(10px);
  animation: chatIn 0.35s ease forwards;
}

body.dark .chat-msg {
  background: #1e293b;
  color: #fff;
}

@keyframes chatIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  background: #e5e7eb;
  opacity: 0;
  transform: translateY(10px);
  animation: chatIn 0.35s ease forwards;
}

body.dark .chat-msg {
  background: #1e293b;
  color: #fff;
}

.typing {
  display: inline-flex;
  gap: 4px;
}

.typing span {
  width: 6px;
  height: 6px;
  background: #888;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}

.typing span:nth-child(2) { animation-delay: .2s }
.typing span:nth-child(3) { animation-delay: .4s }

@keyframes blink {
  0% { opacity: .2 }
  20% { opacity: 1 }
  100% { opacity: .2 }
}

/* INPUT */
.chat-input {
  display: flex;
  gap: 8px;
  padding: 12px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* FULLSCREEN DI HP */
@media (max-width: 768px) {
  .chat-box {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
}

/* ===== HEADER CS ===== */
.cs-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cs-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.cs-status {
  font-size: 12px;
  color: #22c55e;
}

/* ===== CHAT BUBBLE ===== */
.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
}

/* LIGHT MODE */
body:not(.dark) .chat-msg {
  background: #e5e7eb;
  color: #111827;
}

/* DARK MODE */
body.dark .chat-msg {
  background: #1e293b;
  color: #f8fafc;
}

.cs-status {
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% { opacity: 0.4 }
  50% { opacity: 1 }
  100% { opacity: 0.4 }
}

/* STATUS ONLINE */
.cs-status.online {
  color: #22c55e; /* hijau */
}

/* STATUS OFFLINE */
.cs-status.offline {
  color: #94a3b8; /* abu */
}

/* Animasi hanya saat online */
.cs-status.online {
  animation: pulse 1.6s infinite;
}

.cs-status.offline {
  animation: none;
}

@keyframes pulse {
  0% { opacity: 0.4 }
  50% { opacity: 1 }
  100% { opacity: 0.4 }
}

/* ===== ANIMATED WA CTA ===== */
.cta-wa {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.wa-animated {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 40px;
  background: linear-gradient(135deg, #25D366, #16a34a);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35);
  animation: float 3s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Icon sedikit bounce */
.wa-icon {
  font-size: 20px;
  animation: bounce 1.8s infinite;
}

.wa-animated:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(37, 211, 102, 0.6);
}

/* Floating */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

/* Icon bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* DARK MODE */
body.dark .wa-animated {
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.45);
}

@media (max-width: 768px) {
  .wa-animated {
    font-size: 15px;
    padding: 12px 22px;
  }
}

.wa-text {
  display: inline-block;
  position: relative;
  animation: textIn 0.4s ease;
}

@keyframes textIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA TEXT COLOR */
body:not(.dark) .wa-text {
  color: #ffffff;
}

body.dark .wa-text {
  color: #e5e7eb;
}

.chat-box.show {
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
}

.hero-stats div {
  background: rgba(255,255,255,0.15);
  padding: 14px 20px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
}

.hero-stats strong {
  font-size: 20px;
  display: block;
}

.hero-stats span {
  font-size: 13px;
  opacity: 0.85;
}

@media (max-width:768px){
  .hero-stats{
    flex-direction: column;
    gap: 12px;
  }
}

.why-us {
  padding: 60px 8%;
  text-align: center;
}
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 20px;
}

.testimoni {
  padding: 60px 8%;
  text-align: center;
  background: #f1f5f9;
}
.testi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 20px;
}
body.dark .testimoni {
  background: #020617;
}

.closing-cta {
  padding: 80px 8%;
  text-align: center;
  background: linear-gradient(135deg,#2563eb,#1e40af);
  color: #fff;
}

/* ================= CONTACT UPGRADE ================= */
.contact-sub {
  margin: 10px 0 30px;
  font-size: 15px;
  color: #64748b;
}

.contact-card {
  max-width: 520px;
  margin: auto;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 45px rgba(0,0,0,0.12);
}

.contact-info p {
  margin: 6px 0;
}

.contact-wa {
  font-size: 17px;
  font-weight: 600;
}

.contact-status {
  font-size: 13px;
  color: #22c55e;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 6px;
}

.contact-status .dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 1.6s infinite;
}

.contact-action {
  margin-top: 25px;
}

.chat-trigger.big {
  padding: 16px 28px;
  font-size: 16px;
  border-radius: 40px;
  width: 100%;
}

.wa-counter.soft {
  margin-top: 12px;
  font-size: 13px;
  color: #64748b;
}

/* DARK MODE */
body.dark .contact-card {
  background: rgba(15,23,42,0.85);
  color: #e5e7eb;
}

body.dark .contact-sub,
body.dark .wa-counter.soft {
  color: #94a3b8;
}

/* ================= TESTIMONI CHAT ================= */
.testi-sub {
  margin: 10px 0 30px;
  font-size: 14px;
  color: #64748b;
}

.testi-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 18px;
  max-width: 900px;
  margin: auto;
}

.testi-img {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  border-radius: 18px;
  cursor: zoom-in;
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testi-img:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* Dark mode */
body.dark .testi-sub {
  color: #94a3b8;
}

/* ================= LIGHTBOX ================= */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.lightbox-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
}

.lightbox-close {
  position: absolute;
  top: 25px;
  right: 30px;
  font-size: 26px;
  color: #fff;
  cursor: pointer;
}

.closing-cta .wa-animated {
  margin-top: 10px;
}

/* ===== CTA POP ANIMATION ===== */
.closing-cta {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.8s ease;
}

.closing-cta.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Tombol bounce halus */
.closing-cta .wa-animated {
  animation: ctaBounce 2.8s infinite;
}

@keyframes ctaBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@media (max-width: 768px) {
  .closing-cta {
    padding: 90px 6%;
  }

  .closing-cta h2 {
    font-size: 26px;
    line-height: 1.3;
  }

  .closing-cta p {
    font-size: 15px;
    margin-bottom: 30px;
  }

  .closing-cta .wa-animated {
    width: 100%;
    justify-content: center;
    font-size: 16px;
    padding: 16px 0;
  }
}

/* CTA malam lebih soft */
body.dark .closing-cta .wa-animated {
  box-shadow: 0 8px 24px rgba(34,197,94,0.35);
}

.mini-dashboard {
  padding: 30px 8%;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}
body.dark .mini-dashboard {
  color: #94a3b8;
}

.cta-chart {
  padding: 30px 8%;
  max-width: 480px;
  margin: auto;
}

.bar {
  margin-bottom: 18px;
  font-size: 14px;
}

.bar-track {
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  height: 12px;
  margin-top: 6px;
}

.bar-fill {
  height: 100%;
  width: 0%;
  transition: width 0.8s ease;
}

.bar-fill.day {
  background: #22c55e;
}

.bar-fill.night {
  background: #6366f1;
}

.ig-cta {
  width: 100%;
  justify-content: center;
  font-size: 17px;
  padding: 18px 0;
  margin-top: 18px;
}

.trust-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 30px 8%;
  text-align: center;
  font-size: 14px;
  color: #475569;
}

@media (max-width: 768px) {
  .wa-sticky {
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 999;
  }
}

<style>
  /* Default tema terang */
  body {
    background-color: #ffffff;
    color: #000000;
    transition: background-color 0.5s, color 0.5s;
  }

  /* Tema gelap (malam) */
  body.dark-mode {
    background-color: #0e0e23;
    color: #ffffff;
  }

  /* Contoh style elemen lain */
  header a { color: inherit; }
  footer a { color: inherit; }
</style>

#sun-animation {
  position: fixed;
  top: -100px;
  right: 50%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #FFD700, #FFA500);
  animation: sunRise 5s ease forwards;
  z-index: -1;
}

@keyframes sunRise {
  from { top: -150px; opacity: 0; }
  to { top: 50px; opacity: 1; }
}





/* Hover efek */
.dark-toggle:hover {
  transform: scale(1.12) rotate(8deg);
  box-shadow:
    0 0 18px rgba(251,191,36,0.8),
    0 0 40px rgba(251,191,36,0.6);
}

/* Klik */
.dark-toggle:active {
  transform: scale(0.95);
}

/* ?? MODE TERANG */
body:not(.dark) .dark-toggle {
  background: radial-gradient(circle, #fde047, #f59e0b);
  color: #78350f;
  box-shadow:
    0 0 15px rgba(251,191,36,0.8),
    0 0 40px rgba(249,115,22,0.6);
}

/* Glow halus */
.dark-toggle::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.35), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.dark-toggle:hover::after {
  opacity: 1;
}

/* ================================
   ? RIPPLE CAHAYA TOGGLE
================================ */
.dark-toggle {
  overflow: hidden; /* WAJIB untuk ripple */
}

.dark-toggle .ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: rippleGlow 0.8s ease-out;
  pointer-events: none;
}

/* Ripple saat MODE TERANG */
body:not(.dark) .dark-toggle .ripple {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.9),
    rgba(251,191,36,0.6),
    rgba(249,115,22,0.4),
    rgba(249,115,22,0)
  );
}

/* Ripple saat MODE GELAP */
body.dark .dark-toggle .ripple {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.8),
    rgba(148,163,184,0.6),
    rgba(59,130,246,0.4),
    rgba(59,130,246,0)
  );
}

@keyframes rippleGlow {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* ================================
   ? DOUBLE RIPPLE + GLASS EFFECT
================================ */
.dark-toggle {
  overflow: hidden;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* Ripple layer */
.dark-toggle .ripple {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);
  animation: rippleCore 0.9s ease-out forwards;
}

/* Ripple luar (gelombang kedua) */
.dark-toggle .ripple::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: rippleOuter 1.2s ease-out forwards;
}

/* ?? MODE TERANG */
body:not(.dark) .dark-toggle .ripple {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.9),
    rgba(251,191,36,0.55),
    rgba(249,115,22,0.35),
    rgba(249,115,22,0)
  );
  backdrop-filter: blur(6px);
}

/* ?? MODE GELAP */
body.dark .dark-toggle .ripple {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.8),
    rgba(148,163,184,0.55),
    rgba(59,130,246,0.35),
    rgba(59,130,246,0)
  );
  backdrop-filter: blur(6px);
}

/* Gelombang luar lebih tipis */
.dark-toggle .ripple::after {
  background: inherit;
  opacity: 0.6;
}

/* Animasi */
@keyframes rippleCore {
  to {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes rippleOuter {
  to {
    transform: scale(4.5);
    opacity: 0;
  }
}

/* =================================
   ? TRIPLE RIPPLE (3x WAVE)
================================= */
.dark-toggle {
  overflow: hidden;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.dark-toggle .ripple {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dark-toggle .ripple span {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  opacity: 0.9;
  animation: rippleWave 1.2s ease-out forwards;
}

/* Delay gelombang */
.dark-toggle .ripple span:nth-child(1) { animation-delay: 0s; }
.dark-toggle .ripple span:nth-child(2) { animation-delay: 0.12s; }
.dark-toggle .ripple span:nth-child(3) { animation-delay: 0.24s; }

/* ?? MODE TERANG */
body:not(.dark) .dark-toggle .ripple span {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.95),
    rgba(251,191,36,0.55),
    rgba(249,115,22,0.35),
    rgba(249,115,22,0)
  );
  backdrop-filter: blur(6px);
}

/* ?? MODE GELAP */
body.dark .dark-toggle .ripple span {
  background: radial-gradient(
    circle,
    rgba(255,255,255,0.85),
    rgba(148,163,184,0.55),
    rgba(59,130,246,0.35),
    rgba(59,130,246,0)
  );
  backdrop-filter: blur(6px);
}

@keyframes rippleWave {
  to {
    transform: scale(4.5);
    opacity: 0;
  }
}

/* === CLOUD ANIMATION === */
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.cloud {
  position: absolute;
  opacity: 0.8;
  animation: moveCloud linear infinite;
}

.cloud1 {
  top: 15%;
  width: 180px;
  animation-duration: 60s;
}

.cloud2 {
  top: 35%;
  width: 250px;
  animation-duration: 90s;
}

.cloud3 {
  top: 55%;
  width: 200px;
  animation-duration: 75s;
}

@keyframes moveCloud {
  from {
    transform: translateX(-300px);
  }
  to {
    transform: translateX(110vw);
  }
}

/* ================= HERO ================= */
.hero {
  padding: 120px 6% 90px;
  text-align: center;
  position: relative;
}

#heroTitle {
  font-size: 42px;
  max-width: 820px;
  margin: 0 auto;
  line-height: 1.15;
  font-weight: 800;
}

#heroDesc {
  max-width: 720px;
  margin: 18px auto 0;
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.95;
}


header, .card, .contact-card {
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
}

.hero h1, .hero p {
  animation: fadeUp 1.2s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===============================
   ?? PREMIUM CLOUD SYSTEM
================================ */

.clouds {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.cloud {
  position: absolute;
  opacity: 0.85;
  filter: blur(0.5px);
  animation-name: cloudMove;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Layer depan */
.cloud1 {
  top: 18%;
  width: 200px;
  animation-duration: 70s;
}

/* Layer tengah */
.cloud2 {
  top: 38%;
  width: 280px;
  opacity: 0.7;
  animation-duration: 110s;
}

/* Layer belakang */
.cloud3 {
  top: 58%;
  width: 240px;
  opacity: 0.55;
  animation-duration: 90s;
}

@keyframes cloudMove {
  from {
    transform: translateX(-350px);
  }
  to {
    transform: translateX(120vw);
  }
}

/* Pastikan teks di atas awan */
.hero > *:not(.clouds) {
  position: relative;
  z-index: 3;
}

.hero h1 {
  animation: heroTitle 1.2s ease forwards;
}

.hero p {
  animation: heroText 1.6s ease forwards;
}

@keyframes heroTitle {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroText {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===============================
   ?? PREMIUM SUN SYSTEM
================================ */

/* ===============================
   ?? PREMIUM REALISTIC SUN
================================ */

.sun {
  position: absolute;
  top: 12%;
  left: -160px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  z-index: 0;

  background:
    radial-gradient(circle at 30% 30%, #fffbe6 0%, #fde047 35%, #f59e0b 60%, #ea580c 80%);

  box-shadow:
    0 0 60px rgba(253,224,71,0.9),
    0 0 120px rgba(249,115,22,0.7),
    0 0 200px rgba(249,115,22,0.4);

  animation: sunMove 160s linear infinite;
}

/* Solar glow pulse */
.sun::after {
  content: "";
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253,224,71,0.35), transparent 70%);
  animation: sunGlow 4s ease-in-out infinite alternate;
}

@keyframes sunGlow {
  from { transform: scale(1); opacity: 0.7; }
  to   { transform: scale(1.1); opacity: 1; }
}


@keyframes sunMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(120vw);
  }
}

/* Matahari hilang di dark mode */
body.dark .sun {
  display: none;
}

/* =================================
   ?? ANIMATED MOON PHASE
================================= */

.moon {
  position: absolute;
  top: 12%;
  left: -160px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: none;
  z-index: 0;
  overflow: hidden;

  background: radial-gradient(circle at 35% 35%, #ffffff 0%, #e5e7eb 60%, #cbd5e1 100%);

  box-shadow:
    0 0 40px rgba(226,232,240,0.6),
    0 0 100px rgba(148,163,184,0.35);

  animation: 
    moonMove 220s linear infinite,
    moonPhase 30s ease-in-out infinite;
}

/* SHADOW PHASE LAYER */
.moon::after {
  content: "";
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #020617;
  animation: phaseShift 30s ease-in-out infinite;
}

/* Gerakan bulan */
@keyframes moonMove {
  from { left: -160px; }
  to   { left: 120%; }
}

/* Efek cahaya naik turun halus */
@keyframes moonPhase {
  0%   { box-shadow: 0 0 40px rgba(226,232,240,0.6), 0 0 100px rgba(148,163,184,0.35); }
  50%  { box-shadow: 0 0 25px rgba(226,232,240,0.4), 0 0 60px rgba(148,163,184,0.25); }
  100% { box-shadow: 0 0 40px rgba(226,232,240,0.6), 0 0 100px rgba(148,163,184,0.35); }
}

/* FASE BULAN BERUBAH */
@keyframes phaseShift {
  0%   { right: -100%; }   /* Full moon */
  25%  { right: -40%; }    /* Half */
  50%  { right: -10%; }    /* Crescent */
  75%  { right: -40%; }    /* Half lagi */
  100% { right: -100%; }   /* Full lagi */
}


/* Shadow untuk half phase */
.moon::after {
  content: "";
  position: absolute;
  top: 0;
  right: -40%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #020617;
}


.moon-glow {
  position: absolute;
  inset: -50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
  z-index: -1;
}


/* Crater effect */
.moon::before {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  background: rgba(148,163,184,0.35);
  border-radius: 50%;
  top: 35px;
  left: 50px;
  box-shadow:
    40px 20px rgba(148,163,184,0.25),
    -30px 45px rgba(148,163,184,0.2);
}

/* Halo lembut */
.moon::after {
  content: "";
  position: absolute;
  inset: -35px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(226,232,240,0.2), transparent 70%);
}

body.dark .hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: 0.06;
  z-index: 1;
}

/* =================================
   ?? REALISTIC STAR FIELD
================================= */

body.dark .hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  background:
    radial-gradient(2px 2px at 20% 30%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 70% 60%, #fff, transparent),
    radial-gradient(1px 1px at 40% 80%, #fff, transparent),
    radial-gradient(2px 2px at 85% 20%, #fff, transparent),
    radial-gradient(1px 1px at 15% 75%, #fff, transparent);

  opacity: 0.6;
  animation: starTwinkle 4s infinite alternate;
}

@keyframes starTwinkle {
  from { opacity: 0.4; }
  to   { opacity: 0.8; }
}

/* =================================
   ?? SHOOTING STAR
================================= */

.shooting-star {
  position: absolute;
  top: 20%;
  left: -150px;
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, #fff, transparent);
  transform: rotate(25deg);
  opacity: 0;
  z-index: 2;
}

body.dark .shooting-star {
  animation: shoot 8s infinite;
}

@keyframes shoot {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(25deg);
  }
  10% {
    opacity: 1;
  }
  30% {
    transform: translateX(800px) translateY(200px) rotate(25deg);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}



@keyframes moonMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(120vw);
  }
}

/* Bulan hanya muncul saat dark */
body.dark .moon {
  display: block;
}

.hero > *:not(.clouds):not(.sun):not(.moon) {
  position: relative;
  z-index: 3;
}

/* ===============================
   ???? HERO TEXT STYLE
================================ */

body.night-text .hero-content h1 {
  color: #e5e7eb;
  text-shadow: 0 0 12px rgba(147,197,253,0.6);
}

body.night-text .hero-content p {
  color: #cbd5f5;
  opacity: 0.9;
}

.hero-content h1,
.hero-content p {
  transition: all 0.5s ease;
}

/* ===============================
   ???? HEADER DAY NIGHT
================================ */

header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  transition: all 0.4s ease;
}

/* SIANG */
body:not(.dark) header {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

body:not(.dark) .logo {
  color: #0f172a;
}

body:not(.dark) nav a {
  color: #1e293b;
}

/* MALAM */
body.dark header {
  background: rgba(2,6,23,0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(59,130,246,0.25);
}

body.dark .logo {
  color: #e5e7eb;
  text-shadow: 0 0 12px rgba(147,197,253,0.5);
}

body.dark nav a {
  color: #cbd5f5;
}

/* LINK */
nav a {
  margin: 0 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

nav a:hover {
  opacity: 0.7;
}

/* TOGGLE */
.dark-toggle {
  margin-left: 12px;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
  flex-shrink: 0; /* tombol TIDAK ngecil */
}


nav {
  display: flex;
  align-items: center;
  gap: 16px;              /* jarak antar menu */
  white-space: nowrap;   /* cegah teks kepotong */
}

nav a {
  flex-shrink: 0;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.hero-stats .stat {
  text-align: center;
  min-width: 90px;
}

.hero-stats strong {
  font-size: 1.6rem;
  display: block;
}

.hero-stats span {
  font-size: 0.9rem;
  opacity: 0.8;
}

.visitor-count {
  margin-top: 15px;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.85;
}

.dark-toggle {
  background: rgba(255,255,255,0.15);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s;
}

.dark-toggle:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

#darkIcon {
  font-size: 1.2rem;
}

#heroTitle {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.2;
}

#heroDesc {
  max-width: 700px;
  margin: 15px auto 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    padding: 90px 5% 70px;
  }

  #heroTitle {
    font-size: 28px;
    line-height: 1.25;
  }

  #heroDesc {
    font-size: 15px;
  }
}

.hero-stats {
  margin: 35px auto 0;
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
}

.hero-stats .stat {
  min-width: 90px;
}

.hero-stats strong {
  font-size: 22px;
  font-weight: 700;
}

.hero-stats span {
  font-size: 13px;
  opacity: 0.8;
}

.cta-wa {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .hero-stats {
    gap: 14px;
  }
}

/* ================= FORCE HAMBURGER VISIBILITY ================= */

/* default (PC) */
.hamburger {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #f8fafc;
  z-index: 1100;
}

/* MOBILE ONLY */
@media (max-width: 768px) {
  .hamburger {
    display: block !important;
  }
}

/* ================= MOBILE MENU COLOR FIX ================= */

/* DEFAULT (LIGHT MODE) */
body:not(.dark) .nav-links {
  background: #ffffff;
}

body:not(.dark) .nav-links a {
  color: #0f172a; /* dark text */
}

/* DARK MODE */
body.dark .nav-links {
  background: rgba(15, 23, 42, 0.97);
}

body.dark .nav-links a {
  color: #f8fafc;
}

body:not(.dark) .nav-links a {
  border-bottom: 1px solid rgba(15,23,42,0.08);
  padding-bottom: 6px;
}

/* ===== HAMBURGER ANIMATION ===== */
.hamburger {
  width: 26px;
  height: 18px;
  position: relative;
}

.hamburger span {
  position: absolute;
  height: 2px;
  width: 100%;
  background: currentColor;
  left: 0;
  transition: 0.3s ease;
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 8px; }
.hamburger span:nth-child(3) { bottom: 0; }

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg);
  bottom: 8px;
}

/* ===== HERO WORD ANIMATION ===== */
.hero-split span {
  display: inline-block;
  opacity: 0;
  transform: translateY(16px);
  animation: wordFade 0.6s ease forwards;
}

@keyframes wordFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== MENU UNDERLINE ANIMATION ===== */
.nav-links a {
  position: relative;
  padding: 6px 2px;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

/* ===== HERO SUBTITLE FADE ===== */
.hero-subtitle {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hero-subtitle.show {
  opacity: 1;
  transform: translateY(0);
}


nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

#darkToggle {
  margin-left: auto;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #333;
  color: white;
  font-size: 16px;
  transition: 0.3s;
}

#darkToggle:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }
}


.container {
  max-width: 1100px;
  margin: auto;
  padding: 0 20px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dark-toggle {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* =========================
   PRICING SECTION
========================= */

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 40px;
}

.pricing-card {
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

.pricing-card h3 {
  margin-bottom: 15px;
}

.price {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* ?? MODE SIANG */
body:not(.dark) .price {
  color: #0072ff;
}


/* ?? MODE MALAM */
body.dark .price {
  color: #ffd700;
}


.pricing-card ul {
  list-style: none;
  padding: 0;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.pricing-card {
  position: relative;
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  transition: 0.3s;
}

.pricing-card:hover {
  transform: translateY(-8px);
}

.highlight {
  border: 2px solid #00b894;
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: -12px;
  right: 15px;
  background: #ff4757;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 20px;
  font-weight: bold;
}

.badge.promo {
  background: #00b894;
}

.pricing-note {
  margin-top: 40px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  font-size: 14px;
}

.services-sub {
  margin-bottom: 30px;
  color: #555;
}


.btn-price {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 20px;
  text-decoration: none;
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  color: white;
  font-size: 14px;
  transition: 0.3s;
}

.btn-price:hover {
  opacity: 0.8;
}

/* =========================
   DARK MODE FIX
========================= */

body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode p,
body.dark-mode li,
body.dark-mode span {
  color: #f1f1f1;
}

/* Pricing Card Dark Mode */
body.dark-mode .pricing-card {
  background: #1e1e1e;
  color: #ffffff;
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
}

body.dark-mode .pricing-note {
  background: #1a1a1a;
  color: #dddddd;
}

/* Tombol */
body.dark-mode .btn-price {
  background: #00b894;
  color: white;
}

body.dark-mode .btn-price:hover {
  background: #00a383;
}

/* =========================
   DARK MODE TOTAL FIX
========================= */

body.dark,
body.dark-mode {
  background-color: #121212 !important;
  color: #ffffff !important;
}

/* Semua teks jadi terang */
body.dark *,
body.dark-mode * {
  color: #ffffff !important;
}

/* Card */
body.dark .pricing-card,
body.dark-mode .pricing-card {
  background: #1e1e1e !important;
  border: 1px solid #2c2c2c;
}

/* Note box */
body.dark .pricing-note,
body.dark-mode .pricing-note {
  background: #1a1a1a !important;
}

/* Badge tetap kontras */
body.dark .badge,
body.dark-mode .badge {
  color: #ffffff !important;
}

/* Glow Animation */
.glow {
  animation: glowEffect 1.5s infinite alternate;
}

@keyframes glowEffect {
  from {
    box-shadow: 0 0 5px #00b894;
  }
  to {
    box-shadow: 0 0 20px #00ffcc;
  }
}

/* Slot Counter */
.slot-counter {
  background: #fff3cd;
  color: #856404;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

/* Mini Testimoni */
.mini-testimoni {
  margin-top: 40px;
  text-align: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  font-size: 14px;
}

.highlight {
  border: 2px solid #00b894;
  transform: scale(1.05);
}

.wa-text {
  transition: opacity 0.3s ease-in-out;
}
