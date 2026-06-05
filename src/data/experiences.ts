export interface Experience {
  id: string;
  title: string;
  category: 'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature' | 'Transport';
  categoryLabel: string;
  icon: string;
  price: number;
  priceUnit: string;
  description: string;
  longDescription: string;
  image: string;
  additionalImages?: string[];
  features?: string[];
  amenities?: string[];
  maxGuests?: number;
  duration?: string;
  rating?: number;
}

export const experiences: Experience[] = [
  {
    id: "finca-esmeralda",
    title: "Retiro Villa Esmeralda",
    category: "Stay",
    categoryLabel: "Estadía",
    icon: "villa",
    price: 575,
    priceUnit: "night",
    description: "Exclusiva villa de lujo con vistas panorámicas del embalse de Guatapé, piscina privada y comodidades premium.",
    longDescription: "Experimenta el máximo modernismo tropical en Villa Esmeralda. Ubicada en las orillas del impresionante embalse Peñol-Guatapé, esta obra maestra arquitectónica ofrece una vida interior-exterior fluida. Con vidrios de piso a techo, una amplia piscina infinita y acceso a muelle privado, cada momento aquí está diseñado para conectarte con la energía vibrante del paisaje más hermoso de Colombia. Perfecto para familias o grupos que buscan un escape soleado y premium.",
    image: "/images/villa_lujo_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/lancha_pontones_real.png",
      "/images/jungle_motors_real.png"
    ],
    features: ["12 Huéspedes", "5 Habitaciones", "6 Baños"],
    amenities: ["Piscina Infinita", "Wi-Fi Rápido", "Zona BBQ", "Muelle Privado", "Jacuzzi", "Cine en Casa"],
    maxGuests: 12,
    rating: 4.9
  },
  {
    id: "helicoptero-penol",
    title: "Tours en Helicóptero",
    category: "Air Adventure",
    categoryLabel: "Aventura Aérea",
    icon: "flight",
    price: 104,
    priceUnit: "person (from)",
    description: "Experimenta impresionantes vistas aéreas de El Peñol y el embalse laberíntico desde un helicóptero de última generación.",
    longDescription: `¡Vuela con nosotros y vive la experiencia de conocer El Peñol y Guatapé desde el aire!

━━━ VUELO 6 MINUTOS ━━━
Precio oficial
• Por pasajero — $379.500 COP / $104 USD
• Vuelo privado — $1.897.500 COP / $518 USD
Recorrido: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 180° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, Cruz del Embalse y la Réplica del Viejo Peñol.

━━━ VUELO 8 MINUTOS ━━━
Precio oficial
• Por pasajero — $471.500 COP / $127 USD
• Vuelo privado — $2.357.500 COP / $633 USD
Recorrido: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 180° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar con giro de 360° sobre ella y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Cruz del Embalse y la Réplica del Viejo Peñol.

━━━ VUELO 12 MINUTOS ━━━
Precio oficial
• Por pasajero — $759.000 COP / $207 USD
• Vuelo privado — $3.795.000 COP / $1035 USD
Recorrido: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 360° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Municipio de Guatapé y su malecón, Cruz del Embalse y la Réplica del Viejo Peñol.

━━━ VUELO 15 MINUTOS ━━━
Precio oficial
• Por pasajero — $948.750 COP / $257 USD
• Vuelo privado — $4.743.750 COP / $1283 USD
Recorrido: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 360° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Municipio de Guatapé y su malecón, Vertedero de la hidroeléctrica, Cruz del Embalse y la Réplica del Viejo Peñol.

━━━ VUELO 1 HORA ━━━
Contáctanos para detalles y precios

MEDELLÍN — PEÑOL — MEDELLÍN
Vuela desde los hangares del Aeropuerto Olaya Herrera en Medellín, directamente hasta la Isla de la Fantasía o base Montecielo Fly en El Peñol. Allí te transportamos hacia el bote en el malecón de Guatapé y te esperamos una hora. Luego regresamos al muelle y transportados al helicóptero de nuevo, para finalmente volver al Aeropuerto Olaya Herrera en Medellín.

¡Contáctanos para personalizar tus vuelos, tus rutas, tus deseos!`,
    image: "/images/el_penol_real.png",
    additionalImages: [
      "/images/parapente_real.png",
      "/images/lancha_pontones_real.png"
    ],
    features: ["Vuelos de 6 a 15 Min", "Piloto Bilingüe", "Panorámicas"],
    amenities: ["Equipo de Seguridad", "Auriculares con Cancelación de Ruido", "Servicio de Fotografía HD", "Acceso a Sala VIP"],
    duration: "Varias opciones",
    rating: 5.0
  },
  {
    id: "lancha-pontones",
    title: "Lanchas y Pontones",
    category: "Water",
    categoryLabel: "Agua",
    icon: "sailing",
    price: 92,
    priceUnit: "hour",
    description: "Relájate y diviértete en el agua con nuestros alquileres de pontones premium. Perfecto para grupos que buscan explorar las islas.",
    longDescription: "Navega por las cristalinas aguas del embalse de Guatapé con estilo. Nuestros pontones y lanchas rápidas de primera línea vienen equipados con capitanes experimentados, sistemas de sonido de alta calidad, cómodas áreas de descanso y neveras para tus refrigerios. Detente en hermosas islas, nada en aguas refrescantes o visita atracciones locales junto al lago durante tu itinerario personalizado.",
    image: "/images/lancha_pontones_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Hasta 15 Pax", "Capitán Privado", "Audio Bluetooth"],
    amenities: ["Chalecos Salvavidas", "Parrilla BBQ a Bordo", "Hielo y Neveras", "Juguetes Acuáticos"],
    duration: "Flexible (Mínimo 2 horas)",
    rating: 4.8
  },
  {
    id: "jungle-motors",
    title: "Jungle Motors (ATV)",
    category: "Adrenaline",
    categoryLabel: "Adrenalina",
    icon: "two_wheeler",
    price: 52,
    priceUnit: "hour",
    description: "Navega por emocionantes senderos en la selva y descubre miradores escondidos en nuestros potentes vehículos todo terreno.",
    longDescription: "Prepárate para embarrarte y experimentar la belleza natural de los paisajes que rodean a Guatapé. Nuestros tours en cuatrimoto (ATV) Jungle Motors te llevan fuera de los caminos trillados, a través de bosques profundos, pistas de tierra accidentadas y miradores secretos junto al lago. Guiada por guías locales profesionales, esta aventura es perfecta para los buscadores de adrenalina que desean conectarse con el exuberante campo de Colombia.",
    image: "/images/atv_1.jpeg",
    additionalImages: [
      "/images/atv_2.jpeg",
      "/images/atv_3.jpeg"
    ],
    features: ["Cuatrimotos 4x4", "Guía Experto", "Charla de Seguridad"],
    amenities: ["Cascos y Gafas de Seguridad", "Casilleros", "Agua Embotellada", "Ropa de Lluvia (si es necesario)"],
    duration: "2 - 4 horas",
    rating: 4.7
  },
  {
    id: "parapente",
    title: "Parapente",
    category: "Air Adventure",
    categoryLabel: "Aventura Aérea",
    icon: "air",
    price: 75,
    priceUnit: "flight",
    description: "Vuela pacíficamente sobre el embalse. Un vuelo en tándem que ofrece la perspectiva más serena y majestuosa de Guatapé.",
    longDescription: "Flota por encima del embalse en completa serenidad. Nuestros vuelos en parapente en tándem se lanzan desde las alturas escénicas que dominan la región, permitiéndote deslizarte silenciosamente sobre corrientes térmicas. Vuela junto a un piloto profesional certificado y disfruta de vistas panorámicas inigualables e impresionantes de todo el laberinto de agua y la dramática piedra de El Peñol.",
    image: "/images/parapente_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Vuelo en Tándem", "Instructor Certificado", "Video GoPro"],
    amenities: ["Todo el Equipo de Vuelo", "Seguro de Vuelo", "Video Digital y Fotos", "Transporte al Sitio de Lanzamiento"],
    duration: "20 minutos de vuelo",
    rating: 4.9
  },
  {
    id: "paseo-caballo",
    title: "Paseo a Caballo",
    category: "Nature",
    categoryLabel: "Naturaleza",
    icon: "directions_walk",
    price: 35,
    priceUnit: "hour",
    description: "Disfruta de un tranquilo paseo a caballo a lo largo de escénicos senderos ecológicos que bordean el hermoso embalse.",
    longDescription: "Baja el ritmo y reconéctate con la naturaleza en una pacífica excursión a caballo. Trota por suaves senderos ecológicos, a través de bosques tropicales y justo a lo largo del borde del embalse. Nuestros caballos son tranquilos, excepcionalmente bien cuidados y adecuados para jinetes de todos los niveles, haciendo de esta una actividad familiar relajante, auténtica y memorable en Guatapé.",
    image: "/images/caballo_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Caballos Mansos", "Guía Local", "Senderos Ecológicos"],
    amenities: ["Cascos de Equitación", "Sesión de Entrenamiento Básico", "Snacks y Refrescos", "Alforjas para Objetos Personales"],
    duration: "1 - 3 horas",
    rating: 4.6
  },
  {
    id: "jetcar-guatape",
    title: "AQUA DRIVE COLOMBIA - Jetcar",
    category: "Water",
    categoryLabel: "Agua",
    icon: "directions_boat",
    price: 747500,
    priceUnit: "COP (starts at)",
    description: "Vive la experiencia de lujo con Jetcar. Conducir un Jetcar es vivir al máximo. Súbete y disfruta una experiencia inolvidable.",
    longDescription: `¡Bienvenido a AQUA DRIVE COLOMBIA — GUATAPÉ!
Vive la experiencia de lujo con Jetcar.

Nuestros servicios:

━━━ JETCAR 2 PUESTOS ━━━
• 30 minutos — $747.500 COP
• 1 hora — $1.380.000 COP

━━━ JETCAR 4 PUESTOS ━━━
• 30 minutos — $977.500 COP
• 1 hora — $1.840.000 COP

Viajar es vivir… y conducir un Jetcar es vivir al máximo. Súbete y disfruta una experiencia inolvidable. ¡Reserva ahora!`,
    image: "/images/jetcar_video.mp4",
    additionalImages: [
      "/images/jetcar_1.jpeg",
      "/images/jetcar_2.jpeg",
      "/images/jetcar_3.jpeg",
      "/images/jetcar_4.jpeg"
    ],
    features: ["2 o 4 Asientos", "Auto-conducción", "Experiencia Premium"],
    amenities: ["Seguro básico incluido", "Asistencia 24/7", "Una experiencia única en Guatapé"],
    duration: "30 min - 1 hora",
    rating: 4.8
  },
  {
    id: "yate-majestic",
    title: "Yate Majestic (De Lujo)",
    category: "Water",
    categoryLabel: "Agua",
    icon: "directions_boat",
    price: 195500,
    priceUnit: "COP / person",
    description: "El Yate Majestic es el único de agua dulce en Colombia y te permitirá conocer y admirar los hermosos paisajes reflejados en el agua.",
    longDescription: `Hotel Los Recuerdos presenta: Yate Majestic — el único yate de lujo en agua dulce de Colombia.

Admira los hermosos paisajes del embalse reflejados en el agua. Este yate cuenta con restaurante, bar, solárium y 4 jacuzzis.

Incluye:
• Recorrido de 2 horas
• Almuerzo o cena
• 2 bebidas alcohólicas o refrescantes por persona

Horarios de zarpe:
• Miércoles — 1:45 pm
• Sábado — 1:45 pm y 5:45 pm
• Domingo — 1:45 pm
• Domingo festivo — 1:45 pm y 5:45 pm
• Lunes festivo — 1:45 pm

Precio:
• Valor por persona — $195.500 COP (pago directo menos 48 horas antes)

Importante: No se permiten mascotas. No está permitido el ingreso de alimentos y bebidas ajenas al establecimiento.`,
    image: "/images/villa_lujo_real.png",
    additionalImages: [],
    features: ["2 Horas", "Comidas Incluidas", "Bebidas Incluidas"],
    amenities: ["Restaurante", "Bar", "Solárium", "4 Jacuzzis"],
    duration: "2 horas",
    rating: 4.9
  },
  {
    id: "transporte-aeropuerto",
    title: "Transporte Aeropuerto - Guatapé",
    category: "Stay", // Added Stay or create a Transport category if needed. Wait, type is 'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature'
    // I will just use 'Stay' for now or add 'Transport' to the interface and use it. I will add it to the interface.
    categoryLabel: "Transporte",
    icon: "directions_car",
    price: 50,
    priceUnit: "USD",
    description: "Servicio exclusivo y seguro de traslados desde Medellín (José María Córdova u Olaya Herrera) hacia Guatapé y viceversa.",
    longDescription: "Viaja con comodidad, seguridad y estilo. Ofrecemos traslados privados desde el Aeropuerto Internacional José María Córdova (MDE) o el Aeropuerto Olaya Herrera directamente a tu hotel o villa en Guatapé.\n\nNuestra flota cuenta con vehículos modernos, aire acondicionado y conductores profesionales que conocen la zona a la perfección.\n\n* Opciones de vehículos para parejas o grupos grandes.\n* Servicio disponible 24/7 con reserva previa.\n* Precios sujetos a tamaño del grupo y vehículo.\n\nContáctanos para cotizar tu transporte y asegurar un inicio de viaje perfecto.",
    image: "/images/villa_lujo_real.png", // placeholder
    additionalImages: [],
    features: ["Traslado Privado", "Vehículos con Aire Acondicionado", "Conductores Profesionales"],
    amenities: ["Botellas de Agua", "Wi-Fi en algunos vehículos", "Asistencia con Equipaje"],
    duration: "Aprox. 2 horas",
    rating: 5.0
  },
  {
    id: "bulgatti-jetcar",
    title: "Bulgatti Jetcar Experience",
    category: "Water",
    categoryLabel: "Agua",
    icon: "directions_boat",
    price: 550000,
    priceUnit: "COP (starts at)",
    description: "Vive más. Colecciona momentos. La experiencia Bulgatti Jetcar de forma relajada y accesible o VIP.",
    longDescription: `Bulgatti Jetcar Experience
Vive más. Colecciona momentos.

Nuestros planes:

━━━ PLAN ADVENTURE (Con capitán incluido) ━━━
La opción perfecta para disfrutar la experiencia Bulgatti Jetcar de forma relajada y accesible.
Incluye: Capitán privado, Paseo en el mar, Música y experiencia luxury.
TARIFAS:
• 30 minutos — $550.000 COP
• 45 minutos — $770.000 COP

━━━ PLAN INFLUENCER (Tú manejas el jetcar) ━━━
Ideal para quienes quieren vivir la experiencia completa y crear contenido increíble.
Incluye: Manejo del Bulgatti Jetcar, Inducción y acompañamiento del capitán, GoPro incluida, Tiempo para fotos y videos.
TARIFAS:
• 30 minutos — $715.000 COP
• 45 minutos — $880.000 COP

━━━ PLAN BOSS (Experiencia VIP completa) ━━━
La experiencia más exclusiva y premium del Bulgatti Jetcar.
Incluye: Manejo del Bulgatti Jetcar, Inducción personalizada, GoPro incluida, Tomas aéreas con dron, Videos cinematic premium, Atención VIP.
TARIFAS:
• 1 HORA — $1.430.000 COP

Ideal para parejas, amigos y grupos.`,
    image: "/images/villa_lujo_real.png",
    additionalImages: [],
    features: ["Plan Adventure", "Plan Influencer", "Plan Boss"],
    amenities: ["Seguridad primero", "Experiencia premium", "Recuerdos inolvidables"],
    duration: "30 min - 1 hora",
    rating: 5.0
  },
  {
    id: "g-wagon-jetcar",
    title: "G-Wagon Jetcar Experience",
    category: "Water",
    categoryLabel: "Agua",
    icon: "directions_boat",
    price: 550000,
    priceUnit: "COP (starts at)",
    description: "Vive Guatapé desde una perspectiva única con el G-Wagon Jetcar.",
    longDescription: `G-Wagon Jetcar Experience
Vive Guatapé desde una perspectiva única.

Nuestros planes:

━━━ PLAN ADVENTURE (Con capitán incluido) ━━━
La opción perfecta para disfrutar la experiencia G-Wagon Jetcar de forma cómoda, divertida y accesible.
Incluye: Capitán privado, Paseo en el mar, Música y experiencia luxury.
TARIFAS:
• 30 minutos — $550.000 COP
• 45 minutos — $770.000 COP

━━━ PLAN INFLUENCER (Tú manejas el jetcar) ━━━
Vive la experiencia completa manejando el G-Wagon Jetcar mientras creas contenido increíble.
Incluye: Manejo del G-Wagon Jetcar, Inducción y acompañamiento del capitán, GoPro incluida, Tiempo para fotos y videos.
TARIFAS:
• 30 minutos — $825.000 COP
• 45 minutos — $990.000 COP

━━━ PLAN BOSS (Experiencia VIP completa) ━━━
La experiencia más exclusiva y premium del G-Wagon Jetcar.
Incluye: Manejo del G-Wagon Jetcar, Inducción personalizada, GoPro incluida, Tomas aéreas con dron, Videos cinematic premium, Atención VIP.
TARIFAS:
• 1 HORA — $1.650.000 COP

Rutas increíbles y paisajes espectaculares.`,
    image: "/images/villa_lujo_real.png",
    additionalImages: [],
    features: ["Plan Adventure", "Plan Influencer", "Plan Boss"],
    amenities: ["Seguridad primero", "Experiencia premium", "Recuerdos inolvidables"],
    duration: "30 min - 1 hora",
    rating: 5.0
  },
  {
    id: "buggy-neomundo",
    title: "Buggy",
    category: "Adrenaline",
    categoryLabel: "Adrenalina",
    icon: "two_wheeler",
    price: 330000,
    priceUnit: "COP (starts at)",
    description: "Descubre y disfruta de nuestras emocionantes experiencias en Buggy.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Buggy.

TARIFAS:
• 2 Personas — $330.000 COP
• 4 Personas (max 300kg) — $495.000 COP

Duración: 45 minutos de recorrido.`,
    image: "/images/atv_1.jpeg",
    additionalImages: [],
    features: ["45 Minutos de recorrido", "Hasta 4 Personas", "Off-road"],
    amenities: ["Seguridad", "Guía Turístico", "Aventura garantizada"],
    duration: "45 minutos",
    rating: 4.8
  },
  {
    id: "aventura-4x4-neomundo",
    title: "Aventura 4x4",
    category: "Adrenaline",
    categoryLabel: "Adrenalina",
    icon: "directions_car",
    price: 495000,
    priceUnit: "COP (starts at)",
    description: "Recorrido emocionante en Jeep 4x4 para vivir la mejor aventura.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Aventura 4x4.

TARIFAS JEEP:
• 4 Personas — $495.000 COP
• 2 Personas — $660.000 COP

Duración: 45 minutos de recorrido.`,
    image: "/images/atv_2.jpeg",
    additionalImages: [],
    features: ["45 Minutos de recorrido", "Jeep 4x4", "Hasta 4 Personas"],
    amenities: ["Seguridad", "Guía Turístico", "Aventura garantizada"],
    duration: "45 minutos",
    rating: 4.9
  },
  {
    id: "can-am-neomundo",
    title: "Can-Am",
    category: "Adrenaline",
    categoryLabel: "Adrenalina",
    icon: "two_wheeler",
    price: 660000,
    priceUnit: "COP",
    description: "La experiencia más extrema en Can-Am para 2 personas.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Can-Am.

TARIFAS:
• 2 Personas — $660.000 COP

Duración: 45 minutos de recorrido.`,
    image: "/images/atv_3.jpeg",
    additionalImages: [],
    features: ["45 Minutos de recorrido", "2 Personas", "Extremo"],
    amenities: ["Seguridad", "Guía Turístico", "Adrenalina pura"],
    duration: "45 minutos",
    rating: 5.0
  },
  {
    id: "cuatrimoto-neomundo",
    title: "Cuatrimoto",
    category: "Adrenaline",
    categoryLabel: "Adrenalina",
    icon: "two_wheeler",
    price: 242000,
    priceUnit: "COP",
    description: "Diversión asegurada en cuatrimoto para 1 o 2 personas.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Cuatrimoto.

TARIFAS:
• 1 Persona — $242.000 COP
• 2 Personas (max 150kg) — Incluido en el precio del vehículo (o consultar).

Duración del recorrido según disponibilidad.`,
    image: "/images/atv_1.jpeg",
    additionalImages: [],
    features: ["1 o 2 Personas", "Off-road", "Aventura"],
    amenities: ["Seguridad", "Guía Turístico", "Diversión"],
    duration: "Variable",
    rating: 4.7
  },
  {
    id: "jetski-neomundo",
    title: "Jetski",
    category: "Water",
    categoryLabel: "Agua",
    icon: "surfing",
    price: 330000,
    priceUnit: "COP",
    description: "Siente la velocidad y adrenalina en el agua con nuestros Jetski.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Jetski.

TARIFAS:
• Max 3 Personas — $330.000 COP

Duración: 60 minutos.`,
    image: "/images/lancha_pontones_real.png",
    additionalImages: [],
    features: ["60 Minutos", "Max 3 Personas", "Velocidad"],
    amenities: ["Chalecos Salvavidas", "Guía Turístico", "Seguridad"],
    duration: "60 minutos",
    rating: 4.9
  }
];
