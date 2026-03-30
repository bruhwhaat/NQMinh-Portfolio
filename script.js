/* =============================================
   MINH NGUYEN - PORTFOLIO  |  script.js
   ============================================= */

// ── TRANSLATIONS ──────────────────────────────
const i18n = {
  en: {
    "nav.work":    "Work",
    "nav.about":   "About",

    "hero.base":   "I design things people",
    "hero.cta":    "See my work",
    "hero.words":  ["enjoy using", "find effective", "easily interact with"],

    "work.label":  "Selected Work - 2022-2025",

    "p1.tag":   "System Design",
    "p1.title": "Libeara",
    "p2.tag":   "Website Design - 2024",
    "p2.title": "Heraxury Fashion",
    "p3.tag":   "Mobile Design",
    "p3.title": "Campaign Screen",
    "p4.tag":   "Coming Soon",
    "p4.title": "Creative Archive",

    "about.heading": "Logic <em>&amp;</em> Visuals.",
    "about.p1": "I'm Nguyen Quang Minh, a UI/UX Designer based in Hanoi, Vietnam. I specialise in the intersection of <strong>Logic &amp; Visuals</strong>, turning complex problems into intuitive, pixel-perfect experiences that users genuinely enjoy to use.",
    "about.p2": "Currently open to freelance projects and full-time opportunities. Let's build something meaningful together.",

    "footer.copy": "© 2025 Minh Nguyen. All rights reserved.",
  },
  vi: {
    "nav.work":    "Dự án",
    "nav.about":   "Về tôi",

    "hero.base":   "Tôi thiết kế sản phẩm mà người dùng",
    "hero.cta":    "Xem dự án",
    "hero.words":  ["thích dùng", "thấy hiệu quả", "tương tác dễ dàng"],

    "work.label":  "Dự án nổi bật - 2022-2025",

    "p1.tag":   "Thiết kế sản phẩm - 2024",
    "p1.title": "Libeara Portal",
    "p2.tag":   "Thiết kế Website - 2024",
    "p2.title": "Heraxury Fashion",
    "p3.tag":   "Mobile Design",
    "p3.title": "Campaign Screen",
    "p4.tag":   "Sắp ra mắt",
    "p4.title": "Lưu trữ sáng tạo",

    "about.heading": "Logic <em>&amp;</em> Visuals.",
    "about.p1": "Tôi là Nguyễn Quang Minh, UI/UX Designer tại Hà Nội. Tôi chuyên về sự giao thoa giữa <strong>Logic &amp; Hình ảnh</strong> - biến những vấn đề phức tạp thành những trải nghiệm trực quan, hoàn hảo từng pixel.",
    "about.p2": "Hiện đang mở cửa với các dự án freelance và cơ hội toàn thời gian. Hãy cùng nhau tạo ra điều gì đó.",

    "footer.copy": "© 2025 Nguyễn Quang Minh - Bảo lưu mọi quyền",
  },
};

// ── STATE ──────────────────────────────────────
let currentLang  = localStorage.getItem("lang")  || "en";
let currentTheme = localStorage.getItem("theme") || "light";

// ── TYPEWRITER state (declared up here so they are available to functions below)
// twEl may be null on pages that don't have the typewriter
let twEl     = document.getElementById("typewriterWord");
let twWords  = i18n[currentLang]["hero.words"];
let twIndex  = 0;
let twTimer  = null;

const HOLD_MS   = 2500;
const TYPE_MS   = 60;
const DELETE_MS = 35;

function twType(word, cb) {
  let i = 0;
  (function step() {
    if (!twEl) return;
    twEl.textContent = word.slice(0, ++i);
    if (i < word.length) twTimer = setTimeout(step, TYPE_MS);
    else cb();
  })();
}

function twDelete(cb) {
  (function step() {
    if (!twEl) return;
    const cur = twEl.textContent;
    if (cur.length === 0) { cb(); return; }
    twEl.textContent = cur.slice(0, -1);
    twTimer = setTimeout(step, DELETE_MS);
  })();
}

function twCycle() {
  twTimer = setTimeout(() => {
    twDelete(() => {
      // Pause 500ms after delete, then type next word
      twTimer = setTimeout(() => {
        twIndex = (twIndex + 1) % twWords.length;
        twType(twWords[twIndex], twCycle);
      }, 500);
    });
  }, HOLD_MS);
}

