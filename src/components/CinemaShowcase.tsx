import React from "react";
import { motion } from "motion/react";
import { Clapperboard, Popcorn, Heart, ChevronRight, Star, BadgeCheck } from "lucide-react";

// Muro de catálogo: cartazes estilizados com fotos reais (sem marcas de terceiros)
const POSTERS_ROW_A = [
  { genre: "Ação", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.4" },
  { genre: "Cinema 4K", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.8" },
  { genre: "Romance", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.1" },
  { genre: "Terror", image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.3" },
  { genre: "Maratona", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.6" },
  { genre: "Comédia", image: "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.0" },
];

const POSTERS_ROW_B = [
  { genre: "Novelas", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.7" },
  { genre: "Animes", image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.5" },
  { genre: "Infantil", image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.2" },
  { genre: "Doramas", image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.4" },
  { genre: "Documentários", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&h=560&q=70", rating: "9.1" },
  { genre: "Realities", image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=400&h=560&q=70", rating: "8.9" },
];

const CATEGORY_CARDS = [
  {
    icon: Clapperboard,
    tag: "EM CARTAZ AGORA",
    live: true,
    title: "Lançamentos de cinema",
    desc: "Os filmes que estão em cartaz, dublados e legendados em 4K — sem esperar meses pra chegar no streaming.",
  },
  {
    icon: Popcorn,
    tag: "MARATONA LIBERADA",
    live: false,
    title: "Séries completas",
    desc: "Temporadas inteiras das séries do momento e dos clássicos. Aperte o play e só pare quando quiser.",
  },
  {
    icon: Heart,
    tag: "CAPÍTULO DO DIA",
    live: false,
    title: "Novelas e realities",
    desc: "Sua novela, seu reality e seus programas favoritos — no horário que você quiser, sem depender de TV.",
  },
];

const GENRES = [
  "Filmes 4K",
  "Séries",
  "Novelas",
  "Animes",
  "Doramas",
  "Infantil",
  "Documentários",
  "Shows e Stand-up",
  "Realities",
];

function PosterCard({ genre, image, rating }: { genre: string; image: string; rating: string; key?: string }) {
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

      {/* 4K badge */}
      <span className="absolute top-2 right-2 font-mono text-[8px] font-extrabold bg-black/70 text-white px-1.5 py-0.5 rounded border border-white/10">
        4K
      </span>

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

interface CinemaShowcaseProps {
  onScrollToPlans: () => void;
}

export default function CinemaShowcase({ onScrollToPlans }: CinemaShowcaseProps) {
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
            FILMES, SÉRIES E NOVELAS SEM FIM.
            <span className="text-gradient-fire block">O MELHOR DOS STREAMINGS, NUM LUGAR SÓ.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-300 mt-5 max-w-xl mx-auto">
            Chega de pular de aplicativo em aplicativo. Aqui você encontra{" "}
            <strong className="text-white">lançamentos de cinema, séries do momento, novelas, animes e infantil</strong>{" "}
            — dublado, legendado e em 4K, sem anúncio no meio.
          </p>
        </div>
      </div>

      {/* POSTER WALL — full-bleed infinite marquee (imersão de catálogo) */}
      <div className="relative z-10 space-y-4 mb-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Row A: slides left */}
        <div className="flex w-max gap-4 animate-marquee-left">
          {[...POSTERS_ROW_A, ...POSTERS_ROW_A].map((p, idx) => (
            <PosterCard key={`a-${idx}`} {...p} />
          ))}
        </div>
        {/* Row B: slides right */}
        <div className="flex w-max gap-4 animate-marquee-right">
          {[...POSTERS_ROW_B, ...POSTERS_ROW_B].map((p, idx) => (
            <PosterCard key={`b-${idx}`} {...p} />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {CATEGORY_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className={`relative rounded-2xl p-6 border backdrop-blur-sm flex flex-col ${
                card.live
                  ? "bg-gradient-to-b from-red-950/50 to-[#0b0b0b]/90 border-red-600/50 shadow-xl shadow-red-600/15"
                  : "bg-[#0c0c0c]/85 border-gray-900/70 hover:border-red-600/25 transition-colors"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                  card.live
                    ? "bg-red-600 text-white"
                    : "bg-[#161616] text-gray-400 border border-gray-900"
                }`}>
                  {card.live && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  {card.tag}
                </span>
                <card.icon className={`w-5 h-5 ${card.live ? "text-red-400" : "text-gray-600"}`} />
              </div>

              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed flex-1">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Genre chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-12">
          {GENRES.map((genre, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="font-display font-bold text-[11px] sm:text-xs text-gray-300 bg-[#101010]/90 border border-gray-900 px-3.5 py-2 rounded-full uppercase tracking-wide hover:border-red-600/40 hover:text-white transition-colors"
            >
              🎬 {genre}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onScrollToPlans}
            id="btn_cinema_cta"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-display font-black text-sm sm:text-base px-8 py-4 sm:px-10 rounded-full animate-pulse-glow transition-all duration-200 uppercase tracking-widest cursor-pointer"
          >
            <span>Liberar catálogo completo</span>
            <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-sans text-[11px] text-gray-500 mt-3">
            Um plano só • Todos os gêneros • Garantia de 7 dias
          </p>
        </div>

      </div>
    </section>
  );
}
