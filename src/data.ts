import { Plan, Testimonial, FAQItem } from "./types";

export const PLANS: Plan[] = [
  {
    id: "mensal",
    title: "PLANO MENSAL",
    price: 29.90,
    durationText: "/mês",
    savingsText: "Preço cheio — sem desconto",
    ctaText: "Começar Agora",
    features: [
      "Filmes, séries, novelas e esportes ao vivo",
      "2 telas simultâneas",
      "Qualidade Ultra HD 4K",
      "Suporte via WhatsApp",
      "Cancele a qualquer momento"
    ],
    pixCode: "00020101021226740014BR.GOV.BCB.PIX0124ultraflix-acesso@jim.com0224PLANO MENSAL - ULTRAFLIX520400005303986540529.905802BR5924JOAO PAES DE CASTRO NETO6008TERESINA62290525QRCCPsNsuXdq72keJfD5r8DFK6304FFCB"
  },
  {
    id: "semestral",
    title: "PLANO SEMESTRAL",
    price: 55.00,
    durationText: " / 6 meses",
    savingsText: "Mais vendido • Economize mais",
    badge: "MAIS VENDIDO",
    recommended: true,
    anchorPrice: 179.40,
    perMonthLabel: "R$ 9,17/mês",
    savingsPercent: 69,
    perDayLabel: "R$ 0,31 por dia",
    ctaText: "Quero o Mais Vendido",
    features: [
      "Tudo liberado: filmes, séries, novelas e Copa 2026",
      "4 telas simultâneas — família toda assiste junto",
      "Qualidade Ultra HD 4K",
      "Suporte VIP via WhatsApp",
      "6 meses sem preocupação com mensalidade"
    ],
    pixCode: "00020101021226720014BR.GOV.BCB.PIX0124ultraflix-acesso@jim.com0222Pagamento ultraflix-ac520400005303986540555.005802BR5924JOAO PAES DE CASTRO NETO6008TERESINA62290525QRCCrYcAMi1frKJXgcPVODJcU6304519D"
  },
  {
    id: "anual",
    title: "PLANO ANUAL",
    price: 115.00,
    durationText: " / ano",
    savingsText: "Maior economia de todas",
    badge: "MELHOR OFERTA",
    anchorPrice: 358.80,
    perMonthLabel: "R$ 9,58/mês",
    savingsPercent: 68,
    perDayLabel: "R$ 0,32 por dia",
    ctaText: "Quero a Maior Economia",
    features: [
      "Tudo liberado: filmes, séries, novelas e Copa 2026",
      "5 telas simultâneas — a casa inteira conectada",
      "Qualidade Ultra HD 4K",
      "Suporte Ultra VIP 24h",
      "1 ano inteiro pagando uma única vez"
    ],
    pixCode: "00020101021226720014BR.GOV.BCB.PIX0124ultraflix-acesso@jim.com0222Pagamento ultraflix-ac5204000053039865406115.005802BR5924JOAO PAES DE CASTRO NETO6008TERESINA62290525QRCCMrRp969CfdmAyxb3vkAWo6304EA7A"
  }
];

export const BENEFITS = [
  {
    title: "Fácil de usar",
    description: "Design limpo e intuitivo. Basta abrir o aplicativo e dar o play nos seus conteúdos favoritos sem qualquer burocracia.",
    iconName: "PlayCircle"
  },
  {
    title: "Compatível com diversos dispositivos",
    description: "Assista onde estiver. Transmissão otimizada para Smart TVs, celulares, computadores, tablets ou TV Box.",
    iconName: "MonitorSmartphone"
  },
  {
    title: "Interface simples",
    description: "Categorias organizadas e ferramentas de busca rápida. Encontre o que deseja assistir em menos de 3 segundos.",
    iconName: "Layout"
  },
  {
    title: "Atendimento rápido",
    description: "Time de suporte dedicado em português via WhatsApp para tirar dúvidas e ativar seu acesso em tempo recorde.",
    iconName: "MessageSquareText"
  },
  {
    title: "Planos flexíveis",
    description: "Assinaturas simplificadas sem fidelidade ou contratos abusivos. Total liberdade para escolher e alterar quando quiser.",
    iconName: "Sliders"
  }
];