function twReset(words) {
  clearTimeout(twTimer);
  twWords = words;
  twIndex = 0;
  if (twEl) twEl.textContent = words[0];
  twCycle();
}

// ── APPLY THEME ────────────────────────────────
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "";
}

// ── APPLY LANGUAGE ─────────────────────────────
function applyLang(lang) {
  const strings = i18n[lang];

  // Regular data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) el.innerHTML = strings[key];
  });

  // Hero base text (uiuxshowcase only)
  const heroBaseEl = document.getElementById("heroBase");
  if (heroBaseEl) heroBaseEl.textContent = strings["hero.base"];

  // Hero bounce CTA text (uiuxshowcase only)
  const heroCtaEl = document.getElementById("heroCta");
  if (heroCtaEl) heroCtaEl.querySelector("span").textContent = strings["hero.cta"];

  // Lang label shows current language
  const langLabel = document.getElementById("langLabel");
  if (langLabel) langLabel.textContent = lang === "en" ? "EN" : "VI";

  document.documentElement.lang = lang;

  // Reset typewriter for new language
  twReset(strings["hero.words"]);
}

// ── INIT ───────────────────────────────────────
applyTheme(currentTheme);
applyLang(currentLang);

// Start typewriter cycle (initial word already shown by applyLang > twReset)
// twCycle() is already called inside twReset, no need to call again here.

// ── THEME TOGGLE ───────────────────────────────
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
}

// ── LANG TOGGLE ────────────────────────────────
const langBtn = document.getElementById("langBtn");
if (langBtn) {
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "vi" : "en";
    localStorage.setItem("lang", currentLang);
    applyLang(currentLang);
  });
}

// ── SCROLL REVEAL ──────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".fade-up").forEach((el) => revealObserver.observe(el));

// ── BACK TO TOP ────────────────────────────────
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── IMAGE LIGHTBOX ─────────────────────────────
// ── IMAGE LIGHTBOX ─────────────────────────────
const initLightbox = () => {
  const images = Array.from(document.querySelectorAll(".zoomable, .img-frame img"));
  if (images.length === 0) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  
  lightbox.innerHTML = `
    <div class="lightbox-nav lightbox-prev">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
    <div class="lightbox-nav lightbox-next">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const imgElement = lightbox.querySelector("img");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  
  let currentIndex = 0;

  const showImage = (index) => {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;
    imgElement.src = images[currentIndex].src;
    imgElement.alt = images[currentIndex].alt;
  };

  images.forEach((img, idx) => {
    img.addEventListener("click", () => {
      showImage(idx);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
    setTimeout(() => { if(!lightbox.classList.contains("active")) imgElement.src = ""; }, 300);
  };

  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

  lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
};

// ── SCROLLABLE WINDOW MODAL ────────────────────
const initScrollModal = () => {
  const triggers = Array.from(document.querySelectorAll(".window-trigger"));
  if (triggers.length === 0) return;

  const modal = document.createElement("div");
  modal.className = "scroll-modal";
  
  modal.innerHTML = `
    <div class="scroll-modal-header">
      <button class="scroll-modal-close" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="lightbox-nav scroll-modal-prev">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
    <div class="lightbox-nav scroll-modal-next">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
    <div class="scroll-modal-body">
      <img class="scroll-modal-img" src="" alt="Full presentation view" />
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".scroll-modal-close");
  const prevBtn = modal.querySelector(".scroll-modal-prev");
  const nextBtn = modal.querySelector(".scroll-modal-next");
  const imgElement = modal.querySelector(".scroll-modal-img");
  const bodyElement = modal.querySelector(".scroll-modal-body");

  let currentIndex = 0;

  const showImage = (index) => {
    if (index < 0) index = triggers.length - 1;
    if (index >= triggers.length) index = 0;
    currentIndex = index;
    const imgSrc = triggers[currentIndex].getAttribute("data-img");
    if(imgSrc) {
      imgElement.src = imgSrc;
      bodyElement.scrollTop = 0;
    }
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
    setTimeout(() => {
      if(!modal.classList.contains("active")) {
        imgElement.src = "";
        bodyElement.scrollTop = 0;
      }
    }, 400);
  };

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      showImage(idx);
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

  modal.addEventListener("click", (e) => {
    if(e.target === bodyElement || e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") { e.preventDefault(); showImage(currentIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showImage(currentIndex + 1); }
  });
};

document.addEventListener("DOMContentLoaded", initLightbox);
document.addEventListener("DOMContentLoaded", initScrollModal);
