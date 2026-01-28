"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastVariant = "success" | "error" | "info";
type ToastItem = { id: string; message: string; variant: ToastVariant };

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((arr) => [...arr, { id, message, variant }]);
    setTimeout(() => setToasts((arr) => arr.filter((t) => t.id !== id)), 3000);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastViewport({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts || toasts.length === 0) return null;
  return (
    <div className="fixed right-3 bottom-3 z-50 grid gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`border rounded-md px-3 py-2 text-sm shadow bg-background ${
            t.variant === "success" ? "border-green-300 text-green-800 bg-green-50" :
            t.variant === "error" ? "border-red-300 text-red-800 bg-red-50" :
            "border-border text-foreground"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}


