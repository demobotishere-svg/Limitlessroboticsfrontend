import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const STATS = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Robots Deployed',
    sublabel: 'Deployed across 40+ industries globally.',
    icon: 'Bot',
  },
  {
    id: 2,
    value: 98,
    suffix: '%',
    label: 'System Uptime',
    sublabel: 'Mission-critical reliability, zero compromise.',
    icon: 'Activity',
  },
  {
    id: 3,
    value: 120,
    suffix: '+',
    label: 'Engineers Trained',
    sublabel: 'Next-generation robotic talent through Limitless Academy.',
    icon: 'GraduationCap',
  },
  {
    id: 4,
    value: 35,
    suffix: '+',
    label: 'Global Partners',
    sublabel: 'Fortune 500 alliances and sovereign technology labs.',
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
  const count = useCountUp(stat?.value ?? 0, isActive, 2000);

  /** @type {import('framer-motion').Variants} */
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className="relative rounded-2xl border border-neutral-100 bg-white p-8 flex flex-col gap-6 shadow-sm luxury-card-hover"
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-800">
          <IconComponent className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span
            className="text-5xl font-light text-neutral-900 tracking-tighter"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {count}
          </span>
          <span
            className="text-2xl font-light text-neutral-450"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {stat?.suffix}
          </span>
        </div>
        <h3
          className="text-[10px] font-semibold text-neutral-900 tracking-[0.18em] uppercase mt-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {stat?.label}
        </h3>
        <p
          className="text-xs text-neutral-500 leading-relaxed font-light mt-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {stat?.sublabel}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsCounters() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  /** @type {import('framer-motion').Variants} */
  const headerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-transparent"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Clean Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-450 mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            By the Numbers
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight"
            style={{
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Limitless impact, <span className="font-playfair font-light italic text-neutral-550">measured scale</span>.
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Precision engineering, measurable results. Every metric a testament
            to our relentless pursuit of autonomous robotic excellence.
          </p>
        </motion.div>

        {/* Clean Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
