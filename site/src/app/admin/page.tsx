"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Utilidades compartidas para exportación CSV
function escapeCsvGlobal(value: string): string {
  return '"' + value.replaceAll('"', '""') + '"';
}

function downloadCSVGlobal(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type Review = { id?: number; author: string; rating: number; content?: string; featured?: boolean; context?: string; slug?: string };
type Faq = { id?: number; context: string; slug: string; question: string; answer: string };

type ServiceRow = { slug: string; name: string; title: string; description: string; intro: string; keywords?: string[] };
type ServiceForm = { slug: string; name: string; title: string; description: string; intro: string; keywords: string };

type AirportRow = { slug: string; name: string; city?: string; code?: string; intro: string; description: string; keywords?: string[] };
type AirportForm = { slug: string; name: string; city: string; code: string; intro: string; description: string; keywords: string };

type StationRow = { slug: string; name: string; city?: string; type: "tren" | "bus"; intro: string; description: string; keywords?: string[] };
type StationForm = { slug: string; name: string; city: string; type: "tren" | "bus"; intro: string; description: string; keywords: string };

type GalleryRow = { id?: number; url: string; alt?: string; position?: number; active?: boolean };
type GalleryForm = { url: string; alt: string; position: number; active: boolean };

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const headers = useMemo<Record<string, string>>(() => {
    const h: Record<string, string> = {};
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }, [token]);
  const [active, setActive] = useState<"services" | "airports" | "stations" | "reviews" | "faqs" | "gallery">("services");

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  function saveToken() {
    setToken(tokenInput.trim());
    localStorage.setItem("admin_token", tokenInput.trim());
  }

  if (!token) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Administración</h1>
        <p className="mt-2 text-sm text-muted-foreground">Introduce tu token de administrador para continuar.</p>
        <div className="mt-4 flex gap-2">
          <Input placeholder="Token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
          <Button onClick={saveToken}>Acceder</Button>
        </div>
      </main>
    );
  }

  return (
    <ToastProvider>
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b py-3">
        <div className="flex flex-wrap gap-2">
          {([
            { key: "services", label: "Servicios" },
            { key: "airports", label: "Aeropuertos" },
            { key: "stations", label: "Estaciones" },
            { key: "gallery", label: "Galería" },
            { key: "reviews", label: "Reviews" },
            { key: "faqs", label: "FAQs" },
          ] as const).map(({ key, label }) => (
            <Button key={key} variant={active === key ? "default" : "outline"} onClick={() => setActive(key)}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {active === "services" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Servicios</h2>
          <ServicesAdmin headers={headers} />
        </section>
      )}
      {active === "airports" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Aeropuertos</h2>
          <AirportsAdmin headers={headers} />
        </section>
      )}
      {active === "stations" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Estaciones</h2>
          <StationsAdmin headers={headers} />
        </section>
      )}
      {active === "gallery" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Galería</h2>
          <GalleryAdmin headers={headers} />
        </section>
      )}
      {active === "reviews" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <ReviewsAdmin headers={headers} />
        </section>
      )}
      {active === "faqs" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">FAQs</h2>
          <FaqsAdmin headers={headers} />
        </section>
      )}
    </main>
    </ToastProvider>
  );
}

