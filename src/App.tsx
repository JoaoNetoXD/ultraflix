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
import CheckoutModal from "./components/CheckoutModal";
import ValueStack from "./components/ValueStack";
import SportsShowcase from "./components/SportsShowcase";
import CinemaShowcase from "./components/CinemaShowcase";
import { Plan } from "./types";
import { PLANS } from "./data";
import { buildWhatsAppLink } from "./config";
import { trackPixel, trackCustomPixel } from "./tracking";

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Monitor scroll height to conditionally show the mobile-only sticky bottom buy bar
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

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseCheckout = () => {
    setSelectedPlan(null);
  };

  // Select recommended plan for direct sticky buy bar shortcut
  const recommendedPlan = PLANS.find(p => p.recommended) || PLANS[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white antialiased font-sans pb-16 sm:pb-0">
      
      {/* 1. Header (Fixed at Top) */}
      <Header onScrollToPlans={handleScrollToPlans} />

      {/* 2. Hero Section (Primeira Dobra) */}
      <Hero onScrollToPlans={handleScrollToPlans} />

      {/* 2.5 Futebol / Copa do Mundo (gancho de desejo antes da oferta) */}
      <SportsShowcase onScrollToPlans={handleScrollToPlans} />

      {/* 2.6 Cinema / Séries / Novelas (segundo gancho: entretenimento) */}
      <CinemaShowcase onScrollToPlans={handleScrollToPlans} />

      {/* 3. Plans Section (Onde a conversão acontece) */}
      <Plans onSelectPlan={handleSelectPlan} />

      {/* 4. Value Stack: tudo incluso + comparativo de preço */}
      <ValueStack onScrollToPlans={handleScrollToPlans} />

      {/* 5. Benefits Section */}
      <Benefits />

      {/* 5. Devices Compatibility */}
      <Devices />

      {/* 6. Simple Timeline / How it Works */}
      <HowItWorks />

      {/* 7. Star Metrics & Social Proof */}
      <Testimonials onScrollToPlans={handleScrollToPlans} />

      {/* 8. Interactive Short FAQ Accordion */}
      <FAQ />

      {/* 9. Final Closing CTA & Platform Info */}
      <Footer onScrollToPlans={handleScrollToPlans} />

      {/* 10. Interactive High-Converting Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal plan={selectedPlan} onClose={handleCloseCheckout} />
      )}

      {/* === CONVERSION ELEMENTS === */}

      {/* A. FLOATING WHATSAPP BUTTON (Target blank for safe redirection) */}
      <a
        href={buildWhatsAppLink("Olá, gostaria de saber mais sobre os planos da Ultraflix!")}
        target="_blank"
        rel="noopener noreferrer"
        id="btn_whatsapp_flutuante"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-green-600/30 hover:shadow-green-600/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer group"
        title="Falar com suporte"
      >
        <svg
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.638 2.02 14.162.992 11.53.991c-5.438 0-9.863 4.373-9.867 9.801-.002 1.73.465 3.424 1.353 4.96l-.982 3.58 3.68-.946zm11.226-7.397c-.302-.15-1.785-.873-2.057-.972-.272-.1-.469-.15-.668.15-.198.299-.767.97-.94 1.169-.173.199-.347.224-.648.075-.3-.15-1.265-.462-2.41-1.474-.89-.789-1.49-1.764-1.665-2.063-.173-.3-.018-.462.13-.61.135-.133.303-.349.453-.524.15-.174.2-.299.3-.498.1-.2.05-.374-.025-.524-.075-.15-.668-1.597-.916-2.193-.242-.582-.489-.504-.668-.513-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.299-1.04 1.013-1.04 2.47 0 1.458 1.06 2.868 1.208 3.068.149.199 2.086 3.16 5.05 4.42 2.47 1.05 3.33.84 3.91.78.582-.06 1.786-.723 2.034-1.42.247-.697.247-1.295.173-1.42-.075-.125-.272-.199-.57-.349z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2.5 transition-all duration-300 font-display font-extrabold text-xs tracking-wider uppercase whitespace-nowrap hidden sm:inline">
          Dúvidas? Fale Conosco
        </span>
      </a>

      {/* B. STICKY MOBILE BOTTOM BUY BAR (Slides up past the first fold) */}
      <div
        id="mobile_sticky_action_bar"
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0d]/95 border-t border-red-600/30 p-3 flex sm:hidden items-center justify-between backdrop-blur-md transition-all duration-300 transform ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col text-left">
          <span className="font-sans text-[10px] text-gray-400">Plano Recomendado</span>
          <span className="font-display font-black text-xs text-red-500 uppercase tracking-wide">
            {recommendedPlan.title}
          </span>
          <span className="font-mono text-xs font-bold text-white">
            R$ {recommendedPlan.price.toFixed(2).replace(".", ",")}
            {recommendedPlan.perMonthLabel && (
              <span className="text-emerald-400 font-sans font-semibold ml-1.5">
                ({recommendedPlan.perMonthLabel})
              </span>
            )}
          </span>
        </div>

        <button
          onClick={() => handleSelectPlan(recommendedPlan)}
          id="btn_sticky_mobile_assinar"
          className="bg-red-600 active:scale-95 text-white font-display font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg shadow-red-600/20 cursor-pointer"
        >
          Assinar Agora
        </button>
      </div>

    </div>
  );
}
