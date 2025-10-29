export type ServiceSlug = "aeropuerto" | "camino" | "mensajeria";

export type Service = {
  slug: ServiceSlug;
  name: string;
  title: string;
  description: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  keywords: string[];
};

export type Airport = {
  slug: string;
  name: string;
  city: string;
  code?: string;
  intro: string;
  description: string;
  keywords: string[];
};

export type Station = {
  slug: string;
  name: string;
  city: string;
  type: "tren" | "bus";
  intro: string;
  description: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "aeropuerto",
    name: "Transporte a aeropuertos",
    title: "Traslados a aeropuertos sin esperas",
    description:
      "Servicio de traslado a y desde aeropuertos en La Rioja y norte de España. Puntualidad y pago con tarjeta.",
    intro:
      "Te llevamos y recogemos en los aeropuertos más importantes de España y sur de Francia, con seguimiento del vuelo y recogida en terminal.",
    benefits: [
      { title: "Seguimiento de vuelo", desc: "Monitorizamos tu vuelo en tiempo real para ajustar la recogida sin esperas." },
      { title: "Recogida en terminal", desc: "Te esperamos en llegadas con cartela y asistencia con el equipaje." },
      { title: "Confort hasta 7 plazas", desc: "Turismos y furgonetas amplias con climatizador y espacio para maletas." },
      { title: "Pago y factura", desc: "Aceptamos tarjeta y emitimos factura para empresa al instante." },
    ],
    keywords: [
      "traslado aeropuerto La Rioja",
      "vtc aeropuerto Logroño",
      "taxi aeropuerto Rioja Alavesa",
    ],
  },
  {
    slug: "camino",
    name: "Camino de Santiago",
    title: "Apoyo y traslados en el Camino de Santiago",
    description:
      "Traslados entre etapas, transfer de mochilas y apoyo logístico en el Camino de Santiago por La Rioja.",
    intro:
      "Facilitamos tus etapas con traslados, transfer de mochilas y acercamientos a puntos de inicio/fin.",
    benefits: [
      { title: "Transfer de mochilas", desc: "Recogemos y entregamos tus mochilas en alojamientos entre etapas." },
      { title: "Recogidas flexibles", desc: "Nos adaptamos a tu ritmo y a cambios de última hora en la ruta." },
      { title: "Bicis y equipaje", desc: "Remolque para hasta 7 bicicletas y equipaje voluminoso bajo petición." },
      { title: "Asesoramiento local", desc: "Consejos de etapas, alojamientos y alternativas según el clima." },
    ],
    keywords: ["camino de santiago traslados", "mochilas camino logrono", "vtc peregrinos"],
  },
  {
    slug: "mensajeria",
    name: "Mensajería urgente",
    title: "Mensajería urgente puerta a puerta",
    description:
      "Entregas directas sin paradas intermedias en España y Europa. Custodia de documentación y prototipos.",
    intro:
      "Servicio express con ruta directa y prueba de entrega. Seguimiento y contacto directo con el conductor.",
    benefits: [
      { title: "Ruta directa", desc: "Servicio dedicado sin consolidación ni paradas intermedias." },
      { title: "Prueba de entrega", desc: "Confirmación POD con firma y, si hace falta, fotografía de entrega." },
      { title: "Tiempos garantizados", desc: "Planificamos la ruta óptima y te informamos del ETA en todo momento." },
      { title: "Cobertura amplia", desc: "España y Europa con disponibilidad inmediata según origen." },
    ],
    keywords: ["mensajeria urgente la rioja", "envios directos vtc", "courier logrono"],
  },
];

