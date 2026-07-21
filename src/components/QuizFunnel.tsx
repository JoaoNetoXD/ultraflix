import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Zap,
  Wallet,
  LifeBuoy,
  RefreshCcw,
  Tv,
  Cpu,
  Smartphone,
  Laptop,
  HelpCircle,
  Clock,
  Search,
  KeyRound,
  CreditCard,
  WifiOff,
  AlertTriangle,
  MessageCircle,
  ShieldCheck,
  Gift,
  Star,
  Loader2,
  Lightbulb,
  Play,
} from "lucide-react";
import { PLANS } from "../data";
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from "../config";
import { trackPixel, trackCustomPixel, trackWhatsAppClick } from "../tracking";

/* ============================================================
   QUIZ FUNNEL ULTRAFLIX v2 — desenhado a partir dos dados do CRM.

   O público não chega querendo catálogo: chega querendo saber se
   funciona no aparelho dele e testar AGORA. O quiz descobre:
   intenção → aparelho → ano da TV (Samsung/LG) → app instalado →
   se está perto do aparelho. Caminho de ajuda pergunta o problema.
   Ativação/renovação pula tudo e vai direto pro WhatsApp.

   A mensagem final leva um resumo legível + linha estruturada
   [QUIZ_V1 ...] que a IA/CRM lê e salva automaticamente.
   ============================================================ */

const OPEN_QUIZ_EVENT = "ultraflix:open-quiz";

export function openQuiz(source: string = "direct") {
  window.dispatchEvent(new CustomEvent(OPEN_QUIZ_EVENT, { detail: { source } }));
}

/* ---------- Tipos e dados das perguntas ---------- */

type StepId = "intent" | "device" | "tv_year" | "app_status" | "ready" | "problem";

interface QuizOption {
  id: string;
  label: string;
  sub?: string;
  icon: React.ElementType;
}

interface QuizStep {
  id: StepId;
  kicker: string;
  question: string;
  fact: string;
  options: QuizOption[];
}

const STEPS: Record<StepId, QuizStep> = {
  intent: {
    id: "intent",
    kicker: "Rapidinho — o que você precisa?",
    question: "O que você quer fazer agora?",
    fact: "Em 1 minuto a gente descobre o caminho certo pro seu aparelho e libera tudo no WhatsApp.",
    options: [
      { id: "teste", label: "Quero testar agora", sub: "Teste grátis de 30 min, sem pagar nada", icon: Zap },
      { id: "precos", label: "Quero ver preços e planos", sub: "Valores claros, sem pegadinha", icon: Wallet },
      { id: "ajuda", label: "Já tenho acesso e preciso de ajuda", sub: "Resolvemos junto com você", icon: LifeBuoy },
      { id: "ativar", label: "Quero ativar ou renovar", sub: "Pix rápido, liberação em minutos", icon: RefreshCcw },
    ],
  },
  device: {
    id: "device",
    kicker: "Seu aparelho",
    question: "Onde você quer assistir?",
    fact: "Cada aparelho tem um aplicativo certo. Escolhendo aqui, você não perde tempo com app errado.",
    options: [
      { id: "samsung", label: "TV Samsung", icon: Tv },
      { id: "lg", label: "TV LG", icon: Tv },
      { id: "roku", label: "TV com Roku", sub: "TCL, Philco, AOC com Roku", icon: Tv },
      { id: "androidtv", label: "Android TV / TV Box / Fire Stick", icon: Cpu },
      { id: "celular", label: "Celular ou tablet", icon: Smartphone },
      { id: "pc", label: "Computador ou notebook", icon: Laptop },
      { id: "outro", label: "Outro / não sei", sub: "Sem problema — a gente descobre junto", icon: HelpCircle },
    ],
  },
  tv_year: {
    id: "tv_year",
    kicker: "Sua TV",
    question: "Sua TV é de que ano, mais ou menos?",
    fact: "O ano muda qual aplicativo funciona melhor. Chutou errado? Tranquilo — a gente ajusta no WhatsApp.",
    options: [
      { id: "2022_plus", label: "2022 ou mais nova", icon: Tv },
      { id: "2018_2021", label: "Entre 2018 e 2021", icon: Tv },
      { id: "pre2018", label: "Antes de 2018", icon: Tv },
      { id: "unknown", label: "Não sei", sub: "Sem stress, descobrimos pelo WhatsApp", icon: HelpCircle },
    ],
  },
  app_status: {
    id: "app_status",
    kicker: "Quase lá",
    question: "Você já tem algum aplicativo de TV instalado?",
    fact: "Se já tiver um app compatível, seu teste sai ainda mais rápido.",
    options: [
      { id: "sim", label: "Já tenho um app", sub: "Ótimo — pode ser que já sirva", icon: Check },
      { id: "nao", label: "Ainda não", sub: "A gente indica o certo, com link e foto", icon: Search },
      { id: "nao_sei", label: "Não sei dizer", sub: "Sem problema, verificamos juntos", icon: HelpCircle },
    ],
  },
  ready: {
    id: "ready",
    kicker: "Última!",
    question: "Você está perto da TV (ou do aparelho) agora?",
    fact: "Quem faz na hora recebe prioridade: dá pra sair assistindo em poucos minutos.",
    options: [
      { id: "sim", label: "Sim! Bora fazer agora", sub: "Teste liberado em minutos", icon: Zap },
      { id: "depois", label: "Não, faço mais tarde", sub: "Te mandamos tudo prontinho pra depois", icon: Clock },
    ],
  },
  problem: {
    id: "problem",
    kicker: "Vamos resolver",
    question: "O que aconteceu?",
    fact: "Nosso suporte assume a parte técnica e te fala exatamente o que fazer, passo a passo.",
    options: [
      { id: "app_not_found", label: "Não encontro o aplicativo", icon: Search },
      { id: "app_paid", label: "O app pede pagamento ou ativação", icon: CreditCard },
      { id: "credentials", label: "Não sei onde colocar o acesso", sub: "Usuário, senha, código…", icon: KeyRound },
      { id: "buffering", label: "Está travando ou carregando", icon: WifiOff },
      { id: "test_failed", label: "Meu teste não funcionou", icon: AlertTriangle },
      { id: "other", label: "É outro problema", icon: MessageCircle },
    ],
  },
};

