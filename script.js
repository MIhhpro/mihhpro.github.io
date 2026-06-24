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
    const isPhoneLike = window.matchMedia("(max-width: 768px)").matches;
    el.style.transitionDelay = isPhoneLike ? "0ms" : `${Math.min(i % 6 * 80, 320)}ms`;
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

// ── Count-up stats ───────────────────────────────────────────
(function initCountUp() {
  const counters = document.querySelectorAll("[data-countup]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    if (el.dataset.counted === "true") return;
    el.dataset.counted = "true";

    const target = Number.parseInt(el.getAttribute("data-countup") || "0", 10);
    if (!Number.isFinite(target) || target < 0) {
      el.textContent = "0";
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || target === 0) {
      el.textContent = String(target);
      return;
    }

    const duration = 1300;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = String(target);
      }
    };

    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.45 });

    counters.forEach((counter) => obs.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }
})();

// ── Calendar widget ──────────────────────────────────────────
(function initCalendar() {
  const cal = document.querySelector(".calendar-shell");
  if (!cal) return;

  // Available days: Mon/Wed/Fri/Sat  (1,3,5,6)
  const availDow = new Set([1, 3, 5, 6]);
  let current = new Date();
  let selected = null;
  const hiddenDate = document.querySelector("#selected-date");
  const timeSelect = document.querySelector("#selected-time");
  const label = document.querySelector(".selected-date-label");
  const timesDate = cal.querySelector(".cal-times-date");
  const timesWrap = cal.querySelector(".cal-time-slots");
  const backBtn = cal.querySelector(".cal-back");

  const monthNames = [
    "Január","Február","Március","Április","Május","Június",
    "Július","Augusztus","Szeptember","Október","November","December"
  ];

  const toIsoDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const prettyDate = (date) => date.toLocaleDateString("hu-HU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const updateSelectedLabel = () => {
    if (!label || !selected) return;
    const t = timeSelect?.value ? ` ${timeSelect.value}` : "";
    label.textContent = `Kiválasztott időpont: ${prettyDate(selected)}${t}`;
    label.style.display = "block";
  };

  const asStartLabel = (time) => time;

  const setTimeSelectOptions = (options, disabled = false) => {
    if (!timeSelect) return;
    timeSelect.innerHTML = "";
    options.forEach((opt) => {
      const el = document.createElement("option");
      el.value = opt.value;
      el.textContent = opt.label;
      el.disabled = Boolean(opt.disabled);
      timeSelect.appendChild(el);
    });
    timeSelect.disabled = disabled;
  };

  const openDaysStep = () => {
    cal.classList.remove("show-times");
  };

  const openTimesStep = () => {
    cal.classList.add("show-times");
  };

  const syncSlotSelection = () => {
    if (!timesWrap) return;
    timesWrap.querySelectorAll(".cal-time-btn").forEach((btn) => {
      btn.classList.toggle("is-selected", btn.dataset.time === timeSelect?.value);
    });
  };

  const renderTimeButtons = (availableTimes) => {
    if (!timesWrap) return;
    timesWrap.innerHTML = "";

    if (!availableTimes.length) {
      const empty = document.createElement("div");
      empty.className = "cal-time-empty";
      empty.textContent = "Erre a napra jelenleg nincs szabad idősáv.";
      timesWrap.appendChild(empty);
      return;
    }

    availableTimes.forEach((time) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-time-btn";
      btn.dataset.time = time;
      btn.textContent = asStartLabel(time);
      btn.addEventListener("click", () => {
        if (!timeSelect) return;
        timeSelect.value = time;
        timeSelect.dispatchEvent(new Event("change", { bubbles: true }));
        syncSlotSelection();
      });
      timesWrap.appendChild(btn);
    });

    syncSlotSelection();
  };

  const loadTimeSlots = async (date) => {
    if (!timeSelect) return;
    const isoDate = toIsoDate(date);
    setTimeSelectOptions([{ value: "", label: "Időpontok betöltése...", disabled: true }], true);

    try {
      const res = await fetch(`/api/slots?date=${encodeURIComponent(isoDate)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const payload = await res.json();
      const slots = Array.isArray(payload?.slots) ? payload.slots : [];
      const available = slots
        .filter((slot) => slot && slot.available && typeof slot.time === "string")
        .map((slot) => slot.time);

      if (!available.length) {
        setTimeSelectOptions([{ value: "", label: "Nincs elérhető időpont ezen a napon", disabled: true }], true);
        return [];
      }

      const optionList = [{ value: "", label: "Válassz időpontot..." }]
        .concat(available.map((time) => ({ value: time, label: asStartLabel(time) })));
      setTimeSelectOptions(optionList, false);
      return available;
    } catch {
      setTimeSelectOptions([{ value: "", label: "Szerver nem elérhető. Próbáld később.", disabled: true }], true);
      return [];
    }
  };

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
          div.addEventListener("click", async () => {
            if (!div.classList.contains("available")) return;
            selected = date;
            render();
            if (hiddenDate) {
              hiddenDate.value = date.toLocaleDateString("hu-HU");
              hiddenDate.dataset.isoDate = toIsoDate(date);
            }
            if (timeSelect) timeSelect.value = "";
            updateSelectedLabel();
            const availableTimes = await loadTimeSlots(date);
            if (timesDate) timesDate.textContent = prettyDate(date);
            renderTimeButtons(availableTimes);
            openTimesStep();
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

  if (timeSelect) {
    timeSelect.addEventListener("change", () => {
      if (!timeSelect.value) return;
      updateSelectedLabel();
      syncSlotSelection();
    });
  }

  backBtn?.addEventListener("click", openDaysStep);
})();

// ── Contact form ─────────────────────────────────────────────
const contactForm = document.querySelector(".js-contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".form-submit");
    const success = document.querySelector(".form-success");
    const dateInput = contactForm.querySelector("#selected-date");
    const timeInput = contactForm.querySelector("#selected-time");
    const isoDate = dateInput?.dataset?.isoDate || "";

    if (!isoDate) {
      alert("Kérlek válassz napot a naptárból.");
      return;
    }
    if (!timeInput?.value) {
      alert("Kérlek válassz pontos időpontot is.");
      return;
    }

    btn.textContent = "Küldés...";
    btn.disabled = true;

    const payload = {
      fname: contactForm.querySelector("#fname")?.value?.trim() || "",
      lname: contactForm.querySelector("#lname")?.value?.trim() || "",
      email: contactForm.querySelector("#email")?.value?.trim() || "",
      phone: contactForm.querySelector("#phone")?.value?.trim() || "",
      service: contactForm.querySelector("#service")?.value || "",
      date: isoDate,
      time: timeInput.value,
      message: contactForm.querySelector("#message")?.value?.trim() || ""
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Nem sikerült az időpontfoglalás.");
      }

      contactForm.style.display = "none";
      if (success) success.classList.add("visible");

    } catch (error) {
      alert(error.message || "Hiba történt küldés közben.");
      btn.textContent = "Üzenet küldése";
      btn.disabled = false;
    }
  });
}

// ── Gallery popout ───────────────────────────────────────────
(() => {
  const items = document.querySelectorAll(".gallery-item");
  if (!items.length) return;

  let activeItem = null;
  let activeOverlay = null;
  let removeGlobalHandlers = null;
  let previousBodyOverflow = "";

  const closePopover = (immediate = false) => {
    const itemToClose = activeItem;
    const overlayToClose = activeOverlay;
    const cleanupHandlers = removeGlobalHandlers;

    activeItem = null;
    activeOverlay = null;
    removeGlobalHandlers = null;

    if (itemToClose) itemToClose.classList.remove("is-open");
    if (cleanupHandlers) cleanupHandlers();
    document.body.style.overflow = previousBodyOverflow;

    if (!overlayToClose) return;
    if (immediate || overlayToClose.classList.contains("is-closing")) {
      overlayToClose.remove();
      return;
    }

    overlayToClose.classList.add("is-closing");
    overlayToClose.classList.remove("is-open");

    const removeOverlay = () => {
      if (overlayToClose.isConnected) overlayToClose.remove();
    };

    overlayToClose.addEventListener("transitionend", (event) => {
      if (event.target === overlayToClose) removeOverlay();
    }, { once: true });

    setTimeout(removeOverlay, 620);
  };

  const openPopover = (item) => {
    if (activeItem === item) {
      closePopover();
      return;
    }

    closePopover(true);
    activeItem = item;
    item.classList.add("is-open");
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const customNote = item.getAttribute("data-note") || "Blank text";
    const overlay = document.createElement("div");
    overlay.className = "gallery-modal";
    overlay.innerHTML = `
      <div class="gallery-modal-backdrop" data-close="true"></div>
      <div class="gallery-modal-panel card" role="dialog" aria-modal="true" aria-label="Kiemelt galéria elem">
        <button class="gallery-modal-close" type="button" aria-label="Bezárás">&times;</button>
        <div class="gallery-modal-media"></div>
        <div class="gallery-modal-copy">
          <div class="gallery-modal-note">${customNote}</div>
        </div>
      </div>
    `;

    const mediaSlot = overlay.querySelector(".gallery-modal-media");
    const sourceMedia = item.querySelector("img, .img-placeholder");
    if (sourceMedia && mediaSlot) {
      const clone = sourceMedia.cloneNode(true);
      clone.classList.add("gallery-modal-media-item");
      mediaSlot.appendChild(clone);
    }

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    activeOverlay = overlay;

    overlay.querySelector(".gallery-modal-close")?.addEventListener("click", closePopover);

    const onPointerDown = (event) => {
      if (overlay.contains(event.target) && !event.target.closest(".gallery-modal-panel")) closePopover();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") closePopover();
    };
    const onResize = () => {
      if (activeOverlay !== overlay) return;
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    removeGlobalHandlers = () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };

    overlay.querySelector(".gallery-modal-close")?.focus();
  };

  items.forEach(item => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("click", () => openPopover(item));
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPopover(item);
      }
    });
  });
})();

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

