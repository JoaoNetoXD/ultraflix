import React from "react";
import { motion } from "motion/react";
import { Trophy, Clapperboard, Popcorn, Baby, ChevronRight, Star, BadgeCheck } from "lucide-react";

// Muro de catálogo: cartazes estilizados com fotos reais (sem marcas de terceiros).
// Futebol misturado no meio dos gêneros — vitrine equilibrada para qualquer lead.
const POSTERS_ROW_A = [
  { genre: "Cinema 4K", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.8" },
  { genre: "Copa 2026", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&h=560&q=70", rating: "10", live: true },
  { genre: "Romance", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.1" },
  { genre: "Terror", image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.3" },
  { genre: "Maratona", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.6" },
  { genre: "Comédia", image: "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.0" },
];

const POSTERS_ROW_B = [
  { genre: "Novelas", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.7" },
  { genre: "Animes", image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.5" },
  { genre: "Futebol ao Vivo", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&h=560&q=70", rating: "10", live: true },
  { genre: "Infantil", image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.2" },
  { genre: "Doramas", image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.4" },
  { genre: "Documentários", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.1" },
];

const CATEGORY_CARDS = [
  {
    icon: Clapperboard,
    tag: "EM CARTAZ",
    live: true,
    title: "Cinema em casa",
    desc: "Lançamentos dublados e legendados em 4K, sem esperar chegar no streaming.",
  },
  {
    icon: Popcorn,
    tag: "MARATONA",
    live: false,
    title: "Séries e novelas",
    desc: "Temporadas completas e o capítulo do dia, na hora que você quiser.",
  },
  {
    icon: Trophy,
    tag: "AO VIVO",
    live: true,
    title: "Copa 2026 e futebol",
    desc: "Todos os jogos ao vivo com narração BR: Copa, Brasileirão, Champions.",
  },
  {
    icon: Baby,
    tag: "PRA FAMÍLIA",
    live: false,
    title: "Infantil e animes",
    desc: "Desenhos, animações e animes para as crianças — e para você também.",
  },
];

const CHIPS = [
  "🎬 Filmes 4K",
  "📺 Séries",
  "💛 Novelas",
  "⚽ Copa do Mundo 2026",
  "⚽ Brasileirão",
  "⚽ Champions League",
  "🎌 Animes e Doramas",
  "🧸 Infantil",
  "🥊 UFC e Boxe",
  "🏀 NBA",
  "🎤 Shows e Realities",
  "🎞️ Documentários",
];

function PosterCard({ genre, image, rating, live }: { genre: string; image: string; rating: string; live?: boolean; key?: string }) {
  return (
    <div className="relative w-32 h-44 sm:w-40 sm:h-56 rounded-xl overflow-hidden shrink-0 border border-gray-900/60 group">
      <img
        src={image}
        alt={`Catálogo: ${genre}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="w-full h-full object-cover brightness-75 group-hover:brightness-95 group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />

      {/* Badge topo: AO VIVO (esportes) ou 4K */}
      {live ? (
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 font-mono text-[8px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded">
          <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
          AO VIVO
        </span>
      ) : (
        <span className="absolute top-2 right-2 font-mono text-[8px] font-extrabold bg-black/70 text-white px-1.5 py-0.5 rounded border border-white/10">
          4K
        </span>
      )}

      {/* Genre + rating */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide leading-tight">
          {genre}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
          <span className="font-mono text-[9px] text-amber-400 font-bold">{rating}</span>
        </div>
      </div>
    </div>
  );
}

interface AllInOneShowcaseProps {
  onScrollToPlans: () => void;
}

export default function AllInOneShowcase({ onScrollToPlans }: AllInOneShowcaseProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-[#070707] border-t border-red-950/10">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-red-950/45 border border-red-500/30 px-4 py-1.5 rounded-full mb-5 backdrop-blur-md">
            <BadgeCheck className="w-3.5 h-3.5 text-red-400" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-red-400 uppercase">
              Catálogo gigante • Atualizado toda semana
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            TUDO QUE VOCÊ AMA ASSISTIR.
            <span className="text-gradient-fire block">NUM LUGAR SÓ, POR CENTAVOS POR DIA.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-300 mt-5 max-w-xl mx-auto">
            Filme pra sexta à noite, novela de todo dia, maratona de série no fim de semana e{" "}
            <strong className="text-white">a Copa do Mundo 2026 ao vivo</strong> — sem pular de app em app e sem pagar várias assinaturas.
          </p>
        </div>
      </div>

      {/* POSTER WALL — full-bleed infinite marquee */}
      <div className="relative z-10 space-y-4 mb-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee-left">
          {[...POSTERS_ROW_A, ...POSTERS_ROW_A].map((p, idx) => (
            <PosterCard key={`a-${idx}`} {...p} />
          ))}
        </div>
        <div className="flex w-max gap-4 animate-marquee-right">
          {[...POSTERS_ROW_B, ...POSTERS_ROW_B].map((p, idx) => (
            <PosterCard key={`b-${idx}`} {...p} />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* 4 category cards — cobertura equilibrada de nichos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CATEGORY_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`relative rounded-2xl p-5 border backdrop-blur-sm flex flex-col ${
                card.live
                  ? "bg-gradient-to-b from-red-950/40 to-[#0b0b0b]/90 border-red-600/40"
                  : "bg-[#0c0c0c]/85 border-gray-900/70 hover:border-red-600/25 transition-colors"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded ${
                  card.live
                    ? "bg-red-600 text-white"
                    : "bg-[#161616] text-gray-400 border border-gray-900"
                }`}>
                  {card.live && <span className="w-1 h-1 bg-white rounded-full animate-pulse" />}
                  {card.tag}
                </span>
                <card.icon className={`w-4.5 h-4.5 ${card.live ? "text-red-400" : "text-gray-600"}`} />
              </div>

              <h3 className="font-display font-black text-base text-white uppercase tracking-tight mb-1.5">
                {card.title}
              </h3>
              <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chips: gêneros + campeonatos misturados */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CHIPS.map((chip, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="font-display font-bold text-[11px] sm:text-xs text-gray-300 bg-[#101010]/90 border border-gray-900 px-3.5 py-2 rounded-full uppercase tracking-wide hover:border-red-600/40 hover:text-white transition-colors"
            >
              {chip}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onScrollToPlans}
            id="btn_showcase_cta"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-display font-black text-sm sm:text-base px-8 py-4 sm:px-10 rounded-full animate-pulse-glow transition-all duration-200 uppercase tracking-widest cursor-pointer"
          >
            <span>Quero Tudo Isso Agora</span>
            <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-sans text-[11px] text-gray-500 mt-3">
            Um plano só • Teste grátis de 30 min no WhatsApp • Garantia de 7 dias
          </p>
        </div>

      </div>
    </section>
  );
}