/* ---------- Fluxo com ramificação ---------- */

type Answers = Partial<Record<StepId, string>>;

function nextStepAfter(current: StepId, answers: Answers): StepId | null {
  const intent = answers.intent;
  switch (current) {
    case "intent":
      if (intent === "ativar") return null; // pula tudo: direto pro WhatsApp
      return "device";
    case "device": {
      const d = answers.device;
      if (d === "samsung" || d === "lg") return "tv_year";
      return intent === "ajuda" ? "problem" : "app_status";
    }
    case "tv_year":
      return intent === "ajuda" ? "problem" : "app_status";
    case "app_status":
      return "ready";
    case "ready":
    case "problem":
      return null;
  }
}

// Caminho previsto (para barra de progresso e contador X/Y)
function plannedPath(answers: Answers): StepId[] {
  const path: StepId[] = ["intent"];
  let current: StepId = "intent";
  // Simula o fluxo; onde ainda não respondeu, assume o caminho comum
  const assumed: Answers = { intent: "teste", device: "androidtv", ...answers };
  while (true) {
    const next = nextStepAfter(current, assumed);
    if (!next) break;
    path.push(next);
    current = next;
  }
  return path;
}

/* ---------- Labels para mensagem e resultado ---------- */

const DEVICE_LABEL: Record<string, string> = {
  samsung: "TV Samsung",
  lg: "TV LG",
  roku: "TV com Roku",
  androidtv: "Android TV / TV Box / Fire Stick",
  celular: "Celular ou tablet",
  pc: "Computador",
  outro: "Ainda vou confirmar",
};

// Frase com artigo certo para títulos ("pra sua TV Samsung", "pro seu celular")
const DEVICE_PHRASE: Record<string, string> = {
  samsung: "sua TV Samsung",
  lg: "sua TV LG",
  roku: "sua TV com Roku",
  androidtv: "seu TV Box / Fire Stick",
  celular: "seu celular ou tablet",
  pc: "seu computador",
  outro: "seu aparelho",
};

const YEAR_LABEL: Record<string, string> = {
  "2022_plus": "2022 ou mais nova",
  "2018_2021": "2018 a 2021",
  pre2018: "antes de 2018",
  unknown: "não sei",
};

const APP_LABEL: Record<string, string> = {
  sim: "já tenho",
  nao: "ainda não",
  nao_sei: "não sei",
};

const PROBLEM_LABEL: Record<string, string> = {
  app_not_found: "Não encontro o aplicativo",
  app_paid: "O app pede pagamento/ativação",
  credentials: "Não sei onde colocar o acesso",
  buffering: "Está travando ou carregando",
  test_failed: "Meu teste não funcionou",
  other: "Outro problema",
};

