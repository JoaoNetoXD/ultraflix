import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface HeaderProps {
  onScrollToPlans: () => void;
}

const OFFER_MESSAGES = [
  "🔥 OFERTA DE LANÇAMENTO: até 69% OFF nos planos",
  "⚽ COPA DO MUNDO 2026 AO VIVO em 4K",
  "⚡ Pix aprovado = acesso liberado em 5 minutos",
  "🛡️ Garantia de 7 dias ou seu dinheiro de volta",
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
          <button
            onClick={onScrollToPlans}
            id="btn_header_assinar"
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-display font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-200 uppercase tracking-wider"
          >
            Assinar Agora
          </button>
        </div>
      </div>
    </header>
  );
}
