import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | LogroVTC - Reserva tu traslado en La Rioja",
  description:
    "Contacta con LogroVTC para traslados a aeropuertos, Camino de Santiago y mensajería urgente en La Rioja. Tel. 684 20 06 59 o rellena nuestro formulario.",
  keywords: [
    "contacto LogroVTC",
    "reservar VTC Logroño",
    "solicitar presupuesto VTC",
    "teléfono VTC La Rioja",
  ],
  openGraph: {
    title: "Contacto | LogroVTC",
    description: "Contacta con nosotros para reservar tu traslado VTC en La Rioja",
    url: "https://logrovtc.com/mail/contacto",
    type: "website",
    locale: "es_ES",
  },
  alternates: {
    canonical: "https://logrovtc.com/mail/contacto",
  },
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contacto</h1>
      <p className="mt-3 text-black/70">
        Llámanos al <a href="tel:684200659" className="font-medium underline">684 20 06 59</a> o envíanos el siguiente formulario.
      </p>

      <form action="https://formsubmit.co/larioja@logrotaxi.com" method="POST" className="mt-8 grid gap-4">
        <input type="hidden" name="_subject" value="Nueva solicitud LogroVTC" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://logrovtc.com/mail/gracias" />
        <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} />
        <div className="grid gap-2">
          <label htmlFor="nombre" className="text-sm font-medium">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className="h-11 rounded-lg border border-black/10 px-3 outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 rounded-lg border border-black/10 px-3 outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="telefono" className="text-sm font-medium">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            className="h-11 rounded-lg border border-black/10 px-3 outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="mensaje" className="text-sm font-medium">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            required
            className="rounded-lg border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
        <button type="submit" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 h-11 text-sm font-medium hover:bg-black/90">
          Enviar
        </button>
      </form>

      <p className="mt-6 text-sm text-black/60">
        También puedes escribirnos a <a href="mailto:larioja@logrotaxi.com" className="underline">larioja@logrotaxi.com</a>.
      </p>
      <p className="mt-2 text-sm text-black/60">
        <Link href="/" className="underline">Volver al inicio</Link>
      </p>
    </main>
  );
}


