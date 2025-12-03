import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/visual/Reveal";
import Reviews from "@/components/sections/Reviews";

const LOCALITIES = [
  { slug: "logrono", name: "Logroño", intro: "VTC en Logroño y alrededores: aeropuertos y rutas locales." },
  { slug: "laguardia", name: "Laguardia", intro: "VTC en Laguardia (Rioja Alavesa): bodegas y aeropuertos." },
  { slug: "elciego", name: "Elciego", intro: "VTC en Elciego: Marqués de Riscal, bodegas y aeropuertos." },
];

export const metadata: Metadata = {
  title: "Localidades | LogroVTC",
  description: "Servicio VTC en Logroño, Laguardia y Elciego.",
  alternates: { canonical: "/localidades" },
};

export default function LocalidadesIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 pb-10">
      <Reveal>
        <h1 className="text-4xl font-bold tracking-tight">Localidades</h1>
      </Reveal>
      <Reveal>
        <p className="mt-2 text-muted-foreground max-w-prose">
          Operamos en La Rioja y Rioja Alavesa. Elige tu localidad para ver información específica.
        </p>
      </Reveal>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        {LOCALITIES.map((l) => (
          <Reveal key={l.slug}>
            <Card className="border-border/80">
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold">{l.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{l.intro}</p>
                <div className="mt-4">
                  <Link className="underline" href={`/localidades/${l.slug}`}>Ver detalle</Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <Reviews context="home" />
      </Reveal>
    </main>
  );
}


