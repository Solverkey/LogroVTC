import { Resend } from "resend";

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

function buildEmailHtml(data: ContactPayload): string {
  const rows = [
    ["Nombre", data.nombre],
    ["Email", data.email],
    ["Teléfono", data.telefono],
    ["Origen", data.origen],
    ["Destino", data.destino],
    ["Fecha", data.fecha],
    ["Hora", data.hora],
    ["Pasajeros", data.pasajeros],
    ["Equipaje", data.equipaje],
    ["Tipo", data.tipo],
    ["Peso", data.peso],
    ["Bicicletas", data.bicicletas],
    ["Detalles", data.detalles],
    ["Formulario", data.source || "web"],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:bold;white-space:nowrap;background:#f3f4f6;">${label}</td><td style="padding:6px 12px;">${String(value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:20px;">
  <h2 style="color:#1d4ed8;">Nueva solicitud de contacto – LogroVTC</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${rows}
  </table>
</body>
</html>`;
}

function buildEmailText(data: ContactPayload): string {
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
    `Formulario: ${data.source || "web"}`,
  ];
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
      try {
        const form = await req.formData();
        data = formDataToObject(form);
      } catch {
        try {
          data = (await req.json()) as ContactPayload;
        } catch {}
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Contact API] RESEND_API_KEY no configurada");
      return new Response(
        JSON.stringify({ ok: false, error: "Email no configurado" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.MAIL_TO || "info@logrovtc.com";
    const from = process.env.RESEND_FROM || "LogroVTC <noreply@logrovtc.com>";
    const subject = `Nueva solicitud de contacto - ${data.nombre || "Sin nombre"}`;

    console.log("[Contact API] Enviando email a:", to);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
      replyTo: data.email || undefined,
    });

    if (error) {
      console.error("[Contact API] Error de Resend:", error);
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("[Contact API] Email enviado correctamente");
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[Contact API] Error enviando email:", e);
    const errorMessage = e instanceof Error ? e.message : "Error desconocido";
    return new Response(
      JSON.stringify({ ok: false, error: `Error enviando email: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
