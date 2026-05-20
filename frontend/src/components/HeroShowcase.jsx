import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import ExoskeletonSchematic from './ExoskeletonSchematic';

const ArrowRight = Icons['ArrowRight'] || Icons['HelpCircle'];
const ChevronDown = Icons['ChevronDown'] || Icons['HelpCircle'];

const STATS = [
  { label: 'Active Units', value: '2,400+' },
  { label: 'Uptime Rate', value: '99.97%' },
  { label: 'Patents Filed', value: '340+' },
];

export default function HeroShowcase() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      {/* Background aesthetics: clean and simple with dot patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f7]" />
      <div className="absolute inset-0 luxury-dot-grid opacity-80" />

      <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text content / Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 bg-white/60 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
              <span
                className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-800"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Limitless Robotics — Est. 2026
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-neutral-900 font-outfit"
              >
                Engineering <br />
                <span className="font-playfair font-light italic text-neutral-550">the Future</span> <br />
                Beyond Limits.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Pioneering the convergence of artificial intelligence, robotics, and human potential.
              We build, teach, and deploy next-generation autonomous systems for a refined future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-row gap-4"
            >
              <motion.a
                href="#courses"
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase text-white bg-black hover:bg-neutral-850 transition-all duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                aria-label="Explore Courses"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href="#products"
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase border border-black/10 bg-transparent text-neutral-800 hover:bg-neutral-50 transition-all duration-300"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                aria-label="View Products"
              >
                <span>View Products</span>
              </motion.a>
            </motion.div>

            {/* High-End Specs Panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="flex gap-8 sm:gap-12 border-t border-black/5 pt-8 mt-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div
                    className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tighter"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-400"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Schematic Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5 w-full"
          >
            <ExoskeletonSchematic />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <motion.a
            href="#courses"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-neutral-450 hover:text-black transition-colors duration-300 cursor-pointer"
            aria-label="Scroll down"
          >
            <span
              className="text-[9px] tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Discover
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}