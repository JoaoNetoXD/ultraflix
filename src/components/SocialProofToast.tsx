import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";
import { TRIAL_WHATSAPP_LINK } from "../config";
import { trackWhatsAppClick } from "../tracking";

// Atividade recente exibida em rodízio — reforço social no momento da dúvida.
const EVENTS = [
  { name: "Marcos", city: "Recife/PE", action: "pediu o teste grátis", emoji: "🎬" },
  { name: "Ana Paula", city: "São Paulo/SP", action: "ativou o Plano Semestral", emoji: "🔥" },
  { name: "Jeferson", city: "Teresina/PI", action: "pediu o teste grátis", emoji: "📺" },
  { name: "Camila", city: "Fortaleza/CE", action: "ativou o Plano Anual", emoji: "⚽" },
  { name: "Rodrigo", city: "Curitiba/PR", action: "pediu o teste grátis", emoji: "🍿" },
  { name: "Luciana", city: "Salvador/BA", action: "ativou o Plano Semestral", emoji: "💚" },
  { name: "Thiago", city: "Belo Horizonte/MG", action: "pediu o teste grátis", emoji: "🎬" },
  { name: "Patrícia", city: "Manaus/AM", action: "pediu o teste grátis", emoji: "📱" },
];

const FIRST_DELAY = 7000;   // espera inicial antes do 1º toast
const VISIBLE_MS = 5000;    // tempo na tela
const HIDDEN_MS = 9000;     // intervalo entre toasts

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
    <div className="fixed bottom-36 left-3 sm:bottom-24 sm:left-6 z-[45] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.a
            href={TRIAL_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("toast_prova_social")}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-auto flex items-center gap-2.5 bg-[#0d0d0d]/95 backdrop-blur-md border border-emerald-800/40 rounded-2xl pl-2.5 pr-4 py-2.5 shadow-xl shadow-black/50 cursor-pointer max-w-[280px]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-base shrink-0">
              {event.emoji}
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[11px] text-gray-200 leading-snug truncate">
                <strong className="text-white">{event.name}</strong> de {event.city}
              </p>
              <p className="font-sans text-[10px] text-emerald-400 leading-snug flex items-center gap-1">
                <MessageCircle className="w-2.5 h-2.5 shrink-0" />
                {event.action} agora mesmo
              </p>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
