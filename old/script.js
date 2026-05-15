/* =============================================
   MINH NGUYEN-PORTFOLIO  |  script.js
   ============================================= */

// ── LANGUAGE & THEME BOOTSTRAP (runs instantly, before CSS paint) ─────────
// Set html[lang] and data-theme from localStorage *before* the browser
// renders any content, so CSS selectors like html[lang="vi"] .lang-en
// kick in on first paint-no flash of English on navigating between pages.
(function () {
  var lang = localStorage.getItem("lang");
  if (lang === "vi") document.documentElement.lang = "vi";

  var theme = localStorage.getItem("theme");
  if (theme === "dark") document.documentElement.dataset.theme = "dark";
})();

// ── TRANSLATIONS ──────────────────────────────
const i18n = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",

    "hero.base": "I design things people",
    "hero.cta": "See my work",
    "hero.words": ["enjoy using", "find effective", "easily interact with"],

    "work.label": "Selected Work-2022-2025",

    "p1.tag": "Product Design",
    "p1.title": "Project Delta",
    "p2.tag": "Product Design",
    "p2.title": "Heraxury Fashion",
    "p3.tag": "Mobile Design",
    "p3.title": "Campaign Screen",
    "p4.tag": "Coming Soon",
    "p4.title": "Creative Archive",

    "p5.tag": "Mobile Design",
    "p5.title": "TopTop E-commerce",

    "about.heading": "Logic <em>&amp;</em> Visuals.",
    "about.p1":
      "I'm Nguyen Quang Minh, a UI/UX Designer based in Hanoi, Vietnam. I specialise in the intersection of <strong>Logic &amp; Visuals</strong>, turning complex problems into intuitive, pixel-perfect experiences that users genuinely enjoy to use.",
    "about.p2":
      "Currently open to freelance projects and full-time opportunities. Let's build something meaningful together.",

    "footer.copy": "© 2025 Minh Nguyen. All rights reserved.",
  },
  vi: {
    "nav.work": "Dự án",
    "nav.about": "Về tôi",

    "hero.base": "Tôi thiết kế sản phẩm mà người dùng",
    "hero.cta": "Xem dự án",
    "hero.words": ["thích dùng", "thấy hiệu quả", "tương tác dễ dàng"],

    "work.label": "Một số dự án đã làm",

    "p1.tag": "Thiết kế sản phẩm",
    "p1.title": "Project Delta Portal",
    "p2.tag": "Thiết kế sản phẩm",
    "p2.title": "Heraxury Fashion",
    "p3.tag": "Thiết kế sản phẩm Mobile",
    "p3.title": "Campaign Screen",
    "p4.tag": "Sắp ra mắt",
    "p4.title": "Lưu trữ sáng tạo",

    "p5.tag": "Thiết kế sản phẩm Mobile",
    "p5.title": "Thương mại điện tử TopTop",

    "about.heading": "Logic <em>&amp;</em> Visuals.",
    "about.p1":
      "Tôi là Nguyễn Quang Minh, UI/UX Designer tại Hà Nội. Tôi chuyên về sự giao thoa giữa <strong>Logic &amp; Hình ảnh</strong>-biến những vấn đề phức tạp thành những trải nghiệm trực quan, hoàn hảo từng pixel.",
    "about.p2":
      "Hiện đang mở cửa với các dự án freelance và cơ hội toàn thời gian. Hãy cùng nhau tạo ra điều gì đó.",

    "footer.copy": "© 2025 Nguyễn Quang Minh-Bảo lưu mọi quyền",
  },
};

// ── STATE ──────────────────────────────────────
let currentLang = localStorage.getItem("lang") || "en";
let currentTheme = localStorage.getItem("theme") || "light";

// ── TYPEWRITER state (declared up here so they are available to functions below)
// twEl may be null on pages that don't have the typewriter
let twEl = document.getElementById("typewriterWord");
let twWords = i18n[currentLang]["hero.words"];
let twIndex = 0;
let twTimer = null;

const HOLD_MS = 2500;
const TYPE_MS = 60;
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
    if (cur.length === 0) {
      cb();
      return;
    }
    twEl.textContent = cur.slice(0,-1);
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

  // Regular data-i18n elements (Nav, Footer)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) el.innerHTML = strings[key];
  });

  // Lang label shows current language (EN or VI)
  const langLabel = document.getElementById("langLabel");
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  document.documentElement.lang = lang;

  // Reset typewriter for new language if it exists on this page
  if (twEl) {
    twReset(strings["hero.words"]);
  }

  // Prevent overwriting inner <span> structures in the hero headline
  const heroBaseEl = document.getElementById("heroBase");
  if (heroBaseEl) {
    const enSpan = heroBaseEl.querySelector(".lang-en");
    const viSpan = heroBaseEl.querySelector(".lang-vi");
    // Only overwrite if it's plain text (no spans inside)
    if (!enSpan && !viSpan) {
      heroBaseEl.textContent = strings["hero.base"];
    }
  }
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
  { threshold: 0.12 },
);

