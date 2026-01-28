"use client";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type NebulaProps = {
  className?: string;
  triggerId?: string;
  intensity?: number; // 0.0 - 1.0
};

export default function Nebula({ className, triggerId = "inicio", intensity = 1 }: NebulaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const b1 = useRef<HTMLSpanElement>(null);
  const b2 = useRef<HTMLSpanElement>(null);
  const b3 = useRef<HTMLSpanElement>(null);
  const b4 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Nota: blobs calculado previamente no se usa directamente, lo omitimos para evitar warnings.

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, { duration: 0.6, ease: "power3.out", x: x * 15, y: y * 10 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Parallax sutil con scroll
    const trigger = document.getElementById(triggerId) ?? el;
    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const y = gsap.utils.mapRange(0, 1, -60, 60, self.progress);
        gsap.to(el, { y, overwrite: true, ease: "none", duration: 0.1 });
      },
    });

    // Deriva lenta multicolor, cada blob con su ritmo para sensación orgánica
    const rand = gsap.utils.random;
    const animateBlob = (elmt: Element | null, dur: number, scale = 1) => {
      if (!elmt) return;
      gsap.to(elmt, {
        xPercent: rand(-20, 20),
        yPercent: rand(-20, 20),
        scale: scale * rand(0.9, 1.1),
        duration: dur,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    animateBlob(b1.current, 12, 1.05);
    animateBlob(b2.current, 16, 1.1);
    animateBlob(b3.current, 18, 1.08);
    animateBlob(b4.current, 22, 1.15);

    return () => {
      window.removeEventListener("mousemove", onMove);
      st.kill();
    };
  }, [triggerId]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      style={{ transform: `scale(${1 + 0.07 * intensity})` }}
    >
      {/* Blobs individuales (mezcla en pantalla) */}
      <span ref={b1} className="absolute left-1/4 top-1/3 size-[min(50vw,50vh)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-70 blur-[60px]"
        style={{ background: "radial-gradient(closest-side, hsla(263,89%,58%,0.9), transparent 70%)" }} />
      <span ref={b2} className="absolute left-2/3 top-1/2 size-[min(45vw,45vh)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-60 blur-[60px]"
        style={{ background: "radial-gradient(closest-side, hsla(200,90%,60%,0.9), transparent 70%)" }} />
      <span ref={b3} className="absolute left-1/2 top-2/3 size-[min(40vw,40vh)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-55 blur-[60px]"
        style={{ background: "radial-gradient(closest-side, hsla(310,75%,65%,0.85), transparent 70%)" }} />
      <span ref={b4} className="absolute left-1/3 top-3/4 size-[min(42vw,42vh)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-55 blur-[60px]"
        style={{ background: "radial-gradient(closest-side, hsla(35,95%,60%,0.85), transparent 70%)" }} />

      {/* Ruido sutil sobre los colores */}
      <svg className="absolute inset-0 opacity-[.08] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {/* Degradado de desvanecimiento inferior */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
    </div>
  );
}


