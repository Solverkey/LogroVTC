// Archivo depurado: mantenemos una única implementación

import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { airports } from "@/lib/site-data";
import { listAirports } from "@/lib/cms";
import Reveal from "@/components/visual/Reveal";
import Reviews from "@/components/sections/Reviews";

export const metadata: Metadata = {
  title: "Aeropuertos | LogroVTC",
  description: "Traslados a aeropuertos desde La Rioja y Rioja Alavesa.",
  alternates: { canonical: "https://logrovtc.com/mail/aeropuertos" },
  openGraph: { title: "Aeropuertos | LogroVTC", description: "Listado de aeropuertos.", url: "https://logrovtc.com/mail/aeropuertos", type: "website" },
};

export default async function AeropuertosIndexPage() {
  const list = await (async () => {
    try {
      return await listAirports();
    } catch {
      return airports;
    }
  })();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: list.map((a: { slug: string; name: string }, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: a.name,
              url: `https://logrovtc.com/mail/aeropuertos/${a.slug}`,
            })),
          }),
        }}
      />
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">Aeropuertos</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {list.map((a: { slug: string; name: string; intro: string }, i: number) => (
          <Reveal key={a.slug} delay={i * 80}>
            <Card className="border-border/80 bg-gradient-to-b from-card to-card/60">
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold">{a.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{a.intro}</p>
                <div className="mt-4">
                  <Link className="underline" href={`/aeropuertos/${a.slug}`}>Ver traslado</Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Reviews context="service" slug="aeropuerto" />
      </Reveal>
    </main>
  );
}


