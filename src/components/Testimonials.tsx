import React from "react";
import { Star, ShieldCheck, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { TESTIMONIALS } from "../data";

const TIMES = ["21:34", "19:08", "20:47", "14:22", "22:15"];

interface TestimonialsProps {
  onScrollToPlans?: () => void;
}

export default function Testimonials({ onScrollToPlans }: TestimonialsProps) {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">

        {/* Header Title Area */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Direto do nosso WhatsApp
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
            QUEM ASSINA, RECOMENDA
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />

          {/* Main 5.0 Stars Badge */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-[#0d0d0d] border border-gray-900 px-6 py-4 rounded-2xl">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <span className="font-display font-black text-lg text-white mr-2">5.0 / 5.0</span>
              <span className="font-sans text-xs text-gray-400 block sm:inline">com base em avaliações de clientes ativos</span>
            </div>
          </div>
        </div>

        {/* WhatsApp-style chat window */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-gray-900 shadow-2xl shadow-black/50"
        >
          {/* Chat header */}
          <div className="bg-[#1f2c34] px-5 py-3.5 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-semibold text-sm text-white truncate">
                Clientes ULTRAFLIX
              </p>
              <p className="font-sans text-[11px] text-gray-400">
                depoimentos recebidos no suporte
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-sans text-xs text-gray-300 font-semibold">5.0</span>
            </div>
          </div>

          {/* Chat body */}
          <div className="bg-[#0b141a] px-4 sm:px-6 py-6 space-y-5">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                id={`testimonial_${t.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex items-end space-x-2 max-w-[92%] sm:max-w-[85%]"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-900/20 text-red-500 font-display font-extrabold text-[10px] flex items-center justify-center overflow-hidden shrink-0 mb-4">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    t.name.split(" ").map(n => n[0]).join("")
                  )}
                </div>

                {/* Bubble */}
                <div className="relative bg-[#202c33] rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-sans font-semibold text-[12px] text-emerald-400">
                      {t.name}
                    </span>
                    {t.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                    <span className="font-sans text-[10px] text-gray-500">• {t.location}</span>
                  </div>
                  <p className="font-sans text-[13px] text-gray-200 leading-relaxed">
                    {t.comment}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1.5">
                    <span className="flex items-center space-x-0.5 mr-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      ))}
                    </span>
                    <span className="font-sans text-[10px] text-gray-500">{TIMES[idx % TIMES.length]}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Support reply */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex justify-end"
            >
              <div className="bg-[#005c4b] rounded-2xl rounded-br-md px-4 py-3 shadow-md max-w-[85%] sm:max-w-[70%]">
                <p className="font-sans text-[13px] text-gray-100 leading-relaxed">
                  Obrigado pela confiança! 🙌 Qualquer dúvida é só chamar — suporte todos os dias. 🍿⚽
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="font-sans text-[10px] text-emerald-200/70">Equipe ULTRAFLIX ✓✓</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA no pico de confiança */}
        <div className="mt-8 bg-gradient-to-r from-red-950/20 via-[#0d0d0d] to-red-950/20 border border-red-950/20 rounded-2xl p-6 text-center">
          <p className="font-display font-bold text-sm sm:text-base text-white mb-4">
            Amanhã pode ser você mandando esse depoimento. 📺
          </p>
          {onScrollToPlans && (
            <button
              onClick={onScrollToPlans}
              id="btn_testimonials_cta"
              className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-display font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-red-600/30 transition-all duration-200 uppercase tracking-widest cursor-pointer"
            >
              Quero Assinar Também
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