/* ---------- Pontuação do lead (vai no [QUIZ_V1]) ---------- */

function computeScore(answers: Answers): number {
  let score = 0;
  if (answers.intent === "ativar") score += 30;
  if (answers.intent === "teste") score += 20;
  if (answers.intent === "precos") score += 8;
  if (answers.intent === "ajuda") score += 5;
  if (answers.ready === "sim") score += 15;
  if (answers.ready === "depois") score -= 5;
  if (answers.device && answers.device !== "outro") score += 10;
  if (answers.app_status === "sim") score += 10;
  return score;
}

/* ---------- Mensagem: resumo legível + linha estruturada ---------- */

function buildQuizMessage(answers: Answers): string {
  const intent = answers.intent ?? "teste";
  const score = computeScore(answers);

  const humanLines: string[] = [];
  if (intent === "teste") humanLines.push("Olá! Fiz o quiz e quero testar agora. 🎬");
  if (intent === "precos") humanLines.push("Olá! Fiz o quiz e quero ver os planos — e já aceito o teste grátis. 🎬");
  if (intent === "ajuda") humanLines.push("Olá! Fiz o quiz e preciso de ajuda com meu acesso.");
  if (intent === "ativar") humanLines.push("Olá! Quero ativar ou renovar meu acesso. 🚀");

  if (answers.device) humanLines.push(`Meu aparelho: ${DEVICE_LABEL[answers.device]}`);
  if (answers.tv_year) humanLines.push(`Ano aproximado da TV: ${YEAR_LABEL[answers.tv_year]}`);
  if (answers.app_status) humanLines.push(`Aplicativo instalado: ${APP_LABEL[answers.app_status]}`);
  if (answers.ready) humanLines.push(`Estou perto do aparelho: ${answers.ready === "sim" ? "sim" : "farei mais tarde"}`);
  if (answers.problem) humanLines.push(`Problema: ${PROBLEM_LABEL[answers.problem]}`);

  const tagParts = [`intent=${intent}`];
  if (answers.device) tagParts.push(`device=${answers.device}`);
  if (answers.tv_year) tagParts.push(`device_age=${answers.tv_year}`);
  if (answers.app_status) tagParts.push(`app_status=${answers.app_status}`);
  if (answers.ready) tagParts.push(`ready_now=${answers.ready === "sim"}`);
  if (answers.problem) tagParts.push(`problem=${answers.problem}`);
  tagParts.push(`score=${score}`);

  return [...humanLines, "", `[QUIZ_V1 ${tagParts.join(" ")}]`].join("\n");
}

/* ---------- Etapa de "análise" ---------- */

