import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Clapperboard,
  Popcorn,
  Heart,
  Trophy,
  Flame,
  Tv,
  Smartphone,
  Cpu,
  Laptop,
  User,
  Users,
  Home,
  Wallet,
  BadgeDollarSign,
  PiggyBank,
  Ban,
  WifiOff,
  Layers,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Zap,
  Gift,
  Star,
  Loader2,
  Sparkles,
  Lightbulb,
  Play,
} from "lucide-react";
import { PLANS } from "../data";
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from "../config";
import { trackPixel, trackCustomPixel, trackWhatsAppClick } from "../tracking";

/* ============================================================
   QUIZ FUNNEL ULTRAFLIX
   Objetivo: qualificar + educar o lead ANTES de chegar no WhatsApp.
   O atendente recebe a mensagem já com perfil completo do cliente.
   Abrir de qualquer lugar: openQuiz("fonte") ou acessando #quiz.
   ============================================================ */

const OPEN_QUIZ_EVENT = "ultraflix:open-quiz";

export function openQuiz(source: string = "direct") {
  window.dispatchEvent(new CustomEvent(OPEN_QUIZ_EVENT, { detail: { source } }));
}

/* ---------- Tipos e dados das perguntas ---------- */

interface QuizOption {
  id: string;
  label: string;
  sub?: string;
  icon: React.ElementType;
  emoji?: string;
}

interface QuizStep {
  id: string;
  kicker: string; // micro-copy acima da pergunta
  question: string;
  fact: string; // 💡 fato educativo mostrado junto da pergunta
  options: QuizOption[];
}

const STEPS: QuizStep[] = [
  {
    id: "interesse",
    kicker: "Pergunta 1 — Seu gosto",
    question: "O que você MAIS quer assistir?",
    fact: "A Ultraflix reúne filmes, séries, novelas e esportes ao vivo num app só — sem pular de assinatura em assinatura.",
    options: [
      { id: "filmes", label: "Filmes de cinema", sub: "Lançamentos em 4K", icon: Clapperboard },
      { id: "series", label: "Séries completas", sub: "Todas as temporadas", icon: Popcorn },
      { id: "novelas", label: "Novelas", sub: "Assista na hora que quiser", icon: Heart },
      { id: "futebol", label: "Futebol ao vivo", sub: "Brasileirão, Libertadores e Champions", icon: Trophy },
      { id: "tudo", label: "TUDO isso!", sub: "A escolha de 8 em cada 10 clientes", icon: Flame },
    ],
  },
  {
    id: "aparelho",
    kicker: "Pergunta 2 — Compatibilidade",
    question: "Onde você vai assistir?",
    fact: "Funciona em Samsung, LG, TCL, Fire Stick, Chromecast, celular e computador. No teste grátis você já confere no SEU aparelho.",
    options: [
      { id: "smarttv", label: "Smart TV", sub: "Samsung, LG, TCL, Roku…", icon: Tv },
      { id: "celular", label: "Celular ou tablet", sub: "Android e iPhone", icon: Smartphone },
      { id: "tvbox", label: "TV Box / Fire Stick", sub: "Chromecast, Mi Box…", icon: Cpu },
      { id: "computador", label: "Computador", sub: "Direto no navegador", icon: Laptop },
    ],
  },
  {
    id: "pessoas",
    kicker: "Pergunta 3 — Sua casa",
    question: "Quantas pessoas assistem aí na sua casa?",
    fact: "Nossos planos têm até 5 telas simultâneas: cada um assiste o que quiser, ao mesmo tempo, sem travar.",
    options: [
      { id: "so_eu", label: "Só eu", sub: "Acesso individual", icon: User },
      { id: "duas", label: "Eu + 1 pessoa", sub: "Casal ou dupla", icon: Users },
      { id: "familia", label: "3 ou 4 pessoas", sub: "Família conectada", icon: Home },
      { id: "casa_cheia", label: "5 ou mais", sub: "Casa cheia!", icon: Home },
    ],
  },
  {
    id: "gasto",
    kicker: "Pergunta 4 — Seu bolso",
    question: "Quanto você gasta HOJE por mês com streaming ou TV?",
    fact: "A média brasileira passa de R$ 80/mês somando streamings. Na Ultraflix, tudo sai a partir de R$ 0,36 por dia.",
    options: [
      { id: "nada", label: "Nada ainda", sub: "Uso os gratuitos", icon: Ban },
      { id: "ate30", label: "Até R$ 30", sub: "1 assinatura", icon: Wallet },
      { id: "30a60", label: "R$ 30 a R$ 60", sub: "2 assinaturas", icon: BadgeDollarSign },
      { id: "60mais", label: "Mais de R$ 60", sub: "Várias assinaturas 😱", icon: PiggyBank },
    ],
  },
  {
    id: "dor",
    kicker: "Pergunta 5 — Sinceridade",
    question: "O que mais te IRRITA nos streamings de hoje?",
    fact: "É por isso que aqui é diferente: pagamento único via Pix, sem cartão, sem mensalidade escondida e suporte humano no WhatsApp.",
    options: [
      { id: "preco", label: "Preço somando todo mês", sub: "Assinatura em cima de assinatura", icon: CreditCard },
      { id: "espalhado", label: "Conteúdo espalhado", sub: "Cada série num app diferente", icon: Layers },
      { id: "travando", label: "Travamento e qualidade ruim", sub: "Imagem embaçada, buffering…", icon: WifiOff },
      { id: "cartao", label: "Cadastrar cartão de crédito", sub: "Cobrança recorrente surpresa", icon: Ban },
    ],
  },
  {
    id: "esportes",
    kicker: "Pergunta 6 — Esportes ao vivo",
    question: "Brasileirão e Libertadores ao vivo em 4K: você quer?",
    fact: "Todos os jogos do Brasileirão, Libertadores e Champions ao vivo em 4K — e ainda UFC e NBA, sem pagar nada a mais.",
    options: [
      { id: "quero", label: "QUERO MUITO! ⚽", sub: "Todos os jogos em 4K", icon: Trophy },
      { id: "talvez", label: "Talvez, alguns jogos", sub: "Os do meu time pelo menos", icon: Star },
      { id: "nao_ligo", label: "Não ligo pra futebol", sub: "Prefiro filmes e séries", icon: Popcorn },
    ],
  },
  {
    id: "teste",
    kicker: "Última pergunta!",
    question: "Quer seu TESTE GRÁTIS de 30 minutos liberado agora?",
    fact: "O teste é 100% grátis: sem cartão, sem cadastro. Você instala, assiste 30 min e só paga se amar.",
    options: [
      { id: "sim", label: "SIM! Libera agora 🚀", sub: "Quero comprovar a qualidade", icon: Zap },
      { id: "resultado", label: "Ver meu resultado primeiro", sub: "Mostra o plano ideal pra mim", icon: Sparkles },
    ],
  },
];

