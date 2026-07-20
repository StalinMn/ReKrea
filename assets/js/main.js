(function initReKreaSite() {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = { reducedMotion: motionQuery.matches };

  function icon(name, className = "icon") {
    return `<svg class="${className}" aria-hidden="true"><use href="assets/icons/icons.svg#${name}"></use></svg>`;
  }

  function respectReducedMotion() {
    const sync = () => {
      state.reducedMotion = motionQuery.matches;
      document.documentElement.classList.toggle("reduce-motion", state.reducedMotion);
    };
    sync();
    motionQuery.addEventListener?.("change", sync);
  }

  function setActiveNavigation() {
    const current = document.body.dataset.page;
    document.querySelectorAll("[data-page-id]").forEach((link) => {
      if (link.dataset.pageId === current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function initMobileNavigation() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;

    const links = [...nav.querySelectorAll("a")];
    const close = (returnFocus = false) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("menu-open");
      if (returnFocus) toggle.focus();
    };
    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
      document.body.classList.add("menu-open");
      window.setTimeout(() => links[0]?.focus(), state.reducedMotion ? 0 : 180);
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close();
      else open();
    });
    links.forEach((link) => link.addEventListener("click", () => close()));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) close(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) close();
    }, { passive: true });
  }

  function bindExternalLinks() {
    const links = window.REKREA_DATA?.links;
    if (!links) return;
    document.querySelectorAll("[data-link]").forEach((element) => {
      const href = links[element.dataset.link];
      if (!href) return;
      element.setAttribute("href", href);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    });
  }

  function initRevealAnimations() {
    const items = [...document.querySelectorAll("[data-reveal]")];
    if (!items.length) return;
    if (state.reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.revealDelay || 0);
        window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  }

  function initCounters() {
    const counters = [...document.querySelectorAll(".counter[data-target]")];
    if (!counters.length) return;

    const finalText = (counter, value) =>
      `${counter.dataset.prefix || ""}${value}${counter.dataset.suffix || ""}`;
    const complete = (counter) => {
      counter.textContent = finalText(counter, Number(counter.dataset.target));
      counter.dataset.complete = "true";
    };

    if (state.reducedMotion || !("IntersectionObserver" in window)) {
      counters.forEach(complete);
      return;
    }

    const animate = (counter) => {
      if (counter.dataset.complete === "true") return;
      const target = Number(counter.dataset.target);
      const duration = Number(counter.dataset.duration || 1200);
      const startedAt = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = finalText(counter, Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
        else complete(counter);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach((counter, index) => window.setTimeout(() => animate(counter), index * 100));
        observer.disconnect();
      });
    }, { threshold: 0.45 });
    observer.observe(counters[0].closest("[data-counter-group]") || counters[0]);
  }

  function initHorizontalCarousel() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
      const track = carousel.querySelector("[data-carousel-track]");
      const previous = carousel.querySelector("[data-carousel-prev]");
      const next = carousel.querySelector("[data-carousel-next]");
      if (!track || !previous || !next) return;

      const step = () => {
        const item = track.firstElementChild;
        if (!item) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
        return item.getBoundingClientRect().width + gap;
      };
      const update = () => {
        const max = Math.max(0, track.scrollWidth - track.clientWidth - 2);
        previous.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max;
      };
      const move = (direction) => {
        track.scrollBy({ left: direction * step(), behavior: state.reducedMotion ? "auto" : "smooth" });
        window.setTimeout(update, state.reducedMotion ? 0 : 380);
      };

      previous.addEventListener("click", () => move(-1));
      next.addEventListener("click", () => move(1));
      track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
      track.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      });

      let dragging = false;
      let startX = 0;
      let startScroll = 0;
      track.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "touch") return;
        dragging = true;
        startX = event.clientX;
        startScroll = track.scrollLeft;
        track.classList.add("is-dragging");
        track.setPointerCapture(event.pointerId);
      });
      track.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        track.scrollLeft = startScroll - (event.clientX - startX);
      });
      const stopDragging = () => {
        dragging = false;
        track.classList.remove("is-dragging");
        update();
      };
      track.addEventListener("pointerup", stopDragging);
      track.addEventListener("pointercancel", stopDragging);
      window.addEventListener("resize", update, { passive: true });
      update();
    });
  }

  function initHeroVideoFallback() {
  }

  respectReducedMotion();
  setActiveNavigation();
  initMobileNavigation();
  bindExternalLinks();
  initCounters();
  initHorizontalCarousel();
  initRevealAnimations();
  initHeroVideoFallback();

  window.ReKrea = Object.freeze({
    state,
    icon,
    respectReducedMotion,
    setActiveNavigation,
    initMobileNavigation,
    initCounters,
    initHorizontalCarousel
  });
})();
/* =========================================
   REDES SOCIALES FLOTANTES
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const floatingSocials = document.querySelector(".floating-socials");
  const footer = document.querySelector("footer, .site-footer");

  /*
    En Contáctanos no existe .floating-socials,
    por eso el código termina sin generar errores.
  */
  if (!floatingSocials) {
    return;
  }

  /*
    Pequeño retraso para que se vea la transición
    entrando desde el lado izquierdo.
  */
  window.setTimeout(() => {
    floatingSocials.classList.add("is-visible");
  }, 180);

  /*
    Si la página no tiene footer, los iconos
    permanecen visibles normalmente.
  */
  if (!footer) {
    return;
  }

  const footerObserver = new IntersectionObserver(
    (entries) => {
      const footerEntry = entries[0];

      if (footerEntry.isIntersecting) {
        /*
          El footer comenzó a aparecer:
          desliza los iconos hacia la izquierda.
        */
        floatingSocials.classList.add("is-hidden");
      } else {
        /*
          El usuario se alejó del footer:
          los iconos vuelven a aparecer.
        */
        floatingSocials.classList.remove("is-hidden");
      }
    },
    {
      threshold: 0.05
    }
  );

  footerObserver.observe(footer);
});