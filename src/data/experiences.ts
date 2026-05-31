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
    title: "Villa Esmeralda Retreat",
    category: "Stay",
    categoryLabel: "Stay",
    icon: "villa",
    price: 575,
    priceUnit: "night",
    description: "Exclusive luxury villa with panoramic views of the Guatapé reservoir, private pool, and premium amenities.",
    longDescription: "Experience the ultimate tropical modernism at Villa Esmeralda. Nestled on the shores of the breathtaking Peñol-Guatapé reservoir, this architectural masterpiece offers seamless indoor-outdoor living. With floor-to-ceiling glass, an expansive infinity pool, and private dock access, every moment here is designed to connect you with the vibrant energy of Colombia's most beautiful landscape. Perfect for families or groups seeking a premium, sun-drenched escape.",
    image: "/images/villa_lujo_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/lancha_pontones_real.png",
      "/images/jungle_motors_real.png"
    ],
    features: ["12 Guests", "5 Bedrooms", "6 Baths"],
    amenities: ["Infinity Pool", "Fast Wi-Fi", "BBQ Area", "Private Dock", "Jacuzzi", "Home Cinema"],
    maxGuests: 12,
    rating: 4.9
  },
  {
    id: "helicoptero-penol",
    title: "Helicopter Tours",
    category: "Air Adventure",
    categoryLabel: "Air Adventure",
    icon: "flight",
    price: 104,
    priceUnit: "person (from)",
    description: "Experience breathtaking aerial views of El Peñol and the labyrinthine reservoir from a state-of-the-art helicopter.",
    longDescription: `¡VUELA CON NOSOTROS Y VIVE LA EXPERIENCIA DE CONOCER EL PEÑOL & GUATAPÉ DESDE EL AIRE!🚁

⏰ Tiempo 6 min
💰PRECIO OFICIAL
👨‍👩‍👧‍👦 Vuelo por pasajero: $379.500 / $104 USD
👥 Vuelo Privado: $1.897.500 / $518 USD
RECORRIDO🚁: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 180° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, Cruz del Embalse y la Réplica del Viejo Peñol.

⏰ Tiempo 8 min
💰PRECIO OFICIAL
👨‍👩‍👧‍👦 Vuelo por pasajero: $471.500 / $127 USD
👥 Vuelo Privado: $2.357.500 / $633 USD
RECORRIDO🚁: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 180° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar con giro de 360° sobre ella y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Cruz del Embalse y la Réplica del Viejo Peñol.

⏰ Tiempo 12 min
💰PRECIO OFICIAL
👨‍👩‍👧‍👦 Vuelo por pasajero: $759.000 / $207 USD
👥 Vuelo Privado: $3.795.000 / $1035 USD
RECORRIDO 🚁: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 360° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Municipio de Guatapé y su malecón, Cruz del Embalse y la Réplica del Viejo Peñol.

⏰ Tiempo 15 min
💰PRECIO OFICIAL
👨‍👩‍👧‍👦 Vuelo por pasajero: $948.750 / $257 USD
👥 Vuelo Privado: $4.743.750 / $1283 USD
RECORRIDO 🚁: Despegue directo desde nuestra base sobre el embalse hacia la Piedra de El Peñol con giro de 360° sobre la misma, sobrevuelo el embalse Peñol-Guatapé, fincas icónicas como La Manuela la extinta de Pablo Escobar y la del jugador de la selección Colombia James Rodríguez, condominio Vivanti, condominio Luxé, Isla de la Fantasía, Municipio de Guatapé y su malecón, Vertedero de la hidroeléctrica, Cruz del Embalse y la Réplica del Viejo Peñol.

⏰ Tiempo 1 hora
💰Contáctanos para detalles y precios

MEDELLÍN - PEÑOL - MEDELLÍN
Vuela desde los hangares del Aeropuerto Olaya Herrera en Medellín, directamente hasta la Isla de la Fantasía o base Montecielo Fly en El Peñol. Allí te transportamos hacia el bote en el malecón de Guatapé y te esperamos una hora. Luego regresamos al muelle y transportados al helicóptero de nuevo, para finalmente volver al Aeropuerto Olaya Herrera en Medellín.

¡CONTÁCTANOS PARA PERSONALIZAR TUS VUELOS, TUS RUTAS, TUS DESEOS!🚁🏞️`,
    image: "/images/el_penol_real.png",
    additionalImages: [
      "/images/parapente_real.png",
      "/images/lancha_pontones_real.png"
    ],
    features: ["6 to 15 Min Flights", "Bilingual Pilot", "Panoramas"],
    amenities: ["Safety Gear", "Noise-Cancelling Headphones", "HD Photography Service", "VIP Lounge Access"],
    duration: "Various options",
    rating: 5.0
  },
  {
    id: "lancha-pontones",
    title: "Lanchas y Pontones",
    category: "Water",
    categoryLabel: "Water",
    icon: "sailing",
    price: 92,
    priceUnit: "hour",
    description: "Relax and party on the water with our premium pontoon rentals. Perfect for groups looking to explore the islands.",
    longDescription: "Cruise the crystalline waters of the Guatapé reservoir in style. Our top-of-the-line pontoon boats and speedboats come equipped with experienced captains, high-quality sound systems, comfortable lounging areas, and coolers for your refreshments. Stop by beautiful islands, swim in refreshing waters, or visit local lakeside attractions during your custom itinerary.",
    image: "/images/lancha_pontones_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Up to 15 Pax", "Private Captain", "Bluetooth Audio"],
    amenities: ["Life Jackets", "BBQ Grill on Board", "Ice & Coolers", "Water Toys & Mats"],
    duration: "Flexible (Min 2 hours)",
    rating: 4.8
  },
  {
    id: "jungle-motors",
    title: "Jungle Motors (ATV)",
    category: "Adrenaline",
    categoryLabel: "Adrenaline",
    icon: "two_wheeler",
    price: 52,
    priceUnit: "hour",
    description: "Navigate thrilling jungle trails and discover hidden viewpoints on our powerful all-terrain vehicles.",
    longDescription: "Get ready to get muddy and experience the raw beauty of the landscapes surrounding Guatapé. Our Jungle Motors ATV tours take you off the beaten path, through deep forests, rugged dirt tracks, and down to secret lakeside view points. Lead by professional local guides, this adventure is perfect for adrenaline-seekers who want to connect with Colombia's lush countryside.",
    image: "/images/atv_1.jpeg",
    additionalImages: [
      "/images/atv_2.jpeg",
      "/images/atv_3.jpeg"
    ],
    features: ["4x4 Quad Bikes", "Expert Guide", "Safety Briefing"],
    amenities: ["Safety Helmets & Goggles", "Locker Room", "Bottled Water", "Rain Gear (if needed)"],
    duration: "2 - 4 hours",
    rating: 4.7
  },
  {
    id: "parapente",
    title: "Parapente",
    category: "Air Adventure",
    categoryLabel: "Air Adventure",
    icon: "air",
    price: 75,
    priceUnit: "flight",
    description: "Soar peacefully over the reservoir. A tandem flight offering the most serene and majestic perspective of Guatapé.",
    longDescription: "Float high above the reservoir in complete serenity. Our tandem paragliding flights launch from the scenic heights overlooking the region, letting you glide silently on thermal currents. Fly alongside a certified professional pilot and enjoy unparalleled, breathtaking, panoramic views of the entire water labyrinth and the dramatic rock of El Peñol below.",
    image: "/images/parapente_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Tandem Flight", "Certified Instructor", "GoPro Video"],
    amenities: ["All Flying Equipment", "Flight Insurance", "Digital Video & Photos", "Transport to Launch Site"],
    duration: "20 minutes flight",
    rating: 4.9
  },
  {
    id: "paseo-caballo",
    title: "Paseo a Caballo",
    category: "Nature",
    categoryLabel: "Nature",
    icon: "directions_walk",
    price: 35,
    priceUnit: "hour",
    description: "Enjoy a tranquil horseback ride along scenic ecological trails bordering the beautiful reservoir.",
    longDescription: "Slow down and reconnect with nature on a peaceful horseback excursion. Trot along gentle ecological trails, through tropical forests, and right alongside the edge of the reservoir. Our horses are calm, exceptionally well-groomed, and suited for riders of all skill levels, making this a relaxing, authentic, and memorable family activity in Guatapé.",
    image: "/images/caballo_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/villa_lujo_real.png"
    ],
    features: ["Gentle Horses", "Local Cowboy Guide", "Eco-trails"],
    amenities: ["Riding Helmets", "Basic Training Session", "Snacks & Refreshments", "Saddle Bags for Personal Items"],
    duration: "1 - 3 hours",
    rating: 4.6
  },
  {
    id: "jetcar-guatape",
    title: "AQUA DRIVE COLOMBIA - Jetcar",
    category: "Water",
    categoryLabel: "Water",
    icon: "directions_boat",
    price: 747500,
    priceUnit: "COP (starts at)",
    description: "Vive la experiencia de lujo con Jetcar. Conducir un Jetcar es vivir al máximo. Súbete y disfruta una experiencia inolvidable.",
    longDescription: `🚤 ¡Gracias por comunicarte con AQUA DRIVE COLOMBIA – GUATAPÉ!
✨ Vive la experiencia de lujo con Jetcar ✨

Estos son nuestros servicios:

🔹 Jetcar 2 puestos
- 30 minutos: $747.500 COP
- 1 hora: $1.380.000 COP

🔹 Jetcar 4 puestos
- 30 minutos: $977.500 COP
- 1 hora: $1.840.000 COP

🌎 Viajar es vivir… y conducir un Jetcar es vivir al máximo. Súbete y disfruta una experiencia inolvidable. ¡Reserva ahora!`,
    image: "/images/jetcar_video.mp4",
    additionalImages: [
      "/images/jetcar_1.jpeg",
      "/images/jetcar_2.jpeg",
      "/images/jetcar_3.jpeg",
      "/images/jetcar_4.jpeg"
    ],
    features: ["2 or 4 Seats", "Self-drive", "Premium Experience"],
    amenities: ["Seguro básico incluido", "Asistencia 24/7", "Una experiencia única en Guatapé"],
    duration: "30 min - 1 hour",
    rating: 4.8
  },
  {
    id: "yate-majestic",
    title: "Yate Majestic (De Lujo)",
    category: "Water",
    categoryLabel: "Water",
    icon: "directions_boat",
    price: 195500,
    priceUnit: "COP / person",
    description: "El Yate Majestic es el único de agua dulce en Colombia y te permitirá conocer y admirar los hermosos paisajes reflejados en el agua.",
    longDescription: `¡Hola! Te saludo desde el Hotel Los Recuerdos. 🌞
Aquí tienes la info sobre nuestro Yate Majestic (Yate de lujo) 🚤:

El Yate Majestic es el único de agua dulce en Colombia y te permitirá conocer y admirar los hermosos paisajes reflejados en el agua. Este yate cuenta con restaurante 🍽️, bar 🍹, solárium ☀️ y 4 jacuzzis 🛁.

*Incluye:*
- Recorrido de 2 horas ⏳
- Almuerzo o cena 🍽️
- 2 bebidas alcohólicas o refrescantes por persona 🍸🥤

*Horarios de zarpe:*
- Miércoles: 1:45 pm 🕑
- Sábado: 1:45 pm y 5:45 pm 🕑🕠
- Domingo: 1:45 pm 🕑
- Domingo festivo: 1:45 pm y 5:45 pm 🕑🕠
- Lunes festivo: 1:45 pm 🕑

*Precio:*
- Valor por persona: $195.500 COP (pago directo menos 48 horas antes) ⏳

🚫 Prohibido Mascotas.
🚫 No está permitido el ingreso de alimentos y bebidas ajenas al establecimiento.`,
    image: "/images/villa_lujo_real.png",
    additionalImages: [],
    features: ["2 Hours", "Meals Included", "Drinks Included"],
    amenities: ["Restaurante 🍽️", "Bar 🍹", "Solárium ☀️", "4 Jacuzzis 🛁"],
    duration: "2 hours",
    rating: 4.9
  },
  {
    id: "transporte-aeropuerto",
    title: "Transporte Aeropuerto - Guatapé",
    category: "Stay", // Added Stay or create a Transport category if needed. Wait, type is 'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature'
    // I will just use 'Stay' for now or add 'Transport' to the interface and use it. I will add it to the interface.
    categoryLabel: "Transport",
    icon: "directions_car",
    price: 50,
    priceUnit: "USD",
    description: "Servicio exclusivo y seguro de traslados desde Medellín (José María Córdova u Olaya Herrera) hacia Guatapé y viceversa.",
    longDescription: "Viaja con comodidad, seguridad y estilo. Ofrecemos traslados privados desde el Aeropuerto Internacional José María Córdova (MDE) o el Aeropuerto Olaya Herrera directamente a tu hotel o villa en Guatapé.\n\nNuestra flota cuenta con vehículos modernos, aire acondicionado y conductores profesionales que conocen la zona a la perfección.\n\n* Opciones de vehículos para parejas o grupos grandes.\n* Servicio disponible 24/7 con reserva previa.\n* Precios sujetos a tamaño del grupo y vehículo.\n\nContáctanos para cotizar tu transporte y asegurar un inicio de viaje perfecto.",
    image: "/images/villa_lujo_real.png", // placeholder
    additionalImages: [],
    features: ["Private Transfer", "AC Vehicles", "Pro Drivers"],
    amenities: ["Water Bottles", "Wi-Fi in some vehicles", "Luggage Assistance"],
    duration: "approx 2 hours",
    rating: 5.0
  }
];
