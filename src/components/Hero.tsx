import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldCheck, Zap, Star, MessageCircle, Gift, Play, CheckCheck, Clapperboard, Popcorn, Heart, Trophy } from "lucide-react";
import { openQuiz } from "./QuizFunnel";

interface HeroProps {
  onScrollToPlans: () => void;
}

// Categorias que giram no badge do topo — ícone + label + destaque opcional
const CATEGORIES = [
  { icon: Clapperboard, label: "Filmes de Cinema", live: false },
  { icon: Popcorn, label: "Séries Completas", live: false },
  { icon: Heart, label: "Novelas do Dia", live: false },
  { icon: Trophy, label: "Futebol ao Vivo", live: true },
] as const;

function LiveCategoryBadge() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % CATEGORIES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const current = CATEGORIES[idx];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative inline-flex items-center gap-2.5 mb-6 rounded-full p-[1.5px] overflow-hidden shadow-lg shadow-red-950/40"
    >
      {/* Borda animada girando (conic gradient) */}
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-50%] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, rgba(239,68,68,0.9) 300deg, rgba(249,115,22,0.9) 340deg, transparent 360deg)",
        }}
      />

      {/* Conteúdo do pill */}
      <div className="relative flex items-center gap-2.5 rounded-full bg-[#0c0505]/95 backdrop-blur-md px-4 py-2">
        {/* Pulse LIVE dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>

        {/* Rótulo estático curto */}
        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase hidden sm:inline">
          Tudo incluso:
        </span>

        {/* Categoria rotativa */}
        <span className="relative flex items-center h-4 min-w-[130px] sm:min-w-[150px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 flex items-center gap-1.5 font-display text-[11px] sm:text-sm font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5 text-red-400 shrink-0" strokeWidth={2.5} />
              {current.label}
              {current.live && (
                <span className="ml-0.5 font-mono text-[8px] font-extrabold text-white bg-red-600 px-1.5 py-0.5 rounded tracking-wider not-italic">
                  AO VIVO
                </span>
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </motion.div>
  );
}

const BACKDROPS = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
];

// Conversa simulada: mostra o teste grátis sendo liberado em tempo real.
const CHAT_SCRIPT = [
  { from: "user", text: "Oi! Vi o anúncio. Esse teste grátis de 30 min é real? 👀", time: "20:41" },
  { from: "ultraflix", text: "Real sim! 🎬 Acabei de liberar seu acesso de teste. Instala em 1 minuto na TV ou no celular 📺", time: "20:41" },
  { from: "user", text: "Instalei aqui… qualidade ABSURDA. Jogo ao vivo sem travar 🔥🔥", time: "20:44" },
  { from: "ultraflix", text: "É assim todo dia 😎 E o plano sai a partir de R$ 10,83/mês. Bora ativar o seu?", time: "20:45" },
] as const;

