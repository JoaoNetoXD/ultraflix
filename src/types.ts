export interface Plan {
  id: string;
  title: string;
  price: number;
  durationText: string;
  features: string[];
  badge?: string;
  savingsText?: string;
  recommended?: boolean;
  /** Preço de referência (ex: 6x o plano mensal) exibido riscado */
  anchorPrice?: number;
  /** Equivalente mensal, ex: "R$ 9,17/mês" */
  perMonthLabel?: string;
  /** Desconto percentual vs plano mensal */
  savingsPercent?: number;
  /** Custo por dia, ex: "R$ 0,31/dia" */
  perDayLabel?: string;
  /** Texto do botão de compra, ex: "Quero o Mais Vendido" */
  ctaText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl?: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
