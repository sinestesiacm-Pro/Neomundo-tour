export interface Experience {
  id: string;
  title: string;
  category: 'Stay' | 'Air Adventure' | 'Water' | 'Adrenaline' | 'Nature';
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
    price: 500,
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
    price: 150,
    priceUnit: "person",
    description: "Experience breathtaking aerial views of El Peñol and the labyrinthine reservoir from a state-of-the-art helicopter.",
    longDescription: "Take to the skies and witness the majesty of Guatapé like never before. Our premium helicopter tours provide an unforgettable bird's-eye perspective of the colossal Piedra del Peñol, the sprawling turquoise reservoir, and the colorful rooftops of the town. With experienced pilots and state-of-the-art aircraft, this is the ultimate luxury adventure to add to your Colombian journey.",
    image: "/images/el_penol_real.png",
    additionalImages: [
      "/images/parapente_real.png",
      "/images/lancha_pontones_real.png"
    ],
    features: ["15 Min Flight", "Bilingual Pilot", "Panoramas"],
    amenities: ["Safety Gear", "Noise-Cancelling Headphones", "HD Photography Service", "VIP Lounge Access"],
    duration: "15 minutes",
    rating: 5.0
  },
  {
    id: "lancha-pontones",
    title: "Lanchas y Pontones",
    category: "Water",
    categoryLabel: "Water",
    icon: "sailing",
    price: 80,
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
    price: 45,
    priceUnit: "hour",
    description: "Navigate thrilling jungle trails and discover hidden viewpoints on our powerful all-terrain vehicles.",
    longDescription: "Get ready to get muddy and experience the raw beauty of the landscapes surrounding Guatapé. Our Jungle Motors ATV tours take you off the beaten path, through deep forests, rugged dirt tracks, and down to secret lakeside view points. Lead by professional local guides, this adventure is perfect for adrenaline-seekers who want to connect with Colombia's lush countryside.",
    image: "/images/jungle_motors_real.png",
    additionalImages: [
      "/images/el_penol_real.png",
      "/images/caballo_real.png"
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
    price: 65,
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
    price: 30,
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
  }
];
