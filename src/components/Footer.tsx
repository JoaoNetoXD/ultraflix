import React from "react";
import { Play, Shield, MessageCircle } from "lucide-react";
import { buildWhatsAppLink, TRIAL_WHATSAPP_LINK } from "../config";
import { trackWhatsAppClick } from "../tracking";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-red-950/20">

      {/* Final CTA Banner */}
      <div className="py-20 px-4 max-w-4xl mx-auto text-center border-b border-gray-950">
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6">
          TESTE GRÁTIS AGORA E <span className="text-red-600 text-shadow-neon">COMPROVE VOCÊ MESMO</span>
        </h2>

        <p className="font-sans text-xs sm:text-base text-gray-400 mb-10 max-w-lg mx-auto">
          Chame no WhatsApp, receba seu acesso de teste em segundos e assista 30 minutos grátis na sua TV ou celular. Só depois você decide.
        </p>

        <a
          href={TRIAL_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("footer")}
          id="btn_footer_whatsapp_cta"
          className="group relative inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-display font-black text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-lg shadow-green-600/30 hover:shadow-green-600/55 transition-all duration-200 uppercase tracking-widest cursor-pointer overflow-hidden"
        >
          {/* Shimmer line */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

          <span className="relative flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 fill-white/10" />
            <span>PEDIR TESTE GRÁTIS NO WHATSAPP</span>
          </span>
        </a>

        <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Teste grátis de 30 min + garantia de 7 dias após assinar</span>
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center space-x-1.5 select-none">
            <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tighter text-white">
              ULTRA<span className="text-red-600">FLIX</span>
            </span>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 font-sans">
            <span className="hover:text-red-500 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-red-500 cursor-pointer">Política de Privacidade</span>
            <a
              href={buildWhatsAppLink("Olá! Preciso de ajuda com a Ultraflix.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("footer_suporte")}
              className="hover:text-red-500 cursor-pointer"
            >
              Suporte via WhatsApp
            </a>
          </div>
        </div>

        {/* Disclaimer / Credentials protection info */}
        <div className="mt-8 pt-8 border-t border-gray-950 text-center flex flex-col items-center gap-2">
          <p className="font-sans text-[10px] text-gray-600 max-w-2xl leading-relaxed">
            A ULTRAFLIX é uma marca independente de streaming digital. As logos, marcas registradas e imagens representadas são de caráter puramente demonstrativo.
          </p>
          <p className="font-mono text-[9px] text-gray-700 tracking-wider">
            ULTRAFLIX © 2026. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </div>

    </footer>
  );
}