function AnalyzingScreen({ answers }: { answers: Answers }) {
  const [done, setDone] = useState(0);

  const device = answers.device ? DEVICE_PHRASE[answers.device] : "seu aparelho";
  const lines =
    answers.intent === "ajuda"
      ? ["Lendo o que aconteceu…", `Verificando o caminho para ${device}…`, "Preparando a solução no WhatsApp…"]
      : answers.intent === "ativar"
      ? ["Localizando seu perfil…", "Preparando a reativação via Pix…"]
      : [
          `Verificando compatibilidade com ${device}…`,
          "Selecionando o aplicativo certo…",
          "Reservando seu teste grátis de 30 minutos…",
        ];

  useEffect(() => {
    if (done >= lines.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 620);
    return () => clearTimeout(t);
  }, [done, lines.length]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center px-6 py-10 min-h-[380px]"
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
        Montando seu caminho…
      </h3>

      <div className="space-y-3 w-full max-w-xs text-left">
        {lines.map((line, i) => {
          const finished = i < done;
          const active = i === done;
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
                {line}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---------- Tela de resultado (varia por intenção) ---------- */

function ResultScreen({
  answers,
  onSeePlans,
}: {
  answers: Answers;
  onSeePlans: () => void;
}) {
  const intent = answers.intent ?? "teste";
  const device = answers.device ? DEVICE_LABEL[answers.device] : "seu aparelho";
  const devicePhrase = answers.device ? DEVICE_PHRASE[answers.device] : "seu aparelho";
  const readyNow = answers.ready === "sim";

  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  useEffect(() => {
    if (intent !== "teste") return;
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [intent]);
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  // Divide os leads 50/50 entre os dois números
  const numberIndex = useMemo(() => Math.floor(Math.random() * WHATSAPP_NUMBERS.length), []);
  const waLink = buildWhatsAppLink(buildQuizMessage(answers), numberIndex);
  const doubtLink = buildWhatsAppLink(
    `Olá! Fiz o quiz mas quero tirar uma dúvida antes do teste. Meu aparelho: ${device}.\n\n[QUIZ_V1 intent=duvida${answers.device ? ` device=${answers.device}` : ""}]`,
    numberIndex
  );

  const isHelp = intent === "ajuda";
  const isActivate = intent === "ativar";
  const isPrices = intent === "precos";

  const badgeText = isHelp
    ? "Suporte priorizado pra você"
    : isActivate
    ? "Caminho rápido de ativação"
    : "Compatibilidade confirmada";

  const title = isHelp ? (
    <>Vamos resolver isso <span className="text-gradient-fire">agora</span></>
  ) : isActivate ? (
    <>Bora <span className="text-gradient-fire">reativar</span> seu acesso</>
  ) : (
    <>Achamos o melhor caminho pra <span className="text-gradient-fire">{devicePhrase}</span></>
  );

  const ctaText = isHelp
    ? "Resolver no WhatsApp"
    : isActivate
    ? "Ativar / renovar no WhatsApp"
    : "Receber meu teste no WhatsApp";

  // Próximos passos do caminho de teste — mostra que as respostas foram usadas
  const steps = isHelp
    ? [
        `Você conta o que houve — já sabemos que é: ${answers.problem ? PROBLEM_LABEL[answers.problem].toLowerCase() : "um problema no acesso"}`,
        "Nosso suporte assume a parte técnica, passo a passo",
        "Se precisar, indicamos outro aplicativo compatível",
      ]
    : isActivate
    ? ["Você chama no WhatsApp", "Paga por Pix em segundos", "Acesso liberado em minutos"]
    : [
        `Indicamos o aplicativo certo pra ${devicePhrase} — com foto e link`,
        "Te guiamos na instalação, sem termos técnicos",
        "Liberamos seu teste grátis de 30 min na hora",
      ];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="px-5 sm:px-8 py-6 sm:py-8"
    >
      {/* Selo */}
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
          className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 rounded-full px-4 py-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase">
            {badgeText}
          </span>
        </motion.div>
      </div>

      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white text-center leading-tight mb-2">
        {title}
      </h3>

      {!isHelp && !isActivate && (
        <p className="font-sans text-xs sm:text-sm text-gray-400 text-center mb-5">
          Você não precisa entender nada técnico — a gente te guia no WhatsApp.
        </p>
      )}
      {isActivate && (
        <p className="font-sans text-xs sm:text-sm text-gray-400 text-center mb-5">
          Sem fila e sem burocracia: Pix direto no WhatsApp.
        </p>
      )}
      {isHelp && (
        <p className="font-sans text-xs sm:text-sm text-gray-400 text-center mb-5">
          Aparelho: <strong className="text-gray-200">{device}</strong> — já vai anotado na mensagem.
        </p>
      )}

      {/* Preços compactos: só pra quem pediu preço */}
      {isPrices && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-gray-950/70 border border-gray-800 rounded-2xl divide-y divide-gray-900 mb-5 overflow-hidden"
        >
          {PLANS.map((p) => (
            <div key={p.id} className={`flex items-center justify-between px-4 py-3 ${p.recommended ? "bg-emerald-950/30" : ""}`}>
              <div className="min-w-0">
                <p className="font-display font-bold text-xs text-white uppercase tracking-wide">
                  {p.title.replace("PLANO ", "")}
                  {p.recommended && (
                    <span className="ml-2 font-mono text-[8px] font-extrabold text-emerald-400 border border-emerald-700/50 rounded px-1.5 py-0.5 uppercase">
                      Mais vendido
                    </span>
                  )}
                </p>
                <p className="font-sans text-[10px] text-gray-500">
                  {p.id === "mensal" ? "por mês" : p.id === "semestral" ? "pagamento único pelos 6 meses" : "pagamento único pelo ano"}
                  {p.perMonthLabel ? ` • equivale a ${p.perMonthLabel}` : ""}
                </p>
              </div>
              <p className="font-display font-black text-base sm:text-lg text-emerald-400 shrink-0 ml-3">
                {p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
          ))}
          <p className="px-4 py-2.5 font-sans text-[10px] text-gray-500 text-center">
            Todos com teste grátis de 30 min antes de pagar + garantia de 7 dias
          </p>
        </motion.div>
      )}

      {/* Próximos passos numerados */}
      <div className="space-y-2.5 mb-5">
        {steps.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.12 }}
            className="flex items-start gap-3"
          >
            <span className="w-5 h-5 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="font-sans text-xs sm:text-sm text-gray-200">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Garantia operacional: nunca beco sem saída */}
      {!isActivate && (
        <div className="flex items-start gap-2 bg-gray-950/70 border border-gray-900 rounded-xl px-3 py-2.5 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="font-sans text-[11px] sm:text-xs text-gray-400 leading-relaxed">
            Não achou o aplicativo? A gente indica outra opção compatível.{" "}
            <strong className="text-gray-300">Você não fica na mão.</strong>
          </p>
        </div>
      )}

      {/* Urgência: só no caminho de teste */}
      {intent === "teste" && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <p className="font-sans text-[11px] sm:text-xs text-gray-400">
            {readyNow ? "Você tem prioridade agora" : "Seu teste fica reservado"} —{" "}
            <span className="font-mono font-bold text-red-400">{minutes}:{seconds}</span>
          </p>
        </div>
      )}

      {/* CTA principal */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        id="btn_quiz_whatsapp"
        onClick={() =>
          trackWhatsAppClick("quiz_result", {
            intent,
            device: answers.device,
            ready: answers.ready,
          })
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#2ee374] hover:to-[#25D366] text-white font-display font-black text-sm sm:text-base py-4.5 rounded-2xl uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/30 animate-pulse-glow-green mb-3"
      >
        <MessageCircle className="w-5 h-5 fill-white/10" />
        <span>{ctaText}</span>
        <ChevronRight className="w-5 h-5" />
      </motion.a>

      <p className="text-center font-sans text-[10px] sm:text-[11px] text-gray-500 mb-3">
        Suas respostas já vão na mensagem — é só apertar enviar.
      </p>

      {/* Secundário: dúvida antes do teste */}
      {!isHelp && (
        <a
          href={doubtLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("quiz_duvida", { device: answers.device })}
          className="block w-full text-center font-sans text-[11px] text-gray-500 hover:text-gray-300 underline underline-offset-4 decoration-gray-700 transition-colors cursor-pointer mb-4"
        >
          Prefiro tirar uma dúvida primeiro
        </a>
      )}

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

      {/* Ver landing completa */}
      <button
        onClick={onSeePlans}
        className="w-full text-center font-display font-bold text-[11px] text-gray-600 hover:text-white underline underline-offset-4 decoration-red-600/40 uppercase tracking-widest transition-colors cursor-pointer"
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
  const [stepId, setStepId] = useState<StepId>("intent");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");

  const step = STEPS[stepId];
  const path = plannedPath(answers);
  const stepIndex = Math.max(0, path.indexOf(stepId));
  const totalSteps = path.length;

  const resetAndOpen = useCallback((source: string) => {
    setStepId("intent");
    setHistory([]);
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

  const finishQuiz = (finalAnswers: Answers) => {
    setPhase("analyzing");
    trackPixel("Lead", { content_name: "quiz_complete" });
    trackCustomPixel("QuizComplete", {
      intent: finalAnswers.intent,
      device: finalAnswers.device,
      score: computeScore(finalAnswers),
    });
    setTimeout(() => setPhase("result"), finalAnswers.intent === "ativar" ? 1600 : 2400);
  };

  const handleSelect = (optionId: string) => {
    if (selected) return; // evita duplo clique
    setSelected(optionId);
    const nextAnswers = { ...answers, [stepId]: optionId };
    setAnswers(nextAnswers);
    trackCustomPixel("QuizStep", { content_name: `${stepId}:${optionId}` });

    setTimeout(() => {
      setSelected(null);
      const next = nextStepAfter(stepId, nextAnswers);
      if (!next) {
        finishQuiz(nextAnswers);
      } else {
        setHistory((h) => [...h, stepId]);
        setStepId(next);
      }
    }, 420);
  };

  const handleBack = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setStepId(prev);
  };

  const handleClose = () => {
    if (phase === "quiz") trackCustomPixel("QuizAbandon", { step: stepId });
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
                      {stepIndex + 1}/{totalSteps}
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
                  animate={{
                    width: `${phase === "quiz" ? ((stepIndex + (selected ? 1 : 0)) / totalSteps) * 100 : 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Corpo — troca de tela instantânea (sem exit animation: garante avanço mesmo com rAF throttled) */}
            <div className="flex-1">
              {phase === "analyzing" && <AnalyzingScreen answers={answers} />}

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

                    {/* Fato que reduz medo/fricção */}
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
                    {history.length > 0 && (
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
