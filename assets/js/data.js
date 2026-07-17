window.REKREA_DATA = Object.freeze({
  links: Object.freeze({
    volunteers: "https://docs.google.com/forms/d/e/1FAIpQLScEYhL4VMKrsJV8Pbt_Q7vHS6Wk6JeTPR7oO3VU-YznD_Z_xQ/viewform?usp=header",
    artists: "https://docs.google.com/forms/d/e/1FAIpQLSe5d6Bfn_pW2z4ByRZyh7njo8SAM-CGo2MoykTZju3cGsk1_Q/viewform?usp=publish-editor",
    vote: "https://forms.gle/cdmT5LPEeaxm5kgL6",
    whatsapp: "https://wa.me/qr/MBHIIN5NL7MCE1",
    instagram: "https://www.instagram.com/rekrea_official?igsh=Y3AxNXpnbWtzNjN3&utm_source=qr",
    facebook: "https://www.facebook.com/share/1DXedvmZc1/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@rekre4?_r=1&_t=ZS-986LYnUuysC"
  }),

  nav: Object.freeze([
    { id: "home", label: "Inicio", href: "index.html" },
    { id: "about", label: "Qué es ReKrea", href: "que-es-rekrea.html" },
    { id: "gallery", label: "Galería", href: "galeria.html" },
    { id: "artists", label: "Artistas", href: "artistas.html" },
    { id: "contact", label: "Contáctanos", href: "contacto.html" }
  ]),

  artworks: Object.freeze([
    {
      id: "guardian",
      title: "Guardián",
      categories: ["murales", "tapas"],
      category: "Mural con tapas recicladas",
      type: "Mural de tapas recicladas",
      artist: "Jerry Mena",
      artistPage: "artista-jerry.html",
      materials: "Tapas plásticas, pintura y panel reutilizado",
      summary: "Un mural colorido que muestra al mensajero de los dioses a través de tapas plásticas.",
      description: "“Guardián”, una obra desarrollada por Jerry, es un mural inspirado en el colibrí, símbolo de conexión en la naturaleza. Está elaborada con tapas plásticas recicladas, organizadas por color, y muestra cómo un residuo puede transformar un espacio.",
      cardImage: "assets/img/artworks/guardian-main.webp",
      gallery: [
        { src: "assets/img/artworks/guardian-main.webp", alt: "Mural Guardián terminado, un colibrí elaborado con tapas recicladas" },
        { src: "assets/img/artworks/guardian-process-01.webp", alt: "Jerry colocando tapas de colores en el mural Guardián" },
        { src: "assets/img/artworks/guardian-process-02.webp", alt: "Detalle del proceso de construcción del colibrí con tapas" },
        { src: "assets/img/artworks/guardian-process-03.webp", alt: "Jerry seleccionando tapas de colores para la obra Guardián" }
      ]
    },
    {
      id: "segunda-vida",
      title: "Segunda Vida",
      categories: ["esculturas", "botellas"],
      category: "Recuperación de objetos",
      type: "Escultura",
      artist: "Jessica Rivera",
      artistPage: "artista-jessica.html",
      materials: "Botellas plásticas, latas y cartón",
      summary: "Esta mesa fue recuperada y transformada en una obra que demuestra que no todo siempre está perdido.",
      description: "“Segunda Vida” nace de la recuperación de una mesa deteriorada. Su superficie fue reconstruida con resina e incorpora flores hechas con materiales reciclados. La obra representa la posibilidad de rescatar objetos olvidados y darles una nueva función estética.",
      cardImage: "assets/img/artworks/second-life-main.webp",
      gallery: [
        { src: "assets/img/artworks/second-life-main.webp", alt: "Escultura Segunda Vida instalada sobre una mesa restaurada" },
        { src: "assets/img/artworks/second-life-process-01.webp", alt: "Jessica vertiendo resina durante el proceso de Segunda Vida" },
        { src: "assets/img/artworks/second-life-process-02.webp", alt: "Jessica junto a la escultura Segunda Vida terminada" },
        { src: "assets/img/artworks/second-life-process-03.webp", alt: "Jessica trabajando con materiales recuperados en su taller" }
      ]
    },
    {
      id: "raices",
      title: "Raíces",
      categories: ["esculturas"],
      category: "Escultura",
      type: "Escultura",
      artist: "Antonny Santamaría",
      artistPage: "artista-antonny.html",
      materials: "Botellas, tapas y alambre",
      summary: "Esta escultura muestra un árbol que simboliza una conexión de lo humano con el ambiente.",
      description: "“Raíces” es una escultura realizada con llantas recicladas por Antonny y simboliza el vínculo entre la ciudad y la naturaleza. Su estructura invita a reflexionar sobre el cuidado del entorno mediante sus colores.",
      cardImage: "assets/img/artworks/roots-main.webp",
      gallery: [
        { src: "assets/img/artworks/roots-main.webp", alt: "Escultura Raíces terminada en un espacio verde de la ciudad" },
        { src: "assets/img/artworks/roots-process-01.webp", alt: "Antonny trabajando en una rama de la escultura Raíces" },
        { src: "assets/img/artworks/roots-process-02.webp", alt: "Antonny junto a la escultura Raíces" },
        { src: "assets/img/artworks/roots-process-03.webp", alt: "Antonny dando forma a los detalles de la escultura" }
      ]
    },
    {
      id: "nuestro-mundo",
      title: "Nuestro mundo",
      categories: ["murales", "tapas"],
      category: "Instalación tipo mural",
      type: "Instalación artística",
      artist: "Danna Sarango",
      artistPage: "artista-danna.html",
      materials: "Cartón, latas y tapas",
      summary: "Esta obra realizada con estudiantes representa la unidad y el compañerismo durante su desarrollo.",
      description: "“Nuestro mundo” es una instalación tipo mural desarrollada junto a estudiantes de quinto grado de la Unidad Educativa Eco Río. La obra representa un símbolo de unión, resalta el valor del trabajo colectivo y la importancia de cuidar el mundo desde acciones pequeñas.",
      cardImage: "assets/img/artworks/world-main.webp",
      gallery: [
        { src: "assets/img/artworks/world-main.webp", alt: "Instalación Nuestro mundo terminada en el muro de una institución educativa" },
        { src: "assets/img/artworks/world-process-01.webp", alt: "Danna y estudiantes creando elementos con tapas recicladas" },
        { src: "assets/img/artworks/world-process-02.webp", alt: "Danna junto a estudiantes frente a Nuestro mundo" },
        { src: "assets/img/artworks/world-process-03.webp", alt: "Danna trabajando con materiales reutilizados" }
      ]
    }
  ]),

  artists: Object.freeze([
    {
      id: "jerry",
      name: "Jerry Mena",
      page: "artista-jerry.html",
      cutout: "assets/img/artists/jerry-cutout.webp",
      quote: "Cuando las personas crean juntas, también transforman su comunidad",
      specialty: "Muralista",
      description: "Soy artista con experiencia en muralismo, ilustración y composición gráfica. He trabajado en proyectos para espacios urbanos en Riobamba y Quito, desarrollando piezas de gran formato. En ReKrea aporto desde la creación de murales y propuestas visuales que conectan con el entorno.",
      contactLabel: "Celular",
      contact: "0924872831",
      images: [
        { src: "assets/img/artists/jerry-profile.webp", alt: "Jerry Mena frente al mural Guardián" },
        { src: "assets/img/artists/jerry-process.webp", alt: "Jerry Mena organizando tapas para una intervención artística" }
      ]
    },
    {
      id: "jessica",
      name: "Jessica Rivera",
      page: "artista-jessica.html",
      cutout: "assets/img/artists/jessica-cutout.webp",
      quote: "Me interesa crear obras que hagan que las personas se detengan y miren con curiosidad",
      specialty: "Diseñadora",
      description: "Soy diseñadora con experiencia en diseño espacial y montaje de instalaciones artísticas. He participado en proyectos de recuperación de espacios en Milagro y en ReKrea desarrollo instalaciones que generan interacción.",
      contactLabel: "Instagram",
      contact: "@yesart_world",
      images: [
        { src: "assets/img/artists/jessica-profile.webp", alt: "Jessica Rivera junto a la escultura Segunda Vida" },
        { src: "assets/img/artists/jessica-process.webp", alt: "Jessica Rivera trabajando con resina en su taller" }
      ]
    },
    {
      id: "antonny",
      name: "Antonny Santamaría",
      page: "artista-antonny.html",
      cutout: "assets/img/artists/antonny-cutout.webp",
      quote: "Para mí, una obra también se entiende cuando puedes rodearla y verla desde otros lados",
      specialty: "Escultor",
      description: "Soy escultor y artista de creación tridimensional. He trabajado en propuestas experimentales con volumen y estructura dentro de la ciudad. En ReKrea participo creando obras que puedan integrarse al espacio público y ser vistas desde distintas perspectivas.",
      contactLabel: "Celular",
      contact: "0913828391",
      images: [
        { src: "assets/img/artists/antonny-profile.webp", alt: "Antonny Santamaría junto a la escultura Raíces" },
        { src: "assets/img/artists/antonny-process.webp", alt: "Antonny Santamaría trabajando en los detalles de Raíces" }
      ]
    },
    {
      id: "danna",
      name: "Danna Sarango",
      page: "artista-danna.html",
      cutout: "assets/img/artists/danna-cutout.webp",
      quote: "Cuando una obra se crea con más personas, también guarda parte de sus historias",
      specialty: "Estudiante de Artes",
      description: "Soy estudiante de la carrera de Artes y tengo experiencia en talleres creativos. Dentro de ReKrea aporto ideas que permitan crear obras en conjunto con participantes voluntarios y campañas en escuelas y colegios.",
      contactLabel: "Instagram",
      contact: "@dannart_",
      images: [
        { src: "assets/img/artists/danna-profile.webp", alt: "Danna Sarango junto a estudiantes y la instalación Nuestro mundo" },
        { src: "assets/img/artists/danna-process.webp", alt: "Danna Sarango creando piezas con materiales reutilizados" }
      ]
    }
  ])
});
