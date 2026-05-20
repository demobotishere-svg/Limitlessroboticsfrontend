import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const STATS = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Robots Built',
    sublabel: 'Deployed across 40+ industries globally',
    icon: 'Bot',
  },
  {
    id: 2,
    value: 98,
    suffix: '%',
    label: 'Uptime Rate',
    sublabel: 'Mission-critical reliability, zero compromise',
    icon: 'Activity',
  },
  {
    id: 3,
    value: 120,
    suffix: '+',
    label: 'Engineers Trained',
    sublabel: 'Next-gen talent through Limitless Academy',
    icon: 'GraduationCap',
  },
  {
    id: 4,
    value: 35,
    suffix: '+',
    label: 'Global Partners',
    sublabel: 'Fortune 500 alliances and sovereign labs',
    icon: 'Globe',
  },
];

function useCountUp(target, isActive, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return count;
}

function StatCard({ stat, index, isActive }) {
  const IconComponent = Icons[stat?.icon] || Icons['HelpCircle'];
  const count = useCountUp(stat?.value ?? 0, isActive, 2200);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative w-full min-w-0 group cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-cyan-400/10 pointer-events-none" />

      <div className="relative rounded-2xl border border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden h-full flex flex-col gap-5">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 rounded-br-2xl" />

        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{}}
        >
          <div className="absolute inset-px rounded-2xl border border-cyan-400/40" />
        </div>

        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400/60 transition-colors duration-300">
            <IconComponent className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-1 h-1 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-end gap-1 leading-none">
            <span
              className="text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #00FFFF 0%, #0088FF 60%, #9400FF 100%)',
                fontFamily: "'Orbitron', sans-serif",
                filter: 'drop-shadow(0 0 12px rgba(0,255,255,0.5))',
              }}
            >
              {count}
            </span>
            <span
              className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-1"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {stat?.suffix}
            </span>
          </div>
          <p
            className="text-base font-semibold text-white/90 tracking-wide uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em' }}
          >
            {stat?.label}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5">
          <p
            className="text-xs text-slate-400 leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {stat?.sublabel}
          </p>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-cyan-500/0 via-violet-500/30 to-cyan-500/0 group-hover:via-cyan-400/60 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}

function StatsCounters() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,136,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(148,0,255,0.05) 0%, transparent 60%)',
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circuit-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1.5" fill="#00FFFF" />
              <circle cx="60" cy="0" r="1.5" fill="#00FFFF" />
              <circle cx="0" cy="60" r="1.5" fill="#00FFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,255,255,0.3), transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400 mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            By the Numbers
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: '0 0 30px rgba(0,255,255,0.2)',
            }}
          >
            Limitless Impact.
          </h2>
          <p
            className="mt-4 text-sm text-slate-400 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Precision engineering, measurable results. Every metric a testament
            to our relentless pursuit of robotic excellence.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute -inset-px rounded-3xl opacity-30"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,255,255,0.15) 0%, transparent 50%, rgba(148,0,255,0.1) 100%)',
              filter: 'blur(1px)',
            }}
          />
          <div
            className="relative rounded-3xl border border-white/5 p-6 md:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,136,255,0.03) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {STATS.map((stat, index) => (
                <StatCard
                  key={stat?.id}
                  stat={stat}
                  index={index}
                  isActive={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsCounters;
