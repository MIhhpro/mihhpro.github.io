// ── Ambient pointer ──────────────────────────────────────────
const root = document.documentElement;
const isEnglish = root.lang === "en";
const localText = (hu, en) => isEnglish ? en : hu;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => reducedMotion.matches ? "auto" : "smooth";
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let ambientFrame = 0;
  let pointerX = 0, pointerY = 0;
  window.addEventListener("pointermove", (e) => {
    if (reducedMotion.matches) return;
    pointerX = e.clientX; pointerY = e.clientY;
    if (ambientFrame) return;
    ambientFrame = requestAnimationFrame(() => {
      ambientFrame = 0;
      root.style.setProperty("--mx", `${Math.round((pointerX / innerWidth) * 100)}%`);
      root.style.setProperty("--my", `${Math.round((pointerY / innerHeight) * 100)}%`);
    });
  }, { passive: true });
}

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
  const setMenu = (open, returnFocus = false) => {
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", document.documentElement.lang === "en"
      ? (open ? "Close menu" : "Open menu")
      : (open ? "Menü bezárása" : "Menü megnyitása"));
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    document.querySelectorAll("main, .site-footer").forEach(el => { el.inert = open; });
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) scrollTop.inert = open;
    if (open) mobileMenu.querySelector("a")?.focus();
    else if (returnFocus) burger.focus();
  };
  burger.addEventListener("click", () => {
    setMenu(!burger.classList.contains("open"));
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (!burger.classList.contains("open")) return;
    if (event.key === "Escape") { setMenu(false, true); return; }
    if (event.key !== "Tab") return;
    const stops = [burger, ...mobileMenu.querySelectorAll("a")];
    const current = stops.indexOf(document.activeElement);
    event.preventDefault();
    stops[(current + (event.shiftKey ? -1 : 1) + stops.length) % stops.length].focus();
  });
  matchMedia("(min-width: 1181px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });
}

// ── Active nav link ──────────────────────────────────────────
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
  const href = a.getAttribute("href") || "";
  if (href === page || (page === "" && href === "index.html")) {
    a.classList.add("active");
    a.setAttribute("aria-current", "page");
  }
});

