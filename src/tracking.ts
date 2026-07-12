// Wrapper seguro para o Meta Pixel (fbq). Não quebra se o pixel não carregar
// (ex: bloqueador de anúncios ou SEU_PIXEL_ID ainda não configurado).

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

export function trackPixel(event: PixelEvent, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", event, params);
    }
  } catch {
    // nunca deixar tracking derrubar a página
  }
}

/** Evento customizado (ex: ViewPlans) — útil para públicos de remarketing */
export function trackCustomPixel(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", event, params);
    }
  } catch {
    // nunca deixar tracking derrubar a página
  }
}
