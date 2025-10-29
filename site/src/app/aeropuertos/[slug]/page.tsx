// Archivo depurado: dejamos una sola implementación completa

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { airports, getAirportBySlug, stations, type Airport } from "@/lib/site-data";
import { listAirports, getAirportBySlugFromDb, getFaqs } from "@/lib/cms";
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
    const list = await listAirports();
    if (list.length > 0) return list.map((it) => ({ slug: it.slug }));
  } catch {}
  return airports.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const a = await getAirportBySlugFromDb(slug);
    if (a) {
      const title = `${a.name} | Traslados VTC | LogroVTC`;
      const description = a.description;
      const url = `https://logrovtc.com/mail/aeropuertos/${slug}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "article", locale: "es_ES" },
        keywords: a.keywords || undefined,
      };
    }
  } catch {}
  const airport = getAirportBySlug(slug);
  if (!airport) return {};
  const title = `${airport.name} | Traslados VTC | LogroVTC`;
  const description = airport.description;
  const url = `https://logrovtc.com/mail/aeropuertos/${airport.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: airport.keywords,
  };
}

export default async function AirportPage({ params }: PageProps) {
  const { slug } = await params;
  let airport: Airport | undefined = getAirportBySlug(slug);
  try {
    const a = await getAirportBySlugFromDb(slug);
    if (a) {
      airport = {
        slug,
        name: a.name,
        city: a.city ?? "",
        code: a.code ?? undefined,
        intro: a.intro,
        description: a.description,
        keywords: a.keywords ?? [],
      };
    }
  } catch {}
  if (!airport) return notFound();

  // Preparar JSON-LD (Service, FAQPage y Breadcrumb)
  let faqItems: { q: string; a: string }[] = getAirportFaqs();
  try {
    const list = await getFaqs("airport", airport.slug);
    const mapped = list.map((it) => ({ q: it.question, a: it.answer }));
    if (mapped.length > 0) faqItems = mapped;
  } catch {}

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Traslados a ${airport.name}${airport.code ? ` (${airport.code})` : ""}`,
    description: airport.description || airport.intro,
    serviceType: "AirportTransfer",
    areaServed: ["La Rioja", "Rioja Alavesa", "España"],
    provider: {
      "@type": "LocalBusiness",
      name: "LogroVTC",
      telephone: "+34684200659",
      url: `https://logrovtc.com/mail/aeropuertos/${airport.slug}`,
      areaServed: ["La Rioja", "España"],
    },
    hasOfferCatalog: undefined,
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
      { "@type": "ListItem", position: 2, name: "Aeropuertos", item: "https://logrovtc.com/mail/aeropuertos" },
      { "@type": "ListItem", position: 3, name: airport.name, item: `https://logrovtc.com/mail/aeropuertos/${airport.slug}` },
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
          title={`Traslados a ${airport.name}${airport.code ? ` (${airport.code})` : ""}`}
          subtitle={airport.intro}
          serviceType="aeropuerto"
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Aeropuertos", href: "/aeropuertos" },
            { label: airport.name },
          ]}
        />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">Cómo funciona</h2>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {["Reserva simple", "Seguimiento del vuelo", "Recogida en llegadas", "Pago y factura"].map((title, i) => (
            <Reveal key={i} delay={i * 80}>
              <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                <CardContent className="p-4">
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {i === 0 && "Reserva por teléfono o formulario indicando hora y punto de recogida."}
                    {i === 1 && "Ajustamos la recogida en caso de retrasos con seguimiento en tiempo real."}
                    {i === 2 && "Te esperamos en llegadas con cartela y asistencia con equipaje."}
                    {i === 3 && "Aceptamos tarjeta y emitimos factura para empresas."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold">Conexiones útiles</h2>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
          {stations.map((s) => (
            <li key={s.slug}><Link className="underline" href={`/estaciones/${s.slug}`}>{s.name}</Link></li>
          ))}
        </ul>
      </section>

      <Reveal><ServicesNav /></Reveal>
      <Reveal><Reviews context="airport" slug={airport.slug} /></Reveal>
      <Reveal><Gallery count={4} /></Reveal>

      <Reveal>
        <AirportFaqs slug={airport.slug} />
      </Reveal>

      <Reveal><OtherServices /></Reveal>
      <Reveal><CTASection /></Reveal>
    </main>
  );
}

function getAirportFaqs() {
  return [
    { q: "¿Puedo solicitar un traslado al aeropuerto a cualquier hora?", a: "Sí, operamos 24/7 con reserva previa. Recomendamos avisar con antelación para garantizar disponibilidad." },
    { q: "¿Me viene a buscar el conductor hasta la terminal?", a: "Sí, realizamos recogida en terminal con cartela si lo deseas y seguimiento de vuelo para ajustar el horario." },
    { q: "¿Cuánto equipaje puedo llevar?", a: "Nuestros vehículos admiten equipaje estándar por pasajero. Indícanos bultos especiales para asignar vehículo adecuado." },
    { q: "¿Aceptáis pago con tarjeta?", a: "Sí, aceptamos tarjetas y ofrecemos factura para empresas." },
    { q: "¿Qué pasa si mi vuelo se retrasa?", a: "Ajustamos la recogida al nuevo horario y mantenemos el contacto en todo momento." },
    { q: "¿Podéis llevar sillas infantiles?", a: "Sí, bajo solicitud, sujeto a disponibilidad y sin coste adicional." },
    { q: "¿Dais precio cerrado?", a: "Sí, ofrecemos precio cerrado según origen/destino y condiciones del servicio." },
  ];
}

async function AirportFaqs({ slug }: { slug: string }) {
  let items = getAirportFaqs();
  try {
    const list = await getFaqs("airport", slug);
    const mapped = list.map((it) => ({ q: it.question, a: it.answer }));
    if (mapped.length > 0) items = mapped;
  } catch {}
  return <FAQs items={items} />;
}


