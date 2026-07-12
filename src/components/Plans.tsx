import React from "react";
import { Check, Award, Sparkles, MessageCircle, Gift } from "lucide-react";
import { motion } from "motion/react";
import { PLANS } from "../data";
import { buildPlanWhatsAppLink } from "../config";
import { trackWhatsAppClick } from "../tracking";

export default function Plans() {
  return (
    <section id="planos-section" className="py-20 px-4 bg-[#0a0a0a] border-t border-b border-red-950/20">
      <div className="max-w-6xl mx-auto">

        {/* Title Area */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            🔥 Oferta de lançamento — até 64% OFF
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            ESCOLHA SEU PLANO E <span className="text-gradient-fire">TESTE GRÁTIS ANTES</span>
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4 max-w-lg mx-auto">
            Você só paga depois de testar. Chame no WhatsApp, receba 30 minutos grátis e comprove a qualidade na sua TV.
          </p>
        </div>

        {/* Trial banner */}
        <div className="max-w-2xl mx-auto mb-12 bg-emerald-950/20 border border-emerald-700/30 rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-center">
          <Gift className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="font-sans text-xs sm:text-sm text-emerald-300">
            <strong className="font-display uppercase tracking-wide">Teste grátis de 30 minutos</strong>
            <span className="text-emerald-400/80"> — sem cartão, sem cadastro, sem compromisso. Liberado na hora pelo WhatsApp.</span>
          </p>
        </div>

        {/* Plans Grid (Vertical-first/responsive layout matching Streaming Platforms) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {PLANS.map((plan, index) => {
            const isRecommended = plan.recommended;
            const hasBadge = !!plan.badge;
            const priceLabel = `R$ ${plan.price.toFixed(2).replace(".", ",")}${plan.durationText}`;

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

                {/* WhatsApp CTA */}
                <div>
                  <a
                    href={buildPlanWhatsAppLink(plan.title, priceLabel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`plano_${plan.id}`, { value: plan.price, currency: "BRL" })}
                    id={`btn_assinar_${plan.id}`}
                    className={`w-full font-display font-bold text-sm py-3.5 rounded-xl transition-all duration-200 uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-1.5 ${
                      isRecommended
                        ? "bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white shadow-lg shadow-green-600/25"
                        : "bg-[#181818] hover:bg-[#222] active:scale-[0.98] text-white border border-gray-800"
                    }`}
                  >
                    <MessageCircle className={`w-4 h-4 ${isRecommended ? "" : "text-[#25D366]"}`} />
                    <span>{plan.ctaText || "Falar no WhatsApp"}</span>
                  </a>
                  <p className="text-center text-[10px] text-gray-500 font-sans mt-2">
                    Teste 30 min grátis • ativação em 5 min via WhatsApp
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee reassurance */}
        <p className="text-center text-emerald-400/90 font-sans text-xs mt-8 font-semibold">
          ✓ Teste grátis de 30 min + garantia de 7 dias após a assinatura
        </p>

        {/* No payment on site notice */}
        <p className="text-center text-gray-500 font-sans text-xs mt-3 flex items-center justify-center space-x-1">
          <MessageCircle className="w-4 h-4 text-gray-600" />
          <span>Atendimento humano no WhatsApp — tire dúvidas antes de decidir</span>
        </p>

      </div>
    </section>
  );
}
