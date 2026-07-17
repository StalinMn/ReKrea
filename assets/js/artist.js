(function initArtistProfiles() {
  const host = document.querySelector("[data-profile-host]");
  const artistId = document.body.dataset.artistId;
  const artist = window.REKREA_DATA?.artists.find((item) => item.id === artistId);
  if (!host || !artist) return;

  const icon = (name, className = "icon") =>
    `<svg class="${className}" aria-hidden="true"><use href="assets/icons/icons.svg#${name}"></use></svg>`;

  host.innerHTML = `
    <article class="profile-card" data-reveal>
      <div class="profile-carousel" data-profile-carousel tabindex="0" aria-label="Fotografías de ${artist.name}">
        <div class="profile-carousel__image-wrap">
          <img data-profile-image src="${artist.images[0].src}" alt="${artist.images[0].alt}" decoding="async">
          <button class="carousel-arrow carousel-arrow--left" type="button" data-profile-prev aria-label="Fotografía anterior">${icon("arrow-left")}</button>
          <button class="carousel-arrow carousel-arrow--right" type="button" data-profile-next aria-label="Fotografía siguiente">${icon("arrow-right")}</button>
          <div class="carousel-status" data-profile-status aria-live="polite">Imagen 1 de ${artist.images.length}</div>
        </div>
        <div class="carousel-dots" aria-hidden="true" data-profile-dots>
          ${artist.images.map((_, index) => `<span class="${index === 0 ? "is-active" : ""}"></span>`).join("")}
        </div>
      </div>
      <div class="profile-card__content">
        <p class="eyebrow">ReKreativo</p>
        <h1>${artist.name}</h1>
        <blockquote>“${artist.quote}”</blockquote>
        <section aria-labelledby="specialty-title">
          <h2 id="specialty-title">${icon("palette")} Especialidad</h2>
          <p>${artist.specialty}</p>
        </section>
        <section aria-labelledby="description-title">
          <h2 id="description-title">${icon("document")} Descripción</h2>
          <p>${artist.description}</p>
        </section>
        <section aria-labelledby="contact-title">
          <h2 id="contact-title">${icon("user")} Contacto</h2>
          <p>${artist.contactLabel}: ${artist.contact}</p>
        </section>
        <a class="button button--outline profile-card__back" href="artistas.html">
          ${icon("arrow-left")} <span>Volver a artistas</span>
        </a>
      </div>
    </article>`;

  const carousel = host.querySelector("[data-profile-carousel]");
  const image = host.querySelector("[data-profile-image]");
  const status = host.querySelector("[data-profile-status]");
  const dots = host.querySelector("[data-profile-dots]");
  let index = 0;
  let startX = 0;

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const show = (newIndex) => {
    index = (newIndex + artist.images.length) % artist.images.length;
    const item = artist.images[index];
    image.classList.add("is-switching");
    const swap = () => {
      image.src = item.src;
      image.alt = item.alt;
      status.textContent = `Imagen ${index + 1} de ${artist.images.length}`;
      dots.innerHTML = artist.images.map((_, dotIndex) =>
        `<span class="${dotIndex === index ? "is-active" : ""}"></span>`
      ).join("");
      requestAnimationFrame(() => image.classList.remove("is-switching"));
    };
    if (reducedMotion()) swap();
    else window.setTimeout(swap, 90);
  };

  host.querySelector("[data-profile-prev]").addEventListener("click", () => show(index - 1));
  host.querySelector("[data-profile-next]").addEventListener("click", () => show(index + 1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
  });
  carousel.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  carousel.addEventListener("pointerup", (event) => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 52) show(index + (distance > 0 ? -1 : 1));
  });
})();
