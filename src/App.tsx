import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Benefits from "./components/Benefits";
import Devices from "./components/Devices";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ValueStack from "./components/ValueStack";
import AllInOneShowcase from "./components/AllInOneShowcase";
import SocialProofToast from "./components/SocialProofToast";
import QuizFunnel, { openQuiz } from "./components/QuizFunnel";
import { trackPixel, trackCustomPixel } from "./tracking";

export default function App() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Monitor scroll height to conditionally show the mobile-only sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToPlans = () => {
    const element = document.getElementById("planos-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Evento Pixel: visualizou a landing (conteúdo da oferta)
  useEffect(() => {
    trackPixel("ViewContent", { content_name: "Landing ULTRAFLIX" });
  }, []);

  // Evento Pixel: chegou na seção de planos (público quente p/ remarketing)
  useEffect(() => {
    const el = document.getElementById("planos-section");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        trackCustomPixel("ViewPlans");
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white antialiased font-sans pb-16 sm:pb-0">

      {/* 1. Header (Fixed at Top) */}
      <Header onScrollToPlans={handleScrollToPlans} />

      {/* 2. Hero Section (Primeira Dobra) */}
      <Hero onScrollToPlans={handleScrollToPlans} />

      {/* 2.5 Vitrine única: filmes + séries + novelas + futebol equilibrados */}
      <AllInOneShowcase onScrollToPlans={handleScrollToPlans} />

      {/* 3. Plans Section (qualifica o lead: preços claros + CTA WhatsApp) */}
      <Plans />

      {/* 4. Value Stack: tudo incluso + comparativo de preço */}
      <ValueStack onScrollToPlans={handleScrollToPlans} />

      {/* 5. Benefits Section */}
      <Benefits />

      {/* 5. Devices Compatibility */}
      <Devices />

      {/* 6. Simple Timeline / How it Works */}
      <HowItWorks />

      {/* 7. Star Metrics & Social Proof */}
      <Testimonials />

      {/* 8. Interactive Short FAQ Accordion */}
      <FAQ />

      {/* 9. Final Closing CTA & Platform Info */}
      <Footer />

      {/* === CONVERSION ELEMENTS === */}

      {/* Prova social: atividade recente em rodízio */}
      <SocialProofToast />

      {/* STICKY MOBILE BOTTOM WHATSAPP BAR (Slides up past the first fold) */}
      <div
        id="mobile_sticky_action_bar"
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0d]/95 border-t border-green-600/30 p-3 flex sm:hidden items-center justify-between backdrop-blur-md transition-all duration-300 transform ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col text-left">
          <span className="font-sans text-[10px] text-gray-400">Sem pagar nada agora</span>
          <span className="font-display font-black text-xs text-emerald-400 uppercase tracking-wide">
            Teste Grátis 30 Min
          </span>
          <span className="font-sans text-[10px] text-gray-400">
            Liberado na hora pelo WhatsApp
          </span>
        </div>

        <button
          onClick={() => openQuiz("barra_fixa_mobile")}
          id="btn_sticky_mobile_whatsapp"
          className="bg-[#25D366] active:scale-95 text-white font-display font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg shadow-green-600/20 cursor-pointer animate-heartbeat whitespace-nowrap"
        >
          Testar Grátis
        </button>
      </div>

      {/* QUIZ FUNNEL: qualifica o lead antes do WhatsApp (abre via openQuiz ou #quiz) */}
      <QuizFunnel />

    </div>
  );
}
