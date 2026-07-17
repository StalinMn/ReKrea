(function initGalleryPage() {
  const data = window.REKREA_DATA;
  const grid = document.querySelector("[data-gallery-grid]");
  if (!data || !grid) return;

  const icon = (name, className = "icon") =>
    `<svg class="${className}" aria-hidden="true"><use href="assets/icons/icons.svg#${name}"></use></svg>`;

  grid.innerHTML = data.artworks.map((artwork, index) => `
    <article class="artwork-card" data-artwork-card data-categories="${artwork.categories.join(" ")}" data-reveal data-reveal-delay="${index * 80}">
      <div class="artwork-card__image-wrap">
        <img src="${artwork.cardImage}" alt="${artwork.gallery[0].alt}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async">
      </div>
      <div class="artwork-card__body">
        <h2>${artwork.title}</h2>
        <p class="artwork-card__category">${artwork.category}</p>
        <p>${artwork.summary}</p>
        <button class="button button--outline artwork-card__button" type="button" data-open-artwork="${artwork.id}">
          Ver obra ${icon("arrow-right")}
        </button>
      </div>
    </article>
  `).join("");

  const modal = document.createElement("div");
  modal.className = "artwork-modal";
  modal.dataset.artworkModal = "";
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="artwork-modal__backdrop" data-modal-dismiss></div>
    <section class="artwork-dialog" role="dialog" aria-modal="true" aria-labelledby="artwork-modal-title" tabindex="-1">
      <button class="icon-button artwork-dialog__close" type="button" data-modal-close aria-label="Cerrar detalle de obra">${icon("close")}</button>
      <div class="artwork-dialog__gallery">
        <div class="artwork-dialog__image-frame" data-modal-swipe>
          <img data-modal-image src="" alt="" decoding="async">
          <button class="carousel-arrow carousel-arrow--left" type="button" data-modal-prev aria-label="Imagen anterior">${icon("arrow-left")}</button>
          <button class="carousel-arrow carousel-arrow--right" type="button" data-modal-next aria-label="Imagen siguiente">${icon("arrow-right")}</button>
          <div class="carousel-status" data-modal-status aria-live="polite"></div>
        </div>
        <div class="carousel-dots" data-modal-dots aria-hidden="true"></div>
      </div>
      <div class="artwork-dialog__content">
        <p class="eyebrow">Obra ReKrea</p>
        <h2 id="artwork-modal-title" data-modal-title></h2>
        <dl class="artwork-facts">
          <div><dt>${icon("type")} Tipo</dt><dd data-modal-type></dd></div>
          <div><dt>${icon("materials")} Materiales</dt><dd data-modal-materials></dd></div>
          <div><dt>${icon("user")} Artista</dt><dd><a data-modal-artist></a></dd></div>
        </dl>
        <section class="artwork-description" aria-labelledby="artwork-description-title">
          <h3 id="artwork-description-title">${icon("document")} Descripción</h3>
          <p data-modal-description></p>
        </section>
        <a class="button button--primary" href="${data.links.vote}" target="_blank" rel="noopener noreferrer">Votar por esta obra</a>
      </div>
    </section>`;
  document.body.append(modal);

  const filterButtons = [...document.querySelectorAll("[data-gallery-filter]")];
  const cards = [...grid.querySelectorAll("[data-artwork-card]")];
  const resultStatus = document.querySelector("[data-gallery-status]");
  let activeFilter = "all";
  let lastFocused = null;
  let activeArtwork = null;
  let imageIndex = 0;
  let closeTimer = null;
  let touchStartX = 0;

  const elements = {
    dialog: modal.querySelector(".artwork-dialog"),
    close: modal.querySelector("[data-modal-close]"),
    image: modal.querySelector("[data-modal-image]"),
    title: modal.querySelector("[data-modal-title]"),
    type: modal.querySelector("[data-modal-type]"),
    materials: modal.querySelector("[data-modal-materials]"),
    artist: modal.querySelector("[data-modal-artist]"),
    description: modal.querySelector("[data-modal-description]"),
    status: modal.querySelector("[data-modal-status]"),
    dots: modal.querySelector("[data-modal-dots]")
  };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initGalleryFilters() {
    const applyFilter = (filter) => {
      activeFilter = filter;
      filterButtons.forEach((button) => {
        const isActive = button.dataset.galleryFilter === filter;
        button.setAttribute("aria-pressed", String(isActive));
        button.classList.toggle("is-active", isActive);
      });

      let visible = 0;
      cards.forEach((card) => {
        const categories = card.dataset.categories.split(" ");
        const show = filter === "all" || categories.includes(filter);
        window.clearTimeout(Number(card.dataset.hideTimer || 0));
        if (show) {
          visible += 1;
          card.hidden = false;
          requestAnimationFrame(() => card.classList.remove("is-filtered-out"));
        } else if (prefersReducedMotion()) {
          card.hidden = true;
        } else {
          card.classList.add("is-filtered-out");
          const timer = window.setTimeout(() => { card.hidden = true; }, 220);
          card.dataset.hideTimer = String(timer);
        }
      });
      if (resultStatus) resultStatus.textContent = `${visible} ${visible === 1 ? "obra visible" : "obras visibles"}`;
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.galleryFilter));
    });
    applyFilter(activeFilter);
  }

  function renderImage(announce = true) {
    const item = activeArtwork.gallery[imageIndex];
    elements.image.classList.add("is-switching");
    const swap = () => {
      elements.image.src = item.src;
      elements.image.alt = item.alt;
      elements.status.textContent = `Imagen ${imageIndex + 1} de ${activeArtwork.gallery.length}`;
      elements.dots.innerHTML = activeArtwork.gallery.map((_, index) =>
        `<span class="${index === imageIndex ? "is-active" : ""}"></span>`
      ).join("");
      requestAnimationFrame(() => elements.image.classList.remove("is-switching"));
    };
    if (prefersReducedMotion()) swap();
    else window.setTimeout(swap, 90);
    if (!announce) elements.status.setAttribute("aria-live", "off");
    else elements.status.setAttribute("aria-live", "polite");
  }

  function changeImage(direction) {
    if (!activeArtwork) return;
    imageIndex = (imageIndex + direction + activeArtwork.gallery.length) % activeArtwork.gallery.length;
    renderImage();
  }

  function fillModal(artwork) {
    activeArtwork = artwork;
    imageIndex = 0;
    elements.title.textContent = artwork.title;
    elements.type.textContent = artwork.type;
    elements.materials.textContent = artwork.materials;
    elements.artist.textContent = artwork.artist;
    elements.artist.href = artwork.artistPage;
    elements.description.textContent = artwork.description;
    renderImage(false);
  }

  function openModal(artwork, trigger) {
    window.clearTimeout(closeTimer);
    lastFocused = trigger;
    fillModal(artwork);
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    window.setTimeout(() => elements.close.focus(), prefersReducedMotion() ? 0 : 260);
    history.replaceState(null, "", `${location.pathname}${location.search}#obra=${artwork.id}`);
  }

  function closeModal({ restoreFocus = true, clearHash = true } = {}) {
    if (modal.hidden) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    modal.setAttribute("aria-hidden", "true");
    closeTimer = window.setTimeout(() => {
      modal.hidden = true;
      activeArtwork = null;
      if (restoreFocus) lastFocused?.focus();
    }, prefersReducedMotion() ? 0 : 320);
    if (clearHash) history.replaceState(null, "", `${location.pathname}${location.search}`);
  }

  function trapFocus(event) {
    if (event.key !== "Tab" || modal.hidden) return;
    const focusable = [...elements.dialog.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function initArtworkModal() {
    grid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-artwork]");
      if (!trigger) return;
      const artwork = data.artworks.find((item) => item.id === trigger.dataset.openArtwork);
      if (artwork) openModal(artwork, trigger);
    });
    modal.querySelector("[data-modal-dismiss]").addEventListener("click", () => closeModal());
    elements.close.addEventListener("click", () => closeModal());
    modal.querySelector("[data-modal-prev]").addEventListener("click", () => changeImage(-1));
    modal.querySelector("[data-modal-next]").addEventListener("click", () => changeImage(1));
    modal.addEventListener("keydown", trapFocus);
    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") changeImage(-1);
      if (event.key === "ArrowRight") changeImage(1);
    });
    const swipeArea = modal.querySelector("[data-modal-swipe]");
    swipeArea.addEventListener("pointerdown", (event) => { touchStartX = event.clientX; });
    swipeArea.addEventListener("pointerup", (event) => {
      const distance = event.clientX - touchStartX;
      if (Math.abs(distance) > 52) changeImage(distance > 0 ? -1 : 1);
    });

    const hashMatch = location.hash.match(/^#obra=([a-z-]+)$/);
    if (hashMatch) {
      const artwork = data.artworks.find((item) => item.id === hashMatch[1]);
      const trigger = artwork ? grid.querySelector(`[data-open-artwork="${artwork.id}"]`) : null;
      if (artwork && trigger) openModal(artwork, trigger);
    }
  }

  initGalleryFilters();
  initArtworkModal();
})();
