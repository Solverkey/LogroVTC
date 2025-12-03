import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/visual/Reveal";
import HeroWithForm from "@/components/sections/HeroWithForm";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import CTASection from "@/components/sections/CTASection";
import ServicesNav from "@/components/sections/ServicesNav";

const LOCALITIES = {
  logrono: {
    name: "Logroño",
    intro: "Traslados VTC en Logroño: aeropuertos, estaciones y rutas locales.",
    description: "Servicio VTC en Logroño con conductores profesionales. Aeropuertos (Bilbao, Pamplona, Madrid, Zaragoza) y apoyo al Camino de Santiago. Pago con tarjeta y atención 24/7.",
    keywords: ["vtc Logroño", "taxi Logroño", "traslado aeropuerto Logroño"],
  },
  laguardia: {
    name: "Laguardia",
    intro: "VTC en Laguardia (Rioja Alavesa): enoturismo y aeropuertos.",
    description: "Traslados desde y hacia Laguardia, visitas a bodegas y conexiones con aeropuertos de Bilbao, Vitoria y Zaragoza.",
    keywords: ["vtc Laguardia", "taxi Laguardia", "bodegas Rioja Alavesa"],
  },
  elciego: {
    name: "Elciego",
    intro: "VTC en Elciego: Marqués de Riscal, bodegas y aeropuertos.",
    description: "Traslados en Elciego con visitas a bodegas y transfer a aeropuertos. Rutas personalizadas por Rioja Alavesa.",
    keywords: ["vtc Elciego", "taxi Elciego", "Marqués de Riscal traslado"],
  },
  haro: {
    name: "Haro",
    intro: "VTC en Haro: capital del vino de Rioja, bodegas y traslados.",
    description: "Servicio VTC en Haro con traslados a bodegas, aeropuertos y estaciones. Ruta del vino, visitas enoturísticas y conexiones nacionales.",
    keywords: ["vtc Haro", "taxi Haro", "bodegas Haro", "enoturismo Haro"],
  },
  calahorra: {
    name: "Calahorra",
    intro: "VTC en Calahorra: traslados a aeropuertos y servicios locales.",
    description: "Traslados VTC desde Calahorra a aeropuertos de Zaragoza, Bilbao, Pamplona y Madrid. Servicio profesional 24/7 con precio cerrado.",
    keywords: ["vtc Calahorra", "taxi Calahorra", "traslado aeropuerto Calahorra"],
  },
  arnedo: {
    name: "Arnedo",
    intro: "VTC en Arnedo: traslados cómodos y seguros.",
    description: "Servicio VTC en Arnedo con conexiones a aeropuertos, estaciones y ciudades cercanas. Flota moderna y conductores experimentados.",
    keywords: ["vtc Arnedo", "taxi Arnedo", "traslado Arnedo"],
  },
  "santo-domingo": {
    name: "Santo Domingo de la Calzada",
    intro: "VTC en Santo Domingo de la Calzada: Camino de Santiago y traslados.",
    description: "Traslados VTC en Santo Domingo de la Calzada, especialistas en Camino de Santiago. Transfer de mochilas, recogidas y aeropuertos.",
    keywords: ["vtc Santo Domingo", "Camino Santiago Santo Domingo", "taxi Santo Domingo"],
  },
  najera: {
    name: "Nájera",
    intro: "VTC en Nájera: Camino de Santiago y servicios de transporte.",
    description: "Servicio VTC en Nájera con apoyo al Camino de Santiago y traslados a aeropuertos. Asistencia a peregrinos y transporte local.",
    keywords: ["vtc Nájera", "taxi Nájera", "Camino Santiago Nájera"],
  },
} as const;

type Slug = keyof typeof LOCALITIES;
type PageParams = Promise<{ slug: Slug }> | { slug: Slug };
type PageProps = { params: PageParams };

export async function generateStaticParams() {
  return Object.keys(LOCALITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const l = LOCALITIES[slug];
  if (!l) return {};
  const title = `${l.name} | VTC y traslados | LogroVTC`;
  const description = l.intro;
  const url = `https://logrovtc.com/mail/localidades/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: [...l.keywords],
  };
}

export default async function LocalityPage({ params }: PageProps) {
  const { slug } = await params;
  const l = LOCALITIES[slug];
  if (!l) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-0 pb-10">
      <Reveal>
        <HeroWithForm
          title={`VTC en ${l.name}`}
          subtitle={l.intro}
          serviceType="aeropuerto"
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Localidades", href: "/localidades" },
            { label: l.name },
          ]}
        />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <div className="prose prose-neutral max-w-none">
            <p>{l.description}</p>
            <ul>
              <li>Traslados a aeropuertos cercanos</li>
              <li>Apoyo al Camino de Santiago y rutas locales</li>
              <li>Visitas a bodegas y enoturismo</li>
              <li>Servicios para empresas y eventos</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <Reveal><ServicesNav /></Reveal>
      <Reveal><Reviews context="home" slug={slug} /></Reveal>
      <Reveal><Gallery count={4} /></Reveal>
      <Reveal><CTASection /></Reveal>
    </main>
  );
}


