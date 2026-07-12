import React from "react";
import { Check, Star, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { PLANS } from "../data";
import { Plan } from "../types";

interface PlansProps {
  onSelectPlan: (plan: Plan) => void;
}

export default function Plans({ onSelectPlan }: PlansProps) {
  return (
    <section id="planos-section" className="py-20 px-4 bg-[#0a0a0a] border-t border-b border-red-950/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Area */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            🔥 Oferta de lançamento — até 69% OFF
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            ESCOLHA SEU PLANO E DÊ O <span className="text-gradient-fire">PLAY EM 5 MINUTOS</span>
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4 max-w-lg mx-auto">
            Pagou no Pix, recebeu o acesso. Sem cartão, sem fidelidade, sem letra miúda.
          </p>
        </div>

        {/* Plans Grid (Vertical-first/responsive layout matching Streaming Platforms) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {PLANS.map((plan, index) => {
            const isRecommended = plan.recommended;
            const hasBadge = !!plan.badge;

            return (
              <motion.div
                key={plan.id}
                id={`card_plano_${plan.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  isRecommended
                    ? "order-first md:order-none bg-gradient-to-b from-red-950/40 to-[#0c0c0c] border-2 border-red-600 animate-pulse-glow scale-100 lg:scale-[1.06] z-10 mt-2 md:mt-0"
                    : "bg-[#0d0d0d] border border-gray-800/40 hover:border-red-600/30 hover:bg-[#121212]"
                }`}
              >
                {/* Badge Overlay */}
                {hasBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`inline-flex items-center space-x-1 text-[10px] font-display font-black tracking-widest uppercase px-3 py-1 rounded-full text-white shadow-md ${
                      plan.id === "semestral" 
                        ? "bg-red-600 shadow-red-600/20" 
                        : "bg-amber-600 shadow-amber-600/20"
                    }`}>
                      {plan.id === "semestral" ? (
                        <Award className="w-3.5 h-3.5" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                {/* Plan Content */}
                <div>
                  {/* Title & Savings */}
                  <div className="text-center mb-5">
                    <h3 className="font-display font-black text-lg text-gray-400 tracking-wide">
                      {plan.title}
                    </h3>
                    <p className={`font-mono text-xs font-medium mt-1.5 ${
                      isRecommended ? "text-red-400" : "text-gray-500"
                    }`}>
                      {plan.savingsText}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center bg-[#050505]/60 rounded-xl py-4 mb-6 border border-gray-900/30">
                    {plan.anchorPrice && (
                      <span className="font-sans text-xs text-gray-500 line-through block mb-0.5">
                        de R$ {plan.anchorPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                    <span className="font-mono text-xs text-gray-400 align-super font-semibold mr-1">R$</span>
                    <span className="font-display font-black text-4xl text-white tracking-tight">
                      {plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="font-sans text-xs text-gray-500 block mt-1">
                      {plan.durationText}
                    </span>
                    {plan.perMonthLabel && (
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span className="font-display font-bold text-xs text-emerald-400">
                          equivale a {plan.perMonthLabel}
                        </span>
                        {plan.savingsPercent && (
                          <span className="font-mono text-[10px] font-bold bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900/30">
                            -{plan.savingsPercent}%
                          </span>
                        )}
                      </div>
                    )}
                    {plan.perDayLabel && (
                      <span className="font-sans text-[10px] text-gray-500 block mt-1">
                        menos de {plan.perDayLabel} ☕
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan)}
                    id={`btn_assinar_${plan.id}`}
                    className={`w-full font-display font-bold text-sm py-3.5 rounded-xl transition-all duration-200 uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-1.5 ${
                      isRecommended
                        ? "bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white shadow-lg shadow-red-600/20"
                        : "bg-[#181818] hover:bg-[#222] active:scale-[0.98] text-white border border-gray-800"
                    }`}
                  >
                    <span>{plan.ctaText || "Assinar"}</span>
                  </button>
                  <p className="text-center text-[10px] text-gray-500 font-sans mt-2">
                    Pix • acesso liberado na hora
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee reassurance */}
        <p className="text-center text-emerald-400/90 font-sans text-xs mt-8 font-semibold">
          ✓ Garantia de 7 dias — não gostou, devolvemos 100% do valor
        </p>

        {/* Fast Security Notice */}
        <p className="text-center text-gray-500 font-sans text-xs mt-3 flex items-center justify-center space-x-1">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Pagamento 100% criptografado e seguro</span>
        </p>

      </div>
    </section>
  );
}
