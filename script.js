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

// ── Reliable email copy action ──────────────────────────────
const fallbackCopy = (value) => {
  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  helper.style.pointerEvents = "none";
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand("copy");
  helper.remove();
  return copied;
};

const copyText = async (value) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    return fallbackCopy(value);
  } catch {
    return fallbackCopy(value);
  }
};

const copyEmailButton = document.querySelector(".js-copy-email");
if (copyEmailButton) {
  const copyEmailLabel = copyEmailButton.querySelector(".js-copy-email-label");
  const defaultCopyLabel = copyEmailLabel?.textContent || "Cím másolása";

  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email || "";
    if (!email) return;
    const copied = await copyText(email);

    if (copyEmailLabel) copyEmailLabel.textContent = copied ? "Email másolva" : email;
    copyEmailButton.classList.toggle("is-copied", copied);

    window.setTimeout(() => {
      if (copyEmailLabel) copyEmailLabel.textContent = defaultCopyLabel;
      copyEmailButton.classList.remove("is-copied");
    }, 2400);
  });
}

const inquiryCopyButton = document.querySelector("#inquiry-copy-button");
if (inquiryCopyButton) {
  const inquiryCopyLabel = inquiryCopyButton.querySelector(".js-inquiry-copy-label");
  const defaultInquiryLabel = inquiryCopyLabel?.textContent || "Megkeresés másolása";

  inquiryCopyButton.addEventListener("click", async () => {
    const content = inquiryCopyButton.dataset.copyText || "";
    if (!content) return;
    const copied = await copyText(content);

    if (inquiryCopyLabel) inquiryCopyLabel.textContent = copied ? "Megkeresés másolva" : "Másolás sikertelen";
    inquiryCopyButton.classList.toggle("is-copied", copied);

    window.setTimeout(() => {
      if (inquiryCopyLabel) inquiryCopyLabel.textContent = defaultInquiryLabel;
      inquiryCopyButton.classList.remove("is-copied");
    }, 2400);
  });
}

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

// ── Contact form + Calendly handoff ─────────────────────────
const CALENDLY_EVENTS = window.SITE_CONFIG?.calendlyEvents || {};
const INQUIRY_EMAIL = window.SITE_CONFIG?.inquiryEmail?.trim() || "mihalybence.9@gmail.com";
const APPOINTMENT_SERVICES = new Set(["consult", "pt", "online"]);
const buildBrandedCalendlyUrl = (eventUrl) => {
  const url = new URL(eventUrl);
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("background_color", "100f0c");
  url.searchParams.set("text_color", "f5f0e8");
  url.searchParams.set("primary_color", "f5c842");
  return url.toString();
};

