// Configuração central do site — altere aqui e reflete em toda a página.

// Números do WhatsApp de suporte/ativação (somente dígitos, com DDI 55).
// Os leads são divididos 50/50 entre os dois números, alternando por botão.
export const WHATSAPP_NUMBERS = ["5586994441566", "5586994162671"] as const;

export function buildWhatsAppLink(message: string, numberIndex = 0): string {
  const number = WHATSAPP_NUMBERS[numberIndex % WHATSAPP_NUMBERS.length];
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Mensagem padrão do funil: pedir o teste grátis de 30 minutos.
export const TRIAL_MESSAGE =
  "Olá! Vim pelo site da ULTRAFLIX e quero o TESTE GRÁTIS de 30 minutos. Pode liberar? 🎬";

// Um link de teste por número — cada botão fixo da página usa um dos dois.
export const TRIAL_WHATSAPP_LINK_A = buildWhatsAppLink(TRIAL_MESSAGE, 0);
export const TRIAL_WHATSAPP_LINK_B = buildWhatsAppLink(TRIAL_MESSAGE, 1);

// Mensagem quando o cliente já escolheu um plano na página.
export function buildPlanWhatsAppLink(planTitle: string, priceLabel: string, numberIndex = 0): string {
  return buildWhatsAppLink(
    `Olá! Vim pelo site da ULTRAFLIX e me interessei pelo ${planTitle} (${priceLabel}). Quero começar com o teste grátis de 30 minutos! 🎬`,
    numberIndex
  );
}

// Mensagem quando o cliente clicou numa categoria/gênero de interesse.
// O atendente já recebe o lead sabendo o que ele quer assistir.
export function buildInterestWhatsAppLink(interest: string, numberIndex = 0): string {
  return buildWhatsAppLink(
    `Olá! Vim pelo site da ULTRAFLIX e quero o teste grátis de 30 minutos. O que mais me interessa é: ${interest} 🎬`,
    numberIndex
  );
}
