import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import CookieBanner from "@/components/ui/cookie-banner";
import CookieWidget from "@/components/ui/cookie-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VTC en Logroño y La Rioja | Traslados Aeropuerto, Camino y Mensajería – LogroVTC",
  description:
    "VTC en Logroño y La Rioja. Traslados a aeropuertos (Bilbao, Pamplona, Madrid, Zaragoza), apoyo al Camino de Santiago y mensajería urgente con precio cerrado. Tel. 722 10 91 11.",
  metadataBase: new URL("https://logrovtc.com/mail"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "VTC en Logroño y La Rioja | LogroVTC",
    description:
      "Traslados VTC en La Rioja: aeropuertos, Camino de Santiago y mensajería urgente con precio cerrado.",
      url: "https://logrovtc.com/mail/",
    siteName: "LogroVTC",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/vehicles/vehicle-1.jpg",
        width: 1200,
        height: 630,
        alt: "Vehículos LogroVTC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTC en Logroño y La Rioja | LogroVTC",
    description:
      "Traslados a aeropuertos, Camino de Santiago y mensajería urgente.",
    images: ["/vehicles/vehicle-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'LogroVTC',
              url: 'https://logrovtc.com/mail',
              telephone: '+34684200659',
              areaServed: ['La Rioja', 'Rioja Alavesa', 'España'],
              image: 'https://logrovtc.com/mail/vehicles/vehicle-1.jpg',
              sameAs: [],
              address: { '@type': 'PostalAddress', addressCountry: 'ES' },
              openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/AllDay', opens: '00:00', closes: '23:59' }],
              makesOffer: [
                { '@type': 'Offer', name: 'Traslado a aeropuertos' },
                { '@type': 'Offer', name: 'Camino de Santiago' },
                { '@type': 'Offer', name: 'Mensajería urgente' },
              ],
            }),
          }}
        />
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/#inicio" className="text-lg font-semibold tracking-tight">LogroVTC</Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#inicio" className="hover:underline">Inicio</Link>
              <Link href="/#aeropuerto" className="hover:underline">Aeropuertos</Link>
              <Link href="/#camino" className="hover:underline">Camino de Santiago</Link>
              <Link href="/#mensajeria" className="hover:underline">Mensajería</Link>
              <Link href="/localidades" className="hover:underline">Localidades</Link>
            </nav>
            <a
              href="tel:684200659"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm hover:opacity-90"
              aria-label="Llamar por teléfono"
            >
              <Phone size={18} /> 684 20 06 59
            </a>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-3">
                <h3 className="font-semibold">LogroVTC</h3>
                <p className="text-sm text-muted-foreground">
                  VTC en La Rioja y Rioja Alavesa. Servicios de transporte profesional y confiable.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Servicios</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><a href="#aeropuerto" className="hover:text-foreground">Traslados Aeropuerto</a></li>
                  <li><a href="#camino" className="hover:text-foreground">Camino de Santiago</a></li>
                  <li><a href="#mensajeria" className="hover:text-foreground">Mensajería Urgente</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Contacto</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                  <a href="tel:684200659" className="inline-flex items-center gap-2 hover:text-foreground">
                      <Phone size={14} /> 684 20 06 59
                    </a>
                  </li>
                  <li>info@logrovtc.com</li>
                  <li>La Rioja, España</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Legal</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><a href="/aviso-legal" className="hover:text-foreground">Aviso Legal</a></li>
                  <li><a href="/politica-cookies" className="hover:text-foreground">Política de Cookies</a></li>
                  <li><a href="/politica-privacidad" className="hover:text-foreground">Política de Privacidad</a></li>
                  <li><a href="/politica-accesibilidad" className="hover:text-foreground">Política de Accesibilidad</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              {/* Logos de financiación UE */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logos/ue-financiado.webp" 
                  alt="Financiado por la Unión Europea - NextGenerationEU" 
                  className="w-full md:w-auto max-w-[400px] h-auto object-contain"
                  loading="eager"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logos/plan-recuperacion.webp" 
                  alt="Plan de Recuperación, Transformación y Resiliencia" 
                  className="w-full md:w-auto max-w-[400px] h-auto object-contain"
                  loading="eager"
                />
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} LogroVTC. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <a
          href="tel:684200659"
          className="fixed md:hidden bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg"
          aria-label="Llamar ahora"
        >
          <Phone size={18} /> Llamar
        </a>
        <CookieBanner />
        <CookieWidget />
        {/* Portal root para modales/lightbox globales */}
        <div id="portal-root" />
      </body>
    </html>
  );
}
