"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GenericModal from "@/components/ui/generic-modal";
import { Mail } from "lucide-react";

export default function CTASection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="contacto" className="mt-24 mb-16">
      <div className="rounded-2xl border border-border p-8 md:p-10 bg-gradient-to-br from-card to-card/70">
        <div className="md:flex items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">¿Necesitas un traslado ahora?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Llámanos o envíanos el formulario y te respondemos rápido.</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
            <Button asChild size="lg" className="w-full sm:w-auto whitespace-nowrap"><a href="tel:684200659">Llamar ahora</a></Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto whitespace-nowrap" onClick={() => setOpen(true)}>
              <span className="inline-flex items-center gap-2">Solicitar presupuesto <Mail size={16} /></span>
            </Button>
          </div>
        </div>
      </div>
      <GenericModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}