function SeedControls({ headers }: { headers: Record<string, string> }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  async function runAll() {
    setLoading(true);
    setMsg("");
    try {
      const a = await fetch("/api/admin/seed", { method: "POST", headers });
      const b = await fetch("/api/admin/seed/gallery", { method: "POST", headers });
      if (a.ok && b.ok) {
        setMsg("Contenido poblado correctamente.");
        setTimeout(() => location.reload(), 800);
      } else {
        setMsg("Alguna operación falló. Revisa variables y permisos.");
      }
    } catch (e) {
      setMsg("Error al poblar. Prueba de nuevo.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="border rounded-md p-3 bg-card/50">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Poblar contenido base (services, airports, stations, reviews, faqs y galería).</div>
        <Button onClick={runAll} disabled={loading}>{loading ? "Cargando…" : "Poblar contenido"}</Button>
      </div>
      {msg && <div className="mt-2 text-xs text-muted-foreground">{msg}</div>}
    </section>
  );
}

function ReviewsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Review[]>([]);
  const [form, setForm] = useState<Review>({ author: "", rating: 5, content: "", context: "home", slug: "" });
  const [notice, setNotice] = useState<string>("");
  const { toast } = useToast();
  // opciones para selects de slug
  const [serviceOptions, setServiceOptions] = useState<{ slug: string; name: string }[]>([]);
  const [airportOptions, setAirportOptions] = useState<{ slug: string; name: string }[]>([]);
  const [stationOptions, setStationOptions] = useState<{ slug: string; name: string }[]>([]);
  // filtros y selección múltiple
  const [filter, setFilter] = useState<"all" | "home" | "service" | "airport" | "station">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/reviews", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.reviews);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  // cargar opciones para selects
  const loadOptions = useCallback(async () => {
    try {
      const [s, a, t] = await Promise.all([
        fetch("/api/admin/services", { headers }).then((r) => r.json()),
        fetch("/api/admin/aeropuertos", { headers }).then((r) => r.json()),
        fetch("/api/admin/estaciones", { headers }).then((r) => r.json()),
      ]);
      if (s?.ok) setServiceOptions((s.services || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
      if (a?.ok) setAirportOptions((a.airports || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
      if (t?.ok) setStationOptions((t.stations || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
    } catch {
      // ignore
    }
  }, [headers]);
  useEffect(() => { void loadOptions(); }, [loadOptions]);

  const displayItems = useMemo(() => (filter === "all" ? items : items.filter((r) => r.context === filter)), [items, filter]);
  const allOnPageSelected = useMemo(
    () => displayItems.length > 0 && displayItems.every((r) => (r.id ? selectedIds.includes(r.id) : true)),
    [displayItems, selectedIds]
  );
  // CSV helpers: usa funciones globales

  function toggleRow(id?: number) {
    if (!id) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function toggleAll() {
    const ids = displayItems.map((r) => r.id).filter((x): x is number => typeof x === "number");
    if (ids.length === 0) return;
    setSelectedIds((prev) => (ids.every((id) => prev.includes(id)) ? prev.filter((id) => !ids.includes(id)) : Array.from(new Set([...prev, ...ids]))));
  }
  async function confirmRemoveSelected() {
    if (selectedIds.length === 0) return;
    setConfirmOpen(true);
  }
  async function removeSelected() {
    await Promise.all(selectedIds.map((id) => fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE", headers })));
    setSelectedIds([]);
    setConfirmOpen(false);
    toast("Reviews eliminadas", "success");
    load();
  }

  async function submit() {
    const resp = await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(form) });
    setNotice(resp.ok ? "Guardado" : "Error guardando");
    toast(resp.ok ? "Review guardada" : "Error guardando", resp.ok ? "success" : "error");
    setForm({ author: "", rating: 5, content: "", context: "home", slug: "" });
    load();
  }
  async function remove(id?: number) {
    if (!id) return;
    if (!confirm("¿Eliminar review?")) return;
    const resp = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE", headers });
    setNotice(resp.ok ? "Eliminado" : "Error eliminando");
    toast(resp.ok ? "Review eliminada" : "Error eliminando", resp.ok ? "success" : "error");
    load();
  }
  function edit(r: Review) {
    setForm({ id: r.id, author: r.author, rating: r.rating, content: r.content || "", featured: r.featured, context: r.context, slug: r.slug });
  }
  function resetForm() {
    setForm({ author: "", rating: 5, content: "", context: "home", slug: "" });
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          {notice && <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1">{notice}</div>}
          {form.id ? <div className="text-xs text-muted-foreground">Editando ID #{form.id}</div> : null}
          <Input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Input
            placeholder="Puntuación (1-5)"
            type="number"
            min={1}
            max={5}
            step={1}
            value={form.rating}
            onChange={(ev) => {
              const n = Number(ev.target.value);
              const clamped = Number.isFinite(n) ? Math.max(1, Math.min(5, n)) : 5;
              setForm({ ...form, rating: clamped });
            }}
          />
          <select
            className="h-10 rounded-md border border-input px-3 text-sm bg-background"
            value={form.context || "home"}
            onChange={(e) => setForm({ ...form, context: e.target.value as "home" | "service" | "airport" | "station", slug: e.target.value === "home" ? "" : form.slug })}
          >
            <option value="home">Inicio (home)</option>
            <option value="service">Servicios (camino, mensajería, aeropuerto)</option>
            <option value="airport">Transporte Aeropuerto (todas las subpáginas)</option>
            <option value="station">Estaciones</option>
          </select>
          {form.context && form.context !== "home" ? (
            <div className="grid gap-1">
              <label className="text-xs text-muted-foreground">
                {form.context === "service"
                  ? "Servicio"
                  : form.context === "airport"
                  ? "Aeropuerto (vacío = todos)"
                  : "Estación (vacío = todas)"}
              </label>
              <select
                className="h-10 rounded-md border border-input px-3 text-sm bg-background"
                value={form.slug || ""}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              >
                <option value="">{form.context === "service" ? "Selecciona un servicio" : "Todas"}</option>
                {form.context === "service" && serviceOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
                ))}
                {form.context === "airport" && airportOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
                ))}
                {form.context === "station" && stationOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
                ))}
              </select>
            </div>
          ) : null}
          <Textarea placeholder="Contenido" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{form.id ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {([
              { k: "all", l: "Todas" },
              { k: "home", l: "Home" },
              { k: "service", l: "Servicios" },
              { k: "airport", l: "Aeropuertos" },
              { k: "station", l: "Estaciones" },
            ] as const).map((o) => (
              <Button key={o.k} size="sm" variant={filter === o.k ? "default" : "outline"} onClick={() => setFilter(o.k)}>
                {o.l}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => {
                  const rows = displayItems.filter((r) => r.id && selectedIds.includes(r.id));
                  const headersCsv = ["author","rating","context","slug","content"];
                  const lines = rows.map((r) => [escapeCsvGlobal(r.author), r.rating, r.context || "", r.slug || "", escapeCsvGlobal(r.content || "")].join(","));
                  const csv = [headersCsv.join(","), ...lines].join("\n");
                  downloadCSVGlobal(csv, `reviews_${Date.now()}.csv`);
                }}>Exportar CSV</Button>
                <Button variant="destructive" onClick={confirmRemoveSelected}>Eliminar seleccionados</Button>
              </div>
            )}
          </div>
        </div>
        {displayItems.length === 0 ? (
          <div className="text-sm text-muted-foreground">No hay reviews publicadas.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left"><input type="checkbox" checked={allOnPageSelected} onChange={toggleAll} /></th>
                  <th className="px-3 py-2 text-left">Autor</th>
                  <th className="px-3 py-2 text-left">Puntuación</th>
                  <th className="px-3 py-2 text-left">Contexto</th>
                  <th className="px-3 py-2 text-left">Slug</th>
                  <th className="px-3 py-2 text-left">Contenido</th>
                  <th className="px-3 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2 align-top">
                      <input type="checkbox" checked={r.id ? selectedIds.includes(r.id) : false} onChange={() => toggleRow(r.id)} />
                    </td>
                    <td className="px-3 py-2 align-top font-medium">{r.author}</td>
                    <td className="px-3 py-2 align-top">{r.rating}/5</td>
                    <td className="px-3 py-2 align-top">{r.context}</td>
                    <td className="px-3 py-2 align-top">{r.slug || "—"}</td>
                    <td className="px-3 py-2 align-top max-w-[28rem]">{r.content}</td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => edit(r)}>Editar</Button>
                        <Button variant="outline" onClick={() => remove(r.id)}>Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="w-[420px]">
            <div className="px-6 py-4 border-b"><DialogTitle>Eliminar {selectedIds.length} reviews</DialogTitle></div>
            <div className="p-6 text-sm text-muted-foreground">Esta acción no se puede deshacer.</div>
            <div className="flex justify-end gap-2 px-6 pb-4">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={removeSelected}>Eliminar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function FaqsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Faq[]>([]);
  const [form, setForm] = useState<Faq>({ context: "service", slug: "", question: "", answer: "" });
  const [notice, setNotice] = useState<string>("");
  const { toast } = useToast();
  // filtros y selección múltiple
  const [filter, setFilter] = useState<"all" | "service" | "airport" | "station">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // opciones para selects de slug
  const [serviceOptions, setServiceOptions] = useState<{ slug: string; name: string }[]>([]);
  const [airportOptions, setAirportOptions] = useState<{ slug: string; name: string }[]>([]);
  const [stationOptions, setStationOptions] = useState<{ slug: string; name: string }[]>([]);
  // búsqueda/paginación
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/faqs", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.faqs);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  const loadOptions = useCallback(async () => {
    try {
      const [s, a, t] = await Promise.all([
        fetch("/api/admin/services", { headers }).then((r) => r.json()),
        fetch("/api/admin/aeropuertos", { headers }).then((r) => r.json()),
        fetch("/api/admin/estaciones", { headers }).then((r) => r.json()),
      ]);
      if (s?.ok) setServiceOptions((s.services || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
      if (a?.ok) setAirportOptions((a.airports || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
      if (t?.ok) setStationOptions((t.stations || []).map((x: { slug: string; name: string }) => ({ slug: x.slug, name: x.name })));
    } catch {
      // ignore
    }
  }, [headers]);
  useEffect(() => { void loadOptions(); }, [loadOptions]);

  const filtered = useMemo(() => {
    const byContext = filter === "all" ? items : items.filter((f) => f.context === filter);
    const q = query.trim().toLowerCase();
    const arr = q
      ? byContext.filter((f) => [f.question, f.answer, f.context, f.slug].some((v) => (v || "").toLowerCase().includes(q)))
      : byContext;
    return arr;
  }, [items, filter, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => filtered.slice(page * pageSize, page * pageSize + pageSize), [filtered, page]);
  const allOnPageSelected = useMemo(
    () => pageItems.length > 0 && pageItems.every((f) => (f.id ? selectedIds.includes(f.id) : true)),
    [pageItems, selectedIds]
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  function toggleRow(id?: number) {
    if (!id) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function toggleAll() {
    const ids = pageItems.map((f) => f.id).filter((x): x is number => typeof x === "number");
    if (ids.length === 0) return;
    setSelectedIds((prev) => (ids.every((id) => prev.includes(id)) ? prev.filter((id) => !ids.includes(id)) : Array.from(new Set([...prev, ...ids]))));
  }
  function confirmRemoveSelected() {
    if (selectedIds.length === 0) return;
    setConfirmOpen(true);
  }
  async function removeSelected() {
    await Promise.all(selectedIds.map((id) => fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE", headers })));
    setSelectedIds([]);
    setConfirmOpen(false);
    toast("FAQs eliminadas", "success");
    load();
  }

  async function submit() {
    const resp = await fetch("/api/admin/faqs", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(form) });
    setNotice(resp.ok ? "Guardado" : "Error guardando");
    toast(resp.ok ? "FAQ guardada" : "Error guardando", resp.ok ? "success" : "error");
    setForm({ context: "service", slug: "", question: "", answer: "" });
    load();
  }
  async function remove(id?: number) {
    if (!id) return;
    if (!confirm("¿Eliminar FAQ?")) return;
    const resp = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE", headers });
    setNotice(resp.ok ? "Eliminado" : "Error eliminando");
    toast(resp.ok ? "FAQ eliminada" : "Error eliminando", resp.ok ? "success" : "error");
    load();
  }
  function edit(f: Faq) {
    setForm({ id: f.id, context: f.context, slug: f.slug, question: f.question, answer: f.answer });
  }
  function resetForm() {
    setForm({ context: "service", slug: "", question: "", answer: "" });
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          {notice && <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1">{notice}</div>}
          {form.id ? <div className="text-xs text-muted-foreground">Editando ID #{form.id}</div> : null}
          <select
            className="h-10 rounded-md border border-input px-3 text-sm bg-background"
            value={form.context}
            onChange={(e) => setForm({ ...form, context: e.target.value as "service" | "airport" | "station", slug: e.target.value === "service" ? form.slug : form.slug })}
          >
            <option value="service">Servicio</option>
            <option value="airport">Aeropuerto</option>
            <option value="station">Estación</option>
          </select>
          <div className="grid gap-1">
            <label className="text-xs text-muted-foreground">
              {form.context === "service" ? "Servicio" : form.context === "airport" ? "Aeropuerto (vacío = todos)" : "Estación (vacío = todas)"}
            </label>
            <select
              className="h-10 rounded-md border border-input px-3 text-sm bg-background"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            >
              <option value="">{form.context === "service" ? "Selecciona un servicio" : "Todas"}</option>
              {form.context === "service" && serviceOptions.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
              ))}
              {form.context === "airport" && airportOptions.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
              ))}
              {form.context === "station" && stationOptions.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name || o.slug}</option>
              ))}
            </select>
          </div>
          <Input placeholder="Pregunta" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          <Textarea placeholder="Respuesta" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{form.id ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {([
              { k: "all", l: "Todas" },
              { k: "service", l: "Servicios" },
              { k: "airport", l: "Aeropuertos" },
              { k: "station", l: "Estaciones" },
            ] as const).map((o) => (
              <Button key={o.k} size="sm" variant={filter === o.k ? "default" : "outline"} onClick={() => { setFilter(o.k); setPage(0); }}>
                {o.l}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input className="max-w-xs" placeholder="Buscar..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
            <div className="text-xs text-muted-foreground">{filtered.length} resultados</div>
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => {
                  const rows = pageItems.filter((f) => f.id && selectedIds.includes(f.id));
                  const headersCsv = ["context","slug","question","answer"];
                  const lines = rows.map((r) => [r.context, r.slug || "", escapeCsvGlobal(r.question), escapeCsvGlobal(r.answer)].join(","));
                  const csv = [headersCsv.join(","), ...lines].join("\n");
                  downloadCSVGlobal(csv, `faqs_${Date.now()}.csv`);
                }}>Exportar CSV</Button>
                <Button variant="destructive" onClick={confirmRemoveSelected}>Eliminar seleccionados</Button>
              </div>
            )}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-sm text-muted-foreground">No hay FAQs publicadas.</div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left"><input type="checkbox" checked={allOnPageSelected} onChange={toggleAll} /></th>
                  <th className="px-3 py-2 text-left">Contexto</th>
                  <th className="px-3 py-2 text-left">Slug</th>
                  <th className="px-3 py-2 text-left">Pregunta</th>
                  <th className="px-3 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((f) => (
                  <tr key={f.id} className="border-t">
                    <td className="px-3 py-2 align-top"><input type="checkbox" checked={f.id ? selectedIds.includes(f.id) : false} onChange={() => toggleRow(f.id)} /></td>
                    <td className="px-3 py-2 align-top">{f.context}</td>
                    <td className="px-3 py-2 align-top">{f.slug || "—"}</td>
                    <td className="px-3 py-2 align-top max-w-[28rem] truncate">{f.question}</td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => edit(f)}>Editar</Button>
                        <Button variant="outline" onClick={() => remove(f.id)}>Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-end gap-2 p-2 border-t">
              <Button variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Anterior</Button>
              <div className="text-xs text-muted-foreground">Página {page + 1} / {totalPages}</div>
              <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Siguiente</Button>
            </div>
          </div>
        )}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="w-[420px]">
            <div className="px-6 py-4 border-b"><DialogTitle>Eliminar {selectedIds.length} FAQs</DialogTitle></div>
            <div className="p-6 text-sm text-muted-foreground">Esta acción no se puede deshacer.</div>
            <div className="flex justify-end gap-2 px-6 pb-4">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={removeSelected}>Eliminar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function ServicesAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [form, setForm] = useState<ServiceForm>({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
  // búsqueda/paginación/orden
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const [sortKey, setSortKey] = useState<"slug" | "name">("slug");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/services", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.services as ServiceRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/services?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  function edit(it: ServiceRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      title: it.title,
      description: it.description,
      intro: it.intro,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
  }
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? items.filter((it) => [it.slug, it.name, it.title].some((v) => (v || "").toLowerCase().includes(q)))
      : items;
  }, [items, query]);
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => sorted.slice(page * pageSize, page * pageSize + pageSize), [sorted, page]);
  function onSort(col: "slug" | "name") {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Input className="max-w-xs" placeholder="Buscar..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
          <div className="text-xs text-muted-foreground">{sorted.length} resultados</div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">
                  <button className="inline-flex items-center gap-1" onClick={() => onSort("slug")}>Slug {sortKey === "slug" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                </th>
                <th className="px-3 py-2 text-left">
                  <button className="inline-flex items-center gap-1" onClick={() => onSort("name")}>Nombre {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                </th>
                <th className="px-3 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((it) => (
                <tr key={it.slug} className="border-t">
                  <td className="px-3 py-2 align-top">{it.slug}</td>
                  <td className="px-3 py-2 align-top">{it.name}</td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                      <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end gap-2 p-2 border-t">
            <Button variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Anterior</Button>
            <div className="text-xs text-muted-foreground">Página {page + 1} / {totalPages}</div>
            <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AirportsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<AirportRow[]>([]);
  const [form, setForm] = useState<AirportForm>({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const [sortKey, setSortKey] = useState<"slug" | "name" | "city">("slug");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/aeropuertos", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.airports as AirportRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/aeropuertos", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/aeropuertos?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  function edit(it: AirportRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      city: it.city || "",
      code: it.code || "",
      intro: it.intro,
      description: it.description,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
  }
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? items.filter((it) => [it.slug, it.name, it.city, it.code].some((v) => (v || "").toLowerCase().includes(q)))
      : items;
  }, [items, query]);
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = String(a[sortKey] || "");
      const vb = String(b[sortKey] || "");
      const cmp = va.localeCompare(vb);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => sorted.slice(page * pageSize, page * pageSize + pageSize), [sorted, page]);
  function onSort(col: "slug" | "name" | "city") {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Input className="max-w-xs" placeholder="Buscar..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
          <div className="text-xs text-muted-foreground">{sorted.length} resultados</div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left"><button className="inline-flex items-center gap-1" onClick={() => onSort("slug")}>Slug {sortKey === "slug" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button></th>
                <th className="px-3 py-2 text-left"><button className="inline-flex items-center gap-1" onClick={() => onSort("name")}>Nombre {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button></th>
                <th className="px-3 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((it) => (
                <tr key={it.slug} className="border-t">
                  <td className="px-3 py-2 align-top">{it.slug}</td>
                  <td className="px-3 py-2 align-top">{it.name}</td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                      <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end gap-2 p-2 border-t">
            <Button variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Anterior</Button>
            <div className="text-xs text-muted-foreground">Página {page + 1} / {totalPages}</div>
            <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StationsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<StationRow[]>([]);
  const [form, setForm] = useState<StationForm>({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const [sortKey, setSortKey] = useState<"slug" | "name" | "city">("slug");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/estaciones", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.stations as StationRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/estaciones", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/estaciones?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  function edit(it: StationRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      city: it.city || "",
      type: it.type,
      intro: it.intro,
      description: it.description,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
  }
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? items.filter((it) => [it.slug, it.name, it.city, it.type].some((v) => (v || "").toLowerCase().includes(q)))
      : items;
  }, [items, query]);
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = String((sortKey === "city" ? a.city : sortKey === "name" ? a.name : a.slug) || "");
      const vb = String((sortKey === "city" ? b.city : sortKey === "name" ? b.name : b.slug) || "");
      const cmp = va.localeCompare(vb);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => sorted.slice(page * pageSize, page * pageSize + pageSize), [sorted, page]);
  function onSort(col: "slug" | "name" | "city") {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input
            placeholder="type (tren/bus)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value === "bus" ? "bus" : "tren" })}
          />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Input className="max-w-xs" placeholder="Buscar..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
          <div className="text-xs text-muted-foreground">{sorted.length} resultados</div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left"><button className="inline-flex items-center gap-1" onClick={() => onSort("slug")}>Slug {sortKey === "slug" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button></th>
                <th className="px-3 py-2 text-left"><button className="inline-flex items-center gap-1" onClick={() => onSort("name")}>Nombre {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button></th>
                <th className="px-3 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((it) => (
                <tr key={it.slug} className="border-t">
                  <td className="px-3 py-2 align-top">{it.slug}</td>
                  <td className="px-3 py-2 align-top">{it.name}</td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                      <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end gap-2 p-2 border-t">
            <Button variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Anterior</Button>
            <div className="text-xs text-muted-foreground">Página {page + 1} / {totalPages}</div>
            <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [form, setForm] = useState<GalleryForm>({ url: "", alt: "", position: 0, active: true });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/gallery", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.images as GalleryRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  async function onDropFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("file", f));
    fd.append("alt", form.alt);
    fd.append("position", String(form.position));
    fd.append("active", String(form.active));
    const resp = await fetch("/api/admin/gallery/upload", { method: "POST", headers: { ...headers }, body: fd });
    toast(resp.ok ? "Imágenes subidas" : "Error subiendo", resp.ok ? "success" : "error");
    setForm({ url: "", alt: "", position: 0, active: true });
    void load();
  }
  async function remove(id?: number) {
    if (!id) return;
    const resp = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE", headers });
    toast(resp.ok ? "Imagen eliminada" : "Error eliminando", resp.ok ? "success" : "error");
    load();
  }
  async function update(it: GalleryRow) {
    const resp = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(it) });
    toast(resp.ok ? "Imagen actualizada" : "Error actualizando", resp.ok ? "success" : "error");
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); onDropFiles(e.dataTransfer.files); }}
          >
            <p className="text-sm text-muted-foreground">Arrastra y suelta imágenes aquí o</p>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => onDropFiles(e.target.files)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Input placeholder="alt" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
            <Input placeholder="posición" type="number" value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="activa (true/false)" value={String(form.active)} onChange={(e) => setForm({ ...form, active: e.target.value === "true" })} />
            <Button variant="outline" onClick={() => setForm({ url: "", alt: "", position: 0, active: true })}>Limpiar</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.length === 0 && <div className="text-sm text-muted-foreground">No hay imágenes en la galería.</div>}
        {items.map((it, idx) => (
          <Card key={it.id ?? idx}>
            <CardContent className="p-4 grid gap-2">
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-16 shrink-0 border rounded overflow-hidden bg-muted">
                  {it.url ? (
                    <Image src={it.url} alt={it.alt || ""} fill sizes="96px" className="object-cover" />
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(it.url); toast("URL copiada", "success"); }}>Copiar URL</Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="alt" value={it.alt || ""} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, alt: e.target.value } : x))} />
                <Input placeholder="posición" type="number" value={it.position ?? 0} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, position: Number(e.target.value) } : x))} />
                <Input placeholder="activa (true/false)" value={String(it.active ?? true)} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, active: e.target.value === "true" } : x))} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => remove(it.id)}>Eliminar</Button>
                <Button onClick={() => update(it)}>Guardar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}




