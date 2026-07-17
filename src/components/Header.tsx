import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { TRIAL_WHATSAPP_LINK_A } from "../config";
import { trackWhatsAppClick } from "../tracking";

interface HeaderProps {
  onScrollToPlans: () => void;
}

const OFFER_MESSAGES = [
  "🎁 TESTE GRÁTIS DE 30 MINUTOS — peça agora no WhatsApp",
  "🔥 OFERTA DE LANÇAMENTO: até 64% OFF nos planos",
  "⚽ COPA DO MUNDO 2026 AO VIVO em 4K",
  "⚡ Atendimento no WhatsApp = acesso em 5 minutos",
];

export default function Header({ onScrollToPlans }: HeaderProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % OFFER_MESSAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Rotating offer bar */}
      <button
        onClick={onScrollToPlans}
        id="offer_bar"
        className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white h-8 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-display font-bold text-[10px] sm:text-xs tracking-widest uppercase px-4 truncate"
          >
            {OFFER_MESSAGES[msgIndex]}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Main nav */}
      <div className="bg-[#050505]/90 backdrop-blur-md border-b border-red-950/30">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={onScrollToPlans}
            className="flex items-center space-x-1 cursor-pointer select-none"
          >
            <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
              <Play className="w-5 h-5 fill-white text-white" />
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white">
              ULTRA<span className="text-red-600 text-shadow-neon">FLIX</span>
            </span>
          </div>

          {/* Action button */}
          <a
            href={TRIAL_WHATSAPP_LINK_A}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("header")}
            id="btn_header_teste_gratis"
            className="bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-display font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-md shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-200 uppercase tracking-wider"
          >
            Teste Grátis
          </a>
        </div>
      </div>
    </header>
  );
}
