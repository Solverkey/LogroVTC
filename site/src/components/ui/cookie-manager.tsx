"use client";

import { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { Settings, Cookie } from "lucide-react";
import { useCookies } from "@/lib/hooks/useCookies";

type CookieManagerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  preventClose?: boolean;
  compact?: boolean;
};

export default function CookieManager({ open, onOpenChange, hideTrigger = false, preventClose = false, compact = true }: CookieManagerProps) {
  const [isOpenState, setIsOpenState] = useState(false);
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";
  const isOpen = isControlled ? (open as boolean) : isOpenState;
  const setOpen = isControlled ? (onOpenChange as (open: boolean) => void) : setIsOpenState;
  const { 
    preferences, 
    // consentDate,
    savePreferences, 
    togglePreference, 
    // resetPreferences,
    acceptAll,
    acceptNecessary 
  } = useCookies();

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setOpen(false);
  };

  return (
    <Dialog open={!!isOpen} onOpenChange={setOpen} preventClose={preventClose}>
      {!hideTrigger && (
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Gestionar Cookies
          </Button>
        </div>
      )}
      
      <DialogContent className={`${compact ? "max-w-md w-[90vw] p-4" : "max-w-2xl p-6"}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Configuración de Cookies
          </DialogTitle>
          <DialogDescription>
            Elige qué tipos de cookies quieres permitir
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="text-sm">
              <div className="font-medium">Necesarias</div>
              <div className="text-xs text-muted-foreground">Siempre activas</div>
            </div>
            <span className="text-xs rounded-full bg-green-100 text-green-700 px-2 py-0.5">Activas</span>
          </div>

          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="text-sm">
              <div className="font-medium">Analíticas</div>
              <div className="text-xs text-muted-foreground">Mejora del sitio</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePreference("analytics")}
              className={preferences.analytics ? "bg-blue-600 text-white border-blue-600" : ""}
            >
              {preferences.analytics ? "Activadas" : "Desactivadas"}
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="text-sm">
              <div className="font-medium">Preferencias</div>
              <div className="text-xs text-muted-foreground">Recuerdan tus ajustes</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePreference("preferences")}
              className={preferences.preferences ? "bg-purple-600 text-white border-purple-600" : ""}
            >
              {preferences.preferences ? "Activadas" : "Desactivadas"}
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="text-sm">
              <div className="font-medium">Marketing</div>
              <div className="text-xs text-muted-foreground">Contenido personalizado</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePreference("marketing")}
              className={preferences.marketing ? "bg-orange-600 text-white border-orange-600" : ""}
            >
              {preferences.marketing ? "Activadas" : "Desactivadas"}
            </Button>
          </div>

          <div className="text-[11px] text-muted-foreground pt-1">
            Consulta la <a href="/politica-cookies" className="underline">Política de Cookies</a> y la <a href="/politica-privacidad" className="underline">Política de Privacidad</a>.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
          <Button variant="outline" onClick={() => { acceptNecessary(); setOpen(false); }}>Solo necesarias</Button>
          <Button variant="outline" onClick={handleSavePreferences}>Guardar</Button>
          <Button onClick={() => { acceptAll(); setOpen(false); }}>
            Aceptar todas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
