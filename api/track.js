// Vercel Serverless Function: espelha eventos do site para a Meta Conversions API.
// Token fica em variável de ambiente (META_CAPI_TOKEN) — nunca no código.
import crypto from "node:crypto";

const PIXEL_ID = "1341576367455992";
const ALLOWED_EVENTS = new Set([
  "ViewContent",
  "InitiateCheckout",
  "AddPaymentInfo",
  "Lead",
  "Purchase",
  "ViewPlans",
]);

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "missing_token" });
  }

  try {
    const {
      eventName,
      eventId,
      value,
      currency,
      contentName,
      phone,
      fbp,
      fbc,
      sourceUrl,
    } = req.body || {};

    if (!eventName || !eventId || !ALLOWED_EVENTS.has(eventName)) {
      return res.status(400).json({ error: "bad_request" });
    }

    const userData = {
      client_ip_address:
        (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || undefined,
      client_user_agent: req.headers["user-agent"] || undefined,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
    };

    // Telefone: normaliza para E.164 BR e envia hasheado (exigência da Meta)
    if (phone) {
      const digits = String(phone).replace(/\D/g, "");
      if (digits.length >= 10) {
        const normalized = digits.startsWith("55") ? digits : `55${digits}`;
        userData.ph = [sha256(normalized)];
      }
    }

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: String(eventId), // mesmo ID do pixel do navegador -> Meta deduplica
      action_source: "website",
      event_source_url: sourceUrl || "https://ultraflix-oficial.vercel.app/",
      user_data: userData,
      custom_data: {
        value: typeof value === "number" ? value : undefined,
        currency: currency || undefined,
        content_name: contentName || undefined,
      },
    };

    const fbRes = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [event], access_token: token }),
      }
    );
    const json = await fbRes.json();

    if (!fbRes.ok) {
      // Não vaza detalhes do erro da Meta para o cliente
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true, received: json.events_received });
  } catch {
    return res.status(500).json({ error: "capi_failed" });
  }
}