const contactForm = document.querySelector(".js-contact-form");
if (contactForm) {
  const serviceSelect = contactForm.querySelector("#service");
  const routeNote = contactForm.querySelector("#route-note");
  const routeSubmit = contactForm.querySelector("#route-submit");

  const requestedService = new URLSearchParams(window.location.search).get("service");
  if (serviceSelect && ["consult", "pt", "online", "other"].includes(requestedService || "")) {
    serviceSelect.value = requestedService;
  }

  const updateRouteHint = () => {
    const serviceKey = serviceSelect?.value || "";
    const usesCalendar = APPOINTMENT_SERVICES.has(serviceKey);
    if (!serviceKey) {
      if (routeNote) routeNote.textContent = "A kiválasztott szolgáltatás alapján mutatjuk a következő lépést.";
      if (routeSubmit) routeSubmit.textContent = "Tovább";
      return;
    }
    if (routeNote) {
      routeNote.textContent = usesCalendar
        ? "A következő lépésben a valós, szabad időpontok közül választhatsz."
        : "A következő lépésben elkészítjük az emailes megkeresésedet.";
    }
    if (routeSubmit) routeSubmit.textContent = usesCalendar ? "Tovább az időpontokhoz" : "Tovább az üzenethez";
  };

  serviceSelect?.addEventListener("change", updateRouteHint);
  updateRouteHint();

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;

    const schedulingSection = document.querySelector(".calendly-section");
    const inquirySection = document.querySelector(".inquiry-section");
    const embed = document.querySelector("#calendly-embed");
    const notice = document.querySelector("#calendly-config-notice");
    const selectedServiceBadge = document.querySelector("#selected-service-badge");
    const serviceLabel = serviceSelect?.selectedOptions?.[0]?.textContent?.trim() || "";
    const serviceKey = serviceSelect?.value || "";
    const firstName = contactForm.querySelector("#fname")?.value?.trim() || "";
    const lastName = contactForm.querySelector("#lname")?.value?.trim() || "";
    const email = contactForm.querySelector("#email")?.value?.trim() || "";
    const phone = contactForm.querySelector("#phone")?.value?.trim() || "";

    if (!APPOINTMENT_SERVICES.has(serviceKey)) {
      if (schedulingSection) schedulingSection.hidden = true;
      if (inquirySection) inquirySection.hidden = false;

      const inquiryServiceName = document.querySelector("#inquiry-service-name");
      const inquiryEmailLink = document.querySelector("#inquiry-email-link");
      const inquiryCopyButton = document.querySelector("#inquiry-copy-button");
      if (inquiryServiceName) inquiryServiceName.textContent = serviceLabel;
      if (inquiryEmailLink) {
        const subject = `${serviceLabel} – weboldali érdeklődés`;
        const body = [
          `Név: ${firstName} ${lastName}`.trim(),
          `Email: ${email}`,
          `Telefon: ${phone || "nincs megadva"}`,
          `Szolgáltatás: ${serviceLabel}`
        ].join("\n");
        const gmailUrl = new URL("https://mail.google.com/mail/");
        gmailUrl.searchParams.set("view", "cm");
        gmailUrl.searchParams.set("fs", "1");
        gmailUrl.searchParams.set("to", INQUIRY_EMAIL);
        gmailUrl.searchParams.set("su", subject);
        gmailUrl.searchParams.set("body", body);
        inquiryEmailLink.href = gmailUrl.toString();

        if (inquiryCopyButton) {
          inquiryCopyButton.dataset.copyText = [
            `Címzett: ${INQUIRY_EMAIL}`,
            `Tárgy: ${subject}`,
            "",
            body
          ].join("\n");
        }
      }

      inquirySection?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const eventUrl = String(CALENDLY_EVENTS[serviceKey] || "").trim();
    if (inquirySection) inquirySection.hidden = true;
    if (schedulingSection) schedulingSection.hidden = false;
    if (selectedServiceBadge) selectedServiceBadge.textContent = serviceLabel;

    if (!eventUrl) {
      if (notice) notice.hidden = false;
      schedulingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!window.Calendly || !embed) {
      alert("A naptár még töltődik. Kérlek próbáld újra néhány másodperc múlva.");
      return;
    }

    embed.innerHTML = "";
    if (notice) notice.hidden = true;
    window.Calendly.initInlineWidget({
      url: buildBrandedCalendlyUrl(eventUrl),
      parentElement: embed,
      resize: true,
      prefill: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        customAnswers: {
          a1: serviceLabel,
          a2: phone
        }
      },
      utm: {
        utmSource: "mihaly-bence-weboldal",
        utmMedium: "website",
        utmCampaign: serviceKey
      }
    });

    schedulingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.addEventListener("message", (event) => {
    if (event.origin !== "https://calendly.com" || event.data?.event !== "calendly.event_scheduled") return;
    const success = document.querySelector(".form-success");
    const calendlyShell = document.querySelector(".calendly-shell");
    contactForm.style.display = "none";
    if (calendlyShell) calendlyShell.hidden = true;
    success?.classList.add("visible");
    success?.scrollIntoView({ behavior: "smooth", block: "center" });
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

// ── Profile card: restrained pointer depth ───────────────────
const profileCard = document.querySelector(".profile-card");
if (profileCard && matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let profileFrame = 0;

  profileCard.addEventListener("pointermove", (event) => {
    const rect = profileCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    cancelAnimationFrame(profileFrame);
    profileFrame = requestAnimationFrame(() => {
      const rotateX = (y - .5) * -3.2;
      const rotateY = (x - .5) * 3.2;
      profileCard.style.setProperty("--card-x", `${x * 100}%`);
      profileCard.style.setProperty("--card-y", `${y * 100}%`);
      profileCard.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  });

  profileCard.addEventListener("pointerleave", () => {
    cancelAnimationFrame(profileFrame);
    profileCard.style.setProperty("--card-x", "50%");
    profileCard.style.setProperty("--card-y", "50%");
    profileCard.style.transform = "perspective(1100px) rotateX(0) rotateY(0) translateY(0)";
  });
}
