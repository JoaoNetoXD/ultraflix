import React from "react";
import { motion } from "motion/react";
import { Check, X, Play } from "lucide-react";

const ROWS = [
  { label: "Filmes em cartaz no cinema", others: false },
  { label: "Séries completas sem anúncio", others: true },
  { label: "Futebol ao vivo (Brasileirão, Libertadores, Champions)", others: false },
  { label: "Canais de TV 24 horas", others: false },
  { label: "Desenhos e conteúdo infantil", others: true },
  { label: "Qualidade 4K Ultra HD", others: true },
  { label: "Suporte humano no WhatsApp", others: false },
];

interface ValueStackProps {
  onScrollToPlans: () => void;
}

export default function ValueStack({ onScrollToPlans }: ValueStackProps) {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] border-t border-b border-red-950/10">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Faça as contas
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            PARE DE PAGAR <span className="text-gradient-fire">R$ 100+ POR MÊS</span> PRA ASSISTIR POUCO
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4 max-w-lg mx-auto">
            Somando 3 ou 4 assinaturas separadas você gasta mais de R$ 100 por mês — e ainda fica sem futebol.
            Na ULTRAFLIX, um plano libera tudo.
          </p>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-gray-900 bg-[#0c0c0c]"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] text-center border-b border-gray-900">
            <div className="p-4 sm:p-5 text-left flex items-center">
              <span className="font-sans text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                O que você quer assistir
              </span>
            </div>
            <div className="p-4 sm:p-5 bg-[#0a0a0a] border-l border-gray-900">
              <span className="font-display font-bold text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide block">
                Assinaturas separadas
              </span>
              <span className="font-mono text-[10px] text-gray-600 block mt-1">R$ 100+ /mês</span>
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-b from-red-950/50 to-red-950/20 border-l border-red-900/40 relative">
              <div className="flex items-center justify-center gap-1">
                <div className="bg-red-600 p-0.5 rounded">
                  <Play className="w-2.5 h-2.5 fill-white text-white" />
                </div>
                <span className="font-display font-black text-[11px] sm:text-xs text-white uppercase tracking-wide">
                  ULTRAFLIX
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold block mt-1">R$ 10,83 /mês</span>
            </div>
          </div>

          {/* Feature rows */}
          {ROWS.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] items-stretch text-center ${
                idx !== ROWS.length - 1 ? "border-b border-gray-950" : ""
              }`}
            >
              <div className="p-3.5 sm:p-4 text-left flex items-center">
                <span className="font-sans text-xs sm:text-sm text-gray-300">{row.label}</span>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#0a0a0a] border-l border-gray-900 flex items-center justify-center">
                {row.others ? (
                  <span className="font-sans text-[10px] text-gray-500">só pagando mais</span>
                ) : (
                  <X className="w-4.5 h-4.5 text-gray-700" />
                )}
              </div>
              <div className="p-3.5 sm:p-4 bg-red-950/10 border-l border-red-900/30 flex items-center justify-center">
                <div className="w-5.5 h-5.5 rounded-full bg-emerald-600/90 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                </div>
              </div>
            </div>
          ))}

          {/* Bottom verdict row */}
          <div className="bg-gradient-to-r from-red-950/40 via-[#0d0d0d] to-red-950/40 border-t border-red-900/30 p-5 text-center">
            <p className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide">
              Economia de mais de <span className="text-emerald-400">R$ 1.000 por ano</span>
            </p>
            <p className="font-sans text-[11px] text-gray-500 mt-1">
              comparado à soma de assinaturas separadas de filmes, séries e esportes
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={onScrollToPlans}
            id="btn_valuestack_ver_planos"
            className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-display font-black text-sm px-8 py-4 rounded-full shadow-lg shadow-red-600/30 transition-all duration-200 uppercase tracking-widest cursor-pointer"
          >
            Quero Economizar Agora
          </button>
        </div>

      </div>
    </section>
  );
}
