import React from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { HOW_IT_WORKS } from "../data";
import { TRIAL_WHATSAPP_LINK } from "../config";
import { trackWhatsAppClick } from "../tracking";

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Passo a Passo
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            COMO FUNCIONA?
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4">
            Do primeiro clique ao primeiro play em minutos — e você só paga depois de testar.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Subtle horizontal connecting line for desktop */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-red-600/30 via-red-600/20 to-transparent z-0" />

          {HOW_IT_WORKS.map((item, idx) => (
            <motion.div
              key={idx}
              id={`step_card_${idx}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="relative flex flex-col items-center text-center bg-[#0d0d0d]/40 border border-gray-900/40 p-6 sm:p-8 rounded-2xl z-10 hover:bg-[#0d0d0d]/80 transition-all duration-200"
            >
              {/* Step number badge */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white font-display font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/20">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA: start step 01 right now */}
        <div className="text-center mt-12">
          <a
            href={TRIAL_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("como_funciona")}
            id="btn_howitworks_whatsapp"
            className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-display font-black text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg shadow-green-600/25 transition-all duration-200 uppercase tracking-widest cursor-pointer space-x-2"
          >
            <MessageCircle className="w-4 h-4 fill-white/10" />
            <span>Começar o Passo 01 Agora</span>
          </a>
          <p className="font-sans text-[11px] text-gray-500 mt-3">
            Grátis • Sem cartão • Resposta em segundos
          </p>
        </div>

      </div>
    </section>
  );
}
