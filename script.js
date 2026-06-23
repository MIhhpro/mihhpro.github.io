// ── Ambient pointer ──────────────────────────────────────────
const root = document.documentElement;
window.addEventListener("pointermove", (e) => {
  root.style.setProperty("--mx", `${Math.round((e.clientX / innerWidth) * 100)}%`);
  root.style.setProperty("--my", `${Math.round((e.clientY / innerHeight) * 100)}%`);
}, { passive: true });

// ── Header scroll ────────────────────────────────────────────
const header = document.querySelector(".site-header");
if (header) {
  const tick = () => header.classList.toggle("is-scrolled", scrollY > 24);
  tick();
  addEventListener("scroll", tick, { passive: true });
}

// ── Lift preload state after first paint (re-enables transitions) ──
requestAnimationFrame(() => {
  requestAnimationFrame(() => document.documentElement.classList.remove("preload"));
});

// ── Hamburger / mobile menu ──────────────────────────────────
const burger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ── Active nav link ──────────────────────────────────────────
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
  const href = a.getAttribute("href") || "";
  if (href === page || (page === "" && href === "index.html")) {
    a.classList.add("active");
  }
});

// ── Reveal on scroll ─────────────────────────────────────────
window.__revealInit = true;
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6 * 80, 320)}ms`;
    obs.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}

// ── Floating scroll-to-top ───────────────────────────────────
(function scrollTopBtn() {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Vissza az oldal tetejére");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg>';
  document.body.appendChild(btn);

  const toggle = () => btn.classList.toggle("visible", scrollY > 400);
  toggle();
  addEventListener("scroll", toggle, { passive: true });
  btn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
})();

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ── Calendar widget ──────────────────────────────────────────
(function initCalendar() {
  const cal = document.querySelector(".calendar-shell");
  if (!cal) return;

  // Available days: Mon/Wed/Fri/Sat  (1,3,5,6)
  const availDow = new Set([1, 3, 5, 6]);
  let current = new Date();
  let selected = null;

  const monthNames = [
    "Január","Február","Március","Április","Május","Június",
    "Július","Augusztus","Szeptember","Október","November","December"
  ];

  function render() {
    const titleEl = cal.querySelector(".cal-month-title");
    if (titleEl) titleEl.textContent = `${monthNames[current.getMonth()]} ${current.getFullYear()}`;

    const grid = cal.querySelector(".cal-days");
    if (!grid) return;
    grid.innerHTML = "";

    const first = new Date(current.getFullYear(), current.getMonth(), 1);
    const last  = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    const today = new Date(); today.setHours(0,0,0,0);

    // leading empty cells (Mon = 0 offset)
    let startDow = first.getDay(); // 0=Sun
    startDow = startDow === 0 ? 6 : startDow - 1; // convert to Mon-based
    for (let i = 0; i < startDow; i++) {
      const empty = document.createElement("div");
      empty.className = "cal-day empty";
      grid.appendChild(empty);
    }

    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(current.getFullYear(), current.getMonth(), d);
      const div = document.createElement("div");
      div.className = "cal-day";
      div.textContent = d;

      if (date < today) {
        div.classList.add("past");
      } else {
        if (availDow.has(date.getDay())) div.classList.add("available");
        if (date.toDateString() === today.toDateString()) div.classList.add("today");
        if (selected && date.toDateString() === selected.toDateString()) div.classList.add("selected");
        if (!div.classList.contains("past")) {
          div.addEventListener("click", () => {
            if (!div.classList.contains("available")) return;
            selected = date;
            render();
            // update hidden field in form if present
            const hiddenDate = document.querySelector("#selected-date");
            if (hiddenDate) hiddenDate.value = date.toLocaleDateString("hu-HU");
            // show date label
            const label = document.querySelector(".selected-date-label");
            if (label) {
              label.textContent = `Kiválasztott időpont: ${date.toLocaleDateString("hu-HU", {weekday:"long", year:"numeric", month:"long", day:"numeric"})}`;
              label.style.display = "block";
            }
          });
        }
      }
      grid.appendChild(div);
    }
  }

  cal.querySelector(".cal-prev")?.addEventListener("click", () => {
    current = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    render();
  });
  cal.querySelector(".cal-next")?.addEventListener("click", () => {
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    render();
  });

  render();
})();

// ── Contact form ─────────────────────────────────────────────
const contactForm = document.querySelector(".js-contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".form-submit");
    btn.textContent = "Küldés...";
    btn.disabled = true;

    // Simulate send (replace with real endpoint / EmailJS / Formspree)
    setTimeout(() => {
      contactForm.style.display = "none";
      const success = document.querySelector(".form-success");
      if (success) success.classList.add("visible");
    }, 1200);
  });
}

// ── Gallery lightbox (simple) ────────────────────────────────
document.querySelectorAll(".gallery-item").forEach(item => {
  item.setAttribute("tabindex", "0");
  item.setAttribute("role", "button");
  const open = () => {
    const img = item.querySelector("img");
    if (!img) return;
    const overlay = document.createElement("div");
    overlay.style.cssText = `position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.92);display:grid;place-items:center;cursor:zoom-out;`;
    const i = document.createElement("img");
    i.src = img.src; i.alt = img.alt;
    i.style.cssText = `max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 40px 100px rgba(0,0,0,.7);`;
    overlay.appendChild(i);
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  };
  item.addEventListener("click", open);
  item.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
});

// ── Profile card 3D tilt effect ──────────────────────────────
const profileCard = document.querySelector(".profile-card");
if (profileCard) {
  profileCard.addEventListener("mousemove", (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -1 to 1 range
    const xPercent = (x / rect.width) * 2 - 1;
    const yPercent = (y / rect.height) * 2 - 1;
    
    // Inverse rotation: mouse at top-left tilts bottom-right up
    const rotateX = yPercent * 12; // Tilt up/down
    const rotateY = xPercent * -12; // Tilt left/right
    
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
}

