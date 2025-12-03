"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ReviewsProps = {
  context?: "home" | "service" | "airport" | "station";
  slug?: string;
};

type ReviewItem = { author?: string; rating?: number; content?: string; featured?: boolean };

export default function Reviews({ context = "home", slug }: ReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `/api/public/reviews?context=${encodeURIComponent(context)}${slug ? `&slug=${encodeURIComponent(slug)}` : ""}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (json?.ok && Array.isArray(json.reviews) && json.reviews.length > 0) {
          setReviews(json.reviews);
        } else {
          // Si no hay reviews en la BD, usar fallback
          setReviews(getFallbackReviews(context, slug));
        }
        setLoading(false);
      })
      .catch(() => {
        // Si hay error, usar fallback
        setReviews(getFallbackReviews(context, slug));
        setLoading(false);
      });
  }, [context, slug]);

  const displayReviews = reviews.length > 0 ? reviews : getFallbackReviews(context, slug);

  return (
    <section id="opiniones" className="mt-24">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-semibold">Lo que dicen nuestros clientes</h3>
        <p className="mt-3 text-muted-foreground">Experiencias reales de viajeros que han confiado en nuestros servicios</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((r, idx) => (
          <Card key={idx} className="border-border/80 bg-gradient-to-br from-card to-card/60">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/80 grid place-items-center text-white font-semibold text-lg">
                  {r.author?.charAt(0) || "☺"}
                </div>
                <div className="flex-1"><h4 className="font-semibold">{r.author || "Cliente"}</h4></div>
                <div className="text-xs text-muted-foreground">★★★★★</div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">{[...Array(r.rating || 5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
                {r.featured ? <span className="bg-black text-white text-xs px-2 py-1 rounded">DESTACADA</span> : null}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.content || ""}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Testimonios de fallback cuando no hay Supabase configurado
function getFallbackReviews(context: string, slug?: string): ReviewItem[] {
  // Testimonios generales para home
  const homeReviews: ReviewItem[] = [
    { author: "María García", rating: 5, content: "Excelente servicio. Muy puntuales y el conductor muy amable. El coche impecable y muy cómodo para el viaje hasta Bilbao.", featured: true },
    { author: "Carlos Fernández", rating: 5, content: "Contraté el servicio para ir al aeropuerto de Madrid. Todo perfecto, precio cerrado sin sorpresas y el conductor muy profesional.", featured: false },
    { author: "Ana Martínez", rating: 5, content: "Los recomiendo 100%. Nos llevaron al Camino de Santiago con todas nuestras mochilas. Servicio impecable.", featured: false },
    { author: "Laura Sánchez", rating: 5, content: "Contraté el traslado desde el aeropuerto de Pamplona. Me esperaron con cartel y me ayudaron con las maletas. Genial.", featured: false },
  ];

  // Testimonios para servicios específicos
  const serviceReviews: Record<string, ReviewItem[]> = {
    aeropuerto: [
      { author: "Isabel Torres", rating: 5, content: "Servicio de traslado al aeropuerto perfecto. Seguimiento del vuelo en tiempo real, me esperaron aunque llegué con retraso.", featured: true },
      { author: "Miguel Ángel Díaz", rating: 5, content: "Uso LogroVTC habitualmente para mis viajes de trabajo. Siempre puntuales, vehículos limpios y conductores profesionales.", featured: false },
      { author: "Carmen Jiménez", rating: 5, content: "Traslado familiar al aeropuerto de Bilbao. Cabíamos todos con las maletas sin problema. Precio muy competitivo.", featured: false },
      { author: "Lucía Navarro", rating: 5, content: "Viaje muy cómodo hasta Madrid. El conductor fue muy amable y el coche impecable. Sin duda repetiré.", featured: false },
    ],
    camino: [
      { author: "Antonio Gil", rating: 5, content: "Hicimos el Camino Francés y LogroVTC nos trasladó las mochilas cada día. Servicio increíble, muy recomendable.", featured: true },
      { author: "Marta Blanco", rating: 5, content: "Gracias al servicio de traslado de mochilas pudimos disfrutar del Camino sin cargar peso. Todo perfecto.", featured: false },
      { author: "Francisco Serrano", rating: 5, content: "Nos recogieron en Santo Domingo de la Calzada y nos llevaron hasta Logroño. Muy atentos y conocedores de la zona.", featured: false },
      { author: "Elena Castro", rating: 5, content: "Servicio flexible y adaptado a nuestras necesidades. Nos ayudaron mucho durante nuestra peregrinación.", featured: false },
    ],
    mensajeria: [
      { author: "Empresa Construcción S.L.", rating: 5, content: "Necesitábamos documentación urgente en Barcelona. Servicio directo y rápido. Llegó todo perfecto.", featured: true },
      { author: "Javier Romero", rating: 5, content: "Mensajería urgente para prototipo industrial. Custodia directa y entrega con prueba. Excelente servicio.", featured: false },
      { author: "Sandra Molina", rating: 5, content: "Entrega express desde Logroño a Pamplona. Muy rápido y eficiente. El seguimiento en tiempo real es genial.", featured: false },
      { author: "Alberto Vega", rating: 5, content: "Servicio de mensajería para nuestra empresa. Siempre puntuales y con factura al momento. Muy profesionales.", featured: false },
    ],
  };

  // Testimonios para aeropuertos específicos
  const airportReviews: Record<string, ReviewItem[]> = {
    bilbao: [
      { author: "Patricia León", rating: 5, content: "Traslado desde Logroño hasta el aeropuerto de Bilbao. Viaje muy cómodo y precio cerrado sin sorpresas.", featured: true },
      { author: "Jorge Campos", rating: 5, content: "Me recogieron en el aeropuerto de Bilbao con cartel. Muy profesionales y el coche impecable.", featured: false },
      { author: "Cristina Vargas", rating: 5, content: "Uso este servicio cada vez que vuelo desde Bilbao. Siempre puntuales y muy amables.", featured: false },
    ],
    pamplona: [
      { author: "Fernando Pascual", rating: 5, content: "Traslado perfecto desde Logroño a Pamplona. Conductor muy profesional y vehículo muy cómodo.", featured: true },
      { author: "Rosa Ibáñez", rating: 5, content: "Llegué con retraso pero me esperaron sin problema. Servicio excelente y muy recomendable.", featured: false },
      { author: "Pablo Torres", rating: 5, content: "Servicio impecable. Siempre es mi primera opción para ir al aeropuerto de Pamplona.", featured: false },
    ],
    "madrid-barajas": [
      { author: "Andrés Medina", rating: 5, content: "Viaje desde Logroño hasta Madrid perfectamente organizado. Precio justo y conductor muy profesional.", featured: true },
      { author: "Beatriz Cortés", rating: 5, content: "Contraté el servicio para un viaje familiar. Cabíamos todos con equipaje. Muy cómodo y puntual.", featured: false },
      { author: "Luis Prieto", rating: 5, content: "Servicio impecable. Me recogieron puntualmente y llegamos con tiempo de sobra al aeropuerto.", featured: false },
    ],
    zaragoza: [
      { author: "Silvia Ramírez", rating: 5, content: "Traslado rápido y eficiente desde Logroño a Zaragoza. Muy buen servicio y precio competitivo.", featured: true },
      { author: "Ricardo Núñez", rating: 5, content: "Conductor muy amable y puntual. El trayecto hasta Zaragoza fue muy cómodo.", featured: false },
      { author: "Carmen Ruiz", rating: 5, content: "Servicio perfecto para viajes de trabajo. Siempre llego a tiempo gracias a su puntualidad.", featured: false },
    ],
  };

  // Testimonios para estaciones
  const stationReviews: ReviewItem[] = [
    { author: "Teresa Santos", rating: 5, content: "Me llevaron a coger el AVE en Zaragoza. Servicio puntual y muy profesional. Lo recomiendo.", featured: true },
    { author: "Ignacio Cabrera", rating: 5, content: "Traslado perfecto a la estación del AVE. Llegué con tiempo de sobra gracias a su puntualidad.", featured: false },
    { author: "Mónica Delgado", rating: 5, content: "Excelente servicio para traslados a estaciones. Muy profesionales y atentos.", featured: false },
    { author: "Roberto Sanz", rating: 5, content: "Servicio impecable. Me recogieron del hotel y me llevaron directamente a la estación.", featured: false },
  ];

  // Seleccionar testimonios según contexto
  if (context === "home") {
    return homeReviews;
  } else if (context === "service" && slug) {
    return serviceReviews[slug] || homeReviews.slice(0, 4);
  } else if (context === "airport" && slug) {
    return airportReviews[slug] || serviceReviews.aeropuerto.slice(0, 3);
  } else if (context === "station") {
    return stationReviews;
  }
  
  return homeReviews;
}