export const DEVICES = [
  {
    name: "Smart TV",
    details: "Samsung, LG, Philips, TCL, Android TV, Roku",
    iconName: "Tv"
  },
  {
    name: "Celular",
    details: "Aplicativos leves para Android e iOS",
    iconName: "Smartphone"
  },
  {
    name: "Tablet",
    details: "Excelente experiência de tela cheia no iPad e Android",
    iconName: "Tablet"
  },
  {
    name: "Computador",
    details: "Assista direto no navegador com máxima estabilidade",
    iconName: "Laptop"
  },
  {
    name: "TV Box",
    details: "Fire Stick, Chromecast, Mi Box, Apple TV, etc.",
    iconName: "Cpu"
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Escolha seu plano",
    description: "Selecione a melhor assinatura para sua rotina, com as telas simultâneas ideais para você ou sua família."
  },
  {
    step: "02",
    title: "Faça seu cadastro",
    description: "Preencha seus dados de contato de forma ultra-rápida e segura na nossa plataforma de checkout, usando apenas nome e WhatsApp."
  },
  {
    step: "03",
    title: "Comece sua experiência",
    description: "Pronto! O acesso é enviado na mesma hora pelo WhatsApp. É só logar e aproveitar o catálogo completo."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ricardo Mendes",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    location: "São Paulo - SP",
    rating: 5,
    comment: "Simplesmente espetacular! Comprei o plano anual e o acesso chegou no meu WhatsApp em menos de 1 minuto. A qualidade de imagem é incrível na minha Smart TV 4K. Recomendo muito!",
    date: "Ontem",
    verified: true
  },
  {
    id: "t2",
    name: "Juliana Castela",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    location: "Belo Horizonte - MG",
    rating: 5,
    comment: "Eu estava com receio de ser difícil de configurar, mas o suporte no WhatsApp me enviou um tutorial passo a passo em vídeo. Funcionou perfeitamente no meu Fire Stick e no celular. Interface super amigável!",
    date: "Há 2 dias",
    verified: true
  },
  {
    id: "t3",
    name: "Marcos Vinícius",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    location: "Curitiba - PR",
    rating: 5,
    comment: "Custo benefício imbatível. Consigo assistir aos meus esportes favoritos e meus filhos assistem aos desenhos nas outras telas ao mesmo tempo, sem travar nada. Melhor aquisição do ano.",
    date: "Há 4 dias",
    verified: true
  },
  {
    id: "t4",
    name: "Maria das Graças",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
    location: "Fortaleza - CE",
    rating: 5,
    comment: "Assisto minhas novelas na hora que eu quero, sem depender de horário de TV, e meu marido vê os jogos na outra tela. Pagamos menos que uma pizza pelo semestre inteiro!",
    date: "Hoje",
    verified: true
  },
  {
    id: "t5",
    name: "André Souza",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80",
    location: "Recife - PE",
    rating: 5,
    comment: "Peguei justamente pra Copa e não travou um jogo sequer. Em 4K parece que tô dentro do estádio. Já indiquei pra todo mundo do trabalho.",
    date: "Há 1 dia",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Funciona na minha televisão?",
    answer: "Sim! A Ultraflix é compatível com todas as Smart TVs (Samsung, LG, TCL, AOC, etc.), além de aparelhos como Chromecast, Fire TV Stick, Mi Box e qualquer TV Box rodando Android."
  },
  {
    id: "faq2",
    question: "Como recebo meu acesso?",
    answer: "A ativação é 100% instantânea. Assim que o pagamento do plano for confirmado, os dados de login e instruções detalhadas são disparados automaticamente para o seu WhatsApp cadastrado."
  },
  {
    id: "faq3",
    question: "Posso usar no celular?",
    answer: "Com certeza! Oferecemos suporte completo para celulares e tablets Android e iOS. Você pode assistir em trânsito com total conforto e economia de dados móveis."
  },
  {
    id: "faq4",
    question: "Tenho suporte caso precise de ajuda?",
    answer: "Sim, esse é o nosso maior diferencial! Temos uma equipe de suporte humanizado via WhatsApp disponível diariamente para auxiliar você em qualquer configuração ou dúvida."
  },
  {
    id: "faq5",
    question: "O pagamento via Pix é seguro?",
    answer: "Totalmente. O Pix é o meio de pagamento oficial do Banco Central do Brasil. Você paga direto pelo app do seu banco, sem informar cartão ou dados sensíveis no site, e a confirmação é imediata."
  },
  {
    id: "faq6",
    question: "Quanto tempo demora para ativar meu acesso?",
    answer: "Em média 5 minutos. Assim que você realiza o Pix e envia o comprovante pelo WhatsApp, nossa equipe libera seu login na hora e te acompanha na instalação, passo a passo."
  },
  {
    id: "faq7",
    question: "E se eu não gostar? Tem garantia?",
    answer: "Sim! Você tem 7 dias de garantia. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do valor pago, sem burocracia."
  },
  {
    id: "faq8",
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "Trabalhamos com Pix, o meio de pagamento oficial do Banco Central: aprovação na hora, sem precisar cadastrar cartão de crédito e sem mensalidade recorrente escondida. Você paga uma vez e usa pelo período contratado."
  }
];
