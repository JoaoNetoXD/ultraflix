// Configuração central do site — altere aqui e reflete em toda a página.

// Número do WhatsApp de suporte/ativação (somente dígitos, com DDI 55).
export const WHATSAPP_NUMBER = "5586994441566";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Mensagem padrão do funil: pedir o teste grátis de 30 minutos.
export const TRIAL_MESSAGE =
  "Olá! Vim pelo site da ULTRAFLIX e quero o TESTE GRÁTIS de 30 minutos. Pode liberar? 🎬";

export const TRIAL_WHATSAPP_LINK = buildWhatsAppLink(TRIAL_MESSAGE);

// Mensagem quando o cliente já escolheu um plano na página.
export function buildPlanWhatsAppLink(planTitle: string, priceLabel: string): string {
  return buildWhatsAppLink(
    `Olá! Vim pelo site da ULTRAFLIX e me interessei pelo ${planTitle} (${priceLabel}). Quero começar com o teste grátis de 30 minutos! 🎬`
  );
}