// ── Reveal on scroll ─────────────────────────────────────────
window.__revealInit = true;
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
  const siblingOrder = new Map();
  const isPhoneLike = window.matchMedia("(max-width: 768px)").matches;
  document.querySelectorAll(".reveal").forEach(el => {
    const order = siblingOrder.get(el.parentElement) || 0;
    siblingOrder.set(el.parentElement, order + 1);
    el.style.setProperty("--reveal-delay", isPhoneLike ? "0ms" : `${Math.min(order * 45, 135)}ms`);
    obs.observe(el);
  });
  // Keyboard navigation must never land in content still waiting to appear.
  document.addEventListener("focusin", (event) => {
    let container = event.target.closest(".reveal");
    while (container) {
      container.classList.add("is-visible");
      container.style.setProperty("--reveal-delay", "0ms");
      obs.unobserve(container);
      container = container.parentElement?.closest(".reveal");
    }
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}

// ── Floating scroll-to-top ───────────────────────────────────
(function scrollTopBtn() {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", document.documentElement.lang === "en" ? "Back to top" : "Vissza az oldal tetejére");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg>';
  document.body.appendChild(btn);

  const toggle = () => btn.classList.toggle("visible", scrollY > 400);
  toggle();
  addEventListener("scroll", toggle, { passive: true });
  btn.addEventListener("click", () => scrollTo({ top: 0, behavior: scrollBehavior() }));
})();

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Reliable email copy action ──────────────────────────────
const fallbackCopy = (value) => {
  const previousFocus = document.activeElement;
  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  helper.style.pointerEvents = "none";
  try {
    document.body.appendChild(helper);
    helper.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    helper.remove();
    previousFocus?.focus({ preventScroll: true });
  }
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
  const defaultCopyLabel = copyEmailLabel?.textContent || localText("Cím másolása", "Copy email address");

  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email || "";
    if (!email) return;
    const copied = await copyText(email);

    if (copyEmailLabel) copyEmailLabel.textContent = copied ? localText("Email cím másolva ✓", "Email address copied ✓") : localText("Jelöld ki és másold a fenti címet.", "Select and copy the address above.");
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
  const defaultInquiryLabel = inquiryCopyLabel?.textContent || localText("Megkeresés másolása", "Copy enquiry");

  inquiryCopyButton.addEventListener("click", async () => {
    const content = inquiryCopyButton.dataset.copyText || "";
    if (!content) return;
    const copied = await copyText(content);

    if (inquiryCopyLabel) inquiryCopyLabel.textContent = copied ? localText("Megkeresés másolva", "Enquiry copied") : localText("Másolás sikertelen", "Could not copy");
    inquiryCopyButton.classList.toggle("is-copied", copied);

    window.setTimeout(() => {
      if (inquiryCopyLabel) inquiryCopyLabel.textContent = defaultInquiryLabel;
      inquiryCopyButton.classList.remove("is-copied");
    }, 2400);
  });
}

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll(".faq-q").forEach((btn, index) => {
  const answer = btn.closest(".faq-item").querySelector(".faq-a");
  answer.id = `faq-answer-${index}`;
  answer.hidden = true;
  btn.setAttribute("aria-controls", answer.id);
  btn.setAttribute("aria-expanded", "false");
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(i => {
      i.classList.remove("open");
      i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      i.querySelector(".faq-a").hidden = true;
    });
    if (!isOpen) {
      item.classList.add("open");
      answer.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ── Native questions: interruptible expansion, natural final height ──
document.querySelectorAll("details.question").forEach(details => {
  const summary = details.querySelector("summary");
  const content = details.querySelector("summary + div");
  if (!summary || !content || typeof details.animate !== "function") return;
  let animation = null;
  let desiredOpen = details.open;

  const settle = () => {
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    details.open = desiredOpen;
    details.style.overflow = "";
    details.classList.remove("is-closing");
    content.inert = false;
  };

  summary.addEventListener("click", event => {
    if (reducedMotion.matches) return; // Keep native keyboard/click behavior.
    event.preventDefault();
    const start = details.getBoundingClientRect().height;
    desiredOpen = animation ? !desiredOpen : !details.open;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
    }
    // Measure the real open/closed size; no fixed cap on translated answers.
    details.open = desiredOpen;
    const end = details.getBoundingClientRect().height;
    details.open = true;
    details.style.overflow = "hidden";
    details.classList.toggle("is-closing", !desiredOpen);
    content.inert = !desiredOpen;
    animation = details.animate(
      [{ height: `${start}px` }, { height: `${end}px` }],
      { duration: desiredOpen ? 280 : 220, easing: "cubic-bezier(.22, 1, .36, 1)" }
    );
    animation.onfinish = settle;
  });
  // Resizing / changing accessibility settings must not leave clipped content.
  window.addEventListener("resize", () => { if (animation) settle(); }, { passive: true });
  reducedMotion.addEventListener("change", () => { if (animation) settle(); });
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

// ── Contact form + Cal.com handoff ─────────────────────────
const CAL_EVENTS = window.SITE_CONFIG?.calEvents || {};
const INQUIRY_EMAIL = window.SITE_CONFIG?.inquiryEmail?.trim() || "mihaly.bence.fitness@gmail.com";
const APPOINTMENT_SERVICES = new Set(["consult", "pt", "online"]);
const calEventUrl = (service) => {
  try {
    const url = new URL(String(CAL_EVENTS[service] || "").trim());
    // Only public event links; never send form details to an arbitrary host.
    if (url.origin !== "https://cal.com" || url.username || url.password ||
        !/^\/(?:team\/)?[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) return null;
    url.search = "";
    url.hash = "";
    return url;
  } catch { return null; }
};

// Only Contact initialises a configured calendar; other pages never load the SDK.
let calLoad;
const ensureCal = () => {
  if (window.Cal?.instance) return Promise.resolve();
  if (calLoad) return calLoad;
  if (!window.Cal) {
    const queue = function (...args) { queue.q.push(args); };
    queue.q = [];
    queue.ns = {};
    window.Cal = queue;
  }
  calLoad = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.referrerPolicy = "no-referrer";
    let settled = false;
    const fail = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      script.remove();
      calLoad = null;
      reject(new Error("Calendar unavailable"));
    };
    const timer = setTimeout(fail, 12000);
    script.onload = () => {
      if (settled) return;
      if (!window.Cal?.instance) { fail(); return; }
      settled = true;
      clearTimeout(timer);
      resolve();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return calLoad;
};

const contactForm = document.querySelector(".js-contact-form");
if (contactForm) {
  const serviceSelect = contactForm.querySelector("#service");
  const serviceOptions = contactForm.querySelector(".booking-service-options");
  const serviceRadios = [];
  const routeNote = contactForm.querySelector("#route-note");
  const routeSubmit = contactForm.querySelector("#route-submit");
  const packageSelect = contactForm.querySelector("#online-package");
  const packageGroup = contactForm.querySelector("#online-package-group");
  const inquiryFields = contactForm.querySelector("#inquiry-fields");
  const schedulingSection = document.querySelector(".booking-section");
  const inquirySection = document.querySelector(".inquiry-section");
  const embed = document.querySelector("#booking-embed");
  const loading = document.querySelector("#booking-loading");
  const notice = document.querySelector("#booking-config-notice");
  const directLink = document.querySelector("#booking-direct-link");
  const retryCalendar = document.querySelector("#booking-retry");
  let bookingRequest = 0;
  let readyTimer;
  let detachCalendarEvents = () => {};
  const invalidateBooking = () => {
    bookingRequest += 1;
    clearTimeout(readyTimer);
    detachCalendarEvents();
    if (embed) { embed.innerHTML = ""; embed.hidden = true; }
    if (loading) loading.hidden = true;
    if (schedulingSection) schedulingSection.hidden = true;
    if (inquirySection) inquirySection.hidden = true;
    if (directLink) { directLink.hidden = true; directLink.removeAttribute("href"); }
  };

  const requestedService = new URLSearchParams(window.location.search).get("service");
  if (serviceSelect && ["consult", "pt", "online", "program", "other"].includes(requestedService || "")) {
    serviceSelect.value = requestedService;
  } else if (serviceSelect) {
    serviceSelect.value = "consult";
  }
  const requestedPackage = new URLSearchParams(window.location.search).get("package");
  if (packageSelect && ["basic", "plus", "premium"].includes(requestedPackage)) {
    packageSelect.value = requestedPackage;
  }

  const updateRouteHint = () => {
    const serviceKey = serviceSelect?.value || "";
    serviceRadios.forEach(radio => { radio.checked = radio.value === serviceKey; });
    if (packageGroup) packageGroup.hidden = serviceKey !== "online";
    if (packageSelect) packageSelect.disabled = serviceKey !== "online";
    const wantsAppointment = APPOINTMENT_SERVICES.has(serviceKey);
    const usesCalendar = wantsAppointment && Boolean(calEventUrl(serviceKey));
    if (routeSubmit) routeSubmit.hidden = usesCalendar;
    // Contact details belong to Cal's final step, not the availability search.
    if (inquiryFields) {
      inquiryFields.hidden = !serviceKey || usesCalendar;
      inquiryFields.disabled = !serviceKey || usesCalendar;
    }
    if (routeNote) routeNote.hidden = usesCalendar || (Boolean(serviceKey) && !wantsAppointment);
    if (!serviceKey) {
      if (routeNote) routeNote.textContent = localText("Válaszd az ingyenes konzultációt, ha még nem tudod, melyik edzésforma illene hozzád.", "Choose the free consultation if you’re not sure which training option would suit you.");
      if (routeSubmit) routeSubmit.textContent = localText("Tovább", "Continue");
      return;
    }
    if (routeNote) {
      routeNote.textContent = usesCalendar
        ? localText("Először válassz egy időpontot. A nevedet és elérhetőségeidet csak ezután kéri a naptár, a foglalás véglegesítéséhez.", "Choose a time first. The calendar asks for your name and contact details afterwards, to complete your booking.")
        : wantsAppointment
          ? localText("Most emailben egyeztetünk időpontot. A következő lépésben átnézheted és elküldheted az érdeklődésedet.", "We’re arranging appointments by email at the moment. Next, review and send your request.")
          : "";
    }
    if (routeSubmit) routeSubmit.textContent = usesCalendar ? localText("Tovább az időpontokhoz", "Choose a time") : localText("Tovább az üzenethez", "Prepare enquiry");
  };

  const runRoute = async ({ focus = false } = {}) => {
    updateRouteHint();
    if (!contactForm.reportValidity()) return;
    invalidateBooking();
    const requestId = bookingRequest;

    const schedulingSection = document.querySelector(".booking-section");
    const inquirySection = document.querySelector(".inquiry-section");
    const embed = document.querySelector("#booking-embed");
    const notice = document.querySelector("#booking-config-notice");
    const selectedServiceBadge = document.querySelector("#selected-service-badge");
    const serviceKey = serviceSelect?.value || "";
    const baseServiceLabel = serviceSelect?.selectedOptions?.[0]?.textContent?.trim() || "";
    const packageLabel = serviceKey === "online" && packageSelect?.value
      ? packageSelect.selectedOptions?.[0]?.textContent?.trim() : "";
    const serviceLabel = packageLabel ? `${baseServiceLabel} – ${packageLabel}` : baseServiceLabel;
    const firstName = contactForm.querySelector("#fname")?.value?.trim() || "";
    const lastName = contactForm.querySelector("#lname")?.value?.trim() || "";
    const fullName = (isEnglish ? `${firstName} ${lastName}` : `${lastName} ${firstName}`).trim();
    const email = contactForm.querySelector("#email")?.value?.trim() || "";
    const phone = contactForm.querySelector("#phone")?.value?.trim() || "";
    const message = contactForm.querySelector("#message")?.value?.trim() || "";
    const focusSection = (section) => {
      if (!section) return;
      const heading = section.querySelector("h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    };

    const eventUrl = APPOINTMENT_SERVICES.has(serviceKey) ? calEventUrl(serviceKey) : null;
    const inquiryServiceName = document.querySelector("#inquiry-service-name");
    const inquiryEmailLink = document.querySelector("#inquiry-email-link");
    const inquiryCopyButton = document.querySelector("#inquiry-copy-button");
    if (inquiryServiceName) inquiryServiceName.textContent = serviceLabel;
    if (inquiryEmailLink) {
      const subject = `${serviceLabel} – ${localText("weboldali érdeklődés", "website enquiry")}`;
      const body = [
        `${localText("Név", "Name")}: ${fullName}`.trim(),
        `Email: ${email}`,
        `${localText("Telefon", "Phone")}: ${phone || localText("nincs megadva", "not provided")}`,
        `${localText("Szolgáltatás", "Service")}: ${serviceLabel}`,
        "",
        message || localText("Ide írhatod a kérdésedet.", "Write your question here.")
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
          `${localText("Címzett", "To")}: ${INQUIRY_EMAIL}`,
          `${localText("Tárgy", "Subject")}: ${subject}`,
          "",
          body
        ].join("\n");
      }
    }

    const bookingEmailLink = document.querySelector("#booking-email-link");
    if (bookingEmailLink && inquiryEmailLink) bookingEmailLink.href = inquiryEmailLink.href;

    if (!eventUrl) {
      if (schedulingSection) schedulingSection.hidden = true;
      if (inquirySection) inquirySection.hidden = false;

      focusSection(inquirySection);
      return;
    }

    if (inquirySection) inquirySection.hidden = true;
    if (schedulingSection) schedulingSection.hidden = false;
    if (selectedServiceBadge) selectedServiceBadge.textContent = serviceLabel;
    if (notice) notice.hidden = true;
    if (loading) loading.hidden = false;
    // Automatic loading and service changes must not steal focus or move the page.
    if (focus) focusSection(schedulingSection);

    const showCalendarFailure = () => {
      if (requestId !== bookingRequest) return;
      clearTimeout(readyTimer);
      if (embed) embed.hidden = true;
      if (loading) loading.hidden = true;
      if (notice) notice.hidden = false;
    };
    try {
      if (!embed) throw new Error("Missing calendar container");
      // Never carry personal details from an abandoned email enquiry into Cal.
      // Only the chosen service/package is passed before a time is selected.
      const notes = `${localText("Szolgáltatás", "Service")}: ${serviceLabel}`;
      const config = { notes, theme: "dark", layout: "month_view" };
      const directUrl = new URL(eventUrl);
      Object.entries(config).forEach(([key, value]) => directUrl.searchParams.set(key, value));
      if (directLink) { directLink.href = directUrl.toString(); directLink.hidden = false; }
      await ensureCal();
      if (requestId !== bookingRequest) return;
      window.Cal("init", { origin: "https://cal.com" });
      const ready = () => {
        if (requestId !== bookingRequest) return;
        clearTimeout(readyTimer);
        if (embed) embed.hidden = false;
        if (loading) loading.hidden = true;
        if (notice) notice.hidden = true;
      };
      window.Cal("on", { action: "linkReady", callback: ready });
      window.Cal("on", { action: "linkFailed", callback: showCalendarFailure });
      detachCalendarEvents = () => {
        window.Cal("off", { action: "linkReady", callback: ready });
        window.Cal("off", { action: "linkFailed", callback: showCalendarFailure });
        detachCalendarEvents = () => {};
      };
      embed.hidden = false;
      readyTimer = setTimeout(showCalendarFailure, 15000);
      window.Cal("inline", {
        elementOrSelector: embed,
        calLink: eventUrl.pathname.replace(/^\/|\/$/g, ""),
        config
      });
      window.Cal("ui", {
        theme: "dark", layout: "month_view", hideEventTypeDetails: false,
        // Cal's outer document is separate from its themed booking card.
        // Keep this supported body override until CSS variables cover that canvas.
        styles: { body: { background: "#100f0c" } },
        cssVarsPerTheme: { dark: {
          "cal-brand": "#d4a843", "cal-brand-emphasis": "#c69a36",
          "cal-brand-text": "#100f0c", "cal-text": "#f5f0e8",
          "cal-text-emphasis": "#fff8e8", "cal-text-subtle": "#cec4b4",
          "cal-bg": "#100f0c", "cal-bg-subtle": "#1c1913",
          "cal-bg-emphasis": "#282218", "cal-border": "#514127",
          "cal-border-subtle": "#352d20"
        } }
      });
      const frame = embed.querySelector("iframe");
      frame?.setAttribute("title", `${serviceLabel} – ${localText("időpontfoglalás", "appointment booking")}`);
      frame?.setAttribute("referrerpolicy", "no-referrer");
      // Cal controls sizing and its own confirmation/pending-approval screen.
      // A created booking must not be mistaken for a confirmed appointment.
    } catch {
      if (requestId !== bookingRequest) return;
      if (embed) embed.hidden = true;
      showCalendarFailure();
    }
  };

  const refreshCalendar = () => {
    invalidateBooking();
    updateRouteHint();
    if (APPOINTMENT_SERVICES.has(serviceSelect?.value) && calEventUrl(serviceSelect.value)) {
      return runRoute();
    }
  };
  serviceSelect?.addEventListener("change", refreshCalendar);
  packageSelect?.addEventListener("change", refreshCalendar);
  contactForm.addEventListener("input", (event) => {
    if (event.target === serviceSelect || event.target === packageSelect) return;
    if (!inquiryFields?.disabled) invalidateBooking();
  });
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    return runRoute({ focus: true });
  });
  retryCalendar?.addEventListener("click", () => runRoute());
  // Tablet/desktop exposes the same choices as large native radio cards; mobile keeps
  // the select. Both controls share a single value and existing booking routes.
  if (serviceOptions && serviceSelect) {
    Array.from(serviceSelect.options).forEach(option => {
      const label = document.createElement("label");
      label.className = "booking-service-card";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "desktop-service";
      radio.value = option.value;
      const title = document.createElement("span");
      title.textContent = option.textContent;
      label.append(radio, title);
      serviceOptions.appendChild(label);
      serviceRadios.push(radio);
      radio.addEventListener("change", () => {
        if (!radio.checked || serviceSelect.value === radio.value) return;
        serviceSelect.value = radio.value;
        refreshCalendar();
      });
    });
    contactForm.classList.add("has-service-cards");
    // Preserve keyboard focus when crossing the desktop/mobile breakpoint.
    const desktopChoices = matchMedia("(min-width: 768px)");
    desktopChoices.addEventListener("change", () => {
      if (desktopChoices.matches && document.activeElement === serviceSelect) {
        serviceRadios.find(radio => radio.checked)?.focus();
      } else if (!desktopChoices.matches && serviceRadios.includes(document.activeElement)) {
        serviceSelect.focus();
      }
    });
  }
  refreshCalendar();
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
    document.querySelectorAll(".site-header, main, .site-footer").forEach(el => { el.inert = false; });
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) scrollTop.inert = false;
    if (itemToClose && !immediate) itemToClose.focus({ preventScroll: true });

    if (!overlayToClose) return;
    if (immediate || reducedMotion.matches || overlayToClose.classList.contains("is-closing")) {
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

    const customNote = item.getAttribute("data-note") || item.querySelector(".gallery-caption")?.textContent || localText("Egy pillanat a mindennapokból.", "A moment from everyday life.");
    const overlay = document.createElement("div");
    overlay.className = "gallery-modal";
    overlay.innerHTML = `
      <div class="gallery-modal-backdrop" data-close="true"></div>
      <div class="gallery-modal-panel card" role="dialog" aria-modal="true" aria-label="${localText("Kiemelt galéria elem", "Gallery photo")}">
        <button class="gallery-modal-close" type="button" aria-label="${localText("Bezárás", "Close")}">&times;</button>
        <div class="gallery-modal-media"></div>
        <div class="gallery-modal-copy">
          <div class="gallery-modal-note"></div>
        </div>
      </div>
    `;
    overlay.querySelector(".gallery-modal-note").textContent = customNote;

    const mediaSlot = overlay.querySelector(".gallery-modal-media");
    const sourceMedia = item.querySelector("img, .img-placeholder");
    if (sourceMedia && mediaSlot) {
      const clone = sourceMedia.cloneNode(true);
      if (sourceMedia.dataset.fullSrc) {
        clone.removeAttribute("srcset");
        clone.removeAttribute("sizes");
        clone.src = sourceMedia.dataset.fullSrc;
        clone.loading = "eager";
      }
      clone.classList.add("gallery-modal-media-item");
      mediaSlot.appendChild(clone);
    }

    document.body.appendChild(overlay);
    document.querySelectorAll(".site-header, main, .site-footer").forEach(el => { el.inert = true; });
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) scrollTop.inert = true;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    activeOverlay = overlay;

    overlay.querySelector(".gallery-modal-close")?.addEventListener("click", () => closePopover());

    const onPointerDown = (event) => {
      if (overlay.contains(event.target) && !event.target.closest(".gallery-modal-panel")) closePopover();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") closePopover();
      if (event.key === "Tab") {
        event.preventDefault();
        overlay.querySelector(".gallery-modal-close")?.focus();
      }
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