export const airports: Airport[] = [
  {
    slug: "logrono-agoncillo",
    name: "Aeropuerto de Logroño-Agoncillo",
    city: "Logroño",
    code: "RJL",
    intro: "Traslados al aeropuerto de Logroño-Agoncillo con recogida en terminal.",
    description:
      "Servicio de traslado al Aeropuerto de Logroño-Agoncillo (RJL) y recogida a domicilio, hotel o empresa.",
    keywords: ["aeropuerto logroño", "traslado RJL", "vtc aeropuerto logrono"],
  },
  {
    slug: "laguardia",
    name: "Laguardia",
    city: "Laguardia",
    intro: "Traslados a Laguardia desde cualquier punto de La Rioja y Rioja Alavesa.",
    description:
      "Servicio de traslado a Laguardia con recogida y entrega puerta a puerta. Conexiones con bodegas, hoteles y puntos turísticos.",
    keywords: ["traslado laguardia", "vtc laguardia", "transporte laguardia"],
  },
  {
    slug: "elciego",
    name: "Elciego",
    city: "Elciego",
    intro: "Traslados a Elciego desde cualquier punto de La Rioja y Rioja Alavesa.",
    description:
      "Servicio de traslado a Elciego con recogida y entrega puerta a puerta. Ideal para visitas a bodegas y turismo enológico.",
    keywords: ["traslado elciego", "vtc elciego", "transporte elciego"],
  },
  {
    slug: "bilbao",
    name: "Aeropuerto de Bilbao",
    city: "Bilbao",
    code: "BIO",
    intro: "Traslados a Bilbao (BIO) desde La Rioja y Rioja Alavesa.",
    description:
      "Conexión rápida a Aeropuerto de Bilbao con seguimiento de vuelo y recogida en llegadas.",
    keywords: ["aeropuerto bilbao", "traslado BIO", "vtc bilbao aeropuerto"],
  },
  {
    slug: "pamplona",
    name: "Aeropuerto de Pamplona",
    city: "Pamplona",
    code: "PNA",
    intro: "Traslados a Pamplona (PNA) para salidas y llegadas.",
    description: "Servicio puerta a puerta con recogida puntual.",
    keywords: ["aeropuerto pamplona", "traslado PNA"],
  },
  {
    slug: "madrid-barajas",
    name: "Aeropuerto Adolfo Suárez Madrid-Barajas",
    city: "Madrid",
    code: "MAD",
    intro: "Traslados a Madrid-Barajas (MAD) con tarifas cerradas.",
    description: "Recogida en terminal y transporte a cualquier punto de La Rioja.",
    keywords: ["aeropuerto madrid", "traslado MAD", "vtc barajas"],
  },
  {
    slug: "barcelona-el-prat",
    name: "Aeropuerto Josep Tarradellas Barcelona-El Prat",
    city: "Barcelona",
    code: "BCN",
    intro: "Traslados a El Prat (BCN) con vehículos confort.",
    description: "Servicio interprovincial a Barcelona-El Prat.",
    keywords: ["aeropuerto barcelona", "traslado BCN"],
  },
  {
    slug: "zaragoza",
    name: "Aeropuerto de Zaragoza",
    city: "Zaragoza",
    code: "ZAZ",
    intro: "Traslados a Zaragoza (ZAZ) y conexión con AVE.",
    description: "Servicio al aeropuerto y estaciones de Zaragoza.",
    keywords: ["aeropuerto zaragoza", "traslado ZAZ"],
  },
  {
    slug: "santander",
    name: "Aeropuerto de Santander",
    city: "Santander",
    code: "SDR",
    intro: "Traslados a Santander (SDR) desde La Rioja.",
    description: "Conexión rápida al aeropuerto de Santander.",
    keywords: ["aeropuerto santander", "traslado SDR"],
  },
  {
    slug: "vitoria",
    name: "Aeropuerto de Vitoria",
    city: "Vitoria-Gasteiz",
    code: "VIT",
    intro: "Traslados al aeropuerto de Vitoria (VIT).",
    description: "Servicio puerta a puerta La Rioja - Vitoria.",
    keywords: ["aeropuerto vitoria", "traslado VIT"],
  },
  {
    slug: "biarritz",
    name: "Aeropuerto de Biarritz Pays Basque",
    city: "Biarritz",
    code: "BIQ",
    intro: "Traslados a Biarritz (BIQ) y costa vasco-francesa.",
    description: "Servicios internacionales a Francia.",
    keywords: ["aeropuerto biarritz", "traslado BIQ"],
  },
];

export const stations: Station[] = [
  {
    slug: "zaragoza-delicias",
    name: "Estación Zaragoza-Delicias (AVE)",
    city: "Zaragoza",
    type: "tren",
    intro: "Traslados a la estación AVE Zaragoza-Delicias.",
    description: "Conexión AVE con La Rioja y Rioja Alavesa.",
    keywords: ["ave zaragoza", "estacion delicias", "traslado ave"],
  },
  {
    slug: "hendaya",
    name: "Estación de Hendaya",
    city: "Hendaya",
    type: "tren",
    intro: "Traslados a la estación de Hendaya (Francia).",
    description: "Conexiones internacionales por tren desde Hendaya.",
    keywords: ["estacion hendaya", "tren hendaye", "traslado frontera"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAirportBySlug(slug: string): Airport | undefined {
  return airports.find((a) => a.slug === slug);
}

export function getStationBySlug(slug: string): Station | undefined {
  return stations.find((s) => s.slug === slug);
}


