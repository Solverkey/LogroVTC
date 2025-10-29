// Archivo depurado: elimina duplicados previos, mantenemos una sola implementación

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, airports, stations, type Service } from "@/lib/site-data";
import { listServices, getServiceBySlugFromDb, getFaqs } from "@/lib/cms";
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
    const list = await listServices();
    if (list.length > 0) return list.map((it) => ({ slug: it.slug }));
  } catch {}
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const s = await getServiceBySlugFromDb(slug);
    if (s) {
      const title = `${s.name} | LogroVTC`;
      const description = s.description;
      const url = `https://logrovtc.com/mail/servicios/${slug}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "article", locale: "es_ES" },
        keywords: s.keywords || undefined,
      };
    }
  } catch {}
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.name} | LogroVTC`;
  const description = service.description;
  const url = `https://logrovtc.com/mail/servicios/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: service.keywords,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  let service: Service | undefined = getServiceBySlug(slug);
  try {
    const s = await getServiceBySlugFromDb(slug);
    if (s) {
      service = {
        slug: slug as Service["slug"],
        name: s.name,
        title: s.title,
        description: s.description,
        intro: s.intro,
        benefits: s.benefits ?? [],
        keywords: s.keywords ?? [],
      };
    }
  } catch {}
  if (!service) return notFound();

  // JSON-LD para Service y FAQPage (schema.org)
  const faqStatic = getServiceFaqs(service.slug);
  const serviceSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    areaServed: ["La Rioja", "Rioja Alavesa", "España"],
    provider: {
      "@type": "LocalBusiness",
      name: "LogroVTC",
      telephone: "+34684200659",
      areaServed: ["La Rioja", "España"],
      url: "https://logrovtc.com/mail"
    },
    serviceType: service.slug,
  });
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqStatic.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://logrovtc.com/mail/" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "https://logrovtc.com/mail/servicios" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://logrovtc.com/mail/servicios/${service.slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-6xl px-4 pt-0 pb-10">
      <Reveal>
        <HeroWithForm
          title={service.title}
          subtitle={service.intro}
          serviceType={service.slug === "mensajeria" ? "mensajeria" : service.slug}
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: service.name },
          ]}
        />
      </Reveal>

      <section id="beneficios" className="mt-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">Por qué elegirnos</h2>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {service.benefits.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                <CardContent className="p-4">
                  <h3 className="text-base font-medium">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {service.slug === "aeropuerto" && (
        <section className="mt-16">
          <h2 className="text-3xl font-semibold">Aeropuertos y estaciones</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-xl font-semibold">Aeropuertos</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 list-disc pl-5">
                {airports.map((a) => (
                  <li key={a.slug}><Link className="underline" href={`/aeropuertos/${a.slug}`}>{a.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-xl font-semibold">Estaciones</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 list-disc pl-5">
                {stations.map((s) => (
                  <li key={s.slug}><Link className="underline" href={`/estaciones/${s.slug}`}>{s.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <Reveal><ServicesNav /></Reveal>
      <Reveal><Reviews context="service" slug={service.slug} /></Reveal>
      <Reveal><Gallery count={4} /></Reveal>

      <Reveal>
        <ServiceFaqs slug={service.slug} />
      </Reveal>

      <Reveal><OtherServices /></Reveal>
      <Reveal><CTASection /></Reveal>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </main>
  );
}

function getServiceFaqs(slug: string) {
  if (slug === "aeropuerto") {
    return [
      { q: "¿Puedo solicitar un traslado al aeropuerto a cualquier hora?", a: "Sí, operamos 24/7 con reserva previa. Recomendamos solicitar con antelación para garantizar disponibilidad, especialmente en madrugadas y fines de semana." },
      { q: "¿Me recoge el conductor en la terminal?", a: "Sí, hacemos seguimiento del vuelo y te esperamos en llegadas con cartela si lo necesitas. Incluimos un tiempo de cortesía para la recogida." },
      { q: "¿Aceptáis pago con tarjeta?", a: "Sí, todos nuestros vehículos aceptan pago con tarjeta y ofrecemos factura para empresas." },
      { q: "¿Incluye silla infantil?", a: "Podemos llevar sistemas de retención infantil bajo solicitud, sujeto a disponibilidad y sin coste adicional." },
      { q: "¿Qué ocurre si mi vuelo se retrasa?", a: "Ajustamos la recogida según el nuevo horario y te mantenemos informado sin coste de espera razonable." },
      { q: "¿Cuánto equipaje puedo llevar?", a: "Vehículos con amplio maletero; avísanos de equipaje extra o voluminoso para asignar la flota adecuada." },
      { q: "¿Realizáis traslados interprovinciales?", a: "Sí, realizamos servicios a cualquier aeropuerto y ciudad, nacionales e internacionales." },
      { q: "¿Podéis recoger a terceros?", a: "Sí, coordinamos recogidas para familiares, clientes o invitados y compartimos estado por teléfono." },
    ];
  }
  if (slug === "camino") {
    return [
      { q: "¿Podéis trasladar mochilas entre etapas?", a: "Sí, recogemos y entregamos mochilas en alojamientos a la hora acordada. También transportamos bicicletas y equipaje voluminoso." },
      { q: "¿Hacéis recogidas fuera de ruta?", a: "Sí, nos adaptamos a tu itinerario, acercamientos a inicio/fin de etapa y traslados intermedios si es necesario." },
      { q: "¿Hay servicio para grupos?", a: "Disponemos de vehículos hasta 7 plazas y coordinación de flota para grupos mayores." },
      { q: "¿Puedo cancelar sin coste?", a: "Con 24h de antelación no hay coste de cancelación. En cancelaciones de última hora pueden aplicarse cargos por desplazamiento." },
      { q: "¿Transportáis bicicletas?", a: "Sí, contamos con remolque para hasta 7 bicicletas; reserva con antelación para garantizar disponibilidad." },
      { q: "¿Qué cobertura tenéis?", a: "Toda La Rioja y Rioja Alavesa, además de conexiones con Navarra, País Vasco y Aragón." },
      { q: "¿Podéis sugerir etapas u hoteles?", a: "Ofrecemos asesoramiento local para optimizar distancias, desniveles y logística de alojamiento." },
      { q: "¿Se puede pagar por etapas?", a: "Sí, podemos presupuestar por etapa o servicio completo; se acepta pago con tarjeta." },
    ];
  }
  // mensajeria
  return [
    { q: "¿El envío es directo sin paradas?", a: "Sí, es un servicio puerta a puerta dedicado, sin consolidación ni paradas intermedias." },
    { q: "¿Ofrecéis prueba de entrega (POD)?", a: "Sí, enviamos confirmación de entrega y, si lo necesitas, firma y fotos del receptor." },
    { q: "¿Qué tipo de mercancía transportáis?", a: "Documentación sensible, prototipos, piezas urgentes y paquetería no paletizada. Consulta para cargas especiales." },
    { q: "¿Cobertura?", a: "España y Europa. Calculamos ruta directa y tiempo estimado de llegada al confirmar la solicitud." },
    { q: "¿Tiempo de respuesta?", a: "Habitualmente podemos salir en menos de 60 minutos desde la confirmación dentro de La Rioja." },
    { q: "¿Qué tamaño de bultos aceptáis?", a: "Desde sobres a cajas medianas; para palés u objetos muy voluminosos, consúltanos disponibilidad." },
    { q: "¿Seguro de mercancías?", a: "Contamos con cobertura; para envíos de alto valor, podemos ampliar la póliza bajo petición." },
    { q: "¿Recogidas múltiples?", a: "Podemos programar varias paradas manteniendo el recorrido directo; lo presupuestamos a medida." },
  ];
}

async function ServiceFaqs({ slug }: { slug: string }) {
  let items = getServiceFaqs(slug);
  try {
    const list = await getFaqs("service", slug);
    const mapped = list.map((it) => ({ q: it.question, a: it.answer }));
    if (mapped.length > 0) items = mapped;
  } catch {}
  return <FAQs items={items} />;
}


