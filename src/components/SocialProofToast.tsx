import React, { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TRIAL_WHATSAPP_LINK_B } from "../config";
import { trackWhatsAppClick } from "../tracking";

// Atividade recente exibida em rodízio — reforço social no momento da dúvida.
const EVENTS = [
  { name: "Marcos", city: "Recife/PE", action: "pediu o teste grátis", emoji: "🎬", ago: "há 1 min" },
  { name: "Ana Paula", city: "São Paulo/SP", action: "ativou o Plano Semestral", emoji: "🔥", ago: "há 2 min" },
  { name: "Jeferson", city: "Teresina/PI", action: "pediu o teste grátis", emoji: "📺", ago: "agora mesmo" },
  { name: "Camila", city: "Fortaleza/CE", action: "ativou o Plano Anual", emoji: "⚽", ago: "há 3 min" },
  { name: "Rodrigo", city: "Curitiba/PR", action: "pediu o teste grátis", emoji: "🍿", ago: "há 1 min" },
  { name: "Luciana", city: "Salvador/BA", action: "ativou o Plano Semestral", emoji: "💚", ago: "há 4 min" },
  { name: "Thiago", city: "Belo Horizonte/MG", action: "pediu o teste grátis", emoji: "🎬", ago: "agora mesmo" },
  { name: "Patrícia", city: "Manaus/AM", action: "pediu o teste grátis", emoji: "📱", ago: "há 2 min" },
];

const FIRST_DELAY = 8000;   // espera inicial antes do 1º toast
const VISIBLE_MS = 4500;    // tempo na tela
const HIDDEN_MS = 11000;    // intervalo entre toasts

export default function SocialProofToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const cycle = (delay: number) => {
      showTimer = setTimeout(() => {
        if (cancelled) return;
        setVisible(true);
        hideTimer = setTimeout(() => {
          if (cancelled) return;
          setVisible(false);
          setIdx((prev) => (prev + 1) % EVENTS.length);
          cycle(HIDDEN_MS);
        }, VISIBLE_MS);
      }, delay);
    };

    cycle(FIRST_DELAY);
    return () => {
      cancelled = true;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const event = EVENTS[idx];

  return (
    // Ancorado no canto inferior esquerdo, acima da barra fixa mobile (~72px).
    <div className="fixed left-3 bottom-[84px] sm:left-5 sm:bottom-5 z-[45] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.a
            key={idx}
            href={TRIAL_WHATSAPP_LINK_B}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("toast_prova_social")}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="pointer-events-auto relative flex items-center gap-2.5 bg-[#0c0c0c]/92 backdrop-blur-lg border border-white/8 rounded-full pl-1.5 pr-3.5 py-1.5 shadow-lg shadow-black/40 cursor-pointer w-[230px] overflow-hidden"
          >
            {/* Avatar com anel gradiente + selo verificado */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600/30 to-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-base">
                {event.emoji}
              </div>
              <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 text-emerald-400 fill-[#0c0c0c]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-sans text-[11px] text-gray-300 leading-tight truncate">
                <strong className="text-white font-semibold">{event.name}</strong>
                <span className="text-gray-500"> · {event.city}</span>
              </p>
              <p className="font-sans text-[11px] text-emerald-400 font-medium leading-tight truncate">
                {event.action}
              </p>
            </div>

            {/* Timestamp com dot pulsante */}
            <div className="shrink-0 flex flex-col items-end gap-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="font-sans text-[8px] text-gray-600 whitespace-nowrap">{event.ago}</span>
            </div>

            {/* Barra de progresso: sinaliza que vai sumir */}
            <motion.span
              key={`bar-${idx}`}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: VISIBLE_MS / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-emerald-500 to-emerald-600"
            />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
