import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  origen?: string;
  destino?: string;
  fecha?: string;
  hora?: string;
  pasajeros?: string | number;
  equipaje?: string;
  detalles?: string;
  tipo?: string;
  peso?: string;
  bicicletas?: string;
  source?: string;
};

function formDataToObject(form: FormData): ContactPayload {
  const obj: Record<string, string> = {};
  for (const [k, v] of form.entries()) obj[k] = String(v);
  return obj as ContactPayload;
}

function buildEmailText(data: ContactPayload, userAgent?: string): string {
  const lines = [
    `Nombre: ${data.nombre || "-"}`,
    `Email: ${data.email || "-"}`,
    `Teléfono: ${data.telefono || "-"}`,
    `Origen: ${data.origen || "-"}`,
    `Destino: ${data.destino || "-"}`,
    `Fecha: ${data.fecha || "-"}`,
    `Hora: ${data.hora || "-"}`,
    `Pasajeros: ${data.pasajeros || "-"}`,
    `Equipaje: ${data.equipaje || "-"}`,
    `Tipo: ${data.tipo || "-"}`,
    `Peso: ${data.peso || "-"}`,
    `Bicicletas: ${data.bicicletas || "-"}`,
    "",
    `Detalles:\n${data.detalles || "-"}`,
    "",
    `Origen del formulario: ${data.source || "web"}`,
    userAgent ? `User-Agent: ${userAgent}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: ContactPayload = {};
    if (contentType.includes("application/json")) {
      data = (await req.json()) as ContactPayload;
    } else if (contentType.includes("form")) {
      const form = await req.formData();
      data = formDataToObject(form);
    } else {
      // Intentar ambos por si acaso
      try {
        const form = await req.formData();
        data = formDataToObject(form);
      } catch {
        try { data = (await req.json()) as ContactPayload; } catch {}
      }
    }

    const to = process.env.MAIL_TO || "info@logrovtc.com";
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || `LogroVTC <info@logrovtc.com>`;

    if (!host || !user || !pass) {
      console.error("[Contact API] SMTP no configurado:", { host: !!host, user: !!user, pass: !!pass });
      return new Response(JSON.stringify({ ok: false, error: "SMTP no configurado" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false, // Permitir certificados autofirmados
      },
    });

    const subject = `Nueva solicitud de contacto - ${data.nombre || "Sin nombre"}`;
    const text = buildEmailText(data, req.headers.get("user-agent") || undefined);

    console.log("[Contact API] Enviando email a:", to, "desde:", from);
    await transporter.sendMail({ from, to, subject, text });
    console.log("[Contact API] Email enviado correctamente");

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error("[Contact API] Error enviando email:", e);
    const errorMessage = e instanceof Error ? e.message : "Error desconocido";
    return new Response(JSON.stringify({ ok: false, error: `Error enviando email: ${errorMessage}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}



