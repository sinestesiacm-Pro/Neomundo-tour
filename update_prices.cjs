const fs = require('fs');

let content = fs.readFileSync('src/data/experiences.ts', 'utf8');

// Finca Esmeralda
content = content.replace('price: 500,', 'price: 575,');

// Helicoptero
content = content.replace('price: 90,\n    priceUnit: "person (from)",', 'price: 104,\n    priceUnit: "person (from)",');
content = content.replace('$330.000 / $90 USD', '$379.500 / $104 USD');
content = content.replace('$1.650.000 / $450 USD', '$1.897.500 / $518 USD');
content = content.replace('$410.000 / $110 USD', '$471.500 / $127 USD');
content = content.replace('$2.050.000 / $550 USD', '$2.357.500 / $633 USD');
content = content.replace('$660.000 / $180 USD', '$759.000 / $207 USD');
content = content.replace('$3.300.000 / $900 USD', '$3.795.000 / $1035 USD');
content = content.replace('$825.000 / $223 USD', '$948.750 / $257 USD');
content = content.replace('$4.125.000 / $1.115 USD', '$4.743.750 / $1283 USD');

// Lancha
content = content.replace('price: 80,\n    priceUnit: "hour",', 'price: 92,\n    priceUnit: "hour",');

// Jungle Motors
content = content.replace('price: 45,\n    priceUnit: "hour",', 'price: 52,\n    priceUnit: "hour",');
content = content.replace('image: "/images/jungle_motors_real.png",\n    additionalImages: [\n      "/images/el_penol_real.png",\n      "/images/caballo_real.png"\n    ],', 'image: "/images/atv_1.jpeg",\n    additionalImages: [\n      "/images/atv_2.jpeg",\n      "/images/atv_3.jpeg"\n    ],');

// Parapente
content = content.replace('price: 65,\n    priceUnit: "flight",', 'price: 75,\n    priceUnit: "flight",');

// Paseo caballo
content = content.replace('price: 30,\n    priceUnit: "hour",', 'price: 35,\n    priceUnit: "hour",');

// Jetcar
content = content.replace('price: 650000,\n    priceUnit: "COP (starts at)",', 'price: 747500,\n    priceUnit: "COP (starts at)",');
content = content.replace('- 30 minutos: $650.000 COP', '- 30 minutos: $747.500 COP');
content = content.replace('- 1 hora: $1.200.000 COP', '- 1 hora: $1.380.000 COP');
content = content.replace('- 30 minutos: $850.000 COP', '- 30 minutos: $977.500 COP');
content = content.replace('- 1 hora: $1.600.000 COP', '- 1 hora: $1.840.000 COP');
content = content.replace('image: "/images/lancha_pontones_real.png",\n    additionalImages: [],', 'image: "/images/jetcar_video.mp4",\n    additionalImages: [\n      "/images/jetcar_1.jpeg",\n      "/images/jetcar_2.jpeg",\n      "/images/jetcar_3.jpeg",\n      "/images/jetcar_4.jpeg"\n    ],');

// Yate Majestic
content = content.replace('price: 170000,\n    priceUnit: "COP / person",', 'price: 195500,\n    priceUnit: "COP / person",');
content = content.replace('Valor por persona: $170.000 COP', 'Valor por persona: $195.500 COP');

// Transport
const transportData = `  },
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
    longDescription: "Viaja con comodidad, seguridad y estilo. Ofrecemos traslados privados desde el Aeropuerto Internacional José María Córdova (MDE) o el Aeropuerto Olaya Herrera directamente a tu hotel o villa en Guatapé.\\n\\nNuestra flota cuenta con vehículos modernos, aire acondicionado y conductores profesionales que conocen la zona a la perfección.\\n\\n* Opciones de vehículos para parejas o grupos grandes.\\n* Servicio disponible 24/7 con reserva previa.\\n* Precios sujetos a tamaño del grupo y vehículo.\\n\\nContáctanos para cotizar tu transporte y asegurar un inicio de viaje perfecto.",
    image: "/images/villa_lujo_real.png", // placeholder
    additionalImages: [],
    features: ["Private Transfer", "AC Vehicles", "Pro Drivers"],
    amenities: ["Water Bottles", "Wi-Fi in some vehicles", "Luggage Assistance"],
    duration: "approx 2 hours",
    rating: 5.0
  }
];`;

content = content.replace("  }\n];", transportData);
content = content.replace("'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature';", "'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature' | 'Transport';");

fs.writeFileSync('src/data/experiences.ts', content);
