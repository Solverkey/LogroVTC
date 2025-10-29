import Link from "next/link";

export const metadata = {
  title: "Gracias | LogroVTC",
  description: "Gracias por tu solicitud. Te contactaremos en breve.",
  alternates: { canonical: "https://logrovtc.com/mail/gracias" },
};

export default function GraciasPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">¡Gracias!</h1>
      <p className="mt-3 text-muted-foreground">
        Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en contacto contigo lo antes posible.
      </p>
      <div className="mt-8">
        <Link href="/" className="underline">Volver al inicio</Link>
      </div>
    </main>
  );
}



