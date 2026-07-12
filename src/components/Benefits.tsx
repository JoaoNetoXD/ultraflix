import React from "react";
import { PlayCircle, MonitorSmartphone, Layout, MessageSquareText, Sliders, Check, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { BENEFITS } from "../data";

const ICONS: Record<string, LucideIcon> = {
  PlayCircle,
  MonitorSmartphone,
  Layout,
  MessageSquareText,
  Sliders,
};

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Area */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Diferenciais
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            POR QUE ESCOLHER A ULTRAFLIX?
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = ICONS[benefit.iconName] || Check;

            return (
              <motion.div
                key={idx}
                id={`benefit_card_${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-[#0c0c0c] to-[#080808] border border-gray-900 rounded-2xl p-6 sm:p-7 hover:border-red-950/40 hover:scale-[1.01] transition-all duration-200 group"
              >
                {/* Premium Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-900/20 flex items-center justify-center text-red-500 mb-5 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                  <IconComponent className="w-5 h-5 stroke-[2.5]" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center space-x-1">
                  <span>{benefit.title}</span>
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
