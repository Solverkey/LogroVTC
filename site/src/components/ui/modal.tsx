"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "./button";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "aeropuerto" | "camino" | "mensajeria";
}

export default function ServiceModal({ isOpen, onClose, serviceType }: ModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    origen: "",
    destino: "",
    fecha: "",
    hora: "",
    pasajeros: "",
    equipaje: "",
    detalles: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!isOpen) return null;

  const getServiceTitle = () => {
    switch (serviceType) {
      case "aeropuerto":
        return "Solicitar Traslado Aeropuerto";
      case "camino":
        return "Solicitar Servicio Camino de Santiago";
      case "mensajeria":
        return "Solicitar Mensajería Urgente";
      default:
        return "Solicitar Presupuesto";
    }
  };

  const getServiceFields = () => {
    switch (serviceType) {
      case "aeropuerto":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="origen"
                placeholder="Origen (dirección completa)"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.origen}
                onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
              />
              <input
                name="destino"
                placeholder="Destino (aeropuerto/estación)"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="date"
                name="fecha"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
              <input
                type="time"
                name="hora"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="pasajeros"
                placeholder="Número de pasajeros"
                type="number"
                min="1"
                max="7"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.pasajeros}
                onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
              />
              <input
                name="equipaje"
                placeholder="Equipaje (maletas, bultos)"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.equipaje}
                onChange={(e) => setFormData({ ...formData, equipaje: e.target.value })}
              />
            </div>
          </>
        );
      case "camino":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="origen"
                placeholder="Etapa de origen"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.origen}
                onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
              />
              <input
                name="destino"
                placeholder="Etapa de destino"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="date"
                name="fecha"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
              <input
                name="pasajeros"
                placeholder="Número de peregrinos"
                type="number"
                min="1"
                max="7"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.pasajeros}
                onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="equipaje"
                placeholder="Mochilas y equipaje"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.equipaje}
                onChange={(e) => setFormData({ ...formData, equipaje: e.target.value })}
              />
              <input
                name="bicicletas"
                placeholder="Bicicletas (si aplica)"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </>
        );
      case "mensajeria":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="origen"
                placeholder="Origen (dirección completa)"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.origen}
                onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
              />
              <input
                name="destino"
                placeholder="Destino (dirección completa)"
                required
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="date"
                name="fecha"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
              <input
                name="hora"
                type="time"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="tipo"
                placeholder="Tipo de envío (documentos, paquete)"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              />
              <input
                name="peso"
                placeholder="Peso aproximado"
                className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("_subject", "Nueva solicitud LogroVTC");
      fd.append("_captcha", "false");
      fd.append("_next", "https://logrovtc.com/mail/gracias");
      const resp = await fetch("https://formsubmit.co/larioja@logrotaxi.com", { method: "POST", body: fd });
      if (!resp.ok) throw new Error("send_error");
      onClose();
    } catch {
      alert("No se pudo enviar el formulario. Prueba de nuevo más tarde.");
    }
  };

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{getServiceTitle()}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              name="nombre"
              placeholder="Nombre completo"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
            <input
              name="telefono"
              placeholder="Teléfono"
              required
              className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          
          <div className="w-full">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {getServiceFields()}

          <textarea
            name="detalles"
            rows={4}
            placeholder="Detalles adicionales del servicio..."
            className="w-full rounded-md border border-input px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50"
            value={formData.detalles}
            onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
          />

          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              id="privacy-accept-modal" 
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              required 
              className="mt-1 h-4 w-4 rounded border-input"
            />
            <label htmlFor="privacy-accept-modal" className="text-xs text-muted-foreground">
              He leído y acepto la <Link href="/politica-privacidad" className="underline hover:text-foreground" target="_blank">Política de Privacidad</Link> y el <Link href="/aviso-legal" className="underline hover:text-foreground" target="_blank">Aviso Legal</Link>.
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={!privacyAccepted}>
              Enviar solicitud
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return mounted ? createPortal(modal, document.body) : null;
}