document.querySelectorAll(".fade-up, .fade-in, .work-item").forEach((el) => {
  // If element is already in view (like the hero), reveal it immediately
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add("visible");
  } else {
    revealObserver.observe(el);
  }
});

// ── BACK TO TOP ────────────────────────────────
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── IMAGE LIGHTBOX ─────────────────────────────
// ── IMAGE LIGHTBOX ─────────────────────────────
const initLightbox = () => {
  const images = Array.from(
    document.querySelectorAll(".zoomable, .img-frame img"),
  );
  if (images.length === 0) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  lightbox.innerHTML = `
    <div class="lightbox-controls">
      <div class="zoom-info">
        <span class="zoom-percent">100%</span>
        <div class="zoom-bar-wrap">
          <div class="zoom-track">
            <div class="zoom-bar-fill" style="width: 0%"></div>
            <div class="zoom-bar-thumb" style="left: 0%"></div>
          </div>
        </div>
      </div>
      <div class="lightbox-close" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
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
  let currentScale = 1;
  let isDragging = false;
  let isSliderDragging = false; // Added missing declaration
  let wasDragged = false; // Flag to prevent click event after drag
  let startX, startY;
  let translateX = 0, translateY = 0;
  let dragThreshold = 5; // Pixels

  const updateZoomUI = () => {
    const percent = Math.round(currentScale * 100);
    const zoomLabel = lightbox.querySelector(".zoom-percent");
    const zoomFill = lightbox.querySelector(".zoom-bar-fill");
    const zoomThumb = lightbox.querySelector(".zoom-bar-thumb");
    
    if (zoomLabel) zoomLabel.textContent = `${percent}%`;
    const fillPercent = ((currentScale-1) / 3) * 100;
    if (zoomFill) zoomFill.style.width = `${fillPercent}%`;
    if (zoomThumb) zoomThumb.style.left = `${fillPercent}%`;
    
    imgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    imgElement.style.cursor = currentScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in";
  };

  const showImage = (index) => {
    if (index < 0) index = images.length-1;
    if (index >= images.length) index = 0;
    currentIndex = index;
    imgElement.src = images[currentIndex].src;
    imgElement.alt = images[currentIndex].alt;
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    };

  images.forEach((img, idx) => {
    img.addEventListener("click", () => {
      showImage(idx);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  imgElement.addEventListener("click", (e) => {
    e.stopPropagation();
    if (wasDragged) {
      wasDragged = false;
      return;
    }
    if (currentScale > 1) {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
    } else {
      currentScale = 2;
    }
    updateZoomUI();
  });


  imgElement.addEventListener("mousedown", (e) => {
    if (currentScale > 1) {
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX-translateX;
      startY = e.clientY-translateY;
      imgElement.style.transition = "none";
      updateZoomUI();
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (isDragging && lightbox.classList.contains("active")) {
      const dx = e.clientX-startX;
      const dy = e.clientY-startY;
      if (Math.abs(dx-translateX) > dragThreshold || Math.abs(dy-translateY) > dragThreshold) {
        wasDragged = true;
      }
      translateX = dx;
      translateY = dy;
      updateZoomUI();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      imgElement.style.transition = "transform 0.1s ease-out";
      updateZoomUI();
    }
  });

  lightbox.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ?-0.2 : 0.2;
      const oldScale = currentScale;
      currentScale = Math.min(Math.max(1, currentScale + delta), 4);

      if (currentScale === 1) {
        translateX = 0;
        translateY = 0;
      }
      updateZoomUI();
    },
    { passive: false },
  );

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateZoomUI();
    document.body.style.overflow = ""; // Restore scrolling
  };

  // ── ZOOM BAR INTERACTION ──
  const barWrap = lightbox.querySelector(".zoom-bar-wrap");
  const updateZoomFromX = (x) => {
    const rect = barWrap.getBoundingClientRect();
    let ratio = (x-rect.left) / rect.width;
    ratio = Math.min(Math.max(0, ratio), 1);
    currentScale = 1 + ratio * 3;
    if (currentScale === 1) {
      translateX = 0;
      translateY = 0;
    }
    updateZoomUI();
  };

  barWrap.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isSliderDragging = true;
    imgElement.style.transition = "none";
    updateZoomFromX(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (isSliderDragging && lightbox.classList.contains("active")) {
      updateZoomFromX(e.clientX);
    }
  });

  window.addEventListener("mouseup", () => {
    if (isSliderDragging) {
      isSliderDragging = false;
      imgElement.style.transition = "transform 0.1s ease-out";
    }
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest(".lightbox-close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex-1);
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
    <div class="lightbox-controls scroll-modal-controls">
      <div class="zoom-info">
        <span class="zoom-percent">100%</span>
        <div class="zoom-bar-wrap">
          <div class="zoom-track">
            <div class="zoom-bar-fill" style="width: 0%"></div>
            <div class="zoom-bar-thumb" style="left: 0%"></div>
          </div>
        </div>
      </div>
      <div class="lightbox-close scroll-modal-close" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
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
  let currentScale = 1;
  let isDragging = false;
  let wasDragged = false;
  let isSliderDragging = false;
  let startX, startY;
  let translateX = 0, translateY = 0;
  let dragThreshold = 5;

  const updateZoomUI = () => {
    const percent = Math.round(currentScale * 100);
    const zoomLabel = modal.querySelector(".zoom-percent");
    const zoomFill = modal.querySelector(".zoom-bar-fill");
    const zoomThumb = modal.querySelector(".zoom-bar-thumb");

    if (zoomLabel) zoomLabel.textContent = `${percent}%`;
    const fillPercent = ((currentScale-1) / 3) * 100;
    if (zoomFill) zoomFill.style.width = `${fillPercent}%`;
    if (zoomThumb) zoomThumb.style.left = `${fillPercent}%`;

    imgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    imgElement.style.cursor = currentScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in";
  };

  const showImage = (index) => {
    if (index < 0) index = triggers.length-1;
    if (index >= triggers.length) index = 0;
    currentIndex = index;
    const imgSrc = triggers[currentIndex].getAttribute("data-img");
    if (imgSrc) {
      imgElement.src = imgSrc;
      bodyElement.scrollTop = 0;
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      updateZoomUI();
    }
  };

  const closeModal = () => {
    modal.classList.remove("active");
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateZoomUI();
    document.body.style.overflow = ""; // Restore scrolling
  };

  // ── ZOOM BAR INTERACTION (MODAL) ──
  const barWrap = modal.querySelector(".zoom-bar-wrap");
  const updateZoomFromX = (x) => {
    const rect = barWrap.getBoundingClientRect();
    let ratio = (x-rect.left) / rect.width;
    ratio = Math.min(Math.max(0, ratio), 1);
    currentScale = 1 + ratio * 3;
    if (currentScale === 1) {
      translateX = 0;
      translateY = 0;
    }
    updateZoomUI();
  };

  barWrap.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isSliderDragging = true;
    imgElement.style.transition = "none";
    updateZoomFromX(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (isSliderDragging && modal.classList.contains("active")) {
      updateZoomFromX(e.clientX);
    }
  });

  window.addEventListener("mouseup", () => {
    if (isSliderDragging) {
      isSliderDragging = false;
      imgElement.style.transition = "transform 0.1s ease-out";
    }
  });

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      showImage(idx);
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  imgElement.addEventListener("click", (e) => {
    e.stopPropagation();
    if (wasDragged) {
      wasDragged = false;
      return;
    }
    if (currentScale > 1) {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
    } else {
      currentScale = 2;
    }
    updateZoomUI();
  });


  imgElement.addEventListener("mousedown", (e) => {
    if (currentScale > 1) {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX-translateX;
      startY = e.clientY-translateY;
      imgElement.style.transition = "none";
      updateZoomUI();
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (isDragging && modal.classList.contains("active")) {
      const dx = e.clientX-startX;
      const dy = e.clientY-startY;
      if (Math.abs(dx-translateX) > dragThreshold || Math.abs(dy-translateY) > dragThreshold) {
        wasDragged = true;
      }
      translateX = dx;
      translateY = dy;
      updateZoomUI();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      imgElement.style.transition = "transform 0.1s ease-out";
      updateZoomUI();
    }
  });

  modal.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ?-0.2 : 0.2;
      currentScale = Math.min(Math.max(1, currentScale + delta), 4);
      if (currentScale === 1) {
        translateX = 0;
        translateY = 0;
      }
      updateZoomUI();
    },
    { passive: false },
  );

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target === bodyElement ||
      e.target === modal ||
      e.target.closest(".scroll-modal-close")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showImage(currentIndex-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showImage(currentIndex + 1);
    }
  });
};

document.addEventListener("DOMContentLoaded", initLightbox);
document.addEventListener("DOMContentLoaded", initScrollModal);
