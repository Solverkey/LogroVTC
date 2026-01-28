import type { Metadata } from "next";
import HomeContent from "@/components/sections/HomeContent";

export const metadata: Metadata = {
  title: "VTC en Logroño y La Rioja | Traslados Aeropuerto, Camino y Mensajería – LogroVTC",
  description:
    "VTC en Logroño y La Rioja. Traslados a aeropuertos (Bilbao, Pamplona, Madrid, Zaragoza), apoyo al Camino de Santiago y mensajería urgente con precio cerrado. Tel. 684 20 06 59.",
  alternates: {
    canonical: "https://logrovtc.com/"
  },
  openGraph: {
    title: "VTC en Logroño y La Rioja | LogroVTC",
    description:
      "Traslados VTC en La Rioja: aeropuertos, Camino de Santiago y mensajería urgente con precio cerrado.",
    url: "https://logrovtc.com/",
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

export default function HomePage() {
  return <HomeContent />;
}
