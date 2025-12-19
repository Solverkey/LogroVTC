"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactoPage() {
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, detalles: data.mensaje, source: "contacto" }),
      });
      const result = await resp.json();
      if (!resp.ok || !result.ok) throw new Error(result.error || "send_error");
      window.location.href = "/gracias";
    } catch {
      alert("No se pudo enviar el formulario. Prueba de nuevo más tarde.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contacto</h1>
      <p className="mt-3 text-black/70">
        Llámanos al <a href="tel:684200659" className="font-medium underline">684 20 06 59</a> o envíanos el siguiente formulario.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
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
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="privacy-accept-contact" 
            name="privacy-accept" 
            required 
            className="mt-1 h-4 w-4 rounded border-input"
          />
          <label htmlFor="privacy-accept-contact" className="text-xs text-black/70">
            He leído y acepto la <Link href="/politica-privacidad" className="underline hover:text-black" target="_blank">Política de Privacidad</Link> y el <Link href="/aviso-legal" className="underline hover:text-black" target="_blank">Aviso Legal</Link>.
          </label>
        </div>
        <button 
          type="submit" 
          disabled={formLoading}
          className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 h-11 text-sm font-medium hover:bg-black/90 disabled:opacity-50"
        >
          {formLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <p className="mt-6 text-sm text-black/60">
        También puedes escribirnos a <a href="mailto:info@logrovtc.com" className="underline">info@logrovtc.com</a>.
      </p>
      <p className="mt-2 text-sm text-black/60">
        <Link href="/" className="underline">Volver al inicio</Link>
      </p>
    </main>
  );
}


