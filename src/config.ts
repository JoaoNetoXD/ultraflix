// Configuração central do site — altere aqui e reflete em toda a página.

// Número do WhatsApp de suporte/ativação (somente dígitos, com DDI 55).
// >>> TROQUE pelo seu número real antes de rodar anúncios. <<<
export const WHATSAPP_NUMBER = "5511999999999";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
