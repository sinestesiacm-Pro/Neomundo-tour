export interface Experience {
  id: string;
  title: string;
  category: 'Stay' | 'Air Adventure' | 'Water' | 'Land' | 'Nature' | 'Transport';
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
    id: "helicoptero-penol",
    title: "Tours en Helicóptero",
    category: "Air Adventure",
    categoryLabel: "Aventura Aérea",
    icon: "flight",
    price: 330000,
    priceUnit: "COP / persona",
    description: "Sobrevuela los destinos más increíbles de la región. La Piedra del Peñol, embalses, fincas de famosos y más desde un helicóptero de última generación.",
    longDescription: `¡Vuela con nosotros y vive la experiencia de conocer El Peñol y Guatapé desde el aire!

En todos nuestros recorridos sobrevolamos los destinos más increíbles de la región:
• La Piedra del Peñol
• Zona de Embalses
• Fincas de Famosos
• Réplica del Viejo Peñol

━━━ VUELO 6 MINUTOS ━━━
• Por pasajero — $330.000 COP

━━━ VUELO 8 MINUTOS ━━━
• Por pasajero — $410.000 COP

━━━ VUELO 12 MINUTOS ━━━
• Por pasajero — $660.000 COP

━━━ VUELO 15 MINUTOS ━━━
• Por pasajero — $825.000 COP

¡Contáctanos para personalizar tus vuelos, tus rutas, tus deseos!`,
    image: "/images/helicopter_tour_guatape.png",
    additionalImages: [
      "/images/el_penol_real.png"
    ],
    features: ["Vuelos de 6 a 15 Min", "Seguridad Certificada", "Vistas Inigualables"],
    amenities: ["Seguridad Certificada", "Atención Personalizada", "Vistas Inigualables", "Experiencia Premium"],
    duration: "Varias opciones",
    rating: 5.0
  },

  {
    id: "parapente",
    title: "Parapente",
    category: "Air Adventure",
    categoryLabel: "Aventura Aérea",
    icon: "air",
    price: 360000,
    priceUnit: "COP",
    description: "Vive la libertad desde el cielo. Adrenalina, paisajes y libertad en un solo vuelo sobre la imponente represa de Guatapé.",
    longDescription: `¡Vive la libertad desde el cielo!

Adrenalina, paisajes y libertad en un solo vuelo. Emoción pura, vistas increíbles y recuerdos que duran para siempre.

🛥️ **La Experiencia:**
Tour en yate desde el malecón de Guatapé hasta la pista de despegue (ida y regreso, aproximadamente 30 minutos de recorrido). Luego te preparas con nuestro equipo logístico para realizar el tour aéreo en parapente con un piloto certificado.

🪂 **El Vuelo:**
Duración aproximada de 15 a 20 minutos, de acuerdo a las condiciones climáticas y del viento. No vendemos un tiempo determinado de vuelo, ofrecemos una experiencia única de volar en parapente sobre el lago.

✅ **¿Qué Incluye?**
• Tour en lancha: Aproximadamente 30 minutos ida y regreso
• Vuelo tándem inductivo con piloto certificado: 15 a 20 minutos
• Póliza de asistencia médica
• Fotos y videos

🏆 **¿Por qué Volar con Nosotros?**
• Pilotos Certificados
• Equipo de Alta Calidad
• Las Mejores Vistas de Guatapé
• Experiencia Segura y Confiable

💰 **Tarifa:**
• Valor por persona — $360.000 COP`,
    image: "/images/parapente_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/guatape_pueblo.png"
    ],
    features: ["Tour en Yate + Vuelo", "Piloto Certificado", "Fotos y Video"],
    amenities: ["Tour en Lancha", "Póliza de Asistencia Médica", "Equipo de Alta Calidad", "Pilotos Certificados"],
    duration: "15 - 20 min de vuelo",
    rating: 4.9
  },
  {
    id: "paseo-caballo",
    title: "Paseo a Caballo",
    category: "Land",
    categoryLabel: "Tierra",
    icon: "directions_walk",
    price: 35,
    priceUnit: "hour",
    description: "Disfruta de un tranquilo paseo a caballo a lo largo de escénicos senderos ecológicos que bordean el hermoso embalse.",
    longDescription: "Baja el ritmo y reconéctate con la naturaleza en una pacífica excursión a caballo. Trota por suaves senderos ecológicos, a través de bosques tropicales y justo a lo largo del borde del embalse. Nuestros caballos son tranquilos, excepcionalmente bien cuidados y adecuados para jinetes de todos los niveles, haciendo de esta una actividad familiar relajante, auténtica y memorable en Guatapé.",
    image: "/images/caballo_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/guatape_pueblo.png"
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
    image: "/images/yate_majestic_video.mp4",
    additionalImages: [],
    features: ["2 Horas", "Comidas Incluidas", "Bebidas Incluidas"],
    amenities: ["Restaurante", "Bar", "Solárium", "4 Jacuzzis"],
    duration: "2 horas",
    rating: 4.9
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
    image: "/images/jetcar_1.jpeg",
    additionalImages: [
      "/images/jetcar_2.jpeg",
      "/images/jetcar_3.jpeg"
    ],
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
    image: "/images/jetcar_2.jpeg",
    additionalImages: [
      "/images/jetcar_1.jpeg",
      "/images/jetcar_4.jpeg"
    ],
    features: ["Plan Adventure", "Plan Influencer", "Plan Boss"],
    amenities: ["Seguridad primero", "Experiencia premium", "Recuerdos inolvidables"],
    duration: "30 min - 1 hora",
    rating: 5.0
  },
  {
    id: "cuatrimoto-neomundo",
    title: "Cuatrimoto",
    category: "Land",
    categoryLabel: "Tierra",
    icon: "two_wheeler",
    price: 242000,
    priceUnit: "COP",
    description: "Diversión asegurada en cuatrimoto para 1 o 2 personas.",
    longDescription: `Descubre y disfruta de nuestras emocionantes experiencias en Cuatrimoto.

TARIFAS:
• 1 Persona — $242.000 COP
• 2 Personas (max 150kg) — Incluido en el precio del vehículo (o consultar).

Duración del recorrido según disponibilidad.`,
    image: "/images/cuatrimoto_1.jpeg",
    additionalImages: [
      "/images/cuatrimoto_2.jpeg",
      "/images/cuatrimoto_3.jpeg"
    ],
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
  },
  {
    id: "finca-tres-marias",
    title: "Finca Tres Marias",
    category: "Stay",
    categoryLabel: "Finca",
    icon: "villa",
    price: 2875000,
    priceUnit: "COP / noche",
    description: "Espectacular Finca Tres Marias con capacidad para 16 personas, piscina, jacuzzi y amplias zonas de entretenimiento.",
    longDescription: `Disfruta de la máxima comodidad y entretenimiento en la Finca Tres Marias, un espacio diseñado para grupos grandes y familias que buscan un escape perfecto en Guatapé.

✨ **Detalles de la Propiedad:**
• Capacidad máxima: 16 personas
• 7 baños completos
• Sala, comedor y cocina totalmente integrados

🏊 **Entretenimiento y Relax:**
• Piscina y Jacuzzi
• Mesa de billar
• Juegos de niños
• Parqueadero privado amplio

💰 **Tarifas:**
• Valor por noche: $2.875.000 COP
• Tasa de aseo: $230.000 COP`,
    image: "/images/tres_marias_1.jpeg",
    additionalImages: [
      "/images/tres_marias_2.jpeg",
      "/images/tres_marias_3.jpeg",
      "/images/tres_marias_4.jpeg",
      "/images/tres_marias_5.jpeg",
      "/images/tres_marias_6.jpeg",
      "/images/tres_marias_7.jpeg",
      "/images/tres_marias_8.jpeg",
      "/images/tres_marias_9.jpeg",
      "/images/tres_marias_10.jpeg",
      "/images/tres_marias_11.jpeg"
    ],
    features: ["16 Personas", "7 Baños", "Piscina y Jacuzzi"],
    amenities: ["Cocina Integrada", "Juegos de Billar", "Piscina", "Jacuzzi", "Juegos de Niños", "Parqueadero"],
    maxGuests: 16,
    rating: 4.9
  },
  {
    id: "efoil-guatape",
    title: "Efoil Experiencia",
    category: "Water",
    categoryLabel: "Agua",
    icon: "surfing",
    price: 350000,
    priceUnit: "COP / hora",
    description: "Vuela sobre el agua en Guatapé con la tabla de surf eléctrica (Efoil). Pura adrenalina y libertad sin necesidad de olas.",
    longDescription: `¡Experimenta la sensación de volar sobre el embalse de Guatapé con el Efoil!

La tabla de surf eléctrica con hidroala (Efoil) es la última tendencia en deportes acuáticos. No necesitas olas ni viento, solo tu equilibrio y ganas de divertirte.

━━━ PLAN INDIVIDUAL (1 HORA) ━━━
• Duración — 1 hora de instrucción y práctica
• Equipamiento completo — Chaleco, casco y radio comunicación
• Instructor personalizado — Para guiarte en todo momento
• Fotos y videos opcionales con GoPro

Nuestras tarifas:
• Valor por sesión — $350.000 COP

Importante: Apto para mayores de 12 años. Se requiere saber nadar. Peso máximo de 100 kg.`,
    image: "/images/efoil_video.mp4",
    additionalImages: [
      "/images/efoil_1.jpeg",
      "/images/efoil_2.jpeg"
    ],
    features: ["1 Hora de Sesión", "Instructor Guía", "Equipo Completo"],
    amenities: ["Chaleco Salvavidas", "Casco de Seguridad", "Instrucciones de Vuelo", "Video GoPro Opcional"],
    duration: "1 hora",
    rating: 5.0
  },
  {
    id: "finca-baruch",
    title: "Finca Baruch",
    category: "Stay",
    categoryLabel: "Finca",
    icon: "villa",
    price: 2875000,
    priceUnit: "COP / noche",
    description: "Hermosa finca en la vereda Los Naranjos, a solo 5 min de Guatapé y la Piedra. Jacuzzi climatizado para 15, acceso al lago y vistas espectaculares.",
    longDescription: `Descubre la Finca Baruch, un paraíso escondido en la vereda Los Naranjos de Guatapé. A solo 5 minutos del pueblo y 5 minutos de la imponente Piedra del Peñol, su ubicación es simplemente inmejorable.

✨ **Detalles de la Propiedad:**
• Capacidad máxima: 15 personas
• 5 habitaciones
• 3 baños completos
• Cocina totalmente dotada
• Parqueadero para 5 vehículos
• WiFi y TV

🌿 **Áreas Exteriores y Naturaleza:**
• Jacuzzi climatizado con capacidad para 15 personas
• Acceso directo al lago con muelle privado
• Deck con vista panorámica a la represa
• Vista directa a la Piedra del Peñol
• Hermosos senderos ecológicos
• Amplias zonas verdes

🏡 **Entretenimiento:**
• Zona BBQ completamente equipada
• Malla catamarán para relajarse sobre la naturaleza
• Juegos para niños
• Lavandería disponible

💰 **Tarifas:**
• Valor por noche: $2.875.000 COP`,
    image: "/images/baruch_1.jpeg",
    additionalImages: [
      "/images/baruch_2.jpeg",
      "/images/baruch_3.jpeg",
      "/images/baruch_4.jpeg",
      "/images/baruch_5.jpeg",
      "/images/baruch_6.jpeg",
      "/images/baruch_7.jpeg",
      "/images/baruch_8.jpeg",
      "/images/baruch_9.jpeg",
      "/images/baruch_10.jpeg",
      "/images/baruch_11.jpeg",
      "/images/baruch_12.jpeg",
      "/images/baruch_13.jpeg",
      "/images/baruch_14.jpeg",
      "/images/baruch_15.jpeg",
      "/images/baruch_16.jpeg",
      "/images/baruch_17.jpeg",
      "/images/baruch_18.jpeg",
      "/images/baruch_19.jpeg",
      "/images/baruch_20.jpeg",
      "/images/baruch_21.jpeg",
      "/images/baruch_22.jpeg",
      "/images/baruch_23.jpeg",
      "/images/baruch_24.jpeg",
      "/images/baruch_25.jpeg",
      "/images/baruch_26.jpeg",
      "/images/baruch_27.jpeg",
      "/images/baruch_28.jpeg",
      "/images/baruch_29.jpeg"
    ],
    features: ["15 Personas", "5 Habitaciones", "Jacuzzi Climatizado"],
    amenities: ["Jacuzzi para 15", "Acceso al Lago y Muelle", "Zona BBQ", "Malla Catamarán", "Deck Panorámico", "Cocina Dotada", "WiFi", "TV", "Parqueadero", "Juegos para Niños", "Senderos Ecológicos", "Lavandería"],
    maxGuests: 15,
    rating: 4.8
  },
  {
    id: "glamping-san-bernardo",
    title: "Glamping San Bernardo",
    category: "Stay",
    categoryLabel: "Glamping",
    icon: "villa",
    price: 650000,
    priceUnit: "noche",
    description: "Un escape de lujo en la naturaleza. Domo geodésico premium con jacuzzi privado climatizado y vista al embalse.",
    longDescription: `Descubre Glamping San Bernardo, un refugio exclusivo diseñado para desconectarte del mundo y conectarte con el lujo y la naturaleza en Guatapé.

Ubicado estratégicamente frente al embalse, nuestro domo geodésico combina el confort de una suite de cinco estrellas con la magia de acampar bajo las estrellas.

✨ **Detalles de la Estadía:**
• Capacidad máxima: 2 personas (ideal para parejas)
• Jacuzzi climatizado privado en el deck exterior
• Malla catamarán suspendida con vistas increíbles
• Zona de fogata privada

💰 **Tarifas:**
• Valor por noche — $650.000 COP
• Desayuno tipo gourmet incluido
• Check-in: 3:00 pm | Check-out: 11:00 am`,
    image: "/images/glamping_san_bernardo_video.mp4",
    additionalImages: [
      "/images/glamping_san_bernardo_1.jpeg",
      "/images/glamping_san_bernardo_2.jpeg"
    ],
    features: ["2 Personas", "Jacuzzi Privado", "Desayuno Gourmet"],
    amenities: ["Cama King-Size", "Jacuzzi Climatizado", "Malla Catamarán", "Fogata Privada", "Wi-Fi Rápido", "Baño Privado con Ducha Caliente"],
    maxGuests: 2,
    rating: 4.9
  }
];