function WhatsAppSimulation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visibleCount >= CHAT_SCRIPT.length) return;
    const next = CHAT_SCRIPT[visibleCount];
    const isIncoming = next.from === "ultraflix";

    // Mensagens da equipe mostram "digitando..." antes de aparecer
    const typingDelay = isIncoming ? 900 : 0;
    const showDelay = visibleCount === 0 ? 700 : 1500;

    const typingTimer = setTimeout(() => {
      if (isIncoming) setTyping(true);
    }, showDelay - typingDelay > 0 ? showDelay - typingDelay : 100);

    const showTimer = setTimeout(() => {
      setTyping(false);
      setVisibleCount((c) => c + 1);
    }, showDelay + typingDelay);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(showTimer);
    };
  }, [visibleCount]);

  const finished = visibleCount >= CHAT_SCRIPT.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      className="w-full max-w-md bg-[#0b141a] border border-gray-900/80 rounded-3xl overflow-hidden shadow-2xl shadow-green-600/10"
    >
      {/* WhatsApp-style header */}
      <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md">
            <Play className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#1f2c34] rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm text-white truncate">ULTRAFLIX Oficial</p>
          <p className="font-sans text-[11px] text-[#25D366]">online agora</p>
        </div>
        <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-1 rounded-full uppercase tracking-wider">
          Atendimento real
        </span>
      </div>

      {/* Chat area */}
      <div
        className="px-3.5 py-4 space-y-2.5 min-h-[280px] sm:min-h-[300px] flex flex-col justify-end"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(37,211,102,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(220,38,38,0.03) 0%, transparent 50%)",
        }}
      >
        <AnimatePresence initial={false}>
          {CHAT_SCRIPT.slice(0, visibleCount).map((msg, idx) => {
            const isUser = msg.from === "user";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-md ${
                    isUser
                      ? "bg-[#005c4b] rounded-br-md"
                      : "bg-[#202c33] rounded-bl-md"
                  }`}
                >
                  <p className="font-sans text-[12.5px] text-gray-100 leading-snug">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="font-sans text-[9px] text-gray-400">{msg.time}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#202c33] rounded-2xl rounded-bl-md px-4 py-3 shadow-md flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA footer: aparece quando a conversa termina, mas sempre clicável */}
      <div className="bg-[#0f1b21] border-t border-gray-900 p-4 space-y-2.5">
        <motion.button
          onClick={() => openQuiz("hero_chat_simulacao")}
          id="btn_hero_chat_cta"
          animate={finished ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-display font-black text-xs sm:text-sm py-3.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-green-600/25"
        >
          <MessageCircle className="w-4.5 h-4.5 fill-white/10" />
          <span>Quero Esse Teste Grátis</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
        <p className="text-center font-sans text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Resposta em segundos • 30 min grátis • Sem cartão
        </p>
      </div>
    </motion.div>
  );
}

export default function Hero({ onScrollToPlans }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKDROPS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">

      {/* BACKGROUND SPOTLIGHT LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={BACKDROPS[bgIndex]}
              alt="Catálogo ULTRAFLIX"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.7] saturate-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic rich premium gradients overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-[#050505]" />

        {/* Dynamic ambient pulsing red neon glow */}
        <motion.div
          animate={{ opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[40%] bg-red-600/20 blur-[130px] rounded-full pointer-events-none"
        />
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* CONTENT INTERACTION GRID */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-4 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

        {/* LEFT COLUMN: HERO OFFERS & DIRECT VALUE PROPOSITION */}
        <div className="w-full lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">

          {/* Animated rotating category badge */}
          <LiveCategoryBadge />

          {/* Big Cinematic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.06] mb-6 max-w-3xl"
          >
            TESTE AGORA <span className="text-emerald-400">DE GRAÇA</span>.{" "}
            <span className="text-gradient-fire block">SÓ PAGUE SE FICAR VICIADO.</span>
          </motion.h1>

          {/* Core Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-6 px-2 sm:px-0"
          >
            Lançamentos de cinema, séries completas e{" "}
            <strong className="text-white">Brasileirão, Libertadores e Champions ao vivo em 4K</strong>.
            Peça no WhatsApp e <strong className="text-emerald-400">assista 30 minutos grátis</strong> antes de pagar qualquer coisa.
          </motion.p>

          {/* Price anchor */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-display font-bold text-sm sm:text-base text-white mb-6"
          >
            A partir de <span className="text-emerald-400 font-black text-lg sm:text-xl">R$ 10,83/mês</span>
            <span className="font-sans font-normal text-gray-400 text-xs sm:text-sm"> — menos de R$ 0,36 por dia</span>
          </motion.p>

          {/* Big Green WhatsApp Magnetic Button */}
          <motion.button
            onClick={() => openQuiz("hero")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            id="btn_hero_teste_gratis"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#2ee374] hover:to-[#25D366] text-white font-display font-black text-sm sm:text-base px-8 py-4.5 sm:px-11 sm:py-5 rounded-full animate-pulse-glow transition-all duration-300 uppercase tracking-widest cursor-pointer overflow-hidden mb-3 shadow-lg shadow-green-600/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.8s_infinite]" />
            <span className="relative flex items-center space-x-2.5">
              <MessageCircle className="w-5 h-5 fill-white/10" />
              <span>QUERO MEU TESTE GRÁTIS</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <p className="font-sans text-[11px] text-gray-500 mb-3">
            30 minutos grátis no WhatsApp • Sem cartão • Sem cadastro • Sem compromisso
          </p>

          {/* Secondary: see plans first */}
          <button
            onClick={onScrollToPlans}
            id="btn_hero_ver_planos"
            className="font-display font-bold text-xs text-gray-400 hover:text-white underline underline-offset-4 decoration-red-600/50 uppercase tracking-widest transition-colors cursor-pointer mb-8"
          >
            Ver planos e preços ↓
          </button>

          {/* Live Platform Security badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-gray-400 font-sans text-xs sm:text-sm">
            <div className="flex items-center space-x-1.5 bg-gray-950/40 px-3 py-1.5 rounded-lg border border-gray-900/40">
              <Gift className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
              <span>Teste grátis de 30 min</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-gray-950/40 px-3 py-1.5 rounded-lg border border-gray-900/40">
              <Zap className="w-4 h-4 text-red-500 fill-red-500/20" />
              <span>Ativação em 5 min</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-gray-950/40 px-3 py-1.5 rounded-lg border border-gray-900/40">
              <ShieldCheck className="w-4 h-4 text-red-500 fill-red-500/20" />
              <span>Garantia de 7 dias</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-gray-950/40 px-3 py-1.5 rounded-lg border border-gray-900/40">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>5.0 de avaliação</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LIVE WHATSAPP TRIAL SIMULATION */}
        <div className="w-full lg:w-[45%] flex flex-col items-center">
          <WhatsAppSimulation />
        </div>

      </div>

    </section>
  );
}
