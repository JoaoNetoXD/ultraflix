import React from "react";
import { Tv, Smartphone, Tablet, Laptop, Cpu, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { DEVICES } from "../data";

const ICONS: Record<string, LucideIcon> = {
  Tv,
  Smartphone,
  Tablet,
  Laptop,
  Cpu,
};

export default function Devices() {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] border-t border-b border-red-950/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Compatibilidade total
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            ASSISTA ONDE QUISER
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-400 mt-4 max-w-md mx-auto">
            Nossa transmissão é otimizada para todas as telas. Você escolhe onde quer dar o play.
          </p>
        </div>

        {/* Devices Row/Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 justify-center">
          {DEVICES.map((device, idx) => {
            const IconComponent = ICONS[device.iconName] || Tv;

            return (
              <motion.div
                key={idx}
                id={`device_card_${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-[#0e0e0e] border border-gray-900/60 rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all duration-200 hover:bg-[#121212] hover:border-red-600/20"
              >
                {/* Icon Container with glowing background */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/10 to-red-600/0 border border-red-600/10 flex items-center justify-center text-red-500 mb-4 shadow-inner">
                  <IconComponent className="w-7 h-7 stroke-[1.5]" />
                </div>

                {/* Device Title */}
                <h3 className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight mb-1">
                  {device.name}
                </h3>

                {/* Device Brands/Subtitle */}
                <p className="font-sans text-[11px] text-gray-500 leading-tight">
                  {device.details}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
