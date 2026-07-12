import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldCheck, Zap, Star, Flame, Trophy, Clapperboard, Popcorn } from "lucide-react";

interface HeroProps {
  onScrollToPlans: () => void;
}

const SPOTLIGHTS = [
  {
    title: "LANÇAMENTOS DE CINEMA",
    badge: "Cinema em Casa",
    icon: Clapperboard,
    desc: "Os maiores blockbusters de Hollywood recém-saídos das salas de cinema, direto na sua tela, dublados e legendados.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    rating: "9.8",
    tags: ["Filmes", "4K Ultra HD", "Dublado"]
  },
  {
    title: "SÉRIES COMPLETAS",
    badge: "Maratona Garantida",
    icon: Popcorn,
    desc: "Temporadas inteiras dubladas e legendadas para você e toda a família maratonarem sem propaganda e sem interrupção.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    rating: "9.6",
    tags: ["Séries", "Temporadas Completas", "Sem Anúncios"]
  },
  {
    title: "COPA DO MUNDO 2026 AO VIVO",
    badge: "Acontecendo Agora",
    icon: Trophy,
    desc: "O maior torneio do planeta está rolando. Assista a todos os jogos ao vivo, em 4K, sem travar e com narração brasileira.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    rating: "10",
    tags: ["Ao Vivo", "4K 60 FPS", "Narração BR"]
  },
  {
    title: "NOVELAS E REALITIES",
    badge: "Capítulo do Dia",
    icon: Flame,
    desc: "Sua novela e seus programas favoritos no horário que você quiser, sem depender da grade da TV — com capítulos completos.",
    image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=1200&q=80",
    rating: "9.7",
    tags: ["Novelas", "Realities", "Quando Quiser"]
  }
];

export default function Hero({ onScrollToPlans }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPOTLIGHTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = SPOTLIGHTS[activeIndex];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">

      {/* BACKGROUND SPOTLIGHT LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
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

          {/* Animated Copa Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-red-950/45 border border-red-500/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-red-400 uppercase">
              FILMES • SÉRIES • NOVELAS • COPA 2026 AO VIVO
            </span>
          </motion.div>

          {/* Big Cinematic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.06] mb-6 max-w-3xl"
          >
            TODO FILME. TODA SÉRIE. TODO JOGO.{" "}
            <span className="text-gradient-fire block">POR CENTAVOS POR DIA.</span>
          </motion.h1>

          {/* Core Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-6 px-2 sm:px-0"
          >
            Lançamentos de cinema, séries completas, Brasileirão, Champions e a{" "}
            <strong className="text-white">Copa do Mundo 2026 ao vivo em 4K</strong>.
            Você paga uma vez, assiste tudo — e ativa em 5 minutos pelo Pix.
          </motion.p>

          {/* Price anchor */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-display font-bold text-sm sm:text-base text-white mb-6"
          >
            A partir de <span className="text-emerald-400 font-black text-lg sm:text-xl">R$ 9,17/mês</span>
            <span className="font-sans font-normal text-gray-400 text-xs sm:text-sm"> — menos de R$ 0,31 por dia</span>
          </motion.p>

          {/* Big Red Magnetic Button */}
          <motion.button
            onClick={onScrollToPlans}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            id="btn_hero_assinar"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-display font-black text-sm sm:text-base px-8 py-4.5 sm:px-11 sm:py-5 rounded-full animate-pulse-glow transition-all duration-300 uppercase tracking-widest cursor-pointer overflow-hidden mb-3"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.8s_infinite]" />
            <span className="relative flex items-center space-x-2.5">
              <span>QUERO ASSISTIR TUDO AGORA</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <p className="font-sans text-[11px] text-gray-500 mb-8">
            Sem cartão de crédito • Sem fidelidade • Cancele quando quiser
          </p>

          {/* Live Platform Security badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-gray-400 font-sans text-xs sm:text-sm">
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

        {/* RIGHT COLUMN: INTERACTIVE STREAMING CATALOG HIGHLIGHTS */}
        <div className="w-full lg:w-[45%] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="w-full bg-[#0d0d0d] border border-gray-900/80 rounded-3xl overflow-hidden shadow-2xl shadow-red-600/5 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Spotlight Banner header */}
            <div className="relative h-44 sm:h-52 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/35" />

              {/* Dynamic Tag */}
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-display font-black tracking-widest text-white uppercase shadow-md shadow-red-600/30">
                ★ {current.badge}
              </div>

              {/* Streaming Live Badge with pulse effect */}
              <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="font-mono text-[9px] font-extrabold text-white uppercase tracking-wider">LIVE</span>
              </div>
            </div>

            {/* Content info area */}
            <div className="p-6 space-y-4">

              {/* Tabs list to toggle */}
              <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                {SPOTLIGHTS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg font-display font-bold text-[10px] tracking-wider uppercase shrink-0 transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                      idx === activeIndex
                        ? "bg-red-950/60 border border-red-600/50 text-white shadow-md shadow-red-600/10"
                        : "bg-[#121212] border border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <s.icon className="w-3 h-3" />
                    {s.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Spotlight Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                    ★ {current.rating}
                  </span>
                  <span className="text-xs text-gray-500 font-sans">• 4K HDR Atmos</span>
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight uppercase">
                  {current.title}
                </h3>
              </div>

              {/* Spotlight description */}
              <p className="font-sans text-xs text-gray-400 leading-relaxed min-h-[50px]">
                {current.desc}
              </p>

              {/* Tag badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {current.tags.map((t, i) => (
                  <span key={i} className="font-sans text-[9px] font-medium bg-[#141414] text-gray-400 px-2.5 py-1 rounded-md border border-gray-900/40">
                    {t}
                  </span>
                ))}
              </div>

            </div>

            {/* Dynamic catalog interactive footer */}
            <div className="bg-[#080808] px-6 py-4.5 border-t border-gray-950 flex items-center justify-between text-xs">
              <span className="font-sans text-gray-500 flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Popularidade Máxima</span>
              </span>
              <button
                onClick={onScrollToPlans}
                className="font-display font-extrabold text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>VER PLANOS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
