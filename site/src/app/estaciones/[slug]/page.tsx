// Archivo depurado: dejamos la versión única

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stations, getStationBySlug, type Station } from "@/lib/site-data";
import { listStations, getStationBySlugFromDb, getFaqs } from "@/lib/cms";
import HeroWithForm from "@/components/sections/HeroWithForm";
import ServicesNav from "@/components/sections/ServicesNav";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import CTASection from "@/components/sections/CTASection";
import FAQs from "@/components/sections/FAQs";
import OtherServices from "@/components/sections/OtherServices";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/visual/Reveal";

type PageParams = Promise<{ slug: string }>;
type PageProps = { params: PageParams };

export async function generateStaticParams() {
  try {
    const list = await listStations();
    if (list.length > 0) return list.map((it) => ({ slug: it.slug }));
  } catch {}
  return stations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const st = await getStationBySlugFromDb(slug);
    if (st) {
      const title = `${st.name} | Traslados VTC | LogroVTC`;
      const description = st.description;
      const url = `https://logrovtc.com/mail/estaciones/${slug}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "article", locale: "es_ES" },
        keywords: st.keywords || undefined,
      };
    }
  } catch {}
  const station = getStationBySlug(slug);
  if (!station) return {};
  const title = `${station.name} | Traslados VTC | LogroVTC`;
  const description = station.description;
  const url = `https://logrovtc.com/mail/estaciones/${station.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: station.keywords,
  };
}

export default async function StationPage({ params }: PageProps) {
  const { slug } = await params;
  let station: Station | undefined = getStationBySlug(slug);
  try {
    const st = await getStationBySlugFromDb(slug);
    if (st) {
      const inferredType: "tren" | "bus" = st.type === "tren" || st.type === "bus" ? st.type : "tren";
      station = {
        slug,
        name: st.name,
        city: st.city ?? "",
        type: inferredType,
        intro: st.intro,
        description: st.description,
        keywords: st.keywords ?? [],
      };
    }
  } catch {}
  if (!station) return notFound();

  // Preparar JSON-LD (Service, FAQPage y Breadcrumb)
  let faqItems: { q: string; a: string }[] = getStationFaqs();
  try {
    const list = await getFaqs("station", station.slug);
    const mapped = list.map((it) => ({ q: it.question, a: it.answer }));
    if (mapped.length > 0) faqItems = mapped;
  } catch {}

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Traslados a ${station.name}`,
    description: station.description || station.intro,
    serviceType: station.type === "bus" ? "BusStationTransfer" : "TrainStationTransfer",
    areaServed: ["La Rioja", "Rioja Alavesa", "España"],
    provider: {
      "@type": "LocalBusiness",
      name: "LogroVTC",
      telephone: "+34684200659",
      url: `https://logrovtc.com/mail/estaciones/${station.slug}`,
      areaServed: ["La Rioja", "España"],
    },
  } as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  } as const;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://logrovtc.com/mail/" },
      { "@type": "ListItem", position: 2, name: "Estaciones", item: "https://logrovtc.com/mail/estaciones" },
      { "@type": "ListItem", position: 3, name: station.name, item: `https://logrovtc.com/mail/estaciones/${station.slug}` },
    ],
  } as const;

  return (
    <main className="mx-auto max-w-6xl px-4 pt-0 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <Reveal>
        <HeroWithForm
          title={`Traslados a ${station.name}`}
          subtitle={station.intro}
          serviceType="aeropuerto"
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Estaciones", href: "/estaciones" },
            { label: station.name },
          ]}
        />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">Detalles del servicio</h2>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {["Recogida puntual", "Coordinación de horarios", "Confort hasta 7 plazas", "Servicio 24/7"].map((title, i) => (
            <Reveal key={i} delay={i * 80}>
              <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                <CardContent className="p-4">
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {i === 0 && "En domicilio, hotel o empresa según prefieras."}
                    {i === 1 && "Nos ajustamos a la salida/llegada de tu tren o bus."}
                    {i === 2 && "Espacio para equipaje y pago con tarjeta."}
                    {i === 3 && "Disponibilidad con reserva previa en cualquier horario."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal><ServicesNav /></Reveal>
      <Reveal><Reviews context="station" slug={station.slug} /></Reveal>
      <Reveal><Gallery count={4} /></Reveal>

      <Reveal>
        <StationFaqs slug={station.slug} />
      </Reveal>

      <Reveal><OtherServices /></Reveal>
      <Reveal><CTASection /></Reveal>
    </main>
  );
}

function getStationFaqs() {
  return [
    { q: "¿Llegáis con tiempo al andén?", a: "Sí, planificamos la recogida para llegar con antelación suficiente según el horario de tu tren o bus." },
    { q: "¿Esperáis si el tren se retrasa?", a: "Sí, ofrecemos un margen de espera razonable. Si el retraso es prolongado, nos coordinamos contigo por teléfono." },
    { q: "¿Podéis llevar bicicletas o equipaje voluminoso?", a: "Sí, bajo petición previa para asignar un vehículo adecuado." },
    { q: "¿Emitís factura?", a: "Sí, emitimos factura para empresas y particulares que lo soliciten." },
    { q: "¿Podéis recogerme dentro de la estación?", a: "Sí, nos coordinamos por teléfono para un punto de encuentro cómodo dentro o junto a la estación." },
    { q: "¿Aceptáis mascotas?", a: "Aceptamos mascotas en transportín o bajo condiciones acordadas previamente." },
    { q: "¿Realizáis traslados entre estaciones?", a: "Sí, conectamos estaciones y aeropuertos, y podemos incluir paradas intermedias." },
    { q: "¿Qué ocurre si pierdo el tren?", a: "Podemos reprogramar el servicio sujeto a disponibilidad; indícanos la nueva hora cuanto antes." },
  ];
}

async function StationFaqs({ slug }: { slug: string }) {
  let items = getStationFaqs();
  try {
    const list = await getFaqs("station", slug);
    const mapped = list.map((it) => ({ q: it.question, a: it.answer }));
    if (mapped.length > 0) items = mapped;
  } catch {}
  return <FAQs items={items} />;
}


