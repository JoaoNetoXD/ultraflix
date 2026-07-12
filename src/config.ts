// Configuração central do site — altere aqui e reflete em toda a página.

// Número do WhatsApp de suporte/ativação (somente dígitos, com DDI 55).
export const WHATSAPP_NUMBER = "5586994441566";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
