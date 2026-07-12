import React from "react";
import { motion } from "motion/react";
import { Trophy, Radio, CalendarCheck, ChevronRight, Volume2 } from "lucide-react";

const LEAGUES = [
  "Copa do Mundo 2026",
  "Brasileirão Série A e B",
  "Libertadores",
  "Champions League",
  "Premier League",
  "Copa do Brasil",
  "NBA",
  "UFC e Boxe",
  "Fórmula 1",
];

const LIVE_CARDS = [
  {
    icon: Trophy,
    tag: "AO VIVO AGORA",
    live: true,
    title: "Copa do Mundo 2026",
    desc: "Fase decisiva do maior torneio do planeta. Cada jogo, cada gol, em 4K sem travar.",
  },
  {
    icon: Radio,
    tag: "TODA RODADA",
    live: false,
    title: "Futebol nacional completo",
    desc: "Todos os jogos do seu time do coração, com narração brasileira e replay dos gols.",
  },
  {
    icon: CalendarCheck,
    tag: "TEMPORADA 26/27",
    live: false,
    title: "Futebol europeu",
    desc: "Champions, Premier League, La Liga e mais — a nova temporada inteira no seu plano.",
  },
];

interface SportsShowcaseProps {
  onScrollToPlans: () => void;
}

export default function SportsShowcase({ onScrollToPlans }: SportsShowcaseProps) {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-[#050505]">

      {/* Stadium background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80"
          alt="Estádio de futebol lotado à noite"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-950/45 border border-red-500/30 px-4 py-1.5 rounded-full mb-5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-red-400 uppercase">
              Transmissão ao vivo • Sem delay
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            A COPA DO MUNDO É AGORA.
            <span className="text-gradient-fire block">VOCÊ VAI ASSISTIR ONDE?</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-300 mt-5 max-w-xl mx-auto">
            Enquanto uns pagam caro por pacote de canais, você assiste a{" "}
            <strong className="text-white">todos os jogos ao vivo</strong> por menos de R$ 0,31 por dia.
            Ative agora e chegue no próximo jogo já com tudo funcionando.
          </p>
        </div>

        {/* Live match-style cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {LIVE_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className={`relative rounded-2xl p-6 border backdrop-blur-sm flex flex-col ${
                card.live
                  ? "bg-gradient-to-b from-red-950/50 to-[#0b0b0b]/90 border-red-600/50 shadow-xl shadow-red-600/15"
                  : "bg-[#0c0c0c]/85 border-gray-900/70 hover:border-red-600/25 transition-colors"
              }`}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                  card.live
                    ? "bg-red-600 text-white"
                    : "bg-[#161616] text-gray-400 border border-gray-900"
                }`}>
                  {card.live && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  {card.tag}
                </span>
                <card.icon className={`w-5 h-5 ${card.live ? "text-red-400" : "text-gray-600"}`} />
              </div>

              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed flex-1">
                {card.desc}
              </p>

              {card.live && (
                <div className="mt-5 flex items-center gap-1.5 text-emerald-400 font-sans text-[11px] font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Narração em português incluída</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* League chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-12">
          {LEAGUES.map((league, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="font-display font-bold text-[11px] sm:text-xs text-gray-300 bg-[#101010]/90 border border-gray-900 px-3.5 py-2 rounded-full uppercase tracking-wide hover:border-red-600/40 hover:text-white transition-colors"
            >
              ⚽ {league}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onScrollToPlans}
            id="btn_sports_cta"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-display font-black text-sm sm:text-base px-8 py-4 sm:px-10 rounded-full animate-pulse-glow transition-all duration-200 uppercase tracking-widest cursor-pointer"
          >
            <span>Garantir acesso antes do próximo jogo</span>
            <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-sans text-[11px] text-gray-500 mt-3">
            Pix aprovado = acesso liberado em até 5 minutos
          </p>
        </div>

      </div>
    </section>
  );
}
