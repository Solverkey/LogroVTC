"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InteractiveBackground from "@/components/visual/InteractiveBackground";
import ServiceModal from "@/components/ui/modal";
import GenericModal from "@/components/ui/generic-modal";
import { ArrowRight, Mail } from "lucide-react";

type HeroWithFormProps = {
  title: string;
  subtitle: string;
  serviceType?: "aeropuerto" | "camino" | "mensajeria";
  breadcrumbs?: { label: string; href?: string }[];
};

export default function HeroWithForm({ title, subtitle, serviceType = "aeropuerto", breadcrumbs }: HeroWithFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [genericModalOpen, setGenericModalOpen] = useState(false);

  return (
    <section className="relative pt-4 md:pt-8">
      <InteractiveBackground />
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="text-sm text-muted-foreground mb-2">
              {breadcrumbs.map((b, i) => (
                <span key={i}>
                  {b.href ? <a href={b.href} className="hover:underline">{b.label}</a> : <strong>{b.label}</strong>}
                  {i < breadcrumbs.length - 1 ? " / " : null}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-extrabold leading-[0.95] opacity-0 animate-[fadeIn_1s_ease-out_0.1s_forwards]">
            {title}
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-prose opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            <Button asChild size="lg">
              <a href="tel:684200659">
                Llamar ahora <ArrowRight size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={() => setGenericModalOpen(true)}>
              Solicitar presupuesto <Mail size={16} />
            </Button>
          </div>
        </div>
        <div className="relative">
          <form action="https://formsubmit.co/larioja@logrotaxi.com" method="POST" className="relative rounded-2xl border border-border bg-white/80 backdrop-blur p-6 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]">
            <input type="hidden" name="_subject" value="Nueva solicitud LogroVTC" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://logrovtc.com/mail/gracias" />
            <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} />
            <h3 className="text-xl font-semibold mb-1">Solicita tu servicio</h3>
            <p className="text-sm text-muted-foreground mb-3">Este formulario se enviará al equipo de LogroVTC. Te contactaremos para confirmar tu traslado.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="nombre" placeholder="Nombre" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
              <input name="telefono" placeholder="Teléfono" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <input name="origen" placeholder="Origen" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
              <input name="destino" placeholder="Destino" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <input type="date" name="fecha" className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
              <input type="time" name="hora" className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
            <textarea name="detalles" rows={6} placeholder="Detalles del servicio (pasajeros, equipaje, paradas, instrucciones, etc.)" className="mt-3 w-full rounded-md border border-input px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" />
            <Button type="submit" className="w-full mt-4">Solicitar servicio</Button>
          </form>
        </div>
      </div>

      <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceType={serviceType} />
      <GenericModal isOpen={genericModalOpen} onClose={() => setGenericModalOpen(false)} />
    </section>
  );
}


