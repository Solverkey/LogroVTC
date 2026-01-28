"use client";
import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;

    // Variables para la animación
    let time = 0;
    let animationId: number;

    // Función de animación principal
    const animate = () => {
      time += 0.016;
      
      // Animación de los círculos
      const circles = Array.from(svg.querySelectorAll("circle"));
      circles.forEach((circle, i) => {
        const speed = 0.3 + i * 0.15;
        const radius = 300 + i * 30;
        const centerX = 50 + Math.sin(time * speed) * 12;
        const centerY = 50 + Math.cos(time * speed * 0.6) * 8;
        const pulseRadius = radius + Math.sin(time * speed * 1.2) * 15;
        
        circle.setAttribute("cx", `${centerX}%`);
        circle.setAttribute("cy", `${centerY}%`);
        circle.setAttribute("r", `${pulseRadius}`);
      });

      // Animación del grupo con movimiento del ratón
      const rotate = Math.sin(time * 0.3) * 1.5;
      const scale = 1 + Math.sin(time * 0.5) * 0.015;
      
      // Respuesta al ratón - Reducido para evitar overflow
      const mouseX = mouseRef.current.x * 50;
      const mouseY = mouseRef.current.y * 40;
      
      group.style.transform = `rotate(${rotate}deg) scale(${scale}) translate(${mouseX}px, ${mouseY}px)`;

      animationId = requestAnimationFrame(animate);
    };

    // Handler del ratón - SIMPLE Y DIRECTO
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      mouseRef.current = { x, y };
    };

    // Iniciar animación
    animate();

    // Event listener en el documento para capturar todo el movimiento del ratón
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 -z-10 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.98) 80%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.98) 80%, rgba(0,0,0,0) 100%)",
      }}
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(45 100% 60% / .45)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="g2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(210 100% 60% / .40)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="g3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(200 90% 70% / .35)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <g ref={groupRef} style={{ mixBlendMode: "plus-lighter" }}>
        <circle cx="30%" cy="35%" r="360" fill="url(#g1)"/>
        <circle cx="70%" cy="45%" r="330" fill="url(#g2)"/>
        <circle cx="50%" cy="65%" r="300" fill="url(#g3)"/>
      </g>
    </svg>
  );
}


