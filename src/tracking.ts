// Tracking Meta: pixel do navegador + espelho na Conversions API (server-side).
// Mesmo eventID nos dois canais -> a Meta deduplica e conta 1 evento.
// Nunca deixa tracking derrubar a página (try/catch em tudo).

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PixelEvent =
  | "ViewContent"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Lead"
  | "Purchase";

interface TrackOptions {
  /** Telefone do cliente (vai hasheado para a CAPI — melhora o match) */
  phone?: string;
}

function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // fallback abaixo
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCookie(name: string): string | undefined {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
  } catch {
    return undefined;
  }
}

function sendToCapi(eventName: string, eventId: string, params?: Record<string, unknown>, opts?: TrackOptions) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // sobrevive à navegação p/ WhatsApp
      body: JSON.stringify({
        eventName,
        eventId,
        value: params?.value,
        currency: params?.currency,
        contentName: params?.content_name,
        phone: opts?.phone,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        sourceUrl: window.location.href,
      }),
    }).catch(() => {});
  } catch {
    // silencioso: em dev (sem /api) ou rede falha, o pixel do navegador cobre
  }
}

export function trackPixel(event: PixelEvent, params?: Record<string, unknown>, opts?: TrackOptions) {
  const eventId = newEventId();
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", event, params, { eventID: eventId });
    }
  } catch {
    // segue para a CAPI mesmo assim
  }
  sendToCapi(event, eventId, params, opts);
}

/** Evento customizado (ex: ViewPlans) — útil para públicos de remarketing */
export function trackCustomPixel(event: string, params?: Record<string, unknown>) {
  const eventId = newEventId();
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", event, params, { eventID: eventId });
    }
  } catch {
    // segue para a CAPI mesmo assim
  }
  sendToCapi(event, eventId, params);
}
