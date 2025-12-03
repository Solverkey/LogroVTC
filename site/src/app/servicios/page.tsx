// Archivo depurado: una sola exportación y canónica de dominio producción

import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/site-data";
import { listServices } from "@/lib/cms";
import Reveal from "@/components/visual/Reveal";
import Reviews from "@/components/sections/Reviews";

export const metadata: Metadata = {
  title: "Servicios | LogroVTC",
  description: "Servicios de traslados VTC en La Rioja: aeropuertos, Camino y mensajería.",
  alternates: { canonical: "https://logrovtc.com/mail/servicios" },
  openGraph: { title: "Servicios | LogroVTC", description: "Listado de servicios VTC.", url: "https://logrovtc.com/mail/servicios", type: "website" },
};

export default async function ServiciosIndexPage() {
  const list = await (async () => {
    try {
      return await listServices();
    } catch {
      return services;
    }
  })();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">Servicios</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {list.map((s: { slug: string; name: string; description: string }, i: number) => (
          <Reveal key={s.slug} delay={i * 80}>
            <Card className="border-border/80 bg-gradient-to-b from-card to-card/60">
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4">
                  <Link className="underline" href={`/servicios/${s.slug}`}>Ver detalle</Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Reviews context="home" />
      </Reveal>
    </main>
  );
}


