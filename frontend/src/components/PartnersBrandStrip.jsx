import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import * as Icons from 'lucide-react';

const PARTNERS = [
  { id: 1, name: 'NeuralCore', icon: 'Cpu', tagline: 'AI Infrastructure' },
  { id: 2, name: 'QuantumDrive', icon: 'Zap', tagline: 'Power Systems' },
  { id: 3, name: 'SynapseTech', icon: 'Brain', tagline: 'Neural Networks' },
  { id: 4, name: 'OrbitForge', icon: 'Globe', tagline: 'Space Robotics' },
  { id: 5, name: 'IronAxis', icon: 'Settings', tagline: 'Industrial Automation' },
  { id: 6, name: 'PhotonLabs', icon: 'Aperture', tagline: 'Optics & Sensing' },
  { id: 7, name: 'VoltMatrix', icon: 'Battery', tagline: 'Energy Storage' },
  { id: 8, name: 'CipherEdge', icon: 'Shield', tagline: 'Security Systems' },
];

const DUPLICATED = [...PARTNERS, ...PARTNERS];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function PartnerChip({ partner, index }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = Icons[partner?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={`Partner: ${partner?.name}`}
      className="relative flex-shrink-0 flex flex-col items-center justify-center gap-3 px-8 py-6 cursor-pointer outline-none"
      style={{}}
    >
      <div
        className={[
          'absolute inset-0 rounded-2xl transition-all duration-500',
          hovered
            ? 'bg-white/5 border border-cyan-400/60'
            : 'bg-white/[0.03] border border-white/10',
        ].join(' ')}
      />

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{}}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
        </motion.div>
      )}

      <div className="relative z-10 flex items-center justify-center w-12 h-12">
        <motion.div
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <IconComponent
            size={28}
            className={[
              'transition-all duration-500',
              hovered
                ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]'
                : 'text-white/30',
            ].join(' ')}
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1">
        <span
          className={[
            'font-orbitron text-sm font-semibold tracking-widest uppercase transition-all duration-500 whitespace-nowrap',
            hovered ? 'text-cyan-300' : 'text-white/30',
          ].join(' ')}
        >
          {partner?.name}
        </span>
        <span
          className={[
            'font-space-grotesk text-xs tracking-wider transition-all duration-500 whitespace-nowrap',
            hovered ? 'text-violet-300/80' : 'text-white/15',
          ].join(' ')}
        >
          {partner?.tagline}
        </span>
      </div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        />
      )}
    </motion.div>
  );
}

function ScrollingTrack() {
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const SPEED = 0.5;

  useAnimationFrame(() => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    positionRef.current += SPEED;
    if (positionRef.current >= halfWidth) {
      positionRef.current = 0;
    }
    el.style.transform = `translateX(-${positionRef.current}px)`;
  });

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {DUPLICATED.map((partner, i) => (
          <PartnerChip key={`${partner?.id}-${i}`} partner={partner} index={i % PARTNERS.length} />
        ))}
      </div>
    </div>
  );
}

function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="circuit-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#00FFFF" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="2" fill="#00FFFF" />
            <circle cx="80" cy="0" r="2" fill="#00FFFF" />
            <circle cx="0" cy="80" r="2" fill="#00FFFF" />
            <path d="M 20 0 L 20 20 L 40 20" fill="none" stroke="#00FFFF" strokeWidth="0.5" />
            <path d="M 60 80 L 60 60 L 80 60" fill="none" stroke="#9400FF" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="1.5" fill="#00FFFF" />
            <circle cx="60" cy="60" r="1.5" fill="#9400FF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-grid)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03], scaleX: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
      />
    </div>
  );
}

function PartnersBrandStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden bg-black"
      aria-label="Trusted Partners"
    >
      <CircuitBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{}}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-violet-950/20" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 mb-14 md:mb-18">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.div variants={headingVariants} className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase font-space-grotesk">
              Trusted By
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>

          <motion.h2
            variants={headingVariants}
            className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
          >
            Industry{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Pioneers
            </span>
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="font-space-grotesk text-sm md:text-base text-white/40 max-w-lg tracking-wide"
          >
            Backed by the world's leading technology partners and industry innovators driving the next era of intelligent robotics.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="relative z-10"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
        <ScrollingTrack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center gap-8 mt-14 md:mt-18 px-6"
      >
        {['+120', '98%', '6', 'Global'].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-orbitron text-lg md:text-xl font-bold text-cyan-400">
              {stat}
            </span>
            <span className="font-space-grotesk text-[10px] md:text-xs text-white/30 tracking-widest uppercase">
              {['Projects', 'Satisfaction', 'Continents', 'Reach'][i]}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default PartnersBrandStrip;
