(function buildSharedComponents() {
  const data = window.REKREA_DATA;
  if (!data) return;

  const icon = (name, className = "icon") =>
    `<svg class="${className}" aria-hidden="true"><use href="assets/icons/icons.svg#${name}"></use></svg>`;

  const socialItems = [
    { id: "instagram", label: "Instagram de ReKrea", href: data.links.instagram, image: "assets/icons/social-instagram.png" },
    { id: "tiktok", label: "TikTok de ReKrea", href: data.links.tiktok, image: "assets/icons/social-tiktok.png" },
    { id: "facebook", label: "Facebook de ReKrea", href: data.links.facebook, image: "assets/icons/social-facebook.png" },
    { id: "whatsapp", label: "WhatsApp de ReKrea", href: data.links.whatsapp, image: "assets/icons/social-whatsapp.png" }
  ];

  const socialLinks = (className = "social-links") => {
    const isLargeContactGroup = className.includes("social-links--large");
    return `
      <div class="${className}">
        ${socialItems.map((item) => `
        <a class="social-link social-link--${item.id}" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
          ${isLargeContactGroup ? icon(item.id) : `<img class="social-link__image" src="${item.image}" width="168" height="168" alt="" aria-hidden="true">`}
        </a>`).join("")}
      </div>`;
  };

  const headerHost = document.querySelector("[data-site-header]");
  if (headerHost) {
    const activePage = document.body.dataset.page || "";
    headerHost.innerHTML = `
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      <header class="site-header" data-header>
        <div class="container site-header__inner">
          <a class="brand-link" href="index.html" aria-label="ReKrea, volver al inicio">
            <img src="assets/img/brand/logo-rekrea.svg" width="190" height="72" alt="ReKrea">
          </a>
          <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-menu" data-menu-toggle>
            ${icon("menu", "menu-toggle__icon menu-toggle__icon--open")}
            ${icon("close", "menu-toggle__icon menu-toggle__icon--close")}
          </button>
          <nav class="site-nav" id="site-menu" aria-label="Navegación principal" data-site-nav>
            <ul>
              ${data.nav.map((item) => `
                <li><a href="${item.href}" data-page-id="${item.id}"${item.id === activePage ? ' aria-current="page"' : ""}>${item.label}</a></li>
              `).join("")}
            </ul>
          </nav>
        </div>
      </header>`;
  }

  const footerHost = document.querySelector("[data-site-footer]");
  if (footerHost) {
    footerHost.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__grid">
          <section class="footer-brand" aria-label="Identidad institucional">
            <img class="footer-brand__rekrea" src="assets/img/brand/logo-rekrea.svg" width="210" height="80" alt="ReKrea">
            <p>Un proyecto de:</p>
            <img class="footer-brand__unach" src="assets/img/brand/unach-rekrea.svg" width="260" height="102" alt="Universidad Nacional de Chimborazo, Carrera de Diseño Gráfico">
          </section>
          <nav class="footer-nav" aria-label="Navegación del pie de página">
            <ul>
              ${data.nav.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
            </ul>
          </nav>
          <section class="footer-social" aria-labelledby="footer-social-title">
            <h2 id="footer-social-title">Síguenos y<br>contáctanos en</h2>
            ${socialLinks()}
          </section>
        </div>
        <div class="container site-footer__legal">
          <p>
      <strong>Desarrollado por:</strong><br>
      David Ismael Guacollante Caguana<br>
      Erika Belén Moreira Sarango
    </p>

    <p>
      <strong>Docente responsable:</strong><br>
      Mgs. Elvis Ruiz Naranjo
    </p>
          <p>Las obras, datos y convocatorias forman parte de la plataforma ReKrea para promover reciclaje creativo, arte urbano y participación comunitaria.</p>
          <p>ReKrea © 2026</p>
        </div>
      </footer>`;
  }

  document.querySelectorAll("[data-social-links]").forEach((host) => {
    host.innerHTML = socialLinks(host.dataset.socialClass || "social-links social-links--large");
  });
})();