/* ---------- Mapeamentos para o resultado ---------- */

const INTEREST_LABEL: Record<string, string> = {
  filmes: "Filmes de cinema",
  series: "Séries completas",
  novelas: "Novelas",
  futebol: "Futebol ao vivo",
  tudo: "Tudo (filmes, séries, novelas e futebol)",
};

const DEVICE_LABEL: Record<string, string> = {
  smarttv: "Smart TV",
  celular: "Celular/Tablet",
  tvbox: "TV Box / Fire Stick",
  computador: "Computador",
};

const PEOPLE_LABEL: Record<string, string> = {
  so_eu: "1 pessoa",
  duas: "2 pessoas",
  familia: "3 a 4 pessoas",
  casa_cheia: "5 ou mais pessoas",
};

// Estimativa de gasto mensal atual -> cálculo de economia anual
const SPEND_ESTIMATE: Record<string, number> = {
  nada: 0,
  ate30: 30,
  "30a60": 45,
  "60mais": 75,
};

function recommendPlan(answers: Record<string, string>) {
  // Casa cheia precisa de 5 telas -> ANUAL. Resto: SEMESTRAL (mais vendido).
  const planId = answers.pessoas === "casa_cheia" ? "anual" : "semestral";
  return PLANS.find((p) => p.id === planId) ?? PLANS[1];
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------- Etapa de "análise" (teatro de qualificação) ---------- */

const ANALYSIS_LINES = [
  "Verificando compatibilidade com seu aparelho…",
  "Calculando sua economia anual…",
  "Reservando seu teste grátis de 30 minutos…",
  "Montando seu resultado personalizado…",
];

function AnalyzingScreen({ device }: { device: string }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= ANALYSIS_LINES.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 620);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center px-6 py-10 min-h-[420px]"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-red-600/20 border-t-red-500"
        />
        <Play className="absolute inset-0 m-auto w-8 h-8 text-red-500 fill-red-500/20" />
      </div>

      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-6">
        Analisando seu perfil…
      </h3>

      <div className="space-y-3 w-full max-w-xs text-left">
        {ANALYSIS_LINES.map((line, i) => {
          const finished = i < done;
          const active = i === done;
          const displayed = line.replace("seu aparelho", DEVICE_LABEL[device] ?? "seu aparelho");
          return (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: finished || active ? 1 : 0.25, x: 0 }}
              className="flex items-center gap-2.5"
            >
              {finished ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className={`w-4.5 h-4.5 shrink-0 ${active ? "text-red-400 animate-spin" : "text-gray-700"}`} />
              )}
              <span className={`font-sans text-xs sm:text-sm ${finished ? "text-gray-300" : "text-gray-500"}`}>
                {displayed}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---------- Tela de resultado ---------- */

function ResultScreen({
  answers,
  onSeePlans,
}: {
  answers: Record<string, string>;
  onSeePlans: () => void;
}) {
  const plan = useMemo(() => recommendPlan(answers), [answers]);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const currentSpend = SPEND_ESTIMATE[answers.gasto] ?? 0;
  const yearlyNow = currentSpend * 12;
  // Custo anual equivalente do plano recomendado
  const planYearlyCost = plan.id === "anual" ? plan.price : plan.price * 2;
  const yearlySavings = Math.max(0, yearlyNow - planYearlyCost);

  const wantsSports = answers.esportes === "quero" || answers.esportes === "talvez";

  // Mensagem qualificada: atendente recebe o perfil completo do lead
  const waMessage = [
    "Olá! Acabei de fazer o QUIZ da ULTRAFLIX ✅ Meu perfil:",
    `🎬 Quero assistir: ${INTEREST_LABEL[answers.interesse] ?? "Tudo"}`,
    `📺 Aparelho: ${DEVICE_LABEL[answers.aparelho] ?? "Smart TV"}`,
    `👨‍👩‍👧 Assistem em casa: ${PEOPLE_LABEL[answers.pessoas] ?? "1 pessoa"}`,
    ...(wantsSports ? ["⚽ Quero futebol ao vivo (Brasileirão/Libertadores)"] : []),
    `⭐ Plano recomendado: ${plan.title} (${formatBRL(plan.price)}${plan.durationText.trim()})`,
    "",
    "Quero meu TESTE GRÁTIS de 30 minutos agora! 🚀",
  ].join("\n");

  // Divide os leads 50/50 entre os dois números
  const numberIndex = useMemo(() => Math.floor(Math.random() * WHATSAPP_NUMBERS.length), []);
  const waLink = buildWhatsAppLink(waMessage, numberIndex);

  const checklist = [
    `${INTEREST_LABEL[answers.interesse] ?? "Tudo"} liberado em Ultra HD 4K`,
    `100% compatível com ${DEVICE_LABEL[answers.aparelho] ?? "seu aparelho"}`,
    `${plan.features.find((f) => f.includes("telas")) ?? "Múltiplas telas simultâneas"}`,
    ...(answers.esportes === "quero" ? ["Brasileirão, Libertadores e Champions ao vivo em 4K"] : []),
    "Teste grátis de 30 min + garantia de 7 dias",
  ];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="px-5 sm:px-8 py-6 sm:py-8"
    >
      {/* Selo aprovado */}
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
          className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 rounded-full px-4 py-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Perfil aprovado para o teste grátis
          </span>
        </motion.div>
      </div>

      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white text-center leading-tight mb-1.5">
        Seu plano ideal é o{" "}
        <span className="text-gradient-fire">{plan.title.replace("PLANO ", "")}</span>
      </h3>
      <p className="font-sans text-xs sm:text-sm text-gray-400 text-center mb-5">
        {plan.perMonthLabel ? (
          <>
            Sai por <strong className="text-emerald-400">{plan.perMonthLabel}</strong> — {plan.perDayLabel}
          </>
        ) : (
          <>Apenas {formatBRL(plan.price)}{plan.durationText}</>
        )}
      </p>

      {/* Economia personalizada */}
      {yearlySavings > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-emerald-950/60 to-emerald-900/20 border border-emerald-600/30 rounded-2xl px-4 py-3.5 mb-5 text-center"
        >
          <p className="font-sans text-[11px] sm:text-xs text-gray-300">
            Pelo que você gasta hoje, com a Ultraflix você economiza até
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl text-emerald-400">
            {formatBRL(yearlySavings)} <span className="text-sm font-bold text-emerald-500/80">por ano</span>
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-950/50 to-orange-950/20 border border-red-600/30 rounded-2xl px-4 py-3.5 mb-5 text-center"
        >
          <p className="font-sans text-[11px] sm:text-xs text-gray-300">
            Por menos de <strong className="text-white">{plan.perDayLabel ?? "R$ 0,39 por dia"}</strong> você
            tem cinema, séries, novelas e futebol ao vivo — tudo num app só.
          </p>
        </motion.div>
      )}

      {/* Checklist do que ele ganha */}
      <div className="space-y-2 mb-6">
        {checklist.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.12 }}
            className="flex items-start gap-2.5"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={3} />
            <span className="font-sans text-xs sm:text-sm text-gray-200">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Urgência: resultado reservado */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <p className="font-sans text-[11px] sm:text-xs text-gray-400">
          Seu teste grátis está reservado por{" "}
          <span className="font-mono font-bold text-red-400">{minutes}:{seconds}</span>
        </p>
      </div>

      {/* CTA principal */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        id="btn_quiz_whatsapp"
        onClick={() =>
          trackWhatsAppClick("quiz_result", {
            plano: plan.id,
            interesse: answers.interesse,
            aparelho: answers.aparelho,
          })
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#2ee374] hover:to-[#25D366] text-white font-display font-black text-sm sm:text-base py-4.5 rounded-2xl uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/30 animate-pulse-glow-green mb-3"
      >
        <MessageCircle className="w-5 h-5 fill-white/10" />
        <span>Liberar meu teste grátis</span>
        <ChevronRight className="w-5 h-5" />
      </motion.a>

      <p className="text-center font-sans text-[10px] sm:text-[11px] text-gray-500 mb-4">
        Sem cartão • Sem cadastro • Acesso liberado em segundos no WhatsApp
      </p>

      {/* Selos de confiança */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
        <div className="flex items-center gap-1.5 bg-gray-950/60 border border-gray-900 rounded-lg px-2.5 py-1.5">
          <Gift className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-sans text-[10px] text-gray-400">30 min grátis</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-950/60 border border-gray-900 rounded-lg px-2.5 py-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
          <span className="font-sans text-[10px] text-gray-400">Garantia 7 dias</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-950/60 border border-gray-900 rounded-lg px-2.5 py-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-sans text-[10px] text-gray-400">5.0 de avaliação</span>
        </div>
      </div>

      {/* Secundário: ver todos os planos */}
      <button
        onClick={onSeePlans}
        className="w-full text-center font-display font-bold text-[11px] text-gray-500 hover:text-white underline underline-offset-4 decoration-red-600/40 uppercase tracking-widest transition-colors cursor-pointer"
      >
        Ver todos os planos e preços
      </button>
    </motion.div>
  );
}

/* ---------- Componente principal ---------- */

type Phase = "quiz" | "analyzing" | "result";

export default function QuizFunnel() {
  // Abre já ligado: tráfego de anúncio cai direto no quiz ao abrir o site.
  const [open, setOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");

  const step = STEPS[stepIndex];
  const progress = phase === "quiz" ? (stepIndex / STEPS.length) * 100 : 100;

  const resetAndOpen = useCallback((source: string) => {
    setStepIndex(0);
    setAnswers({});
    setSelected(null);
    setPhase("quiz");
    setOpen(true);
    trackCustomPixel("QuizStart", { content_name: source });
  }, []);

  // Auto-abre no load (tráfego de anúncio) + reabre via CTA/#quiz.
  useEffect(() => {
    trackCustomPixel("QuizStart", { content_name: "auto_load" });
    const handler = (e: Event) => {
      const source = (e as CustomEvent).detail?.source ?? "direct";
      resetAndOpen(source);
    };
    window.addEventListener(OPEN_QUIZ_EVENT, handler);
    return () => window.removeEventListener(OPEN_QUIZ_EVENT, handler);
  }, [resetAndOpen]);

  // Trava o scroll do body enquanto o quiz está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSelect = (optionId: string) => {
    if (selected) return; // evita duplo clique
    setSelected(optionId);
    const nextAnswers = { ...answers, [step.id]: optionId };
    setAnswers(nextAnswers);
    trackCustomPixel("QuizStep", { content_name: `${step.id}:${optionId}`, step: stepIndex + 1 });

    setTimeout(() => {
      setSelected(null);
      if (stepIndex + 1 >= STEPS.length) {
        setPhase("analyzing");
        trackPixel("Lead", { content_name: "quiz_complete" });
        setTimeout(() => setPhase("result"), 2800);
      } else {
        setStepIndex((i) => i + 1);
      }
    }, 420);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const handleClose = () => {
    if (phase === "quiz" && stepIndex < STEPS.length) {
      trackCustomPixel("QuizAbandon", { step: stepIndex + 1 });
    }
    setOpen(false);
  };

  const handleSeePlans = () => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("planos-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  if (!open) return null;

  return (
    (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 bg-[#050505]/95 backdrop-blur-sm overflow-y-auto"
        >
          {/* Glow ambiente */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="relative w-full sm:max-w-lg min-h-screen sm:min-h-0 bg-[#0a0a0a] sm:border sm:border-gray-900 sm:rounded-3xl overflow-hidden shadow-2xl shadow-red-950/30 flex flex-col"
          >
            {/* Header do quiz */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-900/80 px-4 py-3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 select-none">
                  <div className="bg-red-600 p-1 rounded-md">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="font-display font-extrabold text-sm tracking-tighter text-white">
                    ULTRA<span className="text-red-600">FLIX</span>
                  </span>
                  <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1.5 border border-gray-800 rounded px-1.5 py-0.5">
                    Quiz
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {phase === "quiz" && (
                    <span className="font-mono text-[10px] text-gray-500">
                      {Math.min(stepIndex + 1, STEPS.length)}/{STEPS.length}
                    </span>
                  )}
                  <button
                    onClick={handleClose}
                    aria-label="Fechar quiz"
                    className="text-gray-600 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${phase === "quiz" ? ((stepIndex + (selected ? 1 : 0)) / STEPS.length) * 100 : 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Corpo — troca de tela instantânea (sem exit animation: garante avanço mesmo com rAF throttled) */}
            <div className="flex-1">
              {phase === "analyzing" && <AnalyzingScreen device={answers.aparelho} />}

              {phase === "result" && (
                <ResultScreen answers={answers} onSeePlans={handleSeePlans} />
              )}

              {phase === "quiz" && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22 }}
                    className="px-5 sm:px-8 py-6 sm:py-7"
                  >
                    {/* Kicker + pergunta */}
                    <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-red-500 uppercase mb-2">
                      {step.kicker}
                    </p>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight mb-4">
                      {step.question}
                    </h3>

                    {/* Fato educativo */}
                    <div className="flex items-start gap-2 bg-gray-950/70 border border-gray-900 rounded-xl px-3 py-2.5 mb-5">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                        {step.fact}
                      </p>
                    </div>

                    {/* Opções */}
                    <div className="space-y-2.5">
                      {step.options.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selected === opt.id;
                        return (
                          <motion.button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full flex items-center gap-3.5 text-left rounded-2xl border px-4 py-3.5 transition-all duration-200 cursor-pointer group ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-600/10"
                                : "border-gray-800 bg-gray-950/50 hover:border-red-600/60 hover:bg-red-950/20"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-emerald-500/20"
                                  : "bg-gray-900 group-hover:bg-red-950/60"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  isSelected ? "text-emerald-400" : "text-red-500"
                                }`}
                                strokeWidth={2.2}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-display font-bold text-sm sm:text-[15px] text-white leading-snug">
                                {opt.label}
                              </p>
                              {opt.sub && (
                                <p className="font-sans text-[11px] text-gray-500 leading-snug">
                                  {opt.sub}
                                </p>
                              )}
                            </div>
                            {isSelected ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                              >
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </motion.div>
                            ) : (
                              <ChevronRight className="w-4.5 h-4.5 text-gray-700 group-hover:text-red-500 transition-colors shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Voltar */}
                    {stepIndex > 0 && (
                      <button
                        onClick={handleBack}
                        className="mt-5 inline-flex items-center gap-1 font-sans text-[11px] text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Voltar
                      </button>
                    )}
                  </motion.div>
              )}
            </div>

            {/* Rodapé: prova social fixa */}
            {phase === "quiz" && (
              <div className="border-t border-gray-900/80 px-5 py-3 flex items-center justify-center gap-2">
                <div className="flex -space-x-1.5">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&h=40&q=60",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&h=40&q=60",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&h=40&q=60",
                  ].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full border border-gray-800 object-cover"
                    />
                  ))}
                </div>
                <p className="font-sans text-[10px] text-gray-500">
                  <strong className="text-gray-300">+3.700 pessoas</strong> já fizeram o teste grátis
                  <span className="text-amber-400 ml-1">★ 5.0</span>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )
  );
}
